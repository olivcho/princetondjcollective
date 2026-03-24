'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    function startAudio() {
      if (hasPlayedRef.current || !audioRef.current) return;
      hasPlayedRef.current = true;
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
      window.removeEventListener('click', startAudio);
      window.removeEventListener('scroll', startAudio);
    }
    window.addEventListener('click', startAudio);
    window.addEventListener('scroll', startAudio);
    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('scroll', startAudio);
    };
  }, []);

  return <audio ref={audioRef} src="/Demo 2.m4a" loop preload="auto" />;
}
