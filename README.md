# Hearth — AI Restaurant Brand Builder

Phase 1 MVP scaffold: a working Next.js app that turns restaurant photos and info into **Brand DNA**, then a consistent starter package (brand kit, mobile site, social kit, 12 creatives, 4 video storyboards, menu assets, Google Business copy, 30-day plan, asset library).

Positioning: *Your AI restaurant branding & marketing team.* Not a generic poster or website generator.

## Stack

| Layer | Choice |
| --- | --- |
| App | Next.js 16 (App Router) + React 19 + TypeScript |
| UI | Tailwind CSS v4 + a small shadcn-style kit (`src/components/ui.tsx`) |
| Data models | **Prisma**. SQLite for local demo; **PostgreSQL in production** (Bosco lock). Schema: `prisma/schema.prisma`. |
| Runtime data | Typed in-memory store persisted to `localStorage` (no database process required to click through the UI) |
| AI | Provider-independent interfaces + mocks in `src/lib/ai/index.ts` — **no API keys, no Higgsfield / real video provider** |

Prisma is the source of truth for entities. The UI does not query Prisma at runtime in Phase 1 so `npm install && npm run build` works without Postgres.

## How to run

```bash
cp .env.example .env   # DATABASE_URL=file:./dev.db
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo login (also the “Continue with demo account” button):

- Email: `demo@hearth.app`
- Password: `demo`

Protected routes under `/app/**` require that session cookie (set by `/login` or `/signup`).

```bash
npm run build
npm start
```

`npm run build` defaults `DATABASE_URL` to `file:./dev.db` if unset, so the SQLite generate step does not need a running database.

## Switching to PostgreSQL

Production is **Prisma + PostgreSQL**. Prisma cannot swap providers from the connection string alone — change both the datasource `provider` and `DATABASE_URL`.

1. Set `DATABASE_URL` in `.env` to a Postgres URL, for example:

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/hearth?schema=public"
   ```

2. In `prisma/schema.prisma`, change only the datasource block (leave models as-is):

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Generate the client and apply migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

Do **not** leave `provider = "sqlite"` pointed at a Postgres URL. Local demo should stay on SQLite until you are ready to run Postgres.

## Seeded account

One hospitality group, **three restaurants**:

1. **Harbor Table** (`/app/harbor-table`) — onboarding complete, approved Brand DNA, full starter package. Jobs and content carry `brandDnaId`.
2. **Little Lime** (`/app/little-lime`) — waiting on Brand DNA review. Approve it to unlock a mock starter package on Home.
3. **见您一面 / Meet U 1 Face Noodle** (`/app/meet-u-1-face`) — G-52 ICC Pudu, KL. Approved Brand DNA id `branddna_meetu_v2` (v2). Mode A is the panda; Mode B may use the owned 饺子哥 chef caricature. Week-1 calendar, 12 social concepts, and 4 video concepts carry that id. One `NEEDS_RELOCK` row still points at superseded `branddna_meetu_v1`.

Add another via **Add restaurant** to walk the full onboarding path (basics → photos → business → analyzing → Brand DNA → generating → done).

Reset demo data from **Settings** (also bumps past older `localStorage` snapshots).

## Brand DNA lock

`CreativeJob` and `ContentItem` have optional `brandDnaId` (required for generation/review once DNA is approved). Reverse relations live on `BrandDNA`.

Review rule (see `src/lib/brand-lock.ts`): if `content.brandDnaId !==` the restaurant’s current **APPROVED** Brand DNA id → `ContentStatus.NEEDS_RELOCK`. Approving DNA walks existing items; the content detail page can re-lock a stale row onto the current id.

## Calendar payload (`ContentItem.payload`)

Schedule fields sit on columns (`scheduledFor`, `platform`, `body`, `brandDnaId`, `status`). Details in JSON:

`dayIndex`, `dayOfWeek`, `isClosedDay`, `format`, `pillar`, `hookCaptionEn`, `creativeNote`, `cta`, `hashtags`, `campaignTheme`.

Social concepts (`SocialConceptPayload`): `postId`, `pillar`, `objective`, `captionZh`, `captionEn`, `visualConcept`, `mode` (`A`|`B`), `cta`, `ratios`, `layoutNotesByRatio`.

Video concepts (`VideoConceptPayload`): `videoId`, `title`, `durationSec`, `mode`, `scriptBeats`, `storyboardFrames`, `shotList`, `previewBrief`.

## Route map

**Public:** `/` `/pricing` `/login` `/signup` `/r/[restaurantSlug]`

**Account:** `/app` `/app/restaurants/new` `/app/settings`

**Onboarding:** `/app/[restaurantId]/onboarding/{basics,assets,business,analyzing,brand-dna,generating,done}`

**App shell nav:** Home · Brand · Create · Content · Website · Assets · Campaigns · Social

Plus `brand/kit|guide|edit`, `create/social|video|[jobId]`, `content/[itemId]`, `website/preview|publish`, `assets/[assetId]`, `campaigns/new|[campaignId]`, `social/publishing`, `jobs/[jobId]`.

Campaigns and social publishing are intentional “coming soon” stubs. Everything else is a usable mock.

## Brand DNA fields

TypeScript types in `src/lib/types.ts` (aligned with Prisma): positioning, audience, personality, voice, tagline, colours, typography, photographyDirection, videoDirection, graphicStyle, ctaStyle.

Approve Brand DNA in onboarding (or on Little Lime) to generate the starter package linked from Home. Primary CTA on Home: **+ Create content**.

## Project layout

```
prisma/schema.prisma     # Prisma models (SQLite demo; Postgres-ready models)
src/lib/types.ts         # App types
src/lib/brand-lock.ts    # NEEDS_RELOCK review helper
src/lib/mock/            # Seed + local store
src/lib/ai/              # BrandIntelligence interface + mock
src/components/          # UI kit + shell + brand/package views
src/app/                 # App Router pages
src/proxy.ts             # Session gate for /app/**
```

## Out of scope (Phase 1)

Real AI providers, Higgsfield / real video render, live social publishing, Stripe, analytics.
