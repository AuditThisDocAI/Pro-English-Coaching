import React, { useState, useRef, useEffect } from 'react';
import { 
  RoleplayScenario, 
  RoleplayObjective, 
  NativeLanguage, 
  EnglishCEFRLevel 
} from '../types';
import { 
  Briefcase, 
  GraduationCap, 
  Coffee, 
  CheckCircle2, 
  Circle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Globe2, 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  Award, 
  Flame, 
  ChevronRight, 
  Clock, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { useTTS } from '../lib/useTTS';
import { motion, AnimatePresence } from 'motion/react';
import { triggerProUpgradeConfetti } from '../lib/confetti';

interface TalkPalRoleplaysProps {
  nativeLanguage: NativeLanguage;
  englishLevel: EnglishCEFRLevel;
  onAddXP?: (amount: number) => void;
  isPro?: boolean;
  onOpenPricing?: () => void;
}

export const CURATED_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'sc-1',
    title: 'Negotiating Project Deadline Extension',
    category: 'workplace',
    level: 'Intermediate',
    partnerName: 'Victoria Reynolds',
    partnerRole: 'VP of Product Delivery',
    partnerAvatar: '👩‍💼',
    partnerGender: 'female',
    description: 'You discovered a critical bug that requires 3 extra days of testing. You need to inform Victoria politely and agree on an updated delivery date without sounding disorganized.',
    initialMessage: "Hi there! I was reviewing our Q3 sprint schedule. Are we still on track to ship the product updates this Friday afternoon?",
    objectives: [
      { id: 'obj-1', text: 'Politely acknowledge her question and state the current status', completed: false },
      { id: 'obj-2', text: 'Explain the technical reason for the delay clearly without panic', completed: false },
      { id: 'obj-3', text: 'Propose a specific new deadline (next Tuesday) with assurance of quality', completed: false }
    ],
    starterSuggestions: [
      'Thank you for checking in, Victoria. We have made great progress, but encountered a QA edge-case.',
      'I appreciate you following up. To ensure top quality, we would like to propose a 3-day extension.',
      'I wanted to proactively inform you about a necessary adjustment to our timeline.'
    ]
  },
  {
    id: 'sc-2',
    title: 'Salary & Compensation Discussion with HR',
    category: 'interview',
    level: 'Advanced',
    partnerName: 'Marcus Bennett',
    partnerRole: 'Head of Global Talent Acquisition',
    partnerAvatar: '👨‍💼',
    partnerGender: 'male',
    description: 'You have completed 4 rounds of interviews and received an offer. Practice negotiating the base salary politely based on market rate and your track record.',
    initialMessage: "We are thrilled by your background and would love to extend an offer with a base compensation of $110,000. How does that sound to you?",
    objectives: [
      { id: 'obj-1', text: 'Express genuine gratitude and enthusiasm for the offer', completed: false },
      { id: 'obj-2', text: 'Provide market or experience-based rationale for a higher band ($125k)', completed: false },
      { id: 'obj-3', text: 'Maintain a courteous, collaborative tone leaving room for discussion', completed: false }
    ],
    starterSuggestions: [
      'Thank you so much for this offer, Marcus! I am truly excited about this opportunity.',
      'Based on the scope of the role and my track record, I was targeting closer to $125,000.',
      'Is there flexibility in the compensation band given my specialized industry experience?'
    ]
  },
  {
    id: 'sc-3',
    title: 'Polite Pushback in a Team Meeting',
    category: 'workplace',
    level: 'Intermediate',
    partnerName: 'David Chen',
    partnerRole: 'Senior Marketing Manager',
    partnerAvatar: '👨‍💻',
    partnerGender: 'male',
    description: 'A colleague proposes launching an unverified feature next week. You must disagree constructively without attacking their idea.',
    initialMessage: "I think we should launch the instant checkout button immediately on Monday to boost our weekend campaign numbers. Thoughts?",
    objectives: [
      { id: 'obj-1', text: 'Validate their enthusiasm and objective (boosting revenue)', completed: false },
      { id: 'obj-2', text: 'Highlight the risk of unverified payment gateway errors politely', completed: false },
      { id: 'obj-3', text: 'Suggest a controlled A/B test or phased rollout instead', completed: false }
    ],
    starterSuggestions: [
      'I understand the desire to capture weekend traffic, but rushing without QA poses high risk.',
      'That is an interesting idea. Could we consider doing a 10% canary release first?',
      'I see the potential upside; however, ensuring stability will protect our user experience.'
    ]
  },
  {
    id: 'sc-4',
    title: 'The Classic Interview: "Tell Me About Yourself"',
    category: 'interview',
    level: 'Beginner',
    partnerName: 'Sarah Jenkins',
    partnerRole: 'Lead Hiring Manager',
    partnerAvatar: '👩‍🏫',
    partnerGender: 'female',
    description: 'Deliver a crisp, 60-second executive summary covering your present role, past achievements, and why this new role is the perfect match.',
    initialMessage: "Welcome! We're glad to have you with us today. To kick things off, could you tell us a bit about yourself and your professional journey?",
    objectives: [
      { id: 'obj-1', text: 'Start with a confident, polite opening greeting', completed: false },
      { id: 'obj-2', text: 'Summarize 2-3 key accomplishments using strong action verbs', completed: false },
      { id: 'obj-3', text: 'Tie your background directly into why you are excited for this position', completed: false }
    ],
    starterSuggestions: [
      'Thank you, Sarah. I have over 5 years of experience driving cross-functional projects in tech.',
      'Throughout my career, I have specialized in optimizing operational workflows and team delivery.',
      'I am particularly drawn to this position because of your team’s focus on international scalability.'
    ]
  },
  {
    id: 'sc-5',
    title: 'Business Dinner & Formal Etiquette',
    category: 'daily_formal',
    level: 'Beginner',
    partnerName: 'Antoine Laurent',
    partnerRole: 'Client Host & Managing Partner',
    partnerAvatar: '🤵',
    partnerGender: 'male',
    description: 'Practice polite dining conversation, discussing business informally over dinner, and expressing courteous compliments.',
    initialMessage: "Thank you for joining me tonight. Have you had a chance to look over the menu, or would you like a recommendation from the chef?",
    objectives: [
      { id: 'obj-1', text: 'Thank the host courteously for the invitation', completed: false },
      { id: 'obj-2', text: 'Ask politely for their recommendation or state your preference with formal etiquette', completed: false },
      { id: 'obj-3', text: 'Initiate polite small talk regarding recent industry events', completed: false }
    ],
    starterSuggestions: [
      'Thank you for hosting, Antoine. I would love to hear your personal recommendation.',
      'It is a pleasure to be here. Everything on the menu looks exquisite.',
      'How was your flight into the city this morning?'
    ]
  }
];

export const TalkPalRoleplays: React.FC<TalkPalRoleplaysProps> = ({
  nativeLanguage,
  englishLevel,
  onAddXP,
  isPro = false,
  onOpenPricing
}) => {
  const [activeScenario, setActiveScenario] = useState<RoleplayScenario | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'workplace' | 'interview' | 'daily_formal'>('all');
  const [messages, setMessages] = useState<{ sender: 'user' | 'tutor'; text: string; translation?: string }[]>([]);
  const [objectives, setObjectives] = useState<RoleplayObjective[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackTip, setFeedbackTip] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { speak, isSpeaking } = useTTS();

  const filteredScenarios = CURATED_SCENARIOS.filter(
    (s) => categoryFilter === 'all' || s.category === categoryFilter
  );

  const startScenario = (scenario: RoleplayScenario) => {
    setActiveScenario(scenario);
    setObjectives(scenario.objectives.map((o) => ({ ...o, completed: false })));
    setMessages([
      {
        sender: 'tutor',
        text: scenario.initialMessage,
        translation: ''
      }
    ]);
    setIsCompleted(false);
    setScore(0);
    setFeedbackTip('');
    speak(scenario.initialMessage, {
      gender: scenario.partnerGender,
      pitch: scenario.partnerGender === 'female' ? 1.08 : 0.95
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // STT initialization
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

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
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
      try { recognitionRef.current.stop(); } catch (_) {}
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        setIsRecording(false);
      }
    }
  };

  const handleSendResponse = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading || !activeScenario) return;

    const userMessage = { sender: 'user' as const, text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/roleplay-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioTitle: activeScenario.title,
          partnerRole: `${activeScenario.partnerName} (${activeScenario.partnerRole})`,
          objectives,
          messages: [...messages, userMessage],
          userInput: text,
          nativeLanguage
        })
      });

      if (!res.ok) throw new Error('Roleplay API error');
      const data = await res.json();

      // Update completed objectives
      if (data.completedObjectiveIds && Array.isArray(data.completedObjectiveIds)) {
        setObjectives((prev) =>
          prev.map((obj) => ({
            ...obj,
            completed: obj.completed || data.completedObjectiveIds.includes(obj.id)
          }))
        );
      } else {
        // Fallback progress
        setObjectives((prev) => {
          const firstUncompleted = prev.find((o) => !o.completed);
          if (firstUncompleted) {
            return prev.map((o) => (o.id === firstUncompleted.id ? { ...o, completed: true } : o));
          }
          return prev;
        });
      }

      if (data.feedbackTip) {
        setFeedbackTip(data.feedbackTip);
      }

      const partnerMsg = {
        sender: 'tutor' as const,
        text: data.partnerReply || 'I understand. Let us proceed with this plan.',
        translation: data.translation
      };

      setMessages((prev) => [...prev, partnerMsg]);
      speak(partnerMsg.text, {
        gender: activeScenario.partnerGender,
        pitch: activeScenario.partnerGender === 'female' ? 1.08 : 0.95
      });

      // Check if all objectives are completed
      const allDone = objectives.every((o) => o.completed || (data.completedObjectiveIds || []).includes(o.id));
      if (allDone || data.isScenarioComplete) {
        setIsCompleted(true);
        setScore(data.score || 92);
        onAddXP?.(50);
        triggerProUpgradeConfetti();
      } else {
        onAddXP?.(15);
      }
    } catch (err) {
      console.error('Roleplay error:', err);
      const fallbackPartner = {
        sender: 'tutor' as const,
        text: 'Thank you for explaining. That sounds reasonable and professionally handled.',
        translation: 'Gracias por explicar. Eso suena razonable y profesional.'
      };
      setMessages((prev) => [...prev, fallbackPartner]);
      speak(fallbackPartner.text, {
        gender: activeScenario.partnerGender,
        pitch: activeScenario.partnerGender === 'female' ? 1.08 : 0.95
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* If No Active Scenario: Show Category Filters & Scenario Grid */}
      {!activeScenario ? (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-teal-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-300 text-xs font-bold border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                Pro English Immersive Simulations
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Workplace & Formal English Roleplays
              </h2>
              <p className="text-sm text-indigo-200">
                Practice high-stakes meetings, salary reviews, and job interviews in safe, simulated conversations with AI characters.
              </p>
            </div>
            <div className="absolute right-4 bottom-2 text-8xl opacity-15 select-none pointer-events-none">
              🎭
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Scenarios', count: CURATED_SCENARIOS.length },
              { id: 'workplace', label: 'Workplace & Meetings', count: CURATED_SCENARIOS.filter(s => s.category === 'workplace').length },
              { id: 'interview', label: 'Job Interviews', count: CURATED_SCENARIOS.filter(s => s.category === 'interview').length },
              { id: 'daily_formal', label: 'Daily Formal & Dining', count: CURATED_SCENARIOS.filter(s => s.category === 'daily_formal').length }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id as any)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  categoryFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  categoryFilter === tab.id ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScenarios.map((scenario) => {
              return (
                <div
                  key={scenario.id}
                  className="p-5 rounded-3xl bg-white border border-neutral-200/90 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2 rounded-2xl bg-indigo-50 border border-indigo-100/80">
                          {scenario.partnerAvatar}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-sm text-neutral-900 leading-tight group-hover:text-indigo-600 transition-colors">
                            {scenario.title}
                          </h4>
                          <span className="text-xs text-neutral-500 font-medium block">
                            Partner: {scenario.partnerName} ({scenario.partnerRole})
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                      {scenario.description}
                    </p>

                    {/* Objectives Checklist Preview */}
                    <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase text-neutral-400 block">
                        Mission Checklist ({scenario.objectives.length} Objectives)
                      </span>
                      {scenario.objectives.slice(0, 2).map((obj, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-700">
                          <Circle className="w-3 h-3 text-neutral-300 shrink-0" />
                          <span className="truncate">{obj.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider ${
                      scenario.level === 'Beginner'
                        ? 'bg-emerald-100 text-emerald-800'
                        : scenario.level === 'Intermediate'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {scenario.level}
                    </span>

                    <button
                      type="button"
                      onClick={() => startScenario(scenario)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-200 transition-all flex items-center gap-1.5 cursor-pointer group-hover:translate-x-0.5"
                    >
                      <span>Start Roleplay</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Roleplay Session View */
        <div className="flex flex-col lg:flex-row gap-5 h-[800px] max-h-[85vh]">
          
          {/* Left / Sidebar: Mission Objectives & Partner Profile */}
          <div className="lg:w-80 bg-white rounded-3xl border border-neutral-200 p-5 shadow-sm flex flex-col justify-between gap-4 overflow-y-auto shrink-0">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setActiveScenario(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit Scenario</span>
              </button>

              {/* Partner Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center space-y-2">
                <div className="text-4xl">{activeScenario.partnerAvatar}</div>
                <div>
                  <h3 className="font-extrabold text-sm text-neutral-900">{activeScenario.partnerName}</h3>
                  <p className="text-xs text-indigo-700 font-semibold">{activeScenario.partnerRole}</p>
                </div>
                <p className="text-[11px] text-neutral-600 leading-snug">
                  {activeScenario.description}
                </p>
              </div>

              {/* Scenario Objectives */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-neutral-900">
                  <span>Scenario Objectives</span>
                  <span className="text-indigo-600">
                    {objectives.filter(o => o.completed).length} / {objectives.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {objectives.map((obj) => (
                    <div
                      key={obj.id}
                      className={`p-3 rounded-2xl border transition-all flex items-start gap-2.5 text-xs ${
                        obj.completed
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {obj.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-snug">{obj.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Formal Feedback Tip */}
              {feedbackTip && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="flex items-center gap-1 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Coach Feedback:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{feedbackTip}</p>
                </div>
              )}
            </div>

            {/* Bottom Reset Button */}
            <button
              type="button"
              onClick={() => startScenario(activeScenario)}
              className="w-full py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-bold text-neutral-600 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Scenario</span>
            </button>
          </div>

          {/* Right / Main Dialogue Stage */}
          <div className="flex-1 bg-white rounded-3xl border border-neutral-200 shadow-md flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/70 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-sm text-neutral-900">{activeScenario.title}</h3>
                <span className="text-xs text-neutral-500 font-medium">
                  Active roleplay with {activeScenario.partnerName}
                </span>
              </div>

              {isCompleted && (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5 animate-bounce">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  <span>Completed! ({score}%)</span>
                </span>
              )}
            </div>

            {/* Messages Flow */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-neutral-50/40 to-white">
              {messages.map((m, i) => {
                const isUser = m.sender === 'user';
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 mt-1 shadow-2xs ${
                      isUser ? 'bg-indigo-600 text-white font-bold' : 'bg-white border border-neutral-200'
                    }`}>
                      {isUser ? 'You' : activeScenario.partnerAvatar}
                    </div>

                    <div className={`rounded-3xl p-4 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white border border-neutral-200/80 text-neutral-900 rounded-tl-none shadow-xs'
                    }`}>
                      <p className="whitespace-pre-wrap">{m.text}</p>

                      {!isUser && (
                        <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => speak(m.text, {
                              gender: activeScenario.partnerGender,
                              pitch: activeScenario.partnerGender === 'female' ? 1.08 : 0.95
                            })}
                            className="text-xs font-bold text-neutral-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Listen
                          </button>

                          {m.translation && (
                            <button
                              type="button"
                              onClick={() => setShowTranslation(prev => ({ ...prev, [i]: !prev[i] }))}
                              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                            >
                              <Globe2 className="w-3.5 h-3.5" />
                              <span>{showTranslation[i] ? 'Hide' : nativeLanguage}</span>
                            </button>
                          )}
                        </div>
                      )}

                      {!isUser && m.translation && showTranslation[i] && (
                        <div className="mt-2 p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-950">
                          {m.translation}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold pl-10 animate-pulse">
                  <span>{activeScenario.partnerName} is typing a response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter Suggestion Chips */}
            {activeScenario.starterSuggestions.length > 0 && messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-neutral-100 bg-neutral-50/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-extrabold uppercase text-neutral-400 shrink-0">
                  Try saying:
                </span>
                {activeScenario.starterSuggestions.map((sugg, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendResponse(sugg)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 border border-neutral-200 hover:border-indigo-300 text-xs font-semibold text-neutral-700 hover:text-indigo-900 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
                  >
                    "{sugg}"
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendResponse();
                }}
                className="flex items-center gap-2"
              >
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

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isRecording ? 'Listening... Speak clearly...' : `Reply politely to ${activeScenario.partnerName}...`}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-indigo-600 focus:outline-hidden text-sm font-medium text-neutral-900 placeholder:text-neutral-400 transition-all"
                />

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

        </div>
      )}

    </div>
  );
};
