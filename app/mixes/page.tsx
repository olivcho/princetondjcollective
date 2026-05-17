export const revalidate = 3600;

import MixesPlayer from "./MixesPlayer";
import BackLink from "../components/BackLink";
import { listDriveFiles } from "../utils/googleDrive";

export default async function Mixes() {
  let mixes: { id: string; track_name: string; track_url: string }[] = [];

  try {
    const files = await listDriveFiles(process.env.GOOGLE_DRIVE_MIXES_FOLDER_ID!);
    mixes = files
      .filter(f => /^audio\//i.test(f.mimeType ?? '') || /\.mp3$/i.test(f.name ?? ''))
      .map(file => ({
        id: file.id!,
        track_name: file.name!.replace(/\.[^.]+$/, ''),
        track_url: `/api/media/${file.id}`,
      }));
  } catch (err) {
    console.error('Error fetching mixes:', err);
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>

      {/* Video background */}
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }} className="flex min-h-screen items-center justify-center py-24 px-6">
        <div className="flex flex-col items-center justify-center gap-10 md:gap-12 w-full">
          <p className="text-xl md:text-2xl font-bold">Mixes</p>

          <MixesPlayer mixes={mixes} />

          <BackLink />
        </div>
      </div>
    </div>
  );
}
