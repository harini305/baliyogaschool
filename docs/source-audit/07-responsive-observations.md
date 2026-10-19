# 07 — Responsive Observations

**Tested viewports (actual):** Desktop 1440 × 900 (DPR 1, Windows Chrome UA) · Tablet 768 × 1024 (touch, iPhone UA) · Mobile 390 × 844 (touch, iPhone UA).
**Pages tested at all three sizes (20)** (note: "retreats-hub" was captured at `/yoga-retreat-in-bali/`, which turned out to serve the *blog category archive* "Yoga Retreat in Bali", so treat it as the blog-archive template): home, course-200h-ubud, course-200h-uluwatu, course-yin-200h, course-sound-healing, course-prenatal-5d, retreat-7d-ubud, retreats-hub, about, founder, teachers, contact, faq, registration, payment, campus-ubud-photos, reviews, blog, food-menu, upcoming-spain.
Screenshots: `screenshots/full-page/<page>__<viewport>[__partN].jpg` (downscaled to 720 / 512 / 390 px wide and split into 6,000 px parts), `screenshots/states/` (menus, popup, footer, FAQ, validation), and `screenshots/above-the-fold/<slug>.jpg` (1440 × 900 first screen of all 306 crawled URLs, downscaled to 720 × 450).
Raw metrics: see the table in §6.

**Capture limitations:** full-page captures of very tall pages sometimes repeat the top of the page in place of the footer (a stitching artefact on `home__desktop`), and some lazy-loaded portraits (e.g. teacher cards) are blank. The footer was therefore captured separately (`states/footer_desktop.jpg`, `states/footer_mobile.jpg`). The tablet home capture includes the lead popup. Other breakpoints (e.g. 1024, 1280, 360) were not systematically tested.

---

## 1. Header & navigation

| | Desktop 1440 | Tablet 768 | Mobile 390 |
|---|---|---|---|
| Header height | 148 px (white, light shadow) | 136 px | 136 px |
| Navigation | Logo left; 6 serif menu items + "⋮" overflow, hover mega-menus | Hamburger (≡) right; desktop nav hidden | Same as tablet |
| Menu panel | Dropdowns ~225 px wide; fly-outs to the right | Dark full-height drawer from left (~320 px) with all 25 items + chevron toggles | Same; drawer covers ~82% of the width |
| Sticky | No | No | No |

The mobile header is tall (136 px of a 844 px screen = 16%) for a non-sticky bar holding only a logo and a burger.

## 2. Layout & grids

- **Content width:** roughly 1,170–1,260 px container on desktop for most WPBakery rows; some rows are full-bleed; newer custom blocks use ~1,000–1,200 px. Side margins vary by block (estimate from screenshots).
- **Course card grids (home):** 4 columns (desktop) → 2 columns (tablet) → 1 column (mobile). On mobile the five course grids become ~20 stacked full-width cards, making the home page **37,726 px tall** (vs 21,223 desktop).
- **Team / teacher cards:** 4 → 2 → 1 columns.
- **Course detail pages:** single long column at all sizes; the flagship 200h Ubud page is **38,998 px (desktop) → 51,043 px (tablet) → 70,931 px (mobile)**. Fee cards stack to one column; the 17-row date list becomes a long vertical list.
- **Galleries:** 3–4 columns → 2 → 1–2.
- **Video blocks on course pages:** vertical 9:16 YouTube thumbnails ("200hrs YTT Moments", "Student Reviews") stack one per row on mobile and each fills most of a screen height.

## 3. Hero / imagery

- Home hero slider: ~660 px tall on desktop (cropped full-width photos with baked-in headline text); on mobile it shrinks to **~190 px** tall, so the baked-in text becomes unreadably small.
- Founder band: on mobile the large founder portrait with overlaid white text ("The vision behind the community…") takes almost a full screen.
- Promo tiles with baked "30% DISCOUNT" text: 3 across → stacked.
- Many images are 2,560 px "scaled" originals displayed at 300–600 px (see manifest concerns column).

## 4. Typography changes

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| H1 (when present) | 60 px (flagship) / 32 px (others) | 53 / 26 px | 28 / 26 px |
| H2 | 40–48 px (22–54 range) | 30–47 px | 24–47 px (some H2s stay 40–47 px on mobile: Uluwatu, Yin, campus pages) |
| Body paragraphs | 16–18 px | 16 px | 16 px (teachers page 12 px; home intro 14 px) |

Headings are not scaled consistently; some mobile H2s are larger than desktop H2s on other pages.

## 5. Overflow, fixed elements, footer

- **Horizontal overflow:** the home page only, at all three sizes: page scroll width 1455 / 783 / 400 px against 1440 / 768 / 390 viewports (offenders: the slider row at 1,470 px; carousel slides). The other 19 pages tested had no overflow.
- **Fixed elements:** LINE + WhatsApp round buttons (bottom-left, ~44 px), Tawk.to bubble and greeting card (bottom-right), scroll-to-top (bottom-right, above chat), lead popup (centred modal). On mobile these overlap content and the footer bottom bar (see `states/footer_mobile.jpg`).
- **Footer:** **3,190–3,226 px tall on desktop, 3,843 px on tablet, 5,829 px on mobile.** It contains: reschedule policy card → 12-item Code of Conduct + "Read all remaining guidelines" → founder quote banner image → legal/IP notice → ~55-tag cloud → "Bali Yoga School" brand block → 4 columns (Our Yoga Community + socials + Languages, Recent Posts, Our Partner Sites (10), Our Address/Email/Phone) → copyright bar. On mobile the columns stack.
- `/courses/200-hour-yin-yoga-teacher-training-in-bali/` measured a **footer height of 0–97 px**: the standard footer did not render on that page (possibly a page-builder markup error).

## 6. Metrics captured

| Page | Desktop doc height | Tablet | Mobile | H-overflow |
|---|---|---|---|---|
| home | 21,223 | 25,476 | 37,726 | yes (all 3) |
| course-200h-ubud | 38,998 | 51,043 | 70,931 | no |
| course-200h-uluwatu | 25,043 | 30,164 | 36,747 | no |
| course-yin-200h | 28,508 | 37,054 | 50,031 | no (footer missing) |
| course-sound-healing | 18,084 | 22,362 | 37,884 | no |
| course-prenatal-5d | 22,668 | 31,703 | 42,958 | no |
| retreat-7d-ubud | 12,764 | 16,128 | 22,786 | no |
| retreats-hub | 7,581 | 7,667 | 11,535 | no |
| about | 6,803 | 7,164 | 10,284 | no |
| founder | 7,538 | 9,767 | 15,914 | no |
| teachers | 17,978 | 24,917 | 37,596 | no |
| contact | 5,462 | 5,946 | 8,939 | no |
| faq | 14,691 | 14,589 | 29,244 | no |
| registration | 6,467 | 7,229 | 10,101 | no |
| payment | 5,527 | 5,940 | 9,040 | no |
| campus-ubud-photos | 13,393 | 16,956 | 30,323 | no |
| reviews | 7,546 | 8,657 | 15,911 | no |
| blog | 6,882 | 6,875 | 11,280 | no |
| food-menu | 4,523 | 4,829 | 6,435 | no |
| upcoming-spain | 9,121 | 9,577 | 16,168 | no |

Roughly 3,200 px (desktop) and 5,800 px (mobile) of each figure is the footer.

## 7. Takeaways for Phase 2 (behaviour, not layout to copy)
- Mobile is the weakest experience: extreme page lengths, tiny hero, stacked repetitive cards, a giant footer and overlapping floating buttons.
- Course data (dates, fees) is already tabular; it can become compact tables or tabs rather than 17 stacked rows and 7 tall cards.
- Keep: mega-menu grouping by location (useful mental model), visible WhatsApp access, a map per campus.
