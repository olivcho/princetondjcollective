# AGENTS.md

## Project Overview
Princeton DJ Collective website — a Next.js 16 / React 19 / TypeScript app showcasing the club's team, mixes, booking contact, and education program. Media assets are hosted on UploadThing; Supabase is provisioned for future data needs. Deployed on Vercel.

## Quick Start
- Setup: `make setup`
- Dev: `make dev`
- Typecheck: `make typecheck`
- Lint: `make lint`
- Full check: `make check`

## Verification Commands
- Type check: `npx tsc --noEmit` (exits 0 = clean)
- Lint: `npm run lint` (currently exits 1 — 2 known errors in PageTransition.tsx, see PROGRESS.md)
- Build: `npm run build` (run manually; requires env vars NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, UPLOADTHING_SECRET)
- All: `make check`

## Hard Constraints
- Do NOT commit `.env.local` — it contains UploadThing and Supabase secrets
- All pages use `position: relative, zIndex` layering over a `<video>` background — maintain this pattern
- Use `BackLink` component (not Next.js `<Link>`) for back navigation on inner pages
- UploadThing file ordering is controlled by `CUSTOM_ORDER` array in `app/api/files/route.ts`
- Supabase client is initialized in `app/utils/supabase.ts` — import from there, don't create new clients
- No test framework is set up — verification is typecheck + lint + manual browser testing
- Mixes track URLs are intentionally empty (pending audio hosting decision)
- `npm run lint` is the canonical lint command — `npx eslint .` behaves differently

## Work Rules (WIP=1)
- Work on exactly one feature at a time
- Only start the next feature after the current one passes `make typecheck`
- Do not refactor unrelated components while implementing a feature
- "Done" = `npx tsc --noEmit` exits 0 + manual smoke test in browser

## Definition of Done
- `npx tsc --noEmit` exits 0
- No new ESLint errors introduced (2 existing errors in PageTransition.tsx are tracked debt)
- Tested in browser at `localhost:3000`

## Session Start
1. Read PROGRESS.md
2. Read DECISIONS.md
3. Run `make typecheck` — confirm clean
4. Continue from PROGRESS.md "Next Steps"

## Session End
- [ ] `make typecheck` passes
- [ ] No new ESLint errors added
- [ ] PROGRESS.md updated
- [ ] All completed work committed

## Topic Docs
- `docs/media-patterns.md` — UploadThing integration and CUSTOM_ORDER file management (create when adding media features)
