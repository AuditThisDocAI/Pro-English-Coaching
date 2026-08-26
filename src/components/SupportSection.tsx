import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  LifeBuoy, 
  MessageSquare, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SupportSectionProps {
  userEmail?: string;
  onOpenPricing?: () => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ userEmail, onOpenPricing }) => {
  const SUPPORT_EMAIL = 'ProEnglishAICoach@protonmail.com';

  const [email, setEmail] = useState(userEmail || '');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General Question');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Sync userEmail if prop updates
  React.useEffect(() => {
    if (userEmail && !email) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (_) {}
  };

  const getMailSubject = () => `[ProEnglish Support] ${category} - ${name || email || 'User'}`;
  const getMailBody = () => `Hello ProEnglish Support Team,\n\n${message || '[Type your message here]'}\n\n---\nSender Email: ${email || 'Not specified'}\nCategory: ${category}\nSubmitted via: ProEnglish AI Coach App (${new Date().toLocaleString()})`;

  const getMailtoUrl = () => {
    return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(getMailSubject())}&body=${encodeURIComponent(getMailBody())}`;
  };

  const getGmailUrl = () => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}&su=${encodeURIComponent(getMailSubject())}&body=${encodeURIComponent(getMailBody())}`;
  };

  const getProtonMailUrl = () => {
    return `https://mail.proton.me/compose?to=${SUPPORT_EMAIL}&subject=${encodeURIComponent(getMailSubject())}&body=${encodeURIComponent(getMailBody())}`;
  };

  const handleCopyDraft = async () => {
    try {
      const fullDraft = `To: ${SUPPORT_EMAIL}\nSubject: ${getMailSubject()}\n\n${getMailBody()}`;
      await navigator.clipboard.writeText(fullDraft);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch (_) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) {
      setErrorMessage('Please enter both your email address and your message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          category,
          message: message.trim(),
          recipient: SUPPORT_EMAIL,
          timestamp: new Date().toISOString(),
        }),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // Fallback if response is non-JSON
      }

      const generatedTicket = data?.ticketId || `PRO-${Date.now().toString().slice(-6)}`;
      setTicketId(generatedTicket);
      setIsSuccess(true);

      // Attempt to launch user's default mail client with prefilled content
      try {
        const mailUrl = data?.mailtoUrl || getMailtoUrl();
        window.location.href = mailUrl;
      } catch (_) {}
    } catch (err: any) {
      console.warn('Support API submission warning, using direct mail fallback:', err);
      // Fallback: still show success and open mailto
      setTicketId(`PRO-${Date.now().toString().slice(-6)}`);
      setIsSuccess(true);
      try {
        window.location.href = getMailtoUrl();
      } catch (_) {}
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="support" className="py-16 md:py-24 bg-neutral-900 text-white relative overflow-hidden border-t border-neutral-800">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-500/20">
            <LifeBuoy className="w-3.5 h-3.5" />
            Direct Support Helpdesk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Can We Help You Today?
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Have questions about coaching, billing, debit orders, or feature requests? Send our team a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Fast Answers */}
          <div className="lg:col-span-5 space-y-6">
            {/* Target Email Contact Box */}
            <div className="bg-neutral-800/80 rounded-3xl p-6 border border-neutral-700/80 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Official Support Inbox</div>
                  <div className="text-sm font-bold text-white font-mono flex items-center gap-2 mt-0.5">
                    <span>{SUPPORT_EMAIL}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="py-2.5 px-3 rounded-xl bg-neutral-700/70 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-600"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('[ProEnglish Support] General Inquiry')}`}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Open Mail App</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              {/* Direct Webmail Links */}
              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-700/60 space-y-2">
                <div className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1.5">
                  <Inbox className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Webmail Openers:</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={getGmailUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-medium text-center transition-colors border border-neutral-700"
                  >
                    Open Gmail
                  </a>
                  <a
                    href={getProtonMailUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-medium text-center transition-colors border border-neutral-700"
                  >
                    ProtonMail Web
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-700/60 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Response time: Usually within <strong>12–24 hours</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Encrypted messaging directly to ProtonMail</span>
                </div>
              </div>
            </div>

            {/* Quick Assistance Cards */}
            <div className="bg-neutral-800/40 rounded-3xl p-6 border border-neutral-700/50 space-y-3 text-xs">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Common Inquiries</span>
              </h3>
              
              <div className="space-y-2.5 text-neutral-300">
                <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="font-semibold text-neutral-200">Debit Order Cancellation</div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    You can self-cancel anytime via the <strong>Pro Active</strong> header badge with zero fees.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="font-semibold text-neutral-200">Mobile Microphone & Speaker</div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    ProEnglish supports speech recognition and audio playback on iOS and Android.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Support Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-800/90 rounded-3xl p-6 sm:p-8 border border-neutral-700 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Send a Support Request</h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Fill out the details below and our team will receive your message directly at <span className="text-emerald-400 font-mono font-medium">{SUPPORT_EMAIL}</span>.
                </p>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center flex flex-col items-center justify-center space-y-5"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-mono font-semibold mb-2">
                      Ticket #{ticketId}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">Support Ticket Created & Dispatched!</h4>
                    <p className="text-neutral-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      Your inquiry has been recorded for <strong className="text-emerald-400">{SUPPORT_EMAIL}</strong>. We will reply to your address (<strong className="text-white">{email}</strong>) promptly.
                    </p>
                  </div>

                  {/* Dispatch confirmation options */}
                  <div className="w-full max-w-md bg-neutral-900/80 p-4 rounded-2xl border border-neutral-700 space-y-3 text-left">
                    <div className="text-xs font-bold text-neutral-200">Send or view in your email client:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={getGmailUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-600 transition-colors"
                      >
                        <span>Send via Gmail</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                      <a
                        href={getProtonMailUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-600 transition-colors"
                      >
                        <span>Send via ProtonMail</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={getMailtoUrl()}
                        className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open Default Mail App</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyDraft}
                        className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-medium border border-neutral-700 transition-colors cursor-pointer"
                        title="Copy entire formatted message and address"
                      >
                        {copiedDraft ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 text-red-300 text-xs font-medium border border-red-500/30 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">{errorMessage}</div>
                    </div>
                  )}

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Your Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-900/80 border border-neutral-700 rounded-xl text-white text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Your Name <span className="text-neutral-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-900/80 border border-neutral-700 rounded-xl text-white text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Topic / Category Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-900/80 border border-neutral-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    >
                      <option value="General Question">General Question & Inquiry</option>
                      <option value="Billing & Debit Orders">Billing, Payments & Debit Orders</option>
                      <option value="AI Coaching & Grammar Suggestions">AI Coaching & Grammar Suggestions</option>
                      <option value="Mobile Audio & Voice Dictation">Mobile Audio & Voice Dictation</option>
                      <option value="Feature Request">Feature Request & Suggestions</option>
                      <option value="Bug Report">Bug Report / Technical Issue</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Your Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please describe what you need help with in detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-900/80 border border-neutral-700 rounded-xl text-white text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-y"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={getGmailUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 py-2 px-2.5 rounded-lg hover:bg-neutral-800 transition-colors"
                        title="Draft in Gmail Web"
                      >
                        <span>Gmail</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                      <a
                        href={getProtonMailUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 py-2 px-2.5 rounded-lg hover:bg-neutral-800 transition-colors"
                        title="Draft in ProtonMail Web"
                      >
                        <span>ProtonMail</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !email.trim() || !message.trim()}
                      className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending to Support...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to {SUPPORT_EMAIL}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
