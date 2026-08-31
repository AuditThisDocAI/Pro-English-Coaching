import React, { useState } from 'react';
import { CoachResponse } from '../types';
import { 
  Bookmark, 
  BookmarkCheck, 
  Briefcase, 
  Check, 
  CheckCircle2, 
  Copy, 
  Languages, 
  Lightbulb, 
  MessageSquare, 
  Send, 
  Volume2, 
  VolumeX, 
  ThumbsUp, 
  ThumbsDown,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTTS } from '../lib/useTTS';

interface Props {
  data: CoachResponse;
  onSave?: (data: CoachResponse) => Promise<boolean | void>;
  isSaved?: boolean;
  onSendToChat?: (text: string) => void;
  onFeedback?: (rating: 'up' | 'down', data: CoachResponse) => void;
  onOpenFlashcards?: (data: CoachResponse) => void;
}

export function CoachResultCard({ data, onSave, isSaved = false, onSendToChat, onFeedback, onOpenFlashcards }: Props) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedLocal, setSavedLocal] = useState(isSaved);
  const [rating, setRating] = useState<'up' | 'down' | null>(null);
  const { speak, isSpeaking, isSupported } = useTTS();

  const isSpeakingProfessional = isSpeaking(data.professional);
  const isSpeakingPractice = isSpeaking(data.practice);

  const handleToggleSpeakProfessional = () => {
    if (!data.professional) return;
    speak(data.professional, { rate: 0.92 });
  };

  const handleToggleSpeakPractice = () => {
    if (!data.practice) return;
    speak(data.practice, { rate: 0.92 });
  };

  const handleCopy = async () => {
    if (!data.professional) return;
    try {
      await navigator.clipboard.writeText(data.professional);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSave = async () => {
    if (!onSave || saving) return;
    setSaving(true);
    try {
      await onSave(data);
      setSavedLocal(true);
    } catch (err) {
      console.error('Failed to save phrase: ', err);
    } finally {
      setSaving(false);
    }
  };

  const handleRate = (newRating: 'up' | 'down') => {
    const updated = rating === newRating ? null : newRating;
    setRating(updated);
    if (updated && onFeedback) {
      onFeedback(updated, data);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden text-neutral-800"
    >
      <div className="p-5 border-b border-neutral-100 bg-neutral-50/50">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="bg-neutral-200 p-2 rounded-lg mt-0.5">
              <MessageSquare className="w-4 h-4 text-neutral-600" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Your Sentence</div>
              <p className="text-neutral-700 italic">"{data.original}"</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Feedback Thumbs Up / Down */}
            <div className="flex items-center gap-1 bg-white border border-neutral-200 p-0.5 rounded-lg shadow-2xs">
              <button
                onClick={() => handleRate('up')}
                title="Good suggestion (Thumbs Up)"
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  rating === 'up'
                    ? 'bg-emerald-100 text-emerald-700 shadow-xs'
                    : 'text-neutral-400 hover:text-emerald-600 hover:bg-neutral-50'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleRate('down')}
                title="Needs improvement (Thumbs Down)"
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  rating === 'down'
                    ? 'bg-red-100 text-red-700 shadow-xs'
                    : 'text-neutral-400 hover:text-red-600 hover:bg-neutral-50'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {onSendToChat && (
              <button
                onClick={() => onSendToChat(data.professional)}
                title="Send this professional phrase to Google Chat"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 bg-white border border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-800 cursor-pointer shadow-2xs"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Google Chat</span>
              </button>
            )}
            {onOpenFlashcards && (
              <button
                onClick={() => onOpenFlashcards(data)}
                title="Study this formulation in interactive Flashcard Deck"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 bg-white border border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-800 cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Flashcard</span>
              </button>
            )}
            {onSave && (
              <button
                onClick={handleSave}
                disabled={savedLocal || saving}
                title={savedLocal ? "Saved to your library" : "Save phrase to library"}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 cursor-pointer ${
                  savedLocal 
                    ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {savedLocal ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{saving ? 'Saving...' : 'Save'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between gap-3 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
          <div className="flex items-start gap-3 flex-1">
            <div className="bg-emerald-100 p-2 rounded-lg mt-0.5 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">Professional English</div>
              <p className="text-emerald-950 font-medium text-base sm:text-lg leading-relaxed">{data.professional}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {isSupported && (
              <button
                onClick={handleToggleSpeakProfessional}
                title={isSpeakingProfessional ? "Stop pronunciation" : "Listen to pronunciation"}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 border cursor-pointer ${
                  isSpeakingProfessional
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs animate-pulse'
                    : 'bg-white border-emerald-200 text-emerald-800 hover:bg-emerald-100/70 shadow-2xs'
                }`}
              >
                {isSpeakingProfessional ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="font-semibold">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Listen</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy professional English"}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100/70 active:scale-95 shadow-2xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex gap-3">
          <div className="bg-blue-50 p-2 rounded-lg h-fit shrink-0">
            <Languages className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Translation</div>
            <p className="text-neutral-600 text-sm">{data.translation}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="bg-amber-50 p-2 rounded-lg h-fit shrink-0">
            <Lightbulb className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Why this is better</div>
            <p className="text-neutral-700 text-sm leading-relaxed">{data.why}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-start justify-between gap-3">
          <div className="flex gap-3 flex-1">
            <div className="bg-purple-50 p-2 rounded-lg h-fit shrink-0">
              <Briefcase className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-700 mb-1">Practice Scenario</div>
              <p className="text-purple-900 text-sm font-medium">{data.practice}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {rating && (
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                {rating === 'up' ? '👍 Feedback noted' : '👎 Feedback noted'}
              </span>
            )}
            {isSupported && data.practice && (
              <button
                onClick={handleToggleSpeakPractice}
                title={isSpeakingPractice ? "Stop reading practice" : "Listen to practice sentence"}
                className={`p-1.5 rounded-lg border text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isSpeakingPractice
                    ? 'bg-purple-600 border-purple-600 text-white animate-pulse'
                    : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'
                }`}
              >
                {isSpeakingPractice ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
