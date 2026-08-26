import { useState, useEffect, useCallback } from 'react';
import { tts } from './tts';

export function useTTS() {
  const [speakingText, setSpeakingText] = useState<string | null>(tts.speakingText);

  useEffect(() => {
    const unsubscribe = tts.subscribe(() => {
      setSpeakingText(tts.speakingText);
    });
    return unsubscribe;
  }, []);

  const speak = useCallback((text: string, options?: { rate?: number; pitch?: number; lang?: string }) => {
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
    isSupported: tts.isSupported(),
  };
}
