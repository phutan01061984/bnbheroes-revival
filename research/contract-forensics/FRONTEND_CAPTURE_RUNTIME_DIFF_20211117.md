# Frontend-capture historical state promotion

Status: **promoted to offline runtime with direct historical-chain provenance**.

Authority: BSC block **12,730,607**, timestamp **2021-11-17T19:08:02.000Z**, mapped to the preserved frontend capture at ~2021-11-17 19:08:01 UTC (+1 second). Source: `FRONTEND_CAPTURE_STATE_20211117.json`.

## Material corrections versus pre-promotion runtime

- Recruit random table: **93/100 entries changed**; launch rarity distribution is **42 Common / 30 Uncommon / 16 Rare / 9 Epic / 3 Legendary**.
- Zangrief base chance: **280 → 400** (28% → 40%). Arnulf A600 therefore renders 46%, matching period UI.
- Base BNB rewards restored to **0.003 / 0.0036 / 0.0042 / 0.0048 / 0.0054 / 0.006 / 0.024 BNB**.
- Required-HP array corrected from 8 to **7** entries.
- Historical tokenURI corrected to `https://metadata.bnbheroes.io/token/0.json` (`.json` suffix).
- Recruit price frozen to **270231622141575625279 wei BNBH**; expedite to **27023162214157562527**; Town prices use the same capture block.
- Launch Oracle `getTokenPrice()` reverts and is not used by runtime. Unlock uses capture-block `bnbhPrice`, `basePriceToUnlockInBNB=0.008 BNB`, and `unlockRate=4`.

## Unlock semantics

The untouched 17-Nov React Hero components call `unlockLvl(tokenId, currentLevel)`; the handler calls `getUnlockLevelPrice(currentLevel)` and displays `Unlock LV. currentLevel+1`. Runtime therefore implements:

`bnbhPrice * 0.008 * (100 + 4*currentLevel) / 100`

Exact capture-block samples are preserved in `prototype/src/legacy-data.js` and locked by tests/provider verification.

## Promotion rule

Do not replace these values with a current-chain snapshot. Dynamic BNBH-denominated Oracle values are intentionally frozen to the exact frontend-capture block for preservation fidelity.
