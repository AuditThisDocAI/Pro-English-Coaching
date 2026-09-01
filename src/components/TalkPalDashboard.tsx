import React from 'react';
import { 
  UserProfile, 
  NativeLanguage, 
  EnglishCEFRLevel, 
  EnglishGoal 
} from '../types';
import { 
  Sparkles, 
  Flame, 
  Award, 
  MessageSquare, 
  Briefcase, 
  Phone, 
  Layers, 
  Zap, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen, 
  Globe2,
  ChevronRight,
  ShieldCheck,
  Star,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { TrialInfo } from '../lib/trialService';

interface TalkPalDashboardProps {
  profile: UserProfile;
  trialInfo?: TrialInfo;
  onNavigate: (tab: string) => void;
  onOpenOnboarding: () => void;
  onOpenPricing?: () => void;
}

export const TalkPalDashboard: React.FC<TalkPalDashboardProps> = ({
  profile,
  trialInfo,
  onNavigate,
  onOpenOnboarding,
  onOpenPricing
}) => {
  const cefrLevel = profile.englishLevel || 'B1';
  const xp = profile.xpPoints || 140;
  const streak = profile.streakDays || 3;
  const dailyGoal = profile.dailyGoalMinutes || 10;
  const nativeLang = (profile.nativeLanguage as NativeLanguage) || 'Spanish';

  const isExpired = trialInfo?.isTrialExpired && !trialInfo?.isPro;

  const handleCardClick = (tab: string) => {
    if (isExpired && onOpenPricing) {
      onOpenPricing();
    } else {
      onNavigate(tab);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* 3-Day Free Trial Status Card (When Not Pro) */}
      {!trialInfo?.isPro && trialInfo && (
        <div className={`p-5 rounded-3xl border transition-all ${
          isExpired
            ? 'bg-amber-900/10 border-amber-300 text-amber-950'
            : 'bg-emerald-950/5 border-emerald-300 text-emerald-950'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-xs ${
                isExpired ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {isExpired ? <Lock className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isExpired ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    {isExpired ? '3-Day Trial Concluded' : '3-Day Free Trial Active'}
                  </span>
                  <span className="text-xs font-bold text-neutral-600">
                    {trialInfo.formattedTimeRemaining}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-neutral-900">
                  {isExpired 
                    ? 'Your 3-day complimentary access has ended'
                    : 'Full access to all AI coaching tools is unlocked'}
                </h3>
                <p className="text-xs text-neutral-600">
                  {isExpired
                    ? 'Upgrade to Pro ($19.99/mo) to unlock unlimited AI Chat, Voice Calls, Roleplays, and Flashcards.'
                    : 'Practice freely with 1-on-1 AI tutors, voice scenarios, and sentence drills. Zero charge during the 3-day trial.'}
                </p>
              </div>
            </div>

            {onOpenPricing && (
              <button
                type="button"
                onClick={onOpenPricing}
                className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isExpired 
                    ? 'bg-amber-500 hover:bg-amber-600 text-neutral-950'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{isExpired ? 'Unlock Pro Access ($20/mo)' : 'Upgrade to Pro'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Trial Progress Bar */}
          {!isExpired && (
            <div className="mt-3.5 pt-3 border-t border-emerald-200/60">
              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 mb-1.5">
                <span>Free Trial Timeline</span>
                <span className="text-emerald-700">{trialInfo.daysLeft} days remaining</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 rounded-full"
                  style={{ width: `${trialInfo.percentRemaining}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top Welcome & Daily Goal Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-teal-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-300 text-xs font-extrabold border border-white/15 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Pro English Coach
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold border border-white/10">
                CEFR: {cefrLevel} Intermediate
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back{profile.displayName ? `, ${profile.displayName}` : ''}!
            </h1>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Your personalized curriculum is set for <strong>Basic to Formal English</strong> with native explanations in <strong>{nativeLang}</strong>.
            </p>
          </div>

          {/* Quick Streak & XP Widget */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shrink-0">
            <div className="text-center px-3 border-r border-white/10">
              <div className="flex items-center justify-center gap-1 text-amber-300 font-black text-lg">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
                <span>{streak}</span>
              </div>
              <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider">Day Streak</span>
            </div>

            <div className="text-center px-3">
              <div className="flex items-center justify-center gap-1 text-teal-300 font-black text-lg">
                <Zap className="w-5 h-5 text-teal-400" />
                <span>{xp}</span>
              </div>
              <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider">XP Points</span>
            </div>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-6 -bottom-6 text-9xl opacity-10 select-none pointer-events-none">
          🇬🇧
        </div>
      </div>

      {/* Recommended Daily Lesson (Quick Start) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-indigo-50 to-teal-50 border border-indigo-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md shadow-indigo-200">
            ⭐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider">
                Recommended Daily Drill
              </span>
              <span className="text-xs font-semibold text-neutral-500">{dailyGoal} Min Target</span>
            </div>
            <h3 className="font-extrabold text-base text-neutral-900 mt-0.5">
              Polite Pushback & Diplomatic Alignment
            </h3>
            <p className="text-xs text-neutral-600">
              Master how to disagree with managers and clients without sounding blunt or defensive.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCardClick('roleplays')}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-extrabold shadow-md shadow-indigo-200 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>{isExpired ? 'Unlock Drill (Pro)' : 'Start Practice'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Learning Mode Cards (Pro English Coach Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-neutral-900 tracking-tight">
            Core Pro English Modes
          </h2>
          <span className="text-xs text-neutral-500 font-medium">All specialized in Basic & Formal English</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: AI Chat Tutor */}
          <div
            onClick={() => handleCardClick('chat')}
            className={`p-5 rounded-3xl bg-white border transition-all flex flex-col justify-between gap-4 cursor-pointer group ${
              isExpired 
                ? 'border-neutral-200 opacity-90 hover:border-amber-400' 
                : 'border-neutral-200 hover:border-indigo-500 hover:shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs">
                  💬
                </div>
                {isExpired && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Pro
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-neutral-900 group-hover:text-indigo-600 transition-colors">
                  AI Chat Tutor
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Real-time conversation with Emma. Get instant formal alternatives, grammar explanations & voice audio.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>{isExpired ? 'Unlock Chat Tutor' : 'Open Tutor Chat'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Workplace Roleplays */}
          <div
            onClick={() => handleCardClick('roleplays')}
            className={`p-5 rounded-3xl bg-white border transition-all flex flex-col justify-between gap-4 cursor-pointer group ${
              isExpired 
                ? 'border-neutral-200 opacity-90 hover:border-amber-400' 
                : 'border-neutral-200 hover:border-teal-500 hover:shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs">
                  🎭
                </div>
                {isExpired && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Pro
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-neutral-900 group-hover:text-teal-600 transition-colors">
                  Workplace Roleplays
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Simulated scenarios for salary reviews, project delays, client emails & job interviews with objective checklists.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-teal-600">
              <span>{isExpired ? 'Unlock Roleplays' : 'Explore Roleplays'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Voice Call Mode */}
          <div
            onClick={() => handleCardClick('call')}
            className={`p-5 rounded-3xl bg-white border transition-all flex flex-col justify-between gap-4 cursor-pointer group ${
              isExpired 
                ? 'border-neutral-200 opacity-90 hover:border-amber-400' 
                : 'border-neutral-200 hover:border-emerald-500 hover:shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs">
                  📞
                </div>
                {isExpired && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Pro
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-neutral-900 group-hover:text-emerald-600 transition-colors">
                  Voice Phone Call
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Simulated hands-free voice calls with AI recruiters and colleagues. Build telephone confidence fast.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>{isExpired ? 'Unlock Voice Calls' : 'Start Voice Call'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Flashcards & Sentence Studio */}
          <div
            onClick={() => handleCardClick('flashcards')}
            className={`p-5 rounded-3xl bg-white border transition-all flex flex-col justify-between gap-4 cursor-pointer group ${
              isExpired 
                ? 'border-neutral-200 opacity-90 hover:border-amber-400' 
                : 'border-neutral-200 hover:border-amber-500 hover:shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs">
                  🗂️
                </div>
                {isExpired && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Pro
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-neutral-900 group-hover:text-amber-600 transition-colors">
                  Sentence Mastery & Cards
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  3D flip card drills, interactive multiple-choice quiz mode, spaced repetition & formal sentence rewriting.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>{isExpired ? 'Unlock Cards' : 'Practice Flashcards'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* CEFR Level Progression Tracker & Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="md:col-span-2 p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-sm text-neutral-900">Your CEFR English Mastery Path</h3>
            </div>
            <span className="text-xs font-bold text-indigo-600">Target: C1 Executive Fluency</span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[
              { lvl: 'A1', name: 'Beginner', active: cefrLevel === 'A1' },
              { lvl: 'A2', name: 'Elementary', active: cefrLevel === 'A2' },
              { lvl: 'B1', name: 'Intermediate', active: cefrLevel === 'B1' },
              { lvl: 'B2', name: 'Upper Inter.', active: cefrLevel === 'B2' },
              { lvl: 'C1', name: 'Executive', active: cefrLevel === 'C1' || cefrLevel === 'C2' }
            ].map((step, idx) => (
              <div
                key={step.lvl}
                className={`p-3 rounded-2xl border transition-all ${
                  step.active
                    ? 'bg-indigo-600 text-white font-extrabold border-indigo-600 shadow-md shadow-indigo-100'
                    : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                }`}
              >
                <span className="text-sm font-black block">{step.lvl}</span>
                <span className="text-[10px] opacity-80 truncate block">{step.name}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed">
            Every chat response, roleplay objective completed, and flashcard quiz advances your CEFR level score.
          </p>
        </div>

        {/* Quick Customization Pill */}
        <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-neutral-400">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>Language Profile</span>
            </div>
            <h4 className="font-extrabold text-sm text-neutral-900">
              Learning in {nativeLang}
            </h4>
            <p className="text-xs text-neutral-500">
              You can adjust your native language, English goals, or retake the onboarding wizard at any time.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenOnboarding}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
          >
            Customize English Plan
          </button>
        </div>

      </div>

    </div>
  );
};
