'use client';

import type { TeamMember } from '../utils/googleSheets';

export default function TeamList({ members }: { members: TeamMember[] }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <div className="flex flex-col">
        {members.map((m, i) => (
          <div
            key={m.name}
            className="opacity-0 py-3 border-b border-white/[0.06] transition-opacity duration-200 hover:text-white"
            style={{
              animation: `fadeIn 0.4s ease-out ${i * 40}ms forwards`,
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(17px, 2.5vw, 22px)',
              fontStyle: 'italic',
            }}
          >
            {m.name}
          </div>
        ))}
      </div>
    </div>
  );
}
