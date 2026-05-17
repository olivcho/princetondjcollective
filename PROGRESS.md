# PROGRESS.md

## Current State
- Branch: main
- Latest commit: 66ea9b6
- Build: unknown (requires env vars — run `npm run build` locally to verify)
- Tests: 0 found — no test framework set up
- Typecheck: passing (`npx tsc --noEmit` exits 0)
- Lint: failing — 2 errors in `app/components/PageTransition.tsx` (react-hooks/set-state-in-effect), 4 warnings elsewhere

## Known Lint Debt
- `PageTransition.tsx:32,67` — `setIsVisible(true)` called synchronously inside `useEffect`, triggers cascading renders
- `canvas/page.tsx:74`, `page.tsx:81` — `<img>` instead of Next.js `<Image />` (warnings, not blocking)
- `api/files/route.ts:48` — unused `error` variable in catch block (warning)

## Completed
- [x] Initial Next.js app scaffolding (a01de96)
- [x] Homepage with video background, team section, gradient canvas scroll (1766fd0)
- [x] Mixes player page with tracklist UI (1e37189)
- [x] Booking page with contact email (ae8bbad)
- [x] Education page with program details (ae8bbad)
- [x] UploadThing media gallery (canvas page) with custom file ordering (db8aafd)
- [x] Background audio component with keep-listening popup (db8aafd)
- [x] Responsive nav with hamburger menu + About tab (d45629e)
- [x] Mobile nav compact dropdown (66ea9b6)

## In Progress
- [ ] **Google Drive migration** — replacing UploadThing with Google Drive API for both canvas photos and mixes audio
  - F02 (canvas gallery): rewrite `app/api/files/route.ts` to call Drive API
  - F03 (mixes audio): rewrite `app/mixes/page.tsx` to fetch tracks dynamically from Drive API via new `app/api/mixes/route.ts`
  - Remove UploadThing dependency once both routes are migrated

## Blocked
- Google Drive migration: needs Google Cloud project + service account credentials before coding can start
  - Required env vars: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_DRIVE_MIXES_FOLDER_ID`, `GOOGLE_DRIVE_CANVAS_FOLDER_ID`
  - Drive folders already created by user

## Next Steps
1. Set up Google Cloud project, enable Drive API, create service account, download JSON key
2. Add env vars to `.env.local`
3. Rewrite `app/api/files/route.ts` — Drive API replaces UploadThing for canvas photos
4. Add `app/api/mixes/route.ts` — new route listing MP3s from mixes Drive folder
5. Update `app/mixes/page.tsx` — fetch tracks dynamically instead of hardcoded empty array
6. Remove `uploadthing` and `@uploadthing/next` from `package.json`
7. Delete `app/utils/uploadthing.ts`
