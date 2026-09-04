# Final literal-name bridge hunt — 2026-09-04

Goal: try to upgrade the remaining non-DIRECT Hero numeric-name mappings **ID4 / ID19 / ID20 / ID21** without inventing evidence.

## Exact historical token anchors created first

The full Market snapshot at BSC block **12,730,607** supplied real listed NFTs for each remaining numeric Hero ID:

| heroNameId | historical token anchor | exact tokenURI at block 12,730,607 |
|---:|---:|---|
| 4 | #6179 | `https://metadata.bnbheroes.io/token/6179.json` |
| 19 | #14480 | `https://metadata.bnbheroes.io/token/14480.json` |
| 20 | #14185 | `https://metadata.bnbheroes.io/token/14185.json` |
| 21 | #30998 | `https://metadata.bnbheroes.io/token/30998.json` |

These are direct on-chain joins: `getHero(tokenId,false).name` gives the numeric Hero ID and `tokenURI(tokenId)` gives the first-party metadata URL.

## Routes tried

1. **Live first-party metadata host**
   - All four exact token URIs currently fail because `metadata.bnbheroes.io` is dead/unreachable.

2. **Wayback / Common Crawl**
   - Prior project archaeology already performed host/path-wide searches after the `.json` suffix was proven and recovered no metadata body.
   - Fresh exact-token probes on 2026-09-04 again produced no surviving body: Common Crawl 2022-05 explicitly returned `No Captures found` for all four exact URLs; 2021 index attempts were either no-capture or archive-gateway timeout/rate-limit.
   - A final small multi-index retry hit upstream 502 before returning additional evidence. Repeating archive saturation is not justified without a new archive source/index.

3. **Public web/search index**
   - Exact token-ID + BNBH/BNB Heroes searches produced no relevant indexed historical page tying these NFTs to literal Hero names.
   - Exact literal Hero-name + BNB Heroes/stat searches did not surface a stronger source than the already-preserved first-party/period evidence.

4. **Public code search / source mirrors**
   - No indexed public source was found that ties `heroNameId` 4/19/20/21 directly to the literal names.
   - The later Honeyvig Solidity mirror stores numeric Hero IDs/stats, not the missing literal-name bridge, so implementation archaeology cannot resolve ID20 vs ID21 by itself.

## Strongest surviving evidence and final confidence

No confidence label is artificially upgraded.

- **ID4 = Aelof Orstone — HIGH_COMPLETE_SET**
  - on-chain Uncommon slot;
  - all other Uncommon names are uniquely period-stat joined;
  - Aelof is the only unmatched old-roster Uncommon;
  - preserved first-party GitBook order agrees.

- **ID19 = Uriah the Sage — HIGH_CLASS_ROSTER**
  - on-chain Legendary `heroClass=4`;
  - period calculator identifies Uriah as the Legendary mage;
  - preserved first-party roster order agrees.

- **ID20 = Sir Asten — HIGH_STRUCTURAL**
- **ID21 = Duke Duscair IV — HIGH_STRUCTURAL**
  - 21-slot launch insertion/order continuity is independently proven;
  - preserved first-party GitBook Legendary order supports this assignment;
  - period calculator contains a copy error for the Legendary stat rows and cannot distinguish these two;
  - no surviving token-metadata body or literal token screenshot was recovered to make either DIRECT.

## Closure rule

Treat the four mappings above as the current evidence ceiling. Do **not** reopen the same Wayback/Common-Crawl/metadata/GitHub searches unless one of these appears:

- a newly available archive collection/WARC,
- first-party source containing literal names beside numeric IDs,
- period screenshot/video showing a token ID together with a literal Hero name/art bridge,
- cached NFT metadata body from `metadata.bnbheroes.io`.

Runtime art/name assignment remains unchanged because the present mapping is the strongest complete reconstruction, but IDs 4/19/20/21 must retain their explicit non-DIRECT confidence labels.
