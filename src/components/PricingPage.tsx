import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Shield, ArrowLeft, RefreshCw, Zap, Lock, Loader2, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useFreemius } from '../context/FreemiusContext';
import { auth } from '../lib/firebase';
import { syncUserProfile } from '../lib/firestoreService';
import { triggerProUpgradeConfetti } from '../lib/confetti';

export interface Tier {
  name: 'Pro';
  description: string;
  features: string[];
  planId: string;
  highlight?: boolean;
  price: string;
}

export const TIERS: Tier[] = [
  {
    name: 'Pro',
    description: 'Complete coaching suite with 1000 sessions per month, voice dictation, and all industry modules.',
    features: [
      '1000 AI coaching sessions per month',
      'Live speech-to-text voice dictation',
      'All 8 industry-specific AI modes',
      'Unlimited saved phrase vault',
      'Google Chat & Workspace webhook export',
      '3-day free trial included',
    ],
    highlight: true,
    price: '$19.99',
    planId: import.meta.env.VITE_FREEMIUS_PLAN_PRO || 'plan_pro_id',
  },
];

interface PricingPageProps {
  onSuccess?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { isConfigured, openCheckout } = useFreemius();
  const [isOpeningCheckout, setIsOpeningCheckout] = useState<string | null>(null);
  const [showTrialModal, setShowTrialModal] = useState<boolean>(false);
  const [isActivatingTrial, setIsActivatingTrial] = useState<boolean>(false);

  const activateTrialDirectly = async () => {
    try {
      setIsActivatingTrial(true);
      const currentUser = auth.currentUser;
      
      // Save locally
      const key = currentUser ? `proenglish_user_${currentUser.uid}_is_pro` : 'proenglish_guest_is_pro';
      localStorage.setItem(key, 'true');
      localStorage.setItem('proenglish_guest_is_pro', 'true');
      
      // Sync with Firestore if user is authenticated
      if (currentUser) {
        await syncUserProfile(currentUser.uid, { isPro: true });
      }
      
      triggerProUpgradeConfetti();
      
      if (onSuccess) {
        onSuccess();
      }
      
      navigate('/welcome?tier=pro&trial=3day');
    } catch (err) {
      console.error('Error activating trial:', err);
      navigate('/welcome?tier=pro&trial=3day');
    } finally {
      setIsActivatingTrial(false);
      setShowTrialModal(false);
    }
  };

  const handleSubscribe = async (tier: Tier) => {
    const currentUser = auth.currentUser;

    if (!isConfigured) {
      // If Freemius keys are not yet configured in environment variables, open the interactive 3-day trial activation modal
      setShowTrialModal(true);
      return;
    }

    try {
      setIsOpeningCheckout(tier.name);

      await openCheckout({
        plan_id: tier.planId,
        billing_cycle: 'monthly',
        trial: 'free',
        trial_days: 3,
        user_email: currentUser?.email || undefined,
        user_firstname: currentUser?.displayName?.split(' ')[0] || undefined,
        user_lastname: currentUser?.displayName?.split(' ').slice(1).join(' ') || undefined,
        success: () => {
          activateTrialDirectly();
        },
        cancel: () => {
          console.log('Freemius checkout cancelled');
        },
      });
    } catch (err: any) {
      console.warn('Freemius Overlay notice, launching trial activation modal:', err?.message || err);
      // Fallback seamlessly to trial modal so user is never blocked
      setShowTrialModal(true);
    } finally {
      setIsOpeningCheckout(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to ProEnglish AI Coach
          </a>
          <div className="flex items-center gap-4 text-xs font-semibold text-neutral-600">
            <a href="/terms" className="hover:text-emerald-700 hover:underline">
              Terms
            </a>
            <a href="/privacy" className="hover:text-emerald-700 hover:underline">
              Privacy
            </a>
            <a href="/refund" className="hover:text-emerald-700 hover:underline">
              Refund Policy
            </a>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold mb-4 border border-emerald-200/60">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Risk-Free 3-Day Trial on Pro Plan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Predictable, transparent coaching plans
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            1000 AI coaching sessions per month with live speech-to-text dictation, pronunciation audio speed controls, and all industry specializations.
          </p>
        </div>

        {/* Single Tier Representation */}
        <div className="mt-12 max-w-lg mx-auto">
          {TIERS.map((tier) => {
            const isCurrentSubmitting = isOpeningCheckout === tier.name;

            return (
              <div
                key={tier.name}
                className={`relative rounded-3xl bg-white flex flex-col justify-between transition-all duration-200 border-2 border-emerald-500 shadow-xl ring-4 ring-emerald-500/10`}
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
                    type="button"
                    disabled={isCurrentSubmitting}
                    onClick={() => handleSubscribe(tier)}
                    className={`mt-6 w-full py-3.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg active:scale-[0.99]`}
                  >
                    {isCurrentSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Opening Checkout...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 fill-white" />
                        <span>Start 3-Day Free Trial</span>
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

        {/* Merchant of Record & Legal Notice */}
        <div className="mt-12 pt-8 border-t border-neutral-200 text-center text-xs text-neutral-500 space-y-3">
          <p className="max-w-2xl mx-auto leading-relaxed">
            Our order process is conducted by our online reseller <strong>Freemius</strong>. Freemius is the Merchant of Record for all our orders. Freemius provides all customer service inquiries and handles returns.
          </p>
          <div className="flex justify-center gap-6 text-neutral-600 font-medium">
            <a href="/terms" className="hover:underline hover:text-emerald-700">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:underline hover:text-emerald-700">
              Privacy Policy
            </a>
            <a href="/refund" className="hover:underline hover:text-emerald-700">
              Refund & Cancellation
            </a>
            <a
              href="mailto:ProEnglishAICoach@protonmail.com"
              className="hover:underline hover:text-emerald-700"
            >
              Support
            </a>
          </div>
        </div>
      </div>

      {/* 3-Day Free Trial Activation Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-neutral-200">
            <button
              onClick={() => setShowTrialModal(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold text-neutral-900">
              Start Your 3-Day Free Trial
            </h3>
            <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
              Experience all premium coaching capabilities with zero risk. You will have full access to <strong>1000 AI sessions/month</strong>, live speech dictation, native audio speed controls, and all industry modules.
            </p>

            <div className="my-5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-950">
                <span>Trial Period:</span>
                <span className="text-emerald-700">3 Days Completely Free</span>
              </div>
              <div className="flex items-center justify-between font-bold text-emerald-950">
                <span>Price after 3 Days:</span>
                <span>$19.99 / month</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 pt-1 border-t border-emerald-200/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cancel anytime with 1-click in account settings or portal.</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isActivatingTrial}
              onClick={activateTrialDirectly}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg"
            >
              {isActivatingTrial ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Activating 3-Day Trial...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Activate 3-Day Free Trial Now</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowTrialModal(false)}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                Cancel and return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

