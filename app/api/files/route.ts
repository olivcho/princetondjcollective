import { listDriveFiles } from '@/app/utils/googleDrive';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const files = await listDriveFiles(process.env.GOOGLE_DRIVE_CANVAS_FOLDER_ID!);
    const mediaFiles = files.map(file => ({
      key: file.id!,
      name: file.name!,
      url: `/api/media/${file.id}`,
      isVideo: /^video\//i.test(file.mimeType ?? ''),
    }));
    return NextResponse.json({ files: mediaFiles });
  } catch (err) {
    console.error('Error fetching canvas files:', err);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}
