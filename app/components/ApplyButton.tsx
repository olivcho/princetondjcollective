const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScisxzTSIhVhTN1Wq1J0GMX6f8JcVn8iKp-CjbPpkRNUrwJcQ/viewform';

export default function ApplyButton() {
  return (
    <div
      style={{
        pointerEvents: 'auto',
        marginTop: 0,
        maxWidth: '350px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <p
        style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)',
          marginBottom: '0.6rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Stay connected
      </p>
      <a
        href={APPLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.55rem 1.35rem',
          background: '#fff',
          color: '#000',
          borderRadius: '4px',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textDecoration: 'none',
        }}
      >
        Apply
      </a>
    </div>
  );
}
