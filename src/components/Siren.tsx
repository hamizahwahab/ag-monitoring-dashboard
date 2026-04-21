'use client';

import { useEffect, useRef } from 'react';

export default function Siren() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSiren = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/siren.mp3');
      }
      
      // Reset to beginning if already playing
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } catch (err) {
      console.log('Audio play failed:', err);
    }
  };

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onNewNotification(() => {
        playSiren();
      });
    }
  }, []);

  return null;
}
