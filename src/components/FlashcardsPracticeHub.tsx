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
  GraduationCap,
  AlertTriangle,
  XCircle,
  Globe
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
import { 
  translateText, 
  getFlashcardPromptTranslation, 
  getQuizOptionsTranslations 
} from '../lib/translationService';
import { 
  BASIC_ENGLISH_TOPICS, 
  PRESET_STARTER_PACKS, 
  generateBasicEnglishCards, 
  StarterCardPack 
} from '../lib/cardGeneratorService';
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
  isExpired?: boolean;
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
  isExpired = false,
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
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);

  // App Card Generator & Starter Packs State
  const [createSubTab, setCreateSubTab] = useState<'generate' | 'packs' | 'manual'>('generate');
  const [genTopic, setGenTopic] = useState<string>('Supermarket & Shopping');
  const [genCustomTopic, setGenCustomTopic] = useState<string>('');
  const [genCount, setGenCount] = useState<number>(3);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
  const [addedCardIds, setAddedCardIds] = useState<string[]>([]);
  const [generatorSuccessMessage, setGeneratorSuccessMessage] = useState<string | null>(null);

  // New Card Form State (Manual Creation)
  const [newFront, setNewFront] = useState('');
  const [newFrontContext, setNewFrontContext] = useState('Everyday Conversation');
  const [newBackProfessional, setNewBackProfessional] = useState('');
  const [newBackWhy, setNewBackWhy] = useState('');
  const [newBackTranslation, setNewBackTranslation] = useState('');
  const [newCategory, setNewCategory] = useState('Everyday English');
  const [newGrammarNote, setNewGrammarNote] = useState('');
  const [isAutoTranslating, setIsAutoTranslating] = useState(false);

  // Quiz Mode State
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Translation Support State
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [showFrontTranslation, setShowFrontTranslation] = useState<boolean>(false);
  const [translatedPrompt, setTranslatedPrompt] = useState<string>('');
  const [translatedOptions, setTranslatedOptions] = useState<Record<number, string>>({});
  const [translatedCorrection, setTranslatedCorrection] = useState<string>('');
  const [isTranslatingCard, setIsTranslatingCard] = useState<boolean>(false);

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
  }, [decks, allCardsList, mistakesDeckCards, activeTab, activeDeckId, filterMastery, searchQuery, masteryMap]);

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
      setShowFrontTranslation(false);
      setCurrentIndex((prev) => prev + 1);
      setQuizAnswered(false);
      setQuizSelectedOption(null);
    }
  }, [validIndex, currentDeckCards.length]);

  const handlePrev = useCallback(() => {
    if (validIndex > 0) {
      setIsFlipped(false);
      setShowFrontTranslation(false);
      setCurrentIndex((prev) => prev - 1);
      setQuizAnswered(false);
      setQuizSelectedOption(null);
    }
  }, [validIndex]);

  const handleShuffle = () => {
    setIsFlipped(false);
    setShowFrontTranslation(false);
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
          jobType: 'Everyday English',
          nativeLanguage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.professional) {
          setNewBackProfessional(data.professional);
          setNewBackWhy(data.why || 'Natural everyday phrasing for friendly and fluent communication.');
          setNewBackTranslation(data.translation || '');
          if (!newFrontContext || newFrontContext === 'Everyday Conversation') {
            setNewFrontContext('Everyday Conversation');
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
      category: newCategory || 'Everyday English',
      frontContext: newFrontContext.trim() || 'Daily Life',
      front: newFront.trim(),
      backProfessional: newBackProfessional.trim(),
      backWhy: newBackWhy.trim() || 'Natural everyday phrasing.',
      backTranslation: newBackTranslation.trim() || undefined,
      backPractice: 'Practice saying this aloud with clear pronunciation.',
      grammarNote: newGrammarNote.trim() || undefined,
      level: 'Beginner',
      tier: 'free',
      mastery: 'new',
      isCustom: true,
      options: [
        { text: newFront.trim(), isCorrect: false, explanation: 'Informal draft formulation.' },
        { text: newBackProfessional.trim(), isCorrect: true, explanation: 'Polished everyday phrasing.' },
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

  // Card Generator Actions
  const handleGenerateCards = async () => {
    if (isExpired && onOpenPricing) {
      onOpenPricing();
      return;
    }
    const topicToUse = genCustomTopic.trim() || genTopic;
    setIsGenerating(true);
    setGeneratorSuccessMessage(null);
    try {
      const cards = await generateBasicEnglishCards(topicToUse, nativeLanguage, genCount);
      setGeneratedCards(cards);
    } catch (err) {
      console.error('Failed to generate cards:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddSingleGeneratedCard = (card: Flashcard) => {
    if (addedCardIds.includes(card.id)) return;
    const formattedCard: Flashcard = {
      ...card,
      deckId: 'custom-deck',
      level: 'Beginner',
      tier: 'free',
      isCustom: true,
    };
    const updated = [formattedCard, ...customCards];
    setCustomCards(updated);
    saveCustomFlashcards(currentUser, updated);
    setAddedCardIds((prev) => [...prev, card.id]);
    setGeneratorSuccessMessage(`Added "${card.front}" to your deck!`);
    setTimeout(() => setGeneratorSuccessMessage(null), 3500);
  };

  const handleAddAllGeneratedCards = () => {
    const unadded = generatedCards.filter((c) => !addedCardIds.includes(c.id));
    if (unadded.length === 0) return;
    const formatted = unadded.map((c) => ({
      ...c,
      deckId: 'custom-deck',
      level: 'Beginner' as const,
      tier: 'free' as const,
      isCustom: true,
    }));
    const updated = [...formatted, ...customCards];
    setCustomCards(updated);
    saveCustomFlashcards(currentUser, updated);
    setAddedCardIds((prev) => [...prev, ...unadded.map((c) => c.id)]);
    triggerCelebrationConfetti();
    setGeneratorSuccessMessage(`Success! Added all ${unadded.length} basic English cards to your deck.`);
    setTimeout(() => setGeneratorSuccessMessage(null), 4000);
  };

  const handleAddStarterPack = (pack: StarterCardPack) => {
    const newCards = pack.cards.map((c) => ({
      ...c,
      id: `pack_${pack.id}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      deckId: 'custom-deck',
      level: 'Beginner' as const,
      tier: 'free' as const,
      isCustom: true,
    }));
    const updated = [...newCards, ...customCards];
    setCustomCards(updated);
    saveCustomFlashcards(currentUser, updated);
    triggerCelebrationConfetti();
    setGeneratorSuccessMessage(`Added "${pack.title}" (${pack.cards.length} cards) to your flashcards!`);
    handleSetDeckId('custom-deck');
    setActiveTab('study');
    setCurrentIndex(0);
    setTimeout(() => setGeneratorSuccessMessage(null), 4000);
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
      frontContext: `${cardData.category} • Basic English`,
      front: cardData.front,
      backProfessional: cardData.backProfessional,
      backWhy: cardData.backWhy,
      backTranslation: cardData.backTranslation,
      backPractice: 'Practice speaking this aloud in your daily conversation.',
      mastery: 'new',
      isCustom: true,
      level: 'Beginner',
      tier: 'free',
      options: [
        { text: cardData.front, isCorrect: false, explanation: 'Casual or draft formulation.' },
        { text: cardData.backProfessional, isCorrect: true, explanation: 'Clear, polite Basic English.' },
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

  // Translation Effect for Prompt, Options, and Feedback
  useEffect(() => {
    if (!currentCard) {
      setTranslatedPrompt('');
      setTranslatedOptions({});
      setTranslatedCorrection('');
      return;
    }

    let isMounted = true;

    // 1. Translate Front Prompt if translation is requested
    if (showTranslation || showFrontTranslation) {
      getFlashcardPromptTranslation(currentCard, nativeLanguage).then((res) => {
        if (isMounted && res) {
          setTranslatedPrompt(res);
        }
      });
    }

    // 2. Translate Quiz Options & Explanations when translation is active
    if (showTranslation) {
      setIsTranslatingCard(true);

      if (quizOptions.length > 0) {
        getQuizOptionsTranslations(quizOptions, nativeLanguage).then((opts) => {
          if (isMounted && opts) {
            const map: Record<number, string> = {};
            opts.forEach((t, i) => {
              map[i] = t;
            });
            setTranslatedOptions(map);
          }
        });
      }

      const textToTranslate = currentCard.backWhy || currentCard.backProfessional;
      translateText(textToTranslate, nativeLanguage).then((res) => {
        if (isMounted) {
          if (res) setTranslatedCorrection(res);
          setIsTranslatingCard(false);
        }
      }).catch(() => {
        if (isMounted) setIsTranslatingCard(false);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [currentCard?.id, nativeLanguage, showTranslation, showFrontTranslation, quizOptions]);

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
            Everyday English Practice Flashcards
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-1 leading-relaxed">
            Master everyday greetings, café ordering, travel directions, and friendly conversations with 3D flip study, instant quizzes, and mistakes review.
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
            {/* Basic English Only Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Basic English Only (A1–A2)</span>
            </div>

            <button
              onClick={() => setActiveTab('create')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 bg-emerald-100/80 hover:bg-emerald-200/80 border border-emerald-300 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Generate Cards</span>
            </button>
          </div>
        </div>

        {/* Mobile Topic Deck Dropdown Selector */}
        <div className="block sm:hidden w-full pt-1">
          <label className="block text-[10px] font-extrabold text-neutral-500 uppercase tracking-wider mb-1">
            Choose Topic Deck (Tap to switch):
          </label>
          <select
            value={activeTab === 'mistakes' ? 'mistakes' : activeDeckId}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'mistakes') {
                setActiveTab('mistakes');
              } else {
                handleSetDeckId(val);
                if (activeTab === 'mistakes') setActiveTab('study');
              }
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 font-bold text-xs shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">🌟 All Topics ({totalCardsAllDecks} total cards)</option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.title} ({deck.cards.length} cards)
              </option>
            ))}
            {mistakeCardIds.length > 0 && (
              <option value="mistakes">⚠️ Mistakes Review ({mistakeCardIds.length} cards)</option>
            )}
          </select>
        </div>

        {/* Deck Navigation Pills (Desktop Only) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
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
              onClick={() => setActiveTab('create')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'create'
                  ? 'bg-emerald-600 text-white shadow-2xs font-bold border sm:border-none border-emerald-600'
                  : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100 sm:bg-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Generate Cards</span>
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
                    Generate Basic English cards or choose a different deck to start practicing.
                  </p>
                  <button
                    onClick={() => {
                      setFilterMastery('all');
                      setSearchQuery('');
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
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Basic English
                        </span>
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
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowFrontTranslation((prev) => !prev);
                                }}
                                className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 transition-all cursor-pointer"
                                title={`Translate scenario to ${nativeLanguage}`}
                              >
                                <Languages className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{showFrontTranslation ? 'Hide Translation' : `Translate (${nativeLanguage})`}</span>
                              </button>
                              <span className="text-[11px] font-semibold text-neutral-400 hidden sm:flex items-center gap-1">
                                <RotateCw className="w-3 h-3" /> Tap to reveal
                              </span>
                            </div>
                          </div>

                          <div className="my-6">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                              Question / Casual Thought:
                            </span>
                            <h4 className="text-xl sm:text-2xl font-extrabold text-neutral-900 leading-snug tracking-tight">
                              "{currentCard?.front}"
                            </h4>

                            {showFrontTranslation && (
                              <div
                                className="mt-3 p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5 shadow-2xs"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Languages className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-800 block mb-0.5">
                                    {nativeLanguage} Translation:
                                  </span>
                                  <p className="font-medium text-emerald-950 leading-relaxed">
                                    {translatedPrompt || 'Translating prompt...'}
                                  </p>
                                </div>
                              </div>
                            )}
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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                          activeTab === 'mistakes' ? 'text-rose-700 bg-rose-50 border border-rose-200' : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        }`}>
                          {activeTab === 'mistakes' ? 'Mistakes Practice' : 'Topic Quiz'} • Question {validIndex + 1} of {currentDeckCards.length}
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
                          activeTab === 'mistakes' ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>

                    {/* Translation Toggle Bar */}
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
                      <div className="flex items-center gap-2">
                        <Languages className="w-4 h-4 text-emerald-700" />
                        <span className="font-bold text-emerald-950">
                          Native Translation ({nativeLanguage}):
                        </span>
                        {isTranslatingCard && (
                          <span className="text-[10px] text-emerald-700 animate-pulse font-medium">Translating...</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowTranslation((prev) => !prev)}
                        className={`px-3 py-1 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                          showTranslation
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                        }`}
                        title="Toggle native language translation of scenario, options, and corrections"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{showTranslation ? 'Hide Translation' : `Show in ${nativeLanguage}`}</span>
                      </button>
                    </div>
                  </div>

                  {/* Question / Prompt */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                      Daily Scenario / Prompt:
                    </span>
                    <p className="text-lg sm:text-xl font-extrabold text-neutral-900 leading-snug">
                      "{currentCard.front}"
                    </p>

                    {/* Translated Prompt */}
                    {showTranslation && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2 shadow-2xs"
                      >
                        <Languages className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-800 block mb-0.5">
                            {nativeLanguage} Translation:
                          </span>
                          <p className="font-medium text-emerald-950 leading-relaxed text-xs sm:text-sm">
                            {translatedPrompt || 'Translating prompt...'}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider block">
                        Select the most natural, polite daily English response:
                      </span>
                      {quizAnswered && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold border border-emerald-200">
                            Green = Correct
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold border border-amber-200">
                            Yellow = Incorrect
                          </span>
                        </div>
                      )}
                    </div>
                    {quizOptions.map((opt, idx) => {
                      const isSelected = quizSelectedOption === idx;
                      let btnStyle = 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800';

                      if (quizAnswered) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs';
                        } else if (isSelected && !opt.isCorrect) {
                          btnStyle = 'bg-amber-50 border-2 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400/30 shadow-xs';
                        } else {
                          btnStyle = 'opacity-45 bg-neutral-50 border-neutral-200 text-neutral-400';
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
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold shrink-0 flex items-center gap-1">
                                  <Check className="w-3 h-3 text-emerald-700" />
                                  Correct Answer
                                </span>
                              )}
                              {quizAnswered && isSelected && !opt.isCorrect && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold shrink-0 flex items-center gap-1">
                                  <XCircle className="w-3 h-3 text-amber-700" />
                                  Your Choice (Incorrect)
                                </span>
                              )}
                            </div>
                            {/* Option Translation */}
                            {showTranslation && translatedOptions[idx] && (
                              <p className="text-xs mt-1 text-neutral-600 font-medium italic">
                                "{translatedOptions[idx]}"
                              </p>
                            )}
                            {quizAnswered && opt.explanation && (
                              <p className={`text-[11px] mt-1.5 font-medium ${opt.isCorrect ? 'text-emerald-800' : 'text-amber-800'}`}>
                                {opt.explanation}
                              </p>
                            )}
                          </div>
                          {quizAnswered && opt.isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {quizAnswered && isSelected && !opt.isCorrect && (
                            <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Post-Answer Feedback, Answer Analysis & User Correction */}
                  {quizAnswered && (() => {
                    const selectedOpt = quizSelectedOption !== null ? quizOptions[quizSelectedOption] : null;
                    const correctOpt = quizOptions.find((o) => o.isCorrect) || quizOptions[0];
                    const isSelectionCorrect = selectedOpt?.isCorrect === true;

                    if (isSelectionCorrect) {
                      return (
                        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-50/95 via-teal-50/40 to-white border-2 border-emerald-300 shadow-sm space-y-4">
                          {/* Header */}
                          <div className="flex items-center justify-between gap-2 border-b border-emerald-200/70 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <div>
                                <h5 className="font-extrabold text-sm sm:text-base text-emerald-950">
                                  Correct Answer! Great Job!
                                </h5>
                                <p className="text-xs text-emerald-800">
                                  This is natural, polite daily English.
                                </p>
                              </div>
                            </div>
                            {isSupported && (
                              <button
                                type="button"
                                onClick={() => handleSpeak(correctOpt?.text || currentCard.backProfessional)}
                                className="text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-100/60 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                                title="Listen to native pronunciation"
                              >
                                <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Listen</span>
                              </button>
                            )}
                          </div>

                          {/* Analysis */}
                          <div className="space-y-1.5 text-xs sm:text-sm text-emerald-900">
                            <span className="font-bold text-[11px] uppercase tracking-wider text-emerald-800 block">
                              Why This Choice Works:
                            </span>
                            <p className="leading-relaxed font-medium">
                              {selectedOpt?.explanation || currentCard.backWhy}
                            </p>
                            {showTranslation && (
                              <div className="p-2.5 mt-2 rounded-xl bg-white/90 border border-emerald-200 text-xs text-emerald-950">
                                <span className="font-bold text-[10px] uppercase text-emerald-800 block mb-0.5">
                                  {nativeLanguage} Translation:
                                </span>
                                <p className="font-medium italic">
                                  {getFlashcardTranslation(currentCard, nativeLanguage) || translatedCorrection || 'Translation ready.'}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Grammar Note */}
                          {currentCard.grammarNote && (
                            <div className="p-3 rounded-2xl bg-white/90 border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-2 shadow-2xs">
                              <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-emerald-950 block mb-0.5">Grammar & Daily Usage Note:</strong>
                                <span className="text-emerald-900 leading-relaxed font-medium">{currentCard.grammarNote}</span>
                              </div>
                            </div>
                          )}

                          {/* Practice Aloud */}
                          {currentCard.backPractice && (
                            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2 shadow-2xs">
                              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-amber-950 block mb-0.5">Speaking Practice:</strong>
                                <span className="text-amber-900 leading-relaxed font-medium">{currentCard.backPractice}</span>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="pt-2 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={handleRetryCurrentCard}
                              className="px-3.5 py-2 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Practice Again</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleNext}
                              className="px-4 sm:px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                            >
                              <span>Next Challenge</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    }

                    // INCORRECT SELECTION: Active Correction & Detailed Analysis
                    return (
                      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-50/95 via-amber-50/40 to-white border-2 border-rose-300 shadow-sm space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 border-b border-rose-200/70 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                              <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-extrabold text-sm sm:text-base text-rose-950">
                                Needs Correction — Let's Analyze Your Choice
                              </h5>
                              <p className="text-xs text-rose-800">
                                Don't worry! Review the explanation below and try again.
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleRetryCurrentCard}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            title="Try this question again"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Try Again</span>
                          </button>
                        </div>

                        {/* 1. Analysis of Incorrect Selection */}
                        <div className="p-3.5 rounded-2xl bg-white/95 border border-rose-200 text-xs text-rose-950 space-y-1.5 shadow-2xs">
                          <div className="flex items-center gap-1.5 font-bold text-rose-900 text-[11px] uppercase tracking-wider">
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>Why Your Choice Was Incorrect:</span>
                          </div>
                          <p className="font-semibold text-rose-900 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                            "{selectedOpt?.text}"
                          </p>
                          <p className="text-rose-800 leading-relaxed font-medium">
                            {selectedOpt?.explanation || 'This formulation is unnatural, awkward, or contextually mismatched for this daily situation.'}
                          </p>
                        </div>

                        {/* 2. Active Correction: What to Say Instead */}
                        <div className="p-4 rounded-2xl bg-emerald-50/90 border-2 border-emerald-300 text-xs text-emerald-950 space-y-2 shadow-2xs">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px] uppercase tracking-wider">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Say This Instead (Correct Response):</span>
                            </div>
                            {isSupported && (
                              <button
                                type="button"
                                onClick={() => handleSpeak(correctOpt?.text || currentCard.backProfessional)}
                                className="text-[11px] font-bold text-emerald-900 bg-white hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300 flex items-center gap-1 cursor-pointer"
                              >
                                <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Listen</span>
                              </button>
                            )}
                          </div>

                          <p className="text-sm sm:text-base font-extrabold text-emerald-950 bg-white p-2.5 rounded-xl border border-emerald-200">
                            "{correctOpt?.text || currentCard.backProfessional}"
                          </p>

                          <p className="text-emerald-900 leading-relaxed font-medium">
                            <strong className="text-emerald-950">Why this works: </strong>
                            {currentCard.backWhy || correctOpt?.explanation}
                          </p>

                          {currentCard.grammarNote && (
                            <div className="pt-2 border-t border-emerald-200/70 text-emerald-800 text-xs">
                              <strong className="text-emerald-950">Grammar Rule: </strong>
                              {currentCard.grammarNote}
                            </div>
                          )}

                          {showTranslation && (
                            <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-950">
                              <span className="font-bold text-[10px] uppercase text-emerald-800 block mb-0.5">
                                {nativeLanguage} Translation:
                              </span>
                              <p className="font-medium italic">
                                {getFlashcardTranslation(currentCard, nativeLanguage) || translatedCorrection || 'Translation ready.'}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={handleRetryCurrentCard}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Try Again & Select Right Answer</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleNext}
                            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-900 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                          >
                            <span>Next Challenge</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })()}

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
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800">
                              Basic English
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

          {/* 4. BASIC ENGLISH CARD GENERATOR & ADD CARDS HUB */}
          {activeTab === 'create' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Generator Success Toast Banner */}
              <AnimatePresence>
                {generatorSuccessMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between gap-3 text-emerald-900 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold">{generatorSuccessMessage}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleSetDeckId('custom-deck');
                        setActiveTab('study');
                        setCurrentIndex(0);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shrink-0 cursor-pointer shadow-2xs"
                    >
                      Study Deck Now →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sub-navigation tabs: Generator vs Starter Packs vs Manual */}
              <div className="flex items-center justify-center sm:justify-start gap-1 p-1 bg-neutral-200/80 rounded-2xl w-full sm:w-auto overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setCreateSubTab('generate')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    createSubTab === 'generate'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>App Generator (Basic English)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCreateSubTab('packs')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    createSubTab === 'packs'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  <span>Starter Packs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCreateSubTab('manual')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    createSubTab === 'manual'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Write Custom Card</span>
                </button>
              </div>

              {/* SUBTAB 1: APP CARD GENERATOR */}
              {createSubTab === 'generate' && (
                <div className="bg-white p-5 sm:p-7 rounded-3xl border border-neutral-200 shadow-2xs space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        <Sparkles className="w-3 h-3" /> Basic English Only (A1–A2)
                      </div>
                      <h3 className="text-lg font-black text-neutral-900">Generate Basic English Flashcards</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Choose a daily situation or type your own. The app creates simple, high-frequency Basic English phrases with native translations and audio.
                      </p>
                    </div>
                  </div>

                  {/* One-Tap Topic Chips */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-neutral-700 uppercase tracking-wider mb-2">
                      1. Select a Daily Situation (One-Tap):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {BASIC_ENGLISH_TOPICS.map((topic) => {
                        const isSelected = genTopic === topic.label && !genCustomTopic.trim();
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => {
                              setGenTopic(topic.label);
                              setGenCustomTopic('');
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                            }`}
                          >
                            <span>{topic.icon}</span>
                            <span>{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Topic Input */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Or type any specific situation:
                    </label>
                    <input
                      type="text"
                      value={genCustomTopic}
                      onChange={(e) => setGenCustomTopic(e.target.value)}
                      placeholder="e.g. Asking for help at the train station, Buying milk at the corner shop..."
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-neutral-900 font-medium"
                    />
                  </div>

                  {/* Count & Native Language Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-neutral-100">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-extrabold text-neutral-600 uppercase tracking-wider">
                        Quantity:
                      </span>
                      <div className="inline-flex rounded-xl bg-neutral-100 p-1">
                        {[3, 5].map((cnt) => (
                          <button
                            key={cnt}
                            type="button"
                            onClick={() => setGenCount(cnt)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              genCount === cnt
                                ? 'bg-white text-emerald-800 shadow-2xs'
                                : 'text-neutral-500 hover:text-neutral-900'
                            }`}
                          >
                            {cnt} Cards
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                      <Languages className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Translation Language: <strong className="text-neutral-900">{nativeLanguage}</strong></span>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={handleGenerateCards}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating Basic English Cards...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Basic English Cards ({genCustomTopic.trim() || genTopic})</span>
                      </>
                    )}
                  </button>

                  {/* Generated Cards Result List */}
                  {generatedCards.length > 0 && (
                    <div className="pt-4 border-t border-neutral-200 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-extrabold text-neutral-900 text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Generated Flashcards ({generatedCards.length})</span>
                        </h4>

                        <button
                          type="button"
                          onClick={handleAddAllGeneratedCards}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add All ({generatedCards.length}) to My Deck</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {generatedCards.map((card, idx) => {
                          const isAlreadyAdded = addedCardIds.includes(card.id);
                          return (
                            <div
                              key={card.id || idx}
                              className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-3"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                    Basic English
                                  </span>
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">
                                    {card.frontContext || card.category}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => speak(card.backProfessional)}
                                    className="p-1.5 rounded-lg bg-white border border-neutral-200 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-700 transition-colors cursor-pointer"
                                    title="Listen to pronunciation"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>

                                  {isAlreadyAdded ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl">
                                      <Check className="w-3.5 h-3.5" /> Added
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleAddSingleGeneratedCard(card)}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-xl transition-all cursor-pointer shadow-2xs"
                                    >
                                      <Plus className="w-3.5 h-3.5" /> Add Card
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div>
                                <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Situation / Prompt:</p>
                                <p className="text-xs font-semibold text-neutral-800 mt-0.5">{card.front}</p>
                              </div>

                              <div className="p-3 bg-white rounded-xl border border-neutral-200/80">
                                <p className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">Recommended Basic English:</p>
                                <p className="text-sm font-black text-neutral-900 mt-0.5">{card.backProfessional}</p>
                                {card.backTranslation && (
                                  <p className="text-xs text-neutral-500 mt-1 italic">
                                    Translation ({nativeLanguage}): {typeof card.backTranslation === 'string' ? card.backTranslation : (card.backTranslation[nativeLanguage] || Object.values(card.backTranslation)[0])}
                                  </p>
                                )}
                              </div>

                              {card.backWhy && (
                                <p className="text-[11px] text-neutral-600 leading-relaxed">
                                  <strong className="text-neutral-800">Why it works:</strong> {card.backWhy}
                                </p>
                              )}

                              {card.grammarNote && (
                                <p className="text-[11px] text-teal-800 bg-teal-50 p-2 rounded-lg border border-teal-200/60 leading-relaxed">
                                  <strong className="text-teal-900">Grammar Tip:</strong> {card.grammarNote}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB 2: APP STARTER PACKS */}
              {createSubTab === 'packs' && (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-2xs">
                    <h3 className="text-base font-black text-neutral-900">Curated Basic English Starter Packs</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Ready-to-use essential card packs crafted specifically for non-English speakers. Tap to add the full pack to your deck with one click!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PRESET_STARTER_PACKS.map((pack) => (
                      <div
                        key={pack.id}
                        className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-2xs flex flex-col justify-between hover:border-emerald-300 transition-all space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              <span className="mr-1">{pack.icon}</span> Starter Pack
                            </span>
                            <h4 className="font-extrabold text-neutral-900 text-sm mt-1">{pack.title}</h4>
                            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{pack.description}</p>
                          </div>

                          <div className="p-2.5 bg-neutral-50 rounded-xl space-y-1">
                            <p className="text-[10px] font-bold text-neutral-500 uppercase">Sample Cards:</p>
                            {pack.cards.slice(0, 2).map((c, i) => (
                              <p key={i} className="text-xs text-neutral-700 truncate font-medium">
                                • {c.backProfessional}
                              </p>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddStarterPack(pack)}
                          className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Pack ({pack.cards.length} Cards)</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBTAB 3: MANUAL CUSTOM CARD */}
              {createSubTab === 'manual' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">Write Custom Flashcard</h3>
                      <p className="text-xs text-neutral-500">
                        Add a simple everyday Basic English card to your personal deck.
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
                        <option value="Everyday English">Everyday English</option>
                        <option value="Café & Food">Café & Food</option>
                        <option value="Travel & Directions">Travel & Directions</option>
                        <option value="Shopping & Daily Life">Shopping & Daily Life</option>
                        <option value="Friendly Work Chat">Friendly Work Chat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Context / Situation (e.g. Asking for the bill, Greeting a neighbour)
                      </label>
                      <input
                        type="text"
                        value={newFrontContext}
                        onChange={(e) => setNewFrontContext(e.target.value)}
                        placeholder="e.g. Ordering at a Café"
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
                        placeholder={`e.g. "I want to ask the waiter how much the coffee costs" or enter in ${nativeLanguage}...`}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Back: Clear Basic English Phrase *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={newBackProfessional}
                        onChange={(e) => setNewBackProfessional(e.target.value)}
                        placeholder="e.g. Excuse me, how much is this coffee?"
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
                        Why This Works / Friendly Tip (Optional)
                      </label>
                      <input
                        type="text"
                        value={newBackWhy}
                        onChange={(e) => setNewBackWhy(e.target.value)}
                        placeholder="e.g. Simple, polite, and commonly used in all coffee shops."
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Grammar Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={newGrammarNote}
                        onChange={(e) => setNewGrammarNote(e.target.value)}
                        placeholder="e.g. 'How much is...' is used for singular prices."
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
                        Save Card to Deck
                      </button>
                    </div>
                  </form>
                </div>
              )}
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
