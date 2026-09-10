import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Loader2, 
  BookOpen, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Languages, 
  Grid, 
  Check, 
  Trophy, 
  ChevronRight, 
  Search, 
  X, 
  Shuffle 
} from 'lucide-react';
import { triggerCelebrationConfetti } from '../lib/confetti';
import { lookupDictionaryTranslation } from '../lib/translationsDict';
import { translateText } from '../lib/translationService';
import { QUIZ_BANK_100, getQuizByNumber, getNextQuizNumber, QuizSet } from '../data/quizBank100';

interface QuizOption {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionItem {
  id: string;
  topic: string;
  sentenceBefore: string;
  sentenceAfter: string;
  completeSentence: string;
  bracketTranslation: string;
  options: QuizOption[];
  explanation: string;
  explanationTranslation?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface BasicGrammarQuizProps {
  nativeLanguage: string;
  onLanguageChange: (lang: string) => void;
  onAddXP: (amount: number, reason: string) => void;
  isPro?: boolean;
  isExpired?: boolean;
  onOpenPricing?: () => void;
}

const CATEGORIES = [
  'All 100 Quizzes',
  'Prepositions & Collocations',
  'Business English',
  'General Conversation',
  'Travel',
  'Academic',
];

export function BasicGrammarQuiz({
  nativeLanguage,
  onLanguageChange,
  onAddXP,
  isPro,
  isExpired,
  onOpenPricing
}: BasicGrammarQuizProps) {
  // 100 Quizzes Navigation & State
  const [currentQuizNum, setCurrentQuizNum] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('proenglish_current_quiz_num');
      const parsed = saved ? parseInt(saved, 10) : 1;
      return parsed >= 1 && parsed <= 100 ? parsed : 1;
    } catch {
      return 1;
    }
  });

  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('proenglish_completed_quizzes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);
  const [questions, setQuestions] = useState<QuizQuestionItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Quiz Directory Modal
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryFilter, setDirectoryFilter] = useState<string>('All');

  const currentQuizMeta = useMemo(() => {
    return getQuizByNumber(currentQuizNum) || QUIZ_BANK_100[0];
  }, [currentQuizNum]);

  // Save current quiz number and completed list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('proenglish_current_quiz_num', currentQuizNum.toString());
    } catch {}
  }, [currentQuizNum]);

  useEffect(() => {
    try {
      localStorage.setItem('proenglish_completed_quizzes', JSON.stringify(completedQuizzes));
    } catch {}
  }, [completedQuizzes]);

  // Fetch or load questions for a specific quiz number (1-100)
  const loadQuiz = async (quizNumberToLoad: number) => {
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentIdx(0);
    setIsAnswered(false);
    setSelectedAnswerIdx(null);
    setScore(0);
    setQuizFinished(false);

    const targetNum = Math.min(Math.max(quizNumberToLoad, 1), 100);
    const targetSet = getQuizByNumber(targetNum) || QUIZ_BANK_100[0];

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizNumber: targetNum,
          topic: targetSet.title,
          category: targetSet.category,
          count: 4,
          difficulty: targetSet.difficulty,
          nativeLanguage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
          setCurrentQuizNum(targetNum);
          return;
        }
      }

      // Offline / Local Instant Fallback from 100 Quizzes Bank
      const fallbackQuestions: QuizQuestionItem[] = targetSet.questions.map((q, idx) => ({
        id: q.id || `quiz_${targetNum}_q${idx + 1}`,
        topic: targetSet.title,
        sentenceBefore: q.sentenceBefore,
        sentenceAfter: q.sentenceAfter,
        completeSentence: q.completeSentence,
        bracketTranslation: q.bracketTranslation || '',
        options: q.options.map(opt => ({
          letter: opt.letter,
          text: opt.text,
          isCorrect: opt.isCorrect
        })),
        explanation: q.explanation,
        difficulty: q.difficulty || targetSet.difficulty
      }));

      setQuestions(fallbackQuestions);
      setCurrentQuizNum(targetNum);
    } catch (err: any) {
      console.warn('API error, loading quiz from verified 100-quiz local library:', err);
      // Even if network fails completely, 100 quizzes are guaranteed to load!
      const fallbackQuestions: QuizQuestionItem[] = targetSet.questions.map((q, idx) => ({
        id: q.id || `quiz_${targetNum}_q${idx + 1}`,
        topic: targetSet.title,
        sentenceBefore: q.sentenceBefore,
        sentenceAfter: q.sentenceAfter,
        completeSentence: q.completeSentence,
        bracketTranslation: q.bracketTranslation || '',
        options: q.options.map(opt => ({
          letter: opt.letter,
          text: opt.text,
          isCorrect: opt.isCorrect
        })),
        explanation: q.explanation,
        difficulty: q.difficulty || targetSet.difficulty
      }));

      setQuestions(fallbackQuestions);
      setCurrentQuizNum(targetNum);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (!isExpired) {
      loadQuiz(currentQuizNum);
    }
  }, [nativeLanguage, isExpired]);

  // Handle Translation for current question
  useEffect(() => {
    if (!questions.length || !questions[currentIdx]) return;
    const q = questions[currentIdx];
    const key = `${q.id || currentIdx}_${nativeLanguage}`;
    if (dynamicTranslations[key]) return;

    // 1. Check offline dictionary first
    const dict = lookupDictionaryTranslation(q.completeSentence, nativeLanguage);
    if (dict) {
      setDynamicTranslations(prev => ({ ...prev, [key]: dict }));
      return;
    }

    // 2. Dynamic online translation if bracket translation is empty or same as English
    const existing = (q.bracketTranslation || '').replace(/^[\[\("']+|[\]\)"']+$/g, '').trim();
    const cleanComplete = (q.completeSentence || '').replace(/[.,?!;:¡¿"']/g, '').trim().toLowerCase();
    const cleanTrans = existing.replace(/[.,?!;:¡¿"']/g, '').trim().toLowerCase();

    if (!existing || cleanTrans === cleanComplete) {
      translateText(q.completeSentence, nativeLanguage).then(res => {
        if (res && res !== q.completeSentence) {
          setDynamicTranslations(prev => ({ ...prev, [key]: res }));
        }
      }).catch(console.warn);
    }
  }, [currentIdx, questions, nativeLanguage, dynamicTranslations]);

  // Generate Next / New Quiz: advances to next unseen or next sequential quiz out of 100
  const handleGenerateNewQuiz = () => {
    const nextNum = getNextQuizNumber(currentQuizNum, completedQuizzes);
    loadQuiz(nextNum);
  };

  // Pick random unseen quiz
  const handleShuffleQuiz = () => {
    const unseen = QUIZ_BANK_100.filter(q => !completedQuizzes.includes(q.quizNumber) && q.quizNumber !== currentQuizNum);
    if (unseen.length > 0) {
      const pick = unseen[Math.floor(Math.random() * unseen.length)].quizNumber;
      loadQuiz(pick);
    } else {
      // Pick random from all 100
      const pick = Math.floor(Math.random() * 100) + 1;
      loadQuiz(pick);
    }
  };

  const handleSelectAnswer = (idx: number, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedAnswerIdx(idx);
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(s => s + 1);
      onAddXP(10, 'Correct Answer');
    }

    // Check if this was the last question in the quiz
    if (currentIdx === questions.length - 1) {
      // Mark current quiz as completed
      setCompletedQuizzes(prev => {
        if (!prev.includes(currentQuizNum)) {
          return [...prev, currentQuizNum];
        }
        return prev;
      });
      setQuizFinished(true);

      const finalScore = isCorrect ? score + 1 : score;
      if (finalScore === questions.length) {
        triggerCelebrationConfetti();
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setIsAnswered(false);
      setSelectedAnswerIdx(null);
    } else {
      // Finished quiz! Generate next quiz from the 100 collection
      handleGenerateNewQuiz();
    }
  };

  const nextQuizNum = getNextQuizNumber(currentQuizNum, completedQuizzes);

  // Filtered quizzes for the Directory Modal
  const filteredDirectoryQuizzes = useMemo(() => {
    return QUIZ_BANK_100.filter(q => {
      const matchesFilter = directoryFilter === 'All' || q.category.toLowerCase().includes(directoryFilter.toLowerCase());
      const matchesSearch = !directorySearch.trim() || 
        q.title.toLowerCase().includes(directorySearch.toLowerCase()) || 
        q.category.toLowerCase().includes(directorySearch.toLowerCase()) ||
        `quiz ${q.quizNumber}`.includes(directorySearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [directoryFilter, directorySearch]);

  if (isExpired) return null;

  return (
    <div className="bg-neutral-900 rounded-3xl p-4 sm:p-6 shadow-xl overflow-hidden max-w-4xl mx-auto w-full flex flex-col min-h-[520px]">
      {/* Quiz Top Navigation Bar */}
      <div className="mb-6 flex flex-col gap-4 border-b border-neutral-800 pb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-400" />
                English Grammar Quiz Studio
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100 Quizzes Library
              </span>
            </div>
            <p className="text-neutral-400 text-sm mt-1">
              Master grammar & collocations with 100 curated fill-in-the-blank quizzes.
            </p>
          </div>

          {/* Quick Actions: Directory Modal & Shuffle */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsDirectoryOpen(true)}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-xl text-xs sm:text-sm font-bold border border-neutral-700 transition-all flex items-center justify-center gap-2 shadow-sm"
              title="Browse all 100 Quizzes"
            >
              <Grid className="w-4 h-4 text-emerald-400" />
              <span>Browse All 100 Quizzes</span>
            </button>

            <button
              onClick={handleShuffleQuiz}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-xl border border-neutral-700 transition-all"
              title="Jump to a Random Unseen Quiz"
            >
              <Shuffle className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* 100 Quizzes Stepper & Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={() => loadQuiz(currentQuizNum - 1)}
              disabled={currentQuizNum <= 1 || isLoading}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 transition-colors"
              title="Previous Quiz"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white">
                Quiz #{currentQuizNum} of 100
              </span>
              <span className="text-neutral-500 text-xs hidden md:inline">|</span>
              <span className="text-xs text-neutral-300 font-medium truncate max-w-[200px] sm:max-w-xs">
                {currentQuizMeta.title.replace(/^Quiz \d+:\s*/, '')}
              </span>
            </div>

            <button
              onClick={() => loadQuiz(currentQuizNum + 1)}
              disabled={currentQuizNum >= 100 || isLoading}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 transition-colors"
              title="Next Quiz"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Completed badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/50 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedQuizzes.length}/100 Completed</span>
            </div>

            {/* Generate New Quiz Button */}
            <button
              onClick={handleGenerateNewQuiz}
              disabled={isLoading}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate New Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-rose-500/10 rounded-3xl border border-rose-500/30">
          <AlertCircle className="w-10 h-10 text-rose-400 mb-3" />
          <h3 className="text-rose-200 font-bold mb-2">Quiz Load Notice</h3>
          <p className="text-rose-300/80 text-sm max-w-md mx-auto mb-4">{error}</p>
          <button 
            onClick={() => loadQuiz(currentQuizNum)}
            className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reload Quiz #{currentQuizNum}
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
          <p className="text-neutral-300 font-medium animate-pulse">Loading Quiz #{currentQuizNum} of 100...</p>
        </div>
      ) : questions.length > 0 ? (
        <div className="flex-1 flex flex-col">
          {/* Progress Bar & Current Score */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Question {currentIdx + 1} of {questions.length} • Quiz #{currentQuizNum}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                Score: {score}/{currentIdx + (isAnswered ? 1 : 0)}
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentIdx + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-neutral-200 flex-1 flex flex-col">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200/50">
                  {questions[currentIdx].difficulty}
                </span>
                <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-lg border border-neutral-200">
                  {currentQuizMeta.category}
                </span>
                <span className="inline-block px-2 py-1 text-xs text-neutral-400 font-medium">
                  {questions[currentIdx].topic}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
                {questions[currentIdx].sentenceBefore}
                <span className="inline-block mx-2 px-6 py-1 border-b-2 border-neutral-900 bg-neutral-100 text-neutral-400 min-w-[80px] text-center font-mono">
                  {isAnswered && selectedAnswerIdx !== null ? questions[currentIdx].options[selectedAnswerIdx].text : '?'}
                </span>
                {questions[currentIdx].sentenceAfter}
              </h3>

              {/* Native Language Meaning Banner */}
              {(() => {
                const q = questions[currentIdx];
                const key = `${q.id || currentIdx}_${nativeLanguage}`;
                let translationText = dynamicTranslations[key] || (q.bracketTranslation || '').replace(/^[\[\("']+|[\]\)"']+$/g, '').trim();
                
                const cleanComplete = (q.completeSentence || '').replace(/[.,?!;:¡¿"']/g, '').trim().toLowerCase();
                const cleanTrans = translationText.replace(/[.,?!;:¡¿"']/g, '').trim().toLowerCase();
                if ((!translationText || cleanTrans === cleanComplete) && nativeLanguage !== 'English') {
                  const fallback = lookupDictionaryTranslation(q.completeSentence, nativeLanguage);
                  if (fallback) translationText = fallback;
                }

                if (!translationText) return null;

                return (
                  <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100/90 border border-neutral-200 text-sm">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 text-[11px] uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-md">
                      <Languages className="w-3 h-3 text-emerald-700" />
                      <span>{nativeLanguage}</span>
                    </span>
                    <span className="text-neutral-700 font-medium italic text-sm sm:text-base">
                      "{translationText}"
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 mt-auto">
              {questions[currentIdx].options.map((opt, idx) => {
                const isSelected = selectedAnswerIdx === idx;
                let btnStyle = 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800';
                
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs z-10';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-amber-50 border-2 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400/30 shadow-xs z-10';
                  } else {
                    btnStyle = 'opacity-50 bg-neutral-50 border-neutral-200 text-neutral-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectAnswer(idx, opt.isCorrect)}
                    className={`p-4 rounded-2xl border transition-all text-sm sm:text-base leading-relaxed flex items-center gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm shrink-0 ${
                      isAnswered && opt.isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isAnswered && isSelected && !opt.isCorrect
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'border-neutral-300 text-neutral-500 bg-white'
                    }`}>
                      {opt.letter}
                    </span>
                    <span className="font-semibold">{opt.text}</span>
                    
                    <div className="ml-auto">
                      {isAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                      {isAnswered && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Question Button */}
            {isAnswered && (
              <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-neutral-800">Grammar Explanation:</p>
                  {currentIdx === questions.length - 1 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Quiz #{currentQuizNum} Complete!
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 mb-3">{questions[currentIdx].explanation}</p>
                {questions[currentIdx].explanationTranslation && (
                  <p className="text-xs text-neutral-500 italic mb-4">"{questions[currentIdx].explanationTranslation}"</p>
                )}
                
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {currentIdx < questions.length - 1 ? (
                    <>
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Generate New Quiz (Quiz #{nextQuizNum} of 100)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* 100 Quizzes Directory Modal */}
      {isDirectoryOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                  <Grid className="w-5 h-5 text-emerald-400" />
                  <span>Choose From 100 Quizzes</span>
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
                  Select any quiz to practice immediately. Your progress is saved automatically.
                </p>
              </div>
              <button
                onClick={() => setIsDirectoryOpen(false)}
                className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs & Search */}
            <div className="p-4 border-b border-neutral-800/80 bg-neutral-950/40 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by topic, keyword, or quiz #..."
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-neutral-800 text-white rounded-xl border border-neutral-700 text-xs sm:text-sm focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {['All', 'Prepositions', 'Business', 'Conversation', 'Travel', 'Academic'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setDirectoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      directoryFilter === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Quizzes Grid List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDirectoryQuizzes.map(quiz => {
                const isCurrent = quiz.quizNumber === currentQuizNum;
                const isDone = completedQuizzes.includes(quiz.quizNumber);

                return (
                  <div
                    key={quiz.quizNumber}
                    onClick={() => {
                      loadQuiz(quiz.quizNumber);
                      setIsDirectoryOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left ${
                      isCurrent
                        ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40'
                        : 'bg-neutral-800/60 hover:bg-neutral-800 border-neutral-700/60 hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-neutral-700 text-neutral-300'
                      }`}>
                        {isDone ? <Check className="w-4 h-4" /> : `#${quiz.quizNumber}`}
                      </div>

                      <div className="min-w-0">
                        <p className={`text-sm font-bold truncate ${isCurrent ? 'text-emerald-300' : 'text-white'}`}>
                          {quiz.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-neutral-400 font-medium">
                            {quiz.category}
                          </span>
                          <span className="text-neutral-600 text-xs">•</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            quiz.difficulty === 'Beginner'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                              : quiz.difficulty === 'Intermediate'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                              : 'bg-purple-950 text-purple-400 border border-purple-800/40'
                          }`}>
                            {quiz.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-neutral-500 shrink-0" />
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-950/40 flex items-center justify-between text-xs text-neutral-400">
              <span>Showing {filteredDirectoryQuizzes.length} of 100 Quizzes</span>
              <span className="text-emerald-400 font-semibold">{completedQuizzes.length} Completed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
