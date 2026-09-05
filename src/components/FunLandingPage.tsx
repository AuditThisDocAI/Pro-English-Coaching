import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX,
  ArrowRight, 
  Globe2, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  Zap, 
  MessageSquare, 
  BookOpen, 
  Smile, 
  Award, 
  Layers, 
  Clock, 
  Check, 
  Play, 
  RotateCcw,
  Lock,
  ChevronDown
} from 'lucide-react';
import { NativeLanguage, SUPPORTED_LANGUAGES } from '../types';
import { triggerProUpgradeConfetti } from '../lib/confetti';
import { Link } from 'react-router-dom';

interface FunLandingPageProps {
  nativeLanguage: NativeLanguage;
  onLanguageChange: (lang: NativeLanguage) => void;
  onStartLearning: (topic?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
  onOpenGames: () => void;
  onOpenPricing: () => void;
  isPro?: boolean;
}

// Localized greetings & subtitles for hero
const LOCALIZED_HERO_CONTENT: Record<string, { welcome: string; subtitle: string; tryPrompt: string }> = {
  Spanish: {
    welcome: '¡Aprende inglés de forma fácil, divertida y sin miedo!',
    subtitle: 'La forma más amigable para hispanohablantes de hablar inglés con confianza en el trabajo, viajes y la vida diaria.',
    tryPrompt: 'Prueba una frase divertida ahora mismo:'
  },
  Portuguese: {
    welcome: 'Aprenda inglês de forma fácil, divertida e sem medo!',
    subtitle: 'O jeito mais acolhedor para falantes de português falarem inglês com confiança no trabalho, viagens e dia a dia.',
    tryPrompt: 'Pratique uma frase divertida agora mesmo:'
  },
  French: {
    welcome: 'Apprenez l\'anglais facilement et avec le sourire !',
    subtitle: 'La méthode la plus simple et ludique pour parler anglais avec assurance au quotidien et au travail.',
    tryPrompt: 'Testez une phrase amusante dès maintenant :'
  },
  German: {
    welcome: 'Englisch lernen – einfach, unterhaltsam und stressfrei!',
    subtitle: 'Die freundlichste Art, Englisch für Alltag, Beruf und Reisen mit Freude zu meistern.',
    tryPrompt: 'Probiere jetzt einen praktischen Beispielsatz aus:'
  },
  Hindi: {
    welcome: 'आसान और मज़ेदार तरीके से अंग्रेज़ी बोलना सीखें!',
    subtitle: 'बिना किसी डर के रोज़मर्रा की बातचीत, काम और यात्रा के लिए आत्मविश्वास से अंग्रेज़ी सीखें।',
    tryPrompt: 'अभी एक मज़ेदार वाक्य बोलकर देखें:'
  },
  Mandarin: {
    welcome: '轻松、有趣、自信地学说地道英语！',
    subtitle: '专为非英语母语者设计的趣味学习工具，涵盖日常社交、旅行点餐和职场沟通。',
    tryPrompt: '立即试读一句趣味日常英语：'
  },
  Japanese: {
    welcome: '楽しく簡単に、自信を持って英語を話そう！',
    subtitle: '日常会話、カフェでの注文、旅行、仕事の英語をリラックスして学べる親切なアプリ。',
    tryPrompt: '今すぐ日常フレーズを試してみましょう：'
  },
  Arabic: {
    welcome: 'تعلّم الإنجليزية بطريقة سهلة وممتعة وبكل ثقة!',
    subtitle: 'الطريقة الأكثر وداً لغير الناطقين بالإنجليزية للتحدث بطلاقة في العمل والسفر والحياة اليومية.',
    tryPrompt: 'جرّب عبارة يومية ممتعة الآن:'
  },
  Italian: {
    welcome: 'Impara l\'inglese in modo facile, divertente e senza stress!',
    subtitle: 'Il modo più accogliente per parlare inglese con sicurezza al lavoro, nei viaggi e nella vita quotidiana.',
    tryPrompt: 'Prova subito una frase divertente:'
  },
  Russian: {
    welcome: 'Учите английский легко, весело и без стресса!',
    subtitle: 'Самый дружелюбный способ заговорить по-английски для путешествий, работы и жизни.',
    tryPrompt: 'Попробуйте полезную фразу прямо сейчас:'
  }
};

// Fun bite-sized starter phrases for the interactive hero widget
interface MiniPracticeItem {
  category: string;
  emoji: string;
  english: string;
  phonetic: string;
  translations: Record<string, string>;
  quizQuestion: string;
  quizOptions: string[];
  correctAnswer: number;
  funFact: string;
}

const FUN_PRACTICE_ITEMS: MiniPracticeItem[] = [
  {
    category: 'Coffee & Breakfast',
    emoji: '☕',
    english: 'Can I please have a warm cappuccino with oat milk?',
    phonetic: 'kæn aɪ pliːz hæv ə wɔːrm kæpʊˈtʃiːnoʊ wɪð oʊt mɪlk?',
    translations: {
      Spanish: '¿Me das un cappuccino tibio con leche de avena, por favor?',
      Portuguese: 'Por favor, você poderia me dar um cappuccino quente com leite de aveia?',
      French: 'Puis-je avoir un cappuccino tiède avec du lait d\'avoine, s\'il vous plaît ?',
      German: 'Könnte ich bitte einen warmen Cappuccino mit Hafermilch haben?',
      Hindi: 'क्या मुझे कृपया ओट मिल्क (जई के दूध) के साथ गर्म कैपुचीनो मिल सकता है?',
      Mandarin: '请问可以给我一杯加燕麦奶的温卡布奇诺吗？',
      Japanese: 'オーツミルク入りの温かいカプチーノを一杯いただけますか？',
      Arabic: 'هل يمكنني الحصول على كابتشينو دافئ مع حليب الشوفان من فضلك؟',
      Italian: 'Posso avere un cappuccino caldo con latte d\'avena, per favore?',
      Russian: 'Можно мне, пожалуйста, тёплый капучино на овсяном молоке?'
    },
    quizQuestion: 'What does "oat milk" mean in this phrase?',
    quizOptions: ['Cow milk', 'Plant-based oat milk', 'Cold water'],
    correctAnswer: 1,
    funFact: 'Adding "please" and "Can I have..." makes your request friendly and polite in any English cafe!'
  },
  {
    category: 'Making Friends',
    emoji: '👋',
    english: 'Hi! It is so nice to meet you. How is your day going?',
    phonetic: 'haɪ! ɪt ɪz soʊ naɪs tuː miːt juː. haʊ ɪz jʊər deɪ ˈgoʊɪŋ?',
    translations: {
      Spanish: '¡Hola! Qué gusto conocerte. ¿Cómo va tu día?',
      Portuguese: 'Oi! Que bom te conhecer. Como está indo o seu dia?',
      French: 'Salut ! C\'est un plaisir de te rencontrer. Comment se passe ta journée ?',
      German: 'Hallo! Schön dich kennenzulernen. Wie läuft dein Tag so?',
      Hindi: 'नमस्ते! आपसे मिलकर बहुत अच्छा लगा। आपका दिन कैसा बीत रहा है?',
      Mandarin: '嗨！很高兴认识你。你今天过得怎么样？',
      Japanese: 'こんにちは！お会いできて嬉しいです。今日はいかがお過ごしですか？',
      Arabic: 'مرحباً! تشرفت بلقائك كثيراً. كيف يسير يومك؟',
      Italian: 'Ciao! Che piacere conoscerti. Come sta andando la tua giornata?',
      Russian: 'Привет! Очень приятно познакомиться. Как проходит твой день?'
    },
    quizQuestion: 'How should you answer "How is your day going?"',
    quizOptions: ['"It is going great, thank you!"', '"I am at the airport"', '"Yes, I do"'],
    correctAnswer: 0,
    funFact: '"How is your day going?" is the #1 friendliest conversation starter in English.'
  },
  {
    category: 'Travel & Directions',
    emoji: '✈️',
    english: 'Excuse me, could you tell me where the nearest train station is?',
    phonetic: 'ɪkˈskjuːz miː, kʊd juː tɛl miː wɛər ðə ˈnɪrɪst treɪn ˈsteɪʃən ɪz?',
    translations: {
      Spanish: 'Disculpe, ¿podría decirme dónde está la estación de tren más cercana?',
      Portuguese: 'Com licença, você poderia me dizer onde fica a estação de trem mais próxima?',
      French: 'Excusez-moi, pourriez-vous me dire où se trouve la gare la plus proche ?',
      German: 'Entschuldigung, könnten Sie mir sagen, wo der nächste Bahnhof ist?',
      Hindi: 'माफ़ कीजिए, क्या आप मुझे बता सकते हैं कि सबसे नज़दीकी ट्रेन स्टेशन कहाँ है?',
      Mandarin: '打扰一下，请问最近的火车站怎么走？',
      Japanese: 'すみません、一番近い電車の駅はどこか教えていただけますか？',
      Arabic: 'معذرة، هل يمكنك إخباري بأقرب محطة قطار؟',
      Italian: 'Mi scusi, potrebbe dirmi dov\'è la stazione ferroviaria più vicina?',
      Russian: 'Извините, вы не подскажете, где находится ближайший вокзал?'
    },
    quizQuestion: 'What does "nearest" mean?',
    quizOptions: ['Far away', 'Closest to you', 'Most expensive'],
    correctAnswer: 1,
    funFact: 'Starting with "Excuse me, could you tell me..." guarantees friendly help from locals!'
  },
  {
    category: 'Shopping & Prices',
    emoji: '🛒',
    english: 'Excuse me, how much is this, and do you have it in medium?',
    phonetic: 'ɪkˈskjuːz miː, haʊ mʌtʃ ɪz ðɪs, ænd duː juː hæv ɪt ɪn ˈmiːdiəm?',
    translations: {
      Spanish: 'Disculpe, ¿cuánto cuesta esto y lo tiene en talla mediana?',
      Portuguese: 'Com licença, quanto custa isso, e você tem no tamanho médio?',
      French: 'Pardon, combien coûte ceci, et l\'avez-vous en taille moyenne ?',
      German: 'Entschuldigung, wie viel kostet das und haben Sie es in Größe M?',
      Hindi: 'माफ़ कीजिए, यह कितने का है, और क्या आपके पास यह मीडियम साइज़ में है?',
      Mandarin: '打扰一下，请问这个多少钱？有中码（M码）吗？',
      Japanese: 'すみません、これはいか發ですか？Mサイズはありますか？',
      Arabic: 'معذرة، كم سعر هذا وهل يتوفر بمقاس متوسط؟',
      Italian: 'Mi scusi, quanto costa questo, e ce l\'ha in taglia media?',
      Russian: 'Извините, сколько это стоит и есть ли у вас средний размер (M)?'
    },
    quizQuestion: 'When buying clothes, "medium" refers to:',
    quizOptions: ['The color', 'The size', 'The store location'],
    correctAnswer: 1,
    funFact: 'In English clothing: S = Small, M = Medium, L = Large, XL = Extra Large.'
  }
];

export const FunLandingPage: React.FC<FunLandingPageProps> = ({
  nativeLanguage,
  onLanguageChange,
  onStartLearning,
  onOpenChat,
  onOpenGames,
  onOpenPricing,
  isPro
}) => {
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<0.8 | 1.0>(1.0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [hasCompletedPractice, setHasCompletedPractice] = useState(false);

  const practiceItem = FUN_PRACTICE_ITEMS[currentPracticeIndex];
  const heroContent = LOCALIZED_HERO_CONTENT[nativeLanguage] || LOCALIZED_HERO_CONTENT.Spanish;
  const currentTranslation = practiceItem.translations[nativeLanguage] || practiceItem.translations.Spanish;

  // Speak audio using Web Speech API
  const handlePlayAudio = (speed: 0.8 | 1.0) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(practiceItem.english);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setAudioSpeed(speed);
    window.speechSynthesis.speak(utterance);
  };

  const handleNextPhrase = () => {
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setShowQuiz(false);
    setSelectedQuizOption(null);
    setQuizResult(null);
    setCurrentPracticeIndex((prev) => (prev + 1) % FUN_PRACTICE_ITEMS.length);
  };

  const handleSelectQuizOption = (index: number) => {
    setSelectedQuizOption(index);
    if (index === practiceItem.correctAnswer) {
      setQuizResult('correct');
      setHasCompletedPractice(true);
      triggerProUpgradeConfetti();
    } else {
      setQuizResult('wrong');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-50/70 via-white to-neutral-50 p-6 sm:p-10 md:p-12 border border-indigo-100 shadow-sm">
        
        {/* Floating Background Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-200/25 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/25 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto space-y-8">
          
          {/* Top Pill & Language Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/90 text-indigo-900 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Fun & Easy English for All Non-English Speakers</span>
            </div>

            {/* Quick Native Language Picker */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-neutral-200 shadow-2xs">
              <Globe2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-neutral-600">Your Language:</span>
              <select
                aria-label="Select your native language"
                value={nativeLanguage}
                onChange={(e) => onLanguageChange(e.target.value as NativeLanguage)}
                className="text-xs font-extrabold text-neutral-900 bg-transparent border-0 focus:ring-0 cursor-pointer outline-none pr-2"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.name} value={lang.name}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[1.15]">
              Learn English with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600">
                Joy, Simplicity & Zero Fear
              </span>
            </h1>

            {/* Localized Subtitle */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-indigo-100 shadow-2xs max-w-2xl mx-auto">
              <p className="text-sm sm:text-base font-bold text-indigo-950">
                "{heroContent.welcome}"
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                {heroContent.subtitle}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onStartLearning()}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm group"
              >
                <Smile className="w-4 h-4" />
                <span>Start Learning Free (No Sign Up Needed)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onOpenChat('Hello! Can you help me practice basic English?')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-800 font-bold rounded-2xl border border-neutral-200 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Chat with AI Buddy</span>
              </button>
            </div>
          </div>

          {/* INTERACTIVE 1-MINUTE MINI LESSON WIDGET */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-neutral-200 shadow-xl max-w-3xl mx-auto space-y-5">
            
            {/* Widget Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{practiceItem.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                      1-Minute Interactive Practice
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                      {practiceItem.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Tap to hear pronunciation at normal or slow speed!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextPhrase}
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>Next Phrase</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Phrase Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    English Phrase:
                  </span>
                  <p className="text-lg sm:text-xl font-black text-neutral-900 leading-snug">
                    "{practiceItem.english}"
                  </p>
                  <p className="text-xs text-neutral-500 font-mono">
                    /{practiceItem.phonetic}/
                  </p>
                </div>

                {/* Audio Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Normal Speed 1.0x */}
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(1.0)}
                    disabled={isPlayingAudio}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                    title="Listen at normal speed"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Listen (1.0x)</span>
                  </button>

                  {/* Slow Speed 0.8x */}
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(0.8)}
                    disabled={isPlayingAudio}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-800 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                    title="Listen slowly to hear pronunciation clearly"
                  >
                    <span>🐢 Slow (0.8x)</span>
                  </button>
                </div>
              </div>

              {/* Translation in User's Native Language */}
              <div className="pt-3 border-t border-neutral-200/80 flex items-start gap-2 text-xs sm:text-sm">
                <span className="font-bold text-neutral-700 shrink-0">
                  {nativeLanguage} Translation:
                </span>
                <span className="text-indigo-900 font-semibold italic">
                  "{currentTranslation}"
                </span>
              </div>
            </div>

            {/* Quick Interactive Mini Quiz */}
            {!showQuiz ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <p className="text-xs text-neutral-500">
                  💡 <strong>Tip:</strong> {practiceItem.funFact}
                </p>
                <button
                  type="button"
                  onClick={() => setShowQuiz(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Test Yourself (1-Tap Mini Quiz)</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    Quick Check: {practiceItem.quizQuestion}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowQuiz(false)}
                    className="text-xs text-neutral-400 hover:text-neutral-700"
                  >
                    Hide
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {practiceItem.quizOptions.map((option, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === practiceItem.correctAnswer;
                    let btnStyle = 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-100';

                    if (selectedQuizOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-50 text-red-700 border-red-300';
                      }
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectQuizOption(idx)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {quizResult === 'correct' && (
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2">
                    <span>🎉 Awesome job! You earned +10 XP. Ready for real conversations!</span>
                  </div>
                )}
                {quizResult === 'wrong' && (
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-2">
                    <span>Try again! Listen to the audio to catch the meaning.</span>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 4 FUN & SIMPLE PILLARS */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-teal-600" />
            Designed For Everyday People
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            How Pro English Coach Makes Learning Easy
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            No boring grammar drills. No confusing textbooks. Just real English you can use immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl shrink-0">
              💬
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Friendly AI Buddy
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed flex-1">
              Text or speak naturally like chatting with a kind friend. The AI never judges and immediately translates any word you don't understand.
            </p>
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-1 cursor-pointer"
            >
              Try AI Chat →
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center text-2xl shrink-0">
              🐢
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Slow & Clear Audio
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed flex-1">
              Native speakers often talk too fast. Tap "Slow (0.8x)" to hear every vowel, consonant, and syllable clearly so your accent improves fast.
            </p>
            <span className="text-xs font-bold text-teal-700 flex items-center gap-1 pt-1">
              ✓ Dual-Speed Speech
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
              🎮
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Fun Bite-Sized Games
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed flex-1">
              Match words, flip flashcards, and take 2-minute daily quizzes. Earn streaks and colorful confetti as your vocabulary grows every single day.
            </p>
            <button
              type="button"
              onClick={onOpenGames}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 pt-1 cursor-pointer"
            >
              Play Word Games →
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl shrink-0">
              🌍
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Bilingual Translations
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed flex-1">
              Explanations provided in Spanish, Portuguese, French, Hindi, Arabic, Mandarin, and 10+ languages so you are never confused or lost.
            </p>
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1 pt-1">
              ✓ 16 Mother Tongues
            </span>
          </div>
        </div>
      </section>

      {/* POPULAR REAL-LIFE SITUATIONS */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Real-World English You Can Use Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Choose a Fun Topic to Learn
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onStartLearning()}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Topics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              id: 'coffee',
              title: 'Coffee, Food & Cafes',
              emoji: '☕',
              desc: 'How to order drinks, customize milk, and ask for the bill politely.',
              phrases: ['"Can I have a table for two?"', '"Could I get the check, please?"']
            },
            {
              id: 'travel',
              title: 'Airport, Hotels & Travel',
              emoji: '✈️',
              desc: 'Asking for directions, checking into hotels, and finding your gate.',
              phrases: ['"Where is terminal B?"', '"I have a reservation under my name."']
            },
            {
              id: 'friends',
              title: 'Meeting People & Friends',
              emoji: '👋',
              desc: 'Making small talk, introducing yourself, and sharing your hobbies.',
              phrases: ['"Where are you from?"', '"It was wonderful meeting you!"']
            },
            {
              id: 'shopping',
              title: 'Shopping & Clothes',
              emoji: '🛍️',
              desc: 'Asking prices, trying on sizes, and finding sales discounts.',
              phrases: ['"Can I try this on?"', '"Do you accept credit cards?"']
            },
            {
              id: 'work',
              title: 'Polite Workplace Chat',
              emoji: '💼',
              desc: 'Writing courteous emails, saying thank you, and asking questions nicely.',
              phrases: ['"Thank you for your help."', '"Could you review this update?"']
            },
            {
              id: 'help',
              title: 'Emergencies & Help',
              emoji: '🚨',
              desc: 'Asking for a doctor, directions to pharmacy, and getting assistance.',
              phrases: ['"I need some assistance, please."', '"Where is the pharmacy?"']
            }
          ].map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{topic.emoji}</span>
                  <h4 className="font-extrabold text-sm text-neutral-900 group-hover:text-indigo-600 transition-colors">
                    {topic.title}
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {topic.desc}
                </p>

                <div className="space-y-1 pt-2">
                  {topic.phrases.map((p) => (
                    <div key={p} className="text-[11px] font-semibold text-neutral-700 bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-100 flex items-center gap-1.5">
                      <span className="text-indigo-600">›</span> {p}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-neutral-100 mt-4">
                <button
                  type="button"
                  onClick={() => onStartLearning(topic.id)}
                  className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  Practice Topic →
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChat(`Let's practice English about ${topic.title}!`)}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-lg cursor-pointer"
                >
                  Chat This
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNER TESTIMONIALS AROUND THE WORLD */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Loved By Thousands of Learners
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
            Real Non-English Speakers, Real Success
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-neutral-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇲🇽</span>
              <div>
                <p className="text-xs font-bold text-neutral-900">María R.</p>
                <p className="text-[10px] text-neutral-500">Spanish Speaker • Mexico City</p>
              </div>
            </div>
            <p className="text-xs text-neutral-600 italic leading-relaxed">
              "Finally an app that isn't intimidating! If I get stuck, it immediately explains in Spanish and gives me the slow audio. My travel confidence skyrocketed."
            </p>
            <div className="text-amber-500 text-xs">★★★★★</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-neutral-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇧🇷</span>
              <div>
                <p className="text-xs font-bold text-neutral-900">Lucas M.</p>
                <p className="text-[10px] text-neutral-500">Portuguese Speaker • São Paulo</p>
              </div>
            </div>
            <p className="text-xs text-neutral-600 italic leading-relaxed">
              "The slow audio is a lifesaver. Other apps speak so fast it makes me nervous. The AI chat feels like texting a patient friend who wants to help you."
            </p>
            <div className="text-amber-500 text-xs">★★★★★</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-neutral-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇳</span>
              <div>
                <p className="text-xs font-bold text-neutral-900">Priya K.</p>
                <p className="text-[10px] text-neutral-500">Hindi Speaker • Bengaluru</p>
              </div>
            </div>
            <p className="text-xs text-neutral-600 italic leading-relaxed">
              "I wanted to sound more natural when speaking with international colleagues. The workplace chat lessons gave me exact sentences to use right away."
            </p>
            <div className="text-amber-500 text-xs">★★★★★</div>
          </div>
        </div>
      </section>

      {/* LEGALITIES & TRUST DISCLOSURE SECTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">
                  Our Transparency & Legal Standards
                </h4>
                <p className="text-xs text-neutral-400">
                  Fair, safe, and privacy-first learning designed for users worldwide.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-neutral-300">
              <span className="px-2.5 py-1 rounded-full bg-neutral-800 border border-neutral-700">
                🔒 SSL 256-Bit Encryption
              </span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-800 border border-neutral-700">
                🛡️ GDPR & CCPA Ready
              </span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-800 border border-neutral-700">
                🤖 Responsible AI Standards
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300 leading-relaxed">
            <div className="space-y-1.5">
              <h5 className="font-bold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Zero Data Selling
              </h5>
              <p className="text-[11px] text-neutral-400">
                We respect your personal privacy. We never sell or license your speech, text practice prompts, or personal profile information to third-party advertisers.
              </p>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                AI Educational Notice
              </h5>
              <p className="text-[11px] text-neutral-400">
                Pro English Coach uses advanced AI (Google Gemini) for conversational language simulations. AI responses are for educational practice and do not constitute certified legal or medical advice.
              </p>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-bold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Risk-Free 3-Day Trial
              </h5>
              <p className="text-[11px] text-neutral-400">
                Free sessions are always accessible. Pro plans include a 3-day complimentary trial with a 14-day money-back guarantee, easily cancellable anytime with 1 click.
              </p>
            </div>
          </div>

          {/* Legal Document Links */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-neutral-400">
              <Link to="/terms" className="hover:text-white underline transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-white underline transition-colors">
                Privacy Policy
              </Link>
              <Link to="/refund" className="hover:text-white underline transition-colors">
                Refund & Cancellation Policy
              </Link>
              <a 
                href="mailto:ProEnglishAICoach@protonmail.com" 
                className="hover:text-white underline transition-colors"
              >
                Contact Legal: ProEnglishAICoach@protonmail.com
              </a>
            </div>

            <p className="text-[11px] text-neutral-500">
              © 2026 Pro English Coach. All rights reserved.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
