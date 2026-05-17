# DECISIONS.md

## 2026-05-17: Migrating from UploadThing to Google Drive API for all media
- Reason: Non-admin club members need to add photos and mixes without touching code or UploadThing's dashboard. A shared Google Drive folder lets anyone with access drop files in and they appear on the site automatically.
- Rejected: UploadThing (requires admin dashboard access to upload); Supabase Storage (same problem); hardcoded file lists (requires code change per file); UploadThing→Drive sync (files stored in two places, manual sync step).
- Constraint: Requires a Google Cloud project with Drive API enabled and a service account. Env vars `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_DRIVE_MIXES_FOLDER_ID`, `GOOGLE_DRIVE_CANVAS_FOLDER_ID` must be set in `.env.local` and in Vercel environment settings. Audio seeking on mixes may be limited (Drive doesn't support HTTP range requests the same way a CDN does — acceptable for 10MB tracks).

## 2026-05-17: Video background pattern for all inner pages
- Reason: All pages (booking, education, mixes) use a full-bleed `<video>` with a dark rgba overlay and `position: absolute / zIndex` layering. This gives visual consistency across the site.
- Rejected: Per-page background images or solid colors.
- Constraint: New pages must follow the `video → overlay div → content div (zIndex: 2)` stack pattern, or the text will render behind the video.

## 2026-05-17: Supabase provisioned but unused
- Reason: `app/utils/supabase.ts` creates a Supabase client, but no queries use it yet. It was likely added in anticipation of storing bookings, mixes metadata, or member data.
- Rejected: n/a
- Constraint: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be set in `.env.local` even if Supabase is not actively used, or the build will throw at runtime.

---
*Add an entry whenever a non-obvious decision is made.*
*Format: date, what, why, what was rejected, ongoing constraint.*
