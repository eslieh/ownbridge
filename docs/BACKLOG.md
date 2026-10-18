# OwnBridge Website — Backlog

Timeline: **2 weeks max** from kickoff, with review links shared at each milestone.
Status: ✅ done in skeleton · 🟡 partial / stubbed · ⬜ not started

## Milestone 0 — Skeleton (Day 1) ✅
| # | Item | Status |
|---|---|---|
| 0.1 | Next.js (App Router, TS, Tailwind v4) + pnpm | ✅ |
| 0.2 | Prisma + PostgreSQL schema: `User`, `Listing`, `ListingImage`, `HouseType` enum | ✅ |
| 0.3 | `.env.example` with Cloudinary / WhatsApp / auth placeholders | ✅ |
| 0.4 | Design tokens & fonts from reference (`docs/DESIGN.md`) | ✅ |
| 0.5 | Seed script: owner account + 6 sample listings with placeholder images | ✅ |

## Milestone 1 — Owner admin (Days 2–5)
| # | Item | Status |
|---|---|---|
| 1.1 | Email/password login (bcrypt + signed httpOnly session cookie) | ✅ |
| 1.2 | Route protection for `/admin/*` | ✅ |
| 1.3 | Listings table: title, type, rent, status, published toggle, edit/delete | ✅ |
| 1.4 | Create/edit listing form: title, description, house type, bedrooms, bathrooms, rent (KES), area/neighbourhood, address | ✅ |
| 1.5 | Location picker: "Use my current location" (browser geolocation) + click/drag pin on map → lat/lng | ✅ |
| 1.6 | Image upload to Cloudinary (signed with upload preset, direct from browser), multiple images, remove, set cover | ✅ |
| 1.7 | Delete Cloudinary asset when an image/listing is removed | ✅ |
| 1.8 | Reorder images by drag | ⬜ |
| 1.9 | Change password page | ⬜ |
| 1.10 | Rate-limit login attempts | ⬜ |
| 1.11 | Form validation messages per field (currently top-level error) | 🟡 |

## Milestone 2 — Public site (Days 4–9)
| # | Item | Status |
|---|---|---|
| 2.1 | Home: hero + search, stats strip, featured listings, services, landlord/tenant splits | ✅ |
| 2.2 | Listings page: filters (type, bedrooms, max rent, area search) + grid + map split view | ✅ |
| 2.3 | Listing detail: gallery, specs, description, map, WhatsApp enquiry for that listing | ✅ |
| 2.4 | About: story, vision, mission, 6 core values | ✅ |
| 2.5 | Landlords & Tenants sections (content from `docs/reference/company-content.md`) | ✅ |
| 2.6 | Floating WhatsApp "List your property" button with prefilled message | ✅ |
| 2.7 | Mandatory disclaimer (verbatim) in footer area | ✅ |
| 2.8 | Footer: socials (Facebook, X, TikTok placeholder), contact | ✅ |
| 2.9 | Hover card ↔ highlight map pin | ⬜ |
| 2.10 | Mobile map toggle on listings page | 🟡 |
| 2.11 | Pagination / infinite scroll (needed once > ~30 listings) | ⬜ |
| 2.12 | Contact page / form (or route all contact to WhatsApp — **client decision**) | ⬜ |

## Milestone 3 — Polish & launch (Days 10–14)
| # | Item | Status |
|---|---|---|
| 3.1 | SEO: per-listing metadata, OpenGraph image from cover photo, sitemap.xml, robots.txt | ⬜ |
| 3.2 | Logo in nav ✅ (from `logo.png`); favicon + SVG logo still needed from client | 🟡 |
| 3.2b | Set a folder (e.g. `ownbridge/listings`) on the Cloudinary upload preset — test upload landed at root | ⬜ |
| 3.3 | Replace placeholder copy/photos with approved content | ⬜ |
| 3.4 | Lighthouse ≥ 90 (perf/a11y) on home + listings | ⬜ |
| 3.5 | Privacy notice (Kenya Data Protection Act) | ⬜ |
| 3.6 | Deploy (Vercel + managed Postgres), custom domain, prod env vars | ⬜ |
| 3.7 | Owner handover doc: how to add/edit listings | ⬜ |

## Open questions for the client
1. WhatsApp business number (international format, e.g. `2547XXXXXXXX`).
2. Exact Twitter/X handle; TikTok link when ready; Facebook page URL.
3. Is rent shown publicly, or "Price on request" for some listings?
4. Do they list properties for **sale** too, or rent/lease only? (Schema has `purpose` ready.)
5. Logo as SVG + a square mark for the favicon (we have the PNG).
6. Owner login email(s) — single owner or multiple staff accounts?

## Later / nice to have
- Landlord portal (income, expenses, scorecards) — referenced in company copy, out of v1 scope.
- Tenant portal (rent, maintenance tickets).
- Virtual 3D tour embed field on listings.
- Saved searches / email alerts.
