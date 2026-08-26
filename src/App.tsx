import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  JobType, 
  Mode, 
  Message, 
  SavedPhrase, 
  CoachResponse, 
  NativeLanguage, 
  SUPPORTED_LANGUAGES 
} from './types';
import { CoachResultCard } from './components/CoachResultCard';
import { SavedPhrasesModal } from './components/SavedPhrasesModal';
import { GoogleChatModal } from './components/GoogleChatModal';
import { AuthModal } from './components/AuthModal';
import { GrammarAnalyticsDashboard } from './components/GrammarAnalyticsDashboard';
import { SupportSection } from './components/SupportSection';
import { 
  LandingHero, 
  HowItWorksSection, 
  FeaturesSection, 
  PricingSection, 
  FAQSection, 
  LandingFooter 
} from './components/LandingSections';
import { 
  Send, 
  Mail, 
  Users, 
  FileText, 
  Globe, 
  Sparkles, 
  AlertCircle, 
  RefreshCw, 
  MessageSquare, 
  Copy, 
  Check, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Mic, 
  Zap, 
  Lock, 
  ChevronRight,
  Languages,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTTS } from './lib/useTTS';
import { useSpeechRecognition } from './lib/useSpeechRecognition';
import { auth, signInWithGoogle, logout } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  syncUserProfile, 
  getUserProfile,
  savePhraseToFirestore, 
  deletePhraseFromFirestore, 
  subscribeToSavedPhrases 
} from './lib/firestoreService';
import { triggerCelebrationConfetti, triggerProUpgradeConfetti } from './lib/confetti';

const JOB_TYPES: JobType[] = ['Tech', 'Healthcare', 'Retail', 'Call Center', 'Admin'];
const MAX_FREE_CHATS = 20;

function getUserStorageKey(user: User | null, key: string): string {
  if (user && user.uid) {
    return `proenglish_user_${user.uid}_${key}`;
  }
  return `proenglish_guest_${key}`;
}

function loadUserChatCount(user: User | null): number {
  if (typeof window === 'undefined') return 0;
  const key = getUserStorageKey(user, 'chat_count');
  const val = localStorage.getItem(key);
  return val !== null ? parseInt(val, 10) || 0 : 0;
}

function loadUserIsPro(user: User | null): boolean {
  if (typeof window === 'undefined') return false;
  const key = getUserStorageKey(user, 'is_pro');
  return localStorage.getItem(key) === 'true';
}

function AssistantMessageBubble({ content }: { content?: string }) {
  const [copied, setCopied] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1 | 1.25>(1);
  const { speak, isSpeaking, isSupported } = useTTS();

  const speaking = content ? isSpeaking(content) : false;

  const handleToggleSpeak = () => {
    if (!content) return;
    speak(content, { rate: playbackSpeed });
  };

  const cyclePlaybackSpeed = () => {
    setPlaybackSpeed((prev) => {
      if (prev === 1) return 1.25;
      if (prev === 1.25) return 0.75;
      return 1;
    });
  };

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy message: ', err);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 text-neutral-800 px-5 py-4 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed shadow-sm flex items-start gap-3 justify-between group">
      <div className="flex items-start gap-3 flex-1">
        <div className="bg-emerald-100 p-1.5 rounded-lg shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-emerald-700" />
        </div>
        <p className="flex-1">{content}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {isSupported && content && (
          <div className="flex items-center gap-0.5 shrink-0 bg-neutral-50/80 border border-neutral-100 rounded-lg p-0.5 mr-1">
            <button
              onClick={cyclePlaybackSpeed}
              title={`Current speed: ${playbackSpeed}x. Click to change.`}
              className="px-1.5 py-1 text-[10px] font-bold text-neutral-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer w-10 text-center"
            >
              {playbackSpeed}x
            </button>
            <button
              onClick={handleToggleSpeak}
              title={speaking ? "Stop reading" : "Listen to audio pronunciation"}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                speaking 
                  ? 'bg-emerald-600 text-white animate-pulse' 
                  : 'text-neutral-500 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {speaking ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
        <button
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy message"}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors shrink-0 cursor-pointer"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('general');
  const [jobType, setJobType] = useState<JobType>('Tech');
  const { 
    transcript: input, 
    setTranscript: setInput, 
    resetTranscript, 
    isListening, 
    isSupported: isSpeechSupported, 
    toggleListening,
    stopListening
  } = useSpeechRecognition();
  
  // 20-Chat Limit & Pro Subscription State (Isolated per user / email)
  const [chatCount, setChatCount] = useState<number>(() => loadUserChatCount(auth.currentUser));
  const [isPro, setIsPro] = useState<boolean>(() => loadUserIsPro(auth.currentUser));

  // Native Language for translation insights
  const [nativeLanguage, setNativeLanguage] = useState<NativeLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proenglish_native_language') as NativeLanguage;
      if (saved && SUPPORTED_LANGUAGES.some(l => l.name === saved)) {
        return saved;
      }
    }
    return 'Spanish';
  });

  const [savedPhrases, setSavedPhrases] = useState<SavedPhrase[]>(() => {
    if (typeof window !== 'undefined') {
      const key = getUserStorageKey(auth.currentUser, 'saved_phrases');
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => auth.currentUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [selectedAnalyticsCategory, setSelectedAnalyticsCategory] = useState<string | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatInitialText, setChatInitialText] = useState('');
  const [isGrabHandleActive, setIsGrabHandleActive] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'coach',
      content: "Hi! I'm ProEnglish Coach. I help you speak and write perfect professional English for workplace success. Type or dictate your casual thoughts below, or pick a mode to get started!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const practiceSectionRef = useRef<HTMLDivElement>(null);

  // Listen to Firebase Auth state & isolate quotas per user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Load user's cloud profile from Firestore
          const remoteProfile = await getUserProfile(user.uid);
          if (remoteProfile) {
            // Existing user profile found in Firestore
            const count = typeof remoteProfile.chatCount === 'number' ? remoteProfile.chatCount : 0;
            const pro = Boolean(remoteProfile.isPro);
            setChatCount(count);
            setIsPro(pro);
            if (remoteProfile.nativeLanguage && SUPPORTED_LANGUAGES.some(l => l.name === remoteProfile.nativeLanguage)) {
              setNativeLanguage(remoteProfile.nativeLanguage as NativeLanguage);
            }
            if (remoteProfile.jobType && JOB_TYPES.includes(remoteProfile.jobType as JobType)) {
              setJobType(remoteProfile.jobType as JobType);
            }
            // Update user-scoped localStorage
            localStorage.setItem(getUserStorageKey(user, 'chat_count'), count.toString());
            localStorage.setItem(getUserStorageKey(user, 'is_pro'), pro.toString());
          } else {
            // Brand-new user / new email: starts with clean 0 chatCount (20 free chats!)
            const initialCount = loadUserChatCount(user);
            const initialPro = loadUserIsPro(user);
            setChatCount(initialCount);
            setIsPro(initialPro);

            await syncUserProfile(user.uid, {
              email: user.email,
              displayName: user.displayName,
              nativeLanguage,
              jobType,
              isPro: initialPro,
              chatCount: initialCount,
            });
            localStorage.setItem(getUserStorageKey(user, 'chat_count'), initialCount.toString());
            localStorage.setItem(getUserStorageKey(user, 'is_pro'), initialPro.toString());
          }
        } catch (err) {
          console.warn('Error loading user profile, using local scoped store:', err);
          setChatCount(loadUserChatCount(user));
          setIsPro(loadUserIsPro(user));
        }

        // Subscribe to user's saved phrases from Firestore
        const unsubPhrases = subscribeToSavedPhrases(user.uid, (remotePhrases) => {
          if (remotePhrases) {
            setSavedPhrases(remotePhrases);
            localStorage.setItem(getUserStorageKey(user, 'saved_phrases'), JSON.stringify(remotePhrases));
          }
        });

        return () => {
          unsubPhrases?.();
        };
      } else {
        // Logged out / Guest session: switch to guest-isolated storage
        const guestCount = loadUserChatCount(null);
        const guestPro = loadUserIsPro(null);
        setChatCount(guestCount);
        setIsPro(guestPro);
        
        const guestPhrasesKey = getUserStorageKey(null, 'saved_phrases');
        const guestPhrases = localStorage.getItem(guestPhrasesKey);
        if (guestPhrases) {
          try {
            setSavedPhrases(JSON.parse(guestPhrases));
          } catch {
            setSavedPhrases([]);
          }
        } else {
          setSavedPhrases([]);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync preference state changes
  useEffect(() => {
    localStorage.setItem('proenglish_native_language', nativeLanguage);
  }, [nativeLanguage]);

  const scrollToPractice = () => {
    practiceSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSavePhrase = async (data: CoachResponse): Promise<boolean | void> => {
    const isAlreadySaved = savedPhrases.some(p => p.professional === data.professional);
    
    if (isAlreadySaved) {
      const existing = savedPhrases.find(p => p.professional === data.professional);
      if (existing && currentUser) {
        deletePhraseFromFirestore(currentUser.uid, existing.id).catch(console.error);
      }
      setSavedPhrases(prev => prev.filter(p => p.professional !== data.professional));
      return false;
    }

    if (currentUser) {
      try {
        const saved = await savePhraseToFirestore(currentUser.uid, {
          ...data,
          mode,
          jobType,
        });
        setSavedPhrases(prev => [saved, ...prev.filter(p => p.id !== saved.id)]);
        return true;
      } catch (err) {
        console.error('Failed to save to Firestore:', err);
      }
    }

    const newPhrase: SavedPhrase = {
      id: Date.now().toString(),
      userId: currentUser?.uid || 'local-user',
      mode,
      jobType,
      original: data.original,
      professional: data.professional,
      translation: data.translation,
      why: data.why,
      practice: data.practice,
      createdAt: new Date().toISOString(),
    };

    setSavedPhrases(prev => [newPhrase, ...prev]);
    return true;
  };

  const handleDeletePhrase = async (phraseId: string): Promise<void> => {
    if (currentUser) {
      deletePhraseFromFirestore(currentUser.uid, phraseId).catch(console.error);
    }
    setSavedPhrases(prev => prev.filter(p => p.id !== phraseId));
  };

  const handleOpenSendToChat = (text: string) => {
    setChatInitialText(text);
    setIsChatModalOpen(true);
  };

  const handleSelectChatForCoaching = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const handleUpgradeSuccess = () => {
    setIsPro(true);
    triggerProUpgradeConfetti();
    const key = getUserStorageKey(currentUser, 'is_pro');
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, 'true');
    }
    if (currentUser) {
      syncUserProfile(currentUser.uid, { isPro: true });
    }
    // Add a congratulatory coach message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'coach',
        content: "🎉 Welcome to ProEnglish Pro! Your $20/month Pro membership is now active. You have access to 1000 sessions per month, voice tools, and industry specializations."
      }
    ]);
  };

  const handleCancelSubscription = () => {
    setIsPro(false);
    const key = getUserStorageKey(currentUser, 'is_pro');
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, 'false');
    }
    if (currentUser) {
      syncUserProfile(currentUser.uid, { isPro: false });
    }
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'coach',
        content: "ℹ️ Your recurring debit order has been stopped. You will not be billed again. You can re-activate Pro at any time."
      }
    ]);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check 20-chat limit for free tier
    if (!isPro && chatCount >= MAX_FREE_CHATS) {
      navigate('/pricing');
      return;
    }

    if (isListening) {
      stopListening();
    }

    const userText = input.trim();
    resetTranscript();
    
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', content: userText }]);
    setIsLoading(true);

    const isLastFreeChat = !isPro && chatCount + 1 >= MAX_FREE_CHATS;

    // Increment chat count for the active user session
    if (!isPro) {
      setChatCount(prev => {
        const next = prev + 1;
        if (next >= MAX_FREE_CHATS) {
          triggerCelebrationConfetti();
        }
        const key = getUserStorageKey(currentUser, 'chat_count');
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, next.toString());
        }
        if (currentUser) {
          syncUserProfile(currentUser.uid, { chatCount: next });
        }
        return next;
      });
    }

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userText, mode, jobType, nativeLanguage }),
      });

      let data: any = null;
      const rawText = await response.text();
      try {
        data = JSON.parse(rawText);
      } catch {
        console.warn('Non-JSON response from /api/coach:', rawText);
        if (!response.ok) {
          throw new Error(`Server returned error ${response.status}: ${rawText.slice(0, 100)}`);
        }
        data = {
          original: userText,
          professional: userText,
          translation: 'Professional version for workplace communication.',
          why: 'Clear communication is key in professional environments.',
          practice: 'Try rephrasing with different wording.'
        };
      }

      if (!response.ok) {
        throw new Error(data?.error || `Server returned status ${response.status}`);
      }

      if (!data || !data.professional) {
        throw new Error('Coach was unable to generate a response. Please try again.');
      }

      const coachData: CoachResponse = {
        original: data.original || userText,
        professional: data.professional,
        translation: data.translation,
        why: data.why,
        practice: data.practice,
      };

      const newCoachMessages: Message[] = [
        {
          id: Date.now().toString(),
          type: 'coach',
          coachData,
        }
      ];

      // If user just completed their 20th chat, trigger celebration confetti & congratulatory notice
      if (isLastFreeChat) {
        triggerCelebrationConfetti();
        newCoachMessages.push({
          id: `${Date.now()}-milestone`,
          type: 'coach',
          content: "🎉 Milestone Achieved! You've successfully completed your 20 free workplace coaching sessions! You can upgrade to Pro for 1000 sessions per month anytime, or review all your saved phrases in the library.",
        });
      }

      setMessages(prev => [...prev, ...newCoachMessages]);
    } catch (err: any) {
      console.error('Coach API Error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'error',
          content: err.message || 'Something went wrong while coaching. Please try again.',
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      resetTranscript();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isLimitReached = !isPro && chatCount >= MAX_FREE_CHATS;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-emerald-600/30">
            PE
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-neutral-900 flex items-center gap-1.5">
              ProEnglish Coach
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                AI Career Tutor
              </span>
            </h1>
            <p className="text-xs text-neutral-500 hidden sm:block">Master workplace English in seconds</p>
          </div>
        </div>

        {/* Header Links & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-neutral-600 mr-2">
            <button onClick={scrollToPractice} className="hover:text-emerald-600 transition-colors cursor-pointer">
              Live Coach
            </button>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-emerald-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-emerald-600 transition-colors">
              Pricing
            </a>
            <a href="#support" className="hover:text-emerald-600 text-emerald-700 font-bold transition-colors">
              Support
            </a>
          </nav>

          {/* Native Language Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-xl border border-neutral-200 bg-neutral-50/80 hover:bg-neutral-100 text-neutral-700 transition-colors">
            <Languages className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value as NativeLanguage)}
              className="bg-transparent text-neutral-800 font-semibold focus:outline-none cursor-pointer text-xs"
              title="Select your native language for bilingual translations & hints"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.name} value={lang.name}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Saved Phrases Button */}
          <button
            onClick={() => setIsSavedModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
            title="View saved phrases"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Saved Vault</span>
            {savedPhrases.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {savedPhrases.length}
              </span>
            )}
          </button>

          {/* Pro Plan / Upgrade Button */}
          {isPro ? (
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs transition-colors cursor-pointer"
              title="Manage Pro membership or cancel debit order"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pro Active</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Upgrade ($20/mo)</span>
            </button>
          )}

          {/* Firebase Google Auth Button */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-1 border-l border-neutral-200">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-emerald-400 transition-all cursor-pointer"
                title="View account profile"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-emerald-300 shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </button>
              <button
                onClick={() => logout()}
                className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                title="Sign out of account"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
              title="Sign in with Google to sync phrases and preferences across devices"
            >
              <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* 1. Landing Hero Section */}
      <LandingHero
        onStartPracticing={scrollToPractice}
        onOpenPricing={() => navigate('/pricing')}
        isPro={isPro}
        chatCount={chatCount}
        maxChats={MAX_FREE_CHATS}
      />

      {/* 2. Interactive Live Coach Studio Section */}
      <section 
        id="live-coach" 
        ref={practiceSectionRef} 
        className="py-12 md:py-16 bg-neutral-900 text-white relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Live AI Studio
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Practice Your English Now
              </h2>
            </div>

            {/* Chat Limit Tracker & Pro Status */}
            <div className="flex items-center gap-3">
              {isPro ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  Pro Active
                </div>
              ) : (
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700">
                  <span className="text-neutral-400">Free Chats:</span>
                  <span className={`font-bold ${chatCount >= MAX_FREE_CHATS ? 'text-red-400' : 'text-emerald-400'}`}>
                    {chatCount} / {MAX_FREE_CHATS}
                  </span>
                  {chatCount >= MAX_FREE_CHATS && (
                    <button
                      onClick={() => navigate('/pricing')}
                      className="ml-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                    >
                      Upgrade $20/mo
                    </button>
                  )}
                </div>
              )}

              {/* Native Language Dropdown */}
              <div className="flex items-center gap-1.5 bg-neutral-800 rounded-xl px-3 py-1.5 border border-neutral-700 text-xs">
                <Languages className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <select 
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value as NativeLanguage)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                  title="Your native language for translation insights"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.name} value={lang.name} className="bg-neutral-800 text-white">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industry Dropdown */}
              <div className="flex items-center gap-1.5 bg-neutral-800 rounded-xl px-3 py-1.5 border border-neutral-700 text-xs">
                <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <select 
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as JobType)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  {JOB_TYPES.map(type => (
                    <option key={type} value={type} className="bg-neutral-800 text-white">{type} Field</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Coach Studio Card Frame */}
          <div className={`bg-neutral-950 rounded-3xl border shadow-2xl overflow-hidden flex flex-col h-[80vh] min-h-[480px] max-h-[640px] sm:h-[640px] transition-colors duration-200 ${isGrabHandleActive ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-neutral-800'}`}>
            {/* Mobile Grab Handle Indicator */}
            <div 
              className="w-full flex justify-center pt-3 pb-1 bg-neutral-900/90 sm:hidden shrink-0 touch-none"
              onTouchStart={() => setIsGrabHandleActive(true)}
              onTouchEnd={() => setIsGrabHandleActive(false)}
              onTouchCancel={() => setIsGrabHandleActive(false)}
            >
              <div className={`w-10 h-1.5 rounded-full transition-colors duration-200 ${isGrabHandleActive ? 'bg-emerald-500/80' : 'bg-neutral-700'}`}></div>
            </div>

            {/* Modes Navigation Bar */}
            <div className="bg-neutral-900/90 px-4 pb-3 sm:py-3 border-b border-neutral-800 shrink-0 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 min-w-max">
                <button
                  onClick={() => setMode('general')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${mode === 'general' ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> General Practice
                </button>
                <button
                  onClick={() => setMode('email')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${mode === 'email' ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
                >
                  <Mail className="w-3.5 h-3.5" /> Fix Email
                </button>
                <button
                  onClick={() => setMode('interview')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${mode === 'interview' ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
                >
                  <Users className="w-3.5 h-3.5" /> Mock Interview
                </button>
                <button
                  onClick={() => setMode('cv')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${mode === 'cv' ? 'bg-amber-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
                >
                  <FileText className="w-3.5 h-3.5" /> Boost CV
                </button>
              </div>
            </div>

            {/* Chat Conversation Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-5 text-neutral-900 bg-neutral-900/40">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-[92%] ${msg.type === 'user' ? 'ml-auto' : 'mr-auto'}`}
                  >
                    {msg.type === 'user' ? (
                      <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm text-[15px] leading-relaxed shadow-sm font-medium">
                        {msg.content}
                      </div>
                    ) : msg.type === 'error' ? (
                      <div className="bg-red-950/80 text-red-300 px-5 py-3 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed border border-red-800/80 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                        {msg.content}
                      </div>
                    ) : msg.coachData ? (
                      <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[680px]">
                        <CoachResultCard 
                          data={msg.coachData} 
                          onSave={handleSavePhrase}
                          isSaved={savedPhrases.some(p => p.professional === msg.coachData?.professional)}
                          onSendToChat={handleOpenSendToChat}
                        />
                      </div>
                    ) : (
                      <AssistantMessageBubble content={msg.content} />
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-start max-w-[90%] mr-auto"
                  >
                    <div className="bg-neutral-800/90 text-neutral-200 border border-neutral-700/80 px-5 py-3.5 rounded-2xl rounded-tl-sm shadow-md flex items-center gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm text-neutral-300">Coach is thinking</span>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '900ms' }} />
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '180ms', animationDuration: '900ms' }} />
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '360ms', animationDuration: '900ms' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Limit Reached Inline Notification */}
              {isLimitReached && (
                <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border border-emerald-500/40 p-5 rounded-2xl text-center flex flex-col items-center justify-center my-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base">You've reached the 20 free chats limit</h4>
                  <p className="text-xs text-neutral-400 max-w-md mt-1 mb-3">
                    Unlock 1000 AI coaching sessions, voice-to-text dictation, and pronunciation audio for just $20/month.
                  </p>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Unlock Pro ($20/mo)
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Form Bar */}
            <div className="bg-neutral-900 border-t border-neutral-800 p-3 sm:p-4 shrink-0">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isLimitReached 
                      ? "Limit reached — upgrade to Pro for $20/month..."
                      : mode === 'email' ? "Type an email (e.g., 'sorry for late reply i had bug')..." :
                      mode === 'interview' ? "Type an answer (e.g., 'my weakness is i work too hard')..." :
                      mode === 'cv' ? "Type what you did (e.g., 'i made website for shop')..." :
                      "Type what you want to say in English..."
                  }
                  className={`w-full min-h-[56px] sm:min-h-[52px] bg-neutral-950 border ${isLimitReached ? 'border-amber-500/40 text-neutral-400' : 'border-neutral-800 text-white'} rounded-2xl pl-4 sm:pl-5 pr-[116px] sm:pr-[104px] py-4 text-[15px] placeholder:text-neutral-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                  disabled={isLoading || isLimitReached}
                />
                <div className="absolute right-1.5 sm:right-2 flex items-center gap-1.5">
                  {isSpeechSupported && (
                    <button
                      type="button"
                      onClick={toggleListening}
                      disabled={isLoading || isLimitReached}
                      className={`w-12 h-12 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl transition-colors ${
                        isListening 
                          ? 'bg-red-500 text-white' 
                          : 'bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white'
                      }`}
                      title={isListening ? "Stop listening" : "Start voice typing"}
                    >
                      {isListening ? (
                        <span className="relative flex h-5 w-5 sm:h-4 sm:w-4 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                          <Mic className="relative inline-flex w-5 h-5 sm:w-4 sm:h-4" />
                        </span>
                      ) : (
                        <Mic className="w-5 h-5 sm:w-4 sm:h-4" />
                      )}
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={(!input.trim() && !isLimitReached) || isLoading}
                    className={`w-12 h-12 sm:w-10 sm:h-10 shrink-0 ${isLimitReached ? 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white'} disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer`}
                    title={isLimitReached ? "Upgrade to Pro" : "Send message"}
                  >
                    {isLimitReached ? (
                      <Zap className="w-5 h-5 sm:w-4 sm:h-4 fill-current" />
                    ) : (
                      <Send className="w-5 h-5 sm:w-4 sm:h-4 ml-0.5" />
                    )}
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-between text-xs text-neutral-400 mt-2 px-1">
                <span>
                  {isPro 
                    ? '✨ Pro Plan: 1000 Coaching Sessions/mo' 
                    : `Sessions remaining: ${Math.max(0, MAX_FREE_CHATS - chatCount)} of ${MAX_FREE_CHATS}`}
                </span>
                <span className="hidden sm:inline">Press Enter ↵ to send</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Grammar Analytics Dashboard (D3.js Visualization) */}
      <section className="py-10 bg-neutral-900/40 border-y border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                D3.js Grammar Intelligence
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Your Grammar & Error Analytics Over Time
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Visualizing common speech habits, verb agreement, prepositions, and tone patterns based on your saved library.
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsSavedModalOpen(true)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold flex items-center gap-2 border border-neutral-700 transition-colors cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Open Saved Library ({savedPhrases.length})</span>
              </button>
            </div>
          </div>

          <GrammarAnalyticsDashboard
            savedPhrases={savedPhrases}
            selectedCategory={selectedAnalyticsCategory}
            onSelectCategory={setSelectedAnalyticsCategory}
          />
        </div>
      </section>

      {/* 3. How It Works Section */}
      <HowItWorksSection />

      {/* 4. Features & Scenarios Section */}
      <FeaturesSection />

      {/* 5. Pricing Section ($20/month) */}
      <PricingSection
        onSelectPro={() => navigate('/pricing')}
        isPro={isPro}
        chatCount={chatCount}
        maxChats={MAX_FREE_CHATS}
      />

      {/* 6. FAQ Section */}
      <FAQSection />

      {/* 7. Support & Helpdesk Section (ProEnglishAICoach@protonmail.com) */}
      <SupportSection
        userEmail={currentUser?.email || undefined}
        onOpenPricing={() => navigate('/pricing')}
      />

      {/* 8. Footer */}
      <LandingFooter
        onStartPracticing={scrollToPractice}
        onOpenPricing={() => navigate('/pricing')}
        onOpenSupport={() => {
          const el = document.getElementById('support');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <SavedPhrasesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedPhrases={savedPhrases}
        onDeletePhrase={handleDeletePhrase}
        onSendToChat={handleOpenSendToChat}
      />

      <GoogleChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        initialTextToSend={chatInitialText}
        onSelectForCoaching={handleSelectChatForCoaching}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        isPro={isPro}
        savedPhrasesCount={savedPhrases.length}
        nativeLanguage={nativeLanguage}
        onCancelSubscription={handleCancelSubscription}
        onOpenPaymentModal={() => navigate('/pricing')}
      />
    </div>
  );
}
