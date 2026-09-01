# BNB HEROES 2021 web archaeology

This note records the web/UI sources used by the preservation build. It separates recovered evidence from reconstruction so the revival does not silently invent a lost frontend.

## `play.bnbheroes.io`

Historical metadata for the game subdomain identifies the page title as `BNBHeroes` and description as `The first play to earn style NFT game`. A November 2021 response was a very small HTML document (~3.42 KB uncompressed) and third-party technology detection recorded Bootstrap, jsDelivr and Prototype. The last-modified value reported for the old game page was 2021-11-17 13:35:47 GMT.

The original game HTML/CSS/JS bundle has **not** been recovered byte-for-byte yet. The Wayback CDX and direct snapshot endpoints returned HTTP 429 from the current research environment. Common Crawl 2021 indexes returned no capture for the game subdomain, and urlscan has no scan indexed for `play.bnbheroes.io`.

Because the game source bundle is missing, the playable revival uses recovered contract logic while its visual layer is rebuilt from actual 2021 screenshots/media rather than pretending a newly written stylesheet is the lost original stylesheet.

## `bnbheroes.io` historical resource inventory

Public urlscan result pages preserve scans of the main site from 2021-12-03 and 2021-12-11. The site was WordPress 5.8.2 using Hello Elementor 2.4.1, Elementor 3.4.7 and Elementor Pro 3.5.0.

The scan preserves 94 first-party resource URLs plus SHA-256 hashes. The extracted inventory is stored at:

`research/web_archive/urlscan_2021_resources.tsv`

Recovered custom Elementor stylesheets include:

- `wp-content/uploads/elementor/css/post-4.css?ver=1636874969`
- `wp-content/uploads/elementor/css/post-18.css?ver=1636991387`
- `wp-content/uploads/elementor/css/post-28.css?ver=1636874971`
- `wp-content/uploads/elementor/css/post-39.css?ver=1638719480`
- `wp-content/uploads/elementor/css/global.css?ver=1636874971`

The urlscan page also preserves the exact plugin/theme JS and CSS versions loaded by the 2021 marketing site, including jQuery 3.6.0, Elementor frontend modules, Swiper 5.3.6 and Owl Carousel.

## Recovered original asset filenames

The 2021 urlscan request table exposes original official asset names including:

- `arnulf-of-esplin.png`
- `elrik-the-imbuer.png`
- `aelof-orstone.png`
- `andin-olis.png`
- `Balen-Fellwood.png`
- `Dayne.png`
- `duke-duscair-IV.png`
- `Esfel.png`
- `helia-stormcall.png`
- `Jan.png`
- `lady-ella-of-tir.png`
- `Lena.png`
- `reis-of-the-knife.png`
- `sir-asten.png`
- `sir-bertrand.png`
- `Sivalas.png`
- `thalas-one-eye.png`
- `Torlov.png`
- `uriah-the-sage.png`
- `xegis-branfyre.png`
- one generically named `Layer-1.png` asset in the same historical batch

Other recovered historical names include `BG-ff-min.jpg`, `level-1-scene-1024x507.jpg`, `level-4-1024x507.jpg`, `left-arrow.png`, `right-arrow.png`, and `BNBH-LOGO-150x150-1.png`.

The current origin no longer serves these files and the raw urlscan response-body endpoint is access-restricted, so filenames/hashes are evidence even where the original byte payload is not currently retrievable.

## Original visual evidence now stored locally

`assets/reference/x/official/` contains official images recovered from the historical `@BnbHeroes` timeline. High-value UI/art references include:

- post `1456311914401701928`: in-game dynamic success-rate UI
- post `1456264339355144194`: Open Beta V2
- post `1453726229463326730`: Beta test/game capture
- posts for Common / Uncommon / Rare / Epic / Legendary Hero art
- Elrik and Arnulf individual art
- four original Tier 1 enemy artworks
- four early concept-art images

`assets/reference/community/matters/result-enemy-defeated.png` is a preserved screenshot of the real 2021 result modal showing `RESULT`, `ENEMY DEFEATED`, the treasure chest and the three BNB / XP / HP result rows. The revival uses this recovered image as the actual visual shell for successful-fight results and overlays current simulated values on its value boxes.

`assets/reference/community/imgur/` contains two full-size screenshots linked by a contemporaneous PTT player report from November 2021.

The old bot repository also contains cropped visual templates and two 1920×1080 captures (`confirmedTransaction1-full.bmp` and `unlock-full.bmp`). They are retained in the ignored source mirror as forensic references, not shipped in the web build.

## Reconstruction policy

1. Use on-chain state/source as authority for gameplay numbers.
2. Use official 2021 media/captures as authority for visual character, palette and screen treatment.
3. Use exact historical website versions/asset names where recovered.
4. Clearly label features that are locally simulated.
5. Do not describe newly written HTML/CSS/JS as the original frontend unless its bytes are actually recovered and verified.
