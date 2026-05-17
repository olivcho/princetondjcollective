'use client';
import { useState } from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.6rem 0.75rem',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.55)',
  marginBottom: '0.35rem',
};

export default function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xnjrqnwe', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.currentTarget),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', letterSpacing: '0.02em' }}>
        Got it — we&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input name="name" required placeholder="Your name" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" required placeholder="your@email.com" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Event type</label>
          <select name="event_type" required style={{ ...inputStyle, appearance: 'none' }}>
            <option value="">Select…</option>
            <option>Princeton campus event</option>
            <option>Off-campus event</option>
            <option>Private party</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input name="date" type="date" required style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Details</label>
        <textarea
          name="details"
          rows={4}
          placeholder="Venue, expected attendance, vibe, any other details…"
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: 'rgba(255,90,90,0.9)', fontSize: '0.8rem' }}>
          Something went wrong — try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          alignSelf: 'flex-end',
          padding: '0.55rem 1.5rem',
          background: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.6 : 1,
        }}
      >
        {status === 'loading' ? '…' : 'Send'}
      </button>
    </form>
  );
}
