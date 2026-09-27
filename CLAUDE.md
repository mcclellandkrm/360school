# 360School website (360school.co.uk)

Marketing site for 360School: 360° virtual tours and bespoke websites for schools in NI, ROI and GB.
Plain static HTML/CSS/JS. No build step.

## Deploy

- This repo is the single source of truth for the website pages.
- Push to `main` → GitHub Action (`.github/workflows/deploy.yml`) uploads to the Plesk server `httpdocs/` over FTPS using `lftp mirror -R`.
- The deploy only uploads and never deletes. Keep it that way. `httpdocs/` also holds folders that aren't in this repo (tours such as `LHS/`, `LHSv2/`, `SilverstreamPS/`, `MalluskIPS/`, `tours/`, plus `matomo/`, `.htaccess` and others). Karl manages those with FileZilla.
- Never upload site pages by hand with FileZilla. The server would drift from git.
- `development/` (Innovation Lab) is excluded from deploy until it's ready. It carries `noindex`.
- `dist/` and `includes/` are legacy and excluded from deploy. `old files/` is gitignored.
- Workflow: Claude edits and commits, and Karl pushes. Before editing, check that the working tree is up to date with `origin/main`.

## Files

- `index.html`: the whole homepage (single page with sections).
- `styles.css`: main styles. `footer.css` and `legal-pages.css` are shared.
- `js/effects.js`: GSAP scroll effects, header behaviour and form handling (Formspree).
- `privacy.html`, `cookies.html`: legal pages.
- `images/`: logo SVGs, `clients/` school logos.

## Style and copy conventions

- Brand orange `#FFAD00`, black and white. Font: Outfit (Google Fonts).
- UK spelling (optimised, enrol, colour).
- No em dashes in copy. Use a full stop, colon or comma instead.
- Tone: plain, honest and direct. Key message: one payment, you own it, no annual fees.
- Never invent testimonials or stats. Placeholders must be clearly marked and confirmed with Karl before going live.
- Check changes at phone width (~390px) as well as desktop. The top banner is fixed, and the header offset follows its height via `--banner-h`.
