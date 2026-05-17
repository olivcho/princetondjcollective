export const revalidate = 3600;

import BackLink from '../components/BackLink';
import { listDriveFiles } from '../utils/googleDrive';
import { getGigs } from '../utils/googleSheets';
import ArchiveTabs from './ArchiveTabs';

export default async function Archive() {
  const [mixFiles, canvasFiles, gigs] = await Promise.all([
    listDriveFiles(process.env.GOOGLE_DRIVE_MIXES_FOLDER_ID!).catch(() => []),
    listDriveFiles(process.env.GOOGLE_DRIVE_CANVAS_FOLDER_ID!).catch(() => []),
    getGigs().catch(() => []),
  ]);

  const mixes = mixFiles
    .filter(f => /^audio\//i.test(f.mimeType ?? '') || /\.mp3$/i.test(f.name ?? ''))
    .map(file => ({
      id: file.id!,
      track_name: file.name!.replace(/\.[^.]+$/, ''),
      track_url: `/api/media/${file.id}`,
    }));

  const files = canvasFiles.map(file => ({
    key: file.id!,
    name: file.name!,
    url: `/api/media/${file.id}`,
    isVideo: /^video\//i.test(file.mimeType ?? ''),
  }));

  return (
    <div style={{ position: 'relative', height: '100dvh', background: '#000', overflow: 'hidden' }}>

      {/* Video background */}
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', overflow: 'hidden' }} className="flex flex-col items-center pt-28 pb-6 gap-4 md:gap-8">
        <p className="text-xl md:text-2xl font-bold">Archive</p>
        <ArchiveTabs mixes={mixes} files={files} gigs={gigs} />
        <BackLink />
      </div>
    </div>
  );
}
