import React, { useEffect, useState } from 'react';
import { Volume2, Sparkles, X } from 'lucide-react';
import { coachAudioService, ReplayEventDetail } from '../lib/coachAudioService';

export const CoachAudioReplayBanner: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<ReplayEventDetail | null>(null);

  useEffect(() => {
    return coachAudioService.onTrigger((event) => {
      setActiveEvent(event);
      const timer = setTimeout(() => {
        setActiveEvent((curr) => (curr?.timestamp === event.timestamp ? null : curr));
      }, 2600);
      return () => clearTimeout(timer);
    });
  }, []);

  if (!activeEvent) return null;

  const previewText = activeEvent.target.text.length > 55
    ? activeEvent.target.text.slice(0, 52) + '...'
    : activeEvent.target.text;

  const sourceLabels: Record<string, string> = {
    chat: 'AI Coach Chat',
    lesson: 'Lesson Phrase',
    roleplay: 'Situation Partner',
    call: 'Voice Call',
    coach: 'Coach Suggestion',
    flashcard: 'Vocabulary Card',
    translator: 'Translation'
  };

  const sourceName = sourceLabels[activeEvent.target.source] || 'Coach Audio';

  return (
    <div 
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-3 fade-in duration-200 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="bg-neutral-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-neutral-700/80 flex items-center gap-3 max-w-sm sm:max-w-md pointer-events-auto">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
          <Volume2 className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
              {sourceName}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-neutral-800 text-neutral-300 px-1.5 py-0.2 rounded border border-neutral-700">
              Key: R
            </span>
          </div>
          <p className="text-xs font-semibold text-neutral-100 truncate mt-0.5">
            "{previewText}"
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveEvent(null)}
          className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
