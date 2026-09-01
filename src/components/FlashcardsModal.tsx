import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Flashcard, 
  FlashcardDeck, 
  FlashcardMastery, 
  SavedPhrase, 
  NativeLanguage,
  SUPPORTED_LANGUAGES 
} from '../types';
import { 
  X, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Bookmark, 
  Sparkles, 
  Plus, 
  Search, 
  Check, 
  Copy, 
  Flame, 
  Layers, 
  HelpCircle, 
  Lightbulb, 
  BookOpen, 
  Award, 
  ArrowRight,
  Languages,
  Zap,
  Trash2,
  ListFilter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTTS } from '../lib/useTTS';
import { 
  getAllDecks, 
  loadMasteryMap, 
  saveMasteryMap, 
  loadCustomFlashcards, 
  saveCustomFlashcards,
  loadReviewStats,
  incrementReviewedCount
} from '../lib/flashcardService';
import { getFlashcardTranslation } from '../data/flashcardDecks';
import { triggerCelebrationConfetti } from '../lib/confetti';
import { auth } from '../lib/firebase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  savedPhrases: SavedPhrase[];
  nativeLanguage: NativeLanguage;
  onSendToChat?: (text: string) => void;
  initialDeckId?: string;
}

export function FlashcardsModal({
  isOpen,
  onClose,
  savedPhrases,
  nativeLanguage,
  onSendToChat,
  initialDeckId = 'all',
}: Props) {
  const currentUser = auth.currentUser;
  const { speak, isSpeaking, isSupported } = useTTS();

  const [masteryMap, setMasteryMap] = useState<Record<string, FlashcardMastery>>(() =>
    loadMasteryMap(currentUser)
  );
  const [customCards, setCustomCards] = useState<Flashcard[]>(() =>
    loadCustomFlashcards(currentUser)
  );
  const [reviewStats, setReviewStats] = useState(() => loadReviewStats(currentUser));

  const [selectedDeckId, setSelectedDeckId] = useState<string>(initialDeckId);
  const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'browse' | 'create'>('study');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMastery, setFilterMastery] = useState<'all' | FlashcardMastery>('all');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);

  // New Card Form State
  const [newFront, setNewFront] = useState('');
  const [newFrontContext, setNewFrontContext] = useState('Workplace Communication');
  const [newBackProfessional, setNewBackProfessional] = useState('');
  const [newBackWhy, setNewBackWhy] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  // Quiz Mode State
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Update decks dynamically
  const decks = useMemo(() => {
    return getAllDecks(currentUser, savedPhrases, masteryMap, customCards);
  }, [currentUser, savedPhrases, masteryMap, customCards]);

  // Flattened cards for current selection
  const currentDeckCards = useMemo(() => {
    let list: Flashcard[] = [];
    if (selectedDeckId === 'all') {
      decks.forEach((deck) => {
        deck.cards.forEach((c) => {
          if (!list.some((existing) => existing.id === c.id)) {
            list.push(c);
          }
        });
      });
    } else {
      const found = decks.find((d) => d.id === selectedDeckId);
      list = found ? [...found.cards] : [];
    }

    if (filterMastery !== 'all') {
      list = list.filter((c) => (masteryMap[c.id] || 'new') === filterMastery);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.front.toLowerCase().includes(q) ||
          c.backProfessional.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          (c.frontContext && c.frontContext.toLowerCase().includes(q))
      );
    }

    return list;
  }, [decks, selectedDeckId, filterMastery, searchQuery, masteryMap]);

  const currentCard = currentDeckCards[currentIndex] || null;

  // Deck completion & stats
  const totalMastered = useMemo(() => {
    return Object.values(masteryMap).filter((m) => m === 'mastered').length;
  }, [masteryMap]);

  const totalLearning = useMemo(() => {
    return Object.values(masteryMap).filter((m) => m === 'learning').length;
  }, [masteryMap]);

  // Synchronize on modal open or user changes
  useEffect(() => {
    if (isOpen) {
      setMasteryMap(loadMasteryMap(currentUser));
      setCustomCards(loadCustomFlashcards(currentUser));
      setReviewStats(loadReviewStats(currentUser));
      setCurrentIndex(0);
      setIsFlipped(false);
      setQuizAnswered(false);
      setQuizSelectedOption(null);
    }
  }, [isOpen, currentUser]);

  // Flip card helper
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Update card mastery state
  const handleSetMastery = useCallback(
    (cardId: string, mastery: FlashcardMastery) => {
      const nextMap = { ...masteryMap, [cardId]: mastery };
      setMasteryMap(nextMap);
      saveMasteryMap(currentUser, nextMap);
      incrementReviewedCount(currentUser);
      setReviewStats(loadReviewStats(currentUser));

      if (mastery === 'mastered') {
        // Trigger mini reward on mastering
        triggerCelebrationConfetti();
      }

      // Advance to next card
      if (currentIndex < currentDeckCards.length - 1) {
        setIsFlipped(false);
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Finished deck
        triggerCelebrationConfetti();
        setIsFlipped(false);
      }
    },
    [masteryMap, currentUser, currentIndex, currentDeckCards.length]
  );

  // Navigate cards
  const handleNext = useCallback(() => {
    if (currentIndex < currentDeckCards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
      setQuizAnswered(false);
      setQuizSelectedOption(null);
    }
  }, [currentIndex, currentDeckCards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
      setQuizAnswered(false);
      setQuizSelectedOption(null);
    }
  }, [currentIndex]);

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * Math.max(1, currentDeckCards.length)));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || activeTab !== 'study') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1' && currentCard) {
        e.preventDefault();
        handleSetMastery(currentCard.id, 'new');
      } else if (e.key === '2' && currentCard) {
        e.preventDefault();
        handleSetMastery(currentCard.id, 'learning');
      } else if (e.key === '3' && currentCard) {
        e.preventDefault();
        handleSetMastery(currentCard.id, 'mastered');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab, handleFlip, handleNext, handlePrev, handleSetMastery, currentCard]);

  // Audio Pronunciation
  const handleSpeak = (text: string) => {
    speak(text, { rate: playbackSpeed * 0.92 });
  };

  const cycleSpeed = () => {
    setPlaybackSpeed((prev) => {
      if (prev === 1) return 1.25;
      if (prev === 1.25) return 0.75;
      return 1;
    });
  };

  // Copy card text
  const handleCopy = async (card: Flashcard) => {
    try {
      await navigator.clipboard.writeText(card.backProfessional);
      setCopiedCardId(card.id);
      setTimeout(() => setCopiedCardId(null), 2000);
    } catch (e) {
      console.error('Failed to copy card text:', e);
    }
  };

  // Create custom card
  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBackProfessional.trim()) return;

    const newCard: Flashcard = {
      id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      deckId: 'custom-deck',
      category: newCategory.trim() || 'Custom',
      frontContext: newFrontContext.trim() || 'Custom Thought',
      front: newFront.trim(),
      backProfessional: newBackProfessional.trim(),
      backWhy: newBackWhy.trim() || 'Custom tailored executive formulation.',
      backPractice: 'Practice speaking this in your next conversation.',
      mastery: 'new',
      isCustom: true,
    };

    const updated = [newCard, ...customCards];
    setCustomCards(updated);
    saveCustomFlashcards(currentUser, updated);

    // Reset form
    setNewFront('');
    setNewBackProfessional('');
    setNewBackWhy('');
    setSelectedDeckId('custom-deck');
    setActiveTab('study');
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleDeleteCustomCard = (cardId: string) => {
    const updated = customCards.filter((c) => c.id !== cardId);
    setCustomCards(updated);
    saveCustomFlashcards(currentUser, updated);
  };

  // Generate quiz options for current card
  const quizOptions = useMemo(() => {
    if (!currentCard || activeTab !== 'quiz') return [];

    const correct = currentCard.backProfessional;
    const otherCards = currentDeckCards.filter((c) => c.id !== currentCard.id);
    const shuffledOthers = [...otherCards].sort(() => 0.5 - Math.random()).slice(0, 2);

    const distractor1 = shuffledOthers[0]?.backProfessional || 'Please ensure you complete this at your earliest convenience.';
    const distractor2 = shuffledOthers[1]?.backProfessional || 'I wanted to circle back regarding our discussion yesterday.';

    const rawOptions = [
      { text: correct, isCorrect: true },
      { text: distractor1, isCorrect: false },
      { text: distractor2, isCorrect: false },
    ];

    return rawOptions.sort(() => 0.5 - Math.random());
  }, [currentCard, currentDeckCards, activeTab]);

  const handleSelectQuizOption = (idx: number, isCorrect: boolean) => {
    if (quizAnswered) return;
    setQuizSelectedOption(idx);
    setQuizAnswered(true);
    setQuizScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }));

    if (isCorrect && currentCard) {
      handleSetMastery(currentCard.id, 'mastered');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="bg-white rounded-3xl shadow-2xl border border-neutral-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-neutral-900 my-4"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-extrabold text-base sm:text-lg text-neutral-900">
                    Flashcard Mastery Deck
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Spaced Repetition
                  </span>
                </div>
                <p className="text-xs text-neutral-500 hidden sm:block">
                  Practice executive workplace formulations, idioms, and your saved phrase vault
                </p>
              </div>
            </div>

            {/* Streak & Mastery Stats */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs text-xs font-semibold text-neutral-700">
                <div className="flex items-center gap-1 text-amber-600" title="Consecutive days reviewed">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{reviewStats.streakDays || 1}d Streak</span>
                </div>
                <span className="text-neutral-300">|</span>
                <div className="flex items-center gap-1 text-emerald-700" title="Cards Mastered">
                  <Award className="w-3.5 h-3.5" />
                  <span>{totalMastered} Mastered</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader Toolbar: Deck Selector & Tab Switcher */}
          <div className="px-4 py-3 bg-white border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3">
            {/* Deck Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider shrink-0">
                Deck:
              </span>
              <select
                value={selectedDeckId}
                onChange={(e) => {
                  setSelectedDeckId(e.target.value);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option value="all">🌟 All Flashcards ({decks.reduce((acc, d) => acc + d.cards.length, 0)})</option>
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.title} ({deck.cards.length})
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('study');
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'study'
                    ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>3D Flip Study</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('quiz');
                  setQuizAnswered(false);
                  setQuizSelectedOption(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Quiz Recall</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('browse')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'browse'
                    ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5 text-blue-600" />
                <span>Browse Deck</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'create'
                    ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-teal-600" />
                <span>+ Custom Card</span>
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50/60">
            {/* 1. STUDY / 3D FLIP MODE */}
            {activeTab === 'study' && (
              <div className="max-w-2xl mx-auto flex flex-col items-center">
                {currentDeckCards.length === 0 ? (
                  <div className="text-center py-12 px-6 bg-white rounded-3xl border border-neutral-200 w-full shadow-sm">
                    <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-neutral-800 mb-1">No cards in this selection</h3>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-5">
                      Save phrases from your coaching sessions or create your own custom flashcards to start practicing.
                    </p>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Create Flashcard
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Top Flashcard Status & Progress */}
                    <div className="w-full flex items-center justify-between text-xs font-semibold text-neutral-500 mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-neutral-200/80 px-2 py-0.5 rounded-md text-[11px] font-bold text-neutral-700">
                          Card {currentIndex + 1} of {currentDeckCards.length}
                        </span>
                        {currentCard?.mastery && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              currentCard.mastery === 'mastered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : currentCard.mastery === 'learning'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {currentCard.mastery}
                          </span>
                        )}
                      </div>

                      {/* Speed & Audio controls */}
                      <div className="flex items-center gap-2">
                        {isSupported && (
                          <button
                            onClick={cycleSpeed}
                            className="px-2 py-1 text-[11px] font-bold text-neutral-600 hover:text-emerald-700 bg-white border border-neutral-200 rounded-lg transition-colors cursor-pointer"
                            title="Cycle audio pronunciation playback speed"
                          >
                            {playbackSpeed}x Speed
                          </button>
                        )}
                        <button
                          onClick={handleShuffle}
                          className="p-1.5 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/60 rounded-lg transition-colors cursor-pointer"
                          title="Shuffle cards"
                        >
                          <Shuffle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* 3D Flip Card Container */}
                    <div
                      className="w-full min-h-[340px] sm:min-h-[380px] perspective-[1000px] cursor-pointer"
                      onClick={handleFlip}
                    >
                      <motion.div
                        className="w-full h-full relative preserve-3d transition-transform duration-500"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                      >
                        {/* FRONT FACE (Casual thought / Scenario) */}
                        <div
                          className={`absolute inset-0 backface-hidden w-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200 shadow-md hover:border-emerald-400/80 transition-colors flex flex-col justify-between ${
                            isFlipped ? 'pointer-events-none' : ''
                          }`}
                        >
                          <div>
                            {/* Category & Badge */}
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 border border-neutral-200">
                                {currentCard?.frontContext || currentCard?.category || 'Scenario'}
                              </span>
                              <span className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                                <RotateCw className="w-3 h-3 text-emerald-600 animate-spin-slow" /> Click or Space to Flip
                              </span>
                            </div>

                            {/* Front Prompt Text */}
                            <div className="mt-4">
                              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                                How would you say this professionally?
                              </span>
                              <p className="text-lg sm:text-2xl font-bold text-neutral-800 leading-snug">
                                "{currentCard?.front}"
                              </p>
                            </div>
                          </div>

                          {/* Front Footer */}
                          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                            <div className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Flip to reveal executive formulation & explanation</span>
                            </div>
                            {isSupported && currentCard && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSpeak(currentCard.front);
                                }}
                                className="p-2 rounded-xl bg-neutral-100 hover:bg-emerald-50 text-neutral-600 hover:text-emerald-700 transition-colors"
                                title="Listen to prompt audio"
                              >
                                {isSpeaking(currentCard.front) ? (
                                  <VolumeX className="w-4 h-4 text-emerald-600 animate-pulse" />
                                ) : (
                                  <Volume2 className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* BACK FACE (Professional Formulation & Rationale) */}
                        <div
                          className={`absolute inset-0 backface-hidden rotate-y-180 w-full bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl flex flex-col justify-between ${
                            !isFlipped ? 'pointer-events-none' : ''
                          }`}
                        >
                          <div>
                            {/* Back Header */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-900 text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Professional Formulation</span>
                              </div>
                              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                {currentCard && (
                                  <button
                                    onClick={() => handleCopy(currentCard)}
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                                    title="Copy professional phrase"
                                  >
                                    {copiedCardId === currentCard.id ? (
                                      <Check className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>
                                )}
                                {isSupported && currentCard && (
                                  <button
                                    onClick={() => handleSpeak(currentCard.backProfessional)}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                      isSpeaking(currentCard.backProfessional)
                                        ? 'bg-emerald-600 text-white animate-pulse'
                                        : 'text-neutral-500 hover:text-emerald-700 hover:bg-emerald-50'
                                    }`}
                                    title="Listen to native pronunciation"
                                  >
                                    {isSpeaking(currentCard.backProfessional) ? (
                                      <VolumeX className="w-4 h-4" />
                                    ) : (
                                      <Volume2 className="w-4 h-4" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Back Main Text */}
                            <div className="mt-2">
                              <p className="text-base sm:text-xl font-extrabold text-neutral-900 leading-relaxed">
                                {currentCard?.backProfessional}
                              </p>
                            </div>

                            {/* Why It Works / Nuance */}
                            <div className="mt-4 p-3 rounded-xl bg-white/90 border border-emerald-100 text-xs text-neutral-700 flex items-start gap-2 shadow-2xs">
                              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-neutral-900 block mb-0.5">Why this excels:</span>
                                <span>{currentCard?.backWhy}</span>
                              </div>
                            </div>

                            {/* Native Translation if available */}
                            {currentCard && (
                              <div className="mt-2.5 p-2.5 rounded-xl bg-white/95 border border-emerald-100 text-xs text-neutral-800 shadow-2xs" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
                                    <Languages className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>{nativeLanguage} Translation:</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const text = getFlashcardTranslation(currentCard, nativeLanguage);
                                      if (text) navigator.clipboard.writeText(text);
                                    }}
                                    className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded transition-colors cursor-pointer"
                                    title={`Copy ${nativeLanguage} translation`}
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                                <p className="font-semibold text-neutral-800 text-xs leading-relaxed">
                                  {getFlashcardTranslation(currentCard, nativeLanguage) || 'Translation available in interactive session.'}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Back Action Cue */}
                          <div className="pt-3 border-t border-emerald-100 text-center text-xs text-neutral-400">
                            Rate your recall below to optimize your spaced repetition queue
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Spaced Repetition Mastery Rating Buttons */}
                    <div className="mt-5 w-full bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider hidden sm:block">
                        Rate Mastery:
                      </div>

                      <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          disabled={!currentCard}
                          onClick={() => currentCard && handleSetMastery(currentCard.id, 'new')}
                          className="px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                          title="Key 1: Review Soon"
                        >
                          <span className="w-2 h-2 rounded-full bg-neutral-400" />
                          <span>Review Soon</span>
                          <kbd className="hidden sm:inline text-[9px] bg-neutral-200 px-1 rounded text-neutral-500 font-mono">1</kbd>
                        </button>

                        <button
                          type="button"
                          disabled={!currentCard}
                          onClick={() => currentCard && handleSetMastery(currentCard.id, 'learning')}
                          className="px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                          title="Key 2: Getting There"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>Getting There</span>
                          <kbd className="hidden sm:inline text-[9px] bg-amber-200/80 px-1 rounded text-amber-700 font-mono">2</kbd>
                        </button>

                        <button
                          type="button"
                          disabled={!currentCard}
                          onClick={() => currentCard && handleSetMastery(currentCard.id, 'mastered')}
                          className="px-3 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                          title="Key 3: Mastered"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Mastered!</span>
                          <kbd className="hidden sm:inline text-[9px] bg-emerald-700 px-1 rounded text-emerald-100 font-mono">3</kbd>
                        </button>
                      </div>

                      {/* Prev / Next Arrows */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={currentIndex === 0}
                          onClick={handlePrev}
                          className="p-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 disabled:opacity-30 transition-colors cursor-pointer"
                          title="Previous Card (←)"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={currentIndex >= currentDeckCards.length - 1}
                          onClick={handleNext}
                          className="p-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 disabled:opacity-30 transition-colors cursor-pointer"
                          title="Next Card (→)"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 2. QUIZ RECALL MODE */}
            {activeTab === 'quiz' && (
              <div className="max-w-2xl mx-auto">
                {currentCard ? (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        Quiz Challenge • Card {currentIndex + 1} of {currentDeckCards.length}
                      </span>
                      <span className="text-xs font-semibold text-neutral-500">
                        Score: {quizScore.correct} / {quizScore.total}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                        Casual Thought / Scenario:
                      </span>
                      <p className="text-lg font-bold text-neutral-800">
                        "{currentCard.front}"
                      </p>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                        Select the most professional executive formulation:
                      </span>
                      {quizOptions.map((opt, idx) => {
                        const isSelected = quizSelectedOption === idx;
                        let btnStyle = 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800';

                        if (quizAnswered) {
                          if (opt.isCorrect) {
                            btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                          } else if (isSelected && !opt.isCorrect) {
                            btnStyle = 'bg-red-50 border-red-300 text-red-800';
                          } else {
                            btnStyle = 'opacity-50 bg-neutral-50 border-neutral-200 text-neutral-500';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={quizAnswered}
                            onClick={() => handleSelectQuizOption(idx, opt.isCorrect)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm leading-relaxed flex items-start gap-3 cursor-pointer ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="flex-1">{opt.text}</span>
                            {quizAnswered && opt.isCorrect && (
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizAnswered && (
                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span>Executive Rationale:</span>
                        </div>
                        <p className="text-xs text-emerald-800 leading-relaxed">
                          {currentCard.backWhy}
                        </p>
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={handleNext}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <span>Next Question</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-neutral-400 text-xs">
                    No quiz cards available in this deck.
                  </div>
                )}
              </div>
            )}

            {/* 3. BROWSE ALL CARDS MODE */}
            {activeTab === 'browse' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-wrap items-center gap-3 bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-2xs">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search flashcards by phrase or context..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
                    <span>Filter:</span>
                    {(['all', 'new', 'learning', 'mastered'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setFilterMastery(m)}
                        className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-colors cursor-pointer ${
                          filterMastery === m
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentDeckCards.map((card) => {
                    const speaking = isSpeaking(card.backProfessional);
                    return (
                      <div
                        key={card.id}
                        className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-2xs hover:border-neutral-300 transition-all flex flex-col justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                              {card.frontContext || card.category}
                            </span>
                            <span
                              className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                (masteryMap[card.id] || 'new') === 'mastered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : (masteryMap[card.id] || 'new') === 'learning'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {masteryMap[card.id] || 'new'}
                            </span>
                          </div>

                          <p className="text-xs text-neutral-500 italic mb-2">"{card.front}"</p>
                          <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                            {card.backProfessional}
                          </p>
                          <p className="text-[11px] text-neutral-600 mt-2 bg-neutral-50 p-2 rounded-lg leading-relaxed">
                            {card.backWhy}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            {isSupported && (
                              <button
                                onClick={() => handleSpeak(card.backProfessional)}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  speaking
                                    ? 'bg-emerald-600 text-white animate-pulse'
                                    : 'text-neutral-500 hover:text-emerald-700 hover:bg-emerald-50'
                                }`}
                                title="Listen"
                              >
                                {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                              </button>
                            )}
                            <button
                              onClick={() => handleCopy(card)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                              title="Copy"
                            >
                              {copiedCardId === card.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {card.isCustom && card.id.startsWith('custom_') && (
                            <button
                              onClick={() => handleDeleteCustomCard(card.id)}
                              className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                              title="Delete custom card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. CREATE CUSTOM CARD FORM */}
            {activeTab === 'create' && (
              <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">Add Custom Flashcard</h3>
                    <p className="text-xs text-neutral-500">
                      Create tailored cards to practice specific workplace phrases
                    </p>
                  </div>
                </div>

                <form onSubmit={handleCreateCard} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Context / Topic (e.g. Email Request, Tech Standup, Salary Talk)
                    </label>
                    <input
                      type="text"
                      value={newFrontContext}
                      onChange={(e) => setNewFrontContext(e.target.value)}
                      placeholder="e.g. Negotiation with Client"
                      className="w-full px-3.5 py-2 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Front: Casual Thought / Scenario *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={newFront}
                      onChange={(e) => setNewFront(e.target.value)}
                      placeholder="e.g. I need to tell my client their request is going to cost more money."
                      className="w-full px-3.5 py-2 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Back: Polished Professional English *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={newBackProfessional}
                      onChange={(e) => setNewBackProfessional(e.target.value)}
                      placeholder="e.g. Expanding the initial scope will require additional engineering resources. Shall I prepare a revised statement of work for your review?"
                      className="w-full px-3.5 py-2 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Why This Works / Tone Advice (Optional)
                    </label>
                    <input
                      type="text"
                      value={newBackWhy}
                      onChange={(e) => setNewBackWhy(e.target.value)}
                      placeholder="e.g. Frames extra cost as a formal statement of work rather than a dispute."
                      className="w-full px-3.5 py-2 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('study')}
                      className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      Save Flashcard to Deck
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3.5 px-6 border-t border-neutral-100 bg-neutral-50/80 flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Spaced repetition progress is saved automatically to your profile.</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 font-semibold transition-colors cursor-pointer"
            >
              Done Practicing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
