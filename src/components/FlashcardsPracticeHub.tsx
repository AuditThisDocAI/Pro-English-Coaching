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
  ListFilter,
  CheckCircle,
  Clock,
  Briefcase,
  Mail,
  Code2,
  HeartPulse,
  MessageSquare,
  MessageSquareQuote,
  PenTool,
  AlertCircle,
  RefreshCw,
  Lock,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTTS } from '../lib/useTTS';
import { SpeakerSpeedControl } from './SpeakerSpeedControl';
import { 
  getAllDecks, 
  loadMasteryMap, 
  saveMasteryMap, 
  loadCustomFlashcards, 
  saveCustomFlashcards,
  loadReviewStats,
  incrementReviewedCount,
  loadQuizMistakes,
  recordQuizMistake,
  removeQuizMistake,
  saveQuizMistakes
} from '../lib/flashcardService';
import { getFlashcardTranslation } from '../data/flashcardDecks';
import { triggerCelebrationConfetti } from '../lib/confetti';
import { auth } from '../lib/firebase';
import { AITranslatorStudio } from './AITranslatorStudio';

interface Props {
  savedPhrases: SavedPhrase[];
  nativeLanguage: NativeLanguage;
  onLanguageChange?: (lang: NativeLanguage) => void;
  onSavePhrase?: (phrase: {
    original: string;
    professional: string;
    translation: string;
    why: string;
    practice: string;
    mode: string;
    jobType: string;
  }) => void;
  onSendToChat?: (text: string) => void;
  onOpenSavedModal?: () => void;
  onOpenPricing?: () => void;
  selectedDeckId?: string;
  onSelectDeckId?: (deckId: string) => void;
  isPro?: boolean;
}

export function FlashcardsPracticeHub({
  savedPhrases,
  nativeLanguage,
  onLanguageChange,
  onSavePhrase,
  onSendToChat,
  onOpenSavedModal,
  onOpenPricing,
  selectedDeckId: controlledDeckId,
  onSelectDeckId,
  isPro = false,
}: Props) {
  const currentUser = auth.currentUser;
  const { speak, isSpeaking, isSupported, speed } = useTTS();

  const [masteryMap, setMasteryMap] = useState<Record<string, FlashcardMastery>>(() =>
    loadMasteryMap(currentUser)
  );
  const [customCards, setCustomCards] = useState<Flashcard[]>(() =>
    loadCustomFlashcards(currentUser)
  );
  const [reviewStats, setReviewStats] = useState(() => loadReviewStats(currentUser));
  const [mistakeCardIds, setMistakeCardIds] = useState<string[]>(() => loadQuizMistakes(currentUser));

  const [internalDeckId, setInternalDeckId] = useState<string>('workplace-english');
  const activeDeckId = controlledDeckId || internalDeckId;

  const handleSetDeckId = (id: string) => {
    if (onSelectDeckId) {
      onSelectDeckId(id);
    } else {
      setInternalDeckId(id);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
    setQuizAnswered(false);
    setQuizSelectedOption(null);
  };

  const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'mistakes' | 'browse' | 'create' | 'translate'>('study');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMastery, setFilterMastery] = useState<'all' | FlashcardMastery>('all');
  const [filterLevel, setFilterLevel] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);

  // New Card Form State
  const [newFront, setNewFront] = useState('');
  const [newFrontContext, setNewFrontContext] = useState('Workplace Communication');
  const [newBackProfessional, setNewBackProfessional] = useState('');
  const [newBackWhy, setNewBackWhy] = useState('');
  const [newBackTranslation, setNewBackTranslation] = useState('');
  const [newCategory, setNewCategory] = useState('Workplace English');
  const [newGrammarNote, setNewGrammarNote] = useState('');
  const [isAutoTranslating, setIsAutoTranslating] = useState(false);

  // Quiz Mode State
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Update decks dynamically
  const decks = useMemo(() => {
    return getAllDecks(currentUser, savedPhrases, masteryMap, customCards);
  }, [currentUser, savedPhrases, masteryMap, customCards]);

  // All cards across all decks
  const allCardsList = useMemo(() => {
    const list: Flashcard[] = [];
    decks.forEach((deck) => {
      deck.cards.forEach((c) => {
        if (!list.some((existing) => existing.id === c.id)) {
          list.push(c);
        }
      });
    });
    return list;
  }, [decks]);

  // Mistakes deck cards
  const mistakesDeckCards = useMemo(() => {
    return allCardsList.filter((c) => mistakeCardIds.includes(c.id));
  }, [allCardsList, mistakeCardIds]);

  // Flattened cards for current selection
  const currentDeckCards = useMemo(() => {
    let list: Flashcard[] = [];
    if (activeTab === 'mistakes') {
      list = [...mistakesDeckCards];
    } else if (activeDeckId === 'all') {
      list = [...allCardsList];
    } else {
      const found = decks.find((d) => d.id === activeDeckId);
      list = found ? [...found.cards] : [];
    }

    if (filterMastery !== 'all') {
      list = list.filter((c) => (masteryMap[c.id] || 'new') === filterMastery);
    }

    if (filterLevel !== 'all') {
      list = list.filter((c) => c.level === filterLevel);
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
  }, [decks, allCardsList, mistakesDeckCards, activeTab, activeDeckId, filterMastery, filterLevel, searchQuery, masteryMap]);

  // Safely bounded current card
  const validIndex = Math.min(currentIndex, Math.max(0, currentDeckCards.length - 1));
  const currentCard = currentDeckCards[validIndex] || null;

  // Deck completion & stats
  const totalMastered = useMemo(() => {
    return Object.values(masteryMap).filter((m) => m === 'mastered').length;
  }, [masteryMap]);

  const totalLearning = useMemo(() => {
    return Object.values(masteryMap).filter((m) => m === 'learning').length;
  }, [masteryMap]);

  const totalCardsAllDecks = allCardsList.length;

  // Percentage progress
  const progressPercentage = useMemo(() => {
    if (currentDeckCards.length === 0) return 0;
    return Math.round(((validIndex + 1) / currentDeckCards.length) * 100);
  }, [validIndex, currentDeckCards.length]);

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
        triggerCelebrationConfetti();
        // Remove from mistakes if present
        if (mistakeCardIds.includes(cardId)) {
          const updated = removeQuizMistake(currentUser, cardId);
          setMistakeCardIds(updated);
        }
      }

      // Advance to next card
      if (validIndex < currentDeckCards.length - 1) {
        setIsFlipped(false);
        setCurrentIndex((prev) => prev + 1);
        setQuizAnswered(false);
        setQuizSelectedOption(null);
      } else {
        triggerCelebrationConfetti();
        setIsFlipped(false);
      }
    },
    [masteryMap, currentUser, validIndex, currentDeckCards.length, mistakeCardIds]
  );

  // Navigate cards
  const handleNext = useCallback(() => {
    if (validIndex < currentDeckCards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
      setQuizAnswered(false);
      setQuizSelectedOption(null);
    }
  }, [validIndex, currentDeckCards.length]);

  const handlePrev = useCallback(() => {
    if (validIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
      setQuizAnswered(false);
      setQuizSelectedOption(null);
    }
  }, [validIndex]);

  const handleShuffle = () => {
    setIsFlipped(false);
    if (currentDeckCards.length > 0) {
      setCurrentIndex(Math.floor(Math.random() * currentDeckCards.length));
    }
  };

  // Keyboard navigation for study mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight' || e.key === 'j') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1' && currentCard) {
        handleSetMastery(currentCard.id, 'new');
      } else if (e.key === '2' && currentCard) {
        handleSetMastery(currentCard.id, 'learning');
      } else if (e.key === '3' && currentCard) {
        handleSetMastery(currentCard.id, 'mastered');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleSetMastery, currentCard]);

  // Audio Pronunciation
  const handleSpeak = (text: string) => {
    speak(text, { rate: speed });
  };

  const handleCopy = (card: Flashcard) => {
    navigator.clipboard.writeText(card.backProfessional);
    setCopiedCardId(card.id);
    setTimeout(() => setCopiedCardId(null), 2000);
  };

  // Auto-translate helper for custom card creation
  const handleAutoTranslateCustomCard = async () => {
    const trimmed = newFront.trim();
    if (!trimmed) return;
    setIsAutoTranslating(true);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: trimmed,
          mode: 'general',
          jobType: 'Workplace',
          nativeLanguage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.professional) {
          setNewBackProfessional(data.professional);
          setNewBackWhy(data.why || 'Enhanced for executive clarity and professional workplace impact.');
          setNewBackTranslation(data.translation || '');
          if (!newFrontContext || newFrontContext === 'Workplace Communication') {
            setNewFrontContext('Workplace Communication');
          }
        }
      }
    } catch (err) {
      console.error('Error auto-translating custom card:', err);
    } finally {
      setIsAutoTranslating(false);
    }
  };

  // Create custom card
  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBackProfessional.trim()) return;

    const newCard: Flashcard = {
      id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      deckId: 'custom-deck',
      category: newCategory || 'Workplace English',
      frontContext: newFrontContext.trim() || 'Workplace Scenario',
      front: newFront.trim(),
      backProfessional: newBackProfessional.trim(),
      backWhy: newBackWhy.trim() || 'Custom formulated executive phrasing.',
      backTranslation: newBackTranslation.trim() || undefined,
      backPractice: 'Practice speaking this aloud in your next meeting.',
      grammarNote: newGrammarNote.trim() || undefined,
      level: 'Intermediate',
      tier: 'free',
      mastery: 'new',
      isCustom: true,
      options: [
        { text: newFront.trim(), isCorrect: false, explanation: 'Informal draft formulation.' },
        { text: newBackProfessional.trim(), isCorrect: true, explanation: 'Polished executive phrasing.' },
      ],
    };

    const updated = [newCard, ...customCards];
    setCustomCards(updated);
    saveCustomFlashcards(currentUser, updated);

    setNewFront('');
    setNewBackProfessional('');
    setNewBackWhy('');
    setNewBackTranslation('');
    setNewGrammarNote('');
    handleSetDeckId('custom-deck');
    setActiveTab('study');
    setCurrentIndex(0);
  };

  const handleAddCardFromTranslator = (cardData: {
    front: string;
    backProfessional: string;
    backWhy: string;
    backTranslation: string;
    category: string;
  }) => {
    const newCard: Flashcard = {
      id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      deckId: 'custom-deck',
      category: cardData.category || 'AI Generated',
      frontContext: `${cardData.category} • AI Translation`,
      front: cardData.front,
      backProfessional: cardData.backProfessional,
      backWhy: cardData.backWhy,
      backTranslation: cardData.backTranslation,
      backPractice: 'Practice speaking this aloud in your next meeting.',
      mastery: 'new',
      isCustom: true,
      level: 'Intermediate',
      tier: 'free',
      options: [
        { text: cardData.front, isCorrect: false, explanation: 'Casual formulation.' },
        { text: cardData.backProfessional, isCorrect: true, explanation: 'Polished professional English.' },
      ],
    };

    const updated = [newCard, ...customCards];
    setCustomCards(updated);
    saveCustomFlashcards(currentUser, updated);
  };

  const handleDeleteCustomCard = (cardId: string) => {
    const updated = customCards.filter((c) => c.id !== cardId);
    setCustomCards(updated);
    saveCustomFlashcards(currentUser, updated);
  };

  // Generate quiz options for current card
  const quizOptions = useMemo(() => {
    if (!currentCard || (activeTab !== 'quiz' && activeTab !== 'mistakes')) return [];

    // If the card already has predefined options, use them
    if (currentCard.options && currentCard.options.length >= 2) {
      return [...currentCard.options];
    }

    const correct = currentCard.backProfessional;
    const otherCards = allCardsList.filter((c) => c.id !== currentCard.id);
    const shuffledOthers = [...otherCards].sort(() => 0.5 - Math.random()).slice(0, 2);

    const distractor1 = shuffledOthers[0]?.backProfessional || 'Please ensure you complete this at your earliest convenience.';
    const distractor2 = shuffledOthers[1]?.backProfessional || 'I wanted to circle back regarding our discussion yesterday.';

    const rawOptions = [
      { text: correct, isCorrect: true, explanation: currentCard.backWhy || 'Polite, proactive, and professional.' },
      { text: distractor1, isCorrect: false, explanation: 'Contextually mismatched for this specific scenario.' },
      { text: distractor2, isCorrect: false, explanation: 'Less direct and does not address the core prompt.' },
    ];

    return rawOptions.sort(() => 0.5 - Math.random());
  }, [currentCard, allCardsList, activeTab]);

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
      // If was in mistakes, remove it
      if (mistakeCardIds.includes(currentCard.id)) {
        const updated = removeQuizMistake(currentUser, currentCard.id);
        setMistakeCardIds(updated);
      }
    } else if (!isCorrect && currentCard) {
      // Record mistake for Review Mistakes section
      const updated = recordQuizMistake(currentUser, currentCard.id);
      setMistakeCardIds(updated);
    }
  };

  const handleRetryCurrentCard = () => {
    setQuizAnswered(false);
    setQuizSelectedOption(null);
  };

  const handleClearAllMistakes = () => {
    saveQuizMistakes(currentUser, []);
    setMistakeCardIds([]);
  };

  // Helper for deck icons
  const renderDeckIcon = (deckId: string) => {
    switch (deckId) {
      case 'workplace-english':
      case 'executive-email':
        return <Mail className="w-4 h-4 text-emerald-600" />;
      case 'interview-english':
      case 'interview-power':
        return <Briefcase className="w-4 h-4 text-teal-600" />;
      case 'everyday-english':
        return <MessageSquare className="w-4 h-4 text-amber-600" />;
      case 'grammar-boosters':
      case 'diplomatic-idioms':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'customer-healthcare':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      case 'saved-vault':
        return <Bookmark className="w-4 h-4 text-amber-600" />;
      case 'custom-deck':
        return <PenTool className="w-4 h-4 text-teal-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 1. Header Metrics & Tier Status Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-neutral-900 to-teal-950 rounded-3xl p-5 sm:p-7 text-white shadow-xl border border-emerald-900/50 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              English Coaching Hub
            </span>
            {isPro ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-[10px] font-bold">
                <Zap className="w-3 h-3 fill-amber-300" /> Subscription: 100+ Monthly Cards
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 text-[10px] font-bold">
                <Clock className="w-3 h-3" /> Free Trial: 20 Cards (3-Day Access)
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Workplace & Interview Practice Flashcards
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-1 leading-relaxed">
            Master polite emails, STAR interview questions, daily conversational English, and diplomatic idioms with 3D flip study, instant quizzes, and mistakes review.
          </p>
        </div>

        {/* Live Metrics */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15 text-center min-w-[85px]">
            <div className="flex items-center justify-center gap-1 text-amber-400 font-extrabold text-base sm:text-lg">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{reviewStats.streakDays || 1}d</span>
            </div>
            <p className="text-[10px] text-neutral-300 font-semibold uppercase tracking-wider">Streak</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15 text-center min-w-[85px]">
            <div className="flex items-center justify-center gap-1 text-emerald-400 font-extrabold text-base sm:text-lg">
              <CheckCircle className="w-4 h-4" />
              <span>{totalMastered}</span>
            </div>
            <p className="text-[10px] text-neutral-300 font-semibold uppercase tracking-wider">Mastered</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15 text-center min-w-[85px]">
            <div className="flex items-center justify-center gap-1 text-teal-300 font-extrabold text-base sm:text-lg">
              <Clock className="w-4 h-4" />
              <span>{reviewStats.reviewedTodayCount || 0}</span>
            </div>
            <p className="text-[10px] text-neutral-300 font-semibold uppercase tracking-wider">Today</p>
          </div>

          {mistakeCardIds.length > 0 && (
            <button
              onClick={() => setActiveTab('mistakes')}
              className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-red-400/30 text-center min-w-[85px] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center gap-1 text-red-300 font-extrabold text-base sm:text-lg">
                <AlertCircle className="w-4 h-4 text-red-300" />
                <span>{mistakeCardIds.length}</span>
              </div>
              <p className="text-[10px] text-red-200 font-semibold uppercase tracking-wider">Mistakes</p>
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Tabs & Horizontal Carousel */}
      <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-neutral-200 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-neutral-800 uppercase tracking-wider">
              Topic Decks:
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              ({totalCardsAllDecks} total cards available)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Level Filter */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-[11px] font-semibold text-neutral-600">
              <span className="px-2 text-neutral-400 uppercase text-[9px] font-bold">Level:</span>
              {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                    filterLevel === lvl
                      ? 'bg-white text-neutral-900 font-bold shadow-2xs'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('create')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Card</span>
            </button>
          </div>
        </div>

        {/* Deck Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => handleSetDeckId('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 border cursor-pointer ${
              activeDeckId === 'all' && activeTab !== 'mistakes'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Topics ({totalCardsAllDecks})</span>
          </button>

          {decks.map((deck) => {
            const isSelected = activeDeckId === deck.id && activeTab !== 'mistakes';
            const masteredInDeck = deck.cards.filter((c) => (masteryMap[c.id] || 'new') === 'mastered').length;

            return (
              <button
                key={deck.id}
                onClick={() => handleSetDeckId(deck.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {renderDeckIcon(deck.id)}
                <span>{deck.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-emerald-700 text-white' : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {masteredInDeck}/{deck.cards.length}
                </span>
              </button>
            );
          })}

          {mistakeCardIds.length > 0 && (
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 border cursor-pointer ${
                activeTab === 'mistakes'
                  ? 'bg-red-600 text-white border-red-600 shadow-xs'
                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Review Mistakes ({mistakeCardIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Practice Workspace Card */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-md overflow-hidden flex flex-col">
        {/* Workspace Toolbar Tabs */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-neutral-100 bg-neutral-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Active Deck Title */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
              {activeTab === 'mistakes' ? <AlertCircle className="w-4 h-4 text-red-600" /> : renderDeckIcon(activeDeckId)}
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm text-neutral-900 truncate">
                {activeTab === 'mistakes'
                  ? 'Mistakes Review Deck'
                  : activeDeckId === 'all'
                  ? 'All Flashcards Deck'
                  : decks.find((d) => d.id === activeDeckId)?.title || 'Flashcard Deck'}
              </h3>
              <p className="text-[11px] text-neutral-500 hidden sm:block truncate">
                {activeTab === 'mistakes'
                  ? 'Reinforce concepts you missed'
                  : activeDeckId === 'all'
                  ? 'Studying workplace communication and grammar'
                  : decks.find((d) => d.id === activeDeckId)?.description || ''}
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 sm:gap-0 sm:bg-neutral-200/70 p-1 rounded-xl text-[10px] sm:text-xs font-semibold w-full sm:w-auto overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => {
                setActiveTab('study');
                setIsFlipped(false);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'study'
                  ? 'bg-white text-neutral-900 shadow-2xs font-bold border sm:border-none border-neutral-200'
                  : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100 sm:bg-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>3D Flip</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('quiz');
                setQuizAnswered(false);
                setQuizSelectedOption(null);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'quiz'
                  ? 'bg-white text-neutral-900 shadow-2xs font-bold border sm:border-none border-neutral-200'
                  : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100 sm:bg-transparent'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Quiz</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('mistakes');
                setQuizAnswered(false);
                setQuizSelectedOption(null);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'mistakes'
                  ? 'bg-red-600 text-white shadow-2xs font-bold border sm:border-none border-red-600'
                  : mistakeCardIds.length > 0
                  ? 'text-red-700 hover:bg-red-100/60 bg-red-50 sm:bg-transparent'
                  : 'text-neutral-400 bg-neutral-50 sm:bg-transparent'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Mistakes ({mistakeCardIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('browse')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'browse'
                  ? 'bg-white text-neutral-900 shadow-2xs font-bold border sm:border-none border-neutral-200'
                  : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100 sm:bg-transparent'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5 text-blue-600" />
              <span>Browse</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('translate')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'translate'
                  ? 'bg-emerald-600 text-white shadow-2xs font-bold border sm:border-none border-emerald-600'
                  : 'text-emerald-700 hover:text-emerald-900 bg-emerald-50 sm:bg-transparent sm:hover:bg-emerald-100/50'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>Translate</span>
            </button>
          </div>
        </div>

        {/* Mode Content Area */}
        <div className="p-5 sm:p-8 bg-neutral-50/40 flex-1">
          {/* 1. 3D FLIP STUDY MODE */}
          {activeTab === 'study' && (
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              {currentDeckCards.length === 0 ? (
                <div className="text-center py-12 px-6 bg-white rounded-3xl border border-neutral-200 w-full shadow-sm">
                  <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-neutral-800 mb-1">No cards matching your filter</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-5">
                    Adjust your level filter or add your own custom flashcards to start practicing.
                  </p>
                  <button
                    onClick={() => {
                      setFilterLevel('all');
                      setFilterMastery('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Top Progress Bar & Status */}
                  <div className="w-full space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 px-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-neutral-200/80 px-2.5 py-1 rounded-lg text-xs font-bold text-neutral-800">
                          Card {validIndex + 1} of {currentDeckCards.length}
                        </span>
                        {currentCard?.level && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {currentCard.level}
                          </span>
                        )}
                        {currentCard?.tier && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            currentCard.tier === 'pro' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {currentCard.tier === 'pro' ? 'Pro Tier' : 'Free Tier'}
                          </span>
                        )}
                      </div>

                      {/* Playback speed & Shuffle */}
                      <div className="flex items-center gap-2">
                        {isSupported && (
                          <SpeakerSpeedControl variant="compact" idPrefix="flashcards-card-speed" />
                        )}
                        <button
                          onClick={handleShuffle}
                          className="p-1.5 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/60 rounded-lg transition-colors cursor-pointer bg-white border border-neutral-200 shadow-2xs"
                          title="Shuffle cards"
                        >
                          <Shuffle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Completion Progress Bar */}
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-emerald-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* 3D Flip Card Container */}
                  <div
                    className="w-full min-h-[350px] sm:min-h-[390px] perspective-[1200px] cursor-pointer"
                    onClick={handleFlip}
                  >
                    <motion.div
                      className="w-full h-full relative preserve-3d transition-transform duration-500"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      {/* FRONT FACE */}
                      <div
                        className={`absolute inset-0 w-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200 shadow-md hover:border-emerald-400/80 transition-all flex flex-col justify-between ${
                          isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
                        }`}
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-emerald-600" />
                              {currentCard?.frontContext || currentCard?.category || 'Workplace Scenario'}
                            </span>
                            <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
                              <RotateCw className="w-3 h-3" /> Tap to reveal
                            </span>
                          </div>

                          <div className="my-6">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                              Question / Casual Thought:
                            </span>
                            <h4 className="text-xl sm:text-2xl font-extrabold text-neutral-900 leading-snug tracking-tight">
                              "{currentCard?.front}"
                            </h4>
                          </div>

                          {currentCard?.options && currentCard.options.length > 0 && (
                            <div className="space-y-2 mt-4 pointer-events-none">
                              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                                Multiple Choice Options:
                              </span>
                              {currentCard.options.map((opt, i) => (
                                <div
                                  key={i}
                                  className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-700 flex items-center gap-2"
                                >
                                  <span className="w-5 h-5 rounded-full bg-neutral-200 font-bold text-[10px] flex items-center justify-center text-neutral-700 shrink-0">
                                    {String.fromCharCode(65 + i)}
                                  </span>
                                  <span>{opt.text}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                          <span className="text-neutral-400">Tap anywhere to flip card</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFlip();
                            }}
                            className="text-emerald-700 font-bold hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Reveal Answer</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* BACK FACE */}
                      <div
                        className={`absolute inset-0 rotate-y-180 w-full bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-400/80 shadow-lg flex flex-col justify-between overflow-y-auto ${
                          !isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
                        }`}
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              Polite & Professional Response
                            </span>

                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              {isSupported && currentCard && (
                                <button
                                  type="button"
                                  onClick={() => handleSpeak(currentCard.backProfessional)}
                                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                                    isSpeaking(currentCard.backProfessional)
                                      ? 'bg-emerald-600 text-white animate-pulse shadow-xs'
                                      : 'text-neutral-600 hover:text-emerald-800 hover:bg-emerald-100'
                                  }`}
                                  title="Listen to native pronunciation"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              )}

                              {currentCard && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(currentCard)}
                                  className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                                  title="Copy professional phrasing"
                                >
                                  {copiedCardId === currentCard.id ? (
                                    <Check className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Executive Phrasing */}
                          <div>
                            <p className="text-base sm:text-lg font-extrabold text-neutral-900 leading-snug">
                              "{currentCard?.backProfessional}"
                            </p>
                          </div>

                          {/* Why This Works */}
                          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-emerald-100 text-xs text-neutral-700 shadow-2xs space-y-1">
                            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-[11px] uppercase tracking-wider">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span>Why This Works & Etiquette:</span>
                            </div>
                            <p className="leading-relaxed text-neutral-700">{currentCard?.backWhy}</p>
                          </div>

                          {/* Grammar Note */}
                          {currentCard?.grammarNote && (
                            <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs text-purple-900 shadow-2xs space-y-1">
                              <div className="flex items-center gap-1.5 text-purple-900 font-bold text-[11px] uppercase tracking-wider">
                                <GraduationCap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                                <span>Grammar & Vocabulary Note:</span>
                              </div>
                              <p className="leading-relaxed text-purple-800">{currentCard.grammarNote}</p>
                            </div>
                          )}

                          {/* Native Translation if available */}
                          {currentCard && (
                            <div className="p-3 rounded-2xl bg-white/95 border border-emerald-100 text-xs text-neutral-800 shadow-2xs" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px] uppercase tracking-wider">
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
                                  className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md transition-colors cursor-pointer"
                                  title={`Copy ${nativeLanguage} translation`}
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="font-semibold text-neutral-800 leading-relaxed text-xs sm:text-sm">
                                {getFlashcardTranslation(currentCard, nativeLanguage) || 'Translation available in interactive practice.'}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-emerald-200/50 flex items-center justify-between text-xs text-neutral-500">
                          <span className="text-[11px] text-neutral-400">Click card or Space to flip back</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFlip();
                            }}
                            className="text-emerald-700 font-bold hover:text-emerald-800 cursor-pointer"
                          >
                            Flip Back
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Navigation & Mastery Controls */}
                  <div className="w-full mt-5 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-sm">
                    {/* Spaced Repetition Mastery Buttons */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        disabled={!currentCard}
                        onClick={() => currentCard && handleSetMastery(currentCard.id, 'new')}
                        className="px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Again / Reset (Shortcut: Key 1)"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Again</span>
                        <kbd className="hidden sm:inline text-[9px] bg-neutral-200 px-1 rounded text-neutral-600 font-mono">1</kbd>
                      </button>

                      <button
                        type="button"
                        disabled={!currentCard}
                        onClick={() => currentCard && handleSetMastery(currentCard.id, 'learning')}
                        className="px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Getting There (Shortcut: Key 2)"
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
                        title="Mastered! (Shortcut: Key 3)"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Mastered!</span>
                        <kbd className="hidden sm:inline text-[9px] bg-emerald-700 px-1 rounded text-emerald-100 font-mono">3</kbd>
                      </button>
                    </div>

                    {/* Prev / Next Navigation */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={validIndex === 0}
                        onClick={handlePrev}
                        className="px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 disabled:opacity-30 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                        title="Previous Card (← ArrowLeft)"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Prev</span>
                      </button>
                      <button
                        type="button"
                        disabled={validIndex >= currentDeckCards.length - 1}
                        onClick={handleNext}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-30 transition-colors text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                        title="Next Card (→ ArrowRight)"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 2. QUIZ PANEL MODE */}
          {(activeTab === 'quiz' || activeTab === 'mistakes') && (
            <div className="max-w-2xl mx-auto">
              {currentCard ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-md space-y-6">
                  {/* Quiz Top Header & Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                          activeTab === 'mistakes' ? 'text-red-700 bg-red-50' : 'text-emerald-700 bg-emerald-50'
                        }`}>
                          {activeTab === 'mistakes' ? 'Mistakes Reinforcement' : 'Quiz Challenge'} • Card {validIndex + 1} of {currentDeckCards.length}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                          {progressPercentage}% Completed
                        </span>
                      </div>
                      <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-lg">
                        Score: {quizScore.correct} / {quizScore.total}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          activeTab === 'mistakes' ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Question / Prompt */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                      Question / Scenario Prompt:
                    </span>
                    <p className="text-lg sm:text-xl font-extrabold text-neutral-900 leading-snug">
                      "{currentCard.front}"
                    </p>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider block">
                        Select the most polite and professional executive response:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold border border-amber-200">
                          Yellow = Selected
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold border border-emerald-200">
                          Green = Correct
                        </span>
                      </div>
                    </div>
                    {quizOptions.map((opt, idx) => {
                      const isSelected = quizSelectedOption === idx;
                      let btnStyle = 'bg-white hover:bg-amber-50/60 border-neutral-200 hover:border-amber-400 text-neutral-800';

                      if (quizAnswered) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs';
                        } else if (isSelected && !opt.isCorrect) {
                          btnStyle = 'bg-amber-50 border-2 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400/30 shadow-xs';
                        } else {
                          btnStyle = 'opacity-50 bg-neutral-50 border-neutral-200 text-neutral-500';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizAnswered}
                          onClick={() => handleSelectQuizOption(idx, opt.isCorrect)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm leading-relaxed flex items-start gap-3.5 cursor-pointer shadow-2xs ${btnStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-full border border-current flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 ${
                            quizAnswered && opt.isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : quizAnswered && isSelected && !opt.isCorrect
                              ? 'bg-amber-500 text-white border-amber-500'
                              : ''
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-neutral-900">{opt.text}</p>
                              {quizAnswered && opt.isCorrect && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold shrink-0">
                                  Correct Answer (Green)
                                </span>
                              )}
                              {quizAnswered && isSelected && !opt.isCorrect && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold shrink-0">
                                  Your Choice (Yellow)
                                </span>
                              )}
                            </div>
                            {quizAnswered && opt.explanation && (
                              <p className={`text-[11px] mt-1.5 font-medium ${opt.isCorrect ? 'text-emerald-800' : 'text-neutral-600'}`}>
                                {opt.explanation}
                              </p>
                            )}
                          </div>
                          {quizAnswered && opt.isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {quizAnswered && isSelected && !opt.isCorrect && (
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Post-Answer Feedback & Grammar Rationale */}
                  {quizAnswered && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span>Correct Answer Explanation:</span>
                        </div>
                        {isSupported && (
                          <button
                            type="button"
                            onClick={() => handleSpeak(currentCard.backProfessional)}
                            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded-lg border border-emerald-200"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen</span>
                          </button>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                        {currentCard.backWhy}
                      </p>

                      {currentCard.grammarNote && (
                        <div className="pt-2 border-t border-emerald-200/60 text-xs text-emerald-800">
                          <strong className="text-emerald-950">Grammar Note: </strong>
                          {currentCard.grammarNote}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={handleRetryCurrentCard}
                          className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Retry Card</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Next Challenge</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Navigation Bar in Quiz Panel */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      disabled={validIndex === 0}
                      onClick={handlePrev}
                      className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 disabled:opacity-30 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Question</span>
                    </button>

                    <button
                      type="button"
                      disabled={validIndex >= currentDeckCards.length - 1}
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-30 transition-colors text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 px-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-lg font-extrabold text-neutral-900">
                    {activeTab === 'mistakes' ? 'No Quiz Mistakes Remaining!' : 'Deck Quiz Completed!'}
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    {activeTab === 'mistakes'
                      ? 'You have mastered all previously missed flashcards with 100% accuracy.'
                      : `You finished all questions with a final score of ${quizScore.correct} / ${quizScore.total}.`}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setCurrentIndex(0);
                        setQuizAnswered(false);
                        setQuizSelectedOption(null);
                        setQuizScore({ correct: 0, total: 0 });
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restart Quiz</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('study')}
                      className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Back to Flip Cards</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. BROWSE ALL CARDS IN DECK */}
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
                    placeholder="Search flashcards by scenario, keywords, or executive wording..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
                  <span>Status:</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {currentDeckCards.map((card) => {
                  const speaking = isSpeaking(card.backProfessional);
                  return (
                    <div
                      key={card.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-2xs hover:border-neutral-300 transition-all flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                            {card.frontContext || card.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {card.level && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                                {card.level}
                              </span>
                            )}
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
                        </div>

                        <p className="text-xs text-neutral-500 italic mb-2">"{card.front}"</p>
                        <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                          {card.backProfessional}
                        </p>
                        <p className="text-[11px] text-neutral-600 mt-2.5 bg-neutral-50 p-2.5 rounded-xl leading-relaxed">
                          {card.backWhy}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
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
                            title="Copy phrasing"
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
                            className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
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
                    Create personalized cards for your job or specific workplace challenges
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateCard} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Category Topic
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium text-neutral-800"
                  >
                    <option value="Workplace English">Workplace English</option>
                    <option value="Interview English">Interview English</option>
                    <option value="Everyday English">Everyday English</option>
                    <option value="Grammar & Vocab">Grammar & Vocabulary Boosters</option>
                    <option value="Client Care & Empathy">Client Care & Empathy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Context / Topic (e.g. Email Request, Team Standup, Salary Negotiation)
                  </label>
                  <input
                    type="text"
                    value={newFrontContext}
                    onChange={(e) => setNewFrontContext(e.target.value)}
                    placeholder="e.g. Negotiation with Client"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Front: Casual Thought / Scenario *
                    </label>
                    <button
                      type="button"
                      disabled={isAutoTranslating || !newFront.trim()}
                      onClick={handleAutoTranslateCustomCard}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 disabled:opacity-50 text-emerald-800 font-bold text-[11px] transition-all cursor-pointer shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isAutoTranslating ? 'Translating...' : 'AI Auto-Translate & Polish'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={newFront}
                    onChange={(e) => setNewFront(e.target.value)}
                    placeholder={`e.g. "How do you respond when your manager asks for a quick update?" or enter in ${nativeLanguage}...`}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
                    placeholder="e.g. Sure, I’ll summarize the progress so far and highlight our next milestone."
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Translation in {nativeLanguage} (Optional)
                  </label>
                  <input
                    type="text"
                    value={newBackTranslation}
                    onChange={(e) => setNewBackTranslation(e.target.value)}
                    placeholder={`Native translation in ${nativeLanguage}...`}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
                    placeholder="e.g. Polite, proactive, and professional, giving immediate reassurance."
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Grammar / Vocabulary Booster Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={newGrammarNote}
                    onChange={(e) => setNewGrammarNote(e.target.value)}
                    placeholder="e.g. Using modal phrases like 'Sure, I will...' projects cooperative readiness."
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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

          {/* 5. AI LIVE TRANSLATOR & COACH STUDIO */}
          {activeTab === 'translate' && (
            <div className="max-w-3xl mx-auto">
              <AITranslatorStudio
                nativeLanguage={nativeLanguage}
                onLanguageChange={(lang) => {
                  if (onLanguageChange) onLanguageChange(lang);
                }}
                onSavePhrase={(phrase) => {
                  if (onSavePhrase) onSavePhrase(phrase);
                }}
                onAddCustomFlashcard={handleAddCardFromTranslator}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
