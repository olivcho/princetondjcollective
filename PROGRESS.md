# PROGRESS.md

## Current State
- Branch: main
- Latest commit: ac47b1e (uncommitted changes present — archive page, gigs, MixesPlayer cleanup)
- Build: unknown (requires env vars — run `npm run build` locally to verify)
- Tests: 0 found — no test framework set up
- Typecheck: passing (`npx tsc --noEmit` exits 0)
- Lint: passing (no errors; minor warnings in api/files/route.ts non-blocking)

## Known Lint Debt
- `api/files/route.ts` — unused `error` variable in catch block (warning, non-blocking)

## Completed
- [x] Initial Next.js app scaffolding (a01de96)
- [x] Homepage with video background and team section (1766fd0)
- [x] Booking page with contact email (ae8bbad)
- [x] Education page with program details (ae8bbad)
- [x] Responsive nav with hamburger menu + About tab (d45629e)
- [x] Mobile nav compact dropdown (66ea9b6)
- [x] Google Drive migration — canvas gallery and mixes audio via Drive API (ac47b1e)
- [x] Remove Supabase, UploadThing, and BackgroundAudio (ac47b1e)
- [x] Fix PageTransition.tsx ESLint errors (ac47b1e)
- [x] Replace `<img>` with Next.js `<Image />` in canvas page (ac47b1e)
- [x] Agent harness setup (ac47b1e)
- [x] Archive page — tabbed Mixes / Canvas / Past Gigs (uncommitted)
- [x] Google Sheets integration for past gigs (uncommitted)
- [x] Nav consolidated: Canvas + Mixes → Archive (uncommitted)
- [x] MixesPlayer glass card removed for visual consistency (uncommitted)

## In Progress
- none

## Blocked
- none

## Next Steps (deferred — remind user)
1. Officers/Team page — Google Sheets backend, photos from Drive
2. Branding messaging — "we don't take a cut" copy on homepage/About
3. Mailing list — Mailchimp embed on homepage and booking page
4. Updated booking page — structured form (Formspree), mention non-Princeton events
