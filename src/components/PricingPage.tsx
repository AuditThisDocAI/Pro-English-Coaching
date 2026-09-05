import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Sparkles, Shield, ArrowLeft, RefreshCw, Zap, Lock, Loader2, AlertTriangle, XCircle, Home } from 'lucide-react';
import { useFreemius } from '../context/FreemiusContext';
import { auth } from '../lib/firebase';
import { syncUserProfile } from '../lib/firestoreService';
import { triggerProUpgradeConfetti } from '../lib/confetti';
import { validateFreemiusConfig } from '../lib/freemius';
import { calculateTrialInfo } from '../lib/trialService';

export interface Tier {
  name: 'Subscription';
  description: string;
  features: string[];
  planId: string;
  highlight?: boolean;
  price: string;
}

export const TIERS: Tier[] = [
  {
    name: 'Subscription',
    description: 'Complete coaching suite with 1000 sessions per month, voice dictation, speaker speed controls, and all practice modules.',
    features: [
      '1000 AI coaching sessions per month',
      'Live speech-to-text voice dictation',
      'All everyday English AI practice modes',
      'Speakerphone pronunciation with custom speed controls',
      'Unlimited saved phrase vault',
      '3-day free trial included',
    ],
    highlight: true,
    price: '$19.99',
    planId: import.meta.env.VITE_FREEMIUS_PLAN_PRO || '62979',
  },
];

interface PricingPageProps {
  onSuccess?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { openCheckout } = useFreemius();
  const [isOpeningCheckout, setIsOpeningCheckout] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentUser = auth.currentUser;
  const isPro = typeof window !== 'undefined'
    ? localStorage.getItem(currentUser ? `proenglish_user_${currentUser.uid}_is_pro` : 'proenglish_guest_is_pro') === 'true'
    : false;
  const trialInfo = calculateTrialInfo(currentUser, isPro);

  const handleSubscribe = async (tier: Tier) => {
    // 1. Log button clicked
    console.log('[Freemius Trial] Button clicked');

    // 2. Clear any prior error
    setErrorMessage(null);

    // 3. Log checking configuration
    console.log('[Freemius Trial] Checking configuration');
    const validation = validateFreemiusConfig();

    if (!validation.isValid) {
      const errorText = `Missing required Freemius configuration: ${validation.missing.join(', ')}`;
      console.error('[Freemius Trial] Checkout error', errorText);
      setErrorMessage(errorText);
      return;
    }

    const currentUser = auth.currentUser;

    try {
      setIsOpeningCheckout(true);

      // 4. Log opening checkout
      console.log('[Freemius Trial] Opening checkout');

      await openCheckout({
        plan_id: validation.config.planProId,
        billing_cycle: 'monthly',
        trial: true,
        user_email: currentUser?.email || undefined,
        user_firstname: currentUser?.displayName?.split(' ')[0] || undefined,
        user_lastname: currentUser?.displayName?.split(' ').slice(1).join(' ') || undefined,
        afterOpen: () => {
          console.log('[Freemius Trial] Checkout opened successfully');
        },
        success: async () => {
          try {
            const user = auth.currentUser;
            const key = user ? `proenglish_user_${user.uid}_is_pro` : 'proenglish_guest_is_pro';
            localStorage.setItem(key, 'true');
            localStorage.setItem('proenglish_guest_is_pro', 'true');

            if (user) {
              await syncUserProfile(user.uid, { isPro: true });
            }

            triggerProUpgradeConfetti();

            if (onSuccess) {
              onSuccess();
            }

            navigate('/welcome?tier=pro&trial=3day');
          } catch (syncErr) {
            console.error('Failed to sync profile after successful checkout:', syncErr);
            navigate('/welcome?tier=pro&trial=3day');
          }
        },
        cancel: () => {
          console.log('Freemius checkout closed by user');
        },
      });

      console.log('[Freemius Trial] Checkout opened successfully');
    } catch (err: any) {
      const formattedError = err?.message || 'Failed to open Freemius checkout. Please check configuration.';
      console.error('[Freemius Trial] Checkout error', err);
      setErrorMessage(formattedError);
    } finally {
      setIsOpeningCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-neutral-200">
          <Link
            to="/"
            id="back-to-coach-top-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-neutral-300 hover:border-emerald-600 hover:bg-emerald-50/60 active:scale-95 text-xs sm:text-sm font-extrabold text-neutral-800 hover:text-emerald-800 transition-all shadow-2xs cursor-pointer min-h-[44px] w-fit"
            aria-label="Back to English Coach main app"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Back to English Coach</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold text-neutral-600 pl-1 sm:pl-0">
            <Link to="/terms" className="hover:text-emerald-700 hover:underline py-1">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-emerald-700 hover:underline py-1">
              Privacy
            </Link>
            <Link to="/refund" className="hover:text-emerald-700 hover:underline py-1">
              Refund Policy
            </Link>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto">
          {trialInfo.isTrialExpired && !isPro && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-center justify-center gap-3 shadow-xs animate-in fade-in duration-300">
              <Lock className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs sm:text-sm font-semibold">
                <span className="font-extrabold text-amber-900">Your 3-day free trial has expired.</span> Activate your subscription below to continue using English Coach.
              </div>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold mb-4 border border-emerald-200/60">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Risk-Free 3-Day Trial on Subscription Plan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Predictable, transparent coaching subscription
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            1000 AI coaching sessions per month with live speech-to-text dictation, pronunciation audio speed controls, and all practice modules.
          </p>
        </div>

        {/* Configuration Error Alert */}
        {errorMessage && (
          <div className="mt-6 max-w-lg mx-auto p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3 shadow-xs animate-in fade-in duration-200">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <p className="font-bold text-red-800">Checkout Error</p>
              <p className="mt-1 text-red-700 font-mono break-all leading-relaxed">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-700 p-1 rounded-lg hover:bg-red-100 transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Single Tier Representation */}
        <div className="mt-10 max-w-lg mx-auto">
          {TIERS.map((tier) => {
            return (
              <div
                key={tier.name}
                className="relative rounded-3xl bg-white flex flex-col justify-between transition-all duration-200 border-2 border-emerald-500 shadow-xl ring-4 ring-emerald-500/10"
              >
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    <Zap className="w-3 h-3 fill-white" /> Complete Coaching
                  </span>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-neutral-900">{tier.name}</h3>
                  </div>

                  <p className="mt-2 text-xs text-neutral-500 min-h-[34px] leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-neutral-900 tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">
                      /month
                    </span>
                  </div>

                  <div className="mt-1 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 3 days free, then {tier.price}/month
                  </div>

                  {/* Checkout Action Button */}
                  <button
                    id="freemius-3day-trial-btn"
                    type="button"
                    disabled={isOpeningCheckout}
                    onClick={() => handleSubscribe(tier)}
                    className="mt-6 w-full py-3.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg active:scale-[0.99]"
                  >
                    {isOpeningCheckout ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Opening secure checkout...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 fill-white" />
                        <span>Start Your 3-Day Free Trial</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Features Section */}
                <div className="p-7 pt-6 bg-neutral-50/80 rounded-b-3xl border-t border-neutral-100 flex-1">
                  <p className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider mb-4">
                    Included with {tier.name}:
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-neutral-600 leading-snug"
                      >
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee & Trust Badges */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900">3-Day Free Trial</h4>
            <p className="mt-1 text-xs text-neutral-500">
              Practice full features with zero risk. You won't be charged if you cancel within 3 days.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900">14-Day Guarantee</h4>
            <p className="mt-1 text-xs text-neutral-500">
              Full money-back refund guarantee if you aren't completely satisfied after your first charge.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900">Freemius MoR</h4>
            <p className="mt-1 text-xs text-neutral-500">
              Bank-grade 256-bit encrypted checkout. Manage or cancel subscriptions anytime via the Freemius portal.
            </p>
          </div>
        </div>

        {/* Mobile-Friendly Return to Coach CTA Button */}
        <div className="mt-8 pt-4 border-t border-neutral-200 sm:hidden">
          <button
            id="mobile-bottom-back-to-coach-btn"
            type="button"
            onClick={() => navigate('/')}
            className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
            aria-label="Back to English Coach main app"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Back to English Coach</span>
          </button>
        </div>

        {/* Merchant of Record & Legal Notice */}
        <div className="mt-12 pt-8 border-t border-neutral-200 text-center text-xs text-neutral-500 space-y-3">
          <p className="max-w-2xl mx-auto leading-relaxed">
            Our order process is conducted by our online reseller <strong>Freemius</strong>. Freemius is the Merchant of Record for all our orders. Freemius provides all customer service inquiries and handles returns.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-neutral-600 font-medium">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="hover:underline text-emerald-700 font-bold py-1 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to App
            </Link>
            <Link to="/terms" className="hover:underline hover:text-emerald-700 py-1">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline hover:text-emerald-700 py-1">
              Privacy Policy
            </Link>
            <Link to="/refund" className="hover:underline hover:text-emerald-700 py-1">
              Refund & Cancellation
            </Link>
            <a
              href="mailto:ProEnglishAICoach@protonmail.com"
              className="hover:underline hover:text-emerald-700 py-1"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
