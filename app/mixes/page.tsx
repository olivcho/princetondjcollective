import MixesPlayer from "./MixesPlayer";
import BackLink from "../components/BackLink";

const mixes = [
  { id: '1', track_name: 'Alchemy',             track_url: '' },
  { id: '2', track_name: 'Corleone',            track_url: '' },
  { id: '3', track_name: 'Against The Machine', track_url: '' },
  { id: '4', track_name: 'Shake It Off',        track_url: '' },
  { id: '5', track_name: 'Sunset',              track_url: '' },
  { id: '6', track_name: 'Still Want Me',       track_url: '' },
  { id: '7', track_name: 'Jazz Club',           track_url: '' },
  { id: '8', track_name: 'Config',              track_url: '' },
  { id: '9', track_name: 'Hands Up',            track_url: '' },
];

export default async function Mixes() {
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
      <div style={{ position: 'relative', zIndex: 2 }} className="flex min-h-screen items-center justify-center py-24 px-6">
        <div className="flex flex-col items-center justify-center gap-10 md:gap-12 w-full">
          <p className="text-xl md:text-2xl font-bold">Mixes</p>

          <MixesPlayer mixes={mixes} />

          <BackLink />
        </div>
      </div>
    </div>
  );
}
