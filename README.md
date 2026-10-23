# OwnBridge International — Website

Rental listings and company site for OwnBridge International, plus an email/password admin so the
owner can manage listings.

**Stack:** Next.js 16 (App Router) · Prisma 7 + PostgreSQL · Tailwind CSS v4 · Cloudinary (images) ·
Leaflet + OpenStreetMap/CARTO (maps, no API key) · WhatsApp click-to-chat.

- Design language: [docs/DESIGN.md](docs/DESIGN.md) (from [the reference](docs/reference/reference-design.png))
- Backlog & open questions: [docs/BACKLOG.md](docs/BACKLOG.md)
- Company copy source: [docs/reference/company-content.md](docs/reference/company-content.md)

## Setup

```bash
pnpm install                # also runs `prisma generate`
cp .env.example .env        # then fill in the values (see below)
pnpm db:migrate             # create tables
pnpm db:seed                # owner account + 6 sample listings
pnpm dev                    # http://localhost:3000
```

Owner dashboard: `/admin` (log in with `OWNER_EMAIL` / `OWNER_PASSWORD` from `.env`).

### Environment variables

| Variable | Needed for |
|---|---|
| `DATABASE_CONNECTION_STRING` | PostgreSQL |
| `SESSION_SECRET` | Signing the admin session cookie (`openssl rand -base64 32`) |
| `OWNER_EMAIL`, `OWNER_PASSWORD` | Owner account created by the seed |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image uploads/deletes |
| `CLOUDINARY_UPLOAD_PRESET` | Preset used for uploads; set the target folder on the preset in Cloudinary |
| `NEXT_WHATSAPP_NUMBER` | WhatsApp buttons — digits only, e.g. `254712345678` |
| `NEXT_SITE_URL` | Links in WhatsApp enquiry messages, metadata |
| `NEXT_FACEBOOK_URL`, `NEXT_X_URL`, `NEXT_TIKTOK_URL` | Footer socials (empty = hidden) |
| `NEXT_CONTACT_EMAIL`, `NEXT_CONTACT_PHONE` | Footer contact |

`NEXT_*` values are baked in at build time — rebuild after changing them.

## How it works

- **Auth** — bcrypt-hashed password in `User`; on login a signed JWT (jose, HS256) is stored in an
  httpOnly cookie. `src/proxy.ts` redirects unauthenticated `/admin/*` requests, and every admin page
  and server action re-checks with `requireUser()` (`src/lib/auth.ts`).
- **Images** — the browser asks `/api/cloudinary/sign` (owner only) for a signature, then uploads
  straight to Cloudinary using the upload preset. Only the resulting URL/`public_id` is saved. Removing
  an image or deleting a listing deletes the Cloudinary asset. `src/lib/image-loader.ts` adds
  `f_auto,q_auto,w_…` transforms.
- **Location** — the listing form's map picker sets lat/lng from the browser's location
  ("Use my current location"), a map click, a dragged pin, or typed coordinates.
- **WhatsApp** — floating "List your property" button opens WhatsApp with a registration template;
  each listing has an "Enquire on WhatsApp" button with the listing link prefilled.
- **Disclaimer** — the mandatory text lives in `src/lib/site.ts` and renders above the footer on
  every public page.

## Scripts

| Script | |
|---|---|
| `pnpm dev` / `build` / `start` | Next.js |
| `pnpm typecheck` / `lint` | Checks |
| `pnpm db:migrate` | New migration in dev |
| `pnpm db:deploy` | Apply migrations in production |
| `pnpm db:seed` | Owner + sample listings (safe to re-run) |
| `pnpm db:studio` | Browse the DB |
