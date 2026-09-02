import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatTutorMessage, 
  NativeLanguage, 
  EnglishCEFRLevel, 
  SavedPhrase 
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
  ChevronDown
} from 'lucide-react';
import { useTTS } from '../lib/useTTS';
import { motion, AnimatePresence } from 'motion/react';
import { generateSmartRuleBasedTranslation } from '../lib/translationService';

interface TalkPalChatTutorProps {
  nativeLanguage: NativeLanguage;
  englishLevel: EnglishCEFRLevel;
  onSavePhrase?: (phrase: { original: string; professional: string; translation?: string; why?: string; mode?: string }) => void;
  isPro?: boolean;
  onOpenPricing?: () => void;
  onAddXP?: (amount: number) => void;
}

const COACH_PERSONAS = [
  {
    id: 'elena',
    name: 'Elena',
    role: 'Senior Executive & Recruiter Coach',
    avatar: '👩‍💼',
    desc: 'Expert talent partner specializing in confident interviews & workplace diplomacy',
    gender: 'female' as const,
    voicePitch: 1.12,
  },
  {
    id: 'emma',
    name: 'Emma',
    role: 'Senior Executive English Coach',
    avatar: '👩‍🏫',
    desc: 'Expert in corporate diplomacy, high-level meetings & polite updates',
    gender: 'female' as const,
    voicePitch: 1.08,
  },
  {
    id: 'sophia',
    name: 'Sophia',
    role: 'Daily Formal & Polite English Guide',
    avatar: '👩‍💻',
    desc: 'Friendly guidance on polite greetings, small talk & casual business etiquette',
    gender: 'female' as const,
    voicePitch: 1.08,
  },
  {
    id: 'david',
    name: 'David',
    role: 'Job Interview & Career Strategist',
    avatar: '👨‍💼',
    desc: 'Specializes in STAR method, salary negotiation & confident pitches',
    gender: 'male' as const,
    voicePitch: 0.95,
  }
];

const STARTER_TOPICS = [
  {
    title: 'Polite Meeting Disagreement',
    prompt: 'How can I politely disagree with my manager during a product roadmap meeting?',
    category: 'Workplace'
  },
  {
    title: 'Salary & Compensation Review',
    prompt: 'I want to ask HR for a compensation review based on my recent performance.',
    category: 'Interview'
  },
  {
    title: 'Asking for a Deadline Extension',
    prompt: 'How do I draft a professional email requesting 3 extra days on a client report?',
    category: 'Emails'
  },
  {
    title: 'Introducing Myself Professionally',
    prompt: 'How should I introduce myself on my first day in a remote team Slack channel?',
    category: 'Daily'
  }
];

export function getWelcomeTranslation(personaName: string, lang: NativeLanguage | string): string {
  const normalized = (lang || 'Spanish').toLowerCase();
  if (normalized.includes('spanish') || normalized.includes('español')) {
    return `¡Hola! Soy ${personaName}, tu tutora de inglés con IA en Pro English Coach. Estoy aquí para ayudarte a practicar inglés formal y profesional. ¿Qué te gustaría practicar hoy?`;
  }
  if (normalized.includes('french') || normalized.includes('français')) {
    return `Bonjour ! Je suis ${personaName}, votre coach d'anglais IA sur Pro English Coach. Je suis là pour vous aider à pratiquer l'anglais basique et professionnel. Que souhaitez-vous travailler aujourd'hui ?`;
  }
  if (normalized.includes('portuguese') || normalized.includes('português')) {
    return `Olá! Eu sou ${personaName}, sua tutora de inglês com IA no Pro English Coach. Estou aqui para ajudar você a praticar inglês básico e formal. O que gostaria de praticar hoje?`;
  }
  if (normalized.includes('german') || normalized.includes('deutsch')) {
    return `Hallo! Ich bin ${personaName}, dein KI-Englisch-Coach bei Pro English Coach. Ich helfe dir dabei, formelles und geschäftliches Englisch zu üben. Was möchtest du heute üben?`;
  }
  if (normalized.includes('hindi')) {
    return `नमस्ते! मैं Pro English Coach पर आपकी AI अंग्रेज़ी कोच ${personaName} हूँ। मैं आपको बुनियादी और औपचारिक अंग्रेज़ी सीखने में मदद करूँगी। आज आप क्या अभ्यास करना चाहेंगे?`;
  }
  if (normalized.includes('mandarin') || normalized.includes('chinese')) {
    return `你好！我是 Pro English Coach 的 AI 英语教练 ${personaName}。我将协助你练习基础与职场商务英语。今天你想练习什么内容？`;
  }
  if (normalized.includes('japanese')) {
    return `こんにちは！Pro English Coach のAI英語コーチ、${personaName}です。日常会話からビジネス英語までサポートします。本日は何を練習しますか？`;
  }
  if (normalized.includes('korean')) {
    return `안녕하세요! Pro English Coach의 AI 영어 코치 ${personaName}입니다. 기초 및 비즈니스 영어 회화 실력 향상을 도와드립니다. 오늘 어떤 것을 연습해 볼까요?`;
  }
  if (normalized.includes('arabic')) {
    return `مرحباً! أنا ${personaName}، مدربتك للغة الإنجليزية بالذكاء الاصطناعي في Pro English Coach. أنا هنا لمساعدتك في إتقان الإنجليزية الرسمية والمهنية. ماذا تود أن تتدرب عليه اليوم؟`;
  }
  if (normalized.includes('italian')) {
    return `Ciao! Sono ${personaName}, il tuo tutor AI di inglese su Pro English Coach. Sono qui per aiutarti a perfezionare il tuo inglese formale e professionale. Cosa vorresti esercitare oggi?`;
  }
  if (normalized.includes('russian')) {
    return `Здравствуйте! Я ${personaName}, ваш ИИ-преподаватель английского в Pro English Coach. Я помогу вам освоить деловой и базовый английский. Что вы хотите попрактиковать сегодня?`;
  }
  if (normalized.includes('turkish')) {
    return `Merhaba! Ben Pro English Coach'taki yapay zeka İngilizce koçunuz ${personaName}. Temel ve resmi İngilizce pratiği yapmanız için buradayım. Bugün ne üzerine çalışmak istersiniz?`;
  }
  if (normalized.includes('vietnamese')) {
    return `Xin chào! Tôi là ${personaName}, huấn luyện viên tiếng Anh AI của bạn tại Pro English Coach. Tôi ở đây để giúp bạn luyện tập tiếng Anh giao tiếp và công sở. Bạn muốn luyện tập gì hôm nay?`;
  }
  if (normalized.includes('polish')) {
    return `Cześć! Jestem ${personaName}, Twoim nauczycielem angielskiego AI w Pro English Coach. Pomogę Ci w nauce podstawowego i formalnego angielskiego. Co chciałbyś dzisiaj przećwiczyć?`;
  }
  if (normalized.includes('indonesian')) {
    return `Halo! Saya ${personaName}, tutor bahasa Inggris AI Anda di Pro English Coach. Saya di sini untuk membantu Anda berlatih bahasa Inggris formal dan profesional. Apa yang ingin Anda latih hari ini?`;
  }

  return `Hello! I am ${personaName}, your AI English coach on Pro English Coach. I am here to help you practice basic and formal English. What would you like to practice today?`;
}

export const TalkPalChatTutor: React.FC<TalkPalChatTutorProps> = ({
  nativeLanguage,
  englishLevel,
  onSavePhrase,
  isPro = false,
  onOpenPricing,
  onAddXP
}) => {
  const [selectedPersona, setSelectedPersona] = useState(COACH_PERSONAS[0]);
  const [messages, setMessages] = useState<ChatTutorMessage[]>([
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: `Hello! I'm ${COACH_PERSONAS[0].name}, your AI English coach on Pro English Coach. I'm here to help you practice basic and formal English so you can speak confidently in meetings, emails, and job interviews. What would you like to practice today?`,
      translation: getWelcomeTranslation(COACH_PERSONAS[0].name, nativeLanguage),
      suggestions: [
        'How do I write a polite email requesting an update?',
        'Help me introduce myself in a job interview.',
        'How do I politely push back on unrealistic deadlines?'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Synchronize initial welcome message when nativeLanguage or coach persona changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-1') {
        return [
          {
            ...prev[0],
            text: `Hello! I'm ${selectedPersona.name}, your AI English coach on Pro English Coach. I'm here to help you practice basic and formal English so you can speak confidently in meetings, emails, and job interviews. What would you like to practice today?`,
            translation: getWelcomeTranslation(selectedPersona.name, nativeLanguage)
          }
        ];
      }
      return prev;
    });
  }, [nativeLanguage, selectedPersona]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set());
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const { speak, isSpeaking, stop } = useTTS();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
          messages: messages.map(m => ({ sender: m.sender, text: m.text })),
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
        text: data.reply || 'Thank you for sharing. How else can we refine your English today?',
        translation: data.translation,
        formalCorrection: data.formalCorrection,
        suggestions: data.suggestions || [
          'Could you give me another formal example?',
          'What is the grammar rule behind this?',
          'Let us try another sentence.'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, tutorMessage]);
      onAddXP?.(15);

      // Auto-pronounce tutor's response for immersion
      speak(tutorMessage.text, { 
        rate: playbackSpeed,
        gender: selectedPersona.gender,
        pitch: selectedPersona.voicePitch
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatTutorMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: `I noticed you said: "${messageText}". In formal business English, a more polite phrasing would be: "I would appreciate your guidance on this matter."`,
        translation: generateSmartRuleBasedTranslation('I would appreciate your guidance regarding this topic.', nativeLanguage),
        formalCorrection: {
          original: messageText,
          formalAlternative: 'I would appreciate your guidance regarding this topic.',
          why: 'Using polite modal verbs like "would appreciate" softens requests and signals high professionalism.',
          grammarTag: 'Polite Requests'
        },
        suggestions: ['How would I phrase this in an email?', 'Can we practice a job interview question?'],
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

  const cycleSpeed = () => {
    const speeds = [0.8, 1.0, 1.25];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div className="flex flex-col h-[780px] max-h-[85vh] bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
      
      {/* Top Header: Coach Selector & Speed Controls */}
      <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/80 flex items-center justify-between gap-3">
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

        {/* Coach Switching Pills & Audio Speed Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycleSpeed}
            className="px-2.5 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-700 flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
            title="Toggle Pronunciation Speed"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{playbackSpeed}x</span>
          </button>

          <div className="hidden sm:flex items-center gap-1 bg-neutral-200/60 p-1 rounded-xl">
            {COACH_PERSONAS.map((p) => (
              <button
                key={p.id}
                type="button"
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

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-neutral-50/30 to-white">
        
        {/* Starter Topic Prompts if few messages */}
        {messages.length <= 1 && (
          <div className="space-y-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block text-center">
              Suggested Basic & Formal Practice Topics
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STARTER_TOPICS.map((topic, i) => (
                <button
                  key={i}
                  type="button"
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

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div className={`flex items-start gap-2.5 max-w-[90%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
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
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => speak(msg.text, { 
                            rate: playbackSpeed,
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

                        {msg.translation && (
                          <button
                            type="button"
                            onClick={() =>
                              setShowTranslations((prev) => ({
                                ...prev,
                                [msg.id]: !prev[msg.id]
                              }))
                            }
                            className="p-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 font-bold flex items-center gap-1 cursor-pointer transition-all"
                            title={`Translate to ${nativeLanguage}`}
                          >
                            <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{showTranslations[msg.id] ? 'Hide' : nativeLanguage}</span>
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                        title="Copy phrase"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}

                  {/* Native Language Translation Dropdown */}
                  {!isUser && msg.translation && showTranslations[msg.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2.5 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 font-medium"
                    >
                      <span className="font-extrabold text-[10px] text-emerald-800 uppercase tracking-wider block mb-1">
                        {nativeLanguage} Translation:
                      </span>
                      {msg.translation}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Instant Formal Feedback Card (if user message was analyzed) */}
              {!isUser && msg.formalCorrection && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ml-10 max-w-[90%] sm:max-w-[80%] p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200/80 shadow-xs space-y-2.5 text-xs text-neutral-800"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-black text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Formal & Polite Phrasing Upgrade</span>
                    </div>
                    {msg.formalCorrection.grammarTag && (
                      <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-800 font-extrabold text-[10px]">
                        {msg.formalCorrection.grammarTag}
                      </span>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs space-y-1">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Recommended Executive Phrasing:</span>
                    <p className="font-bold text-neutral-900 text-xs sm:text-sm">
                      "{msg.formalCorrection.formalAlternative}"
                    </p>
                  </div>

                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    <strong>Why this works:</strong> {msg.formalCorrection.why}
                  </p>

                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => speak(msg.formalCorrection!.formalAlternative, { rate: playbackSpeed })}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen to formal version
                    </button>

                    <button
                      type="button"
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
            <span>{selectedPersona.name} is drafting formal guidance...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-up Chips */}
      {messages.length > 0 && messages[messages.length - 1]?.suggestions && !isLoading && (
        <div className="px-4 py-2 border-t border-neutral-100 bg-neutral-50/90 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-extrabold uppercase text-neutral-400 shrink-0">
            Quick Replies:
          </span>
          {messages[messages.length - 1].suggestions?.map((sugg, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(sugg)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 border border-neutral-200 hover:border-indigo-300 text-xs font-semibold text-neutral-700 hover:text-indigo-900 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <span>{sugg}</span>
              <ArrowRight className="w-3 h-3 text-indigo-600 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Message Input Bar */}
      <div className="p-4 bg-white border-t border-neutral-100">
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

          {/* Textarea / Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? 'Listening... speak now...' : 'Type in basic or casual English to practice formal phrasing...'}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-indigo-600 focus:outline-hidden text-sm font-medium text-neutral-900 placeholder:text-neutral-400 transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold transition-all shrink-0 cursor-pointer ${
              input.trim() && !isLoading
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-95'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
