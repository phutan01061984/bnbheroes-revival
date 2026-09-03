# EIP-1967 proxy discovery — BNB HEROES legacy contracts

Recovered read-only on 2026-09-03 from public BSC mainnet/testnet RPC using the standard EIP-1967 implementation/admin/beacon storage slots. Reproducible script: `proxy-discovery.mjs`; machine-readable result: `PROXY_DISCOVERY.json`.

The previously observed identical 2,141-byte runtime at Core/Character/Market/Oracle is confirmed to be an EIP-1967 proxy runtime, not game logic.

## Mainnet current proxy state

| Contract | Proxy | Implementation | Implementation bytes | Admin |
|---|---|---|---:|---|
| Core | `0xde9fFb228C1789FEf3F08014498F2b16c57db855` | `0x7E12cb515361E1fD2aDAc92018E70Ac76019b07d` | 16011 | `0xA6f76A3f9a42B184cAf05eb14D45C9d3C842e1fF` |
| Character | `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01` | `0x3D833FFb8A19DDA5e44Fc34D5AB666Fa24c6e9E6` | 18814 | `0xA6f76A3f9a42B184cAf05eb14D45C9d3C842e1fF` |
| Market | `0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac` | `0x3c72e11BD64Bf0E2C0344B92A243bB9CA7e229aA` | 13317 | `0xA6f76A3f9a42B184cAf05eb14D45C9d3C842e1fF` |
| Oracle | `0xD160bbDED5cFF79b126443EefCB28F3b67991140` | `0x247E23BacE48bba978466675e663AfaAd082cb69` | 5186 | `0xA6f76A3f9a42B184cAf05eb14D45C9d3C842e1fF` |

No beacon slot is populated.

## Testnet current proxy state

Testnet proxies use common admin `0x60b75A63C716C7AA5703ABa319d1093C5E0A604A` and separate current implementations:

- Core: `0x79AD76dAD45543763704ef8a344b7021080B6aBf` (15361 bytes)
- Character: `0xaf7d7d1F4DC85e4beBB04E44cAA9bf924a6c6C71` (17525 bytes)
- Market: `0xcC5f4a1F616BBEb8537B8e77BFFD25Eb556c3a92` (13392 bytes)
- Oracle: `0x7833058027Bb507C46E03934e448c7934130A1eF` (5186 bytes)

These current implementations must **not** automatically be treated as the Nov-2021 implementation. The next step is historical `Upgraded(address)` / proxy-admin history and historical implementation bytecode.
