# Giddy2School campaign site
Static site (no build step, no third-party scripts). Deploy: push to GitHub, Settings > Pages > Deploy from branch (main, root).

## Updating the live total (Finance only)
Edit `data/raised.json`: set `raised` (CONFIRMED donations in USD only), `donors`, and `updated` (ISO time). Commit. The live page picks it up within minutes.
Never count pledges. Keep write access limited, 2FA on, branch protection on.

Other settings: `CONFIG` at the top of `script.js`; `CFG` at the top of `raised.js`.
Do not commit internal campaign documents or donor lists to a public repo.
