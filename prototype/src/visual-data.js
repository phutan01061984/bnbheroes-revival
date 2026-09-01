// Visual references recovered from the original @BnbHeroes X account and 2021 community captures.
// These are archival assets, not AI-generated stand-ins.

export const VISUALS = {
  logo: '../assets/reference/x/profile/bnbheroes-profile.jpg',
  betaV2: '../assets/reference/x/official/29_1456264339355144194_FDWwqwzVQBAnDNK.jpg',
  betaOpen: '../assets/reference/x/official/35_1453726229463326730_FCysSxoVcBAd6W4.jpg',
  dynamicFight: '../assets/reference/x/official/27_1456311914401701928_FDXb7OrVIAQ_uJ5.jpg',
  resultWin: '../assets/reference/community/matters/result-enemy-defeated.png',
  heroSheets: {
    Common: '../assets/reference/x/official/48_1450758405648367622_FCIhEDHUcAcK4lv.jpg',
    Uncommon: '../assets/reference/x/official/47_1451185789505732622_FCOlxL8VEAYJ336.jpg',
    Rare: '../assets/reference/x/official/45_1452174581427433476_FCcpDoUUUAQTbN0.jpg',
    Epic: '../assets/reference/x/official/40_1452637439256760326_FCjOBNNUcAITyke.jpg',
    Legendary: '../assets/reference/x/official/37_1453328402631458828_FCtCeKWVQAUYmN5.jpg'
  },
  knownHero: {
    13: '../assets/reference/x/official/16_1459538330979237895_FEFSXrLVgAE0Lzq.png', // Arnulf of Esplin
    17: '../assets/reference/x/official/15_1459538479667318786_FEFSgUVVkAQc8WU.png'  // Elrik the Imbuer
  },
  conceptHeroes: [
    '../assets/reference/x/official/55_1443797856406544392_FAlmVVaVgAgUxs6.jpg',
    '../assets/reference/x/official/56_1443797856406544392_FAlmWaHVUAABoud.jpg',
    '../assets/reference/x/official/57_1443797856406544392_FAlmXMKVQAMPMKF.jpg',
    '../assets/reference/x/official/58_1443797856406544392_FAlmc0JVUAkicZh.jpg'
  ],
  enemies: [
    '../assets/reference/x/official/51_1443823313915027465_FAl9NJqVQAI8F__.jpg',
    '../assets/reference/x/official/52_1443823313915027465_FAl9OGdVIAATEEw.jpg',
    '../assets/reference/x/official/53_1443823313915027465_FAl9OwZVkAAgE3X.jpg',
    '../assets/reference/x/official/54_1443823313915027465_FAl9PeAVUAI0JsE.jpg'
  ],
  rarityPromos: [
    '../assets/reference/x/official/48_1450758405648367622_FCIhEDHUcAcK4lv.jpg',
    '../assets/reference/x/official/47_1451185789505732622_FCOlxL8VEAYJ336.jpg',
    '../assets/reference/x/official/45_1452174581427433476_FCcpDoUUUAQTbN0.jpg',
    '../assets/reference/x/official/40_1452637439256760326_FCjOBNNUcAITyke.jpg',
    '../assets/reference/x/official/37_1453328402631458828_FCtCeKWVQAUYmN5.jpg'
  ]
};

export const RECOVERED_ROSTER = [
  'Aelof Orstone','Andin Olis','Arnulf of Esplin','Balen Fellwood','Dayne',
  'Duke Duscair IV','Elrik the Imbuer','Esfel','Helia Stormcall','Jan',
  'Lady Ella of Tir','Lena','Reis of the Knife','Sir Asten','Sir Bertrand',
  'Sivalas','Thalas One-Eye','Torlov','Uriah the Sage','Xegis Branfyre'
];

export function heroArt(h){
  return VISUALS.knownHero[h.template] || VISUALS.conceptHeroes[h.template % VISUALS.conceptHeroes.length];
}

export function enemyArt(i){
  return VISUALS.enemies[i % VISUALS.enemies.length];
}
