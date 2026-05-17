import { listDriveFiles } from '@/app/utils/googleDrive';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const files = await listDriveFiles(process.env.GOOGLE_DRIVE_MIXES_FOLDER_ID!);
    const tracks = files
      .filter(f => /^audio\//i.test(f.mimeType ?? '') || /\.mp3$/i.test(f.name ?? ''))
      .map(file => ({
        id: file.id!,
        track_name: file.name!.replace(/\.[^.]+$/, ''),
        track_url: `/api/media/${file.id}`,
      }));
    return NextResponse.json({ tracks });
  } catch (err) {
    console.error('Error fetching mixes:', err);
    return NextResponse.json({ error: 'Failed to fetch mixes' }, { status: 500 });
  }
}
