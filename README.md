# Hearth — AI Restaurant Brand Builder

Phase 1 MVP scaffold: a working Next.js app that turns restaurant photos and info into **Brand DNA**, then a consistent starter package (brand kit, mobile site, social kit, 12 creatives, 4 video storyboards, menu assets, Google Business copy, 30-day plan, asset library).

Positioning: *Your AI restaurant branding & marketing team.* Not a generic poster or website generator.

## Stack

| Layer | Choice |
| --- | --- |
| App | Next.js 16 (App Router) + React 19 + TypeScript |
| UI | Tailwind CSS v4 + a small shadcn-style kit (`src/components/ui.tsx`) |
| Data models | **Prisma** (SQLite for local demo). Schema lives in `prisma/schema.prisma`. |
| Runtime data | Typed in-memory store persisted to `localStorage` (no database process required to click through the UI) |
| AI | Provider-independent interfaces + mocks in `src/lib/ai/index.ts` — **no API keys** |

Prisma is the source of truth for entities. The UI does not query Prisma at runtime in Phase 1 so `npm install && npm run build` works without Postgres. To use a real database later, switch the Prisma `datasource` to PostgreSQL and wire the store to the client.

## How to run

```bash
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

## Seeded account

One hospitality group, **two restaurants**:

1. **Harbor Table** (`/app/harbor-table`) — onboarding complete, approved Brand DNA, full starter package.
2. **Little Lime** (`/app/little-lime`) — waiting on Brand DNA review. Approve it to unlock a mock starter package on Home.

Add a third via **Add restaurant** to walk the full onboarding path (basics → photos → business → analyzing → Brand DNA → generating → done).

Reset demo data from **Settings**.

## Route map

**Public:** `/` `/pricing` `/login` `/signup` `/r/[restaurantSlug]`

**Account:** `/app` `/app/restaurants/new` `/app/settings`

**Onboarding:** `/app/[restaurantId]/onboarding/{basics,assets,business,analyzing,brand-dna,generating,done}`

**App shell nav:** Home · Brand · Create · Content · Website · Assets · Campaigns · Social

Plus `brand/kit|guide|edit`, `create/social|video|[jobId]`, `content/[itemId]`, `website/preview|publish`, `assets/[assetId]`, `campaigns/new|[campaignId]`, `social/publishing`, `jobs/[jobId]`.

Campaigns and social publishing are intentional “coming soon” stubs. Everything else is a usable mock.

## Brand DNA

TypeScript types in `src/lib/types.ts` (aligned with Prisma): positioning, audience, personality, voice, tagline, colours, typography, photographyDirection, videoDirection, graphicStyle, ctaStyle.

Approve your **brand profile** in onboarding (or on Little Lime) to generate the starter kit linked from Home. Primary CTA: **Create content**. While setup is unfinished, Home is a “Next up” checklist and the full app nav stays hidden.

## Project layout

```
prisma/schema.prisma     # Prisma models (SQLite demo)
src/lib/types.ts         # App types
src/lib/mock/            # Seed + local store
src/lib/ai/              # BrandIntelligence interface + mock
src/components/          # UI kit + shell + brand/package views
src/app/                 # App Router pages
src/proxy.ts             # Session gate for /app/**
```

## Out of scope (Phase 1)

Real AI providers, real video render, live social publishing, Stripe, analytics.
