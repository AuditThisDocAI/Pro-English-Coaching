import { useState, useEffect, useCallback } from 'react';
import { tts } from './tts';

export function useTTS() {
  const [speakingText, setSpeakingText] = useState<string | null>(tts.speakingText);
  const [speed, setSpeedState] = useState<number>(tts.getSpeed());

  useEffect(() => {
    const unsubscribe = tts.subscribe(() => {
      setSpeakingText(tts.speakingText);
      setSpeedState(tts.getSpeed());
    });
    return unsubscribe;
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    tts.setSpeed(newSpeed);
  }, []);

  const speak = useCallback((text: string, options?: { rate?: number; pitch?: number; lang?: string; gender?: 'female' | 'male'; voiceName?: string; forceAudioFallback?: boolean; onStart?: () => void; onEnd?: () => void; onError?: (err: any) => void }) => {
    tts.speak(text, options);
  }, []);

  const stop = useCallback(() => {
    tts.stop();
  }, []);

  const isSpeaking = useCallback((text?: string) => {
    return tts.isSpeaking(text);
  }, [speakingText]);

  return {
    speak,
    stop,
    isSpeaking,
    speakingText,
    speed,
    setSpeed,
    isSupported: tts.isSupported(),
  };
}
