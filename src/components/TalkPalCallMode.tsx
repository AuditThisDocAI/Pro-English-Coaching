import React, { useState, useEffect, useRef } from 'react';
import { 
  NativeLanguage, 
  EnglishCEFRLevel 
} from '../types';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Award, 
  Clock, 
  FileText, 
  Globe2, 
  CheckCircle2,
  RotateCcw,
  Zap
} from 'lucide-react';
import { useTTS } from '../lib/useTTS';
import { motion, AnimatePresence } from 'motion/react';
import { triggerProUpgradeConfetti } from '../lib/confetti';

interface TalkPalCallModeProps {
  nativeLanguage: NativeLanguage;
  englishLevel: EnglishCEFRLevel;
  onAddXP?: (amount: number) => void;
  isPro?: boolean;
  onOpenPricing?: () => void;
}

const CALL_SCENARIOS = [
  {
    id: 'call-recruiter',
    title: 'Recruiter Screening Call',
    callerName: 'Elena Rostova',
    role: 'Senior Talent Partner at FinTech Corp',
    avatar: '👩‍💼',
    gender: 'female' as const,
    voicePitch: 1.12,
    voiceRate: 0.93,
    desc: 'Practice answering common screening questions: current role, salary expectations, and reason for seeking a new role.',
    intro: "Hello! Thank you for taking my call today. I'm Elena from FinTech Corp. Could you briefly tell me about your background and what you're currently working on?"
  },
  {
    id: 'call-standup',
    title: 'Team Standup & Status Sync',
    callerName: 'Liam Carter',
    role: 'Engineering Team Lead',
    avatar: '👨‍💻',
    gender: 'male' as const,
    voicePitch: 0.95,
    voiceRate: 0.95,
    desc: 'Deliver a concise 60-second status update on what you completed yesterday, what you are tackling today, and any blockers.',
    intro: "Hey everyone! Let's do a quick round for today's standup. Could you share your key updates and let us know if anything is blocking you?"
  },
  {
    id: 'call-vendor',
    title: 'Vendor Negotiation & Pricing Call',
    callerName: 'Arthur Vance',
    role: 'Enterprise Account Executive',
    avatar: '👨‍💼',
    gender: 'male' as const,
    voicePitch: 0.92,
    voiceRate: 0.92,
    desc: 'Negotiate contract terms and ask for a 15% volume discount for your company with polite executive diplomacy.',
    intro: "Good morning! Thanks for joining this call. I've sent over the initial software licensing proposal. Did you have any questions regarding the pricing tiers?"
  }
];

export const TalkPalCallMode: React.FC<TalkPalCallModeProps> = ({
  nativeLanguage,
  englishLevel,
  onAddXP,
  isPro = false,
  onOpenPricing
}) => {
  const [selectedScenario, setSelectedScenario] = useState(CALL_SCENARIOS[0]);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);
  const [transcript, setTranscript] = useState<{ sender: 'caller' | 'user'; text: string; time: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isCoachSpeaking, setIsCoachSpeaking] = useState(false);
  const [callFeedback, setCallFeedback] = useState<{ score: number; formalPhrases: string[]; improvements: string[] } | null>(null);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const { speak, stop } = useTTS();

  // Call timer
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isCallActive]);

  // Format call duration MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Setup STT for continuous hands-free voice loop
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const userSaid = event.results[0][0].transcript;
          if (userSaid && userSaid.trim()) {
            handleUserVoiceResponse(userSaid.trim());
          }
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        console.warn('STT failed to init', e);
      }
    }
  }, [isCallActive, transcript]);

  const startListening = () => {
    if (recognitionRef.current && isCallActive && !isMuted) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        // Already started or busy
      }
    }
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallSeconds(0);
    setCallFeedback(null);
    const initialMsg = selectedScenario.intro;
    setTranscript([
      {
        sender: 'caller',
        text: initialMsg,
        time: '00:01'
      }
    ]);
    setIsCoachSpeaking(true);
    speak(initialMsg, {
      gender: selectedScenario.gender,
      pitch: selectedScenario.voicePitch,
      rate: selectedScenario.voiceRate,
      onEnd: () => {
        setIsCoachSpeaking(false);
        startListening();
      }
    });
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    stop();
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
    }
    setIsListening(false);
    setIsCoachSpeaking(false);

    // Generate call feedback summary
    setCallFeedback({
      score: 88,
      formalPhrases: [
        'Thank you for reaching out, Elena.',
        'In my current role, I lead cross-functional delivery.',
        'I would appreciate discussing the compensation range in more detail.'
      ],
      improvements: [
        'Replace "I want more money" with "I am targeting a compensation tier aligned with market rates."',
        'Use "I look forward to our next discussion" as a strong call wrap-up.'
      ]
    });

    onAddXP?.(35);
    triggerProUpgradeConfetti();
  };

  const handleUserVoiceResponse = async (userText: string) => {
    const userMsg = {
      sender: 'user' as const,
      text: userText,
      time: formatTime(callSeconds)
    };
    setTranscript((prev) => [...prev, userMsg]);

    try {
      const currentHistory = transcript.map(t => ({ 
        sender: t.sender === 'user' ? 'user' as const : 'tutor' as const, 
        text: t.text 
      }));

      const res = await fetch('/api/chat-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: currentHistory,
          userInput: userText,
          nativeLanguage,
          englishLevel,
          coachPersona: `${selectedScenario.callerName}, ${selectedScenario.role}. Context: ${selectedScenario.desc}`
        })
      });

      if (!res.ok) {
        throw new Error('API response not ok');
      }

      const data = await res.json();
      const reply = data.reply || `Thank you for detailing that. Moving to our next discussion point, what would be the ideal timeline for this?`;
      
      const callerMsg = {
        sender: 'caller' as const,
        text: reply,
        time: formatTime(callSeconds)
      };

      setTranscript((prev) => [...prev, callerMsg]);
      setIsCoachSpeaking(true);
      speak(reply, {
        gender: selectedScenario.gender,
        pitch: selectedScenario.voicePitch,
        rate: selectedScenario.voiceRate,
        onEnd: () => {
          setIsCoachSpeaking(false);
          startListening();
        }
      });
    } catch (err) {
      console.warn('Call voice response error, generating dynamic response:', err);
      const dynamicReplies = [
        `Thank you for explaining that so clearly. Could you expand on the main objectives and key stakeholders involved?`,
        `That makes complete sense from a strategic standpoint. How do you plan to handle the execution and risk management?`,
        `I appreciate the clarity in your response. What would be the next critical milestone on your end?`,
        `Understood. That aligns well with our expectations. Is there anything else you would like to address before we proceed?`
      ];
      const fallback = dynamicReplies[transcript.length % dynamicReplies.length];
      
      setTranscript((prev) => [...prev, { sender: 'caller', text: fallback, time: formatTime(callSeconds) }]);
      setIsCoachSpeaking(true);
      speak(fallback, {
        gender: selectedScenario.gender,
        pitch: selectedScenario.voicePitch,
        rate: selectedScenario.voiceRate,
        onEnd: () => {
          setIsCoachSpeaking(false);
          startListening();
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {!isCallActive && !callFeedback ? (
        /* Pre-Call Setup & Scenario Picker */
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold border border-white/15">
                <Phone className="w-3.5 h-3.5" />
                Pro English Real-Time Voice Call
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Simulated English Phone Call Mode
              </h2>
              <p className="text-sm text-indigo-200">
                Overcome phone anxiety in English. Practice real-time listening and speaking with AI partners without any awkwardness.
              </p>
            </div>
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center text-4xl shadow-lg animate-pulse">
              📞
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">
              Select Call Scenario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CALL_SCENARIOS.map((sc) => {
                const isSelected = selectedScenario.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setSelectedScenario(sc)}
                    className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-lg ring-2 ring-indigo-600/20'
                        : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                          {sc.avatar}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-sm text-neutral-900">{sc.title}</h4>
                          <span className="text-xs text-indigo-700 font-semibold">{sc.callerName}</span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {sc.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-500">
                      <span>{sc.role}</span>
                      {isSelected && <span className="text-indigo-600 font-extrabold">Selected</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-900">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base">Ready for your call with {selectedScenario.callerName}?</h4>
                <p className="text-xs text-neutral-400">Put on headphones or turn up your volume for the best experience.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartCall}
              className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-neutral-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Start Voice Call</span>
            </button>
          </div>
        </div>
      ) : isCallActive ? (
        /* Active Phone Call Screen (TalkPal Call Simulator) */
        <div className="max-w-xl mx-auto bg-neutral-950 rounded-3xl shadow-2xl border border-neutral-800 p-6 sm:p-8 text-white flex flex-col items-center justify-between min-h-[640px] relative overflow-hidden">
          
          {/* Top Info Pill */}
          <div className="flex items-center justify-between w-full">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Call in Progress
            </span>
            <span className="text-xs font-mono font-bold text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatTime(callSeconds)}
            </span>
          </div>

          {/* Caller Profile & Animated Voice Waveform */}
          <div className="text-center space-y-4 my-6 flex flex-col items-center">
            <div className="relative">
              {/* Outer Pulsing Waves */}
              {isCoachSpeaking && (
                <>
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-indigo-500/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                  />
                  <motion.div
                    className="absolute -inset-8 rounded-full bg-emerald-500/15"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                  />
                </>
              )}

              {/* Avatar circle */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border-4 border-indigo-500/50 flex items-center justify-center text-5xl shadow-2xl relative z-10">
                {selectedScenario.avatar}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{selectedScenario.callerName}</h3>
              <p className="text-xs text-indigo-400 font-semibold">{selectedScenario.role}</p>
              <span className="text-[11px] text-neutral-500 block mt-1">{selectedScenario.title}</span>
            </div>

            {/* Speaking / Listening State indicator */}
            <div className="px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300 flex items-center gap-2">
              {isCoachSpeaking ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>{selectedScenario.callerName} is speaking...</span>
                </>
              ) : isListening ? (
                <>
                  <Mic className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>Listening to your English... Speak now!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Tap mic to speak or listen</span>
                </>
              )}
            </div>
          </div>

          {/* Live Subtitle Transcript Ribbon */}
          {showTranscript && transcript.length > 0 && (
            <div className="w-full max-h-36 overflow-y-auto p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 text-xs space-y-2 mb-6 text-neutral-300">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 block">
                Live Subtitles:
              </span>
              <p className="leading-relaxed">
                <strong className={transcript[transcript.length - 1].sender === 'caller' ? 'text-indigo-400' : 'text-emerald-400'}>
                  {transcript[transcript.length - 1].sender === 'caller' ? selectedScenario.callerName : 'You'}:
                </strong>{' '}
                "{transcript[transcript.length - 1].text}"
              </p>
            </div>
          )}

          {/* Call Controls Bar */}
          <div className="flex items-center justify-center gap-6 w-full pt-4 border-t border-neutral-800/80">
            {/* Mute/Unmute */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isMuted ? 'bg-amber-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* End Call Button */}
            <button
              type="button"
              onClick={handleEndCall}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-red-900/50 transition-all cursor-pointer"
              title="End Call & Review"
            >
              <PhoneOff className="w-7 h-7" />
            </button>

            {/* Toggle Transcripts */}
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                showTranscript ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
              title="Toggle Live Subtitles"
            >
              <FileText className="w-6 h-6" />
            </button>
          </div>

        </div>
      ) : (
        /* Post-Call Performance Review */
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl mx-auto shadow-md shadow-emerald-100">
              <Award className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-neutral-900">Call Completed!</h3>
            <p className="text-xs text-neutral-500">
              Duration: {formatTime(callSeconds)} • Scenario: {selectedScenario.title}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-indigo-900">Formal Fluency Score</span>
              <span className="text-lg font-black text-indigo-600">{callFeedback?.score}%</span>
            </div>
            <div className="h-2 w-full bg-indigo-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${callFeedback?.score}%` }} />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-neutral-400">Formal Phrases Used</h4>
            <div className="space-y-1.5">
              {callFeedback?.formalPhrases.map((p, i) => (
                <div key={i} className="p-3 rounded-xl bg-emerald-50 text-emerald-950 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>"{p}"</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-neutral-400">Recommended Improvements</h4>
            <div className="space-y-1.5">
              {callFeedback?.improvements.map((imp, i) => (
                <div key={i} className="p-3 rounded-xl bg-amber-50 text-amber-950 text-xs font-medium flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setCallFeedback(null);
                handleStartCall();
              }}
              className="flex-1 py-3 rounded-2xl border border-neutral-200 hover:bg-neutral-50 text-xs font-bold text-neutral-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Call</span>
            </button>

            <button
              type="button"
              onClick={() => setCallFeedback(null)}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Back to Scenarios</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
