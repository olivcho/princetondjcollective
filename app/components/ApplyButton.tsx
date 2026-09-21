const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScisxzTSIhVhTN1Wq1J0GMX6f8JcVn8iKp-CjbPpkRNUrwJcQ/viewform';

export default function ApplyButton() {
  return (
    <div
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <a
        href={APPLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          lineHeight: 1,
          padding: '0.7rem 1.35rem',
          background: '#fff',
          color: '#000',
          borderRadius: '4px',
          fontSize: '0.85rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Apply
      </a>
    </div>
  );
}
