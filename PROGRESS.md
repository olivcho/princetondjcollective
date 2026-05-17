# PROGRESS.md

## Current State
- Branch: main
- Latest commit: 7c8d0a9 (uncommitted changes present — mailing list form)
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
- [x] Responsive nav with hamburger menu (d45629e)
- [x] Mobile nav compact dropdown (66ea9b6)
- [x] Google Drive migration — canvas gallery and mixes audio (ac47b1e)
- [x] Remove Supabase, UploadThing, and BackgroundAudio (ac47b1e)
- [x] Agent harness setup (ac47b1e)
- [x] Archive page — tabbed Mixes / Canvas / Past Gigs (3cc424e)
- [x] Google Sheets integration for past gigs (3cc424e)
- [x] Nav consolidated: Canvas + Mixes → Archive (3cc424e)
- [x] Team page — names from Google Sheets, Playfair italic list (7c8d0a9)
- [x] Archive viewport lock + MixesPlayer scroll island on mobile (7c8d0a9)
- [x] Mailing list form on homepage — Google Sheets append via /api/subscribe (uncommitted)

## In Progress
- none

## Blocked
- none

## Next Steps (deferred)
1. Branding messaging — "we don't take a cut" copy on homepage/About
2. Updated booking page — structured form (Formspree), mention non-Princeton events
