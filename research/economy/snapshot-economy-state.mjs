import fs from 'node:fs';
import { JsonRpcProvider, Contract, formatEther } from 'ethers';
import { LEGACY } from '../../prototype/src/legacy-data.js';

const BLOCK = Number(process.env.BNBH_BLOCK || 12730607);
const OUT = process.env.BNBH_OUTPUT || 'research/economy/CHAIN_ECONOMY_STATE_20211117.json';
const provider = new JsonRpcProvider('https://bnb-mainnet.g.alchemy.com/public', 56, { staticNetwork:true });
const core = new Contract(LEGACY.addresses.core, [
  'function dividePercent() view returns(uint256)',
  'function burnAddress() view returns(address)',
  'function bnbhPool() view returns(address)',
  'function firstLockTime() view returns(uint256)',
  'function maxHeroCount() view returns(uint256)',
  // Later mirror exposes this getter. Exact 17-Nov implementation may not.
  'function numTokensToSend() view returns(uint256)'
], provider);
const token = new Contract(LEGACY.addresses.token, [
  'function _BNBFee() view returns(uint256)',
  'function _liquidityFee() view returns(uint256)',
  'function bnbPoolAddress() view returns(address)',
  'function swapCoolDownTime() view returns(uint256)',
  'function presaleEnded() view returns(bool)',
  'function totalSupply() view returns(uint256)',
  'function balanceOf(address) view returns(uint256)',
  'function _maxTxAmount() view returns(uint256)'
], provider);
const pool = new Contract(LEGACY.addresses.pool, ['function bnbHeroAddress() view returns(address)'], provider);
const character = new Contract(LEGACY.addresses.character, ['function totalSupply() view returns(uint256)'], provider);
const opts = { blockTag:BLOCK };
async function call(c, fn, ...args) {
  try { const v=await c[fn](...args,opts); return typeof v === 'bigint' ? v.toString() : String(v); }
  catch (e) { return { error:e.shortMessage || e.message }; }
}
const block = await provider.getBlock(BLOCK);
const out = {
  block:BLOCK,
  timestamp:new Date(Number(block.timestamp)*1000).toISOString(),
  addresses:LEGACY.addresses,
  core:{
    dividePercent:await call(core,'dividePercent'),
    burnAddress:await call(core,'burnAddress'),
    bnbhPool:await call(core,'bnbhPool'),
    firstLockTime:await call(core,'firstLockTime'),
    maxHeroCount:await call(core,'maxHeroCount'),
    numTokensToSend:await call(core,'numTokensToSend'),
    bnbBalanceWei:(await provider.getBalance(LEGACY.addresses.core,BLOCK)).toString(),
    bnbhBalanceWei:await call(token,'balanceOf',LEGACY.addresses.core),
  },
  token:{
    bnbFeePct:await call(token,'_BNBFee'),
    liquidityFeePct:await call(token,'_liquidityFee'),
    bnbPoolAddress:await call(token,'bnbPoolAddress'),
    swapCoolDownTime:await call(token,'swapCoolDownTime'),
    presaleEnded:await call(token,'presaleEnded'),
    totalSupplyWei:await call(token,'totalSupply'),
    maxTxAmountWei:await call(token,'_maxTxAmount'),
    bnbBalanceWei:(await provider.getBalance(LEGACY.addresses.token,BLOCK)).toString(),
    bnbhBalanceWei:await call(token,'balanceOf',LEGACY.addresses.token),
  },
  pool:{
    bnbHeroAddress:await call(pool,'bnbHeroAddress'),
    bnbBalanceWei:(await provider.getBalance(LEGACY.addresses.pool,BLOCK)).toString(),
    bnbBalance:formatEther(await provider.getBalance(LEGACY.addresses.pool,BLOCK)),
    bnbhBalanceWei:await call(token,'balanceOf',LEGACY.addresses.pool),
  },
  character:{ totalSupply:await call(character,'totalSupply') },
  notes:[
    'All scalar values above are direct eth_call/account-state reads at the target block.',
    'numTokensToSend() reverting is itself preserved: that later-source getter is not exposed by the exact 17-Nov Core implementation.',
    'Internal operation->token->burn batching architecture is corroborated separately by the recovered late-Nov Solidity mirror and is not mislabeled as byte-identical 17-Nov source.'
  ]
};
fs.writeFileSync(OUT,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out,null,2));
