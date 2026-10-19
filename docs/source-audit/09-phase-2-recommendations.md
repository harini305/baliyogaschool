# 09 — Phase 2 Recommendations & Mandatory Requirements

Status: **for review, not approved.** Nothing in this file has been implemented. Phase 2 starts only after explicit approval.

## 1. Target stack (per brief)
Next.js (App Router) · JavaScript · React · GSAP + ScrollTrigger · responsive frontend.
The project workspace (`D:\baliyogaschool16`) contained no code at audit time, apart from this `docs/` folder.

## 2. Mandatory design rules (record of requirements)

### Typography
- **Exactly two font families across the whole site:** one for headings and one for body, navigation, buttons, forms, cards, footer and all other UI.
- Both must be readable, professional and not fancy. Candidate pairings are listed in `05-brand-reference.md` §2.4, but **the final choice is a Phase-2 decision.**
- Hierarchy comes only from weight, size, line-height and letter-spacing. No third family for decorative headings, special sections, the footer or individual components.
- One controlled, responsive type scale (e.g. `clamp()` steps) applied identically to equivalent components on every route.
- Self-host the two families (e.g. `next/font`) and remove the 8 legacy icon fonts.

### Visual design
- Professional, human-designed look; intentional image/text alignment; consistent container widths, margins and vertical rhythm.
- No unnecessary decorative numbering, eyebrow text, random symbols (ॐ ✦ ✨ 🌸 used decoratively), floating badges or ornaments.
- Avoid repetitive AI-looking / template layouts. Use visual effects (GSAP/ScrollTrigger) only where they serve a purpose, and respect `prefers-reduced-motion`.
- Preserve the brand: saffron/orange (#ED6F2D family, logo #F08436/#F89850) on white/cream with warm dark-brown text (#4A403C / #685950). Drop the off-brand sky-blue buttons (#69CFF3).
- Real headings in HTML, not text baked into images.

### Content
- Concise, focused pages; no repeated paragraphs; no unnecessary sections or excessive length (current course pages run 25,000–70,000 px).
- Preserve meaningful facts (courses, hours, durations, dates, fees, room options, inclusions, schedule, policies, contacts, people, certifications, real testimonials).
- **Do not invent** claims, testimonials, ratings, FAQs, prices, dates or blog posts. Items in `08` §A need business confirmation before publication.

### Footer
- Compact and content-driven: only necessary, verified information (brand line, key links, contact, address(es), socials, legal links, copyright).
- Move the Code of Conduct, reschedule policy, IP notice and the tag cloud **out of the global footer** into the relevant pages (Terms, Course pages, IP page).
- No excessive padding, columns or duplicated content. The final content section must be fully visible above the footer, with a natural transition, and no overlap, clipping, large blank space or fixed-footer interference. Check this specifically with the floating WhatsApp/chat buttons on mobile.

### Images & performance
- Prefer original assets (core set already in `assets/original/`; everything else via URLs in `04-assets-manifest.csv`).
- Resize/compress locally to sensible dimensions (the current originals are up to 2,560 px and 2.3 MB); use modern formats (WebP/AVIF) where practical; lazy-load below-the-fold images; responsive `sizes`; avoid duplicate copies.
- **Next.js config:** merge an equivalent of `images: { unoptimized: true }` into the existing `next.config` (do not replace other settings) so the Vercel Image Optimization quota is not used. Responsiveness must still come from pre-generated sizes (`srcset`/`<picture>` or multiple static widths).
- Replace hotlinked third-party images (HYA domain, Pexels, Flaticon) with owned, local files after rights are confirmed.
- Lite YouTube embeds (thumbnail → iframe on click); click-to-load Google Maps.

## 3. Information architecture (proposal for review)

| New section | Built from (original routes) | Notes |
|---|---|---|
| Home | `/` | Founder intro, certifications, course finder by location/type, campuses, teachers (short), testimonials (real), FAQ (short), contact CTA |
| Teacher Training | Ubud / Uluwatu / Canggu / Rishikesh × 50–500 h; Yin TTC | **One data-driven course template** fed by a JSON/JS data file (hours, duration, dates + status, room options and fees, inclusions, schedule, syllabus, FAQs). Keep the original URLs (`/courses/<slug>/`) for SEO |
| Short courses | Prenatal/postnatal, aerial, astrology | Same template |
| Healing | Sound, Reiki, Ayurveda (+ sessions) | Same template; level combinations as options |
| Retreats | 3–11 day retreats × 3 campuses | Retreat template; consolidate overlapping hubs |
| Online | Online TTC + 15-day courses | Template; "Online Courses" menu currently goes to an external site, so confirm which to use |
| Campuses | Ubud (+2nd/3rd accommodation), Uluwatu, Canggu, Rishikesh link | Merge 8 gallery pages into campus pages with galleries + map + food |
| About | About, Founder, Head Management, Teachers, Affiliations, Yoga Alliance registration, Achievements | |
| Plan your stay | Payment, Registration, Visa info, FAQ, Terms/Refund, IP policy | |
| Contact | `/contact/` | Form + WhatsApp + map |
| Blog (low priority) | 385 posts | Decide: keep on WP and link, or a simple list page. If built, initial presentation ≤ 10 images |

**Routes needing a decision** (see the recommendation column in `02` §5): 27 thin international course pages, 18 international cloned landings, 13 HYA/Rishikesh mini-site pages, duplicates, broken pages (`/appointment/`, `/our-events/`), outdated COVID page. Plan **301 redirects** for every retired URL; there are 306 crawled URLs plus 385 posts.

## 4. Functional requirements to carry over
- Enquiry form (name, email, phone, country, message) with validation and a real delivery target (to be confirmed: WPForms/WordPress API, Formspark, or another service). **Do not ship a mock form presented as working.**
- Registration/application form fields (see `06` §3).
- Payment links (Razorpay ×2, PayPal.me) and bank details exactly as confirmed by the business.
- WhatsApp / LINE / phone contact; optional Tawk.to chat (third-party script, load lazily).
- Optional lead popup: if kept, reuse the Formspark endpoint, keep the 24 h frequency cap, and make it accessible (focus trap, Esc, labelled).
- Analytics (GA4/GTM/Ads) re-implemented with confirmed IDs.
- SEO: unique title/description per page (originals in `content/pages-index.csv`), one H1 per page, canonical URLs, JSON-LD (Organization/LocalBusiness, Course), sitemap, a clean robots.txt, hreflang only if real translations exist.

## 5. Data-model suggestion (for implementation planning)
`courses[]: { slug, type (multistyle|yin|short|healing|retreat|online), location (ubud|uluwatu|canggu|rishikesh|online|intl), hours, durationDays, nights, batches[{start,end,status}], options[{label, includes, originalUSD, discountedUSD}], discountLabel, inclusions[], schedule[], syllabus[], faqs[], images{hero, gallery[]}, seo{title, description} }` — populated from `content/courses-fees-dates.csv` + `content/pages/` and checked against business answers to `08`.

## 6. Asset plan
1. Use `assets/original/` (460 files, 79 MB) as the source pool; pick hero/section images per page using `04-assets-manifest.csv` (`example_pages`, `sections` columns) and `screenshots/above-the-fold/`.
2. Download any additional originals needed from the `original_url`/`full_size_original_url` columns (only those actually used).
3. Generate resized web versions (e.g. 640/1024/1600/2000 w, WebP/AVIF + JPEG fallback) into `public/` during Phase 2. Never overwrite `assets/original/`.
4. Request an SVG logo and confirm image rights for hotlinked material.

## 7. Quality gates for Phase 2
- Responsive check at 390 / 768 / 1024 / 1440 px with no horizontal overflow.
- Footer and last-section visibility checked on every template.
- Exactly two font families in computed styles (spot-check with DevTools/automation).
- Lighthouse-style checks: LCP image sized and preloaded, CLS from images avoided with explicit dimensions, no unused icon fonts.
- Every published price/date/claim traceable to `content/` or to a business confirmation.
- No GitHub push or Vercel deployment without explicit instruction.
