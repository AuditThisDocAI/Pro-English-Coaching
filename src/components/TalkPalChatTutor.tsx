import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatTutorMessage, 
  NativeLanguage, 
  EnglishCEFRLevel, 
  SavedPhrase,
  SUPPORTED_LANGUAGES
} from '../types';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Globe2, 
  Bookmark, 
  Check, 
  HelpCircle, 
  AlertCircle, 
  ArrowRight, 
  Flame, 
  Zap, 
  User, 
  Bot,
  Copy,
  ChevronDown,
  Gauge,
  Languages,
  Search,
  X,
  BookOpen,
  Wand2,
  CheckCircle2,
  SlidersHorizontal,
  Loader2
} from 'lucide-react';
import { useTTS } from '../lib/useTTS';
import { SpeakerSpeedControl } from './SpeakerSpeedControl';
import { motion, AnimatePresence } from 'motion/react';
import { translateText, generateSmartRuleBasedTranslation } from '../lib/translationService';

export interface TalkPalChatTutorProps {
  nativeLanguage: NativeLanguage;
  englishLevel: EnglishCEFRLevel;
  onSavePhrase?: (phrase: { original: string; professional: string; translation?: string; why?: string; mode?: string }) => void;
  isPro?: boolean;
  onOpenPricing?: () => void;
  onAddXP?: (amount: number) => void;
  onLanguageChange?: (lang: NativeLanguage) => void;
  initialText?: string;
}

const COACH_PERSONAS = [
  {
    id: 'elena',
    name: 'Elena',
    role: 'Friendly Conversation Coach',
    avatar: '👩',
    desc: 'Warm tutor specializing in daily conversations, confidence & clear pronunciation',
    gender: 'female' as const,
    voicePitch: 1.12,
  },
  {
    id: 'emma',
    name: 'Emma',
    role: 'Everyday English Tutor',
    avatar: '👩‍🏫',
    desc: 'Helpful buddy for practical vocabulary, real-life expressions & listening',
    gender: 'female' as const,
    voicePitch: 1.08,
  },
  {
    id: 'sophia',
    name: 'Sophia',
    role: 'Travel & Social Guide',
    avatar: '👩‍💻',
    desc: 'Friendly guide for coffee orders, dining out, making friends & exploring',
    gender: 'female' as const,
    voicePitch: 1.08,
  },
  {
    id: 'david',
    name: 'David',
    role: 'Practical Speaking Partner',
    avatar: '👨',
    desc: 'Warm partner for natural chit-chat, hobbies, storytelling & daily fluency',
    gender: 'male' as const,
    voicePitch: 0.95,
  }
];

const STARTER_TOPICS = [
  {
    title: 'Ordering at a Cafe',
    prompt: 'Can you help me practice ordering food and drinks at a local coffee shop?',
    category: 'Everyday'
  },
  {
    title: 'Making New Friends',
    prompt: 'What are friendly conversation starters to introduce myself and make new friends?',
    category: 'Social'
  },
  {
    title: 'Asking for Directions',
    prompt: 'How do I ask someone politely for directions when I am exploring a city?',
    category: 'Travel'
  },
  {
    title: 'Talking About Hobbies',
    prompt: 'Let us practice talking about weekend hobbies, favorite music, and movies!',
    category: 'Casual'
  }
];

const QUICK_DRAFT_PROMPTS: Record<string, string[]> = {
  Spanish: [
    '¿Cómo pido la cuenta amablemente en un restaurante?',
    'Disculpe, ¿dónde queda la parada de autobús más cercana?',
    '¿Podría hablar un poco más despacio, por favor?',
    'Me gustaría saber qué plato me recomienda hoy.'
  ],
  Portuguese: [
    'Como posso pedir a conta educadamente em um restaurante?',
    'Com licença, onde fica o ponto de ônibus mais próximo?',
    'Poderia falar um pouco mais devagar, por favor?',
    'Qual prato você me recomenda hoje?'
  ],
  French: [
    'Comment puis-je demander l\'addition poliment au restaurant ?',
    'Excusez-moi, où se trouve l\'arrêt de bus le plus proche ?',
    'Pourriez-vous parler un peu plus lentement s\'il vous plaît ?',
    'Quel plat me recommandez-vous aujourd\'hui ?'
  ],
  German: [
    'Wie frage ich höflich nach der Rechnung im Restaurant?',
    'Entschuldigung, wo ist die nächste Bushaltestelle?',
    'Könnten Sie bitte etwas langsamer sprechen?',
    'Welches Gericht können Sie mir heute empfehlen?'
  ],
  Hindi: [
    'रेस्टोरेंट में विनम्रतापूर्वक बिल कैसे माँगते हैं?',
    'माफ़ कीजिए, सबसे नज़दीकी बस स्टॉप कहाँ है?',
    'क्या आप कृपया थोड़ा धीरे बोल सकते हैं?',
    'आज आप क्या खाने की सलाह देंगे?'
  ],
  Mandarin: [
    '在餐厅怎样礼貌地结账？',
    '请问最近的公交车站在哪里？',
    '可以麻烦您说得稍微慢一点吗？',
    '您今天有什么特色菜推荐吗？'
  ],
  Japanese: [
    'レストランで丁寧にお会計をお願いするにはどう言えばいいですか？',
    'すみません、一番近いバス停はどこですか？',
    'もう少しゆっくり話していただけますか？',
    '今日のおすすめ料理は何ですか？'
  ],
  Korean: [
    '식당에서 계산서를 정중하게 요청하려면 어떻게 말하나요?',
    '실례지만 가장 가까운 버스 정류장이 어디인가요?',
    '조금만 더 천천히 말씀해 주실 수 있나요?',
    '오늘 어떤 메뉴를 추천하시나요?'
  ]
};

export function getWelcomeTranslation(personaName: string, lang: NativeLanguage | string): string {
  const normalized = (lang || 'Spanish').toLowerCase();
  if (normalized.includes('spanish') || normalized.includes('español')) {
    return `¡Hola! Soy ${personaName}, tu tutora de inglés con IA en English Coach. Estoy aquí para ayudarte a practicar inglés conversacional y cotidiano con confianza. ¿Qué te gustaría practicar hoy?`;
  }
  if (normalized.includes('french') || normalized.includes('français')) {
    return `Bonjour ! Je suis ${personaName}, votre coach d'anglais IA sur English Coach. Je suis là pour vous aider à pratiquer l'anglais du quotidien en toute confiance. Que souhaitez-vous pratiquer aujourd'hui ?`;
  }
  if (normalized.includes('portuguese') || normalized.includes('português')) {
    return `Olá! Eu sou ${personaName}, sua tutora de inglês com IA no English Coach. Estou aqui para ajudar você a praticar inglês do dia a dia com segurança. O que gostaria de praticar hoje?`;
  }
  if (normalized.includes('german') || normalized.includes('deutsch')) {
    return `Hallo! Ich bin ${personaName}, dein KI-Englisch-Coach bei English Coach. Ich helfe dir dabei, alltagsnahes Englisch mit Freude zu üben. Was möchtest du heute üben?`;
  }
  if (normalized.includes('hindi')) {
    return `नमस्ते! मैं English Coach पर आपकी AI अंग्रेज़ी कोच ${personaName} हूँ। मैं आपको रोज़मर्रा की बातचीत में आत्मविश्वास से अंग्रेज़ी बोलने में मदद करूँगी। आज आप क्या अभ्यास करना चाहेंगे?`;
  }
  if (normalized.includes('mandarin') || normalized.includes('chinese')) {
    return `你好！我是 English Coach 的 AI 英语教练 ${personaName}。我将协助你轻松练习实用日常英语。今天你想聊些什么？`;
  }
  if (normalized.includes('japanese')) {
    return `こんにちは！English Coach のAI英語コーチ、${personaName}です。日常英会話をリラックスして楽しく練習しましょう。今日はどんなことを練習しますか？`;
  }
  if (normalized.includes('korean')) {
    return `안녕하세요! English Coach의 AI 영어 코치 ${personaName}입니다. 일상 속에서 자신감 있게 영어를 구사할 수 있도록 도와드릴게요. 오늘 어떤 대화를 나눠볼까요?`;
  }
  if (normalized.includes('arabic')) {
    return `مرحباً! أنا ${personaName}، مدربتك للغة الإنجليزية في English Coach. أنا هنا لمساعدتك في ممارسة الإنجليزية اليومية بكل ثقة وسهولة. ماذا تود أن نتدرب عليه اليوم؟`;
  }
  if (normalized.includes('italian')) {
    return `Ciao! Sono ${personaName}, il tuo tutor AI di inglese su English Coach. Sono qui per aiutarti a praticare l'inglese quotidiano in modo semplice e naturale. Cosa vorresti praticare oggi?`;
  }
  if (normalized.includes('russian')) {
    return `Здравствуйте! Я ${personaName}, ваш ИИ-преподаватель английского в English Coach. Я помогу вам уверенно заговорить на повседневном английском. Что вы хотите попрактиковать сегодня?`;
  }
  if (normalized.includes('turkish')) {
    return `Merhaba! Ben English Coach'taki yapay zeka İngilizce koçunuz ${personaName}. Günlük İngilizceyi özgüvenle konuşmanız için buradayım. Bugün ne üzerine çalışmak istersiniz?`;
  }
  if (normalized.includes('vietnamese')) {
    return `Xin chào! Tôi là ${personaName}, huấn luyện viên tiếng Anh AI của bạn tại English Coach. Tôi ở đây để giúp bạn luyện tập tiếng Anh giao tiếp hàng ngày thật tự tin. Bạn muốn luyện gì hôm nay?`;
  }
  if (normalized.includes('tag') || normalized.includes('filip')) {
    return `Kumusta! Ako si ${personaName}, ang iyong AI English coach sa English Coach. Narito ako upang tulungan kang magsanay ng pang-araw-araw na English upang makapagsalita ka nang may kumpiyansa. Ano ang gusto mong sanayin ngayon?`;
  }
  if (normalized.includes('polish')) {
    return `Cześć! Jestem ${personaName}, Twoim nauczycielem angielskiego AI w English Coach. Pomogę Ci w nauce codziennego angielskiego z pewnością siebie. Co chciałbyś dzisiaj przećwiczyć?`;
  }
  if (normalized.includes('indonesian')) {
    return `Halo! Saya ${personaName}, tutor bahasa Inggris AI Anda di English Coach. Saya di sini untuk membantu Anda berlatih percakapan bahasa Inggris sehari-hari dengan percaya diri. Apa yang ingin Anda latih hari ini?`;
  }

  return `Hello! I am ${personaName}, your AI English coach on English Coach. I am here to help you practice natural, everyday English with confidence. What would you like to practice today?`;
}

export const TalkPalChatTutor: React.FC<TalkPalChatTutorProps> = ({
  nativeLanguage,
  englishLevel,
  onSavePhrase,
  isPro = false,
  onOpenPricing,
  onAddXP,
  onLanguageChange,
  initialText = ''
}) => {
  const [selectedPersona, setSelectedPersona] = useState(COACH_PERSONAS[0]);
  const [messages, setMessages] = useState<ChatTutorMessage[]>([
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: `Hello! I'm ${COACH_PERSONAS[0].name}, your AI English coach on English Coach. I'm here to help you practice natural, everyday English so you can speak confidently in daily life, travel, and conversations. What would you like to practice today?`,
      translation: getWelcomeTranslation(COACH_PERSONAS[0].name, nativeLanguage),
      suggestions: [
        'Can you help me practice ordering at a coffee shop?',
        'What are friendly ways to introduce myself to new people?',
        'How do I politely ask for directions when traveling?'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState(initialText || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Translation Options State
  const [autoTranslate, setAutoTranslate] = useState<boolean>(true);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});
  const [translationsCache, setTranslationsCache] = useState<Record<string, string>>({});
  const [translatingIds, setTranslatingIds] = useState<Set<string>>(new Set());
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  // Draft in Native Language Helper State
  const [showDraftHelper, setShowDraftHelper] = useState(false);
  const [draftText, setDraftText] = useState('');
  const [isTranslatingDraft, setIsTranslatingDraft] = useState(false);
  const [draftResult, setDraftResult] = useState<{ original: string; english: string } | null>(null);

  // Quick In-Chat Translator Tool State
  const [showQuickLookup, setShowQuickLookup] = useState(false);
  const [quickLookupQuery, setQuickLookupQuery] = useState('');
  const [quickLookupResult, setQuickLookupResult] = useState<string | null>(null);
  const [isQuickLookingUp, setIsQuickLookingUp] = useState(false);

  // Saved / Copied State
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { speed, setSpeed, speak, isSpeaking, stop } = useTTS();

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.name === nativeLanguage) || {
    name: nativeLanguage,
    label: `${nativeLanguage}`,
    flag: '🌐'
  };

  // Pre-fill input if initialText is updated from outside
  useEffect(() => {
    if (initialText && initialText.trim()) {
      setInput(initialText.trim());
    }
  }, [initialText]);

  // Synchronize initial welcome message when nativeLanguage or coach persona changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-1') {
        return [
          {
            ...prev[0],
            text: `Hello! I'm ${selectedPersona.name}, your AI English coach on English Coach. I'm here to help you practice natural, everyday English so you can speak confidently in daily life, travel, and conversations. What would you like to practice today?`,
            translation: getWelcomeTranslation(selectedPersona.name, nativeLanguage)
          }
        ];
      }
      return prev;
    });
  }, [nativeLanguage, selectedPersona]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showDraftHelper, showQuickLookup]);

  // Handle Speech-to-Text
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          }
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Speech recognition not available:', err);
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Voice dictation is supported in Chrome, Safari, and Edge.');
      return;
    }

    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.warn('Could not start recognition:', e);
        setIsRecording(false);
      }
    }
  };

  // Dynamic Translation for individual messages
  const handleToggleTranslation = async (msgId: string, text: string) => {
    const currentExpanded = showTranslations[msgId] ?? autoTranslate;
    if (currentExpanded && !autoTranslate) {
      setShowTranslations((prev) => ({ ...prev, [msgId]: false }));
      return;
    }

    setShowTranslations((prev) => ({ ...prev, [msgId]: true }));
    const cacheKey = `${msgId}_${nativeLanguage}`;
    if (translationsCache[cacheKey]) {
      return;
    }

    setTranslatingIds((prev) => new Set(prev).add(msgId));
    try {
      const translated = await translateText(text, nativeLanguage);
      setTranslationsCache((prev) => ({ ...prev, [cacheKey]: translated }));
    } catch (err) {
      console.warn('Translate error:', err);
      const fallback = generateSmartRuleBasedTranslation(text, nativeLanguage);
      setTranslationsCache((prev) => ({ ...prev, [cacheKey]: fallback }));
    } finally {
      setTranslatingIds((prev) => {
        const next = new Set(prev);
        next.delete(msgId);
        return next;
      });
    }
  };

  // Helper to translate draft native phrase into natural conversational English
  const handleTranslateDraftToEnglish = async (textToTranslate?: string) => {
    const query = (textToTranslate || draftText).trim();
    if (!query) return;

    setIsTranslatingDraft(true);
    setDraftResult(null);

    try {
      const english = await translateText(query, 'English');
      setDraftResult({ original: query, english: english || query });
    } catch (err) {
      console.warn('Draft translation error:', err);
      setDraftResult({ original: query, english: query });
    } finally {
      setIsTranslatingDraft(false);
    }
  };

  // Helper to translate direct text in chat input field to English
  const handleTranslateCurrentInputToEnglish = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setIsLoading(true);
    try {
      const english = await translateText(text, 'English');
      if (english && english.trim() !== text) {
        setInput(english.trim());
      }
    } catch (err) {
      console.warn('Direct input translate error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper for in-chat quick lookup
  const handleQuickLookup = async () => {
    const query = quickLookupQuery.trim();
    if (!query) return;

    setIsQuickLookingUp(true);
    setQuickLookupResult(null);
    try {
      const res = await translateText(query, nativeLanguage);
      setQuickLookupResult(res || 'Translation complete');
    } catch (err) {
      setQuickLookupResult(generateSmartRuleBasedTranslation(query, nativeLanguage));
    } finally {
      setIsQuickLookingUp(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatTutorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({ sender: m.sender, text: m.text })),
          userInput: messageText,
          nativeLanguage,
          englishLevel,
          coachPersona: `${selectedPersona.name} - ${selectedPersona.role}`
        })
      });

      if (!res.ok) {
        throw new Error('Failed to reach AI Tutor server');
      }

      const data = await res.json();

      const tutorMessage: ChatTutorMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: data.reply || 'Thank you for sharing! How else would you like to practice today?',
        translation: data.translation,
        formalCorrection: data.formalCorrection,
        suggestions: data.suggestions || [
          'Can we try another everyday conversation?',
          'What are alternative ways to say this?',
          'How would a native speaker say this?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, tutorMessage]);
      onAddXP?.(15);

      // Auto-pronounce tutor's response for immersion
      speak(tutorMessage.text, { 
        rate: speed,
        gender: selectedPersona.gender,
        pitch: selectedPersona.voicePitch
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatTutorMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: `I noticed you said: "${messageText}". In natural daily English, a friendly way to phrase this is: "Could you please help me with this?"`,
        translation: generateSmartRuleBasedTranslation('Could you please help me with this?', nativeLanguage),
        formalCorrection: {
          original: messageText,
          formalAlternative: 'Could you please help me with this?',
          why: 'Using polite modal phrases like "Could you please..." creates a warm and courteous everyday conversation.',
          grammarTag: 'Friendly Requests'
        },
        suggestions: ['How would I say this at a restaurant?', 'Can you give me another daily conversation starter?'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCorrection = (msg: ChatTutorMessage) => {
    if (!msg.formalCorrection) return;
    onSavePhrase?.({
      original: msg.formalCorrection.original,
      professional: msg.formalCorrection.formalAlternative,
      translation: msg.translation,
      why: msg.formalCorrection.why,
      mode: 'chat'
    });
    setSavedMessageIds((prev) => new Set(prev).add(msg.id));
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.label.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div id="talkpal-ai-chat-tutor-container" className="flex flex-col h-[780px] max-h-[85vh] bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden relative">
      
      {/* Top Header: Coach Selector & Speed Controls */}
      <div className="px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl border border-indigo-200/80 shrink-0 shadow-2xs">
            {selectedPersona.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-neutral-900">{selectedPersona.name}</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online AI Tutor
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 truncate max-w-[200px] sm:max-w-xs">
              {selectedPersona.role}
            </p>
          </div>
        </div>

        {/* Coach Switching Pills & Audio Speed Setting */}
        <div className="flex items-center gap-2 flex-wrap">
          <SpeakerSpeedControl variant="header" idPrefix="chat-tutor-speed" />

          <div className="hidden sm:flex items-center gap-1 bg-neutral-200/60 p-1 rounded-xl">
            {COACH_PERSONAS.map((p) => (
              <button
                key={p.id}
                type="button"
                id={`coach-select-${p.id}`}
                onClick={() => setSelectedPersona(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPersona.id === p.id
                    ? 'bg-white text-indigo-900 shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Language Translation Options Sub-bar */}
      <div className="px-4 py-2 bg-indigo-50/70 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        
        {/* Left: Translation Language Option Dropdown */}
        <div className="flex items-center gap-2 relative" ref={langDropdownRef}>
          <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
            <Globe2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden xs:inline text-neutral-600 font-semibold text-[11px]">Translate to:</span>
          </div>

          <button
            type="button"
            id="chat-language-selector-button"
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="px-2.5 py-1 rounded-xl bg-white border border-indigo-200 hover:border-indigo-400 text-indigo-950 font-bold flex items-center gap-1.5 shadow-2xs hover:bg-indigo-50/50 transition-all cursor-pointer"
            title="Change translation language for AI tutor chat"
          >
            <span className="text-sm">{currentLangObj.flag}</span>
            <span className="text-xs font-extrabold">{currentLangObj.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Language Selection Modal / Dropdown */}
          <AnimatePresence>
            {isLangDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 bg-white rounded-2xl border border-neutral-200 shadow-xl z-50 p-3 space-y-2"
              >
                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-indigo-600" />
                    <span className="font-extrabold text-xs text-neutral-900">Translation Language</span>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md font-bold">16 Languages</span>
                </div>

                {/* Search Language */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="search-chat-languages-input"
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    placeholder="Search your language..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Languages List */}
                <div className="max-h-56 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                  {filteredLanguages.map((lang) => {
                    const isSelected = lang.name === nativeLanguage;
                    return (
                      <button
                        key={lang.name}
                        type="button"
                        id={`select-chat-lang-${lang.name}`}
                        onClick={() => {
                          onLanguageChange?.(lang.name);
                          setIsLangDropdownOpen(false);
                          setLangSearch('');
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-extrabold shadow-xs'
                            : 'hover:bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <div>
                            <p className={`text-xs ${isSelected ? 'text-white' : 'text-neutral-900 font-bold'}`}>
                              {lang.label}
                            </p>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                      </button>
                    );
                  })}
                  {filteredLanguages.length === 0 && (
                    <p className="text-xs text-neutral-400 text-center py-4">No matching language found</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Quick Translation Toggles & Tools */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Auto-Translate Toggle */}
          <button
            type="button"
            id="toggle-auto-translate-button"
            onClick={() => setAutoTranslate(!autoTranslate)}
            className={`px-2.5 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border ${
              autoTranslate
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
            }`}
            title="Automatically display translations under tutor messages"
          >
            <span className={`w-2 h-2 rounded-full ${autoTranslate ? 'bg-white' : 'bg-neutral-400'}`} />
            <span>Auto-Translate: {autoTranslate ? 'ON' : 'OFF'}</span>
          </button>

          {/* Draft in Native Language Toggle */}
          <button
            type="button"
            id="toggle-draft-helper-button"
            onClick={() => {
              setShowDraftHelper(!showDraftHelper);
              if (showQuickLookup) setShowQuickLookup(false);
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border ${
              showDraftHelper
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-50'
            }`}
            title="Type in your native language and translate to English"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Draft in {currentLangObj.name}</span>
          </button>

          {/* Quick Word & Phrase Lookup Tool */}
          <button
            type="button"
            id="toggle-quick-lookup-button"
            onClick={() => {
              setShowQuickLookup(!showQuickLookup);
              if (showDraftHelper) setShowDraftHelper(false);
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border ${
              showQuickLookup
                ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
            }`}
            title="Quickly look up any word or idiom during the chat"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Quick Lookup</span>
          </button>

        </div>
      </div>

      {/* Quick Lookup Drawer / Companion (Collapsible) */}
      <AnimatePresence>
        {showQuickLookup && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-purple-50/90 border-b border-purple-200 p-4 shrink-0 shadow-inner"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-700" />
                <span className="text-xs font-black text-purple-950 uppercase tracking-wider">
                  In-Chat Word & Phrase Translator
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickLookup(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                id="quick-lookup-input"
                value={quickLookupQuery}
                onChange={(e) => setQuickLookupQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickLookup()}
                placeholder={`Type any English word or ${currentLangObj.name} phrase to translate...`}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-purple-200 focus:outline-hidden focus:border-purple-500 font-medium text-neutral-900"
              />
              <button
                type="button"
                id="quick-lookup-submit"
                onClick={handleQuickLookup}
                disabled={!quickLookupQuery.trim() || isQuickLookingUp}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isQuickLookingUp ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Translate</span>
              </button>
            </div>

            {/* Lookup Result Box */}
            {quickLookupResult && (
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2.5 p-3 bg-white rounded-xl border border-purple-200/80 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-purple-700 block uppercase">
                    Translation ({currentLangObj.name}):
                  </span>
                  <p className="font-bold text-neutral-900 text-sm">{quickLookupResult}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => speak(quickLookupResult, { rate: speed })}
                    className="p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold flex items-center gap-1 cursor-pointer"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInput((prev) => (prev ? `${prev} ${quickLookupResult}` : quickLookupResult));
                      setShowQuickLookup(false);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-extrabold text-[11px] cursor-pointer"
                  >
                    Insert to Chat
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-neutral-50/30 to-white">
        
        {/* Starter Topic Prompts if few messages */}
        {messages.length <= 1 && (
          <div className="space-y-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block text-center">
              Suggested Everyday Practice Topics
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STARTER_TOPICS.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  id={`starter-topic-${i}`}
                  onClick={() => handleSendMessage(topic.prompt)}
                  className="p-3 rounded-2xl bg-white border border-neutral-200/80 hover:border-indigo-400 hover:bg-indigo-50/40 text-left transition-all group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-0.5">
                    <span>{topic.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-extrabold">{topic.category}</span>
                  </div>
                  <p className="text-xs text-neutral-500 group-hover:text-neutral-700 line-clamp-2">
                    "{topic.prompt}"
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isCurrentSpeaking = isSpeaking(msg.text);

          const cacheKey = `${msg.id}_${nativeLanguage}`;
          const currentTranslation = translationsCache[cacheKey] || 
            (msg.translation && (msg.id === 'welcome-1' ? getWelcomeTranslation(selectedPersona.name, nativeLanguage) : msg.translation));
          
          const isTranslationVisible = showTranslations[msg.id] ?? autoTranslate;
          const isTranslating = translatingIds.has(msg.id);

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div className={`flex items-start gap-2.5 max-w-[92%] sm:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 mt-1 shadow-2xs ${
                  isUser ? 'bg-indigo-600 text-white font-bold' : 'bg-white border border-neutral-200'
                }`}>
                  {isUser ? 'You' : selectedPersona.avatar}
                </div>

                {/* Message Box */}
                <div className={`rounded-3xl p-4 sm:p-5 shadow-xs text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white border border-neutral-200/80 text-neutral-900 rounded-tl-none'
                }`}>
                  <p className="font-normal whitespace-pre-wrap">{msg.text}</p>

                  {/* Audio & Actions toolbar for tutor */}
                  {!isUser && (
                    <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          id={`listen-msg-${msg.id}`}
                          onClick={() => speak(msg.text, { 
                            rate: speed,
                            gender: selectedPersona.gender,
                            pitch: selectedPersona.voicePitch
                          })}
                          className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 font-bold cursor-pointer ${
                            isCurrentSpeaking
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                          }`}
                          title="Listen with native English pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isCurrentSpeaking ? 'Speaking...' : 'Listen'}</span>
                        </button>

                        {/* Speakerphone Speed Controls */}
                        <div className="flex items-center gap-0.5 bg-neutral-100 px-1 py-0.5 rounded-lg border border-neutral-200 text-[10px] font-bold text-neutral-600">
                          <Gauge className="w-2.5 h-2.5 text-indigo-500 ml-0.5" />
                          {[0.8, 1.0, 1.2].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSpeed(s as any)}
                              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                                Math.abs(speed - s) < 0.05
                                  ? 'bg-indigo-600 text-white shadow-2xs font-extrabold'
                                  : 'hover:text-indigo-700 hover:bg-neutral-200/50'
                              }`}
                              title={`Speakerphone speed: ${s}x`}
                            >
                              {s}x
                            </button>
                          ))}
                        </div>

                        {/* Language Translation Option Button */}
                        <button
                          type="button"
                          id={`translate-msg-${msg.id}`}
                          onClick={() => handleToggleTranslation(msg.id, msg.text)}
                          className={`p-1.5 rounded-lg border font-bold flex items-center gap-1 cursor-pointer transition-all ${
                            isTranslationVisible
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-200'
                          }`}
                          title={`Translate to ${nativeLanguage}`}
                        >
                          {isTranslating ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                          ) : (
                            <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                          <span>{isTranslationVisible ? `Hide ${nativeLanguage}` : `Translate (${currentLangObj.flag})`}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        id={`copy-msg-${msg.id}`}
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                        title="Copy phrase"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}

                  {/* User message action toolbar (allows translating user's message back to native language) */}
                  {isUser && (
                    <div className="mt-2 pt-2 border-t border-indigo-500/50 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        id={`translate-user-msg-${msg.id}`}
                        onClick={() => handleToggleTranslation(msg.id, msg.text)}
                        className="text-[11px] font-bold text-indigo-100 hover:text-white flex items-center gap-1 cursor-pointer"
                        title={`Check ${nativeLanguage} translation of your words`}
                      >
                        <Globe2 className="w-3 h-3" />
                        <span>{showTranslations[msg.id] ? 'Hide Translation' : `Translate to ${currentLangObj.name}`}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="text-indigo-200 hover:text-white p-1 cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}

                  {/* Native Language Translation Dropdown / Card */}
                  {isTranslationVisible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2.5 p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-950 font-medium space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-[10px] text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                          <span>{currentLangObj.flag}</span>
                          <span>{currentLangObj.name} Translation</span>
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold">
                          Instant AI Translation
                        </span>
                      </div>

                      {isTranslating ? (
                        <div className="flex items-center gap-2 py-1 text-emerald-700 animate-pulse">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Translating response to {currentLangObj.name}...</span>
                        </div>
                      ) : (
                        <p className="leading-relaxed font-semibold text-emerald-900">
                          {currentTranslation || 'Translation ready'}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Instant Formal Feedback Card (if user message was analyzed) */}
              {!isUser && msg.formalCorrection && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ml-10 max-w-[92%] sm:max-w-[85%] p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200/80 shadow-xs space-y-2.5 text-xs text-neutral-800"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-black text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Natural Everyday Phrasing Upgrade</span>
                    </div>
                    {msg.formalCorrection.grammarTag && (
                      <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-800 font-extrabold text-[10px]">
                        {msg.formalCorrection.grammarTag}
                      </span>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs space-y-1">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Recommended Natural Phrasing:</span>
                    <p className="font-bold text-neutral-900 text-xs sm:text-sm">
                      "{msg.formalCorrection.formalAlternative}"
                    </p>
                  </div>

                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    <strong>Why this works:</strong> {msg.formalCorrection.why}
                  </p>

                  <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
                    <button
                      type="button"
                      id={`listen-correction-${msg.id}`}
                      onClick={() => speak(msg.formalCorrection!.formalAlternative, { rate: speed })}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen to improved phrase
                    </button>

                    <button
                      type="button"
                      id={`save-correction-${msg.id}`}
                      onClick={() => handleSaveCorrection(msg)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                        savedMessageIds.has(msg.id)
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <Bookmark className="w-3 h-3" />
                      <span>{savedMessageIds.has(msg.id) ? 'Saved' : 'Save to Practice'}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold pl-10 animate-pulse">
            <Bot className="w-4 h-4 text-indigo-600 animate-spin" />
            <span>{selectedPersona.name} is thinking of a friendly reply...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-up Quick Reply Chips */}
      {messages.length > 0 && messages[messages.length - 1]?.suggestions && !isLoading && (
        <div className="px-4 py-2 border-t border-neutral-100 bg-neutral-50/90 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[10px] font-extrabold uppercase text-neutral-400 shrink-0">
            Quick Replies:
          </span>
          {messages[messages.length - 1].suggestions?.map((sugg, i) => (
            <button
              key={i}
              type="button"
              id={`quick-reply-${i}`}
              onClick={() => handleSendMessage(sugg)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 border border-neutral-200 hover:border-indigo-300 text-xs font-semibold text-neutral-700 hover:text-indigo-900 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <span>{sugg}</span>
              <ArrowRight className="w-3 h-3 text-indigo-600 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Draft in Native Language Helper Bar (Collapsible) */}
      <AnimatePresence>
        {showDraftHelper && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3.5 bg-indigo-50/90 border-t border-indigo-200 space-y-2.5 shrink-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-indigo-950">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Draft in {currentLangObj.name} & Translate to English</span>
              </div>
              <button
                type="button"
                onClick={() => setShowDraftHelper(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Input to draft */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="draft-native-phrase-input"
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTranslateDraftToEnglish()}
                placeholder={`Type in ${currentLangObj.name} (e.g., "${QUICK_DRAFT_PROMPTS[nativeLanguage]?.[0] || '¿Cómo pido esto?'}")...`}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-indigo-200 focus:outline-hidden focus:border-indigo-600 font-medium text-neutral-900"
              />
              <button
                type="button"
                id="translate-draft-submit-btn"
                onClick={() => handleTranslateDraftToEnglish()}
                disabled={!draftText.trim() || isTranslatingDraft}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isTranslatingDraft ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                <span>Translate ✨</span>
              </button>
            </div>

            {/* Quick beginner prompt pills */}
            {QUICK_DRAFT_PROMPTS[nativeLanguage] && (
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
                <span className="text-[10px] font-bold text-neutral-400 shrink-0">Try:</span>
                {QUICK_DRAFT_PROMPTS[nativeLanguage].map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDraftText(prompt);
                      handleTranslateDraftToEnglish(prompt);
                    }}
                    className="px-2 py-1 rounded-lg bg-white border border-neutral-200 text-[11px] font-medium text-neutral-700 hover:text-indigo-900 hover:border-indigo-300 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            )}

            {/* Translated Draft Result */}
            {draftResult && (
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-white rounded-xl border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 block uppercase">
                    English Translation (Ready to practice):
                  </span>
                  <p className="font-bold text-neutral-900 text-sm">{draftResult.english}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    id="insert-draft-to-chat"
                    onClick={() => {
                      setInput(draftResult.english);
                      setShowDraftHelper(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold transition-colors cursor-pointer"
                  >
                    Insert to Chat
                  </button>
                  <button
                    type="button"
                    id="send-draft-directly-btn"
                    onClick={() => {
                      handleSendMessage(draftResult.english);
                      setShowDraftHelper(false);
                      setDraftText('');
                      setDraftResult(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Now</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input Bar */}
      <div className="p-4 bg-white border-t border-neutral-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Mic Button */}
          <button
            type="button"
            id="chat-tutor-mic-btn"
            onClick={toggleRecording}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              isRecording
                ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-200 ring-2 ring-red-400'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
            }`}
            title={isRecording ? 'Listening... Tap to stop' : 'Tap to speak your English response'}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Quick Translate Input Icon (Translates whatever user typed in native language to English) */}
          <button
            type="button"
            id="chat-translate-input-btn"
            onClick={handleTranslateCurrentInputToEnglish}
            disabled={!input.trim() || isLoading}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0 cursor-pointer border ${
              input.trim()
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 shadow-2xs'
                : 'bg-neutral-50 text-neutral-300 border-neutral-200 cursor-not-allowed'
            }`}
            title={`Translate whatever is in input from ${currentLangObj.name} to English`}
          >
            <Globe2 className="w-5 h-5" />
          </button>

          {/* Textarea / Input */}
          <input
            type="text"
            id="chat-tutor-text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isRecording 
                ? 'Listening... speak now...' 
                : `Type in English or ${currentLangObj.name} (tap 🌐 to translate)...`
            }
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-indigo-600 focus:outline-hidden text-sm font-medium text-neutral-900 placeholder:text-neutral-400 transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            id="chat-tutor-send-btn"
            disabled={!input.trim() || isLoading}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold transition-all shrink-0 cursor-pointer ${
              input.trim() && !isLoading
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-95'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
            title="Send response to tutor"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
