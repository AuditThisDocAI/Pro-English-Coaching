import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  User as UserIcon,
  ShieldCheck,
  Flame
} from 'lucide-react';

interface PaywallOverlayProps {
  featureName?: string;
  onUpgrade: () => void;
  onOpenSignIn: () => void;
}

export const PaywallOverlay: React.FC<PaywallOverlayProps> = ({
  featureName = 'AI English Coaching Suite',
  onUpgrade,
  onOpenSignIn,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto my-6 p-6 sm:p-8 bg-white rounded-3xl border border-amber-200/90 shadow-xl overflow-hidden relative text-center"
    >
      {/* Background Decorative Accent */}
      <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-br from-indigo-200/40 to-teal-200/30 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-gradient-to-tr from-amber-200/40 to-orange-200/30 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-black uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5 text-amber-700" />
          <span>3-Day Free Trial Concluded</span>
        </div>

        {/* Heading */}
        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Unlock Full Access to {featureName}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Your 3-day complimentary trial has ended. Subscribe to Pro to continue practicing conversational and workplace English with instant AI feedback.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto py-2">
          {[
            'Unlimited 1-on-1 AI Chat Tutor & Voice Call',
            'Real-world Workplace & Interview Roleplays',
            'Instant Grammar & Formal Polish Feedback',
            'Sentence Card Hub & Spaced Repetition',
            '15+ Native Language Translation Support',
            'Multi-Device Cloud Sync & Progress History',
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Price & Primary CTA */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Pro Membership</div>
              <div className="text-2xl font-black text-neutral-900">$19.99 <span className="text-xs font-semibold text-neutral-500">/ month</span></div>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full">
              Cancel Anytime
            </span>
          </div>

          <button
            type="button"
            onClick={onUpgrade}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-teal-600 hover:opacity-95 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Subscribe to Pro ($19.99/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sign In & Guarantee Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={onOpenSignIn}
            className="font-bold text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Already have an account? Sign In</span>
          </button>
          
          <span className="hidden sm:inline text-neutral-300">•</span>

          <div className="flex items-center gap-1 text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure 256-bit SSL encrypted checkout</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
