# Princeton DJ Collective — Change Log

## Summary of All Changes Made

---

### Homepage (`app/page.tsx`)

- **Video background**: `vid1.mp4` (from UploadThing) plays fullscreen, auto-looping and muted, as the sticky base layer
- **Scroll reveal**: The video is `position: sticky` so it stays pinned as you scroll. The canvas grid slides up over it as you scroll down
- **Canvas grid**: Fetches all photos/videos from UploadThing and renders them as a 3-column masonry grid in the second scroll section with a `rgba(0,0,0,0.75)` dark tint overlay
- **Fixed text**: "We're dedicated to cultivating a vibrant music culture..." paragraph is `position: fixed` and stays centered on screen the entire time you're on the homepage — it does not re-appear or move as you scroll
- **Marquee**: Team names scroll along the bottom of both the video section and the canvas section using `react-fast-marquee`

---

### Logo (`public/logo.png`)

- Original `logo.jpg` had a black background — converted to `logo.png` with black pixels made fully transparent using Python/Pillow
- Logo now renders cleanly on any background with no black rectangle
- Clicking the logo from any page navigates back to the homepage

---

### Header (`app/components/header.tsx`)

- Switched logo source from `logo.jpg` → `logo.png`
- Removed "Home" nav tab — logo click serves as the home link
- Header moved to the root layout so it appears on every page automatically

---

### Layout (`app/layout.tsx`)

- Added `<Header />` globally — renders on all pages (Canvas, Education, Mixes, Booking, Homepage)
- Added `<BackgroundAudio />` for site-wide ambient music
- Wrapped everything in `<TransitionProvider>` so nav links work correctly from the global header

---

### Page Transitions (`app/components/PageTransition.tsx`)

- Split into `TransitionProvider` (context only) and `PageTransition` (animated div)
- `TransitionProvider` wraps the entire layout including the header, so `TransitionLink` components in the nav have access to the transition context
- Previously, nav links were broken because the header was outside the context provider — this fixes all nav tabs being unclickable

---

### Background Audio (`app/components/BackgroundAudio.tsx`)

- New component that plays `Demo 2.m4a` as ambient background music
- Audio starts on the first user interaction (click or scroll) to comply with browser autoplay policies
- Music persists across page navigations and continues when switching browser tabs
- **"Keep listening?" popup**: 10 seconds after music starts, a frosted-glass popup appears in the bottom-right corner
  - **Yes** (orange button): dismisses the popup, music continues
  - **No** (outline button): stops and resets the music
  - Appears on every page since it lives in the global layout

---

### Canvas Page (`app/canvas/page.tsx`)

- Displays all UploadThing files as a masonry column grid (`columns-2 md:columns-3 lg:columns-4`)
- Each image preserves its original aspect ratio (no forced cropping)
- Videos auto-play, muted, looping
- Back link fixed to center-bottom of screen

---

### Education Page (`app/education/page.tsx`)

- Added `princetondjvid.mp4` as a fullscreen looping background video
- Dark `rgba(0,0,0,0.7)` overlay keeps text readable over the video

---

### Booking Page (`app/booking/page.tsx`)

- Added `princetondjvid.mp4` as a fullscreen looping background video
- Dark `rgba(0,0,0,0.7)` overlay keeps text readable over the video

---

### Mixes Page (`app/mixes/page.tsx` + `app/mixes/MixesPlayer.tsx`)

- Added `princetondjvid.mp4` as a fullscreen looping background video with dark overlay
- Added a translucent frosted-glass rectangle (`rgba(0,0,0,0.45)` + `backdrop-filter: blur`) that wraps only the mix names list — not the vinyl record image
- Increased gap between the mix names and vinyl record to restore original spacing
- Mix list: Alchemy, Corleone, Against The Machine, Shake It Off, Sunset, Still Want Me, Jazz Club, Config, Hands Up

---

### File API (`app/api/files/route.ts`)

- Added `CUSTOM_ORDER` array — files are sorted into a specific display order on both Canvas and Homepage
- Added `EXCLUDED` array — files listed here are hidden from the site without deleting them
- **13.jpeg permanently deleted** from UploadThing
- Current display order: `7.jpeg → 8.jpeg → vid1.mp4 → 14.jpeg → 12.jpg → vid2.mp4 → 10.jpeg → 2.jpeg → 4.jpeg → 9.jpeg → 6.jpeg → 11.jpeg → 5.jpeg → 1.jpeg → 3.jpeg`
- To reorder photos: edit the `CUSTOM_ORDER` array in `app/api/files/route.ts`
- To hide a photo without deleting: add its filename to the `EXCLUDED` array

---

### Environment Variables (`.env.local`)

- `UPLOADTHING_TOKEN` — API token for fetching/deleting files from UploadThing
- Must be present for the Canvas page and homepage background to load photos

---

### How to Make Future Changes

1. Edit files locally in `~/Downloads/princetondjcollective`
2. Run the local dev server: `npm run dev` → preview at `http://localhost:3000`
3. When ready to go live, open Terminal and run:
   ```
   cd ~/Downloads/princetondjcollective
   git add .
   git commit -m "describe your changes"
   git push origin main
   ```
4. Vercel automatically detects the push and deploys to production within ~15 seconds

---

### How to Add/Remove/Reorder Canvas Photos

- **Add photos**: Upload via the UploadThing dashboard
- **Remove a photo**: Add its filename to `EXCLUDED` in `app/api/files/route.ts` (hides it), or delete via the UploadThing dashboard (permanent)
- **Reorder photos**: Edit the `CUSTOM_ORDER` array in `app/api/files/route.ts` — files listed first appear first
