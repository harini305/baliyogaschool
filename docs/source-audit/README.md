# Source Audit — baliyogaschool.com (Phase 1)

Research-only audit of https://www.baliyogaschool.com/, captured **2026-10-19**, as the basis for a Phase-2 redesign in Next.js. **No implementation has been done.** Phase 2 waits for approval.

## Start here
1. `01-audit-report.md`: overview, coverage, headline findings, confirmations.
2. `08-issues-gaps-questions.md`: what needs a business answer before building.
3. `09-phase-2-recommendations.md`: mandatory design rules (two-font rule, footer, images, `images: { unoptimized: true }`), IA proposal, data model, quality gates.

## Documents
| File | Purpose |
|---|---|
| `01-audit-report.md` | Audit summary, coverage record, limitations |
| `02-page-inventory.md` | Route discovery, page types, key pages in detail, hidden/duplicate/broken routes, **table of all 306 crawled URLs with a recommendation each** |
| `03-content-inventory.md` | Business facts, offerings and fees, people, trust content, FAQs, policies, SEO, blog, duplication analysis |
| `04-assets-manifest.csv` | 1,917 images used by the site: URL, local path, page/section mapping, sizes, alt, availability, concerns |
| `05-brand-reference.md` | Logo, original fonts and type scale, verified colour palette, visual identity |
| `06-functionality-and-dependencies.md` | Navigation, forms, booking/payment flows, widgets, third-party services, verification levels |
| `07-responsive-observations.md` | Desktop 1440 / tablet 768 / mobile 390 behaviour and metrics |
| `08-issues-gaps-questions.md` | Inconsistencies, copy errors, technical problems, missing info, audit limits |
| `09-phase-2-recommendations.md` | Requirements and implementation considerations for Phase 2 |

## Evidence folders
| Path | Contents |
|---|---|
| `content/pages/<slug>.md` | One file per crawled URL (306, including the 404 test): meta, heading outline, section order, **full visible text** |
| `content/pages-index.csv` | Index of all crawled URLs (status, type, title, description, canonical, H1, counts) |
| `content/courses-fees-dates.csv` | Schedules, fee options and price strings for 140 course/retreat pages (best-effort parse; verify against page text) |
| `content/blog-posts-index.csv`, `content/blog-categories.csv` | All 385 posts and 95 categories (from the WP REST API) |
| `assets/original/` | **460 original images (79 MB)** downloaded unmodified, mirroring `wp-content/uploads/YYYY/MM/…` (logos, favicon, sitewide images, all images on 22 core pages). Do not edit; generate web versions elsewhere. |
| `assets/media-library-index.csv` | 2,643 public WordPress media items (URL, date, mime, alt) |
| `assets/video-and-map-embeds.csv` | 30 YouTube videos, 15 Google Map embeds, with pages |
| `screenshots/` | Above-the-fold for every URL, full-page captures of 20 pages at 3 viewports, interaction states. See `screenshots/README.md` |

## Key facts at a glance
- WordPress + ThemeREX "Great Lotus" + WPBakery; behind a Cloudflare bot challenge.
- 125 pages · 106 courses · 385 posts · 4 locations (Ubud, Uluwatu, Canggu, Rishikesh) + online.
- Enquiry-led: all "Book Now" buttons → `/contact/`; deposits via Razorpay/bank; WhatsApp, LINE, Tawk.to, 30%-off popup (Formspark).
- 10+ font families today; **Phase 2 must use exactly two.**
- Brand: saffron/orange (#ED6F2D, logo #F08436/#F89850) on white/cream, warm brown text (#4A403C).

## Fact levels
Verified (DOM/CSS/HTTP/API/pixels) · Observed (screenshots/interaction) · Estimate (labelled) · Unknown (listed in `08`).
