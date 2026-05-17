# AGENTS.md

## Project Overview
Princeton DJ Collective website — a Next.js 16 / React 19 / TypeScript app showcasing the club's team, mixes, booking contact, and education program. Media (images, video, audio) is served from Google Drive via a proxy route; team/gigs/mailing-list data is stored in Google Sheets. Deployed on Vercel.

## Quick Start
- Setup: `make setup`
- Dev: `make dev`
- Typecheck: `make typecheck`
- Lint: `make lint`
- Full check: `make check`

## Verification Commands
- Type check: `npx tsc --noEmit` (exits 0 = clean)
- Lint: `npm run lint` (currently passing; minor warning in api/files/route.ts — non-blocking)
- Build: `npm run build` (run manually; requires env vars GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_DRIVE_MIXES_FOLDER_ID, GOOGLE_DRIVE_CANVAS_FOLDER_ID, GOOGLE_SHEETS_GIGS_ID, GOOGLE_SHEETS_TEAM_ID, GOOGLE_SHEETS_MAILING_LIST_ID)
- All: `make check`

## Hard Constraints
- Do NOT commit `.env.local` — it contains Google service account private key
- All pages use `position: relative, zIndex` layering over a `<video>` background — maintain this pattern
- Use `BackLink` component (not Next.js `<Link>`) for back navigation on inner pages
- All media (images, video, audio) is proxied through `/api/media/[fileId]` — do not use Drive URLs directly
- Google Drive auth is in `app/utils/googleDrive.ts`; Sheets auth is in `app/utils/googleSheets.ts` — don't create new auth instances
- No test framework is set up — verification is typecheck + lint + manual browser testing
- `npm run lint` is the canonical lint command — `npx eslint .` behaves differently
- Past gigs Sheet columns: A=Venue, B=Event Name, C=Date (header in row 1, data from A2)
- Team Sheet columns: A=Full Name, B=Role (header in row 1, data from A2) — only names are displayed, roles are unused
- Mailing list Sheet: single column A=Email; appended via `appendMailingList()` in googleSheets.ts; env var GOOGLE_SHEETS_MAILING_LIST_ID

## Work Rules (WIP=1)
- Work on exactly one feature at a time
- Only start the next feature after the current one passes `make typecheck`
- Do not refactor unrelated components while implementing a feature
- "Done" = `npx tsc --noEmit` exits 0 + manual smoke test in browser

## Definition of Done
- `npx tsc --noEmit` exits 0
- No new ESLint errors introduced
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
