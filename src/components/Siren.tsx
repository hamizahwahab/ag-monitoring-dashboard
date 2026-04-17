'use client';

import { useEffect, useRef } from 'react';

export default function Siren() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playSiren = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.5);
      oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 1);
      oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 1.5);
      oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 2);
      oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 2.5);
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2.5);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 3);
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