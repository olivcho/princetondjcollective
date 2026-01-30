'use client';

import { useEffect, useState } from 'react';

interface MediaFile {
  key: string;
  name: string;
  url: string;
  isVideo: boolean;
}

export default function CanvasPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch('/api/files');
        const data = await response.json();
        if (data.files) {
          setFiles(data.files);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Grid collage - 100% opacity */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
        {files.map((file, index) => (
          <div 
            key={file.key} 
            className="relative aspect-square overflow-hidden"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {file.isVideo ? (
              <video
                src={file.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
