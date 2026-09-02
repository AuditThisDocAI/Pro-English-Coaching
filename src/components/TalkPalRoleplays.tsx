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
  ChevronDown,
  ChevronUp,
  Clock, 
  AlertCircle,
  RotateCcw,
  Lightbulb,
  Check,
  Copy,
  MessageSquarePlus
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
      { 
        id: 'obj-1', 
        text: 'Politely acknowledge her question and state the current status', 
        completed: false,
        suggestedPhrase: "Thank you for checking in, Victoria. We have made solid progress, but I wanted to give you a quick update regarding our release timeline.",
        samplePhrases: [
          "Thank you for following up, Victoria. We are in the final stretch, though we encountered an item that needs attention.",
          "Hi Victoria, thanks for checking in. The core features are ready, but we have a crucial quality assurance update."
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Explain the technical reason for the delay clearly without panic', 
        completed: false,
        suggestedPhrase: "During our final regression testing this morning, our team discovered a rare edge-case bug in the payment gateway that requires 3 days of thorough verification.",
        samplePhrases: [
          "Our QA team identified an unexpected synchronization issue in staging that we need to resolve to ensure zero downtime.",
          "To safeguard customer data integrity, we need to run an additional security and load test before deploying to production."
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Propose a specific new deadline (next Tuesday) with assurance of quality', 
        completed: false,
        suggestedPhrase: "To ensure everything runs seamlessly, I would like to propose moving our deployment to next Tuesday at 2:00 PM. We will deliver a flawless release.",
        samplePhrases: [
          "Could we schedule the official rollout for next Tuesday afternoon? This gives us the buffer needed for comprehensive QA.",
          "I propose shifting the release window to next Tuesday, ensuring our users receive a stable and polished experience."
        ]
      }
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
      { 
        id: 'obj-1', 
        text: 'Express genuine gratitude and enthusiasm for the offer', 
        completed: false,
        suggestedPhrase: "Thank you so much for this offer, Marcus! I am genuinely thrilled about the team and the opportunity to drive impact here.",
        samplePhrases: [
          "I really appreciate the offer and kind words, Marcus. I am very excited about the prospect of joining the team.",
          "Thank you, Marcus. I thoroughly enjoyed meeting everyone and am eager to contribute to the company's vision."
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Provide market or experience-based rationale for a higher band ($125k)', 
        completed: false,
        suggestedPhrase: "Based on my 6 years of specialized experience in cross-platform architecture and current market benchmarks, I was targeting a base closer to $125,000.",
        samplePhrases: [
          "Given the leadership scope of this role and my proven track record of scaling revenue, I was hoping for $125,000.",
          "Considering the industry averages for this seniority level and my technical leadership skills, $125,000 feels more aligned."
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Maintain a courteous, collaborative tone leaving room for discussion', 
        completed: false,
        suggestedPhrase: "Is there flexibility within your compensation band, or perhaps through performance bonuses or equity, to reach that number?",
        samplePhrases: [
          "I would love to understand if there is room for flexibility in the total package so we can make this work smoothly.",
          "I am very motivated to reach an agreement that works well for both of us—is there room to explore this further?"
        ]
      }
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
      { 
        id: 'obj-1', 
        text: 'Validate their enthusiasm and objective (boosting revenue)', 
        completed: false,
        suggestedPhrase: "I completely appreciate your initiative, David, and I share your enthusiasm for maximizing our weekend campaign conversion numbers.",
        samplePhrases: [
          "I see great value in the goal of boosting our conversion rates for the weekend campaign.",
          "I really appreciate you proactively looking for ways to accelerate revenue and engagement."
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Highlight the risk of unverified payment gateway errors politely', 
        completed: false,
        suggestedPhrase: "However, deploying an unverified payment flow on short notice poses a major risk of transaction drop-offs and negative customer feedback.",
        samplePhrases: [
          "My main concern is that launching without end-to-end gateway testing could cause friction during live checkouts.",
          "If the checkout button encounters unexpected edge cases under load, it could jeopardize our user trust."
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Suggest a controlled A/B test or phased rollout instead', 
        completed: false,
        suggestedPhrase: "Could we consider doing a controlled 10% A/B test or phased rollout instead, so we can validate stability before opening it to all users?",
        samplePhrases: [
          "What if we conduct a staged canary rollout with real-time error tracking to balance speed and stability?",
          "Would you be open to running a phased release starting with a small segment of users on Monday?"
        ]
      }
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
      { 
        id: 'obj-1', 
        text: 'Start with a confident, polite opening greeting', 
        completed: false,
        suggestedPhrase: "Thank you, Sarah. It is a pleasure to meet you today, and I am delighted to share my professional journey with you.",
        samplePhrases: [
          "Thank you for having me, Sarah. I am very glad to be here and excited to discuss my background.",
          "Good morning Sarah, thank you for the opportunity. I have been looking forward to our conversation."
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Summarize 2-3 key accomplishments using strong action verbs', 
        completed: false,
        suggestedPhrase: "Over the past 5 years, I spearheaded international team expansion and optimized delivery pipelines, resulting in a 35% increase in operational efficiency.",
        samplePhrases: [
          "In my current role, I led cross-functional squads to successfully launch 3 enterprise products and boosted customer retention by 28%.",
          "I specialize in architecting scalable solutions and orchestrating cross-departmental initiatives with proven measurable impact."
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Tie your background directly into why you are excited for this position', 
        completed: false,
        suggestedPhrase: "I am particularly drawn to this role because your organization's emphasis on high-velocity innovation aligns directly with my core strengths.",
        samplePhrases: [
          "I see this position as the perfect opportunity to leverage my experience in global scaling while driving meaningful growth for your team.",
          "Your mission to empower international teams resonates deeply with me, and I am eager to contribute immediately."
        ]
      }
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
      { 
        id: 'obj-1', 
        text: 'Thank the host courteously for the invitation', 
        completed: false,
        suggestedPhrase: "Thank you so much for the gracious invitation, Antoine. The ambiance here is exceptional, and it is a true pleasure to join you tonight.",
        samplePhrases: [
          "It is wonderful to be here, Antoine. Thank you very much for hosting us this evening.",
          "Thank you for choosing such a fantastic venue, Antoine. I am honored to be here."
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Ask politely for their recommendation or state your preference with formal etiquette', 
        completed: false,
        suggestedPhrase: "I would appreciate your personal recommendation—what dish would you suggest starting with?",
        samplePhrases: [
          "Everything looks delightful. As you know the venue well, what would you recommend tonight?",
          "I am leaning towards the seafood selection, but I would love to hear your chef recommendation first."
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Initiate polite small talk regarding recent industry events', 
        completed: false,
        suggestedPhrase: "By the way, how was your experience at the European Tech Summit earlier this month? I heard the keynote was very insightful.",
        samplePhrases: [
          "On another note, how has your team been navigating the recent Q3 market shifts?",
          "Did you have a smooth journey traveling into the city this afternoon?"
        ]
      }
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
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(null);
  const [expandedObjectiveId, setExpandedObjectiveId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPhraseDrawer, setShowPhraseDrawer] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const toastTimeoutRef = useRef<any>(null);
  const { speak, isSpeaking } = useTTS();

  const filteredScenarios = CURATED_SCENARIOS.filter(
    (s) => categoryFilter === 'all' || s.category === categoryFilter
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleObjectiveState = (objId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setObjectives((prev) =>
      prev.map((o) => {
        if (o.id === objId) {
          const nextCompleted = !o.completed;
          return { ...o, completed: nextCompleted };
        }
        return o;
      })
    );
    setSelectedObjectiveId(objId);
  };

  const handleSelectSentence = (obj: RoleplayObjective, specificPhrase?: string, autoSend: boolean = false) => {
    const phrase = specificPhrase || obj.suggestedPhrase || obj.text;
    setInput(phrase);
    setSelectedObjectiveId(obj.id);
    showToast(`Selected: "${obj.text.slice(0, 32)}..." (Marked Yellow / In-Progress)`);

    if (autoSend) {
      handleSendResponse(phrase, obj.id);
    } else {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

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
    setSelectedObjectiveId(null);
    setExpandedObjectiveId(null);
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

  const handleSendResponse = async (textToSend?: string, targetObjId?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading || !activeScenario) return;

    // Immediately mark target objective as green if specified or if selected
    const activeObjId = targetObjId || selectedObjectiveId;
    if (activeObjId) {
      setObjectives((prev) =>
        prev.map((o) => (o.id === activeObjId ? { ...o, completed: true } : o))
      );
    }

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
            completed: obj.completed || data.completedObjectiveIds.includes(obj.id) || obj.id === activeObjId
          }))
        );
      } else {
        // Fallback progress
        setObjectives((prev) => {
          if (activeObjId) {
            return prev.map((o) => (o.id === activeObjId ? { ...o, completed: true } : o));
          }
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
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold border border-amber-200">
                      Yellow = Active
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                      Green = Done ({objectives.filter(o => o.completed).length}/{objectives.length})
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  Click any circle to toggle or choose a sentence to reply in yellow, then send to turn green:
                </p>

                <div className="space-y-2.5 pt-1">
                  {objectives.map((obj) => {
                    const isSelected = selectedObjectiveId === obj.id;
                    const isExpanded = expandedObjectiveId === obj.id;
                    return (
                      <div
                        key={obj.id}
                        className={`rounded-2xl border-2 transition-all text-xs overflow-hidden ${
                          obj.completed
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium ring-2 ring-emerald-400/30 shadow-xs'
                            : isSelected
                            ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-300 shadow-md'
                            : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800 hover:border-amber-300 shadow-2xs'
                        }`}
                      >
                        {/* Main Objective Card Click Area */}
                        <div 
                          onClick={() => handleSelectSentence(obj)}
                          className="p-3 cursor-pointer flex items-start gap-2.5 transition-colors"
                          title="Click to select this sentence (turns Yellow) or send it (turns Green)"
                        >
                          {/* Interactive Toggle Circle */}
                          <div 
                            onClick={(e) => toggleObjectiveState(obj.id, e)}
                            className="mt-0.5 shrink-0 cursor-pointer p-0.5 rounded-full hover:bg-neutral-100 transition-colors"
                            title={obj.completed ? "Click to uncheck" : "Click to mark done in Green"}
                          >
                            {obj.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                            ) : isSelected ? (
                              <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center bg-amber-100 text-amber-800 animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                              </div>
                            ) : (
                              <Circle className="w-5 h-5 text-neutral-400 hover:text-amber-500 hover:border-amber-400" />
                            )}
                          </div>

                          <div className="flex-1 space-y-1.5">
                            <span className={`font-semibold leading-snug block ${obj.completed ? 'line-through text-emerald-900' : isSelected ? 'text-amber-950 font-bold' : 'text-neutral-900'}`}>
                              {obj.text}
                            </span>

                            {/* Action Buttons inside objective card */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectSentence(obj);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                  obj.completed
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : isSelected
                                    ? 'bg-amber-500 text-white shadow-xs'
                                    : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/60'
                                }`}
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>{obj.completed ? 'Completed (Green)' : isSelected ? 'Selected (Yellow)' : 'Select Answer'}</span>
                              </button>

                              {!obj.completed && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectSentence(obj, undefined, true);
                                  }}
                                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-xs cursor-pointer transition-all active:scale-95"
                                  title="Send this response now and mark objective green"
                                >
                                  <span>Send Answer (➔ Green)</span>
                                  <Send className="w-2.5 h-2.5" />
                                </button>
                              )}

                              {obj.samplePhrases && obj.samplePhrases.length > 0 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedObjectiveId(isExpanded ? null : obj.id);
                                  }}
                                  className="px-2 py-1 rounded-lg text-[11px] font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center gap-1 cursor-pointer transition-all"
                                >
                                  <span>{obj.samplePhrases.length} Variations</span>
                                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expandable Alternative Phrasings */}
                        {isExpanded && obj.samplePhrases && (
                          <div className="p-3 bg-neutral-50/90 border-t border-neutral-100 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                              Alternative Professional Phrasings (Click to choose & turn Yellow / Green):
                            </span>
                            {obj.samplePhrases.map((phrase, pIdx) => (
                              <div 
                                key={pIdx}
                                onClick={() => handleSelectSentence(obj, phrase)}
                                className="p-2 rounded-xl bg-white hover:bg-amber-50/70 border border-neutral-200/80 hover:border-amber-400 text-[11px] text-neutral-800 leading-snug cursor-pointer transition-all flex items-start justify-between gap-2 group"
                              >
                                <span>"{phrase}"</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectSentence(obj, phrase, true);
                                  }}
                                  className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs"
                                >
                                  Send ➔
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Toast / Notification pill */}
              {toastMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fade-in shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="leading-tight">{toastMessage}</span>
                </div>
              )}

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

            {/* Interactive Sentence & Objective Suggestion Drawer */}
            <div className="px-4 py-2.5 border-t border-neutral-200/80 bg-neutral-50/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-700">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quick Sentence Options:</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPhraseDrawer(!showPhraseDrawer)}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  {showPhraseDrawer ? 'Hide Sentences' : 'Show Sentences'}
                </button>
              </div>

              {showPhraseDrawer && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {objectives.map((obj, i) => (
                    <div
                      key={obj.id}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap shrink-0 shadow-2xs transition-all flex items-center gap-2 ${
                        obj.completed
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-500 ring-1 ring-emerald-400/40'
                          : selectedObjectiveId === obj.id
                          ? 'bg-amber-100 text-amber-950 border-amber-500 ring-2 ring-amber-400 font-bold'
                          : 'bg-white hover:bg-amber-50/60 border-neutral-200 text-neutral-800 hover:border-amber-300'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectSentence(obj)}
                        className="flex items-center gap-1.5 cursor-pointer"
                        title={obj.suggestedPhrase || obj.text}
                      >
                        {obj.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : selectedObjectiveId === obj.id ? (
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 animate-pulse" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        )}
                        <span>{obj.text.length > 28 ? `${obj.text.slice(0, 28)}...` : obj.text}</span>
                      </button>

                      {!obj.completed && (
                        <button
                          type="button"
                          onClick={() => handleSelectSentence(obj, undefined, true)}
                          className="px-1.5 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold cursor-pointer transition-all shadow-2xs"
                          title="Send now & complete in green"
                        >
                          Send ➔
                        </button>
                      )}
                    </div>
                  ))}

                  {activeScenario.starterSuggestions.map((sugg, i) => {
                    const isSelectedSugg = input === sugg;
                    return (
                      <div
                        key={`sugg-${i}`}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap shrink-0 shadow-2xs transition-all flex items-center gap-1.5 ${
                          isSelectedSugg
                            ? 'bg-amber-100 border-amber-400 text-amber-950 ring-2 ring-amber-300 font-bold'
                            : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setInput(sugg);
                            showToast("Loaded starter suggestion (Yellow)!");
                            setTimeout(() => inputRef.current?.focus(), 50);
                          }}
                          className="cursor-pointer"
                        >
                          "{sugg.length > 32 ? `${sugg.slice(0, 32)}...` : sugg}"
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendResponse(sugg)}
                          className="px-1.5 py-0.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold cursor-pointer"
                          title="Send this suggestion"
                        >
                          Send ➔
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

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
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isRecording ? 'Listening... Speak clearly...' : `Reply politely to ${activeScenario.partnerName}... (or click an objective sentence)`}
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
                  title="Send message"
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
