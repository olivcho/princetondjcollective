# DECISIONS.md

## 2026-05-17: Google Drive API for all media (canvas photos + mixes audio)
- Reason: Non-admin club members need to add photos and mixes without touching code or UploadThing's dashboard. A shared Google Drive folder lets anyone with access drop files in and they appear on the site automatically.
- Rejected: UploadThing (requires admin dashboard access to upload); Supabase Storage (same problem); hardcoded file lists (requires code change per file); UploadThing→Drive sync (files stored in two places, manual sync step).
- Constraint: Requires a Google Cloud project with Drive API enabled and a service account (`princeton-dj-site@tigerfoodies-487515.iam.gserviceaccount.com`). Env vars `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_DRIVE_MIXES_FOLDER_ID`, `GOOGLE_DRIVE_CANVAS_FOLDER_ID` must be set in `.env.local` and in Vercel environment settings. All media is proxied through `/api/media/[fileId]` — this handles auth and HTTP range requests for audio seeking.

## 2026-05-17: Media proxied through Next.js instead of served directly from Drive
- Reason: Drive files are shared with the service account (not public), so the browser can't load them directly. The proxy at `app/api/media/[fileId]/route.ts` authenticates with the service account token and forwards range requests, enabling audio seeking.
- Rejected: Making Drive folders publicly accessible (would expose files to anyone who guesses a file ID).
- Constraint: Every image, video, and audio file load goes through the Next.js server. Fine for a club site; would need a CDN layer for high-traffic use.

## 2026-05-17: Video background pattern for all inner pages
- Reason: All pages (booking, education, mixes) use a full-bleed `<video>` with a dark rgba overlay and `position: absolute / zIndex` layering. This gives visual consistency across the site.
- Rejected: Per-page background images or solid colors.
- Constraint: New pages must follow the `video → overlay div → content div (zIndex: 2)` stack pattern, or the text will render behind the video.

## 2026-05-17: Removed Supabase and BackgroundAudio
- Reason: Supabase was provisioned but never used. BackgroundAudio (autoplaying music on homepage) was removed by design decision.
- Rejected: n/a
- Constraint: none — both are fully removed from the codebase and env vars.

## 2026-05-17: Archive page consolidates Mixes, Canvas, and Past Gigs into one tabbed page
- Reason: Mixes, photos, and gig history are all expressions of the collective's work — grouping them under one "Archive" nav item is cleaner than three separate nav links and creates a more editorial feel.
- Rejected: Separate pages for each (too many nav items); embedding all three on the homepage (too heavy).
- Constraint: Nav now has one Archive link at `/archive`. Old `/mixes` and `/canvas` routes still exist but are no longer in the nav.

## 2026-05-17: Google Sheets for past gigs data
- Reason: Gig history needs to be editable by non-devs. A shared Google Sheet (columns: Venue, Event Name, Date) lets anyone update the list without touching code.
- Rejected: Hardcoded array in page.tsx (requires PR per gig); Supabase (already removed).
- Constraint: Sheets API must be enabled in the same Google Cloud project as Drive API. Env var `GOOGLE_SHEETS_GIGS_ID` must be set. Sheet must be shared with the service account. Rows are read from `Sheet1!A2:C` (row 1 is the header).

## 2026-05-17: MixesPlayer glass card removed
- Reason: The frosted glass panel (backdrop-blur, border-radius, border) on the tracklist made Mixes feel like a UI widget while Canvas and Gigs felt editorial. Removing it makes all three tabs visually consistent — raw text against the video overlay.
- Rejected: Keeping the card; giving Canvas/Gigs a matching glass treatment.
- Constraint: Track names now have no background container. Legibility depends on the `rgba(0,0,0,0.7)` video overlay remaining in place.

---
*Add an entry whenever a non-obvious decision is made.*
*Format: date, what, why, what was rejected, ongoing constraint.*
