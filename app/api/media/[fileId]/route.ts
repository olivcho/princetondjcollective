import { getDriveAccessToken } from '@/app/utils/googleDrive';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;
  const token = await getDriveAccessToken();

  const rangeHeader = request.headers.get('range');
  const fetchHeaders: HeadersInit = { Authorization: `Bearer ${token}` };
  if (rangeHeader) fetchHeaders['Range'] = rangeHeader;

  const driveRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    { headers: fetchHeaders }
  );

  const resHeaders = new Headers();
  const contentType = driveRes.headers.get('Content-Type');
  if (contentType) resHeaders.set('Content-Type', contentType);
  const contentLength = driveRes.headers.get('Content-Length');
  if (contentLength) resHeaders.set('Content-Length', contentLength);
  const contentRange = driveRes.headers.get('Content-Range');
  if (contentRange) resHeaders.set('Content-Range', contentRange);
  resHeaders.set('Accept-Ranges', 'bytes');
  resHeaders.set('Cache-Control', 'public, max-age=3600');

  return new Response(driveRes.body, {
    status: driveRes.status,
    headers: resHeaders,
  });
}