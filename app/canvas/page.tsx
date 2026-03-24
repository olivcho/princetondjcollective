'use client';

import { useEffect, useState } from 'react';
import BackLink from '../components/BackLink';

interface MediaFile {
  key: string;
  name: string;
  url: string;
  isVideo: boolean;
}

export default function CanvasPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch('/api/files');
        const data = await response.json();
        if (data.files && data.files.length > 0) {
          setFiles(data.files);
        } else if (data.error) {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching files:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xs tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-4">
        <div className="text-white/50 text-xs tracking-widest uppercase">Canvas unavailable</div>
        <div className="text-white/30 text-xs">Missing API credentials — add UPLOADTHING_TOKEN to .env.local</div>
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <BackLink />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-[3px] p-[3px]">
        {files.map((file) => (
          <div key={file.key} className="break-inside-avoid mb-[3px]">
            {file.isVideo ? (
              <video
                src={file.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
              />
            ) : (
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-auto block"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <BackLink />
      </div>
    </div>
  );
}
