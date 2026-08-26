import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { triggerProUpgradeConfetti } from '../lib/confetti';
import { auth } from '../lib/firebase';
import { syncUserProfile } from '../lib/firestoreService';

export const WelcomePage: React.FC = () => {
  useEffect(() => {
    triggerProUpgradeConfetti();
    const currentUser = auth.currentUser;
    const key = currentUser ? `proenglish_user_${currentUser.uid}_is_pro` : 'proenglish_guest_is_pro';
    localStorage.setItem(key, 'true');
    localStorage.setItem('proenglish_guest_is_pro', 'true');
    if (currentUser) {
      syncUserProfile(currentUser.uid, { isPro: true });
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden text-center"
      >
        <div className="bg-emerald-600 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Confetti / Sparkle background hint */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10 mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-white relative z-10">Welcome to Pro!</h1>
          <p className="text-emerald-100 text-xs font-semibold mt-1">3-Day Free Trial Activated</p>
        </div>
        
        <div className="p-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-4 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Charge During 3-Day Trial</span>
          </div>

          <h2 className="text-xl font-bold text-neutral-900 mb-2">Your 1000 sessions/month plan is active</h2>
          <p className="text-neutral-600 text-xs mb-8 leading-relaxed">
            Your account now has full access to 1000 AI coaching sessions, live voice-to-text dictation, pronunciation audio speed controls, and all industry modules.
          </p>

          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            Start Practicing Now
            <ArrowRight className="w-4 h-4 opacity-80" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

