# Naveen Bike Rentals — website

Next.js 16 (App Router, Cache Components) + Tailwind CSS 4 + Motion. Every page is prerendered as static HTML. Hosted on Netlify.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint
```

## Design system ("Rental plate")

In Telangana a self-drive rental bike carries a black number plate with yellow letters, and the owner's posters use the same yellow on black. The site is built round that plate:

| Token | Hex | Use |
|---|---|---|
| `ground` (stone) | `#EEEEEB` | page background |
| `kerb` | `#E1E1DD` | panels, bike stages, footer |
| `ink` (tarmac) | `#1C1D1F` | text and buttons |
| `gravel` | `#464747` | secondary text (8:1 on ground) |
| `plate` | `#FFC531` | only as yellow letters on a black plate: prices, the mark, the closing name |

Type: Work Sans for everything, Barlow Condensed (a face drawn from licence plates and road signs) only on plates. The `.plate` utility in `globals.css` makes any price or name into a rental plate. Motion is kept to the hero's one entrance on load, hover feedback, the rate board's preview swap and the rides story that plays as you scroll (it rests as a plain grid with reduced motion).

The ride photographs in `public/photos/` are Creative Commons photos from Wikimedia Commons, credited on `/credits`. Replace them with your own riders' photos whenever you like (keep the credit list in `src/lib/content.ts` in sync).

## SEO and AI search

- Landing pages for each search: `src/lib/landings.ts` (areas: Hanamkonda, Warangal, Kazipet, NIT Warangal, Warangal station; types: Royal Enfield, scooty). Add one there plus a 6-line `src/app/<slug>/page.tsx` like the others.
- Ride guides: `/rides/<slug>`, generated from `rides` in `src/lib/content.ts`.
- `/llms.txt` (fact sheet for AI assistants), `robots.txt` (AI crawlers allowed), `sitemap.xml` with images, structured data in `src/lib/schema.tsx`, all built from the same data.
- After a deploy: `npm run indexnow -- https://your-domain` to tell Bing (and ChatGPT search, Copilot) about changes.
- Optional Netlify env vars: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` (meta-tag verification codes).
- **What the owner needs to do off the site** (Google Business Profile, reviews, Search Console, listings): see `docs/SEO-PLAYBOOK.md`.

## Where to edit things

| What | File |
|---|---|
| Phone, WhatsApp, address, map, hours, Google rating, social links | `src/lib/site.ts` |
| Bikes, prices, km/day, specs, badges, images | `src/lib/fleet.ts` |
| Reviews, FAQs, rides (with photos and credits), booking steps | `src/lib/content.ts` |
| WhatsApp booking message format | `src/lib/booking.ts` |
| Colours, fonts, animations (design tokens) | `src/app/globals.css` (`@theme`) |
| Rental terms page | `src/app/terms/page.tsx` |

Change a price in `fleet.ts` and it updates everywhere: cards, calculator, price ladder, bike pages, WhatsApp messages and SEO data.

### Adding a bike
1. Put a side-view photo (white or transparent background works best) in `public/bikes/`.
2. Add an entry to `bikes` in `src/lib/fleet.ts` with a unique `slug`.
3. That's it. Its page `/bikes/<slug>` and sitemap entry are generated automatically.

## Structure

```
src/app/                 routes: /, /bikes, /bikes/[slug], /pricing, /contact, /faq, /terms
                         + sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, icon.svg, apple-icon.tsx
src/components/          header, footer, booking console, fleet explorer, bike card, calculator…
src/components/home/     home page sections (hero, RE spotlight, price ladder, reviews…)
src/lib/                 data + helpers (single source of truth)
public/bikes/            model images (+ SOURCES.md)
docs/                    reverse-engineering notes from garudabikerentals.in
```

## Deploy to Netlify

The repo is ready for Netlify: `netlify.toml` sets the build (`npm run build`, Node 22) and Netlify adds its Next.js adapter on its own (no plugin to install).

1. In Netlify: **Add new site → Import an existing project → GitHub**, pick this repository.
2. Netlify reads `netlify.toml`, so leave the build settings as they are and press **Deploy**.
3. Optional: **Site configuration → Environment variables** → add `NEXT_PUBLIC_SITE_URL` = your domain (e.g. `https://naveenbikerentals.in`). Without it the site uses Netlify's own address for canonical links, the sitemap and share previews, which is correct too.
4. **Domain management → Add a domain** for your own domain.
5. After going live, add the website to the Google Business Profile (it currently has none) and submit `/sitemap.xml` in Google Search Console.

Every push to `main` deploys automatically; pull requests get preview links.

## Before launch: owner checklist

- [ ] **Domain**: buy one and add it in Netlify (optionally set `NEXT_PUBLIC_SITE_URL`).
- [ ] **Activa 6G "5"**: the rate list had "Activa 6g 499 day 125km. 5". Confirm what "5" means (`note` field in `fleet.ts`).
- [ ] **Deposit & extra-km charge**: the site says "refundable deposit at pickup" and "extra km as per policy". Add the exact amounts if you want them public.
- [ ] **Instagram / Facebook**: add the handles in `site.ts` → `social`.
- [ ] **Own photos**: the bike images are manufacturer product shots (see `public/bikes/SOURCES.md`). Replacing them with photos of *your* bikes is better for trust and avoids using brand assets. Good shots to add: the storefront, the fleet lined up, happy customers (with permission).
- [ ] **About page**: add a line or two about who runs the counter and since when (`src/app/about/page.tsx`, "What we do").
- [ ] **Privacy policy**: check the "At the counter" section of `/privacy-policy` matches what you keep from customers' IDs.
- [ ] **Cancellation, refund, late-return rules**: adopted from the local standard (same rules as Garuda Bike Rentals) in `src/lib/policies.ts`; check they match how you work. Deposit amounts and the extra-km rate are not published yet.
- [ ] **Terms**: review `/terms`. It summarises the conditions from your posters plus standard practice.
- [ ] **Reviews**: the review quotes are real Google reviews (shortened, names abbreviated). Keep them current.
