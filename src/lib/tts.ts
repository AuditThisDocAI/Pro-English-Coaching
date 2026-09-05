// High-Performance Mobile-Ready Text-to-Speech (TTS) Engine
// Fully compatible with iOS Safari, Chrome on Android, iPadOS, in-app WebViews, and Desktop browsers.

const DEFAULT_TTS_SPEED_KEY = 'basic_english_speaker_speed';

const isMobileDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

class TTSEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private fallbackAudio: HTMLAudioElement | null = null;
  private listeners: Set<() => void> = new Set();
  public speakingText: string | null = null;
  private keepAliveTimer: any = null;
  private fallbackTimeoutTimer: any = null;
  private isUnlocked = false;
  public speed: number = 1.0;

  constructor() {
    try {
      if (typeof window !== 'undefined') {
        const savedSpeed = localStorage.getItem(DEFAULT_TTS_SPEED_KEY);
        if (savedSpeed) {
          const parsed = parseFloat(savedSpeed);
          if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 2.0) {
            this.speed = parsed;
          }
        }

        if ('speechSynthesis' in window) {
          this.synth = window.speechSynthesis;
          this.initVoices();
        }

        // Prepare audio element and safely unlock audio context on mobile interaction
        const unlockAudio = () => {
          if (this.isUnlocked) return;
          this.isUnlocked = true;

          // Prime HTML5 Audio element on mobile touch/click
          try {
            if (!this.fallbackAudio) {
              this.fallbackAudio = new Audio();
            }
          } catch (_) {}

          // Safely resume Web Audio Context if available
          try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
              const ctx = new AudioCtx();
              if (ctx.state === 'suspended') {
                ctx.resume();
              }
            }
          } catch (_) {}

          window.removeEventListener('touchstart', unlockAudio);
          window.removeEventListener('touchend', unlockAudio);
          window.removeEventListener('click', unlockAudio);
        };

        window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
        window.addEventListener('touchend', unlockAudio, { once: true, passive: true });
        window.addEventListener('click', unlockAudio, { once: true, passive: true });

        (window as any).__activeUtteranceRef = null;
      }
    } catch (e) {
      console.warn('Speech engine initialization notice:', e);
    }
  }

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(newSpeed: number): void {
    const clamped = Math.max(0.5, Math.min(2.0, parseFloat(newSpeed.toFixed(2))));
    this.speed = clamped;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(DEFAULT_TTS_SPEED_KEY, clamped.toString());
      }
    } catch (_) {}
    if (this.fallbackAudio) {
      this.fallbackAudio.playbackRate = clamped;
    }
    this.notify();
  }

  private initVoices() {
    if (!this.synth) return;
    try {
      this.synth.getVoices();
      if ('onvoiceschanged' in this.synth) {
        this.synth.onvoiceschanged = () => {
          try {
            this.synth?.getVoices();
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
    return Boolean(this.synth) || typeof window !== 'undefined';
  }

  public isSpeaking(text?: string): boolean {
    try {
      const isAudioPlaying = Boolean(this.fallbackAudio && !this.fallbackAudio.paused && !this.fallbackAudio.ended);
      const isSynthSpeaking = Boolean(this.synth?.speaking);
      const isCurrentlyPlaying = isAudioPlaying || isSynthSpeaking;

      if (text) {
        return this.speakingText === text && isCurrentlyPlaying;
      }
      return isCurrentlyPlaying;
    } catch (_) {
      return false;
    }
  }

  public stop(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    if (this.fallbackTimeoutTimer) {
      clearTimeout(this.fallbackTimeoutTimer);
      this.fallbackTimeoutTimer = null;
    }

    // Stop HTML Audio element
    try {
      if (this.fallbackAudio) {
        this.fallbackAudio.pause();
        this.fallbackAudio.currentTime = 0;
      }
    } catch (_) {}

    // Stop SpeechSynthesis safely
    try {
      if (this.synth && (this.synth.speaking || this.synth.pending)) {
        this.synth.cancel();
      }
    } catch (_) {}

    this.speakingText = null;
    this.currentUtterance = null;
    (window as any).__activeUtteranceRef = null;
    this.notify();
  }

  public playAudioFallback(
    text: string,
    options: {
      rate?: number;
      lang?: string;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ): void {
    try {
      if (this.fallbackTimeoutTimer) {
        clearTimeout(this.fallbackTimeoutTimer);
        this.fallbackTimeoutTimer = null;
      }

      const cleanText = text
        .replace(/[*_#`~[\]()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) {
        this.speakingText = null;
        this.notify();
        options.onEnd?.();
        return;
      }

      if (!this.fallbackAudio) {
        this.fallbackAudio = new Audio();
      }

      const audio = this.fallbackAudio;
      audio.pause();

      const playbackRate = options.rate ?? this.speed;
      audio.src = `/api/tts?text=${encodeURIComponent(cleanText)}&lang=${encodeURIComponent(options.lang || 'en')}`;
      audio.playbackRate = playbackRate;

      this.speakingText = text;
      this.notify();

      audio.onplay = () => {
        this.speakingText = text;
        this.notify();
        options.onStart?.();
      };

      audio.onended = () => {
        this.speakingText = null;
        this.notify();
        options.onEnd?.();
      };

      audio.onerror = (e) => {
        console.warn('TTS fallback audio error:', e);
        this.speakingText = null;
        this.notify();
        options.onError?.(e);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play request error:', err);
          this.speakingText = null;
          this.notify();
          options.onError?.(err);
        });
      }
    } catch (e) {
      console.warn('Audio playback fallback exception:', e);
      this.speakingText = null;
      this.notify();
      options.onError?.(e);
    }
  }

  public speak(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      lang?: string;
      gender?: 'female' | 'male';
      voiceName?: string;
      forceAudioFallback?: boolean;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ): void {
    if (this.isSpeaking(text)) {
      this.stop();
      return;
    }

    this.stop();

    const cleanedText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanedText) return;

    const isMobile = isMobileDevice();

    // If audio fallback is forced or speech synthesis is not supported on this browser
    if (options.forceAudioFallback || !this.synth || !('SpeechSynthesisUtterance' in window)) {
      this.playAudioFallback(cleanedText, options);
      return;
    }

    // Try SpeechSynthesis with automatic fallback watchdog for mobile
    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
    } catch (_) {}

    try {
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = options.rate ?? this.speed;
      utterance.pitch = options.pitch ?? (options.gender === 'female' ? 1.05 : (options.gender === 'male' ? 0.94 : 1.0));
      utterance.lang = options.lang ?? 'en-US';

      if (!isMobile) {
        const voices = this.getVoices();
        if (voices.length > 0) {
          const femaleKeywords = [
            'female', 'samantha', 'jenny', 'aria', 'karen', 'victoria', 'zira', 'ava', 
            'susan', 'serena', 'allison', 'zoe', 'kate', 'michelle', 'sonia', 'libby', 
            'clara', 'hazel', 'hedda', 'catherine', 'helena', 'elena', 'emma', 'sophia',
            'google us english', 'natural (female)', 'online (natural)'
          ];
          const maleKeywords = [
            'male', 'daniel', 'david', 'george', 'mark', 'alex', 'fred', 'guy', 'ryan', 
            'tom', 'oliver', 'james', 'bruce', 'ralph', 'albert'
          ];

          let selectedVoice: SpeechSynthesisVoice | undefined;

          if (options.voiceName) {
            selectedVoice = voices.find(v => v.name.toLowerCase().includes(options.voiceName!.toLowerCase()));
          }

          if (!selectedVoice && options.gender === 'female') {
            selectedVoice = voices.find(v => {
              const name = v.name.toLowerCase();
              const isEnglish = v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB');
              return isEnglish && femaleKeywords.some(k => name.includes(k)) && !maleKeywords.some(k => name.includes(k));
            });
          } else if (!selectedVoice && options.gender === 'male') {
            selectedVoice = voices.find(v => {
              const name = v.name.toLowerCase();
              return v.lang.startsWith('en') && maleKeywords.some(k => name.includes(k));
            });
          }

          if (!selectedVoice) {
            selectedVoice = voices.find(
              (v) =>
                (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en_')) &&
                (v.name.includes('Google') ||
                  v.name.includes('Natural') ||
                  v.name.includes('Samantha') ||
                  v.name.includes('Siri') ||
                  v.name.includes('English'))
            ) || voices.find((v) => v.lang.startsWith('en'));
          }

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
        }
      } else {
        // On mobile, only use local voices to avoid uninstalled Siri/remote voices failing silently
        const voices = this.getVoices();
        const localVoice = voices.find(v => v.localService && (v.lang === 'en-US' || v.lang.startsWith('en')));
        if (localVoice) {
          utterance.voice = localVoice;
        }
      }

      this.speakingText = text;
      this.currentUtterance = utterance;
      (window as any).__activeUtteranceRef = utterance;
      let hasStarted = false;

      utterance.onstart = () => {
        hasStarted = true;
        if (this.fallbackTimeoutTimer) {
          clearTimeout(this.fallbackTimeoutTimer);
          this.fallbackTimeoutTimer = null;
        }
        this.notify();
        options.onStart?.();

        if (this.keepAliveTimer) clearInterval(this.keepAliveTimer);
        this.keepAliveTimer = setInterval(() => {
          if (this.synth?.speaking && this.synth.paused) {
            this.synth.resume();
          }
        }, 3000);
      };

      utterance.onend = () => {
        hasStarted = true;
        if (this.keepAliveTimer) {
          clearInterval(this.keepAliveTimer);
          this.keepAliveTimer = null;
        }
        if (this.fallbackTimeoutTimer) {
          clearTimeout(this.fallbackTimeoutTimer);
          this.fallbackTimeoutTimer = null;
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
        if (this.fallbackTimeoutTimer) {
          clearTimeout(this.fallbackTimeoutTimer);
          this.fallbackTimeoutTimer = null;
        }
        console.warn('SpeechSynthesis error, falling back to audio:', event);
        this.speakingText = null;
        this.currentUtterance = null;
        this.playAudioFallback(cleanedText, options);
      };

      // Mobile Watchdog: If iOS Safari / mobile browser does not start speaking within 400ms,
      // activate the high-fidelity HTML5 Audio fallback
      this.fallbackTimeoutTimer = setTimeout(() => {
        if (!hasStarted && this.speakingText === text) {
          console.log('SpeechSynthesis timed out on mobile, activating HTML5 Audio fallback');
          try {
            if (this.synth && (this.synth.speaking || this.synth.pending)) {
              this.synth.cancel();
            }
          } catch (_) {}
          this.playAudioFallback(cleanedText, options);
        }
      }, isMobile ? 400 : 900);

      // Safe dispatch
      if (this.synth.speaking || this.synth.pending) {
        setTimeout(() => {
          try {
            this.synth?.speak(utterance);
            this.notify();
          } catch (_) {
            this.playAudioFallback(cleanedText, options);
          }
        }, 50);
      } else {
        this.synth.speak(utterance);
        this.notify();
      }
    } catch (err) {
      console.warn('Exception during SpeechSynthesis, activating audio fallback:', err);
      this.playAudioFallback(cleanedText, options);
    }
  }
}

export const tts = new TTSEngine();
