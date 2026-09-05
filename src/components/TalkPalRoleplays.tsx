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
    title: 'Ordering at a Cozy Café',
    category: 'cafe_food',
    level: 'Beginner',
    partnerName: 'Emma Watson',
    partnerRole: 'Friendly Barista',
    partnerAvatar: '☕',
    partnerGender: 'female',
    description: 'You stepped into a lovely coffee shop on a sunny morning. Practice greeting Emma, ordering your favorite drink, and asking for the price politely.',
    initialMessage: "Good morning! Welcome to Sunbeam Café. What can I get started for you today?",
    objectives: [
      { 
        id: 'obj-1', 
        text: 'Say hello and order a coffee with your choice of milk', 
        completed: false,
        suggestedPhrase: "Good morning! Could I please have a medium latte with oat milk, to go?",
        samplePhrases: [
          "Hi! I would love a hot cappuccino with regular milk, please.",
          "Good morning! Can I get an iced Americano with a splash of milk?"
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Ask politely for a bakery snack or pastry recommendation', 
        completed: false,
        suggestedPhrase: "Do you have any fresh croissants or blueberry muffins available today?",
        samplePhrases: [
          "What kind of fresh pastries do you have this morning?",
          "Could you recommend a good snack to go with this coffee?"
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Ask how much it costs and if you can pay with card/contactless', 
        completed: false,
        suggestedPhrase: "How much is that in total, and can I tap to pay by card?",
        samplePhrases: [
          "What is the total, please? Can I pay with Apple Pay or contactless card?",
          "How much does that come to? I have a credit card ready."
        ]
      }
    ],
    starterSuggestions: [
      'Good morning! Could I please get a medium latte with oat milk?',
      'Do you have any fresh chocolate croissants today?',
      'How much is that in total? Can I pay by contactless card?'
    ]
  },
  {
    id: 'sc-2',
    title: 'Asking for Directions in the City',
    category: 'travel_directions',
    level: 'Beginner',
    partnerName: 'David Miller',
    partnerRole: 'Helpful Local Resident',
    partnerAvatar: '🗺️',
    partnerGender: 'male',
    description: 'You are visiting a new town and looking for the central train station. Practice stopping David politely, asking for directions, and thanking him.',
    initialMessage: "Hello there! You look like you might be looking for something. Can I help you find your way around town?",
    objectives: [
      { 
        id: 'obj-1', 
        text: 'Politely say hello and ask where the central train station is', 
        completed: false,
        suggestedPhrase: "Hi! Excuse me, could you please tell me how to get to the central train station from here?",
        samplePhrases: [
          "Hello! Pardon me, do you know the best way to walk to the train station?",
          "Good afternoon! I'm a bit lost—could you point me towards the train station?"
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Ask if it is within walking distance or if you should take a bus', 
        completed: false,
        suggestedPhrase: "Is it close enough to walk, or would you recommend taking a local bus?",
        samplePhrases: [
          "How many minutes does it take on foot? Is it far from here?",
          "Should I catch a bus at the corner, or is walking easy?"
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Thank him warmly and wish him a wonderful day', 
        completed: false,
        suggestedPhrase: "Thank you so much for your help! Have a wonderful day!",
        samplePhrases: [
          "That is very clear, thank you very much! Have a great afternoon!",
          "I really appreciate your kindness. Have a fantastic day!"
        ]
      }
    ],
    starterSuggestions: [
      'Excuse me, could you please tell me the way to the central train station?',
      'Is it within walking distance, or should I take a bus?',
      'Thank you so much for your help! Have a wonderful day!'
    ]
  },
  {
    id: 'sc-3',
    title: 'Checking into a Vacation Hotel',
    category: 'travel_directions',
    level: 'Beginner',
    partnerName: 'Sofia Martinez',
    partnerRole: 'Hotel Receptionist',
    partnerAvatar: '🏨',
    partnerGender: 'female',
    description: 'You just arrived at your hotel after a trip. Greet Sofia, provide your reservation name, ask about breakfast hours, and get the Wi-Fi code.',
    initialMessage: "Good afternoon! Welcome to the Grand Garden Hotel. Are you checking in with us today?",
    objectives: [
      { 
        id: 'obj-1', 
        text: 'Confirm you are checking in and give your reservation name', 
        completed: false,
        suggestedPhrase: "Yes, hello! I have a reservation under the name Maria Garcia for three nights.",
        samplePhrases: [
          "Good afternoon! Yes, checking in under Maria Garcia, please.",
          "Hi! I booked a room for three nights under the name Maria Garcia."
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Ask what time breakfast is served and where the dining room is', 
        completed: false,
        suggestedPhrase: "Could you please tell me what time breakfast is served in the morning?",
        samplePhrases: [
          "Is breakfast included, and what hours is the dining room open?",
          "What time does breakfast start tomorrow morning?"
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Ask for the Wi-Fi password for your room and thank her', 
        completed: false,
        suggestedPhrase: "Could I also get the Wi-Fi password for the room? Thank you so much!",
        samplePhrases: [
          "How do I connect to the hotel Wi-Fi? Thank you for your assistance!",
          "What is the network name and password for the Wi-Fi, please?"
        ]
      }
    ],
    starterSuggestions: [
      'Hello! Yes, I have a reservation under Maria Garcia for three nights.',
      'Could you please tell me what time breakfast is served in the morning?',
      'Could I also get the Wi-Fi password for our room? Thank you!'
    ]
  },
  {
    id: 'sc-4',
    title: 'Grocery Shopping & Asking for Items',
    category: 'daily_life',
    level: 'Beginner',
    partnerName: 'Lucas Brown',
    partnerRole: 'Supermarket Assistant',
    partnerAvatar: '🛒',
    partnerGender: 'male',
    description: 'You are shopping for dinner in an English supermarket. Ask Lucas where the fresh bakery section is and check for lactose-free milk.',
    initialMessage: "Hi there! Welcome to FreshMart. Can I help you find anything on your grocery list today?",
    objectives: [
      { 
        id: 'obj-1', 
        text: 'Say hello and ask which aisle has the fresh bread and bakery', 
        completed: false,
        suggestedPhrase: "Hi! Excuse me, could you please tell me which aisle has the fresh bread?",
        samplePhrases: [
          "Hello! Where can I find the bakery section with fresh bread?",
          "Hi there! Could you point me to where the loaves of bread are?"
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Ask if they have any oat milk or dairy-free options available', 
        completed: false,
        suggestedPhrase: "Do you happen to carry oat milk or lactose-free milk in the dairy aisle?",
        samplePhrases: [
          "Where would I find plant-based milk like oat milk or almond milk?",
          "Do you have dairy-free milk alternatives in stock?"
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Thank him with a smile and say have a good day', 
        completed: false,
        suggestedPhrase: "Thank you so much, that was very helpful! Have a great day!",
        samplePhrases: [
          "Thanks a lot for your help, Lucas! Have a good one!",
          "Perfect, I appreciate your assistance. Have a nice shift!"
        ]
      }
    ],
    starterSuggestions: [
      'Excuse me, which aisle has the fresh bread and bakery goods?',
      'Do you happen to carry oat milk or lactose-free milk?',
      'Thank you so much, that was very helpful! Have a great day!'
    ]
  },
  {
    id: 'sc-5',
    title: 'Meeting a Friendly Neighbor at the Park',
    category: 'daily_life',
    level: 'Beginner',
    partnerName: 'Maya Patel',
    partnerRole: 'Friendly Park Visitor',
    partnerAvatar: '🌳',
    partnerGender: 'female',
    description: 'You are taking a relaxing walk in the local park. Practice friendly casual small talk about the sunny weather, hobbies, and weekend plans.',
    initialMessage: "Hi there! It’s such a gorgeous sunny afternoon today, isn't it? Enjoying your walk?",
    objectives: [
      { 
        id: 'obj-1', 
        text: 'Agree enthusiastically about the nice weather and introduce yourself', 
        completed: false,
        suggestedPhrase: "Yes, it really is beautiful outside! My name is Alex, nice to meet you.",
        samplePhrases: [
          "It's lovely! I'm Alex. So nice to meet you on such a sunny day.",
          "Absolutely, the weather is wonderful today! By the way, I'm Alex."
        ]
      },
      { 
        id: 'obj-2', 
        text: 'Share a simple hobby or what you enjoy doing on weekends', 
        completed: false,
        suggestedPhrase: "I love coming out to the park to walk, read, and listen to music on weekends.",
        samplePhrases: [
          "In my free time, I really enjoy walking outdoors and drinking coffee.",
          "I love spending sunny afternoons outside with a good book."
        ]
      },
      { 
        id: 'obj-3', 
        text: 'Ask Maya what her favorite spots or activities in the neighborhood are', 
        completed: false,
        suggestedPhrase: "What are some of your favorite places to visit around this neighborhood?",
        samplePhrases: [
          "Do you know any cozy cafés or nice spots to visit nearby?",
          "How long have you lived around here? Do you have any favorite places?"
        ]
      }
    ],
    starterSuggestions: [
      'Yes, it really is a gorgeous day! My name is Alex, nice to meet you.',
      'I love walking in the park and enjoying the fresh air on weekends.',
      'What are some of your favorite cafés or places to visit around here?'
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
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'cafe_food' | 'travel_directions' | 'daily_life'>('all');
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
      const isDinner = activeScenario.title.toLowerCase().includes('dinner') || activeScenario.partnerName.includes('Antoine');
      const isSalary = activeScenario.title.toLowerCase().includes('salary') || activeScenario.partnerName.includes('Marcus');
      const isDeadline = activeScenario.title.toLowerCase().includes('deadline') || activeScenario.partnerName.includes('Victoria');
      
      let fallbackText = `I appreciate you detailing that. Let us proceed with these parameters and review the next milestones.`;
      let fallbackTrans = `Agradezco que hayas detallado eso. Avancemos con estos parámetros.`;

      if (isDinner) {
        fallbackText = `The chef's pan-seared sea bass is exceptional tonight, or the aged ribeye if you prefer meat. May I order a bottle of wine for our table?`;
        fallbackTrans = `El róbalo del chef está excepcional esta noche, o el filete si prefieres carne. ¿Puedo pedir vino para la mesa?`;
      } else if (isSalary) {
        fallbackText = `We genuinely appreciate your track record. Let me consult with the executive compensation committee to see how we can optimize your offer.`;
        fallbackTrans = `Apreciamos sinceramente tu trayectoria. Consultaré con el comité para optimizar la oferta.`;
      } else if (isDeadline) {
        fallbackText = `I understand the technical QA necessity. Let us reschedule the deployment for next Tuesday afternoon to guarantee stability.`;
        fallbackTrans = `Entiendo la necesidad técnica de control de calidad. Reprogramemos el despliegue para el próximo martes.`;
      }

      const fallbackPartner = {
        sender: 'tutor' as const,
        text: fallbackText,
        translation: fallbackTrans
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
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-800 to-indigo-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                Real-Life English Practice
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Everyday Real-Life Conversations
              </h2>
              <p className="text-sm text-emerald-100">
                Practice ordering at a café, asking for directions, hotel check-ins, grocery shopping, and making friends in safe, friendly conversations.
              </p>
            </div>
            <div className="absolute right-4 bottom-2 text-8xl opacity-15 select-none pointer-events-none">
              ☕
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Situations', count: CURATED_SCENARIOS.length },
              { id: 'cafe_food', label: '☕ Café & Food', count: CURATED_SCENARIOS.filter(s => s.category === 'cafe_food').length },
              { id: 'travel_directions', label: '🗺️ Directions & Travel', count: CURATED_SCENARIOS.filter(s => s.category === 'travel_directions').length },
              { id: 'daily_life', label: '🛒 Daily Errands & Friends', count: CURATED_SCENARIOS.filter(s => s.category === 'daily_life').length }
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
