import React from 'react';
import { Sparkles, Clock, AlertTriangle, ArrowRight, Zap, CheckCircle2, User as UserIcon } from 'lucide-react';
import { TrialInfo } from '../lib/trialService';

interface TrialBannerProps {
  trialInfo: TrialInfo;
  onUpgrade: () => void;
  onOpenSignIn?: () => void;
}

export const TrialBanner: React.FC<TrialBannerProps> = ({ trialInfo, onUpgrade, onOpenSignIn }) => {
  if (trialInfo.isPro) {
    return null;
  }

  if (trialInfo.isTrialExpired) {
    return (
      <div className="bg-amber-900 text-amber-100 px-4 py-2.5 text-xs border-b border-amber-800/80 sticky top-[57px] z-30 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-semibold text-white">
              Your 3-Day Free Trial has expired.
            </span>
            <span className="text-amber-200 hidden md:inline">
              Upgrade to Pro ($19.99/month) to continue unlimited AI English practice, voice calls, and sentence cards.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onOpenSignIn && (
              <button
                type="button"
                onClick={onOpenSignIn}
                className="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-950/90 text-amber-200 font-bold text-xs flex items-center gap-1 border border-amber-700/60 transition-all cursor-pointer"
              >
                <UserIcon className="w-3 h-3" />
                <span>Sign In</span>
              </button>
            )}
            <button
              type="button"
              onClick={onUpgrade}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Upgrade Now ($19.99/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-900/90 text-emerald-100 px-4 py-2 text-xs border-b border-emerald-800/80 sticky top-[57px] z-30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-700/80 text-white text-[10px] font-extrabold uppercase tracking-wide">
            <Sparkles className="w-3 h-3 text-emerald-300" />
            3-Day Free Trial
          </span>
          <span className="font-medium text-emerald-50 text-[11px] sm:text-xs">
            Full access unlocked • <strong className="text-white font-bold">{trialInfo.formattedTimeRemaining}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero charge for 3 days</span>
          </div>
          {onOpenSignIn && (
            <button
              type="button"
              onClick={onOpenSignIn}
              className="text-[11px] font-bold text-emerald-200 hover:text-white hover:underline cursor-pointer"
            >
              Sign In
            </button>
          )}
          <button
            type="button"
            onClick={onUpgrade}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center gap-1 border border-white/20 transition-all cursor-pointer"
          >
            <span>Lock In Pro Plan</span>
            <ArrowRight className="w-3 h-3 text-emerald-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
