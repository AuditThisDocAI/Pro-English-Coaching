// High-Performance Mobile-Ready Text-to-Speech (TTS) Engine
// Fully compatible with iOS Safari, Chrome on Android, iPadOS, and Desktop browsers.

class TTSEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private listeners: Set<() => void> = new Set();
  public speakingText: string | null = null;
  private keepAliveTimer: any = null;
  private voicesLoaded: boolean = false;

  constructor() {
    try {
      if (typeof window !== 'undefined') {
        if ('speechSynthesis' in window) {
          this.synth = window.speechSynthesis;
          this.initVoices();
        }

        // Keep a global reference to prevent WebKit / Mobile Safari garbage collection
        (window as any).__activeUtteranceRef = null;
      }
    } catch (e) {
      console.warn('SpeechSynthesis initialization bypassed:', e);
    }
  }

  private initVoices() {
    if (!this.synth) return;
    try {
      const voices = this.synth.getVoices();
      if (voices && voices.length > 0) {
        this.voicesLoaded = true;
      }

      if ('onvoiceschanged' in this.synth) {
        this.synth.onvoiceschanged = () => {
          try {
            this.synth?.getVoices();
            this.voicesLoaded = true;
            this.notify();
          } catch (_) {}
        };
      }
    } catch (_) {}
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (_) {}
    });
  }

  public getVoices(): SpeechSynthesisVoice[] {
    try {
      if (!this.synth) return [];
      return this.synth.getVoices() || [];
    } catch (_) {
      return [];
    }
  }

  public isSupported(): boolean {
    return Boolean(this.synth || (typeof window !== 'undefined' && 'Audio' in window));
  }

  public isSpeaking(text?: string): boolean {
    try {
      if (text) {
        return this.speakingText === text && (Boolean(this.synth?.speaking) || Boolean(this.currentAudio && !this.currentAudio.paused));
      }
      return Boolean(this.synth?.speaking) || Boolean(this.currentAudio && !this.currentAudio.paused);
    } catch (_) {
      return false;
    }
  }

  public stop(): void {
    // Clear any iOS keepalive timer
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }

    // Stop Web Speech API
    try {
      if (this.synth) {
        this.synth.cancel();
      }
    } catch (_) {}

    // Stop HTML Audio fallback if playing
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
      }
    } catch (_) {}

    this.speakingText = null;
    this.currentUtterance = null;
    (window as any).__activeUtteranceRef = null;
    this.notify();
  }

  // Audio Fallback for mobile browsers when SpeechSynthesis is restricted
  private speakViaAudioFallback(text: string, options: { rate?: number; onEnd?: () => void; onError?: (err: any) => void }) {
    try {
      this.stop();
      this.speakingText = text;
      this.notify();

      // Encode clean text
      const cleanText = text.replace(/[*_#`~]/g, '').replace(/\s+/g, ' ').trim();
      const encoded = encodeURIComponent(cleanText.slice(0, 200)); // URL limit protection
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encoded}`;

      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      audio.playbackRate = options.rate ?? 0.95;

      audio.onended = () => {
        this.speakingText = null;
        this.currentAudio = null;
        this.notify();
        options.onEnd?.();
      };

      audio.onerror = (e) => {
        this.speakingText = null;
        this.currentAudio = null;
        this.notify();
        options.onError?.(e);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio fallback autoplay failed:', err);
          this.speakingText = null;
          this.currentAudio = null;
          this.notify();
        });
      }
    } catch (err) {
      this.speakingText = null;
      this.currentAudio = null;
      this.notify();
    }
  }

  public speak(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      lang?: string;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ): void {
    // If currently speaking this exact text, toggle off
    if (this.isSpeaking(text)) {
      this.stop();
      return;
    }

    // Always stop previous utterances
    this.stop();

    const cleanedText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanedText) return;

    // Check if Web Speech Synthesis is available
    if (!this.synth || !('SpeechSynthesisUtterance' in window)) {
      this.speakViaAudioFallback(cleanedText, options);
      return;
    }

    try {
      // 1. Mobile Safari resume unblock: iOS often pauses synthesis silently
      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (_) {}

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = options.rate ?? 0.92; // Slightly paced for workplace pronunciation
      utterance.pitch = options.pitch ?? 1.0;
      utterance.lang = options.lang ?? 'en-US';

      // 2. Select optimal voice
      const voices = this.getVoices();
      if (voices.length > 0) {
        const preferredVoice =
          voices.find(
            (v) =>
              (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en_')) &&
              (v.name.includes('Google') ||
                v.name.includes('Natural') ||
                v.name.includes('Samantha') ||
                v.name.includes('Siri') ||
                v.name.includes('Daniel') ||
                v.name.includes('Karen') ||
                v.name.includes('English'))
          ) || voices.find((v) => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      this.speakingText = text;
      this.currentUtterance = utterance;
      // 3. Anchor to window to prevent iOS WebKit garbage collection bug
      (window as any).__activeUtteranceRef = utterance;

      utterance.onstart = () => {
        this.notify();
        options.onStart?.();

        // 4. iOS Safari Keep-Alive hack: resume every 10 seconds to prevent pause timeout
        if (this.keepAliveTimer) clearInterval(this.keepAliveTimer);
        this.keepAliveTimer = setInterval(() => {
          if (this.synth?.speaking && this.synth.paused) {
            this.synth.resume();
          }
        }, 3000);
      };

      utterance.onend = () => {
        if (this.keepAliveTimer) {
          clearInterval(this.keepAliveTimer);
          this.keepAliveTimer = null;
        }
        if (this.currentUtterance === utterance) {
          this.speakingText = null;
          this.currentUtterance = null;
          (window as any).__activeUtteranceRef = null;
        }
        this.notify();
        options.onEnd?.();
      };

      utterance.onerror = (event) => {
        if (this.keepAliveTimer) {
          clearInterval(this.keepAliveTimer);
          this.keepAliveTimer = null;
        }
        // If Web Speech fails on mobile (e.g. not-allowed or canceled), fallback to audio
        console.warn('SpeechSynthesis error, triggering mobile audio fallback:', event);
        this.speakViaAudioFallback(cleanedText, options);
      };

      // 5. Fire speech immediately within synchronous touch event
      this.synth.speak(utterance);
      this.notify();

      // Mobile Safari edge case: if not speaking after 250ms, resume
      setTimeout(() => {
        if (this.synth && this.synth.speaking && this.synth.paused) {
          this.synth.resume();
        }
      }, 250);
    } catch (err) {
      console.warn('Exception during SpeechSynthesis, using audio fallback:', err);
      this.speakViaAudioFallback(cleanedText, options);
    }
  }
}

export const tts = new TTSEngine();
