import { JsonRpcProvider, id, getAddress, keccak256, toBeHex } from 'ethers';
import { writeFile } from 'node:fs/promises';

const networks = {
  mainnet: new JsonRpcProvider('https://bsc-dataseed.binance.org/'),
  testnet: new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'),
};

const contracts = {
  core: {
    testnet: '0xfC5A012A887134d942b93F67B5030D052A38732c',
    mainnet: '0xde9fFb228C1789FEf3F08014498F2b16c57db855',
  },
  character: {
    testnet: '0xf20551bd1dD34d3d58a167B645c94c408bEd9525',
    mainnet: '0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01',
  },
  market: {
    testnet: '0x0d75E6d46445FbaB2FF9d3F379BB11Fe374772aD',
    mainnet: '0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac',
  },
  oracle: {
    testnet: '0xa050fdB208c1d533D44eF277A598aF9001aE3d0a',
    mainnet: '0xD160bbDED5cFF79b126443EefCB28F3b67991140',
  },
};

function eip1967Slot(label) {
  return toBeHex(BigInt(id(label)) - 1n, 32);
}

const slots = {
  implementation: eip1967Slot('eip1967.proxy.implementation'),
  admin: eip1967Slot('eip1967.proxy.admin'),
  beacon: eip1967Slot('eip1967.proxy.beacon'),
};

function slotAddress(value) {
  if (!value || /^0x0+$/.test(value)) return null;
  const raw = `0x${value.slice(-40)}`;
  try { return getAddress(raw); } catch { return raw; }
}

async function codeInfo(provider, address) {
  if (!address) return null;
  const code = await provider.getCode(address);
  return {
    address,
    bytes: Math.max(0, (code.length - 2) / 2),
    keccak256: code === '0x' ? null : keccak256(code),
    code,
  };
}

const result = {
  generatedAt: new Date().toISOString(),
  slotConstants: slots,
  upgradedTopic: id('Upgraded(address)'),
  adminChangedTopic: id('AdminChanged(address,address)'),
  contracts: {},
};

for (const [name, pair] of Object.entries(contracts)) {
  result.contracts[name] = {};
  for (const [network, address] of Object.entries(pair)) {
    const provider = networks[network];
    const storage = {};
    for (const [slotName, slot] of Object.entries(slots)) {
      const value = await provider.getStorage(address, slot);
      storage[slotName] = { slot, value, address: slotAddress(value) };
    }
    const proxy = await codeInfo(provider, address);
    const implementation = await codeInfo(provider, storage.implementation.address);
    const beacon = await codeInfo(provider, storage.beacon.address);
    result.contracts[name][network] = {
      proxyAddress: getAddress(address),
      storage,
      proxyCode: proxy,
      implementation,
      beacon,
    };
  }
}

await writeFile(new URL('./PROXY_DISCOVERY.json', import.meta.url), `${JSON.stringify(result, null, 2)}\n`);

for (const [name, nets] of Object.entries(result.contracts)) {
  console.log(`\n${name}`);
  for (const [network, info] of Object.entries(nets)) {
    console.log(`${network}: proxy=${info.proxyAddress}`);
    console.log(`  impl=${info.storage.implementation.address || '-'} code=${info.implementation?.bytes || 0} keccak=${info.implementation?.keccak256 || '-'}`);
    console.log(`  admin=${info.storage.admin.address || '-'}`);
    console.log(`  beacon=${info.storage.beacon.address || '-'}`);
  }
}