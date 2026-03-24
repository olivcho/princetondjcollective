'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    function startAudio() {
      if (hasPlayedRef.current || !audioRef.current) return;
      hasPlayedRef.current = true;
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
      window.removeEventListener('click', startAudio);
      window.removeEventListener('scroll', startAudio);

      timerRef.current = setTimeout(() => {
        setShowPrompt(true);
      }, 10000);
    }

    window.addEventListener('click', startAudio);
    window.addEventListener('scroll', startAudio);
    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('scroll', startAudio);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleYes() {
    setShowPrompt(false);
  }

  function handleNo() {
    setShowPrompt(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/Demo 2.m4a" loop preload="auto" />

      {showPrompt && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: 'rgba(20,20,20,0.92)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '14px',
          padding: '16px 20px',
          color: '#fff',
          fontFamily: 'inherit',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          minWidth: '200px',
        }}>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 500 }}>
            Keep listening?
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleYes}
              style={{
                flex: 1,
                padding: '7px 0',
                borderRadius: '8px',
                border: 'none',
                background: '#E8581A',
                color: '#fff',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Yes
            </button>
            <button
              onClick={handleNo}
              style={{
                flex: 1,
                padding: '7px 0',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}
