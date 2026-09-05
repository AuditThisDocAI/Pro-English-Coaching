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
  Mail,
  KeyRound,
  ArrowRight,
  Clock
} from 'lucide-react';
import { User } from 'firebase/auth';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, logout } from '../lib/firebase';
import { TrialInfo } from '../lib/trialService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  isPro: boolean;
  savedPhrasesCount: number;
  nativeLanguage: string;
  trialInfo?: TrialInfo;
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
  trialInfo,
  onCancelSubscription,
  onOpenPaymentModal,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningInGoogle, setIsSigningInGoogle] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [cancelSuccessMessage, setCancelSuccessMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsSigningInGoogle(true);
    setError(null);
    setSuccessMessage(null);
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
      setIsSigningInGoogle(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || (!password.trim() && authMode !== 'reset')) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (authMode === 'reset') {
        await resetPassword(email);
        setSuccessMessage('Password reset link sent! Check your inbox.');
        setIsSubmitting(false);
        return;
      }

      if (authMode === 'signup') {
        if (password.length < 6) {
          setError('Password should be at least 6 characters long.');
          setIsSubmitting(false);
          return;
        }
        await signUpWithEmail(email, password, displayName);
        onClose();
      } else {
        await signInWithEmail(email, password);
        onClose();
      }
    } catch (err: any) {
      console.error('Email auth error:', err);
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check your credentials.');
      } else if (err?.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (err?.code === 'auth/weak-password') {
        setError('Password is too weak. Please use at least 6 characters.');
      } else if (err?.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err?.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md max-h-[95vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="shrink-0 bg-gradient-to-br from-indigo-700 via-indigo-800 to-teal-700 text-white p-5 sm:p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors cursor-pointer z-10"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-2 pr-8">
              <ShieldCheck className="w-3.5 h-3.5" />
              English Coach Account
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 pr-8">
              {currentUser ? 'Your English Coach Profile' : 'Sign in to English Coach'}
            </h2>
            <p className="text-indigo-100 text-xs leading-relaxed">
              {currentUser 
                ? 'Manage your cloud saved phrases, trial status, and active subscription.' 
                : 'Sign in to access your 3-day free trial, sync saved phrases, and manage your account.'}
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>{error}</div>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>{successMessage}</div>
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
                      className="w-12 h-12 rounded-full border border-indigo-300 shadow-sm object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-base">
                      {currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-neutral-900 truncate">
                      {currentUser.displayName || 'Pro English Member'}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono truncate">
                      {currentUser.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Signed In
                      </span>
                      {isPro ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Zap className="w-3 h-3 fill-amber-600 text-amber-600" />
                          Pro Member
                        </span>
                      ) : trialInfo && !trialInfo.isTrialExpired ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          3-Day Trial Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                          Trial Expired
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
                    <Languages className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <div className="font-bold text-neutral-900 truncate">{nativeLanguage}</div>
                      <div className="text-[10px] text-neutral-500">Translations</div>
                    </div>
                  </div>
                </div>

                {/* 3-Day Trial Card if active */}
                {!isPro && trialInfo && (
                  <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    trialInfo.isTrialExpired 
                      ? 'bg-amber-50/90 border-amber-300 text-amber-900' 
                      : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  }`}>
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>3-Day Free Trial Status</span>
                      </span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-extrabold ${
                        trialInfo.isTrialExpired ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        {trialInfo.isTrialExpired ? 'Expired' : `${trialInfo.daysLeft} days left`}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-neutral-600">
                      {trialInfo.isTrialExpired 
                        ? 'Your 3-day free trial has expired. To continue using all AI coaching features, voice calls, and sentence cards, please subscribe to Pro.'
                        : `You have full unrestricted access to all features. Time remaining: ${trialInfo.formattedTimeRemaining}.`}
                    </p>
                    {trialInfo.isTrialExpired && onOpenPaymentModal && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenPaymentModal();
                        }}
                        className="w-full mt-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Upgrade to Pro ($19.99/mo)</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Subscription & Debit Order Card */}
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-neutral-900">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <span>Membership & Billing</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      isPro ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {isPro ? '$19.99 / month' : 'Free Trial'}
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
                      <span className="text-[11px] text-neutral-500">Pro plan ($19.99/mo):</span>
                      {onOpenPaymentModal && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenPaymentModal();
                          }}
                          className="text-[11px] font-bold text-indigo-700 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3 fill-indigo-600 text-indigo-600" />
                          <span>Get Unlimited Pro</span>
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
                {/* Google Sign-in Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningInGoogle}
                  className="w-full py-3 px-4 bg-white hover:bg-neutral-50 text-neutral-800 font-bold rounded-2xl text-xs sm:text-sm border border-neutral-300 shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSigningInGoogle ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-400 border-t-indigo-600 rounded-full animate-spin" />
                      <span>Connecting with Google...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-neutral-200" />
                  <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">or with email</span>
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>

                {/* Auth Mode Tabs */}
                <div className="flex rounded-xl bg-neutral-100 p-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signin'); setError(null); setSuccessMessage(null); }}
                    className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                      authMode === 'signin' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signup'); setError(null); setSuccessMessage(null); }}
                    className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                      authMode === 'signup' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-3">
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Your Name</label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="e.g. Alex Smith"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {authMode !== 'reset' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-neutral-700">Password</label>
                        {authMode === 'signin' && (
                          <button
                            type="button"
                            onClick={() => { setAuthMode('reset'); setError(null); }}
                            className="text-[11px] text-indigo-600 hover:underline font-semibold"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {authMode === 'signin' && 'Sign In with Email'}
                          {authMode === 'signup' && 'Create Account & Start 3-Day Trial'}
                          {authMode === 'reset' && 'Send Password Reset Link'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {authMode === 'reset' && (
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signin'); setError(null); }}
                      className="w-full text-center text-xs text-neutral-500 hover:text-indigo-600 font-semibold"
                    >
                      Back to Sign In
                    </button>
                  )}
                </form>

                <div className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>3 days of free unlimited AI practice</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cloud sync across mobile, tablet, and desktop</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
                  <Lock className="w-3 h-3 text-indigo-600" />
                  <span>Secure Firebase Authentication & 256-bit encryption</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

