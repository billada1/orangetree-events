# orangetree.events

Fast static site for Orange Tree Events (Astro 7). English at `/`, Turkish at `/tr/`.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

## Where things live

| What | File |
| --- | --- |
| Every event (upcoming and archive) | `src/data/events.ts` |
| Artists and bios | `src/data/artists.ts` |
| Photos and hero slideshow order | `src/data/photos.ts` (files in `src/assets/photos/`) |
| Stories (backdated posts) | `src/content/stories/<slug>.en.md` and `<slug>.tr.md` |
| All interface text, EN and TR | `src/i18n/ui.ts` |
| Old WordPress URLs → new pages, security headers | `vercel.json` |

To add an event, copy an entry in `events.ts`. An event with a date on or after today (Sydney time) shows under What's on; after that it moves to the archive on the next build. Leave out `date` and set `confirm: true` while details are being checked (those pages are hidden from Google until dated).

To add a story, add `my-story.en.md` (and optionally `my-story.tr.md`; Turkish falls back to English). Link it from the event with `story: 'my-story'`.

## Built in

- Static HTML, images resized to AVIF/WebP at build, self-hosted fonts, no third-party scripts.
- Content Security Policy with hashed scripts (Astro `security.csp`), HSTS and other headers in `vercel.json`.
- Per-page title, description, canonical, hreflang EN/TR, Open Graph, sitemap, robots, JSON-LD (Organization, Event with offers, Article, Person).
- Hero: canvas slideshow with burn, paper-scrunch and emblem-iris transitions; mic intro once every 30 days; reduced motion respected throughout.
- Lighthouse (mobile, local): home 95 / 100 / 100 / 100.

## Hosting on WPX

Pushes to `main` (and a nightly run, so finished events move to the archive) build the site and upload it to WPX by SFTP: `.github/workflows/deploy-wpx.yml`. `scripts/htaccess.mjs` turns the redirects and headers in `vercel.json` into `.htaccess`; the mailing-list form posts to `api/subscribe/index.php`.

GitHub → Settings → Secrets and variables → Actions:

| Kind | Name | Value |
| --- | --- | --- |
| Variable | `WPX_SFTP_HOST`, `WPX_SFTP_USER`, `WPX_SFTP_PORT` | `au1.wpxhosting.com`, the orangetree.events FTP user, `2222` |
| Secret | `WPX_SFTP_PASSWORD` | That FTP user's password |
| Secret | `BREVO_API_KEY` | ATAM's Brevo key |
| Variable | `WPX_WEBROOT` | `/new.orangetree.events/public_html` for staging, later the live site's folder |
| Variable | `SITE_ENV` | `staging` (hidden from Google) or `production` |
| Variable | `SITE_URL` | e.g. `https://new.orangetree.events` (enables the smoke test) |
| Variable | `BREVO_LIST_EN`, `BREVO_LIST_TR`, `BREVO_DOI_TEMPLATE_ID` | `3`, `4` (ATAM's Brevo), and a double opt-in template number when one exists |

The workflow stays off until `WPX_WEBROOT` is set. It never uploads secrets into the web folder: the Brevo settings go to `ot-config.php` one level above it.

## Before launch

- [ ] ABN in footer, terms of sale, privacy policy, refund policy (placeholders in square brackets).
- [ ] Photographer credit for the 2018 photos.
- [ ] Mailing list: `api/subscribe.js` sends sign-ups to Brevo (double opt-in). Set `BREVO_API_KEY`, `BREVO_LIST_EN`, `BREVO_LIST_TR`, `BREVO_DOI_TEMPLATE_ID` in Vercel,.
- [ ] Live hosting is WPX (paid plan you already have). The Vercel project is only a free preview.
- [ ] Ticket sales (box office spec in the plan doc) come in phase 2.
- [ ] DNS: follow the "Redirects and DNS" checklist; keep the WPX mail records.
