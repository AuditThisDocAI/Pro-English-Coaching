import { tts } from './tts';

export interface CoachAudioTarget {
  id: string;
  text: string;
  source: 'chat' | 'lesson' | 'roleplay' | 'call' | 'coach' | 'flashcard' | 'translator';
  title?: string;
  options?: {
    rate?: number;
    pitch?: number;
    gender?: 'female' | 'male';
    voiceName?: string;
    lang?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  };
  playFn?: () => void;
}

export interface ReplayEventDetail {
  target: CoachAudioTarget;
  timestamp: number;
}

type ReplayListener = (target: CoachAudioTarget | null) => void;
type ReplayTriggerListener = (event: ReplayEventDetail) => void;

class CoachAudioService {
  private currentTarget: CoachAudioTarget | null = null;
  private listeners: Set<ReplayListener> = new Set();
  private triggerListeners: Set<ReplayTriggerListener> = new Set();
  private isInitialized = false;

  constructor() {
    this.initKeyboardListener();
  }

  /**
   * Register the most recent coach or lesson phrase target for audio replay.
   */
  public setTarget(target: CoachAudioTarget | null) {
    this.currentTarget = target;
    this.notify();
  }

  public getTarget(): CoachAudioTarget | null {
    return this.currentTarget;
  }

  /**
   * Manually or programmatically trigger playback of the registered coach response.
   */
  public triggerReplay(): boolean {
    if (!this.currentTarget || !this.currentTarget.text?.trim()) {
      return false;
    }

    const target = this.currentTarget;

    // Notify listeners that replay was triggered (for animations / toasts)
    const detail: ReplayEventDetail = {
      target,
      timestamp: Date.now()
    };
    for (const listener of this.triggerListeners) {
      try {
        listener(detail);
      } catch (err) {
        console.warn('Replay listener error:', err);
      }
    }

    if (target.playFn) {
      target.playFn();
      return true;
    }

    tts.speak(target.text, target.options);
    return true;
  }

  public subscribe(listener: ReplayListener): () => void {
    this.listeners.add(listener);
    listener(this.currentTarget);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public onTrigger(listener: ReplayTriggerListener): () => void {
    this.triggerListeners.add(listener);
    return () => {
      this.triggerListeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.currentTarget);
      } catch (err) {
        console.warn('Listener error in coachAudioService:', err);
      }
    }
  }

  /**
   * Global keyboard shortcut handler.
   * Press 'R' or 'r' to trigger replay of the most recent coach response.
   * If focused on an input/textarea, does not intercept normal typing of the letter 'r',
   * but still supports 'Alt+R' for immediate review without losing focus.
   */
  private initKeyboardListener() {
    if (typeof window === 'undefined' || this.isInitialized) return;
    this.isInitialized = true;

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Must be key 'r' or 'R'
      if (e.key?.toLowerCase() !== 'r') return;

      // Do NOT intercept browser refresh commands (Ctrl+R or Cmd+R)
      if (e.ctrlKey || e.metaKey) return;

      const activeEl = document.activeElement as HTMLElement | null;
      const isInput = activeEl && (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName) ||
        activeEl.isContentEditable
      );

      // If typing inside an input/textarea, require Alt+R to prevent swallowing the letter 'r'
      if (isInput && !e.altKey) {
        return;
      }

      if (this.currentTarget && this.currentTarget.text?.trim()) {
        e.preventDefault();
        this.triggerReplay();
      }
    }, { capture: false });
  }
}

export const coachAudioService = new CoachAudioService();
