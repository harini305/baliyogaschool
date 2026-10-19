# 01 — Audit Report: baliyogaschool.com (Phase 1)

**Audit date:** 2026-10-19 · **Original site:** https://www.baliyogaschool.com/ · **Workspace:** `D:\baliyogaschool16` (empty at start: no code, assets or prior evidence)
**Method:** headless Chrome 1440/768/390 (Playwright, run from a temporary folder outside the project), WordPress REST API and Yoast sitemaps read through the browser session, computed-style extraction, pixel sampling, in-browser range requests for image sizes. A Cloudflare JS challenge blocks plain HTTP clients (403), so every page was loaded in a real browser.

## 1. Website overview
- **Business:** Bali Yoga School® — Yoga Alliance–registered yoga teacher trainings (multistyle Hatha/Ashtanga Vinyasa and Yin, 50–500 h), short courses (prenatal, aerial, astrology), sound/Reiki/Ayurveda healing courses and sessions, and 3–11-day retreats, across **Ubud, Uluwatu and Canggu (Bali)**, with the sister school **Himalayan Yoga Association / Himalayan Yoga Ashram, Rishikesh (India)**, plus online courses. Founder: Yogi Himanshu Joshi.
- **Platform:** WordPress + ThemeREX "Great Lotus" theme + WPBakery, custom post type `courses`, Yoast SEO, WPForms, Cloudflare.
- **Size:** 125 pages + 106 courses + 3 course groups + 385 posts + 95 categories; 3,662 media items (2,643 public).
- **Conversion model:** enquiry-led. "Book Now" goes to the contact form; deposits are paid through Razorpay links or bank transfer; WhatsApp, LINE, Tawk.to chat, and a 30%-off lead popup.

## 2. Coverage

| Status | Count | Detail |
|---|---|---|
| **Fully inspected** (rendered, scrolled, text + structure + images + links + forms + embeds extracted; above-the-fold screenshot) | **306 URLs** | All pages, all courses, course groups, author, 45 footer-linked categories, blog index p1–2, `/ja/`, `/ko/`, search, 8 sample posts, 404 test |
| **Inspected at 3 viewports** (full-page screenshots + metrics) | 20 key pages | See `07` |
| **Interaction states tested** | Mega-menus (5), "⋮" menu, mobile/tablet drawer + submenu, lead popup show/close, home slider (autoplay), home FAQ accordion, footer "Read all" + "Languages", contact-form validation, scrolled header | `screenshots/states/` |
| **Partially inspected** (metadata only via REST/sitemap) | ~377 posts, ~50 categories, 2,643 media items | `content/blog-posts-index.csv`, `assets/media-library-index.csv` |
| **Discovered but inaccessible** | ~1,019 media items not publicly listable; the WP pages behind `/yoga-retreat-in-bali/` and `/meditation/` (shadowed by categories) | — |
| **Broken / unavailable routes** | `/intellectual-property-policy/` (404, linked site-wide), `/yoga-teacher-training-courses-in-los-angeles/` (410, in menu), 4 `#` menu items, `/appointment/` + `/our-events/` (raw shortcodes) | `08` §C |
| **Interactive states not verified** | Form delivery (contact, registration, popup), Razorpay/PayPal flows, Tawk.to conversation, slider arrow behaviour (inconclusive), hover effects on cards, animation timings | `06` §6 |
| **Limitations** | Bot challenge (worked around with real browser); full-page screenshot stitching artefacts on very tall pages; some lazy images blank in captures; breakpoints between tested widths not swept | `07` |

## 3. Routes (summary)
Full table with a recommendation per route: `02-page-inventory.md` §5. Summary of recommendations: 66 course pages to implement via the course template, 26 retreat pages via the retreat template, ~26 hubs/listings, 5 core contact/payment pages, ~12 about/utility pages, 59 blog/archive routes (low priority), 55 international routes to review (27 thin course pages + 28 cloned landings), 13 HYA mini-site pages to review, ~15 duplicates/legacy redirects/broken pages.

## 4. Page-by-page section inventory
`02-page-inventory.md` §3 (home, templates, key pages in detail) and §5 (all 306 routes with section headings), plus `content/pages/<slug>.md` (heading outline, section order and full text for each URL).

## 5. Content preservation
`03-content-inventory.md`: business facts, offerings catalogue with representative fees, people, trust content, FAQs, policies, SEO metadata, blog, and repetition/duplication analysis. Verbatim text for all 306 URLs is in `content/pages/`; structured fees and dates for 140 course/retreat pages are in `content/courses-fees-dates.csv`.

## 6. Assets
`04-assets-manifest.csv` covers **1,917 distinct images** used by the crawled pages (filename, URL, full-size original URL, type, context, pages, sections, intrinsic and displayed size, file size, alt text, media ID, availability, concerns).
- **Local copies:** 460 core images (79 MB) in `assets/original/` (mirrors `wp-content/uploads/YYYY/MM/`): logos/favicon, sitewide images, and every image on 22 core pages.
- **Remote only (verified 200):** 1,269 · **external hotlinks (unverified):** 185 · **broken (`<img src="">`):** 3.
- Total weight of referenced images: **437 MB**; 320 > 500 KB; 81 > 1 MB; 660 usages lack alt text.
- Videos: 30 YouTube videos and 2 MP4s in the media library; 15 Google Map embeds (`assets/video-and-map-embeds.csv`).
- No font files, SVG logo or brochures were found: the media library holds no PDFs, and the only PDF linked from crawled pages is an external Yoga Alliance standards document.

## 7. Typography (original)
10+ families in use: **Lora** (body/nav, theme-hosted), **Quicksand** (headings/buttons, theme-hosted), Segoe UI/Arial/Georgia (system, newer blocks and footer), Inter (declared, not loaded), Poppins + Cormorant Garamond (Google; popup), Open Sans + Rokkitt (theme), plus 8 icon fonts. Details and scale: `05` §2.

## 8. Colours
Verified brand: primary orange **#ED6F2D**, CTA oranges **#FF9046 / #FFA64D**, saffron **#F49D15**, logo **#F08436 → #F89850 → #F8D8B0**, burnt accents **#BD4F08 / #A7460A**, terracotta **#C8744A**; text **#4A403C / #685950**; backgrounds **#FFFFFF / #F6F7FA / creams #FFFAF6 #FFF3E6 #EEE8E3**. Incidental: sky-blue buttons #69CFF3, WhatsApp/LINE greens, Tawk yellow. `05` §3.

## 9. Navigation & interaction
6-item mega-menu grouped by location + "⋮" overflow (~20 items) on desktop; dark left drawer on tablet/mobile; header not sticky; floating LINE/WhatsApp/chat/scroll-top; lead popup every 24 h. `06`.

## 10. Responsive
No horizontal overflow except on the home page. Mobile pages are extremely long (course page up to 70,931 px), the hero shrinks to ~190 px, and the footer is ≈5,800 px on mobile. `07`.

## 11. Dependencies
WordPress/WPForms, Formspark (`submit-form.com`), Razorpay, PayPal.me, Tawk.to, GTM/GA4/Google Ads, YouTube, Google Maps, WhatsApp/LINE, sister domains (HYA, online courses, partner sites), and hotlinked images from himalayanyogaashram.com. `06` §5.

## 12. Missing assets, inaccessible pages, inconsistencies
`08`: 17 factual inconsistencies (founding year, durations, phone/email, teachers, discounts…), copy errors, 19 technical issues, 11 information requests, audit limits.

## 13. Phase 2
`09`: mandatory design rules, IA proposal, data model, asset plan, functional carry-over and quality gates, including the `images: { unoptimized: true }` merge requirement.

## 14. Confirmations
- The **two-font rule** and all mandatory design, content, footer, image and performance requirements are recorded in `09` §2 (and `05` §2.4).
- **No redesign, UI code, configuration change, package installation in the project, GitHub push or deployment was performed.** The only additions to the workspace are this `docs/source-audit/` folder: documentation, screenshots, extracted text and downloaded copies of original images. Audit tooling (Playwright) was installed in a temporary folder outside the project.

## 15. Fact levels used in this audit
- **Verified:** read from DOM, computed CSS, HTTP responses, REST API, or image pixels.
- **Observed:** seen in screenshots or while interacting, not measured.
- **Estimate:** labelled as such (e.g. some container widths, the brown of the footer banner, animation timing).
- **Unknown:** listed in `08` §D/E.
