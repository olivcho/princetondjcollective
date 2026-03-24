import BackLink from "../components/BackLink";

export default function Booking() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2 }} className="flex min-h-screen items-center justify-center py-24 px-6">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-3xl text-center">
          <p className="text-xl md:text-2xl font-bold">Booking</p>
          <div className="flex flex-col items-center gap-5 text-sm md:text-lg font-bold">
            <p>Need a DJ? We&apos;re an email away.</p>
            <p>Ping us with event details at <a href="mailto:ab4386@princeton.edu" className="text-[var(--princeton-orange)] underline">ab4386@princeton.edu</a>.</p>
          </div>
          <BackLink />
        </div>
      </div>
    </div>
  );
}
