import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  JobType, 
  Mode, 
  SavedPhrase, 
  CoachResponse, 
  NativeLanguage, 
  SUPPORTED_LANGUAGES,
  EnglishCEFRLevel,
  EnglishGoal,
  UserProfile
} from './types';
import { TalkPalDashboard } from './components/TalkPalDashboard';
import { TalkPalChatTutor } from './components/TalkPalChatTutor';
import { TalkPalRoleplays } from './components/TalkPalRoleplays';
import { TalkPalCallMode } from './components/TalkPalCallMode';
import { BasicGrammarQuiz } from './components/BasicGrammarQuiz';
import { SavedPhrasesModal } from './components/SavedPhrasesModal';
import { GoogleChatModal } from './components/GoogleChatModal';
import { AuthModal } from './components/AuthModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { GrammarAnalyticsDashboard } from './components/GrammarAnalyticsDashboard';
import { SupportSection } from './components/SupportSection';
import { TrialBanner } from './components/TrialBanner';
import { PaywallOverlay } from './components/PaywallOverlay';
import { FunLandingPage } from './components/FunLandingPage';
import { FunLearningHub } from './components/FunLearningHub';
import { FunWordMatchGame } from './components/FunWordMatchGame';
import { SpeakerSpeedControl } from './components/SpeakerSpeedControl';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { CoachAudioReplayBanner } from './components/CoachAudioReplayBanner';
import { 
  LandingHero, 
  HowItWorksSection, 
  FeaturesSection, 
  PricingSection, 
  FAQSection, 
  LandingFooter 
} from './components/LandingSections';
import { 
  Sparkles, 
  Bookmark, 
  Zap, 
  Languages,
  User as UserIcon,
  LogOut,
  BookOpen,
  Home,
  MessageSquare,
  Briefcase,
  Coffee,
  Phone,
  Layers,
  Flame,
  Award,
  TrendingUp,
  Lock,
  Gamepad2,
  Smile,
  Speech
} from 'lucide-react';
import { auth, logout } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  syncUserProfile, 
  getUserProfile,
  savePhraseToFirestore, 
  deletePhraseFromFirestore, 
  subscribeToSavedPhrases 
} from './lib/firestoreService';
import { triggerProUpgradeConfetti } from './lib/confetti';
import { calculateTrialInfo, getUserTrialStartDate } from './lib/trialService';

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

export default function App() {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => auth.currentUser);

  // Active navigation tab (Landing page is primary welcoming view)
  const [activeTab, setActiveTab] = useState<'landing' | 'lessons' | 'chat' | 'game' | 'quiz' | 'roleplays' | 'call' | 'dashboard' | 'analytics'>('landing');
  const [selectedHubTopic, setSelectedHubTopic] = useState<string>('all');

  // Quota & Pro Subscription State
  const [chatCount, setChatCount] = useState<number>(() => loadUserChatCount(auth.currentUser));
  const [isProState, setIsPro] = useState<boolean>(() => loadUserIsPro(auth.currentUser));
  const [trialStartDate, setTrialStartDate] = useState<string>(() => getUserTrialStartDate(auth.currentUser));

  const isPro = isProState || currentUser?.email?.toLowerCase() === 'brigittalombard09@gmail.com';

  // User Profile details
  const [englishLevel, setEnglishLevel] = useState<EnglishCEFRLevel>('A2');
  const [learningGoal, setLearningGoal] = useState<EnglishGoal>('daily_conversation');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(10);
  const [xpPoints, setXpPoints] = useState<number>(140);
  const [streakDays, setStreakDays] = useState<number>(3);

  // Live timer tick to continuously evaluate 3-day trial expiration in real time
  const [currentTick, setCurrentTick] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTick(Date.now());
    }, 5000); // Re-calculate every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Compute live trial state
  const trialInfo = calculateTrialInfo(currentUser, isPro, trialStartDate, currentTick);

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

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isFlashcardsModalOpen, setIsFlashcardsModalOpen] = useState(false);
  const [flashcardDeckId, setFlashcardDeckId] = useState<string>('daily-greetings');
  const [selectedAnalyticsCategory, setSelectedAnalyticsCategory] = useState<string | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatInitialText, setChatInitialText] = useState('');

  // Listen to Firebase Auth state & isolate quotas per user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const remoteProfile = await getUserProfile(user.uid);
          if (remoteProfile) {
            const count = typeof remoteProfile.chatCount === 'number' ? remoteProfile.chatCount : 0;
            const pro = Boolean(remoteProfile.isPro);
            const trialStart = remoteProfile.trialStartDate || getUserTrialStartDate(user);
            setChatCount(count);
            setIsPro(pro);
            setTrialStartDate(trialStart);
            if (remoteProfile.nativeLanguage && SUPPORTED_LANGUAGES.some(l => l.name === remoteProfile.nativeLanguage)) {
              setNativeLanguage(remoteProfile.nativeLanguage as NativeLanguage);
            }
            if (remoteProfile.englishLevel) {
              setEnglishLevel(remoteProfile.englishLevel);
            }
            if (remoteProfile.learningGoal) {
              setLearningGoal(remoteProfile.learningGoal);
            }
            if (remoteProfile.dailyGoalMinutes) {
              setDailyGoalMinutes(remoteProfile.dailyGoalMinutes);
            }
            if (remoteProfile.xpPoints) {
              setXpPoints(remoteProfile.xpPoints);
            }
            if (remoteProfile.streakDays) {
              setStreakDays(remoteProfile.streakDays);
            }

            localStorage.setItem(getUserStorageKey(user, 'chat_count'), count.toString());
            localStorage.setItem(getUserStorageKey(user, 'is_pro'), pro.toString());
            localStorage.setItem(getUserStorageKey(user, 'trial_start_date'), trialStart);
          } else {
            // New user registered: Grant a fresh 3-day trial and reset local counts
            const now = new Date().toISOString();
            const initialCount = 0;
            const initialPro = false;
            const initialTrialStart = now;

            // Overwrite any guest fallbacks on this device
            localStorage.setItem(getUserStorageKey(user, 'trial_start_date'), now);
            localStorage.setItem('proenglish_device_trial_start', now);
            localStorage.setItem('proenglish_guest_trial_start_date', now);
            localStorage.setItem(getUserStorageKey(user, 'chat_count'), '0');
            localStorage.setItem('proenglish_guest_chat_count', '0');

            setChatCount(initialCount);
            setIsPro(initialPro);
            setTrialStartDate(initialTrialStart);

            await syncUserProfile(user.uid, {
              email: user.email,
              displayName: user.displayName,
              nativeLanguage,
              englishLevel,
              learningGoal,
              dailyGoalMinutes,
              xpPoints,
              streakDays,
              isPro: initialPro,
              chatCount: initialCount,
              trialStartDate: initialTrialStart,
            });
            localStorage.setItem(getUserStorageKey(user, 'chat_count'), initialCount.toString());
            localStorage.setItem(getUserStorageKey(user, 'is_pro'), initialPro.toString());
            localStorage.setItem(getUserStorageKey(user, 'trial_start_date'), initialTrialStart);
          }
        } catch (err) {
          console.warn('Error loading user profile:', err);
        }

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

  const handleAddXP = (amount: number) => {
    setXpPoints((prev) => {
      const updated = prev + amount;
      if (currentUser) {
        syncUserProfile(currentUser.uid, { xpPoints: updated }).catch(console.error);
      }
      return updated;
    });
  };

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
          mode: 'general',
          jobType: 'Tech',
        });
        setSavedPhrases(prev => [saved, ...prev.filter(p => p.id !== saved.id)]);
        handleAddXP(20);
        return true;
      } catch (err) {
        console.error('Failed to save to Firestore:', err);
      }
    }

    const newPhrase: SavedPhrase = {
      id: Date.now().toString(),
      original: data.original,
      professional: data.professional,
      translation: data.translation,
      why: data.why,
      practice: data.practice,
      mode: 'general',
      jobType: 'Tech',
      timestamp: new Date().toISOString(),
    };

    const updated = [newPhrase, ...savedPhrases];
    setSavedPhrases(updated);
    const key = getUserStorageKey(currentUser, 'saved_phrases');
    localStorage.setItem(key, JSON.stringify(updated));
    handleAddXP(20);
    return true;
  };

  const handleDeletePhrase = async (id: string): Promise<void> => {
    if (currentUser) {
      await deletePhraseFromFirestore(currentUser.uid, id).catch(console.error);
    }
    const updated = savedPhrases.filter(p => p.id !== id);
    setSavedPhrases(updated);
    const key = getUserStorageKey(currentUser, 'saved_phrases');
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const handleOpenSendToChat = (text: string) => {
    setChatInitialText(text);
    setIsChatModalOpen(true);
  };

  const handleOpenFlashcards = (deckId?: string) => {
    if (deckId) setFlashcardDeckId(deckId);
    setActiveTab('quiz');
  };

  const handleCancelSubscription = async () => {
    setIsPro(false);
    const key = getUserStorageKey(currentUser, 'is_pro');
    localStorage.setItem(key, 'false');
    if (currentUser) {
      await syncUserProfile(currentUser.uid, { isPro: false });
    }
  };

  const userProfileObj: UserProfile = {
    userId: currentUser?.uid || 'guest',
    email: currentUser?.email || 'guest@proenglish.ai',
    displayName: currentUser?.displayName || undefined,
    nativeLanguage,
    englishLevel,
    learningGoal,
    dailyGoalMinutes,
    xpPoints,
    streakDays,
    isPro,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 flex flex-col font-sans pb-20 sm:pb-0">
      
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-200/70 group-hover:scale-105 transition-transform shrink-0">
              <Speech className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="font-cambria font-['Cambria',Georgia,serif] font-black text-base sm:text-xl tracking-tight text-neutral-900 leading-none">
                English Coach
              </h1>
            </div>
          </button>

          {/* CEFR Level Selector */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold" title="Select your English proficiency level">
            <span className="text-[10px] text-indigo-500 uppercase tracking-wider font-extrabold">Level:</span>
            <select
              value={englishLevel}
              onChange={(e) => {
                const newLvl = e.target.value as EnglishCEFRLevel;
                setEnglishLevel(newLvl);
                if (currentUser) {
                  syncUserProfile(currentUser.uid, { englishLevel: newLvl }).catch(console.error);
                }
              }}
              className="bg-transparent font-black text-indigo-900 focus:outline-none cursor-pointer text-xs"
            >
              <option value="A1">A1 Beginner</option>
              <option value="A2">A2 Elementary</option>
              <option value="B1">B1 Intermediate</option>
              <option value="B2">B2 Upper</option>
              <option value="C1">C1 Advanced</option>
            </select>
          </div>
        </div>

        {/* Desktop Primary Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-2xl border border-neutral-200/80 text-xs font-bold">
          {[
            { id: 'landing', label: 'Home', icon: <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> },
            { id: 'lessons', label: 'Fun Lessons', icon: <BookOpen className="w-3.5 h-3.5 text-teal-600" /> },
            { id: 'chat', label: 'AI Chat Buddy', icon: <MessageSquare className="w-3.5 h-3.5 text-sky-600" /> },
            { id: 'game', label: 'Word Match', icon: <Gamepad2 className="w-3.5 h-3.5 text-amber-600" /> },
            { id: 'quiz', label: 'Everyday Cards', icon: <Layers className="w-3.5 h-3.5 text-purple-600" /> },
            { id: 'roleplays', label: 'Daily Situations', icon: <Coffee className="w-3.5 h-3.5 text-rose-600" /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white text-indigo-900 shadow-2xs font-extrabold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Streak, Native Lang, Saved, Pro, Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Daily Streak Flame */}
          <div className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[10px] sm:text-xs font-black shrink-0" title="Current Daily Practice Streak">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streakDays}d</span>
          </div>

          {/* Native Language Selector */}
          <div className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-colors shrink-0">
            <Languages className="w-3.5 h-3.5 text-indigo-600 shrink-0 hidden sm:block" />
            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value as NativeLanguage)}
              className="bg-transparent text-neutral-800 font-extrabold focus:outline-hidden cursor-pointer text-[11px] sm:text-xs max-w-[65px] sm:max-w-[120px] truncate"
              title="Select native language for translations"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.name} value={lang.name}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Speakerphone Voice Speed Setting */}
          <div className="hidden lg:block shrink-0">
            <SpeakerSpeedControl variant="header" idPrefix="header-speaker-speed" />
          </div>

          {/* Saved Vault Button */}
          <button
            onClick={() => setIsSavedModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer shrink-0"
            title="View saved formal phrase library"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
            <span>Saved</span>
            {savedPhrases.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {savedPhrases.length}
              </span>
            )}
          </button>

          {/* Pro / 3-Day Free Trial Button */}
          {isPro ? (
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-extrabold border border-emerald-200 shadow-2xs transition-colors cursor-pointer shrink-0"
              title="Manage Pro membership"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Pro Active</span>
            </button>
          ) : trialInfo.isTrialExpired ? (
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-[10px] sm:text-xs font-black shadow-sm transition-all cursor-pointer animate-pulse shrink-0"
              title="3-Day complimentary trial concluded. Upgrade to Pro."
            >
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Trial Expired • Upgrade</span>
              <span className="sm:hidden">Upgrade</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:opacity-90 text-white text-[10px] sm:text-xs font-extrabold shadow-sm transition-all cursor-pointer shrink-0"
              title="3-Day Free Trial Active. Click to view Pro plans."
            >
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
              <span className="hidden sm:inline">3-Day Trial ({trialInfo.daysLeft}d left) • Go Pro</span>
              <span className="sm:hidden">{trialInfo.daysLeft}d left</span>
            </button>
          )}

          {/* Auth Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 pl-1 border-l border-neutral-200">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1 p-0.5 rounded-full hover:ring-2 hover:ring-indigo-400 transition-all cursor-pointer"
                title="View account profile"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-7 h-7 rounded-full border border-indigo-300 shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
                    {currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </button>
              <button
                onClick={() => logout()}
                className="p-1 text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

        </div>
      </header>

      {/* Trial Banner */}
      <TrialBanner 
        trialInfo={trialInfo} 
        onUpgrade={() => navigate('/pricing')} 
        onOpenSignIn={() => setIsAuthModalOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* 1. Welcoming Fun Landing Page */}
        {activeTab === 'landing' && (
          <FunLandingPage
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onExploreMode={() => {
              setActiveTab('lessons');
            }}
          />
        )}

        {/* 2. Interactive Lessons Hub for Everyday Life */}
        {activeTab === 'lessons' && (
          trialInfo.canAccess ? (
            <FunLearningHub
              nativeLanguage={nativeLanguage}
              onLanguageChange={setNativeLanguage}
              onSendToChat={(text) => {
                setChatInitialText(text);
                setActiveTab('chat');
              }}
              
              onAddXP={handleAddXP}
              initialTopic={selectedHubTopic}
              isExpired={trialInfo.isTrialExpired && !isPro}
              onOpenPricing={() => navigate('/pricing')}
            />
          ) : (
            <PaywallOverlay
              featureName="Interactive Lessons"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

        {/* 3. Interactive Word Match Game */}
        {activeTab === 'game' && (
          trialInfo.canAccess ? (
            <FunWordMatchGame
              nativeLanguage={nativeLanguage}
              onLanguageChange={setNativeLanguage}
              onAddXP={handleAddXP}
              onOpenChat={(text) => {
                if (text) setChatInitialText(text);
                setActiveTab('chat');
              }}
            />
          ) : (
            <PaywallOverlay
              featureName="Word Match Game"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

        {/* 4. AI Chat Tutor */}
        {activeTab === 'chat' && (
          trialInfo.canAccess ? (
            <TalkPalChatTutor
              nativeLanguage={nativeLanguage}
              englishLevel={englishLevel}
              
              isPro={isPro}
              onOpenPricing={() => navigate('/pricing')}
              onAddXP={handleAddXP}
              onLanguageChange={setNativeLanguage}
              initialText={chatInitialText}
            />
          ) : (
            <PaywallOverlay
              featureName="AI Chat Tutor"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

        {/* 5. Real-Life Daily Situations */}
        {activeTab === 'roleplays' && (
          trialInfo.canAccess ? (
            <TalkPalRoleplays
              nativeLanguage={nativeLanguage}
              englishLevel={englishLevel}
              onAddXP={handleAddXP}
              isPro={isPro}
              onOpenPricing={() => navigate('/pricing')}
            />
          ) : (
            <PaywallOverlay
              featureName="Daily Situations & Real-Life Conversations"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

        {/* 6. Voice Call Coach */}
        {activeTab === 'call' && (
          trialInfo.canAccess ? (
            <TalkPalCallMode
              nativeLanguage={nativeLanguage}
              englishLevel={englishLevel}
              onAddXP={handleAddXP}
              isPro={isPro}
              onOpenPricing={() => navigate('/pricing')}
            />
          ) : (
            <PaywallOverlay
              featureName="Simulated Voice Call Coach"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

        {/* 7. Grammar Quiz */}
        {activeTab === 'quiz' && (
          trialInfo.canAccess ? (
            <div className="bg-neutral-900 rounded-3xl p-4 sm:p-6 shadow-xl overflow-hidden">
              <BasicGrammarQuiz
                onAddXP={handleAddXP}
                
                nativeLanguage={nativeLanguage}
                onLanguageChange={setNativeLanguage}
                
                
                
                onOpenPricing={() => navigate('/pricing')}
                
                
                isPro={isPro}
                isExpired={trialInfo.isTrialExpired && !isPro}
              />
            </div>
          ) : (
            <PaywallOverlay
              featureName="Grammar Quiz"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

        {/* 8. Dashboard Overview */}
        {activeTab === 'dashboard' && (
          trialInfo.canAccess ? (
            <TalkPalDashboard
              profile={userProfileObj}
              trialInfo={trialInfo}
              onNavigate={(tab) => setActiveTab(tab as any)}
              onOpenPricing={() => navigate('/pricing')}
            />
          ) : (
            <PaywallOverlay
              featureName="Dashboard & Progress Tracking"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

        {/* 9. Analytics */}
        {activeTab === 'analytics' && (
          trialInfo.canAccess ? (
            <div className="bg-neutral-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  D3.js Grammar Intelligence
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Your Grammar & Formal Error Analytics Over Time
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Visualizing speech habits, modal verbs, verb agreement, prepositions, and tone patterns based on your saved phrase library.
                </p>
              </div>

              <GrammarAnalyticsDashboard
                
                selectedCategory={selectedAnalyticsCategory}
                onSelectCategory={setSelectedAnalyticsCategory}
              />
            </div>
          ) : (
            <PaywallOverlay
              featureName="Grammar Analytics Intelligence"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}
      </main>

      {/* Global Comprehensive Legal & Trust Footer */}
      <footer className="mt-auto bg-neutral-900 text-neutral-400 text-xs py-10 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white">
                <Speech className="w-4 h-4" />
              </div>
              <div>
                <p className="font-cambria font-['Cambria',Georgia,serif] font-bold text-white text-base">English Coach</p>
                <p className="text-[11px] text-neutral-400">Easy, fun English learning for non-English speakers worldwide</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('landing')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lessons')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Lessons Hub
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                AI Tutor Chat
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('game')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Word Match Game
              </button>
              <button
                type="button"
                onClick={() => navigate('/pricing')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Subscription
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
            <p className="max-w-xl text-center md:text-left leading-relaxed">
              Order processing conducted by Freemius, our authorized Merchant of Record. 256-bit SSL encrypted. 30-day money-back guarantee.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center font-medium">
              <a href="/terms" className="hover:text-white hover:underline transition-colors">Terms of Service</a>
              <a href="/privacy" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
              <a href="/refund" className="hover:text-white hover:underline transition-colors">Refund & Cancellation</a>
              <a href="mailto:ProEnglishAICoach@protonmail.com" className="hover:text-white hover:underline transition-colors">Contact Support</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/40">
            <p>© {new Date().getFullYear()} English Coach. All rights reserved.</p>
            <p>AI Educational Assistant — Practice conversations with simulated bilingual guidance.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-neutral-200 px-2 py-2 flex items-center justify-around shadow-lg">
        {[
          { id: 'landing', label: 'Home', icon: <Home className="w-5 h-5" /> },
          { id: 'lessons', label: 'Lessons', icon: <BookOpen className="w-5 h-5" /> },
          { id: 'chat', label: 'AI Chat', icon: <MessageSquare className="w-5 h-5" /> },
          { id: 'game', label: 'Game', icon: <Gamepad2 className="w-5 h-5" /> },
          { id: 'quiz', label: 'Cards', icon: <Layers className="w-5 h-5" /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive ? 'text-indigo-600 font-extrabold' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 scale-110' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] mt-0.5 font-bold tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Flashcards Modal */}
      <FlashcardsModal
        isOpen={isFlashcardsModalOpen}
        onClose={() => setIsFlashcardsModalOpen(false)}
        savedPhrases={savedPhrases}
        nativeLanguage={nativeLanguage}
        initialDeckId={flashcardDeckId}
        isExpired={trialInfo.isTrialExpired && !isPro}
        onOpenPricing={() => navigate('/pricing')}
      />

      {/* Saved Phrases Vault Modal */}
      <SavedPhrasesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        
        onDeletePhrase={handleDeletePhrase}
        
        onOpenFlashcards={handleOpenFlashcards}
      />

      {/* Google Chat Modal */}
      <GoogleChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        initialTextToSend={chatInitialText}
        onSelectForCoaching={(text) => {
          setIsChatModalOpen(false);
          setActiveTab('chat');
        }}
      />

      {/* Auth & Subscription Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        isPro={isPro}
        savedPhrasesCount={savedPhrases.length}
        nativeLanguage={nativeLanguage}
        trialInfo={trialInfo}
        onCancelSubscription={handleCancelSubscription}
        onOpenPaymentModal={() => navigate('/pricing')}
      />

      {/* GDPR / CCPA Cookie Consent Banner */}
      <CookieConsentBanner />

      {/* Global Coach Audio Replay Toast / Notification */}
      <CoachAudioReplayBanner />

    </div>
  );
}
