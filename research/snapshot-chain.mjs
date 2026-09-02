import { JsonRpcProvider, Contract, formatEther } from 'ethers';
import fs from 'fs';
const p=new JsonRpcProvider('https://bsc-dataseed.binance.org/',56,{staticNetwork:true});
const addr={
 core:'0xde9fFb228C1789FEf3F08014498F2b16c57db855',
 token:'0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267',
 character:'0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01',
 pool:'0xdE8c58d082d39D04DC2e5241a3a65911454674CD',
 oracle:'0xD160bbDED5cFF79b126443EefCB28F3b67991140',
 randoms:'0xB81Cd7e88feAda830E7C1095909db3F5336d8664'
};
const charAbi=[
 'function name() view returns(string)','function symbol() view returns(string)','function totalSupply() view returns(uint256)','function tokenByIndex(uint256) view returns(uint256)','function tokenURI(uint256) view returns(string)',
 'function heroTypes(uint256) view returns(uint256)','function heroNames(uint256) view returns(uint256)','function heroClasses(uint256) view returns(uint256)','function attacks(uint256) view returns(uint256)','function armors(uint256) view returns(uint256)','function speeds(uint256) view returns(uint256)','function randomTable(uint256) view returns(uint256)','function baseChances(uint256) view returns(uint256)','function baseBNBRewards(uint256) view returns(uint256)','function baseEnemyXps(uint256) view returns(uint256)','function requiredHps(uint256) view returns(uint256)','function baseTownTimes(uint256) view returns(uint256)','function baseTownRatio(uint256) view returns(uint256)','function maxHeroesCount() view returns(uint256)','function maxHP() view returns(uint256)','function secondsPerHp() view returns(uint256)','function characterLimit() view returns(uint256)','function heroArrivalTime() view returns(uint256)'
];
const oracleAbi=['function getCharacterPrice() view returns(uint256)','function getExpeditePrice() view returns(uint256)','function getTownUpgradePrices() view returns(uint256[])','function getTokenPrice() view returns(uint256)','function characterPriceInBNB() view returns(uint256)','function bnbhPrice() view returns(uint256)','function basePriceToUnlockInBNB() view returns(uint256)','function unlockRate() view returns(uint256)','function isStarted() view returns(bool)'];
const c=new Contract(addr.character,charAbi,p), o=new Contract(addr.oracle,oracleAbi,p);
async function arr(fn,max=150){const out=[]; for(let i=0;i<max;i++){try{out.push((await c[fn](i)).toString())}catch(e){break}} return out}
const snap={timestamp:new Date().toISOString(),chainId:56,addresses:addr,character:{},oracle:{}};
for(const fn of ['name','symbol','totalSupply','maxHeroesCount','maxHP','secondsPerHp','characterLimit','heroArrivalTime']){try{snap.character[fn]=(await c[fn]()).toString()}catch(e){snap.character[fn]=null}}
for(const fn of ['heroTypes','heroNames','heroClasses','attacks','armors','speeds','randomTable','baseChances','baseBNBRewards','baseEnemyXps','requiredHps','baseTownTimes','baseTownRatio']) snap.character[fn]=await arr(fn);
for(const fn of ['getCharacterPrice','getExpeditePrice','getTownUpgradePrices','getTokenPrice','characterPriceInBNB','bnbhPrice','basePriceToUnlockInBNB','unlockRate','isStarted']){try{const v=await o[fn](); snap.oracle[fn]=Array.isArray(v)?v.map(x=>x.toString()):v.toString()}catch(e){snap.oracle[fn]=null}}
try{const tid=await c.tokenByIndex(0); snap.character.sampleTokenId=tid.toString(); snap.character.sampleTokenURI=await c.tokenURI(tid)}catch(e){snap.character.sampleTokenError=e.shortMessage||e.message}
fs.writeFileSync('research/chain-snapshot.json',JSON.stringify(snap,null,2));
console.log(JSON.stringify(snap,null,2));
