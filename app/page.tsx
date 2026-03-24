'use client';

import { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";

interface MediaFile {
  key: string;
  name: string;
  url: string;
  isVideo: boolean;
}

export default function Home() {
  const [files, setFiles] = useState<MediaFile[]>([]);

  useEffect(() => {
    fetch('/api/files')
      .then(r => r.json())
      .then(data => { if (data.files?.length) setFiles(data.files); })
      .catch(() => {});
  }, []);

  const team = [
    "Abhi Bansal", "Rohan Pahwa", "Steven Goetz", "Sebastian Merkatz",
    "Katie Lee", "Oliver Cho", "Vinayak Menon", "Mateo Hoyos",
    "Asher Matthias", "Tom Dubnov",
  ];
  const teamNames = team.map(n => `${n}  ·  `).join('');

  return (
    <div style={{ background: '#000' }}>

      {/* Fixed text — stays centered on screen while scrolling */}
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, pointerEvents: 'none', width: '100%', padding: '0 2rem' }}>
        <p className="text-base md:text-lg max-w-2xl mx-auto text-center text-white/80 leading-relaxed">
          We&apos;re dedicated to cultivating a vibrant music culture on campus. We offer a free beginner-friendly education program teaching DJ fundamentals, connect club members to our exclusive campus-wide gig network, and foster a supportive community of music lovers and creators. Our mission is to democratize access to DJ culture and empower student DJs to bring the campus to life, one beat at a time.
        </p>
      </div>

      {/* ── Section 1: Video (sticky, stays behind as canvas scrolls over) ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="https://utfs.io/f/jwgGLpqDRY3nKJrd4S2MoS684RynjEFslZgdvDmQO9te3ihp" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)', zIndex: 1 }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="pb-8" style={{ marginTop: 'auto' }}>
            <div className="border-t border-white/15 pt-5">
              <Marquee autoFill speed={18} className="text-white/45 text-xs font-semibold tracking-widest uppercase">
                <span className="pr-10">{teamNames}</span>
              </Marquee>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Canvas slides over the video ── */}
      {files.length > 0 && (
        <div style={{ position: 'relative', zIndex: 1, background: '#000' }}>

          {/* Canvas photos */}
          <div style={{ columns: '3', columnGap: '3px', padding: '3px' }}>
            {files.map((file) => (
              <div key={file.key} style={{ breakInside: 'avoid', marginBottom: '3px' }}>
                {file.isVideo ? (
                  <video src={file.url} autoPlay muted loop playsInline
                    style={{ width: '100%', height: 'auto', display: 'block' }} />
                ) : (
                  <img src={file.url} alt={file.name}
                    style={{ width: '100%', height: 'auto', display: 'block' }} />
                )}
              </div>
            ))}
          </div>

          {/* Dark overlay on canvas */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', pointerEvents: 'none', zIndex: 1 }} />

          {/* Marquee pinned to bottom of canvas section */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, paddingBottom: '2rem', pointerEvents: 'none' }}>
            <div className="border-t border-white/15 pt-5">
              <Marquee autoFill speed={18} className="text-white/45 text-xs font-semibold tracking-widest uppercase">
                <span className="pr-10">{teamNames}</span>
              </Marquee>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
