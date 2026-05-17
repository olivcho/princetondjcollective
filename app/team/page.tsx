export const revalidate = 3600;

import BackLink from '../components/BackLink';
import { getTeam } from '../utils/googleSheets';
import TeamList from './TeamList';

export default async function Team() {
  const members = await getTeam().catch(() => []);

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
      <div style={{ position: 'relative', zIndex: 2 }} className="flex flex-col items-center pt-28 pb-24 gap-12 px-6">
        <p className="text-xl md:text-2xl font-bold">Team</p>
        <TeamList members={members} />
        <BackLink />
      </div>
    </div>
  );
}
