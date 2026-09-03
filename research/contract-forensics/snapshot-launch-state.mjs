import { JsonRpcProvider, Contract } from 'ethers';
import fs from 'node:fs';

const BLOCK = Number(process.env.BNBH_BLOCK || 12723964);
const OUTPUT = process.env.BNBH_OUTPUT || 'LAUNCH_STATE_20211117.json';
const provider = new JsonRpcProvider('https://bnb-mainnet.g.alchemy.com/public', 56, { staticNetwork: true });
const address = {
  core: '0xde9fFb228C1789FEf3F08014498F2b16c57db855',
  character: '0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01',
  oracle: '0xD160bbDED5cFF79b126443EefCB28F3b67991140',
};
const charAbi = [
  'function name() view returns(string)','function symbol() view returns(string)','function totalSupply() view returns(uint256)','function tokenByIndex(uint256) view returns(uint256)','function tokenURI(uint256) view returns(string)',
  'function heroTypes(uint256) view returns(uint256)','function heroNames(uint256) view returns(uint256)','function heroClasses(uint256) view returns(uint256)','function attacks(uint256) view returns(uint256)','function armors(uint256) view returns(uint256)','function speeds(uint256) view returns(uint256)','function randomTable(uint256) view returns(uint256)','function baseChances(uint256) view returns(uint256)','function baseBNBRewards(uint256) view returns(uint256)','function baseEnemyXps(uint256) view returns(uint256)','function requiredHps(uint256) view returns(uint256)','function baseTownTimes(uint256) view returns(uint256)','function baseTownRatio(uint256) view returns(uint256)','function maxHeroesCount() view returns(uint256)','function maxHP() view returns(uint256)','function secondsPerHp() view returns(uint256)','function characterLimit() view returns(uint256)','function heroArrivalTime() view returns(uint256)'
];
const oracleAbi = [
  'function getCharacterPrice() view returns(uint256)','function getExpeditePrice() view returns(uint256)','function getTownUpgradePrices() view returns(uint256[])','function getTokenPrice() view returns(uint256)','function getUnlockLevelPrice(uint256) view returns(uint256)','function characterPriceInBNB() view returns(uint256)','function bnbhPrice() view returns(uint256)','function basePriceToUnlockInBNB() view returns(uint256)','function unlockRate() view returns(uint256)','function isStarted() view returns(bool)','function tokenAddress() view returns(address)','function pancakeswapV2Pair() view returns(address)','function pancakeswapV2Router() view returns(address)'
];
const c = new Contract(address.character, charAbi, provider);
const o = new Contract(address.oracle, oracleAbi, provider);
const opts = { blockTag: BLOCK };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function retry(fn, label) {
  let last;
  for (let n=0; n<6; n++) {
    try { return await fn(); } catch (e) {
      last=e;
      if (e?.code === 'CALL_EXCEPTION') throw e;
      await sleep(250*(n+1));
    }
  }
  throw new Error(`${label}: ${last?.shortMessage || last?.message || last}`);
}
async function scalar(contract, fn) {
  const v = await retry(() => contract[fn](opts), fn);
  return typeof v === 'bigint' ? v.toString() : v.toString();
}
async function fixedArray(fn, len) {
  const out=[];
  for (let i=0;i<len;i++) {
    const v=await retry(()=>c[fn](i,opts), `${fn}[${i}]`);
    out.push(v.toString());
  }
  return out;
}
async function discoveredArray(fn, maxLen) {
  const out=[];
  let stop=null;
  for (let i=0;i<maxLen;i++) {
    try {
      const v=await retry(()=>c[fn](i,opts), `${fn}[${i}]`);
      out.push(v.toString());
    } catch (e) {
      stop={index:i,error:e.message};
      break;
    }
  }
  return {values:out,discoveredLength:out.length,stop};
}
const snap={
  evidenceClass:'DIRECT_HISTORICAL_CHAIN_STATE',
  block:BLOCK,
  addresses:address,
  character:{},
  oracle:{},
};
for (const fn of ['name','symbol','totalSupply','maxHeroesCount','maxHP','secondsPerHp','characterLimit','heroArrivalTime']) snap.character[fn]=await scalar(c,fn);
for (const [fn,len] of Object.entries({heroTypes:21,heroNames:21,heroClasses:21,attacks:21,armors:21,speeds:21,randomTable:100})) snap.character[fn]=await fixedArray(fn,len);
for (const [fn,maxLen] of Object.entries({baseChances:16,baseBNBRewards:16,baseEnemyXps:16,requiredHps:16,baseTownTimes:32,baseTownRatio:32})) {
  const found=await discoveredArray(fn,maxLen);
  snap.character[fn]=found.values;
  snap.character[`${fn}Discovery`]={discoveredLength:found.discoveredLength,stop:found.stop};
}
for (const fn of ['getCharacterPrice','getExpeditePrice','getTokenPrice','characterPriceInBNB','bnbhPrice','basePriceToUnlockInBNB','unlockRate','isStarted','tokenAddress','pancakeswapV2Pair','pancakeswapV2Router']) {
  try { snap.oracle[fn]=await scalar(o,fn); } catch(e) { snap.oracle[fn]={error:e.message}; }
}
try {
  const v=await retry(()=>o.getTownUpgradePrices(opts),'getTownUpgradePrices');
  snap.oracle.getTownUpgradePrices=Array.from(v,x=>x.toString());
} catch(e) { snap.oracle.getTownUpgradePrices={error:e.message}; }
snap.oracle.getUnlockLevelPrice={};
for (const level of [1,2,3,10,50,100]) {
  try {
    const v=await retry(()=>o.getUnlockLevelPrice(level,opts),`getUnlockLevelPrice(${level})`);
    snap.oracle.getUnlockLevelPrice[String(level)]=v.toString();
  } catch(e) { snap.oracle.getUnlockLevelPrice[String(level)]={error:e.message}; }
}
for (const tokenId of [0,1,2,10,100,1000,10000,100000,309731]) {
  try { snap.character[`tokenURI_${tokenId}`]=await retry(()=>c.tokenURI(tokenId,opts),`tokenURI(${tokenId})`); } catch(e) { snap.character[`tokenURI_${tokenId}`]={error:e.shortMessage||e.message}; }
}
const block = await provider.getBlock(BLOCK);
snap.timestamp = new Date(Number(block.timestamp)*1000).toISOString();
fs.writeFileSync(new URL(`./${OUTPUT}`,import.meta.url),JSON.stringify(snap,null,2)+'\n');
console.log(JSON.stringify({block:snap.block,timestamp:snap.timestamp,totalSupply:snap.character.totalSupply,randomTable:snap.character.randomTable,oracle:snap.oracle},null,2));
