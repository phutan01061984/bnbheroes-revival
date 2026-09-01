import assert from 'node:assert/strict';
import { freshState,recruit,fight,heroTemplate,currentHp } from '../prototype/src/engine.js';
let s=freshState();
assert.equal(s.heroes[0].name,'Arnulf of Esplin');
assert.equal(heroTemplate(17).name,'Elrik the Imbuer');
const before=s.bnbh; s=recruit(s,()=>0); assert.ok(s.bnbh<before); assert.equal(s.heroes.length,2); assert.equal(s.heroes[1].template,2);
let b=freshState(); const rewards=b.pendingBNB; b=fight(b,0,0,()=>0.999); assert.ok(b.pendingBNB>rewards); assert.ok(b.heroes[0].xp>1000); assert.ok(currentHp(b.heroes[0])<1000);
console.log('engine tests OK');
