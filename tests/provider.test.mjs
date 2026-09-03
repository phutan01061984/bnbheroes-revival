import assert from 'node:assert/strict';
import * as ethers from 'ethers';

const store = new Map();
globalThis.window = {ethers};
globalThis.localStorage = {
  getItem: key => store.get(key) || null,
  setItem: (key, value) => store.set(key, value)
};

await import('../preservation-provider.js');
const provider = window.__BNBH_LOCAL_PROVIDER__;
await provider.__ready;

assert.equal(await provider.__rpc('eth_chainId'), '0x38');
assert.deepEqual(await provider.__rpc('eth_accounts'), [provider.__account]);

const iface = new ethers.Interface([
  'function getCharacterPrice() view returns(uint256)',
  'function getUnlockLevelPrice(uint256) view returns(uint256)',
  'function getHeroesByOwner(address,bool) view returns(tuple(uint256 name,uint256 heroType,uint256 xp,uint256 attack,uint256 armor,uint256 speed,uint256 hp,uint256 tokenId,uint256 arrivalTime,uint256 level,uint256 heroClass)[])',
  'function getCharactersForPage(uint256,uint256,uint256,uint256,uint256) view returns(tuple(uint256 name,uint256 heroType,uint256 xp,uint256 attack,uint256 armor,uint256 speed,uint256 hp,uint256 tokenId,address seller,uint256 price,uint256 level,uint256 heroClass)[])',
  'function fight(uint256,uint256)'
]);

async function call(name, args=[], to=provider.__addresses.core) {
  const data = iface.encodeFunctionData(name, args);
  const encoded = await provider.__rpc('eth_call', [{to, data}, 'latest']);
  return iface.decodeFunctionResult(name, encoded)[0];
}

// Exact 2021 oracle snapshot + verified immutable unlock formula.
assert.equal((await call('getCharacterPrice', [], provider.__addresses.oracle)).toString(), '6900820431868022675263');
assert.equal((await call('getUnlockLevelPrice', [0], provider.__addresses.oracle)).toString(), '184021878183147271340');
assert.equal((await call('getUnlockLevelPrice', [10], provider.__addresses.oracle)).toString(), '257630629456406179876');

const heroes = await call('getHeroesByOwner', [provider.__account, true]);
assert.equal(heroes.length, 1);
assert.equal(heroes[0].name.toString(), '14');
assert.equal(heroes[0].arrivalTime.toString(), '0');

const market = await call('getCharactersForPage', [12, 0, 0, 101, 0], provider.__addresses.market);
assert.equal(market.length, 3);

const data = iface.encodeFunctionData('fight', [0, 0]);
const hash = await provider.__rpc('eth_sendTransaction', [{from:provider.__account, to:provider.__addresses.core, data}]);
const receipt = await provider.__rpc('eth_getTransactionReceipt', [hash]);
assert.equal(receipt.status, '0x1');
assert.equal(receipt.logs.length, 1);
const savedAfterFight = JSON.parse(store.get('bnbheroes-revival-v2'));
assert.equal(savedAfterFight.battleHistory.length, 1);
assert.equal(savedAfterFight.battleHistory[0].hero, 0);

await assert.rejects(() => provider.__rpc('personal_sign', ['0x00', provider.__account]), /blocks real signing/);
await assert.rejects(() => provider.__rpc('eth_sendRawTransaction', ['0xdead']), /blocks real signing/);
assert.ok(store.get('bnbheroes-revival-v2'));

console.log('local provider tests OK');
