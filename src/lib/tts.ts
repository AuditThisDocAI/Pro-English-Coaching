// High-Performance Mobile-Ready Text-to-Speech (TTS) Engine
// Fully compatible with iOS Safari, Chrome on Android, iPadOS, and Desktop browsers.

class TTSEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<() => void> = new Set();
  public speakingText: string | null = null;
  private keepAliveTimer: any = null;
  private voicesLoaded: boolean = false;
  private isUnlocked = false;

  constructor() {
    try {
      if (typeof window !== 'undefined') {
        if ('speechSynthesis' in window) {
          this.synth = window.speechSynthesis;
          this.initVoices();
          
          // Setup global interaction listeners to unlock speech on iOS
          const unlock = () => {
            if (this.isUnlocked || !this.synth) return;
            const emptyUtterance = new SpeechSynthesisUtterance('');
            emptyUtterance.volume = 0;
            this.synth.speak(emptyUtterance);
            this.isUnlocked = true;
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('click', unlock);
          };
          
          window.addEventListener('touchstart', unlock, { once: true, passive: true });
          window.addEventListener('click', unlock, { once: true, passive: true });
        }
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
    return Boolean(this.synth);
  }

  public isSpeaking(text?: string): boolean {
    try {
      if (text) {
        return this.speakingText === text && Boolean(this.synth?.speaking);
      }
      return Boolean(this.synth?.speaking);
    } catch (_) {
      return false;
    }
  }

  public stop(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    try {
      if (this.synth) {
        this.synth.cancel();
      }
    } catch (_) {}

    this.speakingText = null;
    this.currentUtterance = null;
    (window as any).__activeUtteranceRef = null;
    this.notify();
  }

  public speak(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      lang?: string;
      gender?: 'female' | 'male';
      voiceName?: string;
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

    if (!this.synth || !('SpeechSynthesisUtterance' in window)) {
      return;
    }

    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
    } catch (_) {}

    try {
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      const isFemale = options.gender === 'female' || (!options.gender && !options.voiceName);
      
      utterance.rate = options.rate ?? 0.93;
      utterance.pitch = options.pitch ?? (options.gender === 'female' ? 1.08 : (options.gender === 'male' ? 0.94 : 1.0));
      utterance.lang = options.lang ?? 'en-US';

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
          // Find best English female voice
          selectedVoice = voices.find(v => {
            const name = v.name.toLowerCase();
            const isEnglish = v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB');
            const hasFemaleName = femaleKeywords.some(k => name.includes(k));
            const hasMaleName = maleKeywords.some(k => name.includes(k));
            return isEnglish && hasFemaleName && !hasMaleName;
          });

          // Fallback to any English voice that is not explicitly male
          if (!selectedVoice) {
            selectedVoice = voices.find(v => {
              const name = v.name.toLowerCase();
              return (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')) &&
                !maleKeywords.some(k => name.includes(k));
            });
          }
        } else if (!selectedVoice && options.gender === 'male') {
          selectedVoice = voices.find(v => {
            const name = v.name.toLowerCase();
            const isEnglish = v.lang.startsWith('en');
            return isEnglish && maleKeywords.some(k => name.includes(k));
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
                v.name.includes('Karen') ||
                v.name.includes('English'))
          ) || voices.find((v) => v.lang.startsWith('en'));
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      this.speakingText = text;
      this.currentUtterance = utterance;
      (window as any).__activeUtteranceRef = utterance;

      utterance.onstart = () => {
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
        console.warn('SpeechSynthesis error:', event);
        this.speakingText = null;
        this.currentUtterance = null;
        this.notify();
        options.onError?.(event);
      };

      this.synth.speak(utterance);
      this.notify();
    } catch (err) {
      console.warn('Exception during SpeechSynthesis:', err);
      this.speakingText = null;
      this.currentUtterance = null;
      this.notify();
    }
  }
}

export const tts = new TTSEngine();
