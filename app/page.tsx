import MailingListForm from './components/MailingListForm';

export default function Home() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', overflow: 'hidden' }}>

      {/* Video background */}
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.68)', zIndex: 1 }} />

      {/* Watermark + main content share same container so watermark stays behind text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '8vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        {/* Watermark — absolutely positioned behind text in same container */}
        {/* <span
          className="opacity-0"
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(70px, 15vw, 210px)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.11)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            zIndex: 0,
            animation: 'fadeIn 1s ease-out 0.3s forwards',
          }}
        >
          COLLECTIVE
        </span> */}

        {/* Text content — on top of watermark */}
        <div style={{ position: 'relative', zIndex: 1, padding: '0 1.5rem' }}>
          <h1
            className="opacity-0"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              maxWidth: '850px',
              animation: 'fadeIn 0.5s ease-out 0.3s forwards',
            }}
          >
            The Princeton DJ Collective
          </h1>
          <p
            className="opacity-0"
            style={{
              fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
              color: 'rgba(255,255,255,1)',
              maxWidth: '460px',
              margin: '0 auto',
              lineHeight: 1.9,
              letterSpacing: '0.02em',
              animation: 'fadeIn 0.5s ease-out 0.6s forwards',
            }}
          >
            We offer a free beginner-friendly education program, connect club members to our campus-wide gig network, and foster a supportive community of music lovers and creators.
          </p>

          <div className="opacity-0" style={{ marginTop: '1.75rem', animation: 'fadeIn 0.5s ease-out 0.9s forwards' }}><MailingListForm /></div>
        </div>
      </div>

    </div>
  );
}
