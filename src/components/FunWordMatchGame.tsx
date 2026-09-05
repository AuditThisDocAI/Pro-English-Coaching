import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  RotateCcw, 
  Shuffle,
  Award, 
  Smile, 
  Globe2, 
  ArrowRight,
  Flame,
  Layers,
  BookOpen
} from 'lucide-react';
import { NativeLanguage, SUPPORTED_LANGUAGES } from '../types';
import { triggerProUpgradeConfetti } from '../lib/confetti';
import { useTTS } from '../lib/useTTS';
import { SpeakerSpeedControl } from './SpeakerSpeedControl';
import { 
  BASIC_WORD_BANK, 
  WORD_GAME_CATEGORIES, 
  WordMatchPair 
} from '../data/wordGameWords';

interface FunWordMatchGameProps {
  nativeLanguage: NativeLanguage;
  onLanguageChange: (lang: NativeLanguage) => void;
  onAddXP: (amount: number) => void;
  onOpenChat: (text?: string) => void;
}

// Fisher-Yates array shuffler
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const FunWordMatchGame: React.FC<FunWordMatchGameProps> = ({
  nativeLanguage,
  onLanguageChange,
  onAddXP,
  onOpenChat
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All 100+ Words');
  const [currentPairs, setCurrentPairs] = useState<WordMatchPair[]>([]);
  const [shuffledNativePairs, setShuffledNativePairs] = useState<WordMatchPair[]>([]);
  
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [selectedNative, setSelectedNative] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongMatch, setWrongMatch] = useState<{ eng: string; nat: string } | null>(null);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [allMasteredIds, setAllMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('english_coach_mastered_words');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const { speed, speak } = useTTS();

  // Filter pool by category
  const availablePool = useMemo(() => {
    if (selectedCategory === 'All 100+ Words') {
      return BASIC_WORD_BANK;
    }
    return BASIC_WORD_BANK.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Load a new random batch of words (avoiding the exact same set if possible)
  const pickNewRoundWords = useCallback((category = selectedCategory, currentIds: string[] = []) => {
    let pool = category === 'All 100+ Words' 
      ? BASIC_WORD_BANK 
      : BASIC_WORD_BANK.filter(w => w.category === category);

    if (pool.length === 0) pool = BASIC_WORD_BANK;

    // Prefer words not currently on screen
    const unselected = pool.filter(w => !currentIds.includes(w.id));
    const candidates = unselected.length >= 6 ? unselected : pool;

    const shuffled = shuffleArray(candidates);
    const chosen = shuffled.slice(0, 6);

    setCurrentPairs(chosen);
    setShuffledNativePairs(shuffleArray(chosen));
    setMatchedIds(new Set());
    setSelectedEnglish(null);
    setSelectedNative(null);
    setWrongMatch(null);
  }, [selectedCategory]);

  // Initial load or on category change
  useEffect(() => {
    pickNewRoundWords(selectedCategory);
    setRoundNumber(1);
  }, [selectedCategory, pickNewRoundWords]);

  // Play pronunciation
  const handlePlayAudio = (text: string) => {
    speak(text, { rate: speed });
  };

  const handleSelectEnglish = (pair: WordMatchPair) => {
    if (matchedIds.has(pair.id)) return;
    handlePlayAudio(pair.english);
    setSelectedEnglish(pair.id);

    if (selectedNative) {
      checkMatch(pair.id, selectedNative);
    }
  };

  const handleSelectNative = (pair: WordMatchPair) => {
    if (matchedIds.has(pair.id)) return;
    setSelectedNative(pair.id);

    if (selectedEnglish) {
      checkMatch(selectedEnglish, pair.id);
    }
  };

  const checkMatch = (engId: string, natId: string) => {
    if (engId === natId) {
      // Correct Match!
      const next = new Set(matchedIds);
      next.add(engId);
      setMatchedIds(next);

      setScore((s) => s + 20);
      setStreak((st) => st + 1);
      onAddXP(20);

      // Track mastered words
      setAllMasteredIds((prev) => {
        const updated = new Set(prev);
        updated.add(engId);
        try {
          localStorage.setItem('english_coach_mastered_words', JSON.stringify([...updated]));
        } catch {
          // ignore
        }
        return updated;
      });

      setSelectedEnglish(null);
      setSelectedNative(null);
      setWrongMatch(null);

      // Check if all 6 in current round matched
      if (next.size === currentPairs.length) {
        onAddXP(50); // bonus XP for round completion
        triggerProUpgradeConfetti();
      }
    } else {
      // Incorrect Match
      setWrongMatch({ eng: engId, nat: natId });
      setStreak(0);
      setTimeout(() => {
        setSelectedEnglish(null);
        setSelectedNative(null);
        setWrongMatch(null);
      }, 550);
    }
  };

  // Reset current round
  const handleResetCurrentRound = () => {
    setMatchedIds(new Set());
    setSelectedEnglish(null);
    setSelectedNative(null);
    setWrongMatch(null);
    setShuffledNativePairs(shuffleArray(currentPairs));
  };

  // Next round / Refresh new words
  const handleNextRound = () => {
    setRoundNumber((r) => r + 1);
    pickNewRoundWords(selectedCategory, currentPairs.map(p => p.id));
  };

  const isAllCompleted = currentPairs.length > 0 && matchedIds.size === currentPairs.length;
  const masteredPercentage = Math.round((allMasteredIds.size / BASIC_WORD_BANK.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Game Header */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
              100+ Everyday Words Match
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-extrabold">
              Round #{roundNumber}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Streak: {streak}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-1">
            Match English Words with Your Language
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Tap an English word to hear authentic pronunciation, then find its matching meaning in {nativeLanguage}!
          </p>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <SpeakerSpeedControl variant="header" idPrefix="match-game-speed" />

          {/* XP Score */}
          <div className="bg-indigo-50 px-3.5 py-1.5 rounded-2xl border border-indigo-100 text-center">
            <span className="text-[10px] font-bold text-indigo-700 uppercase block">Score</span>
            <span className="text-sm font-black text-indigo-900">+{score} XP</span>
          </div>

          {/* New Words / Refresh Button */}
          <button
            type="button"
            onClick={handleNextRound}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Refresh game with 6 new words from the bank"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>New Words</span>
          </button>

          {/* Reset Current Round */}
          <button
            type="button"
            onClick={handleResetCurrentRound}
            className="p-2 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
            title="Reset Current Round"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vocabulary Bank Stats Bar & Category Filter */}
      <div className="bg-neutral-50 rounded-2xl p-3 sm:p-4 border border-neutral-200/80 space-y-3">
        
        {/* Mastered Progress Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-neutral-700">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Vocabulary Pool: {BASIC_WORD_BANK.length} Essential Words</span>
            <span className="text-neutral-400 font-normal">|</span>
            <span className="text-emerald-700 font-extrabold">{allMasteredIds.size} Words Practiced ({masteredPercentage}%)</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium">
            Showing 6 of {availablePool.length} words in this category
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          {WORD_GAME_CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isCatActive
                    ? 'bg-emerald-600 text-white font-black shadow-2xs'
                    : 'bg-white hover:bg-neutral-200/70 text-neutral-600 border border-neutral-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Round Completion Celebration Card */}
      {isAllCompleted && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl p-6 shadow-xl text-center space-y-3 animate-in zoom-in-95 duration-200">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 text-2xl mb-1 shadow-inner">
            🎉
          </div>
          <h3 className="text-2xl font-black tracking-tight">Round {roundNumber} Completed!</h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto leading-relaxed">
            Awesome job! You matched all 6 words perfectly (+70 XP total). Keep going to practice more from the 100+ word bank!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleNextRound}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-900 rounded-xl text-xs font-black shadow-md hover:bg-emerald-50 transition-all cursor-pointer active:scale-95"
            >
              <Shuffle className="w-4 h-4 text-emerald-700" />
              <span>Next 6 Words (Refresh) ➔</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenChat("I just completed a round in the 100-word match game! Can we make some simple everyday sentences with these words?")}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700/60 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <span>Practice in AI Chat 💬</span>
            </button>
          </div>
        </div>
      )}

      {/* Matching Board Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Left Column: English Words */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              1. Tap English Word (Listen 🔊):
            </span>
            <span className="text-[11px] text-neutral-400 font-semibold">
              {matchedIds.size} / {currentPairs.length} matched
            </span>
          </div>

          <div className="space-y-2.5">
            {currentPairs.map((pair) => {
              const isMatched = matchedIds.has(pair.id);
              const isSelected = selectedEnglish === pair.id;
              const isWrong = wrongMatch?.eng === pair.id;

              return (
                <button
                  key={`eng-${pair.id}`}
                  type="button"
                  onClick={() => handleSelectEnglish(pair)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 opacity-60'
                      : isWrong
                      ? 'bg-rose-50 border-rose-400 text-rose-900 animate-shake'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-102 font-extrabold'
                      : 'bg-white border-neutral-200 hover:border-indigo-300 hover:bg-neutral-50 text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{pair.emoji}</span>
                    <div>
                      <span className="text-sm font-bold block">"{pair.english}"</span>
                      <span className={`text-[10px] font-semibold ${isSelected ? 'text-indigo-200' : 'text-neutral-400'}`}>
                        {pair.category}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5">
                    {isMatched ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Volume2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Native Translations (Shuffled) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              2. Tap Meaning in {nativeLanguage}:
            </span>
            <span className="text-[11px] text-neutral-400 font-semibold">
              Shuffled order
            </span>
          </div>

          <div className="space-y-2.5">
            {shuffledNativePairs.map((pair) => {
              const translation = pair.translations[nativeLanguage] || pair.translations.Spanish || pair.english;
              const isMatched = matchedIds.has(pair.id);
              const isSelected = selectedNative === pair.id;
              const isWrong = wrongMatch?.nat === pair.id;

              return (
                <button
                  key={`nat-${pair.id}`}
                  type="button"
                  onClick={() => handleSelectNative(pair)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer min-h-[64px] ${
                    isMatched
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 opacity-60'
                      : isWrong
                      ? 'bg-rose-50 border-rose-400 text-rose-900 animate-shake'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-102 font-extrabold'
                      : 'bg-white border-neutral-200 hover:border-indigo-300 hover:bg-neutral-50 text-neutral-900'
                  }`}
                >
                  <span className="text-sm font-bold">"{translation}"</span>
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating Refresh Bar on Mobile / Bottom Helper */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Want a fresh set of words? Tap <strong>New Words</strong> anytime!</span>
        </div>
        <button
          type="button"
          onClick={handleNextRound}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-bold transition-colors cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
          <span>Refresh Words</span>
        </button>
      </div>

    </div>
  );
};
