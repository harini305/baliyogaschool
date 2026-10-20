# Phase 2 hand-off — Bali Yoga School frontend rebuild

Status: local frontend build, ready for review. Nothing has been pushed, deployed or connected to a live service.
Supporting files: `route-map.md` (all retained routes and 518 redirects) and `source-issues.md` (1,573 per-page issues flagged while extracting the original content).

## 1. Project and run command
- Directory: `D:\baliyogaschool16` (Next.js 16.4.2 App Router, React 19.3.1, GSAP 3.15.0, JavaScript, CSS / CSS Modules).
- Run: `npm install`, `npm run build`, `npx next start -p 4517` (any free port; ports 3000 and 3210 on this machine are used by other projects). Development: `npm run dev`.
- `next.config.mjs` merges `images: { unoptimized: true }` with `trailingSlash: true` and the local redirect plan.

## 2. Routes
142 statically generated routes, all at their original URLs (see `route-map.md`):
- 77 course pages under `/courses/<slug>/`: 20 multistyle teacher trainings (Ubud, Uluwatu, Canggu and Rishikesh × 50/100/200/300/500 h), 12 Yin, 5 short courses, 29 sound / Reiki / Ayurveda courses, 11 online.
- 29 root-level programme pages: 26 retreats (Ubud 9, Uluwatu 9, Canggu 8) and 3 one-to-one sessions.
- 14 listing pages: `/courses/`, `/courses_group/yin-yoga-ttc/` and 13 hubs (four campus teacher-training hubs, healing ×2, sound, Reiki, Ayurveda, online ×2, retreats ×2).
- 20 other pages: home, about, founder, teachers, management, reviews, accreditation, FAQ, terms, IP policy, contact, registration, payment, food, drop-in classes, 3 campus pages, blog index, plus 2 blog articles.

## 3. Broken links repaired
| Original problem | Resolution |
|---|---|
| Footer "Trademark & IP Policy" → `/intellectual-property-policy/` (404, every page) | Footer links to `/intellectual-property-copyright-trademark/`; the old URL redirects there |
| Menu Los Angeles TTC → 410 | Removed from the menu; the URL redirects to `/courses/` |
| 4 `href="#"` menu items (Tokyo, Phuket, Nepal, Cambodia) | Removed (no verified programmes) |
| `href="http:baliyogaschool@gmail.com"` on ~233 pages | Removed. Contact details are shown as text with a Copy button |
| `/appointment/`, `/our-events/` (raw shortcodes) | Not rebuilt; they redirect to `/contact/` and `/courses/` |
| `/yoga-retreat-in-bali/`, `/meditation/` (pages shadowed by categories) | Redirect to `/yoga-retreats-in-bali/` and `/blog/` |
| Menu links that redirected (`…-in-india` Rishikesh courses, guest-post pages) | The menu links point straight to the final URLs; the old URLs redirect |
| Drop-in class booking form (raw `[contact-form-7]` shortcode) | Replaced by a link to the enquiry form |

The automated crawl found 248 distinct internal links, all returning 200 directly (no internal link relies on a redirect). No `href="#"` remains.

## 4. Retained, merged and retired routes
- **Retained:** all genuine Bali course, retreat and healing pages; the 5 Rishikesh TTC pages; online courses; the core information pages.
- **Merged:** Canggu 300/500 root duplicates → `/courses/` versions (the 500 h page gained the 300 h syllabus from its duplicate). Level 2/3 sound "-2" duplicates. The hidden prenatal page (an older copy of the 5-day course with fees copied from a Canggu retreat). Gallery, second/third accommodation and videos pages → Ubud campus page. `/hya-affiliations/` and `/yoga-alliance-registration/` → `/bys-affiliations/`. `/bali-yoga-retreats/` → `/yoga-retreats-in-bali/`. The obsolete 2021 online 200 h page → the current online 200 h page.
- **Retired (redirected):** 20 international clone hubs (Bali text repeated word for word), 24 international TTC course pages plus 8 international listings (deposit only, no dates), 3 country clones of the online 200 h course, 13 HYA / Rishikesh mini-site pages and 5 India healing/retreat hubs, 2 online healing hubs (no course pages behind them), 4 guest-post pages, the 2021 COVID page, `/achivments/` (images only), SEO filler pages, 49 blog archives and 383 blog posts.
- **Visa page retired:** `/bali-visa-on-arrival-fees-requirements/` describes an abolished visa-free scheme and quotes conflicting fees, so it redirects to the FAQ, which tells visitors to check official sources.

## 5. Redesigned UI (summary)
Warm editorial layout on white, cream and sand surfaces, using genuine photography. The header is a compact sticky bar (68 px) with five grouped dropdowns and an Enquire button; tablet and mobile use a full-screen drawer. The home page is a short introduction with a tabbed programme finder, campus cards, founder, accreditation, three reviews, the Rishikesh sister school, six FAQs and a call to action. Course pages use one template: split hero with key facts, a sticky in-page navigation, overview with an "At a glance" panel, curriculum modules as accordions, dates and fee table, daily schedule and inclusions, practical information accordions, FAQ, related programmes and a call to action. `/courses/` compares programmes in an hours × campus matrix that becomes lists on phones. Hubs use photo cards for teacher training and compact list rows for long, similar lists (healing levels, retreats). The footer is a single compact band.

Page heights (final crawl): desktop median 4,673 px (max 7,330), mobile median 7,530 px (max ~12,000). The original 200 h Ubud page was 38,998 px desktop / 70,931 px mobile; the new one is 6,565 px desktop. The footer is 370 px on desktop and 915 px on mobile (originally ~3,200 / ~5,800 px).

## 6. Fonts and colour
- **Fonts (revised at the owner's request to match the logo):** Architects Daughter, the closest available match to the hand-drawn "BALI YOGA SCHOOL" lettering in the logo (no font file exists for the logo itself; it is part of the image), used for headings, navigation, buttons and labels. Quicksand 500/600/700, a rounded geometric face, is used for body text, forms, tables, small labels and all prices, for legibility. Both are self-hosted via `next/font`. The crawl found only these two families in computed styles on every route.
- **Palette:** brand orange `#ED6F2D` (accents, rules, focus underline only), `#FF9046` / `#FFA64D` (accents on dark), burnt orange `#A8440D` for primary buttons and links (white text 6.0:1) with hover `#8A370A`, body text `#3A302C` (12.8:1), headings `#4A403C`, secondary text `#685950` (≥5.8:1 on every surface), surfaces `#FFFFFF` / `#FFFAF6` / `#F6EEE6` / `#FDEEE2`, footer `#2F2622`, borders `#E6D8CB`, focus ring `#A8440D` (light) or `#FF9046` (dark). The sky-blue `#69CFF3` is not used. Contrast was checked for all text pairs (lowest 5.23:1). The original white-on-orange buttons (3.04:1) and grey body text (3.42:1) are gone.

## 7. Original content and assets reused
- Text: 106 programme pages, 19 hubs and 12 content pages were extracted into `src/data/extracted/` from `docs/source-audit/content/pages/`. Teachers, management, founder, reviews and contact details come from their audited pages. Spelling and punctuation were corrected; nothing was invented.
- Not reproduced: superlatives and unverifiable claims ("best yoga school", "4.8 star", "thousands of students", "195 countries", "one of the youngest teachers"), health/medical benefit lists, copied text from another campus (detected and dropped automatically), editorial notes left in live pages, and discount percentages.
- Images: 82 genuine original images, selected after visual inspection. Teacher portraits are mapped by the audit's alt text, because several filenames are misleading (e.g. `yogini-nikki-…` files show Yogini Shanti, and `head-management.jpeg` shows a garden path). Images with baked-in promotional text (discount tiles, retreat posters, the Ayurveda, aerial and astrology banners) are not used, so those pages have text-only heroes.

## 8. Image optimisation
`scripts/optimize-images.py` reads `scripts/image-selection.json` and writes WebP derivatives at 480 / 960 / 1600 px (capped at the source width) to `public/images/`, plus `src/data/images.json` with dimensions, `srcSet` and alt text. Selected originals total 21.5 MB; all 200 derivative files total 10.6 MB, and a typical 960 px card image is 40–110 KB. Every `<img>` has width/height (no layout shift), a `sizes` attribute and lazy loading below the fold; hero images load eagerly with `fetchpriority="high"`. Decorative review avatars have empty alt; every other image has descriptive alt text. `docs/source-audit/assets/original/` is unchanged.

## 9. Course template and structured data
`src/components/ProgrammePage.js` renders every course, retreat and session from its JSON record. Sections render only when the source has that information. `src/lib/catalog.js` applies these rules consistently:
1. Paragraphs mentioning another campus are dropped (e.g. Uluwatu cliffs on an Ubud page, Himalayan text on Bali pages, DPS airport on Rishikesh pages).
2. FAQs without a captured answer are hidden (91 of 107 course FAQ answers were never captured).
3. A fee whose "offer" is under 40% of the listed fee is shown as "Awaiting confirmation" (Level 2 Reiki "$353 → $31").
4. Batch dates that ended before October 2026 are hidden, with a count shown (151 such dates); if all dates have passed a notice is shown (300 h Yin Uluwatu).
5. Teacher-training lengths are withheld (see §15).

## 10. Interactions implemented
Desktop dropdowns (hover, click, keyboard Enter/Escape/Tab; they close after navigation), mobile/tablet drawer (scroll lock, Escape, closes on navigation), home programme finder (ARIA tabs with arrow keys), FAQ and curriculum accordions (native `<details>`), sticky in-page section navigation with current-section highlight, enquiry pre-selection from course pages (`/contact/?course=…`), contact and registration forms (required fields, email and phone format, error summary with focus, `aria-invalid`, explicit "checked but not sent" result), Copy buttons for email and phones, GSAP reveal and parallax.

## 11. Demo-only confirmation
No booking, payment, email, chat, WhatsApp, LINE, Tawk.to, Formspark, Razorpay or PayPal integration exists. The forms have no action URL and make no network requests (verified: zero external requests on the contact page). The result panel says the enquiry was **not sent**. Payment links and bank details are not published. The discount popup was **not** recreated: its offer (30% vs 20%, dated 30 Oct 2026) is unverified, and the site advertises no discount, countdown or urgency.

## 12. Build
`next build` completes with no errors or warnings. All 144 static pages generate (142 routes plus the 404 page and internal files).

## 13. Testing actually performed (Chrome via Playwright, Windows)
- **Crawl:** all 142 routes at 1440×900, 768×1024 and 390×844 (426 page loads). Checks: HTTP status, console and page errors, failed requests, broken images, images without alt, horizontal overflow, h1 count, font families, content left invisible by animation, footer metrics, and every internal link.
- **Screenshots:** full-page captures of 32 representative routes (every template and campus) at all three widths, plus viewport screenshots of key sections, reviewed by eye.
- **Interactions:** 41 scripted checks (`interactions.mjs`): menus, drawer, tabs, accordions, anchor offsets, forms, copy, no external requests, reduced motion, JavaScript disabled, and animation clean-up after client-side navigation.
- **Final regression (after all fixes):** 426/426 page loads returned 200 with no console errors, failed requests, broken images, images without alt, horizontal overflow or `href="#"`, and exactly one `h1` each. Fonts in use: Quicksand and Lora only. Internal links: 248, all 200. Interactions: 41/41 passed. The crawler's "content still fading in" flag fired on 11 loads; inspection shows every element reaches full opacity within 3 s (the crawler scrolls a whole page in about a second, so many reveals start at once). Nothing stays hidden. With reduced motion or JavaScript disabled, all content is visible immediately (tested).

**Not tested:** Safari/WebKit, Firefox, real iOS/Android devices, screen readers (only ARIA semantics were checked), Lighthouse/Core Web Vitals scores, breakpoints between the three required widths beyond ad-hoc resizing, slow networks.

## 14. Visual and functional defects found and fixed during QA
- Mobile drawer collapsed to the header height (`backdrop-filter` made the header the containing block). Fixed with a solid header.
- Desktop dropdown stayed open after a link click (pointer still hovering). Fixed: it closes and hover is suppressed until the pointer leaves.
- GSAP `autoAlpha` hid unrevealed content from find-in-page and assistive tech. Changed to opacity only.
- Long staggered lists took seconds to appear. The total stagger is now capped at 0.45 s.
- Anchor jumps landed under the sticky header and sub-navigation. Scroll padding increased.
- The error summary didn't receive focus. Focus now moves after React commits.
- The form result showed the course slug instead of its name. Fixed.
- Horizontal overflow from long two-month batch labels (tablet), a mobile timetable, and a mobile fee cell. Fixed with wrapping.
- The dropdown "Overview" link was squeezed into one column. The panel layout was reworked.
- Batch date chips wrapped onto two lines; the teacher list was a tall single column. Both compacted.
- A retained retreat URL collided with an old blog-post redirect (`/7-days-yoga-retreat-in-bali/`), as did `/yoga-retreats-in-bali/`. Redirects now skip any retained page.
- Wording added during the build that wasn't in the source ("Bukit peninsula", "vegan meals" on all retreats) was removed. "Best …" prefixes were removed from titles.

## 15. Unresolved factual conflicts and owner questions
1. **Founding year:** 2016 / 2017 / 2018 (founder vs director statements), plus 2012 and 1999 elsewhere, and "established 2019" in the IP policy. No year is published.
2. **Teacher-training durations:** they conflict across pages (100 h shown as 12, 13 and 15 days; 200 h as 24 and 25; 300 h meta "25-day" vs 28; 500 h arithmetic inconsistent; Uluwatu/Canggu hour calculations add to 52, 60 or 120 h). No day count is shown for multistyle or Yin TTC; pages say "awaiting confirmation" and list the published batch dates. Healing, short-course, retreat and session durations are shown where each page is internally consistent.
3. **100 h page "50h • 8 days":** not used.
4. **300 h Yin "Coming Soon" vs listed dates:** the course page is shown with its own dates and fees; the home claim is not repeated.
5. **Contact details:** Mobile +91 72172 06223 and WhatsApp +91 82797 05844 (Indian numbers) and info@baliyogaschool.com, as on the contact page, are shown as text with an "awaiting confirmation" note. Not used: the gmail address (also used inside the IP policy text, reproduced as written), the typo address, and the 2018 blog number. No tel:/mailto:/WhatsApp links.
6. **Street addresses** for Uluwatu (map pin "Puri Sabina") and Canggu ("Hotel Made Canggu 77") were never published.
7. **Discounts (30% vs 20% vs 10%, popup expiry):** no percentage is advertised. Fee tables show "published fee" and "listed full fee" with a confirmation notice.
8. **Fees:** Ubud Yin fees equal Ubud multistyle fees; 12-day prenatal, aerial and astrology share one fee set; Level 2 Reiki "$353 → $31" typo; several "20% off" figures are not actually 20%; online 15-day courses are $500 on their pages but $240 on a listing; the deposit is $250 on the registration page but not stated on the payment page.
9. **Teacher roster and roles:** the teachers page roster is used (Shanti, Nikki, Chiara, Pandu, Babloo, Chetan, Laksmi, plus the founder). Yogini Idatrini (home only) and Vaishnavi (home only) are not shown. Sumit and Priya are "IT & Operations" and Divya "Management", per the management page (home differs). Prenatal page teacher heading copied from sound healing.
10. **Accreditation scope:** RYS 200 and RYS 300 certificates are shown. RYS 500 and Yoga Alliance status of 50 h, Yin, online and 100 h courses need confirmation. The "certified by the government of Indonesia" FAQ claim is not published.
11. **Massage inclusions:** the 7-day Ubud retreat's "6 complimentary massages" is shown as published. The hub claim of daily massages "in every retreat" is false for several retreats and is not used.
12. **Copied-campus text** on many Uluwatu/Canggu/Rishikesh pages (A13 and others) has been suppressed; the business should rewrite those passages.
13. **Online courses:** whether they are Bali Yoga School or Himalayan Yoga Association courses, and whether they are Yoga Alliance certified.
14. **Excluded FAQ entries:** medical advice (vaccines, malaria), outdated visa advice, "PhD" teacher-qualification claim, empty "payment options" answer.
15. **Blog:** only 2 of 385 posts were retained. Two more were rejected for garbled text and time-sensitive legal claims; the 2018 "Benefits" post is machine-spun. Decide whether the archive stays on WordPress.
16. **Analytics IDs, form delivery targets, payment channels and Tawk.to** all await confirmation before any integration.
17. **International programmes and Rishikesh content:** confirm which (if any) should return.
18. **The 200 h Ubud FAQ:** 20 of 21 answers were never captured; they are needed from WordPress.

## 16. Missing original content or assets
- No SVG or high-resolution logo; the 662 px PNG is used at 52 px beside a typographic wordmark. The favicon is derived from the 378 px crop.
- Home FAQ answers, most course FAQ answers, the food menus (images of tables) and drop-in class times are missing.
- Rishikesh, Ayurveda, aerial and astrology have no clean photographs in the local set (the remote originals were not downloaded), so those pages use other campus photos or text-only heroes.
- YouTube videos and Google Maps are not embedded (third-party services out of scope); map pin names are given as text.
- Retreat and short-course batch dates are often "contact us".

## 17. Remaining limitations
- Content is static JSON; there is no CMS.
- Fees and dates are a snapshot from October 2026 and are not live.
- Hero images on a few pages reuse campus photos.
- Some extracted pages still contain long curriculum lists (kept in accordions).
- No sitemap.xml, robots.txt or JSON-LD yet (recommended in audit §09 §4).
- Full-page screenshot captures sometimes show lazy images blank; viewport screenshots confirm they load correctly.

## 18–19. Git and deployment
A local Git repository was initialised and the work committed (see the final hand-off message for the commit ID). Nothing was pushed to GitHub, deployed to Vercel, or changed in DNS or on the live WordPress site.
