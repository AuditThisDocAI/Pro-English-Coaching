import React, { useState, useEffect } from 'react';
import { 
  EnglishCEFRLevel, 
  EnglishGoal, 
  NativeLanguage, 
  SUPPORTED_LANGUAGES 
} from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  BookOpen, 
  ShieldCheck, 
  Award,
  Zap,
  Globe2,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerProUpgradeConfetti } from '../lib/confetti';

interface TalkPalOnboardingProps {
  initialLanguage?: NativeLanguage;
  onComplete: (data: {
    nativeLanguage: NativeLanguage;
    englishLevel: EnglishCEFRLevel;
    learningGoal: EnglishGoal;
    dailyGoalMinutes: number;
  }) => void;
  onClose?: () => void;
}

const CEFR_LEVELS: {
  level: EnglishCEFRLevel;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
}[] = [
  {
    level: 'A1',
    title: 'Beginner (A1)',
    subtitle: 'Starting from scratch',
    badge: 'A1',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'I know basic words and simple greetings, but struggle to form full formal sentences.'
  },
  {
    level: 'A2',
    title: 'Elementary (A2)',
    subtitle: 'Basic conversations',
    badge: 'A2',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'I can understand simple phrases and introduce myself, but need practice for polite workplace dialogue.'
  },
  {
    level: 'B1',
    title: 'Intermediate (B1)',
    subtitle: 'Everyday workplace English',
    badge: 'B1',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'I can handle most workplace emails and meetings, but want to sound more professional and confident.'
  },
  {
    level: 'B2',
    title: 'Upper Intermediate (B2)',
    subtitle: 'Formal & business fluency',
    badge: 'B2',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'I speak fluently but want to master diplomatic nuance, executive pushback, and interview storytelling.'
  },
  {
    level: 'C1',
    title: 'Advanced / Executive (C1-C2)',
    subtitle: 'Executive precision & polish',
    badge: 'C1',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'I aim for high-stakes leadership presence, effortless negotiation, and flawless corporate etiquette.'
  }
];

const GOALS: {
  id: EnglishGoal;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  popular?: boolean;
}[] = [
  {
    id: 'workplace_formal',
    title: 'Workplace & Business English',
    subtitle: 'Executive emails, team meetings, Slack etiquette, and giving polite updates.',
    icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
    popular: true
  },
  {
    id: 'interview_career',
    title: 'Job Interviews & Career Growth',
    subtitle: 'STAR method answers, salary negotiation, and interview confidence.',
    icon: <GraduationCap className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'daily_polite',
    title: 'Daily Polite & Formal Conversations',
    subtitle: 'Polite small talk, dining etiquette, networking events, and clear requests.',
    icon: <MessageSquare className="w-5 h-5 text-amber-600" />
  },
  {
    id: 'grammar_etiquette',
    title: 'Grammar, Phrasing & Etiquette Boosters',
    subtitle: 'Replacing blunt phrasing with diplomatic modal verbs and natural idioms.',
    icon: <BookOpen className="w-5 h-5 text-rose-600" />
  }
];

const DAILY_GOALS = [
  { minutes: 5, label: 'Casual', xp: '10 XP / day', desc: '5 min of quick daily flashcards & chat' },
  { minutes: 10, label: 'Regular', xp: '25 XP / day', desc: '10 min of roleplay & formal speaking', recommended: true },
  { minutes: 15, label: 'Serious', xp: '50 XP / day', desc: '15 min of comprehensive tutor drills' },
  { minutes: 20, label: 'Intensive', xp: '100 XP / day', desc: '20 min of immersive phone call & scenarios' }
];

export const TalkPalOnboarding: React.FC<TalkPalOnboardingProps> = ({
  initialLanguage = 'Spanish',
  onComplete,
  onClose
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<NativeLanguage>(initialLanguage);
  const [selectedLevel, setSelectedLevel] = useState<EnglishCEFRLevel>('B1');
  const [selectedGoal, setSelectedGoal] = useState<EnglishGoal>('workplace_formal');
  const [dailyMinutes, setDailyMinutes] = useState<number>(10);

  // Plan generation simulation
  const [planProgress, setPlanProgress] = useState<number>(0);
  const [planStatus, setPlanStatus] = useState<string>('Analyzing your English proficiency...');

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else if (step === totalSteps) {
      setStep(6); // Go to plan building animation
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Run animated plan generation when reaching step 6
  useEffect(() => {
    if (step === 6) {
      const statuses = [
        'Analyzing your English level (CEFR: ' + selectedLevel + ')...',
        'Curating Basic & Formal English workplace roleplays...',
        'Calibrating AI Tutor Emma with your native language (' + selectedLanguage + ')...',
        'Personalizing executive email & meeting flashcard decks...',
        'Your custom Basic & Formal English plan is ready!'
      ];

      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setPlanProgress(Math.min(current * 20, 100));
        if (current < statuses.length) {
          setPlanStatus(statuses[current]);
        } else {
          clearInterval(interval);
          triggerProUpgradeConfetti();
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [step, selectedLevel, selectedLanguage]);

  const handleFinish = () => {
    onComplete({
      nativeLanguage: selectedLanguage,
      englishLevel: selectedLevel,
      learningGoal: selectedGoal,
      dailyGoalMinutes: dailyMinutes
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Progress Header */}
        {step <= totalSteps && (
          <div className="px-6 pt-5 pb-3 border-b border-neutral-100 bg-neutral-50/70 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-8 h-8 rounded-full bg-white border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-all cursor-pointer"
                  title="Previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-indigo-600 block">
                  Pro English Coach • Step {step} of {totalSteps}
                </span>
                <span className="text-xs font-semibold text-neutral-700">
                  {step === 1 && 'Learning Language'}
                  {step === 2 && 'Your Native Language'}
                  {step === 3 && 'Your English Proficiency'}
                  {step === 4 && 'Primary Learning Goals'}
                  {step === 5 && 'Daily Practice Commitment'}
                </span>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === step
                      ? 'w-6 bg-indigo-600'
                      : i < step
                      ? 'w-2 bg-emerald-500'
                      : 'w-2 bg-neutral-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex-1">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Target Language (Focused on English - Basic & Formal) */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center max-w-md mx-auto space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-200/60">
                    <Sparkles className="w-3.5 h-3.5" />
                    Specialized English Training
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                    What language do you want to master?
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Our AI tutor focuses exclusively on helping you transition from basic to polite, formal, and executive English.
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <div className="p-5 rounded-2xl border-2 border-indigo-600 bg-indigo-50/50 shadow-md flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">🇬🇧 🇺🇸</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-neutral-900">English</h3>
                          <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                            Basic to Formal
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mt-0.5">
                          Workplace emails, job interviews, polite requests, and executive speech.
                        </p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-600 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Pro English Coach Focus:</strong> You will practice real-world workplace scenarios, simulated phone calls, and formal sentence restructuring with instant feedback.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Native Language Selection */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center max-w-md mx-auto space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                    What is your native language?
                  </h2>
                  <p className="text-sm text-neutral-500">
                    We provide instant bilingual explanations, vocabulary insights, and grammar tips in your mother tongue.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage === lang.name;
                    return (
                      <button
                        key={lang.name}
                        type="button"
                        onClick={() => setSelectedLanguage(lang.name)}
                        className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-2.5 text-left cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-600/20'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="text-2xl shrink-0">{lang.flag}</span>
                        <div className="min-w-0">
                          <span className={`text-xs font-bold block truncate ${isSelected ? 'text-indigo-900' : 'text-neutral-800'}`}>
                            {lang.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 block truncate">
                            {lang.label.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Current English Proficiency (CEFR) */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center max-w-md mx-auto space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                    What is your English level?
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    We adapt the complexity of roleplays and tutor conversations to match your stage.
                  </p>
                </div>

                <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {CEFR_LEVELS.map((lvl) => {
                    const isSelected = selectedLevel === lvl.level;
                    return (
                      <button
                        key={lvl.level}
                        type="button"
                        onClick={() => setSelectedLevel(lvl.level)}
                        className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 transition-all text-left flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-600/20'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border shrink-0 ${lvl.badgeColor}`}>
                          {lvl.badge}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-bold text-neutral-900">{lvl.title}</h3>
                            <span className="text-[11px] font-semibold text-neutral-400">{lvl.subtitle}</span>
                          </div>
                          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                            {lvl.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Primary Goals */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center max-w-md mx-auto space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                    What is your main goal?
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Choose the area where you want to see the fastest improvement.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {GOALS.map((goal) => {
                    const isSelected = selectedGoal === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setSelectedGoal(goal.id)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-start gap-4 cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-600/20'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-2xs shrink-0">
                          {goal.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-neutral-900">{goal.title}</h3>
                            {goal.popular && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                            {goal.subtitle}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: Daily Commitment */}
            {step === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center max-w-md mx-auto space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                    Set your daily practice goal
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Just a few minutes every day builds permanent workplace confidence.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DAILY_GOALS.map((dg) => {
                    const isSelected = dailyMinutes === dg.minutes;
                    return (
                      <button
                        key={dg.minutes}
                        type="button"
                        onClick={() => setDailyMinutes(dg.minutes)}
                        className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-600/20'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Clock className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-neutral-400'}`} />
                            <span className="font-extrabold text-sm text-neutral-900">{dg.label}</span>
                          </div>
                          {dg.recommended && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="text-lg font-black text-neutral-900">{dg.minutes} min / day</div>
                          <p className="text-xs text-neutral-500 mt-0.5">{dg.desc}</p>
                        </div>
                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-indigo-700">
                          <span>{dg.xp}</span>
                          {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 6: Plan Building Animation */}
            {step === 6 && (
              <motion.div
                key="step-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-6"
              >
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 p-1 flex items-center justify-center shadow-xl shadow-indigo-200">
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-indigo-600">
                    <Sparkles className="w-10 h-10 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                    {planProgress >= 100 ? 'Your Plan is Ready!' : 'Creating Your Custom Plan...'}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-neutral-600 min-h-[20px]">
                    {planStatus}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-md mx-auto space-y-2">
                  <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-neutral-200">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${planProgress}%` }}
                      transition={{ ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-bold text-neutral-400">
                    <span>Target: Basic & Formal English</span>
                    <span>{planProgress}%</span>
                  </div>
                </div>

                {/* Generated Summary Card */}
                {planProgress >= 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 max-w-md mx-auto text-left space-y-3 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
                      <Award className="w-4 h-4 text-indigo-600" /> Your Personalized Curriculum
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                        <span className="text-[10px] text-neutral-400 font-bold block">Starting Level</span>
                        <span className="font-extrabold text-neutral-900">{selectedLevel} • {CEFR_LEVELS.find(l => l.level === selectedLevel)?.subtitle}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                        <span className="text-[10px] text-neutral-400 font-bold block">Native Language</span>
                        <span className="font-extrabold text-neutral-900">{selectedLanguage}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                        <span className="text-[10px] text-neutral-400 font-bold block">Primary Focus</span>
                        <span className="font-extrabold text-neutral-900 truncate block">{GOALS.find(g => g.id === selectedGoal)?.title}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                        <span className="text-[10px] text-neutral-400 font-bold block">Daily Goal</span>
                        <span className="font-extrabold text-neutral-900">{dailyMinutes} Minutes</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between gap-3">
          {step <= totalSteps ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold text-neutral-400 hover:text-neutral-600 transition-colors px-3 py-2"
              >
                Skip Onboarding
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center gap-2 cursor-pointer ml-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={planProgress < 100}
              onClick={handleFinish}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                planProgress >= 100
                  ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-indigo-200 hover:opacity-95 active:scale-[0.99]'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span>Start Learning Basic & Formal English</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
