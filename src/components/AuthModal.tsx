import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  LogOut, 
  Bookmark, 
  Zap, 
  User as UserIcon,
  Languages,
  CreditCard,
  Ban,
  ExternalLink,
  Check
} from 'lucide-react';
import { User } from 'firebase/auth';
import { signInWithGoogle, logout } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  isPro: boolean;
  savedPhrasesCount: number;
  nativeLanguage: string;
  onCancelSubscription?: () => void;
  onOpenPaymentModal?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  isPro,
  savedPhrasesCount,
  nativeLanguage,
  onCancelSubscription,
  onOpenPaymentModal,
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [cancelSuccessMessage, setCancelSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
      const res = await signInWithGoogle();
      if (res?.user) {
        onClose();
      }
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        return;
      }
      if (err?.code === 'auth/popup-blocked') {
        setError('Sign-in popup was blocked by your browser. Please allow popups for this page and try again.');
      } else {
        console.error('Sign-in error:', err);
        setError(err?.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      onClose();
    } catch (err: any) {
      console.error('Sign-out error:', err);
      setError('Failed to sign out. Please try again.');
    }
  };

  const handleConfirmCancelDebitOrder = () => {
    if (onCancelSubscription) {
      onCancelSubscription();
    }
    setShowCancelConfirmation(false);
    setCancelSuccessMessage('Debit order stopped. No future charges will be billed.');
    setTimeout(() => {
      setCancelSuccessMessage(null);
    }, 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md max-h-[95vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="shrink-0 bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-5 sm:p-7 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors cursor-pointer z-10"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-2.5 pr-8">
              <ShieldCheck className="w-3.5 h-3.5" />
              Firebase Account & Billing
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white mb-1 pr-8">
              {currentUser ? 'Your ProEnglish Profile' : 'Sign in to ProEnglish'}
            </h2>
            <p className="text-emerald-100 text-xs leading-relaxed">
              {currentUser 
                ? 'Manage your cloud library, preferences, and active subscription.' 
                : 'Sign in with Google to sync your saved phrases, preferences, and progress across all devices.'}
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>{error}</div>
              </div>
            )}

            {cancelSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>{cancelSuccessMessage}</div>
              </div>
            )}

            {currentUser ? (
              <div className="space-y-4">
                {/* User Profile Card */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-3.5">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'User'} 
                      className="w-12 h-12 rounded-full border border-emerald-300 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                      {currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-neutral-900 truncate">
                      {currentUser.displayName || 'ProEnglish Member'}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono truncate">
                      {currentUser.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Connected
                      </span>
                      {isPro ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Zap className="w-3 h-3 fill-amber-600 text-amber-600" />
                          Pro Unlimited
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-600 bg-neutral-200/80 px-2 py-0.5 rounded-full">
                          Free Plan
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Details & Cloud Sync */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2.5">
                    <Bookmark className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-bold text-neutral-900">{savedPhrasesCount} Saved</div>
                      <div className="text-[10px] text-neutral-500">Cloud Synced</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2.5">
                    <Languages className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-neutral-900 truncate">{nativeLanguage}</div>
                      <div className="text-[10px] text-neutral-500">Native Translation</div>
                    </div>
                  </div>
                </div>

                {/* Subscription & Debit Order Card */}
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-neutral-900">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span>Billing & Debit Order</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      isPro ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {isPro ? '$20 / month' : 'No active debit order'}
                    </span>
                  </div>

                  {isPro ? (
                    <div>
                      {showCancelConfirmation ? (
                        <div className="p-3 bg-red-50 rounded-xl border border-red-200 space-y-2 mt-2">
                          <div className="font-bold text-red-900 text-xs flex items-center gap-1.5">
                            <Ban className="w-3.5 h-3.5 text-red-600" />
                            <span>Stop Monthly Debit Order?</span>
                          </div>
                          <p className="text-[11px] text-red-800/90 leading-tight">
                            Your recurring payment will be cancelled immediately with zero penalties.
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={handleConfirmCancelDebitOrder}
                              className="flex-1 py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                            >
                              Confirm Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowCancelConfirmation(false)}
                              className="py-1.5 px-3 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium cursor-pointer"
                            >
                              Keep Pro
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-neutral-500">Continuous access active</span>
                          <button
                            type="button"
                            onClick={() => setShowCancelConfirmation(true)}
                            className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Ban className="w-3 h-3" />
                            <span>Cancel Debit Order</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-neutral-500">Need unlimited coaching?</span>
                      {onOpenPaymentModal && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenPaymentModal();
                          }}
                          className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                          <span>Upgrade $20/mo</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Sign Out Button */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full py-3 px-4 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-neutral-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2 text-xs text-neutral-600">
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-time cloud backup of all saved phrases</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Cross-device synchronization for mobile & desktop</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Manage billing and debit orders anytime</span>
                  </div>
                </div>

                {/* Google Sign-in Button */}
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSigningIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in with Google...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Secure Authentication powered by Firebase</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
