import React, { useState, useEffect } from 'react';
import { Target, Zap, Clock, CheckCircle2, ChevronRight, Check, PlayCircle, Loader2, RefreshCcw, Lock } from 'lucide-react';
import { StudyPlanItem, UserProfile } from '../types';

interface StudyPlanDashboardProps {
  isPro: boolean;
  user: any;
  userProfile?: UserProfile | null;
  onOpenPaywall: () => void;
  onOpenAuth: () => void;
  onStartLesson: (topic: string) => void;
}

export function StudyPlanDashboard({ isPro, user, userProfile, onOpenPaywall, onOpenAuth, onStartLesson }: StudyPlanDashboardProps) {
  const [planItems, setPlanItems] = useState<StudyPlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load from local storage or generate
  useEffect(() => {
    const key = user ? `study_plan_${user.uid}` : 'study_plan_guest';
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        setPlanItems(JSON.parse(cached));
      } catch(e) {}
    } else {
      generateNewPlan(false);
    }
  }, [user]);

  const generateNewPlan = async (isManual: boolean) => {
    // For prompt requirements: "auto generate 100 new study plans at a time for paying users"
    if (isManual && !isPro) {
      onOpenPaywall();
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const count = isPro ? 100 : 3; // Pro gets 100, Free/Trial gets 3 days
      
      const res = await fetch('/api/generate-study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          count, 
          nativeLanguage: userProfile?.nativeLanguage || 'Spanish',
          level: userProfile?.englishLevel || 'Beginner'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.plans) {
          setPlanItems(data.plans);
          const key = user ? `study_plan_${user.uid}` : 'study_plan_guest';
          localStorage.setItem(key, JSON.stringify(data.plans));
        }
      } else {
        throw new Error('Failed to generate plans');
      }
    } catch(err) {
      console.error(err);
      setError('Could not generate study plan at this time. Using local fallbacks...');
      // local fallback
      const fallback: StudyPlanItem[] = Array.from({length: isPro ? 100 : 3}).map((_, i) => ({
        id: `plan_${Date.now()}_${i}`,
        dayNumber: i + 1,
        title: `Day ${i + 1}: English Practice`,
        description: `Practice common vocabulary and everyday situations for day ${i + 1}.`,
        durationMins: 15,
        completed: false,
        topic: 'Everyday Life'
      }));
      setPlanItems(fallback);
      const key = user ? `study_plan_${user.uid}` : 'study_plan_guest';
      localStorage.setItem(key, JSON.stringify(fallback));
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = (id: string) => {
    const updated = planItems.map(p => p.id === id ? { ...p, completed: !p.completed } : p);
    setPlanItems(updated);
    const key = user ? `study_plan_${user.uid}` : 'study_plan_guest';
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-indigo-700/50">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2 flex items-center gap-2">
            <Target className="w-8 h-8 text-teal-400" />
            Your Personalized Study Plan
          </h1>
          <p className="text-indigo-200 text-sm font-medium max-w-xl">
            A customized daily roadmap to improve your English. Follow your plan to build confidence and fluency over time.
          </p>
        </div>
        
        <button
          onClick={() => generateNewPlan(true)}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-100 text-indigo-900 font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {isPro ? <RefreshCcw className="w-5 h-5" /> : <Lock className="w-5 h-5 text-amber-500" />}
              Generate {isPro ? '100 New Days' : 'More Days'}
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {planItems.map((item) => (
          <div 
            key={item.id}
            className={`p-5 rounded-2xl border-2 transition-all flex flex-col h-full bg-white ${
              item.completed 
                ? 'border-emerald-200 shadow-sm opacity-80' 
                : 'border-neutral-200 shadow-md hover:border-indigo-300 hover:shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2 py-1 bg-neutral-100 text-neutral-600 rounded-lg uppercase tracking-wider">
                  Day {item.dayNumber}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  <Clock className="w-3 h-3" />
                  {item.durationMins}m
                </span>
              </div>
              <button 
                onClick={() => toggleComplete(item.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  item.completed 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-neutral-100 text-neutral-400 hover:bg-indigo-100 hover:text-indigo-600'
                }`}
              >
                <Check className="w-4 h-4 font-bold" />
              </button>
            </div>
            
            <h3 className={`text-base font-extrabold mb-2 ${item.completed ? 'text-neutral-500 line-through decoration-emerald-500/50' : 'text-neutral-900'}`}>
              {item.title}
            </h3>
            
            <p className="text-sm text-neutral-600 font-medium mb-4 flex-1">
              {item.description}
            </p>
            
            <button
              onClick={() => onStartLesson(item.topic)}
              disabled={item.completed}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                item.completed
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              Start Practice
            </button>
          </div>
        ))}
      </div>
      
      {planItems.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-3xl border border-neutral-200 shadow-sm">
          <p className="text-neutral-500 font-medium">No study plan available. Generate one to get started!</p>
        </div>
      )}
    </div>
  );
}
