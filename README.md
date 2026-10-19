# Bali Yoga School — Phase 2 frontend

A frontend-only rebuild of baliyogaschool.com in Next.js (App Router, JavaScript), with GSAP + ScrollTrigger for motion and plain CSS / CSS Modules for styling. Content and images come only from the Phase 1 audit in `docs/source-audit/`.

**This is a local preview.** It has no backend: forms validate and show what *would* be sent, but nothing is transmitted, booked or paid.

## Run locally

```bash
npm install
npm run build
npx next start -p 4517     # any free port; open http://localhost:4517
# or, for development:
npm run dev
```

Node 20+ is required (tested with Node 24.13). The production build downloads Lora and Quicksand from Google Fonts once and self-hosts them, so the first build needs internet access.

## Project structure

| Path | Purpose |
|---|---|
| `src/app/` | Routes. Original URLs are kept with trailing slashes (`trailingSlash: true`). |
| `src/app/courses/[slug]/` | All `/courses/<slug>/` pages, built from one data-driven template |
| `src/app/[slug]/` | Root-level retreats, one-to-one sessions, hub listings and retained blog articles |
| `src/components/ProgrammePage.js` | The shared course / retreat / session template |
| `src/data/extracted/*.json` | Structured content extracted from `docs/source-audit/content/pages/` (one file per page) |
| `src/lib/catalog.js` | Loads the programme data and applies the presentation rules (see file header) |
| `src/lib/hubs.js` | Hub listing pages and which original intro paragraphs they use |
| `src/data/site.js`, `people.js`, `reviews.js` | Contact facts, navigation, teachers, management, reviews |
| `src/data/redirects.mjs` | Redirect plan for retired, merged and broken URLs (applied by `next.config.mjs`) |
| `scripts/image-selection.json` | Curated original images with alt text |
| `scripts/optimize-images.py` | Generates WebP derivatives in `public/images/` (`npm run images`; needs Python + Pillow) |
| `scripts/route-map.mjs` | Writes `docs/phase-2/route-map.md` from the build output |
| `docs/source-audit/` | Phase 1 audit — read-only; original images in `assets/original/` are never modified |
| `docs/phase-2/` | Route map and hand-off report |

## Design system

- Fonts: **Quicksand** (headings, navigation, buttons, labels) and **Lora** (body copy) — no other families.
- Colour tokens are in `src/app/globals.css` (`:root`). Primary actions use burnt orange `#A8440D` with white text (AA); brand orange `#ED6F2D` is used for accents and rules only.
- Motion: `src/components/Motion.js` — reveal-on-scroll and light parallax via `gsap.matchMedia()`, disabled under `prefers-reduced-motion`, reverted on every route change.
