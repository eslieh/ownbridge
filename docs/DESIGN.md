# OwnBridge — Design Language

Extracted from `docs/reference/reference-design.png` (a "Sovex" real-estate concept). We keep its
structure and feel and swap in OwnBridge content. Tokens below are implemented in
`src/app/globals.css` (`@theme`). If you change a value here, change it there too.

## 1. Character

- **Quiet, premium, photographic.** The photos carry the colour; the UI around them is near-monochrome.
- **Soft geometry.** Everything is rounded: large-radius cards, pill buttons, pill chips.
- **Airy.** Lots of off-white canvas, white cards that lift slightly off it, generous gutters.
- **One loud element per view.** The hero heading, or the map, or the primary black pill. Never all three.

## 2. Colour

The reference is monochrome; the client logo adds navy + lime. Rule: **UI stays monochrome**
(black primary pills, grey chips) and brand colours appear only as small accents, so photos stay
the loudest colour on the page.

**Logo:** `public/logo.png` is cropped from the client's `logo.png` (root) with the grey background
made transparent. Render at `h-10` in the nav. Needed from client: SVG version + square globe
mark for the favicon.

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#F4F4F5` | Page background (the light-grey "paper" behind cards) |
| `surface` | `#FFFFFF` | Cards, nav bar, search panel, modals |
| `muted` | `#EDEDEF` | Pill buttons (e.g. "Contact us"), chip backgrounds, search input fill |
| `line` | `#E4E4E7` | 1px borders, dividers |
| `ink` | `#111111` | Headings, prices, primary pill background |
| `ink-2` | `#52525B` | Body text |
| `ink-3` | `#A1A1AA` | Metadata (address, beds/baths line), placeholders |
| `brand` | `#186098` | OwnBridge navy (sampled from `logo.png`) — small accents only: stat numbers, check icons |
| `brand-lime` | `#A8C850` | OwnBridge lime — nav dots, decorative only (fails contrast as text on white) |
| `pin` | `#E5484D` | Map markers |
| `pin-active` | `#186098` | Selected/hovered marker (brand navy) |
| `whatsapp` | `#25D366` | **Only** the WhatsApp button |
| `success` / `danger` | `#16A34A` / `#DC2626` | Admin form states |

Map tiles: CARTO **Voyager** (light, green parks, blue water) matches the reference map closely
and needs no API key.

Dark mode: not in scope for v1 — the reference is light-only and photos are tuned for it.

## 3. Typography

The reference uses a geometric grotesk with a single-storey feel and tight display tracking.
Closest free Google Fonts match:

| Role | Font | Weight | Size / line-height | Tracking |
|---|---|---|---|---|
| Display (hero H1) | **Manrope** | 600 | `clamp(2.5rem, 6vw, 4.25rem)` / 1.05 | `-0.03em` |
| H2 section ("Explore Our Homes") | Manrope | 600 | `2rem–2.5rem` / 1.15 | `-0.02em` |
| H3 card title | Manrope | 600 | `1rem` / 1.3 | `-0.01em` |
| Price | Manrope | 700 | `1.25rem` / 1.2 | `-0.01em` |
| Body | **Inter** | 400 | `0.9375rem` / 1.6 | 0 |
| Meta / chips / nav | Inter | 500 | `0.8125rem` / 1.4 | 0 |
| Micro (badges) | Inter | 500 | `0.6875rem` / 1.3 | `0.02em` |

Loaded via `next/font/google` in `src/app/layout.tsx` as `--font-display` and `--font-sans`.

## 4. Shape, spacing, elevation

- **Radius:** cards `20px` (`rounded-[20px]`), card images `14px`, hero image `28px`,
  inputs `14px`, buttons/chips `9999px`.
- **Spacing scale:** Tailwind default (4px). Section vertical rhythm `py-20` desktop / `py-14` mobile.
  Card inner padding `p-2.5` around the image, `px-2 pb-3` for text.
- **Container:** `max-w-7xl`, `px-4 sm:px-6 lg:px-8`.
- **Elevation:** almost flat. Cards: `shadow-[0_1px_2px_rgba(0,0,0,0.04)]`. Floating search panel:
  `shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]`. No heavy drop shadows elsewhere.

## 5. Components (as seen in the reference)

**Nav bar** — logo left; centred links each prefixed with a small `•` dot ("• Listings  • About
• Landlords  • Tenants"); right side a grey `muted` pill "Contact us". White surface, sits on canvas.

**Hero** — big two-line heading top-left ("Discover a Place / to Call Home"), short paragraph top-right
in `ink-2`. Below, a wide rounded photo. A white **search panel** overlaps the bottom edge of the
photo: segmented tabs on top (Buy / Rent → we use *Rent / Lease / Short stay*), then a pill input
with a `+` on the left and a black circular submit on the right. Under it a row of translucent
suggestion chips ("2 bedroom in Kilimani", "Bedsitter near CBD"...).

**Listing card** — white card, image with 14px radius on top, then: price (bold, `ink`), small grey
"View Details" pill aligned right, title, address in `ink-3`, and a meta row with icons:
beds · baths · type.

**Listings page (split view)** — sticky search bar on top; left column = "N homes for rent" header +
2-col card grid; right column = sticky map (≈45% width) with red pins. Hovering a card turns its
pin blue. On mobile the map collapses behind a "Map" toggle.

**Section header** — centred H2 + one line of `ink-2` text + a row of filter chips; the active chip is
black with white text, others `muted`.

**Feature split** ("The Smarter Way to Sell Your Home") — text left with a small bullet list and
a black "Learn more" pill, image right. We use it for *For Landlords* and *For Tenants*.

**Stats strip** — OwnBridge-specific: `Since 2017 · 9+ years · 1,800+ units managed · Rent remitted
6th–8th · Scorecards by the 10th`. Large Manrope numbers, Inter labels.

**WhatsApp FAB** — fixed bottom-right, 56px circle in `whatsapp` green with the glyph, label
"List your property" expands on hover (desktop). Opens `wa.me/<number>?text=<prefilled>`.

**Disclaimer** — small `ink-3` text in a `muted` rounded box above the footer. Copy is mandatory
and must be verbatim (see `src/lib/site.ts`).

## 6. Imagery

- Stock / placeholder only during development (Kenya Data Protection Act; no 2017–2019 photos).
- Aspect ratios: card `4:3`, hero `21:9` desktop / `4:5` mobile, gallery `3:2`.
- Always delivered through Cloudinary with `f_auto,q_auto` and a width transform.

## 7. Motion

Subtle only: `transition-colors`/`transition-transform` 150–200ms; card image `scale-[1.03]` on hover.
No parallax, no scroll-jacking.

## 8. Accessibility

- Text on `canvas` must be `ink-2` or darker (`ink-3` only for non-essential metadata ≥ 13px).
- All pill buttons ≥ 40px tall; focus ring `ring-2 ring-ink ring-offset-2`.
- Map is never the only way to find a listing — the grid carries the same data.
