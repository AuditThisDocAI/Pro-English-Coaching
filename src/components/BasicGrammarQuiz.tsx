import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, XCircle, RefreshCw, Loader2, BookOpen, AlertCircle, ArrowRight, Languages } from 'lucide-react';
import { auth } from '../lib/firebase';
import { triggerCelebrationConfetti } from '../lib/confetti';
import { lookupDictionaryTranslation } from '../lib/translationsDict';
import { translateText } from '../lib/translationService';

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
  'General Conversation',
  'Business English',
  'Travel',
  'Academic',
  'Prepositions & Collocations',
];

export function BasicGrammarQuiz({
  nativeLanguage,
  onLanguageChange,
  onAddXP,
  isPro,
  isExpired,
  onOpenPricing
}: BasicGrammarQuizProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);
  const [questions, setQuestions] = useState<QuizQuestionItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});
  
  const [score, setScore] = useState(0);

  const fetchQuestions = async (topic: string, isRetry = false) => {
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentIdx(0);
    setIsAnswered(false);
    setSelectedAnswerIdx(null);
    if (!isRetry) setScore(0);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          count: 5,
          difficulty: 'Beginner',
          nativeLanguage,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate quiz questions');
      }

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        throw new Error('No questions generated');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not load quiz questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isExpired) {
      fetchQuestions(selectedCategory);
    }
  }, [selectedCategory, nativeLanguage, isExpired]);

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

    // 2. Check if bracket translation already exists and is not English
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

  const handleSelectAnswer = (idx: number, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedAnswerIdx(idx);
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(s => s + 1);
      onAddXP(10, 'Correct Answer');
      if (currentIdx === questions.length - 1 && score + 1 === questions.length) {
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
      // Finished
      fetchQuestions(selectedCategory, true);
    }
  };

  if (isExpired) return null; // Handled by App.tsx PaywallOverlay

  return (
    <div className="bg-neutral-900 rounded-3xl p-4 sm:p-6 shadow-xl overflow-hidden max-w-4xl mx-auto w-full flex flex-col min-h-[500px]">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            Basic Grammar Quiz
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Fill in the blanks to test your everyday English.
          </p>
        </div>
        
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-neutral-800 text-white border border-neutral-700 rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:border-emerald-500 transition-colors shadow-sm"
          disabled={isLoading}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-rose-500/10 rounded-3xl border border-rose-500/30">
          <AlertCircle className="w-10 h-10 text-rose-400 mb-3" />
          <h3 className="text-rose-200 font-bold mb-2">Oops! Something went wrong.</h3>
          <p className="text-rose-300/80 text-sm max-w-md mx-auto mb-4">{error}</p>
          <button 
            onClick={() => fetchQuestions(selectedCategory)}
            className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
          <p className="text-neutral-300 font-medium animate-pulse">Generating fresh questions...</p>
        </div>
      ) : questions.length > 0 ? (
        <div className="flex-1 flex flex-col">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-neutral-200 flex-1 flex flex-col">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg mb-4 shadow-sm border border-emerald-200/50">
                {questions[currentIdx].difficulty} • {questions[currentIdx].topic}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
                {questions[currentIdx].sentenceBefore}
                <span className="inline-block mx-2 px-6 py-1 border-b-2 border-neutral-900 bg-neutral-100 text-neutral-400 min-w-[80px] text-center">
                  {isAnswered && selectedAnswerIdx !== null ? questions[currentIdx].options[selectedAnswerIdx].text : '?'}
                </span>
                {questions[currentIdx].sentenceAfter}
              </h3>
              {(() => {
                const q = questions[currentIdx];
                const key = `${q.id || currentIdx}_${nativeLanguage}`;
                let translationText = dynamicTranslations[key] || (q.bracketTranslation || '').replace(/^[\[\("']+|[\]\)"']+$/g, '').trim();
                
                // If translation matches the English complete sentence or is missing, look up from dictionary
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

            {/* Options */}
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

            {/* Explanation & Next */}
            {isAnswered && (
              <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-sm font-semibold text-neutral-800 mb-1">Explanation:</p>
                <p className="text-sm text-neutral-600 mb-3">{questions[currentIdx].explanation}</p>
                {questions[currentIdx].explanationTranslation && (
                  <p className="text-xs text-neutral-500 italic mb-4">"{questions[currentIdx].explanationTranslation}"</p>
                )}
                
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {currentIdx < questions.length - 1 ? 'Next Question' : 'Generate New Quiz'} 
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
