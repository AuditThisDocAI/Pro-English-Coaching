import React from 'react';
import { ArrowLeft, Shield, FileText, RefreshCw, Mail, ExternalLink, CheckCircle2, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const LegalHeader: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; iconBg: string; iconColor: string }> = ({
  title,
  subtitle,
  icon,
  iconBg,
  iconColor,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/terms', label: 'Terms of Service', icon: <FileText className="w-4 h-4" /> },
    { path: '/privacy', label: 'Privacy Policy', icon: <Shield className="w-4 h-4" /> },
    { path: '/refund', label: 'Refund Policy', icon: <RefreshCw className="w-4 h-4" /> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to ProEnglish AI Coach
        </Link>
        <Link
          to="/pricing"
          className="text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          View Plans & Pricing →
        </Link>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-neutral-100 p-1.5 rounded-2xl">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            (item.path === '/terms' && currentPath === '/terms-of-service') ||
            (item.path === '/privacy' && currentPath === '/privacy-policy') ||
            (item.path === '/refund' &&
              (currentPath === '/refund-policy' || currentPath === '/refunds'));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shadow-xs shrink-0`}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const LegalFooter: React.FC = () => {
  return (
    <div className="mt-12 pt-8 border-t border-neutral-100 space-y-6">
      {/* Merchant of Record Banner */}
      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Orders and billing are securely conducted by our online Merchant of Record,{' '}
            <strong>Freemius</strong>.
          </span>
        </div>
        <a
          href="https://freemius.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline shrink-0"
        >
          Customer Orders & Portal <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Support Contact */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-neutral-400" />
          <span>Questions or inquiries? Contact support at:</span>
          <a
            href="mailto:ProEnglishAICoach@protonmail.com"
            className="font-semibold text-emerald-700 hover:underline"
          >
            ProEnglishAICoach@protonmail.com
          </a>
        </div>
        <div>© 2026 ProEnglish AI Coach. All rights reserved.</div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200 shadow-sm">
        <LegalHeader
          title="Terms of Service"
          subtitle="Last updated: August 20, 2026 • Version 2.5"
          icon={<FileText className="w-6 h-6" />}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-700"
        />

        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed border-t border-neutral-100 pt-6">
          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using <strong>ProEnglish AI Coach</strong> (the "Service", "we", "us", or "our"), accessible via web and mobile browsers, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, together with our Privacy Policy and Refund Policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">2. Description of Educational Coaching Services</h2>
            <p>
              ProEnglish AI Coach is an interactive artificial intelligence platform providing English language training, workplace email tone rewrites, pronunciation feedback, grammar mistake pattern analytics, and professional vocabulary coaching for non-native English speakers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">3. User Accounts and Authentication</h2>
            <p>
              To save personalized phrases, access multi-device synchronization, or subscribe to premium coaching, you may sign in with your email or Google account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">4. Subscriptions, Free Trials, and Payments</h2>
            <p>
              ProEnglish AI Coach offers free tier practice sessions as well as paid monthly and annual recurring subscription plans (Starter, Pro, and Advanced):
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-neutral-600">
              <li>
                <strong>3-Day Free Trial:</strong> All paid plans include a 3-day free trial. You will not be charged if you cancel before the end of the 3-day trial period.
              </li>
              <li>
                <strong>Merchant of Record:</strong> Our order process is conducted by our online reseller <strong>Freemius</strong>. Freemius is the Merchant of Record for all our orders. Freemius provides order processing, payment verification, invoicing, and customer service inquiries.
              </li>
              <li>
                <strong>Automatic Renewal:</strong> Subscriptions automatically renew at the beginning of each billing cycle (monthly or annually) unless canceled prior to the renewal date.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">5. Cancellation and Money-Back Guarantee</h2>
            <p>
              You can cancel your subscription at any time with a single click in your Account settings, through your receipt email, or via the{' '}
              <a
                href="https://freemius.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold underline"
              >
                Freemius Customer Portal
              </a>
              . For full terms regarding refunds and trial terms, please review our{' '}
              <Link to="/refund" className="text-emerald-700 font-semibold underline">
                Refund Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">6. Intellectual Property & AI Generated Content</h2>
            <p>
              All software, UI design, coaching algorithms, and branding of ProEnglish AI Coach remain the exclusive property of ProEnglish Coach. You retain full ownership of your input texts, saved personal phrases, and customized email drafts generated through the platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">7. Limitation of Liability</h2>
            <p>
              The Service is provided on an "as-is" and "as-available" basis for educational and coaching purposes. We do not guarantee employment, academic certification, or specific business outcomes resulting from the use of our AI suggestions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">8. Contact Us</h2>
            <p>
              For legal inquiries regarding these Terms, please contact our support team at{' '}
              <a
                href="mailto:ProEnglishAICoach@protonmail.com"
                className="text-emerald-700 font-semibold"
              >
                ProEnglishAICoach@protonmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200 shadow-sm">
        <LegalHeader
          title="Privacy Policy"
          subtitle="Last updated: August 20, 2026 • GDPR & CCPA Compliant"
          icon={<Shield className="w-6 h-6" />}
          iconBg="bg-teal-100"
          iconColor="text-teal-700"
        />

        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed border-t border-neutral-100 pt-6">
          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">1. Overview and Commitment</h2>
            <p>
              At <strong>ProEnglish AI Coach</strong>, your privacy and data security are our top priorities. This Privacy Policy explains how we collect, store, process, and protect your information when using our web and mobile applications.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">2. Information We Collect</h2>
            <p>We collect only the information necessary to provide high-quality language coaching:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-neutral-600">
              <li>
                <strong>Account Information:</strong> Your email address, full name, and profile picture when authenticating via Firebase Google OAuth or Email.
              </li>
              <li>
                <strong>Learning Activity & Phrase Vault:</strong> User-saved coaching phrases, audio pronunciations, grammar mistake histories, and selected target industries.
              </li>
              <li>
                <strong>Payment & Invoicing Information:</strong> All payment transactions are processed directly by our Merchant of Record, <strong>Freemius</strong>. We never store or process raw credit card numbers or banking credentials on our servers.
              </li>
              <li>
                <strong>Technical Logs:</strong> Browser language preferences, device screen sizes, and anonymous performance analytics to optimize dual TTS audio synthesis.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">3. How We Use Your Data</h2>
            <p>Your data is used strictly for educational and service fulfillment purposes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600">
              <li>Generating real-time grammar corrections, translations, and pronunciation guides.</li>
              <li>Syncing your saved phrase vault across your desktop and mobile browsers.</li>
              <li>Processing subscription activations and free trial access through Freemius.</li>
              <li>Responding to customer support tickets submitted to ProEnglishAICoach@protonmail.com.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">4. AI Processing & Privacy Standards</h2>
            <p>
              Your conversational inputs and coaching prompts are transmitted securely via TLS 1.3 encryption to server-side AI endpoints solely for real-time analysis. We do not sell or rent your personal language inputs to third-party advertising networks.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">5. Data Retention & Deletion Rights (GDPR / CCPA)</h2>
            <p>
              You have the right to request access to, correction of, or permanent deletion of your account and saved phrase database at any time. Simply contact us at{' '}
              <a
                href="mailto:ProEnglishAICoach@protonmail.com"
                className="text-emerald-700 font-semibold"
              >
                ProEnglishAICoach@protonmail.com
              </a>{' '}
              and we will process your deletion request within 3 business days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">6. Security Measures</h2>
            <p>
              We implement enterprise-grade encryption (TLS 1.3 in transit and AES-256 at rest via Google Cloud / Firebase) to protect your account and learning data.
            </p>
          </section>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
};

export const RefundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200 shadow-sm">
        <LegalHeader
          title="Refund & Cancellation Policy"
          subtitle="Last updated: August 20, 2026 • 3-Day Trial + 14-Day Guarantee"
          icon={<RefreshCw className="w-6 h-6" />}
          iconBg="bg-amber-100"
          iconColor="text-amber-700"
        />

        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed border-t border-neutral-100 pt-6">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="font-bold">Our Guarantee:</strong> Try ProEnglish AI Coach risk-free with our <strong>3-day free trial</strong> and <strong>14-day money-back guarantee</strong> on all Pro subscriptions.
            </div>
          </div>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">1. 3-Day Free Trial Period</h2>
            <p>
              When you enroll in any paid subscription plan, your first 3 days are completely free. You can practice up to 1000 monthly coaching sessions, email rewrites, and pronunciation checks. If you cancel at any time during the first 3 days, your card will not be charged.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">2. 14-Day Money-Back Guarantee</h2>
            <p>
              If your trial converts to a paid subscription and you are not 100% satisfied with the coaching quality, you may request a full refund within <strong>14 days</strong> of your initial billing charge. No questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">3. How to Cancel Your Subscription</h2>
            <p>We provide multiple quick, self-service cancellation methods with zero lock-in contracts:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-neutral-600">
              <li>
                <strong>Self-Service via Freemius Portal:</strong> Visit{' '}
                <a
                  href="https://freemius.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-semibold underline"
                >
                  Freemius My Orders Portal
                </a>{' '}
                with your billing email to instantly manage or cancel recurring payments.
              </li>
              <li>
                <strong>Via Receipt Email:</strong> Click the "Manage Subscription" link located at the bottom of any Freemius receipt email.
              </li>
              <li>
                <strong>Email Support:</strong> Send an email to{' '}
                <a
                  href="mailto:ProEnglishAICoach@protonmail.com"
                  className="text-emerald-700 font-semibold"
                >
                  ProEnglishAICoach@protonmail.com
                </a>{' '}
                and our team will process your cancellation or refund within 24 hours.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">4. Access After Cancellation</h2>
            <p>
              When you cancel an active paid subscription, you will retain full Pro/Advanced access through the remaining days of your current paid billing period. After this date, your account will automatically revert to the Free tier, and no future recurring charges will occur.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 mb-2">5. Merchant of Record Inquiries</h2>
            <p>
              Freemius is our Merchant of Record and handles billing support, VAT/sales tax invoices, chargeback inquiries, and refund disbursements. You can manage your orders anytime at{' '}
              <a
                href="https://freemius.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold underline"
              >
                freemius.com
              </a>
              .
            </p>
          </section>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
};
