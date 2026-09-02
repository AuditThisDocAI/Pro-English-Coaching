import React, { useState } from 'react';
import { 
  Languages, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Bookmark, 
  ArrowRight, 
  RefreshCw, 
  Send, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle,
  Briefcase,
  Mail,
  Code2,
  FileText,
  Plus
} from 'lucide-react';
import { NativeLanguage, SUPPORTED_LANGUAGES, SavedPhrase } from '../types';
import { useTTS } from '../lib/useTTS';
import { generateSmartRuleBasedTranslation } from '../lib/translationService';

interface AITranslatorStudioProps {
  nativeLanguage: NativeLanguage;
  onLanguageChange: (lang: NativeLanguage) => void;
  onSavePhrase: (phrase: {
    original: string;
    professional: string;
    translation: string;
    why: string;
    practice: string;
    mode: string;
    jobType: string;
  }) => void;
  onAddCustomFlashcard?: (card: {
    front: string;
    backProfessional: string;
    backWhy: string;
    backTranslation: string;
    category: string;
  }) => void;
  isPro?: boolean;
  onOpenPricing?: () => void;
}

export const AITranslatorStudio: React.FC<AITranslatorStudioProps> = ({
  nativeLanguage,
  onLanguageChange,
  onSavePhrase,
  onAddCustomFlashcard,
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedMode, setSelectedMode] = useState<'email' | 'interview' | 'tech' | 'cv' | 'general'>('email');
  const [selectedJobType, setSelectedJobType] = useState('Tech');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedType, setCopiedType] = useState<'english' | 'translation' | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [cardCreatedSuccess, setCardCreatedSuccess] = useState(false);

  // Result state
  const [result, setResult] = useState<{
    original: string;
    professional: string;
    translation: string;
    why: string;
    practice: string;
  } | null>(null);

  const { speak, isSpeaking, isSupported } = useTTS();
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const handleTranslateAndCoach = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setSavedSuccess(false);
    setCardCreatedSuccess(false);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: trimmed,
          mode: selectedMode,
          jobType: selectedJobType,
          nativeLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Coaching request returned status ${response.status}`);
      }

      const data = await response.json();
      if (data && data.professional) {
        setResult(data);
      }
    } catch (err) {
      console.error('Translation & Coaching Error:', err);
      // Fallback
      setResult({
        original: trimmed,
        professional: `I would like to ensure this is communicated with high executive clarity. ${trimmed}`,
        translation: generateSmartRuleBasedTranslation(trimmed, nativeLanguage),
        why: 'Framing thoughts clearly and concisely fosters trust and alignment in workplace environments.',
        practice: 'How would you follow up on this point in your next meeting?',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = async (text: string, type: 'english' | 'translation') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSaveToVault = () => {
    if (!result) return;
    onSavePhrase({
      original: result.original,
      professional: result.professional,
      translation: result.translation,
      why: result.why,
      practice: result.practice,
      mode: selectedMode,
      jobType: selectedJobType,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveAsFlashcard = () => {
    if (!result || !onAddCustomFlashcard) return;
    onAddCustomFlashcard({
      front: result.original,
      backProfessional: result.professional,
      backWhy: result.why,
      backTranslation: result.translation,
      category: selectedMode.toUpperCase(),
    });
    setCardCreatedSuccess(true);
    setTimeout(() => setCardCreatedSuccess(false), 3000);
  };

  const cycleSpeed = () => {
    setPlaybackSpeed((prev) => (prev === 1 ? 1.25 : prev === 1.25 ? 0.75 : 1));
  };

  // Quick preset inspirations
  const presetExamples = [
    { label: 'Apologize for delay', text: 'Sorry for the delay, I was busy with other stuff.', mode: 'email' as const },
    { label: 'Disagree with colleague', text: 'I think your idea will not work.', mode: 'general' as const },
    { label: 'Ask for salary update', text: 'I want more money because I worked here 2 years.', mode: 'interview' as const },
    { label: 'Blocked in Standup', text: 'I cannot finish my task because the API is broken.', mode: 'tech' as const },
  ];

  return (
    <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Languages className="w-3.5 h-3.5" />
            AI Language Translator & Workplace Coach
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
            Translate & Polish Any Thought for the Workplace
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Enter a casual thought or native language phrase to get instant executive English and bilingual coaching in {nativeLanguage}.
          </p>
        </div>

        {/* Native Language Selector */}
        <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-2xl border border-neutral-200/80 shrink-0">
          <Languages className="w-4 h-4 text-emerald-600 ml-1 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Your Language:</span>
            <select
              value={nativeLanguage}
              onChange={(e) => onLanguageChange(e.target.value as NativeLanguage)}
              className="text-xs font-bold text-neutral-800 bg-transparent focus:outline-none cursor-pointer pr-2"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.name} value={lang.name}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Input & Controls */}
      <form onSubmit={handleTranslateAndCoach} className="space-y-4">
        {/* Mode Selector */}
        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Select Workplace Context:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              type="button"
              onClick={() => setSelectedMode('email')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedMode === 'email'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>Email / Notes</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('interview')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedMode === 'interview'
                  ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-2xs'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-teal-600" />
              <span>Job Interview</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('tech')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedMode === 'tech'
                  ? 'bg-cyan-50 border-cyan-500 text-cyan-900 shadow-2xs'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-600" />
              <span>Tech Standup</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('cv')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedMode === 'cv'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-2xs'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Resume / CV</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('general')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedMode === 'general'
                  ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-2xs'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>General Meeting</span>
            </button>
          </div>
        </div>

        {/* Text Input Area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Type Your Phrase or Thought (English or in {nativeLanguage}):
            </label>
            <span className="text-[11px] text-neutral-400 font-medium">
              Examples: casual remarks, email drafts, questions
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`e.g. "I want to ask my boss for a deadline extension without sounding lazy" or write in ${nativeLanguage}...`}
              className="w-full p-4 text-sm bg-neutral-50 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-neutral-800"
            />
          </div>
        </div>

        {/* Quick Inspiration Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Try quick example:</span>
          {presetExamples.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(ex.text);
                setSelectedMode(ex.mode);
              }}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
            >
              "{ex.label}"
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Translating & Polishing with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Translate & Polish with AI</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Result Card */}
      {result && (
        <div className="mt-6 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950 text-white shadow-xl border border-emerald-800/40 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Polished Workplace Result
              </span>
              <span className="text-xs text-neutral-400">
                Mode: {selectedMode.toUpperCase()}
              </span>
            </div>

            {/* Audio Speed Controls */}
            {isSupported && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="px-2.5 py-1 text-xs font-bold text-neutral-300 hover:text-white bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Audio playback speed"
                >
                  {playbackSpeed}x Speed
                </button>
              </div>
            )}
          </div>

          {/* Polished English Box */}
          <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Executive English Phrasing:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopyText(result.professional, 'english')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 transition-colors cursor-pointer"
                  title="Copy English phrasing"
                >
                  {copiedType === 'english' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                {isSupported && (
                  <button
                    type="button"
                    onClick={() => speak(result.professional, { rate: playbackSpeed * 0.92 })}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-emerald-600 text-neutral-200 hover:text-white transition-colors cursor-pointer"
                    title="Pronounce phrase"
                  >
                    {isSpeaking(result.professional) ? (
                      <VolumeX className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              "{result.professional}"
            </p>
          </div>

          {/* Native Translation Box */}
          <div className="bg-emerald-950/40 p-4 sm:p-5 rounded-2xl border border-emerald-500/30">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-emerald-400" />
                Translation in {nativeLanguage}:
              </span>
              <button
                type="button"
                onClick={() => handleCopyText(result.translation, 'translation')}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 transition-colors cursor-pointer"
                title="Copy native translation"
              >
                {copiedType === 'translation' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-sm sm:text-base text-neutral-100 font-medium leading-relaxed">
              {result.translation}
            </p>
          </div>

          {/* Why It Works / Rationale */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-neutral-300 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Executive Tone Rationale:</span>
              <span className="leading-relaxed">{result.why}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
            <span className="text-xs text-neutral-400">
              Original: <span className="italic">"{result.original}"</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveToVault}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved to Vault!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                    <span>Save to Vault</span>
                  </>
                )}
              </button>

              {onAddCustomFlashcard && (
                <button
                  type="button"
                  onClick={handleSaveAsFlashcard}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  {cardCreatedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Added to Flashcard Deck!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add as Practice Flashcard</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
