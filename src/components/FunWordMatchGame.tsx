import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  RotateCcw, 
  Award, 
  Smile, 
  Globe2, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { NativeLanguage, SUPPORTED_LANGUAGES } from '../types';
import { triggerProUpgradeConfetti } from '../lib/confetti';

interface FunWordMatchGameProps {
  nativeLanguage: NativeLanguage;
  onLanguageChange: (lang: NativeLanguage) => void;
  onAddXP: (amount: number) => void;
  onOpenChat: (text?: string) => void;
}

interface MatchPair {
  id: string;
  english: string;
  emoji: string;
  translations: Record<string, string>;
}

const GAME_PAIRS: MatchPair[] = [
  {
    id: '1',
    english: 'Good morning',
    emoji: '🌅',
    translations: {
      Spanish: 'Buenos días',
      Portuguese: 'Bom dia',
      French: 'Bonjour',
      German: 'Guten Morgen',
      Hindi: 'शुभ प्रभात',
      Mandarin: '早上好',
      Japanese: 'おはようございます',
      Arabic: 'صباح الخير',
      Italian: 'Buongiorno',
      Russian: 'Доброе утро'
    }
  },
  {
    id: '2',
    english: 'Thank you very much',
    emoji: '🙏',
    translations: {
      Spanish: 'Muchas gracias',
      Portuguese: 'Muito obrigado',
      French: 'Merci beaucoup',
      German: 'Vielen Dank',
      Hindi: 'बहुत-बहुत धन्यवाद',
      Mandarin: '非常感谢',
      Japanese: 'どうもありがとうございます',
      Arabic: 'شكراً جزيلاً',
      Italian: 'Grazie mille',
      Russian: 'Большое спасибо'
    }
  },
  {
    id: '3',
    english: 'How much does it cost?',
    emoji: '🏷️',
    translations: {
      Spanish: '¿Cuánto cuesta?',
      Portuguese: 'Quanto custa isso?',
      French: 'Combien ça coûte ?',
      German: 'Wie viel kostet das?',
      Hindi: 'इसकी कीमत क्या है?',
      Mandarin: '这个多少钱？',
      Japanese: 'これはいくらですか？',
      Arabic: 'كم تبلغ تكلفة هذا؟',
      Italian: 'Quanto costa?',
      Russian: 'Сколько это стоит?'
    }
  },
  {
    id: '4',
    english: 'Where is the bathroom?',
    emoji: '🚻',
    translations: {
      Spanish: '¿Dónde está el baño?',
      Portuguese: 'Onde fica o banheiro?',
      French: 'Où sont les toilettes ?',
      German: 'Wo ist die Toilette?',
      Hindi: 'शौचालय कहाँ है?',
      Mandarin: '洗手间在哪里？',
      Japanese: 'お手洗いはどこですか？',
      Arabic: 'أين يوجد الحمام؟',
      Italian: 'Dov\'è il bagno?',
      Russian: 'Где находится туалет?'
    }
  },
  {
    id: '5',
    english: 'Nice to meet you',
    emoji: '🤝',
    translations: {
      Spanish: 'Mucho gusto en conocerte',
      Portuguese: 'Prazer em conhecer você',
      French: 'Ravi de vous rencontrer',
      German: 'Freut mich, Sie kennenzulernen',
      Hindi: 'आपसे मिलकर खुशी हुई',
      Mandarin: '很高兴认识你',
      Japanese: 'はじめまして',
      Arabic: 'تشرفت بمعرفتك',
      Italian: 'Piacere di conoscerti',
      Russian: 'Приятно познакомиться'
    }
  },
  {
    id: '6',
    english: 'Could you help me, please?',
    emoji: '🙋',
    translations: {
      Spanish: '¿Podría ayudarme, por favor?',
      Portuguese: 'Você poderia me ajudar, por favor?',
      French: 'Pourriez-vous m\'aider, s\'il vous plaît ?',
      German: 'Könnten Sie mir bitte helfen?',
      Hindi: 'क्या आप कृपया मेरी मदद कर सकते हैं?',
      Mandarin: '请问你能帮帮我吗？',
      Japanese: '助けていただけますか？',
      Arabic: 'هل يمكنك مساعدتي من فضلك؟',
      Italian: 'Potrebbe aiutarmi, per favore?',
      Russian: 'Не могли бы вы мне помочь?'
    }
  }
];

export const FunWordMatchGame: React.FC<FunWordMatchGameProps> = ({
  nativeLanguage,
  onLanguageChange,
  onAddXP,
  onOpenChat
}) => {
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [selectedNative, setSelectedNative] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Play audio
  const handlePlayAudio = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  const handleSelectEnglish = (pair: MatchPair) => {
    if (matchedIds.has(pair.id)) return;
    handlePlayAudio(pair.english);
    setSelectedEnglish(pair.id);

    if (selectedNative) {
      checkMatch(pair.id, selectedNative);
    }
  };

  const handleSelectNative = (pair: MatchPair) => {
    if (matchedIds.has(pair.id)) return;
    setSelectedNative(pair.id);

    if (selectedEnglish) {
      checkMatch(selectedEnglish, pair.id);
    }
  };

  const checkMatch = (engId: string, natId: string) => {
    if (engId === natId) {
      // Correct!
      const next = new Set(matchedIds);
      next.add(engId);
      setMatchedIds(next);
      setScore((s) => s + 20);
      setStreak((st) => st + 1);
      onAddXP(20);

      setSelectedEnglish(null);
      setSelectedNative(null);

      if (next.size === GAME_PAIRS.length) {
        triggerProUpgradeConfetti();
      }
    } else {
      // Wrong
      setStreak(0);
      setTimeout(() => {
        setSelectedEnglish(null);
        setSelectedNative(null);
      }, 500);
    }
  };

  const handleResetGame = () => {
    setMatchedIds(new Set());
    setSelectedEnglish(null);
    setSelectedNative(null);
    setScore(0);
  };

  const isAllCompleted = matchedIds.size === GAME_PAIRS.length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Game Header */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase">
              2-Minute Match Game
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Streak: {streak}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-1">
            Match English Phrases with Your Language
          </h2>
          <p className="text-xs text-neutral-500">
            Tap an English phrase to hear it, then tap its matching meaning in {nativeLanguage}!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 px-3.5 py-2 rounded-2xl border border-indigo-100 text-center">
            <span className="text-[10px] font-bold text-indigo-700 uppercase block">Score</span>
            <span className="text-base font-black text-indigo-900">+{score} XP</span>
          </div>

          <button
            type="button"
            onClick={handleResetGame}
            className="p-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {isAllCompleted && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl p-6 shadow-xl text-center space-y-3 animate-in zoom-in-95 duration-200">
          <span className="text-4xl">🎉</span>
          <h3 className="text-xl font-black">All Matched Perfectly!</h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
            You just learned 6 key daily English phrases! Ready to practice speaking them with your AI tutor?
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChat("I just completed the word match game! Can we practice using these phrases in a conversation?")}
              className="px-5 py-2.5 bg-white text-emerald-900 rounded-xl text-xs font-extrabold shadow-sm hover:bg-emerald-50 transition-all cursor-pointer"
            >
              Practice in AI Chat →
            </button>
            <button
              type="button"
              onClick={handleResetGame}
              className="px-4 py-2.5 bg-emerald-700/60 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Matching Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Left Column: English */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block px-1">
            1. Tap English Phrase (Listen 🔊):
          </span>
          <div className="space-y-2.5">
            {GAME_PAIRS.map((pair) => {
              const isMatched = matchedIds.has(pair.id);
              const isSelected = selectedEnglish === pair.id;

              return (
                <button
                  key={`eng-${pair.id}`}
                  type="button"
                  onClick={() => handleSelectEnglish(pair)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900 opacity-60'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-102'
                      : 'bg-white border-neutral-200 hover:border-indigo-300 hover:bg-neutral-50 text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{pair.emoji}</span>
                    <span className="text-sm font-bold">"{pair.english}"</span>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5">
                    {isMatched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Volume2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Native Language */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block px-1">
            2. Tap Matching Meaning ({nativeLanguage}):
          </span>
          <div className="space-y-2.5">
            {/* Display shuffled or fixed native list */}
            {GAME_PAIRS.slice().reverse().map((pair) => {
              const translation = pair.translations[nativeLanguage] || pair.translations.Spanish;
              const isMatched = matchedIds.has(pair.id);
              const isSelected = selectedNative === pair.id;

              return (
                <button
                  key={`nat-${pair.id}`}
                  type="button"
                  onClick={() => handleSelectNative(pair)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900 opacity-60'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-102'
                      : 'bg-white border-neutral-200 hover:border-indigo-300 hover:bg-neutral-50 text-neutral-900'
                  }`}
                >
                  <span className="text-sm font-bold">"{translation}"</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
