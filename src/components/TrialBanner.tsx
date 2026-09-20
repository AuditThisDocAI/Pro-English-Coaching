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
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 px-4 sm:px-6 py-3 text-sm border-b border-amber-700/80 sticky top-[69px] sm:top-[73px] z-30 shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
            <span className="font-extrabold text-white text-sm sm:text-base">
              Your 3-Day Free Trial has expired.
            </span>
            <span className="text-amber-200 hidden md:inline text-sm font-medium">
              Pay to renew your 3-day trial with our Pro subscription ($16/month) to continue practicing.
            </span>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            {onOpenSignIn && (
              <button
                type="button"
                onClick={onOpenSignIn}
                className="px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 font-bold text-sm flex items-center gap-1.5 border border-amber-700/70 transition-all cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
            <button
              type="button"
              id="renew-trial-banner-btn"
              onClick={onUpgrade}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-black text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-amber-950" />
              <span>Renew 3-Day Trial ($16/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 text-emerald-100 px-4 sm:px-6 py-2.5 text-sm border-b border-emerald-800/80 sticky top-[69px] sm:top-[73px] z-30 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/90 text-white text-xs font-black uppercase tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            3-Day Free Trial
          </span>
          <span className="font-semibold text-emerald-100 text-sm">
            Full access unlocked • <strong className="text-white font-black">{trialInfo.formattedTimeRemaining}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-200/90">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Risk-free trial active</span>
          </div>
          {onOpenSignIn && (
            <button
              type="button"
              onClick={onOpenSignIn}
              className="text-xs sm:text-sm font-bold text-emerald-200 hover:text-white hover:underline cursor-pointer"
            >
              Sign In
            </button>
          )}
          <button
            type="button"
            id="lock-pro-plan-banner-btn"
            onClick={onUpgrade}
            className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 border border-white/20 transition-all shadow-xs cursor-pointer"
          >
            <span>Lock In Pro Plan</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
