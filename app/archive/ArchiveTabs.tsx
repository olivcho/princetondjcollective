'use client';

import { useState } from 'react';
import Image from 'next/image';
import MixesPlayer from '../mixes/MixesPlayer';
import type { Gig } from '../utils/googleSheets';

interface Mix {
  id: string;
  track_name: string;
  track_url: string;
}

interface MediaFile {
  key: string;
  name: string;
  url: string;
  isVideo: boolean;
}

interface Props {
  mixes: Mix[];
  files: MediaFile[];
  gigs: Gig[];
}

const TABS = ['Mixes', 'Canvas', 'Past Gigs'] as const;
type Tab = typeof TABS[number];

export default function ArchiveTabs({ mixes, files, gigs }: Props) {
  const [active, setActive] = useState<Tab>('Mixes');

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="flex flex-col items-center gap-4 px-6">
        <div className="flex items-center">
          {TABS.map((tab, i) => (
            <span key={tab} className="flex items-center">
              <button
                onClick={() => setActive(tab)}
                className={`text-sm font-bold tracking-widest uppercase transition-all duration-200 relative pb-1 ${
                  active === tab
                    ? 'text-white'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {tab}
                {active === tab && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: 'var(--princeton-orange)',
                      boxShadow: '0 0 8px rgba(232,119,34,0.6)',
                      animation: 'scaleInX 0.2s ease-out',
                    }}
                  />
                )}
              </button>
              {i < TABS.length - 1 && (
                <span className="text-white/40 mx-4 text-sm select-none">/</span>
              )}
            </span>
          ))}
        </div>
        <div className="w-screen relative left-1/2 -translate-x-1/2 h-px bg-white/[0.08]" />
      </div>

      {/* Tab content */}
      <div key={active} className="animate-fadeIn w-full">
        {active === 'Mixes' && <MixesTab mixes={mixes} />}
        {active === 'Canvas' && <CanvasTab files={files} />}
        {active === 'Past Gigs' && <GigsTab gigs={gigs} />}
      </div>
    </div>
  );
}

function MixesTab({ mixes }: { mixes: Mix[] }) {
  return (
    <div className="flex items-center justify-center py-16 px-6">
      <MixesPlayer mixes={mixes} />
    </div>
  );
}

function CanvasTab({ files }: { files: MediaFile[] }) {
  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 pt-1">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-[3px] p-[3px]">
        {files.map((file, i) => (
          <div
            key={file.key}
            className="break-inside-avoid mb-[3px] opacity-0"
            style={{ animation: `fadeIn 0.4s ease-out ${i * 30}ms forwards` }}
          >
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
              <Image
                src={file.url}
                alt={file.name}
                width={800}
                height={600}
                className="w-full h-auto block"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GigsTab({ gigs }: { gigs: Gig[] }) {
  if (gigs.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-white/30 text-xs tracking-widest uppercase">No gigs yet</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-12 px-6">
      <div className="w-full max-w-2xl">
        {gigs.map((gig, i) => (
          <div
            key={i}
            className="group flex items-baseline justify-between gap-4 py-4 border-b border-white/[0.06] cursor-default transition-all duration-200 hover:pl-3"
            style={{ borderLeft: '2px solid transparent', transition: 'padding 0.2s ease, border-color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.borderLeftColor = 'var(--princeton-orange)')}
            onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}
          >
            {/* Event name + recent badge */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-bold italic truncate" style={{ fontFamily: 'var(--font-playfair)', fontSize: '19px' }}>
                {gig.eventName}
              </span>
            </div>
            {/* Venue + date */}
            <div className="flex items-baseline gap-4 shrink-0 text-sm">
              <span className="text-white/70 hidden sm:block">{gig.venue}</span>
              <span className="text-white/55 text-xs font-bold tracking-widest uppercase tabular-nums">{gig.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
