import React, { useState, useEffect, useMemo } from 'react';
import { 
  Target, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Check, 
  PlayCircle, 
  Loader2, 
  RefreshCcw, 
  Lock, 
  Download, 
  Sparkles, 
  Award,
  ArrowRight,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Flame,
  Plus,
  RotateCcw,
  Trophy,
  TrendingUp
} from 'lucide-react';
import { StudyPlanItem, UserProfile, SavedPhrase } from '../types';
import { categorizePhrase } from './GrammarAnalyticsDashboard';
import { loadReviewStats } from '../lib/flashcardService';
import jsPDF from 'jspdf';

interface StudyPlanDashboardProps {
  isPro: boolean;
  user: any;
  userProfile?: UserProfile | null;
  savedPhrases?: SavedPhrase[];
  onOpenPaywall: () => void;
  onOpenAuth: () => void;
  onStartLesson: (topic: string) => void;
  onUpdateDailyGoal?: (minutes: number) => void;
}

export function StudyPlanDashboard({ 
  isPro, 
  user, 
  userProfile, 
  savedPhrases = [], 
  onOpenPaywall, 
  onOpenAuth, 
  onStartLesson,
  onUpdateDailyGoal
}: StudyPlanDashboardProps) {
  const [planItems, setPlanItems] = useState<StudyPlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [error, setError] = useState('');

  // Daily Goal Minutes target (default 15 minutes)
  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    if (userProfile?.dailyGoalMinutes && userProfile.dailyGoalMinutes > 0) {
      return userProfile.dailyGoalMinutes;
    }
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proenglish_daily_goal_minutes');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    }
    return 15;
  });

  useEffect(() => {
    if (userProfile?.dailyGoalMinutes && userProfile.dailyGoalMinutes > 0) {
      setDailyGoal(userProfile.dailyGoalMinutes);
    }
  }, [userProfile?.dailyGoalMinutes]);

  // Today's date string for isolating daily activity
  const todayDateStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Storage key for today's study activity
  const todayActivityKey = useMemo(() => {
    return user ? `proenglish_study_activity_${user.uid}_${todayDateStr}` : `proenglish_study_activity_guest_${todayDateStr}`;
  }, [user, todayDateStr]);

  // Track roadmap lessons completed today & any additional logged practice minutes
  const [completedPlanIdsToday, setCompletedPlanIdsToday] = useState<string[]>([]);
  const [manualPracticeMinutes, setManualPracticeMinutes] = useState<number>(0);

  // Load saved activity for today
  useEffect(() => {
    try {
      const saved = localStorage.getItem(todayActivityKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.completedPlanIds)) {
            setCompletedPlanIdsToday(parsed.completedPlanIds);
          }
          if (typeof parsed.manualMinutes === 'number') {
            setManualPracticeMinutes(parsed.manualMinutes);
          }
          return;
        }
      }
    } catch {}

    // Fallback: If no activity record yet for today, but planItems already has completed items,
    // take current completed items so the user receives visual credit immediately
    if (planItems.length > 0) {
      const initialCompleted = planItems.filter(p => p.completed).map(p => p.id);
      if (initialCompleted.length > 0) {
        setCompletedPlanIdsToday(initialCompleted);
        try {
          localStorage.setItem(todayActivityKey, JSON.stringify({
            completedPlanIds: initialCompleted,
            manualMinutes: 0
          }));
        } catch {}
      }
    }
  }, [todayActivityKey, planItems.length]);

  const saveDailyActivity = (completedIds: string[], manualMins: number) => {
    try {
      localStorage.setItem(todayActivityKey, JSON.stringify({
        completedPlanIds: completedIds,
        manualMinutes: manualMins
      }));
    } catch {}
  };

  // Calculate minutes from completed roadmap lessons that belong to today's activity
  const roadmapMinutes = useMemo(() => {
    return planItems
      .filter(p => p.completed && completedPlanIdsToday.includes(p.id))
      .reduce((sum, item) => sum + (item.durationMins || 15), 0);
  }, [planItems, completedPlanIdsToday]);

  // Estimate active study minutes from flashcards reviewed today
  const flashcardReviewMinutes = useMemo(() => {
    try {
      const stats = loadReviewStats(user);
      if (stats.lastReviewDate === todayDateStr && stats.reviewedTodayCount > 0) {
        return Math.min(30, Math.ceil(stats.reviewedTodayCount * 0.4));
      }
      return 0;
    } catch {
      return 0;
    }
  }, [user, todayDateStr]);

  // Total active minutes practiced today
  const totalMinutesToday = roadmapMinutes + flashcardReviewMinutes + manualPracticeMinutes;

  // Circular progress calculations
  const circleRadius = 54;
  const circleStrokeWidth = 11;
  const circleCircumference = 2 * Math.PI * circleRadius; // ~339.29
  const progressRatio = Math.min(1, Math.max(0, totalMinutesToday / Math.max(1, dailyGoal)));
  const progressPercent = Math.min(100, Math.round((totalMinutesToday / Math.max(1, dailyGoal)) * 100));
  const strokeDashoffset = circleCircumference - (progressRatio * circleCircumference);
  const isGoalMet = totalMinutesToday >= dailyGoal;
  const remainingMinutes = Math.max(0, dailyGoal - totalMinutesToday);

  const handleSelectDailyGoal = (mins: number) => {
    setDailyGoal(mins);
    localStorage.setItem('proenglish_daily_goal_minutes', mins.toString());
    onUpdateDailyGoal?.(mins);
  };

  const handleAddManualMinutes = (mins: number) => {
    const updated = manualPracticeMinutes + mins;
    setManualPracticeMinutes(updated);
    saveDailyActivity(completedPlanIdsToday, updated);
  };

  const handleResetTodayActivity = () => {
    setManualPracticeMinutes(0);
    setCompletedPlanIdsToday([]);
    saveDailyActivity([], 0);
  };

  // Suggest the "Next Best Lesson" based on the user's most frequently missed grammar categories
  const nextBestLesson = useMemo(() => {
    const categoryCounts: Record<string, number> = {
      'Prepositions & Articles': 0,
      'Verb Tenses & Agreement': 0,
      'Tone & Workplace Polish': 0,
      'Vocabulary & Word Choice': 0
    };

    // Analyze saved phrases
    if (Array.isArray(savedPhrases)) {
      savedPhrases.forEach(p => {
        const cat = categorizePhrase(p);
        if (categoryCounts[cat] !== undefined) {
          categoryCounts[cat]++;
        }
      });
    }

    // Also analyze any stored quiz mistakes in localStorage
    try {
      const storedStats = localStorage.getItem('proenglish_quiz_grammar_stats');
      if (storedStats) {
        const parsed = JSON.parse(storedStats);
        if (typeof parsed === 'object') {
          Object.entries(parsed).forEach(([k, v]) => {
            if (categoryCounts[k] !== undefined && typeof v === 'number') {
              categoryCounts[k] += v;
            }
          });
        }
      }
    } catch {}

    // Find top missed category
    let topCategory = 'Prepositions & Articles';
    let maxErrors = 0;
    Object.entries(categoryCounts).forEach(([cat, count]) => {
      if (count > maxErrors) {
        maxErrors = count;
        topCategory = cat;
      }
    });

    const recommendations: Record<string, { topic: string; title: string; desc: string; tip: string }> = {
      'Prepositions & Articles': {
        topic: 'directions',
        title: 'Mastering Prepositions in Context (in, on, at, to)',
        desc: 'Focus on everyday directional and temporal phrases to eliminate awkward preposition slips.',
        tip: 'Remember: "at" is for precise points/times, "in" is for enclosed spaces/months, "on" is for surfaces/days.'
      },
      'Verb Tenses & Agreement': {
        topic: 'work_basics',
        title: 'Past Tense & Conversational Fluency Drills',
        desc: 'Seamlessly switch between what happened yesterday, what is happening now, and what will happen.',
        tip: 'Anchor stories to simple past verbs (went, saw, spoke) before adding complex explanations.'
      },
      'Tone & Workplace Polish': {
        topic: 'cafe',
        title: 'Diplomatic English & Courteous Modals',
        desc: 'Elevate casual phrases into warm, respectful English using "Could you please...", "Would you mind...", and "I would appreciate..."',
        tip: 'Softening requests builds instant rapport in both personal errands and professional teamwork.'
      },
      'Vocabulary & Word Choice': {
        topic: 'supermarket',
        title: 'Everyday Collocations & Natural Idiomatic Phrasing',
        desc: 'Learn words that naturally lock together so you stop translating word-for-word from your native tongue.',
        tip: 'Memorize words in pairs like "make a decision", "catch the bus", and "look forward to".'
      }
    };

    const rec = recommendations[topCategory] || recommendations['Prepositions & Articles'];
    return {
      category: topCategory,
      topic: rec.topic,
      title: rec.title,
      description: rec.desc,
      tip: rec.tip,
      mistakeCount: maxErrors,
      reason: maxErrors > 0 
        ? `Identified from ${maxErrors} saved practice phrases & quiz analytics in ${topCategory}.`
        : `Recommended high-yield lesson tailored to your ${userProfile?.englishLevel || 'A2'} level.`
    };
  }, [savedPhrases, userProfile]);

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
    // Paid users can generate up to 200 new plans
    if (isManual && !isPro) {
      onOpenPaywall();
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const count = isPro ? 200 : 3; // Pro gets 200, Free/Trial gets 3 days
      
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
      // local fallback supporting up to 200 items
      const fallback: StudyPlanItem[] = Array.from({ length: isPro ? 200 : 3 }).map((_, i) => ({
        id: `plan_${Date.now()}_${i + 1}`,
        dayNumber: i + 1,
        title: `Day ${i + 1}: Everyday English Mastery`,
        description: `Practice high-frequency vocabulary and practical spoken scenarios for day ${i + 1}.`,
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
    const targetItem = planItems.find(p => p.id === id);
    const willBeCompleted = !targetItem?.completed;
    const updated = planItems.map(p => p.id === id ? { ...p, completed: willBeCompleted } : p);
    setPlanItems(updated);
    const key = user ? `study_plan_${user.uid}` : 'study_plan_guest';
    localStorage.setItem(key, JSON.stringify(updated));

    // Update today's completed plan IDs and persist
    let newCompletedIds: string[];
    if (willBeCompleted) {
      newCompletedIds = Array.from(new Set([...completedPlanIdsToday, id]));
    } else {
      newCompletedIds = completedPlanIdsToday.filter(itemId => itemId !== id);
    }
    setCompletedPlanIdsToday(newCompletedIds);
    saveDailyActivity(newCompletedIds, manualPracticeMinutes);
  };

  const handleDownloadPdf = () => {
    if (planItems.length === 0) return;
    setIsExportingPdf(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 14;
      const contentWidth = pageWidth - margin * 2;

      // Header Banner
      doc.setFillColor(30, 27, 75); // Indigo 950
      doc.rect(0, 0, pageWidth, 36, 'F');

      // Accent Stripe
      doc.setFillColor(13, 148, 136); // Teal 600
      doc.rect(0, 36, pageWidth, 2.5, 'F');

      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(17);
      doc.text('English Coach - Personalized Study Plan', margin, 16);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(199, 210, 254);
      doc.text(
        `Learner Level: ${userProfile?.englishLevel || 'A2'}  •  Native Language: ${userProfile?.nativeLanguage || 'Spanish'}  •  Generated: ${new Date().toLocaleDateString()}`,
        margin,
        25
      );
      doc.text(
        `Total Days: ${planItems.length}  •  Completed: ${planItems.filter(p => p.completed).length}/${planItems.length} days  •  Daily Target: ${dailyGoal} mins (${totalMinutesToday}m today)`,
        margin,
        31
      );

      let y = 46;

      // Recommended Focus Card
      if (nextBestLesson) {
        doc.setFillColor(240, 253, 250);
        doc.setDrawColor(204, 251, 241);
        doc.roundedRect(margin, y, contentWidth, 22, 2.5, 2.5, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 118, 110);
        doc.text(`NEXT BEST LESSON: ${nextBestLesson.category.toUpperCase()}`, margin + 4, y + 6);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        doc.text(`${nextBestLesson.title} - ${nextBestLesson.description}`, margin + 4, y + 12);

        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        doc.text(nextBestLesson.reason, margin + 4, y + 17.5);

        y += 28;
      }

      // Roadmap Table Header
      doc.setFillColor(243, 244, 246);
      doc.rect(margin, y, contentWidth, 7.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(75, 85, 99);
      doc.text('DAY', margin + 3, y + 5);
      doc.text('STATUS', margin + 18, y + 5);
      doc.text('LESSON TITLE & DAILY OBJECTIVE', margin + 42, y + 5);
      doc.text('TIME', pageWidth - margin - 15, y + 5);
      y += 9.5;

      // Plan Items Table Rows
      planItems.forEach((item, index) => {
        if (y > pageHeight - 18) {
          doc.addPage();
          y = 16;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(156, 163, 175);
          doc.text(`English Coach Study Plan - Page ${doc.getNumberOfPages()}`, margin, y - 4);
        }

        const isEven = index % 2 === 0;
        if (isEven) {
          doc.setFillColor(249, 250, 251);
          doc.rect(margin, y - 1, contentWidth, 11.5, 'F');
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        doc.text(`Day ${item.dayNumber}`, margin + 3, y + 4);

        if (item.completed) {
          doc.setTextColor(16, 185, 129);
          doc.text('[X] Done', margin + 18, y + 4);
        } else {
          doc.setTextColor(156, 163, 175);
          doc.text('[  ] Open', margin + 18, y + 4);
        }

        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        const titleSafe = doc.splitTextToSize(item.title, contentWidth - 70)[0] || item.title;
        doc.text(titleSafe, margin + 42, y + 3.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        const descSafe = doc.splitTextToSize(item.description, contentWidth - 70)[0] || item.description;
        doc.text(descSafe, margin + 42, y + 8);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(217, 119, 6);
        doc.text(`${item.durationMins || 15}m`, pageWidth - margin - 14, y + 5);

        y += 12.5;
      });

      y = Math.min(y + 6, pageHeight - 10);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('English Coach • Study 15 minutes each day to unlock fluent spoken English.', margin, y);

      doc.save(`English-Coach-Study-Plan-${planItems.length}Days.pdf`);
    } catch (err) {
      console.error('Failed to export study plan to PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const [isExportingImage, setIsExportingImage] = useState(false);

  // Download Study Plan summary card as a clean PNG image
  const handleDownloadImage = () => {
    if (planItems.length === 0) return;
    setIsExportingImage(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 960;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark Indigo gradient background
      const grad = ctx.createLinearGradient(0, 0, 960, 600);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#090d16');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 600);

      // Accent Stripe
      const accent = ctx.createLinearGradient(0, 0, 960, 0);
      accent.addColorStop(0, '#14b8a6');
      accent.addColorStop(0.5, '#6366f1');
      accent.addColorStop(1, '#ec4899');
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, 960, 8);

      // Title & Subtitle
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('English Coach • Personalized Study Roadmap', 48, 60);

      ctx.font = '18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Learner Level: ${userProfile?.englishLevel || 'A2'}  •  Daily Target: ${dailyGoal}m (${totalMinutesToday}m today)  •  Roadmap: ${completedCount}/${planItems.length}`, 48, 95);

      // Progress bar box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(48, 120, 864, 16);
      ctx.fillStyle = '#14b8a6';
      ctx.fillRect(48, 120, Math.max(12, Math.floor(864 * (roadmapProgressPercent / 100))), 16);

      // Next Best Lesson Box
      if (nextBestLesson) {
        ctx.fillStyle = 'rgba(20, 184, 166, 0.15)';
        ctx.fillRect(48, 160, 864, 100);
        ctx.strokeStyle = '#14b8a6';
        ctx.lineWidth = 2;
        ctx.strokeRect(48, 160, 864, 100);

        ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#2dd4bf';
        ctx.fillText(`NEXT BEST LESSON: ${nextBestLesson.category.toUpperCase()}`, 68, 192);

        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(nextBestLesson.title, 68, 222);

        ctx.font = '16px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(nextBestLesson.description, 68, 246);
      }

      // First few roadmap days preview
      let y = nextBestLesson ? 290 : 170;
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#c7d2fe';
      ctx.fillText('UPCOMING DAILY LESSONS', 48, y);
      y += 24;

      planItems.slice(0, 4).forEach((item) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(48, y, 864, 48);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(48, y, 864, 48);

        ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = item.completed ? '#10b981' : '#38bdf8';
        ctx.fillText(`Day ${item.dayNumber} [${item.completed ? 'DONE' : 'OPEN'}]`, 64, y + 30);

        ctx.font = '17px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#f8fafc';
        const titleText = item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title;
        ctx.fillText(titleText, 210, y + 30);

        ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(`${item.durationMins || 15} mins`, 820, y + 30);

        y += 56;
      });

      // Footer
      ctx.font = 'italic 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText('ProEnglish AI Coach • Study 15 minutes daily to achieve conversational fluency', 48, 570);

      // Download PNG
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `EnglishCoach-StudyPlan-${planItems.length}Days.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (e) {
      console.error('Image export error:', e);
    } finally {
      setTimeout(() => setIsExportingImage(false), 800);
    }
  };

  const completedCount = planItems.filter(p => p.completed).length;
  const roadmapProgressPercent = planItems.length > 0 ? Math.round((completedCount / planItems.length) * 100) : 0;

  return (
    <div id="study-plan-dashboard" className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Hero Banner with Generation and Download Actions */}
      <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-800/60 relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Personalized AI Curriculum</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300 text-xs font-bold">
              {planItems.length} Days Roadmap
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2.5 text-white">
            <Target className="w-8 h-8 text-teal-400 shrink-0" />
            <span>Daily English Study Plan</span>
          </h1>

          <p className="text-indigo-200 text-sm leading-relaxed font-medium">
            Step-by-step 15-minute daily roadmaps tailored to your level and native language. 
            Download your printable PDF format or generate up to 200 new days anytime.
          </p>

          {/* Progress Mini Bar */}
          <div className="pt-2 flex items-center gap-3">
            <div className="flex-1 h-2.5 rounded-full bg-white/15 overflow-hidden max-w-xs">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500" 
                style={{ width: `${roadmapProgressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-teal-300">
              {completedCount}/{planItems.length} Completed ({roadmapProgressPercent}%)
            </span>
          </div>
        </div>
        
        {/* Actions Button Stack */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-2.5 w-full md:w-auto shrink-0 z-10">
          {/* Download PDF Button */}
          <button
            type="button"
            id="download-study-plan-pdf-btn"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf || planItems.length === 0}
            className="px-4 sm:px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-teal-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            title="Download study plan in formatted PDF"
          >
            {isExportingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Download PDF</span>
          </button>

          {/* Download PNG Image Button */}
          <button
            type="button"
            id="download-study-plan-image-btn"
            onClick={handleDownloadImage}
            disabled={isExportingImage || planItems.length === 0}
            className="px-4 sm:px-5 py-3 bg-indigo-700/80 hover:bg-indigo-600 text-white font-black text-sm rounded-2xl border border-indigo-400/40 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            title="Download study plan roadmap as PNG image"
          >
            {isExportingImage ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <ImageIcon className="w-4 h-4 text-teal-300" />
            )}
            <span>Save Image</span>
          </button>

          {/* Generate 200 New Plans Button */}
          <button
            type="button"
            id="generate-study-plan-btn"
            onClick={() => generateNewPlan(true)}
            disabled={loading}
            className="px-5 py-3 bg-white hover:bg-neutral-100 text-indigo-950 font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-indigo-900" />
            ) : (
              <>
                {isPro ? <RefreshCcw className="w-4 h-4 text-indigo-900" /> : <Lock className="w-4 h-4 text-amber-500" />}
                <span>Generate {isPro ? '200 New Days' : 'More Days'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Daily Goal Minutes Circular Progress Bar & Activity Tracker */}
      <div 
        id="daily-goal-circular-progress-card"
        className="bg-white rounded-3xl p-5 sm:p-7 border border-neutral-200/90 shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-6">
          
          {/* Left Column: Circular Progress Bar + Immediate Status */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 text-center sm:text-left flex-1">
            {/* The SVG Circular Progress Ring */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 144 144">
                <defs>
                  <linearGradient id="goalMetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="goalActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                {/* Background track circle */}
                <circle
                  cx="72"
                  cy="72"
                  r={circleRadius}
                  className="text-slate-100 stroke-current"
                  strokeWidth={circleStrokeWidth}
                  fill="transparent"
                />
                {/* Animated foreground progress circle */}
                <circle
                  cx="72"
                  cy="72"
                  r={circleRadius}
                  stroke={isGoalMet ? "url(#goalMetGrad)" : "url(#goalActiveGrad)"}
                  strokeWidth={circleStrokeWidth}
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              {/* Inside the Circle Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                {isGoalMet ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-0.5" />
                    <span className="text-3xl font-black text-neutral-900 leading-none">{totalMinutesToday}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 mt-1">Goal Met!</span>
                    <span className="text-[9px] font-semibold text-neutral-400">Target: {dailyGoal}m</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-black text-neutral-900 leading-none">{totalMinutesToday}</span>
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mt-0.5">/ {dailyGoal}m</span>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1">
                      {progressPercent}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Target Status & Motivational Message */}
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                  isGoalMet 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}>
                  <Target className="w-3.5 h-3.5" />
                  <span>Daily Target: {dailyGoal} Minutes</span>
                </span>
                {isGoalMet && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                    Target Met 🎉
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-neutral-900 leading-tight">
                {isGoalMet 
                  ? "🎉 Daily Study Goal Achieved!" 
                  : `${remainingMinutes} Minute${remainingMinutes === 1 ? '' : 's'} Remaining Today`}
              </h2>

              <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                {isGoalMet
                  ? `Fantastic consistency! You reached your ${dailyGoal}-minute target for today with ${totalMinutesToday} active study minutes logged.`
                  : `You've completed ${totalMinutesToday} of your ${dailyGoal} target minutes (${progressPercent}%). Complete today's recommended lesson or do a quick 5-minute practice to close the ring.`}
              </p>
            </div>
          </div>

          {/* Right Column: Goal Selector & Activity Breakdown & Quick Logging */}
          <div className="flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-neutral-200/80 pt-4 lg:pt-0 lg:pl-6 w-full lg:w-auto shrink-0">
            {/* 1. Target Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-neutral-700 uppercase tracking-wider">
                  Target Daily Minutes
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold">
                  {dailyGoal} min / day
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[10, 15, 20, 30].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    id={`select-daily-goal-${mins}m`}
                    onClick={() => handleSelectDailyGoal(mins)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      dailyGoal === mins
                        ? 'bg-indigo-600 text-white shadow-xs font-black'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Today's Activity Breakdown */}
            <div className="space-y-1.5 bg-neutral-50/80 rounded-2xl p-3 border border-neutral-200/60">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center justify-between">
                <span>Today's Activity Log</span>
                <span className="text-indigo-600 font-black">{totalMinutesToday} mins</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded-xl border border-neutral-200/60 shadow-2xs">
                  <span className="block text-sm font-black text-neutral-900">{roadmapMinutes}m</span>
                  <span className="text-[10px] text-neutral-500 font-medium">Roadmap</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-neutral-200/60 shadow-2xs">
                  <span className="block text-sm font-black text-neutral-900">{flashcardReviewMinutes}m</span>
                  <span className="text-[10px] text-neutral-500 font-medium">Flashcards</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-neutral-200/60 shadow-2xs">
                  <span className="block text-sm font-black text-neutral-900">{manualPracticeMinutes}m</span>
                  <span className="text-[10px] text-neutral-500 font-medium">Extra Drill</span>
                </div>
              </div>
            </div>

            {/* 3. Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="log-quick-5m-btn"
                onClick={() => handleAddManualMinutes(5)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                title="Log 5 minutes of listening, speaking, or reading"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+5m Quick</span>
              </button>
              <button
                type="button"
                id="log-quick-15m-btn"
                onClick={() => handleAddManualMinutes(15)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                title="Log 15 minutes of dedicated practice"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+15m Lesson</span>
              </button>
              {totalMinutesToday > 0 && (
                <button
                  type="button"
                  id="reset-today-activity-btn"
                  onClick={handleResetTodayActivity}
                  className="py-1.5 px-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  title="Reset today's logged test activity"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Suggested "Next Best Lesson" Card Based on Grammar Analytics */}
      {nextBestLesson && (
        <div 
          id="next-best-lesson-card"
          className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border-2 border-teal-200 shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        >
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Best Lesson</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white border border-teal-200 text-teal-800 text-xs font-bold">
                Category: {nextBestLesson.category}
              </span>
            </div>

            <h2 className="text-xl font-black text-neutral-900 leading-tight">
              {nextBestLesson.title}
            </h2>

            <p className="text-sm font-semibold text-neutral-700">
              {nextBestLesson.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-neutral-600 pt-1">
              <p className="text-teal-800 font-bold bg-white/70 px-2.5 py-1 rounded-lg border border-teal-100">
                💡 <strong>Coach Tip:</strong> {nextBestLesson.tip}
              </p>
              <span className="text-[11px] text-neutral-500 italic">
                {nextBestLesson.reason}
              </span>
            </div>
          </div>

          <button
            type="button"
            id="start-next-best-lesson-btn"
            onClick={() => onStartLesson(nextBestLesson.topic)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20 active:scale-95 transition-all cursor-pointer shrink-0 w-full md:w-auto"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Start Lesson Now</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Grid of Daily Lessons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {planItems.map((item) => (
          <div 
            key={item.id}
            id={`study-plan-card-${item.dayNumber}`}
            className={`p-5 rounded-2xl border-2 transition-all flex flex-col h-full bg-white ${
              item.completed 
                ? 'border-emerald-200 shadow-sm opacity-80 bg-emerald-50/20' 
                : 'border-neutral-200 shadow-md hover:border-indigo-300 hover:shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-lg uppercase tracking-wider">
                  Day {item.dayNumber}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/50">
                  <Clock className="w-3 h-3" />
                  {item.durationMins || 15}m
                </span>
              </div>
              <button 
                type="button"
                id={`toggle-complete-day-${item.dayNumber}`}
                onClick={() => toggleComplete(item.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  item.completed 
                    ? 'bg-emerald-500 text-white shadow-xs' 
                    : 'bg-neutral-100 text-neutral-400 hover:bg-indigo-100 hover:text-indigo-600'
                }`}
                title={item.completed ? 'Mark as incomplete' : 'Mark as completed'}
              >
                <Check className="w-4 h-4 font-bold" />
              </button>
            </div>
            
            <h3 className={`text-base font-extrabold mb-2 ${item.completed ? 'text-neutral-500 line-through decoration-emerald-500/50' : 'text-neutral-900'}`}>
              {item.title}
            </h3>
            
            <p className="text-sm text-neutral-600 font-medium mb-4 flex-1 leading-relaxed">
              {item.description}
            </p>
            
            <button
              type="button"
              id={`start-practice-day-${item.dayNumber}`}
              onClick={() => onStartLesson(item.topic)}
              disabled={item.completed}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                item.completed
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 shadow-2xs'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>{item.completed ? 'Completed' : 'Start Practice'}</span>
            </button>
          </div>
        ))}
      </div>
      
      {planItems.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-3xl border border-neutral-200 shadow-sm">
          <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-600 font-bold text-base">No study plan available yet.</p>
          <p className="text-neutral-400 text-sm mt-1">Click "Generate New Days" to create your customized daily schedule!</p>
        </div>
      )}
    </div>
  );
}
