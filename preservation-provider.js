(() => {
  'use strict';

  // Safe in-browser replacement for the dead 2021 BSC provider. It deliberately
  // impersonates chain 56 so the untouched React/Web3 UI can keep its original
  // routing/ABI assumptions, but every read/write is resolved against the local
  // deterministic revival state. No RPC, wallet signature or raw transaction is sent.
  const ACCOUNT = '0xB000000000000000000000000000000000000001';
  const ARCHIVE_SELLER = '0xB000000000000000000000000000000000000002';
  const CHAIN_ID = '0x38';
  const KEY = 'bnbheroes-revival-v2';
  const MAX_UINT = (1n << 256n) - 1n;
  const ZERO_HASH = '0x' + '0'.repeat(64);
  const ZERO_BLOOM = '0x' + '0'.repeat(512);
  const listeners = new Map();
  const receipts = new Map();
  let txCounter = 1n;
  let blockCounter = 20211117n;
  let engine, LEGACY, state;

  const ADDR = {
    core: '0xde9fFb228C1789FEf3F08014498F2b16c57db855'.toLowerCase(),
    token: '0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267'.toLowerCase(),
    character: '0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01'.toLowerCase(),
    market: '0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac'.toLowerCase(),
    pool: '0xdE8c58d082d39D04DC2e5241a3a65911454674CD'.toLowerCase(),
    oracle: '0xD160bbDED5cFF79b126443EefCB28F3b67991140'.toLowerCase()
  };

  const heroTupleType = 'tuple(uint256 name,uint256 heroType,uint256 xp,uint256 attack,uint256 armor,uint256 speed,uint256 hp,uint256 tokenId,uint256 arrivalTime,uint256 level,uint256 heroClass)';
  const marketTupleType = 'tuple(uint256 name,uint256 heroType,uint256 xp,uint256 attack,uint256 armor,uint256 speed,uint256 hp,uint256 tokenId,address seller,uint256 price,uint256 level,uint256 heroClass)';
  const fragments = [
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address,address) view returns (uint256)',
    'function isApprovedForAll(address,address) view returns (bool)',
    'function approve(address,uint256) returns (bool)',
    'function setApprovalForAll(address,bool)',
    'function balances(address) view returns (uint256)',
    'function getCharacterPrice() view returns (uint256)',
    'function getExpeditePrice() view returns (uint256)',
    'function getTownUpgradePrices() view returns (uint256[])',
    'function getTownUpgradePrice(uint256,uint256) view returns (uint256)',
    'function getUnlockLevelPrice(uint256) view returns (uint256)',
    'function getTownLevel(address,uint8) view returns (uint256)',
    'function getTownsOfPlayer(address) view returns (tuple(uint8 level,uint256 lastUpgradedTimeStamp)[4])',
    'function unLockTime(address) view returns (uint256)',
    `function getHeroesByOwner(address,bool) view returns (${heroTupleType}[])`,
    `function getHeroesInBag(address) view returns (${heroTupleType}[])`,
    `function getHero(uint256,bool) view returns (${heroTupleType})`,
    `function getCharactersForPage(uint256,uint256,uint256,uint256,uint256) view returns (${marketTupleType}[])`,
    `function getCharactersForSeller(address) view returns (${marketTupleType}[])`,
    'function getNumberOfCharacterListings(uint256,uint256,uint256) view returns (uint256)',
    'function canChangePrice(address,uint256) view returns (bool)',
    'function createNewHero()',
    'function claimRewards()',
    'function upgradeTown(uint8)',
    'function fight(uint256,uint256)',
    'function expediteHero(uint256)',
    'function unLockLevel(uint256)',
    'function moveHeroToBag(uint256)',
    'function takeHeroFromBag(uint256)',
    'function addListing(uint256,uint256)',
    'event Fight(address player,uint256 _attackingHero,uint256 enemyType,uint256 rewards,uint256 xpGained,uint256 hpLoss)'
  ];

  if (!window.ethers) throw new Error('BNBH local provider requires ethers UMD before this script');
  const iface = new window.ethers.Interface(fragments);

  const ready = Promise.all([
    import('./prototype/src/engine.js'),
    import('./prototype/src/legacy-data.js')
  ]).then(([eng, legacy]) => {
    engine = eng;
    LEGACY = legacy.LEGACY;
    state = engine.restoreState(localStorage.getItem(KEY) || localStorage.getItem('bnbheroes-revival-v1'));
    save();
    return true;
  });

  function save() {
    if (state) localStorage.setItem(KEY, JSON.stringify(state));
  }
  function wei(n) {
    const value = Number(n || 0);
    if (!Number.isFinite(value)) return 0n;
    return BigInt(Math.round(value * 1e9)) * 1000000000n;
  }
  function fromWeiBigInt(n) { return Number(BigInt(n)) / 1e18; }
  function hex(n) { return '0x' + BigInt(n).toString(16); }
  function nameId(h) {
    return BigInt(LEGACY.character.heroNames[h.template] ?? h.template ?? 0);
  }
  function heroTuple(h, frozenHp=false) {
    if (!h) return [0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n];
    const arrival = Math.max(0, Math.ceil(((h.arrivalAt || 0) - Date.now()) / 1000));
    return [
      nameId(h), BigInt(h.rarityId ?? 0), BigInt(h.xp ?? 0), BigInt(h.attack ?? 0),
      BigInt(h.armor ?? 0), BigInt(h.speed ?? 0), BigInt(frozenHp ? (h.hp ?? 0) : engine.currentHp(h)),
      BigInt(h.tokenId ?? 0), BigInt(arrival), BigInt(h.level ?? 0), BigInt(h.classId ?? 0)
    ];
  }
  function marketTuple(h) {
    const seller = h.seller || (h.archiveDemo ? ARCHIVE_SELLER : ACCOUNT);
    return [
      nameId(h), BigInt(h.rarityId ?? 0), BigInt(h.xp ?? 0), BigInt(h.attack ?? 0),
      BigInt(h.armor ?? 0), BigInt(h.speed ?? 0), BigInt(engine.currentHp(h)),
      BigInt(h.tokenId ?? 0), seller, wei(h.price || 0), BigInt(h.level ?? 0), BigInt(h.classId ?? 0)
    ];
  }
  function encode(name, values) { return iface.encodeFunctionResult(name, values); }
  function decode(data) {
    try { return iface.parseTransaction({data}); } catch { return null; }
  }
  function townPrice(type, level) {
    const idx = Number(type) * 4 + Number(level);
    return BigInt(LEGACY.oracle.getTownUpgradePrices[idx] || 0);
  }
  function unlockPrice(level) {
    // Mirrors Oracle.getUnlockLevelPrice(currentLevel) at the exact 17-Nov-2021
    // frontend-capture block. The launch-era Oracle exposes bnbhPrice directly;
    // getTokenPrice() was added later and reverts on the historical implementation.
    const tokenPrice = BigInt(LEGACY.oracle.bnbhPrice);
    const base = BigInt(LEGACY.oracle.basePriceToUnlockInBNB);
    const rate = BigInt(LEGACY.oracle.unlockRate);
    return tokenPrice * base * (100n + rate * BigInt(level)) / (10n ** 20n);
  }
  function marketRows(minLevel=0, maxLevel=101, rarity=0) {
    return (state.market || []).filter(h => {
      const level = Number(h.level || 0);
      const rarityId = Number(h.rarityId || 0);
      return level >= Number(minLevel) && level <= Number(maxLevel) && (!Number(rarity) || rarityId === Number(rarity));
    });
  }

  function readCall(to, data) {
    const parsed = decode(data);
    if (!parsed) return '0x';
    const name = parsed.name;
    const args = parsed.args;
    const target = String(to || '').toLowerCase();
    switch (name) {
      case 'balanceOf':
        if (target === ADDR.character) return encode(name, [BigInt(state.heroes.length + state.reserve.length)]);
        return encode(name, [wei(state.bnbh)]);
      case 'allowance': return encode(name, [MAX_UINT]);
      case 'isApprovedForAll': return encode(name, [true]);
      case 'balances': return encode(name, [wei(state.pendingBNB)]);
      case 'getCharacterPrice': return encode(name, [BigInt(LEGACY.oracle.getCharacterPrice)]);
      case 'getExpeditePrice': return encode(name, [BigInt(LEGACY.oracle.getExpeditePrice)]);
      case 'getTownUpgradePrices': return encode(name, [LEGACY.oracle.getTownUpgradePrices.map(BigInt)]);
      case 'getTownUpgradePrice': return encode(name, [townPrice(args[0], args[1])]);
      case 'getUnlockLevelPrice': return encode(name, [unlockPrice(args[0])]);
      case 'getTownLevel': return encode(name, [BigInt(engine.effectiveTownLevel(state, Number(args[1])))]);
      case 'getTownsOfPlayer': return encode(name, [[0,1,2,3].map(i => [BigInt(state.towns[i] || 0), BigInt(Math.floor((state.townUpgradeEnds?.[i] || 0)/1000))])]);
      case 'unLockTime': return encode(name, [BigInt(Math.floor((state.rewardUnlockAt || 0) / 1000))]);
      case 'getHeroesByOwner': return encode(name, [state.heroes.map(h => heroTuple(h))]);
      case 'getHeroesInBag': return encode(name, [state.reserve.map(h => heroTuple(h, true))]);
      case 'getHero': {
        const id = Number(args[0]);
        const h = [...state.heroes, ...state.reserve].find(x => Number(x.tokenId) === id);
        // Historical getHero() itself keeps calculating stamina while a token is
        // held by Core; only getHeroesInBag() applies the paused-time view.
        return encode(name, [heroTuple(h)]);
      }
      case 'getCharactersForPage': {
        const [limit, page, minLevel, maxLevel, rarity] = args.map(Number);
        const rows = marketRows(minLevel, maxLevel, rarity).slice(page * limit, page * limit + limit);
        return encode(name, [rows.map(marketTuple)]);
      }
      case 'getCharactersForSeller': {
        const seller = String(args[0]).toLowerCase();
        const rows = (state.market || []).filter(h => String(h.seller || (h.archiveDemo ? ARCHIVE_SELLER : ACCOUNT)).toLowerCase() === seller);
        return encode(name, [rows.map(marketTuple)]);
      }
      case 'getNumberOfCharacterListings': return encode(name, [BigInt(marketRows(args[0], args[1], args[2]).length)]);
      case 'canChangePrice': {
        const seller = String(args[0]).toLowerCase();
        const id = Number(args[1]);
        const h = (state.market || []).find(x => Number(x.tokenId) === id);
        return encode(name, [!!h && String(h.seller || ARCHIVE_SELLER).toLowerCase() === seller]);
      }
      default: return '0x';
    }
  }

  function fakeHash(counter) { return '0x' + BigInt(counter).toString(16).padStart(64, '0'); }
  function makeLog(txHash, tx, eventName, values) {
    const enc = iface.encodeEventLog(iface.getEvent(eventName), values);
    return {
      address: tx.to || ADDR.core, topics: enc.topics, data: enc.data,
      blockNumber: hex(blockCounter + 1n), transactionHash: txHash,
      transactionIndex: '0x0', blockHash: fakeHash(blockCounter + 1n + 0xB0B0n), logIndex: '0x0', removed: false
    };
  }
  function makeReceipt(hash, tx, logs=[]) {
    const block = ++blockCounter;
    const blockHash = fakeHash(block + 0xB0B0n);
    const receipt = {
      transactionHash: hash, transactionIndex: '0x0', blockHash, blockNumber: hex(block),
      from: tx.from || ACCOUNT, to: tx.to || ADDR.core,
      cumulativeGasUsed: '0x5208', gasUsed: '0x5208', effectiveGasPrice: '0x0',
      contractAddress: null, logs, logsBloom: ZERO_BLOOM, status: '0x1', type: '0x0'
    };
    receipts.set(hash.toLowerCase(), receipt);
    return receipt;
  }

  function performWrite(tx) {
    const parsed = decode(tx.data || '0x');
    if (!parsed) throw new Error('Unsupported local BNBH transaction selector');
    const name = parsed.name, a = parsed.args;
    let fightValues = null;
    switch (name) {
      case 'approve': case 'setApprovalForAll': break;
      case 'createNewHero': state = engine.recruit(state); break;
      case 'claimRewards': state = engine.claimRewards(state); break;
      case 'upgradeTown': state = engine.upgradeTown(state, Number(a[0])); break;
      case 'expediteHero': state = engine.expedite(state, Number(a[0])); break;
      case 'unLockLevel': state = engine.unlockLevel(state, Number(a[0])); break;
      case 'moveHeroToBag': state = engine.moveToReserve(state, Number(a[0])); break;
      case 'takeHeroFromBag': state = engine.takeFromReserve(state, Number(a[0])); break;
      case 'addListing': {
        const heroId = Number(a[0]);
        const price = fromWeiBigInt(a[1]);
        const index = state.heroes.findIndex(h => Number(h.tokenId) === heroId);
        if (index < 0) throw new Error('Hero not found');
        const fee = price / 10;
        if (state.bnbh < fee) throw new Error('Not enough simulated BNBH for the 10% listing fee');
        const hero = state.heroes[index];
        state = {
          ...state,
          bnbh: state.bnbh - fee,
          heroes: state.heroes.filter((_, i) => i !== index),
          market: [...(state.market || []), {...hero, price, seller: ACCOUNT, archiveDemo: false}],
          log: [`Listed Hero #${heroId} for ${price} simulated BNBH`, ...(state.log || [])].slice(0,60)
        };
        break;
      }
      case 'fight': {
        const heroId = Number(a[0]), enemyType = Number(a[1]);
        const before = state;
        const oldHero = before.heroes.find(h => Number(h.tokenId) === heroId);
        if (!oldHero) throw new Error('Hero not found');
        const oldHp = engine.currentHp(oldHero), oldXp = Number(oldHero.xp), oldBNB = Number(before.pendingBNB || 0);
        state = engine.fight(state, heroId, enemyType);
        const newHero = state.heroes.find(h => Number(h.tokenId) === heroId);
        const reward = Math.max(0, Number(state.pendingBNB || 0) - oldBNB);
        const xp = Math.max(0, Number(newHero.xp) - oldXp);
        const hpLoss = Math.max(0, oldHp - engine.currentHp(newHero));
        fightValues = [ACCOUNT, BigInt(heroId), BigInt(enemyType), wei(reward), BigInt(xp), BigInt(hpLoss)];
        break;
      }
      default: throw new Error('Unsupported local BNBH write: ' + name);
    }
    save();
    return fightValues;
  }

  async function rpc(method, params=[]) {
    await ready;
    switch (method) {
      case 'eth_chainId': return CHAIN_ID;
      case 'net_version': return '56';
      case 'eth_accounts': case 'eth_requestAccounts': return [ACCOUNT];
      case 'eth_coinbase': return ACCOUNT;
      case 'eth_getBalance': return hex(wei(state.claimedBNB || 0));
      case 'eth_blockNumber': return hex(blockCounter);
      case 'eth_gasPrice': return '0x0';
      case 'eth_getTransactionCount': return '0x0';
      case 'eth_estimateGas': return '0x7a120';
      case 'eth_getCode': return '0x01';
      case 'eth_call': {
        const tx = params[0] || {};
        return readCall(tx.to, tx.data || '0x');
      }
      case 'eth_sendTransaction': {
        const tx = params[0] || {};
        if (String(tx.from || ACCOUNT).toLowerCase() !== ACCOUNT.toLowerCase()) throw new Error('Local preservation account only');
        const hash = fakeHash(0xB000000n + txCounter++);
        const fightValues = performWrite(tx);
        const logs = fightValues ? [makeLog(hash, tx, 'Fight', fightValues)] : [];
        makeReceipt(hash, tx, logs);
        return hash;
      }
      case 'eth_getTransactionReceipt': return receipts.get(String(params[0] || '').toLowerCase()) || null;
      case 'eth_getTransactionByHash': {
        const hash = String(params[0] || '');
        const r = receipts.get(hash.toLowerCase());
        return r ? {hash, from:r.from, to:r.to, blockHash:r.blockHash, blockNumber:r.blockNumber, transactionIndex:'0x0', input:'0x', value:'0x0', gas:'0x5208', gasPrice:'0x0', nonce:'0x0'} : null;
      }
      case 'eth_getBlockByNumber': {
        const n = params[0] === 'latest' ? hex(blockCounter) : params[0];
        const bn = BigInt(n || '0x0');
        return {number:n, hash:fakeHash(bn), parentHash:ZERO_HASH, nonce:'0x0000000000000000', sha3Uncles:ZERO_HASH, logsBloom:ZERO_BLOOM, transactionsRoot:ZERO_HASH, stateRoot:ZERO_HASH, receiptsRoot:ZERO_HASH, miner:ACCOUNT, difficulty:'0x0', totalDifficulty:'0x0', extraData:'0x', size:'0x0', gasLimit:'0x1c9c380', gasUsed:'0x0', timestamp:hex(Math.floor(Date.now()/1000)), transactions:[], uncles:[]};
      }
      case 'wallet_switchEthereumChain': return null;
      case 'eth_sendRawTransaction': case 'eth_sign': case 'personal_sign': case 'eth_signTransaction':
        throw new Error('BNB HEROES preservation mode blocks real signing/raw transactions');
      default:
        console.warn('[BNBH local provider] unsupported RPC', method, params);
        return null;
    }
  }

  const provider = {
    isMetaMask: true,
    chainId: CHAIN_ID,
    selectedAddress: ACCOUNT,
    request: ({method, params}) => rpc(method, params || []),
    send(payload, callback) {
      if (typeof payload === 'string') return rpc(payload, Array.isArray(callback) ? callback : []);
      rpc(payload.method, payload.params || []).then(
        result => callback && callback(null, {jsonrpc:'2.0', id:payload.id, result}),
        error => callback && callback(error, {jsonrpc:'2.0', id:payload.id, error:{code:-32000,message:error.message}})
      );
    },
    sendAsync(payload, callback) { return this.send(payload, callback); },
    on(event, fn) { if (!listeners.has(event)) listeners.set(event, new Set()); listeners.get(event).add(fn); return this; },
    off(event, fn) { listeners.get(event)?.delete(fn); return this; },
    removeListener(event, fn) { listeners.get(event)?.delete(fn); return this; },
    close() {}, disconnect() {},
    __ready: ready, __rpc: rpc, __account: ACCOUNT, __addresses: ADDR
  };

  window.__BNBH_LOCAL_PROVIDER__ = provider;
  window.__BNBH_LOCAL_PROVIDER_READY__ = ready;
  // Intentionally shadow any browser wallet only inside this preserved app page.
  window.ethereum = provider;
})();
