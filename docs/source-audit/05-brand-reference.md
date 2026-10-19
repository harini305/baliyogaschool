# 05 — Brand Reference (typography, colour, logo, visual identity)

Captured 2026-10-19 from computed styles in headless Chrome (Windows, 1440 px) on `/`, `/courses/200-hour-yoga-teacher-training-in-bali/` and `/contact/`, plus pixel sampling of the logo file.
**Verified** = read directly from computed CSS or file pixels. **Estimate** = visual judgement from screenshots.

---

## 1. Logo & brand marks

| Asset | Local file | Notes |
|---|---|---|
| Primary logo (lotus + meditating figure + "BALI YOGA SCHOOL" wordmark, ® mark) | `assets/original/uploads/2017/11/bali-yoga-school-logo.png` (662×564 PNG, 149 KB as PNG) | Used in the header at 127×108 px on every page. The server delivers it as WebP to browsers that accept it. |
| Cropped logo variant | `assets/original/uploads/2025/09/bali-yoga-school-logo-e1758797695554.png` (378×322) | Used as favicon (light and dark), apple-touch-icon and MS tile, and in the mobile menu. **No dedicated square favicon or SVG logo exists.** |
| Founder signature banner | `assets/original/uploads/2025/12/By-Yogi-Himanshu-.png` (2500×1000) | Footer quote banner with the "HIMANSHU YOGI" monogram stamp (brown/cream). |

- **Logo colours (verified, pixel-sampled):** lotus petals graduate from light peach **#F8D8B0** through **#F8B878** to orange **#F89850**; the "BALI YOGA" wordmark is orange **≈#F08436**; "SCHOOL" and the ® mark are black/near-black.
- **Placement:** top-left of a white header bar, about 148 px tall on desktop. The logo is also baked (semi-transparent) into many hero/slider photos and promo images.
- **Wordmark style:** a rounded geometric display face (it is part of the image and is not a web font).
- **Phase 2 need:** an SVG or high-resolution transparent master logo and a square icon should be requested from the business (see `08`).

## 2. Typography (original site)

### 2.1 Font families actually loaded/used (verified)

| Family | Source | Weights seen | Where it is used |
|---|---|---|---|
| **Lora** (serif) | Theme-hosted `@font-face` (`/wp-content/themes/great-lotus/css/font-face/Lora/`) | 400, 700 (600 also used) | **Body default** (body = Lora 18 px / 31 px), **main navigation** (18 px, #4A403C) |
| **Quicksand** (rounded sans) | Theme-hosted (`…/font-face/Quicksand/`) | 300, 400, 500, 700, 800 | **Headings** (H2 44–48 px, H3 17 px), buttons (18 px/500), slider arrows |
| Segoe UI → Arial (system stack) | System | 400, 600, 650, 700 | Newer custom HTML blocks: footer (policy cards, columns), intro paragraphs (`"Segoe UI", Tahoma…`), many course-page cards |
| Georgia / Times (system serif) | System | 400, 500 | "Our Yoga Certifications" H2 (46 px), footer "Bali Yoga School" title (45 px) |
| Arial / Helvetica | System | 400, 700 | Certification paragraphs, misc. custom blocks |
| Inter → system-ui | **Declared but not loaded** (falls back to Segoe UI on Windows, SF on Apple) | 400, 600, 700 | Founder band paragraphs, "Read More" button |
| Poppins | Google Fonts (`css2?family=Cormorant+Garamond:600;700&Poppins:400;600;700`) | 400, 600, 700 | 30%-off popup form, some custom sections |
| Cormorant Garamond | Google Fonts | 500–700 | Popup headline ("30% OFF 50/100/200 hrs Yoga Teacher Training…") |
| Open Sans | Google Fonts (theme) | 300–700 | Theme defaults and widgets (45 text nodes on the home page) |
| Rokkitt | Google Fonts (theme) | 400, 700 | Minor theme elements |
| Icon fonts | fontello, trx_addons_icons, Font Awesome 4 + 5, Genericons, dashicons, flaticon, vc icons, "Defaults" (smile_fonts) | — | Icons; 8+ icon fonts loaded |

On the home page alone the computed styles use **at least 10 different families**. Text-node counts on `/`: Segoe UI 115, Lora 57, Open Sans 45, Quicksand 82, Arial 77, Georgia 20, Poppins 13, Inter 8, Rokkitt 2, Cormorant 1.

### 2.2 Type scale observed (verified, desktop 1440)

| Element | Family | Size / line-height | Weight | Colour | Notes |
|---|---|---|---|---|---|
| Body default | Lora | 18 / 31 px | 400 | #8F8A86 | Theme default |
| Content paragraphs (course pages) | Lora / Segoe UI | 18 / 28.8–31 px | 400 | #685950, #1C1C3B | Varies by block |
| Founder band paragraph | Inter→Segoe | 16 / 30.4 px | 400 | #FFE9D2 on terracotta | |
| H1 (when present) | Quicksand | 60 px (course hero), 32 px (Uluwatu/Yin), 28 px mobile | 500–700 | white/#4A403C | **Most pages have no H1** |
| H2 section titles | Quicksand / Georgia | 40–48 px (desktop), 24–32 px (mobile) | 500 / 800 | #4A403C or white | Inconsistent: 22–54 px across pages |
| H3 card titles | Quicksand | 17 px / 22.95 | 700 | **#BD4F08** | Certification items |
| Eyebrow labels | Quicksand / Segoe UI | 14–22 px, uppercase, +0.6–1 px tracking | 700 | white / #A7460A | "BALI YOGA SCHOOL OFFERS", "IMPORTANT POLICY" |
| Main nav | Lora | 18 / 31 px | 400 | #4A403C → hover/active #F49D15 / orange underline | |
| Buttons | Quicksand | 18 px | 500 | white on #69CFF3 (blue) or #4A403C on #FFA64D (orange) | Radius 5 px; large glow shadows |
| Footer headings | Segoe UI / Georgia | 34 px / 45 px / 17 px | 700 / 400 / 650 | #35281F, #362D25 | |
| Footer body | Segoe UI | 15–16 / 27–28.8 px | 400 | #68594E | |

Mobile reduces H2 to 24–32 px and body paragraphs to 16 px; the teachers page drops to 12 px on mobile (too small).

### 2.3 Font files in the project
The project workspace was empty at audit time. **No font files exist locally.** Lora, Quicksand, Poppins, Cormorant Garamond, Open Sans and Rokkitt are all open-licence Google Fonts and can be self-hosted (e.g. via `next/font`) in Phase 2.

### 2.4 Two-font rule for Phase 2 (requirement, not yet decided)
The redesigned site must use **exactly two font families**: one for headings and one for everything else (body, nav, buttons, forms, cards, footer). Do not use a third family for any section or for decoration.
The final pair is **not selected in this audit**. Options grounded in the original identity, for the Phase-2 decision:

| Option | Heading | Body/UI | Rationale |
|---|---|---|---|
| A (closest to original) | Lora (serif, already the site's nav/body face) | Quicksand is the other original face, but it reads weakly at small sizes, so a neutral sans is preferable for UI | Keeps the recognisable serif voice of the navigation |
| B | Lora | Inter or a similar neutral humanist sans | Inter is already declared in the site's newer blocks |
| C | A calmer serif such as Cormorant Garamond (used in the popup) | Poppins (used in the popup) | Matches the most recent promotional styling, but Cormorant is display-leaning; check readability |

## 3. Colour

### 3.1 Brand colours (verified hex unless stated)

| Role | Hex | Evidence |
|---|---|---|
| **Primary brand orange** | **#ED6F2D** | Most frequent saturated colour: 11 text nodes and 8 backgrounds on home (headings, labels, CTA areas) |
| Orange (light / CTA fill) | **#FF9046** | 20 background uses (badges, card ribbons, buttons) |
| Orange (button/arrow fill) | **#FFA64D** | Slider arrows and orange buttons, with a glow shadow of `rgba(253,149,81,.24)` |
| Saffron (nav hover/active) | **#F49D15** | Header accent colour; active menu item + underline |
| Logo orange | **#F08436** (wordmark) → **#F89850** / **#F8B878** / **#F8D8B0** (petal gradient) | Pixel-sampled from the logo |
| Burnt orange (text accent) | **#BD4F08**, **#B94D18**, **#A7460A**, **#9B4F1B** | H3 card titles, footer eyebrow labels, links |
| Terracotta (founder band) | **#C8744A** (verified bg) | Home founder panel; footer quote banner is a similar brown, as an image (estimate **#6E5139**) |

### 3.2 Neutrals (verified)

| Role | Hex |
|---|---|
| Heading / nav text (warm dark brown) | **#4A403C** |
| Deep brown text | #362D25, #35281F, #29231F, #292522 |
| Body text (warm grey-brown) | **#685950**, #6D6054, #655B54, #665E58 |
| Theme default body grey | #8F8A86 |
| Page background | **#F6F7FA** (body), **#FFFFFF** (content), warm creams **#FFFAF6**, **#FFF3E6**, **#F3EFE9**, **#EEE8E3**, **#EEE7E1** |
| Borders | #D1D1D1, #DDDDDD (theme); warm #E8DFD7, #EADBD0, #EDD8C7, #EFDFD0, #DDC8B4 (newer blocks) |
| Muted sage (minor accent) | #77826D |

### 3.3 Incidental / non-brand colours (do not treat as brand)

| Hex | Source |
|---|---|
| #69CFF3 (sky blue) + glow `rgba(82,190,229,.24)` | "Book Now"/"Achivements" buttons: theme template default, clashes with the warm palette |
| #1C1C3B | Navy body text in one block |
| #25D366, #06C755 | WhatsApp and LINE floating buttons (third-party brand colours) |
| Yellow (estimate, ≈#FFC107) | Tawk.to chat bubble |
| #007AFF, #0D6EFD, #7A00DF etc. | Swiper / The Post Grid / WordPress presets |
| #178087 | One teal background |

### 3.4 Overall palette character
Warm saffron/orange on white and cream, with warm dark-brown text. This matches the logo's lotus and the saffron garlands seen throughout the photography. The sky-blue buttons are the main off-brand element.

## 4. Other visual identity elements (observed / estimated)

- **Photography:** real student group photos (white clothing, orange marigold garlands), Balinese shala interiors, campus pools and rooms, Uluwatu cliffs and ocean, singing bowls, food. The tone is authentic and community-focused rather than staged stock. One Pexels stock image is hotlinked (see manifest).
- **Text baked into images:** hero slides, promo tiles ("30% DISCOUNT"), infographics ("Top 5 reasons…"), founder quotes and the gurus strip all have text inside JPG/PNGs, often with a semi-transparent logo watermark.
- **Shapes:** small radii (5–8 px) on buttons and cards, 50% circles for icon buttons and portraits, rounded 16–20 px cards in newer course blocks (estimate), and an oval portrait frame in the footer banner.
- **Shadows/depth:** large soft orange or blue glows on buttons (`0 0 76–220px`), light card shadows, and a header drop shadow `0 1px 3px rgba(0,0,0,.1)`.
- **Decorative motifs:** "ॐ" (Om) glyphs above team/teacher headings, "✦", "✨", "🌸", "📅", "💫" emoji in course pages, mandala wall art in photos, a lotus icon.
- **Icons:** mixed sets (fontello, Font Awesome, flaticon PNGs hotlinked from cdn-icons-png.flaticon.com, ✔ characters).
- **Tone of voice:** spiritual, warm, first-person plural ("We believe…"), heavy SEO repetition ("best yoga school in Bali", "Yoga Teacher Training in Bali").
- **Design debt not to carry forward:** 10+ font families, blue template buttons, baked-in text, many decorative glyphs and emoji, inconsistent heading sizes, extremely long pages and footer.
