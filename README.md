
# zachbaskin.com — Static Portfolio (Next.js 15 + Tailwind)

- **Framework**: Next.js App Router
- **Output**: Static export (no server). `next build` → `out/`
- **Style**: Tailwind
- **Routes**: `/`, `/resume`, `/reviews`

## Getting Started

```bash
# in this folder
pnpm i   # or npm i / yarn
cp .env.example .env
# set NEXT_PUBLIC_LETTERBOXD_RSS to your Letterboxd RSS URL (optional)
pnpm dev
```

Open http://localhost:3000.

## Build static site

```bash
pnpm build
# outputs to ./out
```

Deploy anywhere that serves static files (Vercel recommended).
