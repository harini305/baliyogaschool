# 08 — Issues, Gaps, Inconsistencies & Open Questions

Everything here was observed on 2026-10-19. **Nothing has been "corrected"**: these items need a decision from the business before Phase 2 changes any fact.

## A. Factual inconsistencies (need business confirmation)

| # | Issue | Evidence |
|---|---|---|
| A1 | **Founding year** stated as 2017 (home "Since 2017"; management page "began in 2017"), 2016 (11 pages), 2012, 2018 and 1999 (1 page each); meta copyright "© 2019" | `content/pages/*` |
| A2 | **Course durations conflict.** Home cards: 100 h = 15 days, 200 h = 25 days, 300 h = 28 days, 500 h = 58 days, Yin 50 h = 8 days. Elsewhere: 100 h = 12 or 13 days, 200 h = 24 days (Uluwatu batches run 1st–24th), 50 h = 6, 7, 8 or 12 days | Home vs hub pages vs course pages |
| A3 | `/courses/100-hour-yoga-teacher-training-in-bali/` says **"Course length: 50h • 8 days (7 nights)"** under its fee table (copy-paste error) | page text |
| A4 | Home shows **300 h Yin = "Coming Soon"**, but `/courses/300-hour-yin-yoga-teacher-training-in-ubud-bali/` has fees and dates (e.g. 3rd–30th Jan 2027) | Home vs course page |
| A5 | Ubud **Yin** fees are identical to Ubud **multistyle** fees for 50/100/200 h; 12-day prenatal, aerial and astrology courses share identical fee sets | `content/courses-fees-dates.csv` |
| A6 | **Phone numbers:** footer "+91 8279705844"; contact page "Mob: +917217206223" and "Whatsapp: +918279705844" (Indian numbers for a Bali school); HYA uses +917217206223 too | Footer, `/contact/` |
| A7 | **Emails:** info@baliyogaschool.com vs baliyogaschool@gmail.com (meta and broken footer link) vs info@www.baliyogaschool.com (typo, 1 page) | Various |
| A8 | **Postcode:** "80571" (address) vs "8057" (bank address on payment page) | `/course-payment/` |
| A9 | **Teachers differ:** home lists Idatrini (not on teachers page); teachers page includes Himanshu Joshi; roles of Sumit/Priya/Divya differ between home and management page; Vaishnavi only on home | Home vs `/accomplished-yoga-gurus-…/` vs `/bys-head-management/` |
| A10 | Prenatal course page heading "Teachers of This Best Sound Healing Course in Bali" (copied heading) | `/prenatal-postnatal-…/` |
| A11 | Discounts: course pages say 30% OFF; healing courses and retreats say 20% off; popup says "30% OFF 50/100/200 hrs … Offer valid until 30th / Oct /2026"; promo images show 30% TTC, 20% retreat, 20% healing. **Which discount applies, and is it permanent?** | Various |
| A12 | Ubud retreat inclusions: 7-day retreat promises "6 Full-Body Complimentary Balinese Massage" vs YTT "1 complimentary Balinese massage" (may be correct, verify) | Retreat vs course pages |
| A13 | Uluwatu 200 h healing add-on note says sessions are conducted "at Himalayan Yoga Association" (copied from the Rishikesh template) | `/courses/200-hour-…-uluwatu-bali/` |
| A14 | 2026 Uluwatu batches Mar–May are "Closed" while Ubud lists "Available" through 2027. Is availability maintained manually? Are the labels current? | Course pages |
| A15 | International "upcoming" TTC/retreat/healing pages (Japan, Spain, Mexico, Costa Rica, Nepal, Cambodia, Russia, Thailand, LA, Germany, Goa, Kerala): are these real, scheduled offers? Several show only a "500 USD" deposit and no dates; the LA TTC page returns **410 Gone** | `02` §3.4 |
| A16 | Testimonials are undated and appear to be from ~2020–21 | `/bali-yoga-school-reviews/` |
| A17 | Reviews page links to Google reviews but no rating/count is displayed. Do not invent ratings | — |

## B. Spelling / copy errors (do not silently fix; confirm wording)
"Achivments"/"Achivements" (page slug, button), "Daily Shedule" (47 pages), "complementary"/"complementa" for complimentary (32 pages), "U.S dolors", "Ayurvedia Massages", "7 Days Ayurvedic Message" (menu), "Pohkara" (menu), "Dhayan" (likely "Dhyan", 23 pages), "Uluwatu(Bali)" missing space (menu), "Is 100 hours yoga course is yoga alliance certified ?" (FAQ grammar), "Covid guideline's F & Q", "Copy-write © 2019" (meta).

## C. Broken / technical issues

| # | Issue |
|---|---|
| C1 | Footer "Trademark & IP Policy" → `/intellectual-property-policy/` **404** on every page |
| C2 | `href="http:baliyogaschool@gmail.com"` (not mailto) on ~233 pages |
| C3 | `/appointment/` and `/our-events/` render raw shortcodes |
| C4 | Menu: 4 `href="#"` items; Los Angeles TTC → 410; 3 Rishikesh items via redirect |
| C5 | Sitemap pages `/yoga-retreat-in-bali/` and `/meditation/` are shadowed by same-slug blog categories (the page content is unreachable) |
| C6 | Duplicate routes (guest posts, food menu, Canggu 300/500, prenatal, "-2" courses); 32 published posts missing from the sitemap |
| C7 | hreflang `ja`/`ko` point to blog filters, not translations; the footer "Languages" list is decorative text |
| C8 | Most pages have **no `<h1>`**; heading levels used for styling |
| C9 | `<title>` rewritten by Tawk.to ("1 new message") |
| C10 | Home page horizontal overflow (15 px desktop, 10–15 px mobile/tablet) |
| C11 | `/courses/200-hour-yin-yoga-teacher-training-in-bali/`: standard footer missing |
| C12 | 3 `<img>` with empty `src` (300 h & 500 h Uluwatu, HYA reviews) |
| C13 | 660 image usages with no alt text; text baked into many images |
| C14 | 437 MB of images referenced by crawled pages: 320 files > 500 KB, 81 > 1 MB (largest ~2.3 MB PNG); 120 large PNG photos; 144 images served ≥2.5× larger than displayed; 2,560 px "-scaled" originals shown at ~400 px |
| C15 | 131 images hotlinked from himalayanyogaashram.com; Flaticon icons, a Pexels stock photo and YouTube thumbnails hotlinked |
| C16 | 10+ font families and 8+ icon fonts loaded; runtime Tailwind CDN on 23 pages; jQuery loaded twice (WP + code.jquery.com 3.6.0) |
| C17 | `robots.txt` full of unrelated "Great Lotus" temple-theme paths |
| C18 | Footer ≈3,200 px desktop / ≈5,800 px mobile |
| C19 | Course pages 25,000–40,000 px (desktop) and up to 71,000 px (mobile) |

## D. Missing information / assets (need from business)
1. **Master logo** in SVG or high-resolution transparent PNG; a square favicon/app icon (only a 378 px PNG crop exists).
2. Street addresses for the **Uluwatu** and **Canggu** campuses (only map pins).
3. Which phone/WhatsApp/email to publish, and where WPForms / Formspark / Tawk.to deliver.
4. Confirmation of the current teacher and management roster with roles and approved photos.
5. Current discount policy and offer end dates.
6. Whether international "upcoming" programs and the Rishikesh/HYA mini-site pages stay on this site.
7. Whether the blog moves to the new site (385 posts) or stays on WordPress.
8. Home FAQ answers (collapsed at capture; questions recorded, answers need retrieval from WordPress).
9. Rights to hotlinked HYA images; replacement for the Pexels/Flaticon assets.
10. Analytics/Ads IDs to keep (GA4, Google Ads `AW-11447120730`, GTM container).
11. Video assets: only 2 MP4s are in the media library (Canggu site videos); everything else is on YouTube.

## E. Audit coverage limits
- Bot protection meant all access went through a real headless Chrome session; no server or CMS access.
- ~377 blog posts and ~40 category archives were catalogued from the REST API and sitemap and were not individually rendered.
- 1,019 media-library items are not publicly listable (3,662 total vs 2,643 returned), probably attached to private/draft content.
- Form submission, payment links, chat and popup submission were **not** exercised end-to-end.
- Hover states were observed for menus and buttons only via screenshots; animation timings are estimates.
- Breakpoints between the three tested widths were not swept.
