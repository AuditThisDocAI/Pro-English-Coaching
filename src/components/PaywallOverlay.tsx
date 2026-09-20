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
      className="w-full max-w-3xl mx-auto my-8 p-8 sm:p-12 bg-white/95 backdrop-blur-xl rounded-3xl border border-amber-200/90 shadow-2xl overflow-hidden relative text-center"
    >
      {/* Background Decorative Ambient Gradient */}
      <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-200/50 to-teal-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-200/50 to-orange-200/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-950 border border-amber-300/80 text-sm font-black uppercase tracking-wider shadow-xs">
          <Lock className="w-4 h-4 text-amber-700" />
          <span>3-Day Free Trial Concluded</span>
        </div>

        {/* Heading & Subtext with larger typography */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            Unlock Full Access to {featureName}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
            Your 3-day complimentary trial has ended. To reactivate and renew your 3-day trial access, complete your subscription renewal ($16/month with 3-day trial period).
          </p>
        </div>

        {/* Price & Primary CTA */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs sm:text-sm text-neutral-500 font-extrabold uppercase tracking-wider">Subscription Renewal</div>
              <div className="text-3xl sm:text-4xl font-black text-neutral-900">$16 <span className="text-sm font-semibold text-neutral-500">/ month</span></div>
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-full">
              3-Day Trial Included
            </span>
          </div>

          <button
            type="button"
            id="paywall-renew-trial-btn"
            onClick={onUpgrade}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:opacity-95 active:scale-98 text-white font-black text-base sm:text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>Pay to Renew 3-Day Trial ($16/mo)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Sign In & Guarantee Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-sm text-neutral-600 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={onOpenSignIn}
            className="font-bold text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <UserIcon className="w-4 h-4" />
            <span>Already have an account? Sign In</span>
          </button>
          
          <span className="hidden sm:inline text-neutral-300">•</span>

          <div className="flex items-center gap-1.5 text-neutral-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure 256-bit SSL encrypted checkout</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
