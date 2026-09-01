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
import { TalkPalOnboarding } from './components/TalkPalOnboarding';
import { FlashcardsPracticeHub } from './components/FlashcardsPracticeHub';
import { SavedPhrasesModal } from './components/SavedPhrasesModal';
import { GoogleChatModal } from './components/GoogleChatModal';
import { AuthModal } from './components/AuthModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { GrammarAnalyticsDashboard } from './components/GrammarAnalyticsDashboard';
import { SupportSection } from './components/SupportSection';
import { TrialBanner } from './components/TrialBanner';
import { PaywallOverlay } from './components/PaywallOverlay';
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
  Phone,
  Layers,
  Flame,
  Award,
  TrendingUp
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

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'roleplays' | 'call' | 'flashcards' | 'analytics'>('dashboard');

  // Quota & Pro Subscription State
  const [chatCount, setChatCount] = useState<number>(() => loadUserChatCount(auth.currentUser));
  const [isPro, setIsPro] = useState<boolean>(() => loadUserIsPro(auth.currentUser));
  const [trialStartDate, setTrialStartDate] = useState<string>(() => getUserTrialStartDate(auth.currentUser));

  // User Profile details
  const [englishLevel, setEnglishLevel] = useState<EnglishCEFRLevel>('B1');
  const [learningGoal, setLearningGoal] = useState<EnglishGoal>('workplace_formal');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(10);
  const [xpPoints, setXpPoints] = useState<number>(140);
  const [streakDays, setStreakDays] = useState<number>(3);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Compute live trial state
  const trialInfo = calculateTrialInfo(currentUser, isPro, trialStartDate);

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
  const [flashcardDeckId, setFlashcardDeckId] = useState<string>('executive-email');
  const [selectedAnalyticsCategory, setSelectedAnalyticsCategory] = useState<string | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatInitialText, setChatInitialText] = useState('');

  // Check if first time user to optionally prompt onboarding
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasCompleted = localStorage.getItem('proenglish_onboarding_completed');
      if (!hasCompleted) {
        // First time visitor: show onboarding
        setIsOnboardingOpen(true);
      }
    }
  }, []);

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
            const initialCount = loadUserChatCount(user);
            const initialPro = loadUserIsPro(user);
            const initialTrialStart = getUserTrialStartDate(user);
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

  const handleCompleteOnboarding = (data: {
    nativeLanguage: NativeLanguage;
    englishLevel: EnglishCEFRLevel;
    learningGoal: EnglishGoal;
    dailyGoalMinutes: number;
  }) => {
    setNativeLanguage(data.nativeLanguage);
    setEnglishLevel(data.englishLevel);
    setLearningGoal(data.learningGoal);
    setDailyGoalMinutes(data.dailyGoalMinutes);
    setIsOnboardingOpen(false);
    localStorage.setItem('proenglish_onboarding_completed', 'true');

    if (currentUser) {
      syncUserProfile(currentUser.uid, {
        nativeLanguage: data.nativeLanguage,
        englishLevel: data.englishLevel,
        learningGoal: data.learningGoal,
        dailyGoalMinutes: data.dailyGoalMinutes,
        onboardingCompleted: true
      }).catch(console.error);
    }
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
    setActiveTab('flashcards');
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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-base tracking-tight text-neutral-900 flex items-center gap-1.5 leading-none">
                Pro English Coach
                <span className="hidden sm:inline-block text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  Basic & Formal
                </span>
              </h1>
              <p className="text-[11px] text-neutral-500 hidden sm:block mt-0.5">
                AI Coach for Conversational & Workplace English
              </p>
            </div>
          </button>

          {/* CEFR Level Badge */}
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer"
            title="Click to adjust English CEFR level & goals"
          >
            <span>CEFR: {englishLevel}</span>
          </button>
        </div>

        {/* Desktop Primary Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-2xl border border-neutral-200/80 text-xs font-bold">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-3.5 h-3.5" /> },
            { id: 'chat', label: 'Chat Tutor', icon: <MessageSquare className="w-3.5 h-3.5" /> },
            { id: 'roleplays', label: 'Roleplays', icon: <Briefcase className="w-3.5 h-3.5" /> },
            { id: 'call', label: 'Voice Call', icon: <Phone className="w-3.5 h-3.5" /> },
            { id: 'flashcards', label: 'Sentence Cards', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-3.5 h-3.5" /> }
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
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-black" title="Current Daily Practice Streak">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streakDays}d</span>
          </div>

          {/* XP Gems */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-black" title="Earned Learning XP Points">
            <Zap className="w-4 h-4 text-teal-600 fill-teal-600" />
            <span>{xpPoints} XP</span>
          </div>

          {/* Native Language Selector */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-colors">
            <Languages className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value as NativeLanguage)}
              className="bg-transparent text-neutral-800 font-extrabold focus:outline-hidden cursor-pointer text-xs"
              title="Select native language for translations"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.name} value={lang.name}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Saved Vault Button */}
          <button
            onClick={() => setIsSavedModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
            title="View saved formal phrase library"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Saved</span>
            {savedPhrases.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {savedPhrases.length}
              </span>
            )}
          </button>

          {/* Pro Subscription Button */}
          {isPro ? (
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-extrabold border border-emerald-200 shadow-2xs transition-colors cursor-pointer"
              title="Manage Pro membership"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Pro Active</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:opacity-90 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span className="hidden sm:inline">Go Pro ($20/mo)</span>
              <span className="sm:hidden">Pro</span>
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
        {activeTab === 'dashboard' && (
          <TalkPalDashboard
            profile={userProfileObj}
            onNavigate={(tab) => setActiveTab(tab as any)}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onOpenPricing={() => navigate('/pricing')}
          />
        )}

        {activeTab === 'chat' && (
          trialInfo.canAccess ? (
            <TalkPalChatTutor
              nativeLanguage={nativeLanguage}
              englishLevel={englishLevel}
              onSavePhrase={handleSavePhrase}
              isPro={isPro}
              onOpenPricing={() => navigate('/pricing')}
              onAddXP={handleAddXP}
            />
          ) : (
            <PaywallOverlay
              featureName="AI Chat Tutor"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

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
              featureName="Workplace & Career Roleplays"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

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

        {activeTab === 'flashcards' && (
          trialInfo.canAccess ? (
            <div className="bg-neutral-900 rounded-3xl p-4 sm:p-6 shadow-xl overflow-hidden">
              <FlashcardsPracticeHub
                savedPhrases={savedPhrases}
                nativeLanguage={nativeLanguage}
                onLanguageChange={setNativeLanguage}
                onSavePhrase={handleSavePhrase}
                onSendToChat={handleOpenSendToChat}
                onOpenSavedModal={() => setIsSavedModalOpen(true)}
                onOpenPricing={() => navigate('/pricing')}
                selectedDeckId={flashcardDeckId}
                onSelectDeckId={(id) => setFlashcardDeckId(id)}
                isPro={isPro}
              />
            </div>
          ) : (
            <PaywallOverlay
              featureName="Sentence Cards & Spaced Repetition"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}

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
                savedPhrases={savedPhrases}
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

      {/* Support and FAQ Section on Dashboard */}
      {activeTab === 'dashboard' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
          <HowItWorksSection />
          <FeaturesSection />
          <FAQSection />
          <SupportSection
            userEmail={currentUser?.email || undefined}
            onOpenPricing={() => navigate('/pricing')}
          />
          <LandingFooter
            onStartPracticing={() => setActiveTab('chat')}
            onOpenPricing={() => navigate('/pricing')}
            onOpenSupport={() => {
              const el = document.getElementById('support');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>
      )}

      {/* Mobile Bottom Navigation Bar (TalkPal Style) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-neutral-200 px-2 py-2 flex items-center justify-around shadow-lg">
        {[
          { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
          { id: 'chat', label: 'Chat', icon: <MessageSquare className="w-5 h-5" /> },
          { id: 'roleplays', label: 'Roleplay', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'call', label: 'Call', icon: <Phone className="w-5 h-5" /> },
          { id: 'flashcards', label: 'Cards', icon: <Layers className="w-5 h-5" /> }
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

      {/* TalkPal Onboarding Wizard Modal */}
      {isOnboardingOpen && (
        <TalkPalOnboarding
          initialLanguage={nativeLanguage}
          onComplete={handleCompleteOnboarding}
          onClose={() => setIsOnboardingOpen(false)}
        />
      )}

      {/* Flashcards Modal */}
      <FlashcardsModal
        isOpen={isFlashcardsModalOpen}
        onClose={() => setIsFlashcardsModalOpen(false)}
        savedPhrases={savedPhrases}
        nativeLanguage={nativeLanguage}
        onSendToChat={handleOpenSendToChat}
        initialDeckId={flashcardDeckId}
      />

      {/* Saved Phrases Vault Modal */}
      <SavedPhrasesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedPhrases={savedPhrases}
        onDeletePhrase={handleDeletePhrase}
        onSendToChat={handleOpenSendToChat}
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

    </div>
  );
}
