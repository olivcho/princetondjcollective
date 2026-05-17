'use client';
import { useState } from 'react';

export default function MailingListForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ pointerEvents: 'auto', marginTop: 0, maxWidth: '350px', margin: '0 auto', width: '100%' }}
    >
      <p style={{
        color: 'rgba(255,255,255,0.65)',
        fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)',
        marginBottom: '0.6rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        Stay connected
      </p>

      {status === 'success' ? (
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', letterSpacing: '0.02em' }}>
          You&apos;re on the list.
        </p>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', margin: '0 auto' }}>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '0.85rem',
              outline: 'none',
              minWidth: 0,
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '0.5rem 1.1rem',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.6 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? '…' : 'Join'}
          </button>
        </div>
      )}

      {status === 'error' && (
        <p style={{ color: 'rgba(255,90,90,0.9)', fontSize: '0.78rem', marginTop: '0.45rem' }}>
          Something went wrong — try again.
        </p>
      )}
    </form>
  );
}
