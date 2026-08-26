import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WelcomePage: React.FC = () => {
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
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Your subscription is active</h2>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            Thank you for upgrading. Your account has been instantly credited with unlimited AI coaching, native voice dictation, and all premium features.
          </p>

          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl font-bold transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Start Practicing
            <ArrowRight className="w-4 h-4 opacity-70" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
