# garudabikerentals.in — Reverse-Engineering Report & Rebuild Guide

> **Date captured:** 16 Nov 2026
> **Method:** I captured live HTTP responses for all 21 sitemap pages and the 11 CSS/JS files. In your Chrome (Claude in Chrome extension) I measured computed styles, took screenshots at desktop (1440 px) and mobile (≤500 px) widths, and exercised the booking form, the FAQ search, the mobile menu and the ride assistant. I did not submit any real enquiry and did not send anything to WhatsApp.
> **Evidence labels used below:** **[O]** observed directly (source or live browser). **[I]** inferred from what was observed. **[?]** unknown or not observable from outside.

---

## 1. TL;DR

| Item | Finding |
|---|---|
| Stack | **Hand-written static HTML + vanilla CSS + vanilla JS.** There is no framework, no bundler and no build step. **[O]** |
| Hosting | **Hostinger** shared hosting (LiteSpeed/hcdn), with PHP 8.3 available. **[O]** (`platform: hostinger`, `x-powered-by: PHP/8.3.36`, `server: hcdn`) |
| URLs | Extensionless (`/fleet`, `/blog/why-rent-vs-buy-warangal`). This is almost certainly an `.htaccess` rewrite to `*.html`. **[I]** |
| Backend | None for booking. Every enquiry becomes a **pre-filled WhatsApp deep link** (`wa.me/<number>?text=…`). The only server call is an anonymous click beacon to `track-event.php`. **[O]** |
| Fonts | **Fontshare**: *Zodiak* (display serif) and *General Sans* (body). **[O]** |
| Look | Dark forest-green and cream "editorial" style with gold accents. Headings are large serif with a gold *italic* second line. Numbered kickers (`01 / FIND YOUR RIDE`). The ↗ arrow appears on every CTA, with ✦ ✳ glyph ornaments. **[O]** |
| Size | 21 pages, 6 stylesheets (~100 KB), 5 JS files (~29 KB), and 14 WebP images plus 2 PNG logos. **[O]** |
| JS features | WhatsApp booking form, offline rule-based **bilingual (English/Telugu) chat assistant**, FAQ live search, mobile menu, sticky-header shadow, and a mobile CTA bar that shows/hides with scroll. **[O]** |

To rebuild it "same to same" you need only static files plus one optional PHP file. A modern equivalent is Astro or Eleventy, which give you shared header/footer partials and output the same static HTML.

---

## 2. Site map & page templates

All URLs come from `sitemap.xml` plus the nav/footer links. **[O]**

| URL | `<body class>` | Template | Purpose |
|---|---|---|---|
| `/` (also `/index`) | `page-home` | **Home (gb-\*)** | Hero, fleet teaser, booking form, trust, rental journey, FAQ teaser, final CTA |
| `/fleet` | `page-fleet` | **Extra (gb-extra)** | Grid of 8 vehicle cards |
| `/how-to-book` | `page-how-to-book` | Extra | 2 booking routes + enquiry→confirmed steps |
| `/rental-guide` | `page-rental-guide` | Extra | 4 rental stages + late-return penalty table |
| `/pricing` | `page-pricing` | **Banner (page-banner + .sec)** | Rate-card table, km table, deposit cards |
| `/faq` | `page-faq` | Banner | Search box + 16 `<details>` accordions |
| `/about` | `page-about` | Banner | Story sections + end CTA |
| `/contact` | `page-contact` | Banner | 3 contact cards + Google Maps iframe |
| `/ride-ideas` | `page-ride-ideas` | Banner | 3 route cards + small CTA |
| `/blog` | `page-blog` | Banner (blog-hero) | List of 4 posts |
| `/blog/<slug>` ×4 | `page-blog` | **Post (gx-post)** | Long-form article + "Need help choosing?" CTA |
| `/scooter-rentals-warangal` | `page-scooter-rentals-warangal` | **Landing (gx-landing)** | SEO landing page: hero, options, guide, CTA |
| `/royal-enfield-rentals-warangal` | `page-royal-enfield-rentals-warangal` | Landing | SEO landing page for Classic/Hunter 350 |
| `/terms-and-conditions` | `page-` | **Policy (policy-hero)** | 10 numbered sections |
| `/cancellation-policy` | `page-` | Policy | Includes `.cancel-table` |
| `/refund-policy` | `page-` | Policy | Includes `.deduction-table` |
| `/privacy-policy` | `page-` | Policy | 7 numbered sections |

Blog slugs: `top-5-places-near-warangal-bike-trip`, `activa-vs-glamour-warangal`, `hanamkonda-to-bhadrachalam-bike-guide`, `why-rent-vs-buy-warangal`.

Blog pages use **relative `../` asset paths** (`../shared.css`, `../track-event.php`). **[O]**

**Navigation**
- Header (desktop): Home · Our Fleet · How to Book · Rental Guide · About · Contact, plus a gold **"Check Availability ↗"** button pointing to `index#book`.
- Footer columns: *Explore* (Fleet, How to Book, Rental Guide, Pricing, About, Ride ideas) · *Information* (FAQs, Contact, Terms, Cancellation, Privacy, Blog) · *Visit & Connect* (address, Maps, Instagram, WhatsApp).
- The two SEO landing pages and `/refund-policy` are **in the sitemap only**. They are not linked from the nav or footer. **[O]**

---

## 3. File architecture (as deployed)

```
/                         (document root on Hostinger)
├── index.html  fleet.html  pricing.html  …  (one .html per page, served without extension)
├── blog/<slug>.html
├── shared.css                    ← 1  base tokens, reset, header/footer, generic components
├── garuda-assistant.css          ← 2  chat widget
├── rideverse-2026.css            ← 3  2026 restyle: dark header, photo banners, landing/post templates
├── garuda-upgrades.css           ← 4  FAQ search, compare/prep widgets (partly legacy)
├── garuda-design.css             ← 5  the home page "gb-*" design + fleet/extra pages + header overrides
├── garuda-visual-refinement.css  ← 6  final mobile polish, mobile CTA bar behaviour
├── garuda-design.js        (home only)  booking form → WhatsApp
├── site.js                 (all pages)  nav, header shadow, fleet filter*, legacy estimator*
├── garuda-assistant.js     (all pages)  chat assistant
├── garuda-upgrades.js      (faq only)   FAQ search, compare*, checklist*
├── garuda-visual-refinement.js (all)    mobile CTA bar visibility (home only)
├── track-event.php                      click-counter endpoint (backend not observed) [?]
├── favicon.png  garuda-mark.png  garuda-mark-light.png
├── robots.txt  sitemap.xml
└── assets/
    hero-journey.webp (1600w)  hero-journey-960.webp (960w)
    royal-classic-editorial.webp
    model-{maestro,activa,fascino,jupiter,jupiter-zx,glamour,hunter-350,classic-350}-new.webp
    route-{city,heritage,weekend}-v4.webp
```
\* Code paths whose target elements no longer exist on any page are dead code (see §11).

**Cascade:** the six stylesheets load in the order above, and each later file overrides the earlier ones, often with `!important` (e.g. `.site-header{background:#10271e!important}`). The design evolved in layers instead of being refactored. In your rebuild, **merge them into one token-driven stylesheet** (§10).

Cache busting is done with query strings (`?v=2026final1`, `?v=2026diwali`, `?v=2026visual2`). **[O]**

---

## 4. Design system

### 4.1 Colour tokens
Values are from the CSS custom properties, plus computed values measured in the browser. **[O]**

| Role | Token / value | Where it's used |
|---|---|---|
| Deep green (hero bg) | `radial-gradient(ellipse at 75% 40%, #183c2f, #092219 70%)` | Home hero |
| Header green | `#10271e` (border `#244b36`) | Sticky header |
| Booking section green | `#193c2d` | `#book` section |
| Footer | `#081d15` | Footer |
| Final CTA | `radial-gradient(at 100% 100%, #1d4935, #092319 62%)` | Last home section |
| Inner hero | `radial-gradient(circle at 80% 20%, #244b37, #102b21 68%)` | Fleet/How-to-book/Guide |
| Photo banner | `linear-gradient(105deg, rgba(13,34,27,.97), rgba(21,60,44,.83)), url(assets/route-weekend-v4.webp) center 45%/cover` | Pricing/FAQ/About/Contact/Blog/Policy heroes |
| **Gold (primary CTA)** | `#eabd6d` (`--gb-gold`) | Buttons, round arrows, header CTA |
| Gold italic (on dark) | `#e7b969` | `<em>` in hero headings |
| Gold italic (on light) | `#a77a45` | `<em>` in section headings |
| Gold dark text | `#946827` (`--gold-d`) | Eyebrows on light bg |
| Cream page bg | `#f7f2e9` / `#f8f3e9` | Body, light sections |
| Cream surfaces | `#fffdf8`, `#fcf8f0` (form panel), `#ebe6d9` (category cards), `#e9e4d6`, `#d2d8cb`, `#d7e0d4` (trust tiles) | Cards |
| Text dark | `#102a24` / `#18382c` | Body text on cream |
| Text on dark | `#fff8eb`, `#c7d2c7` (muted) | Hero copy |
| Muted kicker | `#617361` | `01 / …` kickers |
| Border | `#e6ded2`, `#e7dbc9`, `#d8d7ca` (inputs) | Hairlines |
| WhatsApp green | `#178e50` | Floating WhatsApp button |

### 4.2 Typography
| Style | Font | Size (desktop) | Weight | Tracking | Notes |
|---|---|---|---|---|---|
| Hero display ("Your plans. *Your ride.*") | Zodiak | **92px** / lh 0.96 | 500 (em 400 italic) | −0.062em | `<p>`, not `<h1>` |
| SEO `<h1>` under the display | General Sans | 23px / lh 1.48 | 650 | −0.02em | Keyword-rich H1 |
| Section `h2` | Zodiak | **68px** / lh 1.07 | 500 | −0.048em | Second line is an `<em>` in gold italic |
| Inner hero `h1` | Zodiak | `clamp(2.6rem, 5.5vw, 5.3rem)` | 500 | −0.045em | Max 17ch |
| Landing `h1` | Zodiak | `clamp(3.3rem, 6vw, 6.1rem)` / lh .97 | 500 | −0.055em | |
| Body | General Sans | 16px / lh 1.65 | 400 | — | `-webkit-font-smoothing: antialiased` |
| Hero description | General Sans | 15.8px / lh 1.77 | 400 | — | colour `#c7d2c7` |
| Kicker (`01 / FIND YOUR RIDE`) | General Sans | 11.5px | 750 | 0.22em | uppercase |
| Eyebrow (hero) | General Sans | 10.7px | 800 | 0.19em | with hairlines either side |
| Nav link | General Sans | 13px | 500 | — | gold `#ebc783` when current, 2px underline |
| Button | General Sans | 14px | 750 | — | |
| Wordmark | Zodiak 24px/700 "GARUDA" + General Sans 9px/700 "BIKE RENTALS" (tracking 0.23em) | | | | |

Font include (exact):
```html
<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=zodiak@400,500,700&display=swap" rel="stylesheet">
```
Fallbacks: `'Zodiak', Georgia, serif` and `'General Sans', system-ui, sans-serif`.

### 4.3 Layout, spacing, shape
- **Container:** `width: min(100% - 70px, 1220px)` on desktop, `100% - 42px` on tablet, `100% - 34px` on phones. **[O]**
- **Section padding:** home `94px 0`. Generic `.sec` is `88px 0`, dropping to `64px 0` at ≤760px.
- **Radii:** the home design is deliberately **sharp**: buttons 4px, cards 6px, form panel 7px. The older generic components are rounder (`--r-*`: 10/14/20/26/34px; `.btn` 999px pill; `.interior-card` 24px). Both shapes are live on the site today (§11).
- **Signature shape:** the hero image frame is an **arch**, `border-radius: 185px 185px 8px 8px`, with a 1px gold border `rgba(238,206,139,.43)` and shadow `0 33px 75px rgba(0,0,0,.23)`.
- **Shadows:** `--sh-sm 0 4px 12px rgba(34,27,14,.04)`, `--sh-md 0 16px 44px rgba(29,24,14,.09)`, `--sh-lg 0 25px 75px rgba(29,24,14,.14)`. Form panel: `0 20px 65px rgba(8,27,23,.33)`.
- **Breakpoints in use:** 1200, 1080/1040, 950, 900, 850, 760 (**main mobile switch**), 600, 500, 420, 400, 390, 375, 365, 360, 355, 350. If you rebuild, these collapse cleanly to **1080 / 900 / 760 / 500 / 375**.
- `html { scroll-behavior:smooth; scroll-padding-top: 84px }`, plus `prefers-reduced-motion` overrides in every file.

### 4.4 Visual motifs (these make the look recognisable)
1. **Two-line headings.** A plain line, then a gold *italic* `<em>` line: "A ride for whatever's / *on your calendar.*"
2. **Numbered kickers.** `01 / FIND YOUR RIDE`, `02 / BOOKING MADE SIMPLE` … `05 / GOOD TO KNOW`.
3. **↗ on every CTA**, plus round 52px gold "arrow buttons" (`.gb-round-arrow`).
4. **Glyph ornaments:** ✦ ✳ ✧ ◇ ⌁ ✓ used as icons (text, not SVG).
5. **Hero decoration:** two thin concentric gold "orbit" circles (750px, `border:1px solid rgba(222,186,117,.12)`), a grain overlay, a circular gold **stamp** ("YOUR CITY / YOUR STORY.", 154px, 7px green border), and a cream pill tag "SCOOTIES / COMMUTER BIKES / CLASSIC 350".
6. **Map art without a map.** The trust "location" tile draws 4 thin lines and a ✦ pin in CSS instead of embedding a map.
7. **Honest microcopy.** Every CTA area includes a disclaimer, e.g. "An enquiry is not a confirmed reservation."

---

## 5. Global components (on every page)

| Component | Markup hook | Behaviour |
|---|---|---|
| Skip link | `a.skip-link[href="#main"]` | Hidden at `top:-100px`, slides to `top:10px` on focus |
| Header | `header#site-header.site-header > .container.header-layout` | `position:sticky; top:0; z-index:80`, 80px tall (67px on mobile). `.is-scrolled` is added when `scrollY > 10` and adds a shadow |
| Brand | `a.site-brand > img.brand-mark (60×46) + span.brand-wordmark > strong + small` | |
| Desktop nav | `nav.desktop-nav > a[aria-current="page"]` | Current page shows a gold 2px underline (`::after`, `bottom:-7px`) |
| Mobile menu | `button.menu-toggle[aria-controls=mobile-nav][aria-expanded]` (3 spans) + `nav#mobile-nav[hidden]` | Toggles `hidden` and closes on link click, **Esc**, or click outside. Updates `aria-label` Open/Close. Each item ends in ↗, then "Call …" and a green "WhatsApp Garuda ↗" |
| Footer | `footer.site-footer > .footer-grid` (cols `1.45fr 1fr 1.15fr 1.25fr`, gap 48px) + `.footer-bottom` | 2 columns ≤1040px. Credit line "Designed & Developed by … ✦ Sponsored by …" |
| Floating WhatsApp | `a.floating-wa` 55px circle, `#178e50`, bottom-right | Hidden on the home page and at ≤760px |
| Mobile action bar | `div.mobile-action-bar` with 2 links (Call / WhatsApp), fixed bottom, 57px | ≤760px only. **On home** it is shown only after the hero is scrolled past and hidden again near the final CTA (`body.gb-mobile-contact-active`, rAF-throttled scroll handler) |
| Ride assistant | `div#ga-widget > button#ga-launcher + section#ga-panel[role=dialog][hidden]` | See §7.3. Hidden on home (`.page-home .ga-widget{display:none!important}`) |
| Click beacon | inline `<script>` | See §7.5 |

---

## 6. Home page, section by section

Page height is about 5,930px at 1440px wide. Order and IDs: **[O]**

### 6.1 `#hero` — `section.gb-hero`
- Grid `1fr 1.08fr`, gap 66px, min-height 657px. Single column ≤900px (copy first, then image).
- **Left:** eyebrow `— WARANGAL • HANAMKONDA —`, then the display `<p>` "Your plans.<br><em>Your ride.</em>", then the `<h1>` "Bikes & Scooties for Rent in Warangal & Hanamkonda", then the description, then 2 buttons (**gold** "Check Availability ↗" → `#book`; **outline-light** "Explore Our Fleet ↗" → `#fleet`), then a sub-line with a + icon: "Planning ahead? Reserve your preferred bike for a future date."
- **Right:** the arched image `hero-journey.webp` (responsive `srcset` 960w/1600w, `fetchpriority="high"`, preloaded in `<head>`), a shade overlay, a caption "AN OPEN ROAD. YOUR OWN PACE.", the round stamp overlapping the bottom-left, and the vehicle tag pill bottom-right.
- Bottom strip: "MADE FOR THE ROADS OF WARANGAL" · "SCROLL TO EXPLORE ↓".
- Button specs: height 56px, padding `13px 24px`, radius 4px, 14px/750. Gold `#eabd6d` on `#13291e`. Outline uses `1px solid rgba(240,223,191,.45)`.

### 6.2 `#fleet` — `section.gb-section.gb-fleet` (cream)
- Intro row: kicker + 2-line h2 on the left, a short paragraph on the right.
- `.gb-fleet-layout` grid `1.14fr .86fr`, gap 20px, min-height 570px:
  - **Featured card** `.gb-classic-card` (dark `#112a20`): full-bleed `royal-classic-editorial.webp`, label "THE FEATURED RIDE ✦", bottom row with "ROYAL ENFIELD / Classic 350 / blurb" and a round gold ↗. The ↗ link has `data-select-vehicle="classic-350"` and `href="#book"`, so it **pre-selects the vehicle in the form**.
  - **Two stacked category cards** `.gb-category-card` (`#ebe6d9`, side image + text): *Scooties* → `fleet?category=scooter`, *Commuter Bikes* → `fleet?category=commuter`.
- Outro: an "illustrative imagery" disclaimer plus "Explore all vehicles ↗".

### 6.3 `#book` — `section.gb-section.gb-booking` (green `#193c2d`)
- Grid `1fr .94fr`, gap `clamp(40px,7vw,105px)`.
- **Left story:** kicker `02 / BOOKING MADE SIMPLE`, h2, lede, 3 numbered steps (01 Choose → 02 We check → 03 Secure your slot), a "Good to know" note (✧), and a link to `how-to-book`.
- **Right form panel** `.gb-form-panel` (cream `#fcf8f0`, radius 7px, padding `35px 36px 30px`):
  - Head: "START HERE / Find your ride." and a ✦ symbol.
  - Segmented switch `.gb-choice-switch` (bg `#ebe8df`, 4px padding): **Need it today** | **Book in advance** (`aria-pressed`).
  - `select#gb-bike` with 8 vehicles, then a 2×2 grid of pickup date/time and return date/time (defaults `09:00` and `18:00`).
  - `p#gb-form-error[role=alert][hidden]`.
  - Submit: full-width dark button "Prepare WhatsApp Enquiry ↗".
  - "Prefer to speak directly? Call Garuda ↗", plus a legal line.

### 6.4 `#trust` — `section.gb-trust`
Grid `1.06fr .94fr`:
- Left: a big green **location tile**, a link to Google Maps search (CSS map-line art, logo watermark, "Right here in Hanamkonda.", address, "Get directions ↗").
- Right: a **quote tile** (`#e9e4d6`, ✳ watermark, "Real customers. Real conversations.", links to Google reviews and Instagram) and a **contact tile** (`#d7e0d4`, "Talk to a real person.", round dark ↗ → `tel:`).

### 6.5 `#rental-guide` — `section.gb-journey`
A 4-column bordered grid (`border:1px solid #e7dbc9`), one article per step: number, glyph icon, h3, text. The steps are *Arrive ready → Meet your ride → Enjoy your time → Return with ease*. It becomes 2 columns ≤900px and 1 column ≤500px. The bottom row has ✦ + text + "Read the Rental Guide ↗".

### 6.6 `#faqs` — `section.gb-faq`
Grid `.76fr 1.24fr`, gap 95px. The left side has a heading and a link to `/faq`. The right side has 5 native `<details><summary>` items with hairline separators and a gold "+" drawn with `summary::after` (14.7px/750 summary text).

### 6.7 `#contact-ready` — `section.gb-final`
A dark radial gradient section. Top line "GARUDA BIKE RENTALS ✦". Grid `1.23fr .77fr`: big h2 "Have a date in mind? *Let's find your ride.*" on the left. On the right: a gold CTA, a row of WhatsApp and Call links, and "Find our pickup location ↗".

---

## 7. Behaviour (JavaScript) — exact logic

### 7.1 Booking form → WhatsApp (`garuda-design.js`, home only) **[O]**
```text
init:
  min date of pickup/return = today (local, YYYY-MM-DD)
  if URL ?bike=<id> matches an <option>, pre-select it        ← used by fleet cards: /?bike=activa#book
  [data-select-vehicle] links set the select value on click
  mode toggle: "today" → fill pickup=today if empty; "advance" → clear dates if pickup==today
  pickup change → return.min = pickup; clear return if earlier
submit (preventDefault):
  no vehicle            → "Please select a vehicle."
  any date/time missing → "Please choose pickup and return dates and times."
  pickup < today        → "Choose a pickup date that is today or later."
  end <= start          → "Return must be later than pickup."
  else build message lines:
    Hello Garuda Bike Rentals! I would like to check availability.
    Vehicle: <name> / Enquiry: Advance reservation|Rental enquiry
    Pickup: <date> at <time> / Return: <date> at <time>
    Please share availability, rental charges, included kilometres, deposit and the advance needed to confirm.
  window.open('https://wa.me/<number>?text='+encodeURIComponent(msg), '_blank', 'noopener,noreferrer')
  if popup blocked → location.href = url
```
I verified the validation messages live: an empty vehicle and a return before pickup both show the right errors, and `?bike=glamour` pre-selects Glamour. **[O]**

There is also a dormant **festival mode**: if `.gb-site` has class `is-diwali` (currently `is-standard`), it plays a one-time "rocket" animation (`@keyframes gb-flight / gb-trail / gb-burst / gb-glow`) once per session, tracked in `sessionStorage`.

### 7.2 Site chrome (`site.js`) **[O]**
- Mobile nav toggle (see §5).
- `scroll` (passive) toggles `header.is-scrolled` when `scrollY > 10`.
- Fleet filter for `.fleet-filter[data-filter]` buttons and `.vehicle-card[data-category]`. **No page currently has these elements** (dead code). The home page's `fleet?category=…` links therefore show the full fleet.
- A legacy price-estimator form (`#booking-form`, reads `window.GARUDA_FLEET`). It is not present on any page and is dead code. Its deposit rule is still informative: **standard models ₹1,000, or ₹2,000 for a week or longer; premium ₹2,000, or ₹4,000 for long plans.**

### 7.3 Ride assistant (`garuda-assistant.js` + inline `window.GARUDA_ASSISTANT_DATA`) **[O]**
- A **fully client-side, rule-based "chatbot"** with no AI and no server ("No conversation is sent to a server").
- Language toggle: **English | తెలుగు**. Each language has its own answer dictionary and suggestion chips (*What is the daily price? · Which bike for city? · Deposit and licence · Is a bike available tomorrow?*).
- Answer pipeline:
  1. **Model detection:** the query is matched against vehicle names and ids (longest name first, with special cases for "hunter" and "classic"). On a match, it answers with that model's deposit, availability caveat, or full rate list and km allowance, built from the data object.
  2. Otherwise an **intent regex table** (English, Telugu and transliterated words like `entha`, `undha`, `kavali`) picks one of: availability, deposit, licence, kilometre, location, duration, helmet, fuel, hours, booking, price, recommend. If none match, it answers "unknown".
  3. After every question, the panel's WhatsApp button `href` is rewritten to include the question text.
- Accessibility: `role="dialog"`, `role="log" aria-live="polite"`. It closes on Esc and on pointerdown outside, and moves focus to the close button on open and back to the launcher on close. Input has `maxlength=220`.
- Verified live on `/fleet`: the price chip returns the daily price summary. **[O]**

### 7.4 FAQ search (`garuda-upgrades.js`, `/faq` only) **[O]**
`input#faq-search` filters `#all-faq-list details` by `textContent.includes(term)` and sets `#faq-count` ("2 matching questions" or "No matching question. Call us and we can help."). I verified "deposit" → 2 of 16.
The same file contains route-advice, vehicle-compare and Telugu "prep checklist" widgets whose markup no longer exists (dead code).

### 7.5 Contact-intent beacon (inline script, every page) **[O]**
```js
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]'); if (!a) return;
  const h = a.getAttribute('href') || '';
  const event = h.startsWith('tel:') ? 'call_click'
              : h.includes('wa.me/') ? 'whatsapp_click'
              : (h === '#callback' || h.endsWith('index#callback')) ? 'callback_open' : '';
  if (!event) return;
  const d = new URLSearchParams({ event });
  navigator.sendBeacon ? navigator.sendBeacon('track-event.php', d)
                       : fetch('track-event.php', { method:'POST', body:d, keepalive:true });
});
```
`track-event.php` returns 301 to a GET request. Its server-side storage is **not observable [?]**. A minimal re-implementation is in §10.4.

### 7.6 Mobile CTA visibility (`garuda-visual-refinement.js`) **[O]**
On the home page at ≤760px, `body.gb-mobile-contact-active` is on only when `hero.bottom < 70px` **and** `final.top >= innerHeight − 60`. The bar animates `translateY(115%) → 0` over .22s.

---

## 8. Data model (single source of truth)

The site embeds this object inline on 20 pages as `window.GARUDA_ASSISTANT_DATA`. Fleet cards, the pricing tables and the FAQ copy are **hand-typed duplicates** of the same numbers. **[O]** In the rebuild, generate all of them from one file such as `data/fleet.json`.

| id | Name | Family | 3h | 6h | Day | Week | 15 days | Month | Deposit type |
|---|---|---|---|---|---|---|---|---|---|
| maestro | Maestro | scooter | 200 | 300 | **400** | 2,400 | 4,800 | — | standard |
| activa | Activa | scooter | 250 | 350 | **500** | 3,000 | 6,000 | 12,000 | standard |
| fascino | Fascino | scooter | 300 | 400 | **600** | 3,600 | 7,200 | — | standard |
| jupiter | Jupiter | scooter | 300 | 400 | **600** | 3,600 | 7,200 | — | standard |
| jupiter-zx | Jupiter ZX | scooter | 300 | 400 | **600** | 3,600 | 7,200 | — | standard |
| glamour | Glamour | commuter | 300 | 400 | **600** | 3,600 | 7,200 | — | standard |
| hunter-350 | Hunter 350 | premium | — | — | **1,500** | — | — | — | premium |
| classic-350 | Classic 350 | premium | — | — | **1,200** | — | — | — | premium |

**Km allowances:** scooter 50 / 80 / 120 / 700 (3h/6h/day/week), extra ₹5/km · commuter 60 / 90 / 130 / 800, extra ₹5/km · premium day 180, extra ₹6/km.
**Durations map:** `3h`→"3 Hours", `6h`→"6 Hours", `day`→"1 Day", `week`→"1 Week", `15d`→"15 Days", `month`→"1 Month".
**Business facts:** open daily 6:00 AM – 11:30 PM, price range "₹400–₹1,500 per day".

Swap in your own business's fleet, prices, address and number. Do not reuse Garuda's.

---

## 9. SEO & meta setup **[O]**

Every page has:
- `<html lang="en">`, a viewport with `viewport-fit=cover`, and `theme-color #102b25`.
- A unique `<title>` in the pattern "Topic | Brand [Location]", a `meta description` and a `link rel=canonical`.
- Open Graph (`og:type/site_name/title/description/image/image:alt/url`) and Twitter `summary_large_image`.
- JSON-LD `@graph` containing **LocalBusiness** (name, url, telephone, logo, image, priceRange, PostalAddress, `areaServed` places, `sameAs` Instagram), **WebSite** (`inLanguage: en-IN`) and **WebPage** (`isPartOf`, `about`).
- `robots.txt` with `Allow: /` and a sitemap line. `sitemap.xml` lists 18 URLs with `lastmod` on the key pages. Note that it uses an `ns0:` namespace prefix, a sign it was generated by Python's ElementTree. Valid, but unusual.
- Performance: the hero image is preloaded with `imagesrcset`, below-fold images use `loading="lazy"`, all images have explicit `width`/`height`, all images are WebP, scripts are `defer`ed, and there are no third-party analytics scripts.
- Keyword strategy: the visible display line is decorative and the real `<h1>` carries the keywords. Separate landing pages target "scooter rentals warangal" and "royal enfield rentals warangal". Blog posts target local routes.

---

## 10. How to rebuild it (same look and behaviour, cleaner code)

### 10.1 Recommended stack
| Option | When |
|---|---|
| **Astro (static output)** ✅ recommended | Shared `<Header/>`/`<Footer/>` layouts, fleet/pricing generated from `fleet.json`, Markdown blog, outputs plain HTML you can upload to Hostinger exactly like the original |
| Eleventy (11ty) | Same benefits, even lighter |
| Plain HTML (like the original) | Fine for a handful of pages, but you'll duplicate header/footer/data across 21 files like Garuda does |

Keep it **framework-free on the client**: all interactivity is about 300 lines of vanilla JS.

### 10.2 Project structure (Astro)
```
src/
  data/fleet.json            ← vehicles, rates, allowances, durations, business info
  styles/tokens.css          ← §4 tokens
  styles/base.css            ← reset, typography, container, buttons
  styles/components/*.css    ← header, footer, hero, cards, form, faq, assistant…
  layouts/Base.astro         ← <head> meta/OG/JSON-LD, Header, Footer, floating CTAs, beacon
  components/
    Header.astro  MobileNav.astro  Footer.astro
    Hero.astro  FleetTeaser.astro  BookingForm.astro  Trust.astro
    Journey.astro  FaqTeaser.astro  FinalCta.astro
    PageBanner.astro  VehicleCard.astro  PriceTable.astro  Assistant.astro
  pages/
    index.astro fleet.astro how-to-book.astro rental-guide.astro pricing.astro
    faq.astro about.astro contact.astro ride-ideas.astro
    scooter-rentals-<city>.astro royal-enfield-rentals-<city>.astro
    terms-and-conditions.astro cancellation-policy.astro refund-policy.astro privacy-policy.astro
    blog/index.astro  blog/[slug].astro   (content collection)
  scripts/ nav.js booking.js assistant.js faq-search.js mobile-cta.js beacon.js
public/ assets/*.webp  favicon.png  logo-mark.png  robots.txt  track-event.php  .htaccess
```
Set `build.format: 'file'` in Astro so it emits `fleet.html` etc. and URLs stay extensionless with the `.htaccess` below. Alternatively use the default `directory` format, which needs no rewrite.

### 10.3 Starter `tokens.css`
```css
:root{
  /* greens */
  --c-hero-1:#183c2f; --c-hero-2:#092219; --c-header:#10271e; --c-header-line:#244b36;
  --c-booking:#193c2d; --c-footer:#081d15; --c-btn-dark:#173d2c;
  /* golds */
  --c-gold:#eabd6d; --c-gold-em-dark:#e7b969; --c-gold-em-light:#a77a45; --c-gold-text:#946827;
  /* neutrals */
  --c-bg:#f7f2e9; --c-surface:#fffdf8; --c-panel:#fcf8f0; --c-card:#ebe6d9;
  --c-ink:#102a24; --c-ink-2:#18382c; --c-muted:#617361; --c-on-dark:#fff8eb; --c-on-dark-muted:#c7d2c7;
  --c-line:#e7dbc9; --c-input-line:#d8d7ca; --c-wa:#178e50;
  /* type */
  --f-display:'Zodiak',Georgia,serif; --f-body:'General Sans',system-ui,sans-serif;
  --fs-display:clamp(3.4rem,6.4vw,5.76rem); --fs-h2:clamp(2.4rem,4.7vw,4.23rem);
  --fs-kicker:.72rem; --ls-kicker:.22em; --ls-display:-.062em; --ls-h2:-.048em;
  /* shape & depth */
  --r-btn:4px; --r-card:6px; --r-panel:7px; --r-arch:185px 185px 8px 8px;
  --sh-panel:0 20px 65px rgba(8,27,23,.33); --sh-hero-img:0 33px 75px rgba(0,0,0,.23);
  /* layout */
  --container:min(100% - 70px,1220px); --section-y:94px; --header-h:80px;
}
@media (max-width:900px){:root{--container:min(100% - 42px,1220px)}}
@media (max-width:760px){:root{--container:min(100% - 34px,1220px);--section-y:64px;--header-h:67px}}
html{scroll-behavior:smooth;scroll-padding-top:calc(var(--header-h) + 4px)}
body{margin:0;background:var(--c-bg);color:var(--c-ink);font:400 16px/1.65 var(--f-body);-webkit-font-smoothing:antialiased;overflow-x:clip}
h1,h2{font-family:var(--f-display);font-weight:500;letter-spacing:-.045em;line-height:1.07;margin:0}
h1 em,h2 em{font-weight:400;color:var(--c-gold-em-light)}
.on-dark h1 em,.on-dark h2 em{color:var(--c-gold-em-dark)}
.container{width:var(--container);margin-inline:auto}
.btn{display:inline-flex;align-items:center;justify-content:space-between;gap:14px;min-height:56px;padding:13px 24px;border-radius:var(--r-btn);border:1px solid transparent;font:750 .88rem/1.2 var(--f-body)}
.btn--gold{background:var(--c-gold);color:#13291e}
.btn--outline-light{border-color:rgba(240,223,191,.45);color:#fff4e3}
.btn--dark{background:var(--c-btn-dark);color:#fff}
.kicker{font:750 var(--fs-kicker)/1.65 var(--f-body);letter-spacing:var(--ls-kicker);text-transform:uppercase;color:var(--c-muted)}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
```

### 10.4 Server bits for Hostinger
`.htaccess` (extensionless URLs, **inferred** from the observed behaviour):
```apache
RewriteEngine On
RewriteCond %{THE_REQUEST} /([^.?\s]+)\.html[\s?] [NC]
RewriteRule ^ /%1 [R=301,L]
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+?)/?$ $1.html [L]
```
`track-event.php` (minimal, anonymous counter, POST only, whitelisted events):
```php
<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
$allowed = ['call_click','whatsapp_click','callback_open'];
$e = $_POST['event'] ?? '';
if (!in_array($e, $allowed, true)) { http_response_code(400); exit; }
$file = __DIR__.'/../private/event-counts.json';      // keep outside public_html
$fp = fopen($file, 'c+'); flock($fp, LOCK_EX);
$data = json_decode(stream_get_contents($fp) ?: '{}', true) ?: [];
$day = gmdate('Y-m-d'); $data[$day][$e] = ($data[$day][$e] ?? 0) + 1;
ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data)); flock($fp, LOCK_UN); fclose($fp);
http_response_code(204);
```

### 10.5 WhatsApp enquiry builder (reusable)
```js
export function openWhatsApp(number, lines) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) location.href = url;   // popup blocked (common on iOS)
}
```

### 10.6 Build order (checklist)
1. **Tokens and base:** fonts, `tokens.css`, container, buttons, kicker/eyebrow, heading-with-`<em>` pattern.
2. **Layout shell:** sticky header (desktop nav plus accessible mobile menu), footer grid, skip link, `<main id="main">`.
3. **Data:** `fleet.json` with your vehicles, rates, km and deposits, plus a business info object (phone, WhatsApp, address, hours, socials).
4. **Home:** Hero (arch image, orbits, stamp, tag) → Fleet teaser (featured + 2 category cards) → Booking form plus `booking.js` → Trust tiles → 4-step journey → FAQ `<details>` → Final CTA.
5. **Floating UI:** mobile action bar with the scroll-aware logic on home, floating WhatsApp (non-home, desktop), assistant widget.
6. **Inner templates:** `PageBanner` (photo plus green gradient overlay), `gb-extra` dark radial hero, vehicle card grid (3 columns → 2 at ≤900px → 1 at ≤600px, 220px photo, white card with 1px `#e8dfd1` border, radius 0), price tables (horizontal scroll wrapper, `min-width:790px`), contact cards plus Maps iframe (`loading="lazy"`), FAQ page with search, policy layout, landing pages, blog list and post layout.
7. **SEO:** per-page title, description, canonical, OG/Twitter, JSON-LD LocalBusiness+WebSite+WebPage, `sitemap.xml` (generate it automatically), `robots.txt`.
8. **Server:** `.htaccess`, `track-event.php`, upload `dist/` to `public_html`.
9. **QA:** widths 1440 / 1080 / 900 / 760 / 500 / 375 / 350, keyboard navigation (menu Esc, assistant focus return), `prefers-reduced-motion`, Lighthouse (aim for LCP under 2.5s; preload the hero WebP), WhatsApp link on iOS and Android.

### 10.7 Assets you need to make (do not copy Garuda's)
- Logo mark PNG/SVG in a light version for dark backgrounds (`garuda-mark-light.png` is 60×46 in the header, 52×43 in the footer), plus a favicon.
- Hero photo, 1600×970 and 960w, WebP, warm golden-hour, rider plus a local landmark.
- Featured bike editorial image, 1420×870.
- 8 model cut-outs, 1080×750, on a light neutral background with a soft floor shadow (Garuda labels theirs "illustrative").
- 3 route images (city / heritage / weekend), used as banner background and ride-idea cards.

---

## 11. Issues found on the original (avoid these in your build)

| # | Issue | Evidence |
|---|---|---|
| 1 | **Six layered stylesheets with heavy `!important` overrides.** Two design languages coexist: rounded/pill (`.btn` 999px, `.interior-card` 24px) on inner pages vs sharp 4–7px on home and fleet. | **[O]** CSS |
| 2 | **Dead JS.** The fleet filter, the price estimator (`#booking-form`, `GARUDA_FLEET`), the compare widget and the prep checklist target elements that don't exist. | **[O]** grep of all pages |
| 3 | **`fleet?category=scooter|commuter` links don't filter**, because no filter UI or logic runs on `/fleet`. | **[O]** |
| 4 | **An internal note is publicly visible on `/fleet`:** "Catalogue must be reconciled to your seven physical vehicles before publication." | **[O]** fleet.html footnote |
| 5 | **The same prices are hard-coded in 4+ places** (inline JSON, fleet cards, pricing tables, FAQ text, assistant strings). They can drift apart. | **[O]** |
| 6 | **Inline styles on pricing and contact** (`style="background:#153c32"`, etc.) instead of classes. | **[O]** |
| 7 | **Landing pages and `/refund-policy` are not linked** from the nav or footer (they only appear in the sitemap). | **[O]** |
| 8 | **Inconsistent mobile action bar colours** across three files (white/green, gold/green, green/gold). The last rule wins per page. | **[O]** CSS |
| 9 | **The assistant is hidden on the home page**, the page with the most traffic. That may be intentional, to keep the hero clean. | **[O]** `.page-home .ga-widget{display:none!important}` |
| 10 | **Policy pages render `body class="page-"`** (an empty slug), a template bug. | **[O]** |

---

## 12. Unknowns / limits of this analysis
- **`track-event.php`:** how it stores data, whether it rate-limits, and whether a dashboard exists. Only the client side is observable. **[?]**
- **`.htaccess` / server config:** the rewrite rules in §10.4 are inferred from the extensionless URL behaviour, not read. **[I]**
- **How the HTML was produced:** the uniform markup and the `ns0:` sitemap suggest Python tooling generated or post-processed the files, but the build tooling is not observable. **[I]**
- **Image origin:** the images are labelled "illustrative" and their source or licence is unknown. **[?]**
- **Pages not in the sitemap or links:** not discovered. Only the 21 linked and sitemap URLs were captured.
- **Font licensing:** Zodiak and General Sans are free for commercial use under the Fontshare (ITF Free Font) licence. Check the current terms before launch. **[I]**

---

## 13. Reproduce this capture
Every file I analysed was a public HTTP response. To re-capture:
```bash
B=https://garudabikerentals.in; mkdir -p mirror/blog && cd mirror
for p in index fleet how-to-book rental-guide about contact faq pricing ride-ideas \
  terms-and-conditions cancellation-policy privacy-policy refund-policy blog \
  scooter-rentals-warangal royal-enfield-rentals-warangal \
  blog/activa-vs-glamour-warangal blog/top-5-places-near-warangal-bike-trip \
  blog/hanamkonda-to-bhadrachalam-bike-guide blog/why-rent-vs-buy-warangal; do
  curl -sL "$B/$p" -o "$p.html"; done
for f in shared.css garuda-assistant.css rideverse-2026.css garuda-upgrades.css garuda-design.css \
  garuda-visual-refinement.css garuda-design.js site.js garuda-assistant.js garuda-upgrades.js \
  garuda-visual-refinement.js robots.txt sitemap.xml; do curl -sL "$B/$f" -o "$f"; done
```
Use this capture only as a reference for structure and behaviour. Garuda's copy, logo, photos and brand name belong to them, so write your own content and use your own assets.
