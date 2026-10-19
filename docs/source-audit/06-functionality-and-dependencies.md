# 06 — Functionality & Technical Dependencies

Verification levels: **Observed** (seen) · **Interaction tested** (clicked/hovered, UI response seen) · **Functionality verified** (intended outcome confirmed) · **Partially verified** · **Unverified**.
No real enquiries, registrations, payments or chat messages were submitted. Forms were tested only with an empty submit, which triggers client-side validation and sends nothing.

## 1. Platform

| Item | Finding | Level |
|---|---|---|
| CMS | WordPress (REST API at `/wp-json/wp/v2/` is public) | Verified |
| Theme | "Great Lotus" by ThemeREX (`/wp-content/themes/great-lotus/`), originally a Buddhist-temple theme; its demo routes are still listed in `robots.txt` | Verified |
| Page builder | WPBakery (js_composer 7.9) + ThemeREX `trx_addons` + Mega Addons for VC; newer blocks are hand-written HTML/CSS (some load `cdn.tailwindcss.com` on 23 pages) | Verified |
| Custom post types | `courses` (`/courses/…`) and `courses_group` taxonomy (`/courses_group/…`) | Verified |
| SEO | Yoast SEO (sitemaps, canonicals, JSON-LD), "All Meta Tags" plugin (author: Himanshu Joshi, designer: Shailesh Tripathi, keywords, Pinterest/Yandex verification) | Verified |
| Edge / security | Cloudflare with a JS bot challenge ("Just a moment…"): plain HTTP clients get 403; images cached at CF are public | Verified |
| Image delivery | The server/CDN returns **WebP for `.jpg/.png` URLs** when the browser sends `Accept: image/webp` (content negotiation) | Verified |
| Prefetch | "Flying Pages" plugin (hover prefetch, max 3 RPS) | Observed |
| Analytics / ads | Google Tag Manager / gtag (GA4 `G-D2K63S3JDF` cookie), Google Ads conversion (`AW-11447120730`), Google Site Kit events | Observed |

## 2. Navigation & routing

| Feature | Details | Level |
|---|---|---|
| Desktop mega-menu | 6 top items: Multistyle TTC · Yin TTC · Short Courses · Healing Courses · Retreats · Online Courses (→ external `himalayanonlineyogacourses.com`), plus a "⋮" overflow menu. Hover opens dropdowns grouped by location (Ubud, Rishikesh, Uluwatu, Canggu) with fly-out sub-menus. Active item = saffron colour + underline. | Interaction tested (`screenshots/states/desktop_menu_*.jpg`) |
| "⋮" overflow menu | Guest Post (2) · Contact · The Founder · Head Management · Yoga Teachers · Upcoming Courses (TTC / Retreats / Healing × 9 international locations) · Payment · About Us · 5 campus photo/video pages · Food Menu · Blog · FAQ · Yoga Alliance Registration · BYS Affiliations · HYA Affiliations | Interaction tested |
| Mobile/tablet menu | Hamburger (`trx_addons_icon-menu`) opens a dark left drawer (≈320 px) listing all 25 top-level items with chevron toggles for sub-menus; close "×" | Interaction tested (`mobile_menu_open.jpg`, `mobile_menu_submenu.jpg`, `tablet_menu_open.jpg`) |
| Sticky header | **Not sticky**: the header scrolls away on all viewports | Verified |
| Menu destinations to Rishikesh sister site | Rishikesh Yin TTC, healing and retreat items link to `himalayanyogaashram.com` (external) | Observed |
| Dead / broken menu items | 4 `href="#"` items (Upcoming TTC: Tokyo, Phuket, Nepal, Cambodia); Los Angeles TTC → 410; 3 Rishikesh course links redirect | Verified |
| Scroll-to-top | Fixed button bottom-right after scrolling | Observed |
| Search | `/?s=` works (results page renders a post list); there is no visible search field in the header | Functionality verified (results page) |

## 3. Conversion & enquiry flows

| Feature | Details | Level |
|---|---|---|
| "Book Now" buttons on course/retreat pages | **All link to `/contact/`**; there is no booking engine, cart or availability check. Dates show static "Available"/"Closed" labels typed into the page. | Verified (links) |
| Contact form (`/contact/`, also on About) | WPForms #6229, AJAX submit. Fields: Name*, Email*, Phone* (intl-tel with country flags), Address (line 1, city, state, country dropdown), Message. Empty submit → 3 × "This field is required." | Interaction tested (validation only); **delivery Unverified** |
| Course registration (`/course-registration/`) | WPForms #6257: First*, Last*, Email*, Mobile*, Gender* (multi-select), Address* (line, city, state, postal, country) + course-specific fields (see page text) and a "Refund Policy" block | Observed; delivery Unverified |
| 30%-off lead popup (all pages) | Modal shown 1.5 s after load, re-shown every 24 h (localStorage `bysx_offer_last_seen`, cookie fallback). Fields: Name, Email, WhatsApp number → `POST https://submit-form.com/oki85PuZk` (Formspark, third-party). Closes via ×, overlay click, Esc. Text: "Offer valid until 30th / Oct /2026". | Interaction tested (show + close); submission Unverified |
| Payment (`/course-payment/`) | 2 Razorpay payment links (`rzp.io/l/oPEyEy1W` TTC; `rzp.io/rzp/2OO1Ppd` retreats/healing/ayurveda) + bank-transfer details; other pages link `rzp.io/l/course-fee-payment` and PayPal.me `himalayanyogaashram`. Advance fee is non-refundable, with a 3% surcharge. | Observed (links not followed) |
| Appointment (`/appointment/`) | Raw `[booked-calendar calendar="35"]` shortcode: the "Booked" plugin is inactive | Verified broken |
| Events (`/our-events/`) | Raw `[trx_sc_events …]` shortcode | Verified broken |
| Reviews CTA | Course pages link to the Google review form `g.page/r/CXU-Q1-mBKGoEAE/review` | Observed |
| Phone / WhatsApp / LINE | Floating LINE (line.me) and WhatsApp (`wa.me`) buttons bottom-left on every page; `tel:+918279705844` in footer | Observed |
| Live chat | Tawk.to widget (`embed.tawk.to/6776e68a49e2fd8dfe01c7bc/1igk7943l`), bubble bottom-right with "We Are Here!" label and auto-greeting. It also rewrites `document.title` ("1 new message"). | Observed |
| Malformed email link | `href="http:baliyogaschool@gmail.com"` on ~233 pages (should be `mailto:`) | Verified |

## 4. Content widgets

| Widget | Where | Level |
|---|---|---|
| Home hero slider (custom "hya-bys-unique-slider-2026") | `/`: full-width image slides, ❮ ❯ arrows, dots, autoplay ≈5–6 s | Autoplay verified; arrow click inconclusive (Partially verified) |
| Swiper / WP Carousel Free carousels | Home course/teacher rows, galleries, founder page | Observed |
| Lightbox (Magnific Popup / Fancybox) | Galleries, video thumbnails | Observed |
| YouTube embeds | 30 distinct videos across 128 iframe placements (lazy `about:blank` until scrolled) — list in `assets/video-and-map-embeds.csv` | Observed |
| Google Maps embeds | 15 distinct embeds on 132 pages: Ubud campus (−8.5219, 115.2497), Uluwatu "Puri Sabina" (−8.8016, 115.1489), Canggu "Hotel Made Canggu 77" (−8.6449, 115.1313), Rishikesh HYA (30.0587, 78.2735) | Observed |
| FAQ accordions | Home (10 Qs, custom JS) — click expands an answer; course pages use 23 native `<details>` elements; `/frequently-asked-questions-faq/` is plain text | Interaction tested (home) |
| Footer "Read all remaining guidelines" | Expands the Code of Conduct list | Interaction tested |
| Footer "Languages" | `<details>` listing 21 language names (Arabic … Vietnamese) as **plain text: no links, no translation function** | Interaction tested; no translation exists |
| hreflang `ja` / `ko` | `<link rel=alternate>` to `/ja/` and `/ko/`, which are blog filters with 1 and 0 posts (not translations) | Verified |
| Instagram block | "5k+ Instagram followers @baliyogaschool" static link (no feed) | Observed |
| Social share buttons | Blog list "SHARE" | Observed |
| Post grids | "The Post Grid" plugin for related articles | Observed |

## 5. External services & hosts relied on

| Dependency | Purpose | Phase-2 action |
|---|---|---|
| WordPress backend (content, WPForms entries, media) | All content + form storage | Decide: keep WP as headless CMS, export to static data, or replace forms with a form service |
| WPForms → email (destination unknown) | Contact/registration delivery | **Ask business** for recipient addresses and whether entries are stored |
| submit-form.com (Formspark) `oki85PuZk` | Lead popup | Keep the endpoint or replace; confirm ownership |
| Razorpay links, PayPal.me | Deposits | Keep links (business-owned) |
| Tawk.to property `6776e68a49e2fd8dfe01c7bc` | Live chat | Keep the embed if wanted (third-party script) |
| WhatsApp +91 8279705844, LINE, phone +91 7217206223 | Direct contact | Keep |
| Google Tag Manager / GA4 / Google Ads | Analytics and conversion tracking | Re-implement; confirm IDs with business |
| YouTube (30 videos), Google Maps (15 embeds) | Media and location | Use lite-embeds/facades |
| `himalayanyogaashram.com` | 131 images hotlinked, ≈13,000 link occurrences across crawled pages (mostly menu) | Keep links; download or replace hotlinked images |
| `himalayanonlineyogacourses.com` | "Online Courses" menu target | Keep link |
| Partner sites in footer (10) | HYA, baliyogaschool.org, himalayanyogacafe.com, himalayanyogaspa.com, baliyogaretreat.org, himalayansoundhealingschool.com, reikihealingrishikesh.com, balireikihealingschool.com, balisoundhealingschool.com | Confirm which to keep |
| cdn-icons-png.flaticon.com, images.pexels.com, img.youtube.com | Hotlinked icons, stock image, video thumbs | Replace with local/owned assets |
| cdn.tailwindcss.com (runtime Tailwind) | Used by some custom blocks | Not needed in Phase 2 |
| Yoga Alliance, IYO registries | Credential links (`app.yogaalliance.org`, `iyoyoga.com`, `yogaiyo.org`) | Keep links |

## 6. Not present / not verified
- No user accounts or login UI (the theme's login script is loaded, but there is no visible login).
- No e-commerce/cart/checkout on this domain.
- No functional site translation.
- Whether WPForms actually emails anyone, and to which address, is **unverified**.
- The Tawk.to inbox and Formspark inbox owners are unknown.
- Razorpay/PayPal links were not opened, to avoid initiating payments.
