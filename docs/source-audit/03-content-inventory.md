# 03 — Content Inventory (preservation reference)

This file summarises **what content exists, where it lives and what must be preserved**. The verbatim text of every crawled page is saved in `content/pages/<slug>.md` (main content only; the shared header and footer are documented once below). Use those files as the source of truth. Do not retype facts from memory.

Structured data files:

| File | Contents |
|---|---|
| `content/pages-index.csv` | All 306 crawled URLs: status, type, title, meta description, canonical, H1, section/image/form/embed counts, height, link to text file |
| `content/courses-fees-dates.csv` | 140 course/retreat/TTC pages: schedule rows with status, structured fee options (original → discounted, best-effort parse), all raw price strings, duration statements, years mentioned |
| `content/blog-posts-index.csv` | All 385 published posts (REST API): date, modified, title, URL, categories, excerpt, featured media id, in-sitemap flag |
| `content/blog-categories.csv` | 95 categories with post counts |
| `assets/video-and-map-embeds.csv` | 30 YouTube videos and 15 Google Map embeds with pages |

> The fee parser is best-effort: about 45 pages have fully structured options, and the remainder list raw prices in `all_price_strings`. Always confirm prices against `content/pages/<slug>.md`.

---

## 1. Business identity & contact facts (as published; verify with business)

| Fact | Value (verbatim where possible) | Source |
|---|---|---|
| Name | Bali Yoga School® (also "BYS") | Site-wide |
| Legal entity (bank) | "PT Bali Yoga School and Retreat" | `/course-payment/` |
| Founder | Yogi Himanshu Joshi ("Himanshu Joshi", "Yogi Himanshu") | Home, `/yogi-himanshu-…/`, `/bys-head-management/` |
| Parent / sister organisation | Himalayan Yoga Association (HYA) / Himalayan Yoga Ashram, Rishikesh, India — "The Head School Branch of Bali Yoga School" | Home, sister pages |
| Ubud address | "Jl. Campuhan III, Singakerta, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571, Indonesia" | Footer, `/contact/` |
| Uluwatu campus | Map pin "Bali Yoga School Uluwatu (Puri Sabina)", −8.8016, 115.1489. **No street address found in page text.** | Uluwatu pages |
| Canggu campus | Map pin "Hotel Made Canggu 77", −8.6449, 115.1313. **No street address found.** | Canggu pages |
| Rishikesh | Map pin "Himalayan Yoga Association", 30.0587, 78.2735 | Rishikesh pages |
| Email | info@baliyogaschool.com (footer, contact); baliyogaschool@gmail.com (meta "contact", malformed footer link, 3 pages); legal@ and ip@baliyogaschool.com (IP page); info@www.baliyogaschool.com (1 page, typo) | Various |
| Phone | Footer: **+91 8279705844**; Contact: "Mob: +917217206223", "Whatsapp: +918279705844"; HYA contact: +917217206223, vinyasaindia@gmail.com | Footer, `/contact/` |
| Hours | "Open Daily 24 Hours" | `/contact/` |
| Socials | facebook.com/yogaschoolinbali, instagram.com/baliyogaschool ("5k+ followers"), in.pinterest.com/baliyogaschool, linkedin.com/company/baliyogaschool, twitter.com (x.com), youtube.com, LINE, WhatsApp | Footer |
| Founding year | **Conflicting:** "Since 2017" (home), "began in 2017" (management page), "2016" (11 pages), 2012 / 2018 / 1999 (1 page each), meta copyright "© 2019" | See `08` |
| Copyright line | "Bali Yoga School® © 2026. All Rights Reserved." | Footer |

## 2. Shared header & footer content (documented once)

**Header menu:** full tree in `02-page-inventory.md` §3 and `06` §2. Labels to keep: "Multistyle TTC", "Yin TTC", "Short Courses", "Healing Courses", "Retreats", "Online Courses", grouped by **Ubud (Bali) · Uluwatu (Bali) · Canggu (Bali) · Rishikesh (India)**.

**Footer (every page), in order:**
1. "IMPORTANT POLICY — Course Reschedule Terms & Conditions": "Each student is eligible for one course reschedule only. Once the course has been rescheduled, no further changes to the course dates will be permitted."
2. "Code of Conduct" (12 visible points + "Read all remaining guidelines"): no smoking/alcohol, no gambling, no prohibited articles, own belongings, termination without refund for misconduct, cash-note condition rules (crisp, clean, firm, sharp print, no writing, new-version USD).
3. Founder quote banner (image): "In everyday life, science and spirituality walk hand in hand… — By Yogi Himanshu".
4. "LEGAL & BRAND PROTECTION NOTICE — Bali Yoga School® Intellectual Property Is Strictly Protected" + paragraph + "Trademark & IP Policy →" (links to a 404; real page `/intellectual-property-copyright-trademark/`).
5. Tag cloud (~55 blog categories).
6. "Bali Yoga School — Yoga Teacher Training · Yoga Retreats · Bali, Indonesia".
7. Columns: **Our Yoga Community** ("Bali Yoga School is the best yoga school & ashram in Bali for Yoga Teacher Training Courses in Bali & Yoga Retreat in Bali. We offer you a yogic journey in the healing environment of Bali." + 5 social icons + Languages list) · **Recent Posts** (3 latest) · **Our Partner Sites** (10 links) · **Our Address** (Ubud address, Email, Phone).
8. Bottom bar: copyright + "Yoga School in Bali" / "Yoga Retreat in Bali" links.

## 3. Offerings catalogue (what the business sells)

### 3.1 Multistyle (Hatha / Ashtanga Vinyasa) Yoga Teacher Training
| Location | Hours offered | Course URLs |
|---|---|---|
| Ubud | 50, 100, 200, 300, 500 | `/courses/{50,100,200,300,500}-hour-yoga-teacher-training-in-bali/` |
| Uluwatu | 50, 100, 200, 300, 500 | `/courses/50-hour-…-uluwatu-bali/`, `/courses/100-hours-…`, `/courses/200-hour-…`, `/courses/300-hours-…`, `/courses/500-hours-…-uluwatu-bali/` |
| Canggu | 50, 100, 200, 300, 500 | `/courses/…-canggu-bali/` (300/500 also exist as duplicate pages at root) |
| Rishikesh | 50, 100, 200, 300, 500 | `/courses/…-rishikesh-india/` |
| Online | 100, 200, 300, 500 + 7 × 15-day specialised courses ($500 each) | `/courses/online-100-…`, `/courses/200-hour-online-…`, `/courses/15-days-online-…` |
| International "upcoming" | 200 / 300 h in Japan, Spain, Mexico, Costa Rica, Nepal, Cambodia, Russia, Thailand, Los Angeles, Germany, Goa, Varkala-Kerala; online 200 h for Japan / South Korea / Spain | `/courses/…-in-<country>/` (thin, "500 USD" deposit, no dates) |

**Representative published fees (USD, original → discounted 30%) — Ubud, from page text 2026-10-19:**

| Course | Twin shared, Campus-I, all-incl. | Private, Campus-I | Private, Campus-II (new) | Course only | Dates |
|---|---|---|---|---|---|
| 50 h (8 days) | $985 → $690 | $1250 → $875 | $1120 → $784 | $560 → $392 | 1st–8th monthly |
| 100 h | $1785 → $1250 | $2815 → $1970 | $1985 → $1390 | $950 → $665 | 1st–15th monthly |
| 200 h | $2900 → $2030 | $3570 → $2499 | $3300 → $2310 | $1550 → $1085 | 1st–25th monthly (Aug 2026 closed; Jan 2027 3rd–27th) |
| 300 h | $3170 → $2219 | $3835 → $2685 | $3500 → $2450 | $1650 → $1155 | 1st–28th monthly |
| 500 h | $5700 → $3990 | $7035 → $4925 | $6100 → $4275 | $3050 → $2135 | 1st of month → 28th of following month |

Uluwatu 200 h: Private all-incl. $3860 → $2700; course with room $2860 → $2000; course with meals $2300 → $1600; course only $1720 → $1200; batches 1st–24th monthly. Canggu 200 h: $4300 → $3000 (private all-incl.) … $2300 → $1600 (course only). Rishikesh 200 h: 4-sharing $1140 → $798 … private $2150 → $1505. Full detail for every course is in the CSV.

Other recurring content on course pages: add-on Sound/Reiki healing during YTT (Levels 1–3: $200 each, 1&2 or 2&3 $350, 1&2&3 $500); daily schedule (5:30 am bell → 9:30 pm lights off); "What's included" lists (accommodation with one-day-early check-in, airport pickup from DPS, 3 vegetarian/vegan meals, 1 Balinese massage, Yoga Alliance certificate, weekend excursions, Wi-Fi, t-shirt/bag, materials, manuals, mats/props, pool, gym); arrival/departure rules; syllabus; required books; sample certificate image; TOC & privacy; FAQ.

### 3.2 Yin Yoga Teacher Training
Ubud 50/100/200/300/500 h; Uluwatu 50/100/200/300 h; Canggu 50/100/200 h; Rishikesh (external links to himalayanyogaashram.com). Ubud Yin fees are **identical** to the multistyle Ubud fees for the same hours (verify whether intentional).

### 3.3 Short courses
5-day and 12-day (50 h) Prenatal & Postnatal YTT; 5-day and 12-day (50 h) Aerial YTT; 12-day Vedic Astrology & Numerology. (12-day prenatal, aerial and astrology show identical fee sets: 1750/1400/1630/1300/1380/1100/940/750 USD.)

### 3.4 Healing courses
Sound Healing Levels 1, 2, 3, 4, 5, 1/2, 2/3, 1/2/3; Reiki Levels 1, 2, 3, 1/2, 2/3, 1/2/3; 7-day Ayurvedic massage; 13-day Ayurvedic massages & Panchakarma — in Ubud; subsets in Uluwatu and Canggu. One-to-one sessions: Reiki session, Sound healing session, Water purification ceremony (Ubud). Example: Level 1/2/3 Sound Healing (6 days 5 nights) — Twin Campus-I $1130 → $900, Private Campus-I $1440 → $1150, Private Campus-II $1250 → $1000, course only $880 → $700 (20% off).

### 3.5 Retreats
Ubud 3–11 days, Uluwatu 3–11 days, Canggu 3–7 days. "We offer yoga retreats year-round. Please contact us…". Example 7 days Ubud: Private Campus-I $1000 → $800; Twin Campus-I $812.5 → $650; Private Campus-II $875 → $700; includes meals, classes, pool 10am–8pm, Wi-Fi, **6** complimentary Balinese massages.

### 3.6 Drop-in classes
"Daily Drop-In Classes — Book Now" (home), `/yoga-classes-in-bali/` ("Book Drop-in Classes"). No class timetable/prices found beyond page text.

## 4. People (verify current staff with business)

- **Founder:** Yogi Himanshu Joshi: injury → yoga story, contributed to Rishikesh schools, founded HYA and BYS.
- **Head management (home):** Dewa (School Director), Akane (School Commissioner / wife of Yogi Himanshu), Deepika, Shailesh, Sumit, Divya, Priya, Vaishnavi (IT & Technology). **Management page differs:** Sumit and Priya are "IT & Operations", Divya is "Management", and Vaishnavi is not listed.
- **Teachers (home, 8):** Yogini Nikki, Yogini Idatrini, Yogini Chiara, Yogini Shanti, Yogi Pandu, Yogi Babloo, Yogi Chetan, Yogini Laksmi. **Teachers page (8):** Himanshu Joshi, Shanti, Nikki, Chiara, Pandu, Babloo, Chetan, Laksmi (no Idatrini). Prenatal page names Chiara, Shanti, Pandu under a heading copied from the sound-healing page.

## 5. Trust content
- **Certifications/affiliations:** Yoga Alliance (RYS 200/300, profile link), IYS® International Yoga School certification/recognition, IYO (International Yoga Organisation) registry links; `/bys-affiliations/`, `/hya-affiliations/`, `/yoga-alliance-registration/`.
- **Testimonials:** `/bali-yoga-school-reviews/`: 12 named written reviews (Ryan Murase, Nadine Fuches, Polina Boyd, Elizabeth Whitis, Rimante Eneva, Sakshi Bangura, Mireya Schoo, Heike Rose, Marie-Sophie Van de Pas, "Iron man", Nashelly Magallanes, Vandana Khanna) with course names; undated (one mentions pandemic-era travel). HYA reviews page: 9 short reviews. Video testimonials as YouTube shorts on course pages. Google review link. **Use only these real reviews; do not invent any.**
- **Achievements:** `/achivments/`: 36 images, no text.

## 6. FAQs
- Home: 10 questions (answers collapsed; text in `content/pages/home.md` lists questions only; answers need re-capture or retrieval from WordPress).
- `/frequently-asked-questions-faq/`: ~43 Q&As (full text in content file).
- Course pages: per-course FAQ in `<details>` (e.g. 23 on 200 h Ubud) — full text captured.

## 7. Policies & legal text
`/terms-conditions/` ("Terms & Conditions / Refund Policy": acceptance, services, eligibility 18+, registration steps, payments, prices, …), `/course-payment/` (advance fee non-refundable, 3% surcharge, cash currencies, bank details), `/course-registration/` (Refund Policy + attendance/discipline rules: no meat, fish, eggs, black tea, coffee, alcohol…), `/intellectual-property-copyright-trademark/` (32,500 chars), footer reschedule policy and code of conduct, `/bali-visa-on-arrival-fees-requirements/`, `/covid-guide-line-faq-for-customers/` (2021, outdated).

## 8. SEO metadata
Titles, meta descriptions and canonicals for all 306 URLs are in `content/pages-index.csv`; per-page OG image and robots meta are in `content/pages/<slug>.md`. Patterns: titles are mostly "<Topic> - Bali Yoga School® - Best Yoga School in Bali"; Yoast JSON-LD present; many pages lack an H1; international clone pages share identical body copy and H1 with Bali pages.

## 9. Blog / editorial
385 posts (2018–2026; 157 in 2022, 30 in 2026); 39 list pages; categories led by "yoga" (213 posts), "Health" (72), "Yoga Asana" (56), "Uncategorized" (47), "Yoga School in Bali" (30). Latest posts: "Uluwatu Yoga Teacher Training: International Student Guide" (2026-10-02), "200 Hour Yoga Teacher Training in Uluwatu, Bali: Curriculum, Certification, Cost & What to Expect", "What You Learn in a 200-Hour Yin Yoga Teacher Training" (2026-09-08), "Sound Healing Training in Ubud: Why Learn in Bali?" (2026-09-03). Older posts include video-class posts (2022 Ashtanga sequences) and a Japanese post under `/ja/`. Full list in CSV.

## 10. Repetition, duplication & low-priority content (for concise redesign)
- The "Why Join Bali Yoga School" paragraphs, location/accommodation blurbs, healing add-on price list, daily schedule, "What's included", Rishikesh cross-sell and 30%-off messaging repeat across dozens of course pages. Model them once as shared data.
- International location landings are word-for-word clones of the Bali hubs (10 retreat + 10 healing pages).
- Duplicates: guest-post pages ×2, food menu ×2, Canggu 300/500 ×2, prenatal ×2, several "-2" courses, three overlapping Bali retreat hubs.
- SEO filler: keyword-heavy paragraphs ("best yoga school in Bali" repeated), `/yoga-in-bali/`, `/best-yoga-teacher-training-course-in-bali/`.
- Low priority/outdated: COVID page, `/our-events/`, `/appointment/`, `/achivments/` (images only), 2022 video-class blog posts.
- Must keep: course catalogue per location with hours/duration/dates/fees and room options, inclusions, daily schedule, syllabus summaries, arrival rules, policies (reschedule, refund, deposit, code of conduct), contact channels, campus photos/maps, founder/teachers, certifications, real testimonials, FAQs.
