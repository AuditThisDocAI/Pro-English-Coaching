import React, { useState, useEffect } from 'react';
import { Shield, Cookie, X, Check, Lock, ExternalLink, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CookiePreferences {
  essential: boolean; // always true
  functional: boolean; // audio preferences, language, streaks
  analytics: boolean;  // anonymous usage statistics
}

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: true,
    analytics: false,
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem('proenglish_cookie_consent');
      if (!consent) {
        // Show banner if not yet decided
        setIsVisible(true);
      } else {
        const parsed = JSON.parse(consent);
        setPreferences({
          essential: true,
          functional: parsed.functional ?? true,
          analytics: parsed.analytics ?? false,
        });
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
    };
    try {
      localStorage.setItem('proenglish_cookie_consent', JSON.stringify(fullConsent));
      localStorage.setItem('proenglish_cookie_consent_date', new Date().toISOString());
    } catch (e) {
      console.error(e);
    }
    setPreferences(fullConsent);
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleAcceptEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
    };
    try {
      localStorage.setItem('proenglish_cookie_consent', JSON.stringify(essentialOnly));
      localStorage.setItem('proenglish_cookie_consent_date', new Date().toISOString());
    } catch (e) {
      console.error(e);
    }
    setPreferences(essentialOnly);
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleSaveCustom = () => {
    try {
      localStorage.setItem('proenglish_cookie_consent', JSON.stringify(preferences));
      localStorage.setItem('proenglish_cookie_consent_date', new Date().toISOString());
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  if (!isVisible && !isSettingsOpen) return null;

  return (
    <>
      {/* Main Cookie Consent Banner */}
      {isVisible && !isSettingsOpen && (
        <aside 
          aria-label="Cookie and Privacy Consent"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-neutral-200/90 shadow-2xl shadow-neutral-900/15 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                  <span>Privacy & Cookie Choices</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    GDPR & CCPA Compliant
                  </span>
                </h4>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                We use cookies and secure local storage to remember your native language, save your learning progress, and support audio playback. <strong>We never sell your personal speech, inputs, or chat data to advertisers.</strong>
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-500">
                <Link to="/privacy" className="underline hover:text-indigo-600 font-medium">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link to="/terms" className="underline hover:text-indigo-600 font-medium">
                  Terms of Service
                </Link>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(true)}
                  className="hover:text-indigo-600 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Settings className="w-3 h-3" /> Customize
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="flex-1 sm:flex-initial px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Essential Only
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Cookie Customization Modal */}
      {isSettingsOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 border border-neutral-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 id="cookie-settings-title" className="text-base font-bold text-neutral-900">
                  Cookie & Privacy Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Customize how Pro English Coach uses cookies and local device storage. Essential cookies are required to deliver lessons, language selections, and secure sessions.
            </p>

            <div className="space-y-3">
              {/* Essential */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">Essential Learning Cookies</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-neutral-200 text-neutral-700">
                      Required
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Saves your chosen native language, audio speech synthesis settings, and secure login session.
                  </p>
                </div>
                <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 shrink-0">
                  <Check className="w-4 h-4" /> Active
                </div>
              </div>

              {/* Functional */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-neutral-900">Functional & Streak Progress</span>
                  <p className="text-[11px] text-neutral-500">
                    Remembers your practice XP points, daily streaks, and saved phrases across browser visits.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer shrink-0"
                />
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-neutral-900">Anonymous Learning Insights</span>
                  <p className="text-[11px] text-neutral-500">
                    Aggregated anonymous performance metrics that help us improve audio pronunciation speeds.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer shrink-0"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
              >
                Accept All Preferences
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Save Choices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
