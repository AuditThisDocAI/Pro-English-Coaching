import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Mic, 
  Volume2, 
  Briefcase, 
  Mail, 
  Award, 
  Check, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Globe2, 
  Layers, 
  HelpCircle 
} from 'lucide-react';

interface LandingHeroProps {
  onStartPracticing: () => void;
  onOpenPricing: () => void;
  isPro: boolean;
  chatCount: number;
  maxChats: number;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartPracticing,
  onOpenPricing,
  isPro,
  chatCount,
  maxChats,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-emerald-50/60 via-white to-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          The AI English Coach for Global Professionals
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          Turn Broken English Into <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
            Fluent Workplace Confidence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Instant native phrasing, pronunciation audio, and why-it-works explanations for emails, job interviews, CVs, and team meetings.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <button
            onClick={onStartPracticing}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <MessageSquare className="w-5 h-5" />
            Start Practicing Live
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          
          <button
            onClick={onOpenPricing}
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold rounded-2xl border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <Zap className="w-4 h-4 text-emerald-600" />
            {isPro ? 'Pro Active ($20/mo)' : 'Get Unlimited ($20/mo)'}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-neutral-200/60 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">Voice Dictation</p>
              <p className="text-[11px] text-neutral-500">Hands-free practice</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">Native Audio</p>
              <p className="text-[11px] text-neutral-500">Natural pronunciation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">5 Job Fields</p>
              <p className="text-[11px] text-neutral-500">Tech, Health, Retail & more</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">{isPro ? 'Unlimited Plan' : `${maxChats - chatCount} Free Left`}</p>
              <p className="text-[11px] text-neutral-500">{isPro ? 'All features active' : 'Try 20 chats free'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
            Simple 3-Step Process
          </h2>
          <p className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            How ProEnglish Coach Transforms Your English
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200/80 relative flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold text-lg flex items-center justify-center mb-6 shadow-md shadow-emerald-600/20">
              1
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Speak or Type Casually
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1">
              Type your raw thoughts or use the Web Speech microphone button to dictate naturally in your conversational English.
            </p>
            <div className="bg-white p-3 rounded-xl border border-neutral-200/60 text-xs text-neutral-500 italic">
              "sorry for late reply i was busy with bug"
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200/80 relative flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-bold text-lg flex items-center justify-center mb-6 shadow-md shadow-teal-600/20">
              2
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Instant AI Transformation
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1">
              Gemini AI restructures grammar, vocabulary, and workplace tone while breaking down the exact reason why the new phrasing sounds superior.
            </p>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200/60 text-xs text-emerald-800 font-medium">
              "Thank you for your patience; I was addressing a critical production issue."
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200/80 relative flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white font-bold text-lg flex items-center justify-center mb-6 shadow-md shadow-emerald-700/20">
              3
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Listen & Practice Pronunciation
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1">
              Tap the audio button to hear native cadence and stress, practice follow-up interview questions, or copy directly to email and chat.
            </p>
            <div className="bg-white p-3 rounded-xl border border-neutral-200/60 text-xs text-neutral-700 flex items-center justify-between">
              <span>🔊 Listen at 0.95x speed</span>
              <span className="text-emerald-600 font-semibold">Copy & Send</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-neutral-50 border-t border-b border-neutral-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
            Tailored For Work
          </h2>
          <p className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Specialized Modes for Every Career Scenario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-1">Email Polisher</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Transform awkward requests and apologies into polite, executive-ready emails for managers and clients.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-1">Job Interview Prep</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Frame your past experiences, strengths, and weaknesses with structured STAR answers that impress hiring managers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-1">CV & Resume Builder</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Convert passive tasks into action-verb bullet points with measurable impact for LinkedIn and resumes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-1">Industry Specialization</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Select between Tech, Healthcare, Retail, Call Center, and Admin to match vocabulary and idioms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PricingSectionProps {
  onSelectPro: () => void;
  isPro: boolean;
  chatCount: number;
  maxChats: number;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPro,
  isPro,
  chatCount,
  maxChats,
}) => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
            Simple, Transparent Pricing
          </h2>
          <p className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Start Free, Upgrade for Unlimited Growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200 flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Free Trial
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-neutral-900">$0</span>
                <span className="text-xs text-neutral-500">/ 20 free chats</span>
              </div>
              <p className="text-xs text-neutral-600 mt-2">
                Try out the AI coach with no credit card required.
              </p>
            </div>

            <div className="my-4 p-3 bg-white rounded-2xl border border-neutral-200 text-xs">
              <div className="flex justify-between font-semibold text-neutral-800 mb-1.5">
                <span>Free Sessions Used:</span>
                <span className={chatCount >= maxChats ? 'text-red-600' : 'text-emerald-600'}>
                  {chatCount} / {maxChats}
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${chatCount >= maxChats ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (chatCount / maxChats) * 100)}%` }}
                />
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-700 mb-8 flex-1">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>20 free coaching sessions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Web Speech voice dictation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Text-to-speech pronunciation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Access all 4 practice modes</span>
              </div>
            </div>

            <div className="w-full py-3.5 px-4 bg-neutral-200 text-neutral-600 text-center font-semibold rounded-xl text-sm">
              {chatCount >= maxChats ? 'Limit Reached' : 'Active Free Tier'}
            </div>
          </div>

          {/* Pro Tier ($20/month) */}
          <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white rounded-3xl p-8 border border-neutral-800 shadow-xl relative flex flex-col">
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-emerald-500 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-sm">
              Most Popular
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Pro Unlimited
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-white">$20</span>
                <span className="text-xs text-neutral-400">/ month</span>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Everything you need to master workplace communication.
              </p>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 mb-8 flex-1 pt-4">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Unlimited AI Practice Chats</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All 5 Industry Specializations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Voice-to-Text & Native Audio Playback</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Save Unlimited Phrases to Vault</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Google Chat Direct Integration</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cancel Debit Order Anytime with 1 Click</span>
              </div>
            </div>

            <button
              onClick={onSelectPro}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              {isPro ? 'Manage Active Pro & Debit Order' : 'Get Unlimited Pro for $20/mo'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: 'How does the 20-chat free limit work?',
      a: 'You get 20 full AI coaching sessions completely free to test out email polishing, interview prep, and voice dictation. Once you reach 20 sessions, you can upgrade to Unlimited Pro for just $20/month.'
    },
    {
      q: 'How do I cancel my debit order or recurring subscription?',
      a: 'You can cancel your subscription anytime with 1-click via the Freemius portal or from the link in your receipt email. There are zero cancellation fees or lock-ins, and future recurring charges stop immediately.'
    },
    {
      q: 'Does speaker audio and speech dictation work on mobile?',
      a: 'Yes! ProEnglish Coach features a mobile-optimized dual Text-to-Speech (TTS) audio engine and Speech Recognition that works seamlessly on iOS Safari, Chrome for Android, and tablets.'
    },
    {
      q: 'Which industries are supported?',
      a: 'We specialize in Tech & Engineering, Healthcare, Retail & Hospitality, Call Centers & Support, and Corporate Administration.'
    }
  ];

  return (
    <section className="py-16 bg-neutral-50 border-t border-neutral-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Got Questions? We've Got Answers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
              <h3 className="font-bold text-neutral-900 text-sm mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LandingFooter: React.FC<{ 
  onStartPracticing: () => void; 
  onOpenPricing: () => void;
  onOpenSupport?: () => void;
}> = ({
  onStartPracticing,
  onOpenPricing,
  onOpenSupport,
}) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 text-xs py-12 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              PE
            </div>
            <div>
              <p className="font-bold text-white text-sm">ProEnglish Coach</p>
              <p className="text-[11px] text-neutral-500">Global AI Tutor for Career Success</p>
            </div>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-5 text-xs">
            <button onClick={onStartPracticing} className="hover:text-white transition-colors cursor-pointer">
              Live Coach
            </button>
            <button onClick={onOpenPricing} className="hover:text-white transition-colors cursor-pointer">
              Pricing Plans
            </button>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#support" className="hover:text-emerald-400 font-semibold text-emerald-300 transition-colors flex items-center gap-1">
              <span>Support & Help</span>
            </a>
          </div>
        </div>

        {/* Legal & Compliance Links for Freemius Verification */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p className="max-w-xl text-center md:text-left leading-relaxed">
            Our order process is conducted by our online reseller Freemius. Freemius is the Merchant of Record for all our orders. Freemius provides customer service inquiries and handles returns.
          </p>
          <div className="flex items-center gap-4 text-neutral-400 flex-wrap justify-center">
            <a href="/terms" className="hover:text-white hover:underline transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
            <a href="/refund" className="hover:text-white hover:underline transition-colors">Refund & Cancellation</a>
            <a href="mailto:ProEnglishAICoach@protonmail.com" className="hover:text-white hover:underline transition-colors">Contact Support</a>
          </div>
        </div>

        <p className="text-[11px] text-neutral-600 text-center">
          © {new Date().getFullYear()} ProEnglish Coach. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
