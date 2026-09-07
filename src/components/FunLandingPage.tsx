import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ChevronDown, Mic, MessageSquare, Zap, 
  Check, ArrowRight, Star, Globe, Shield, Sparkles,
  Play, BookOpen, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface FunLandingPageProps {
  onOpenAuth: () => void;
  onExploreMode?: () => void;
}

export const FunLandingPage: React.FC<FunLandingPageProps> = ({ onOpenAuth, onExploreMode }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const faqs = [
    {
      q: "How does the AI coaching work?",
      a: "Our advanced AI models analyze your speech and text in real-time, providing immediate feedback on grammar, pronunciation, and professional tone."
    },
    {
      q: "Can I practice for specific scenarios?",
      a: "Yes. You can select from dozens of professional scenarios like job interviews, client presentations, and salary negotiations."
    },
    {
      q: "Is there a free trial available?",
      a: "Absolutely. We offer a generous free tier so you can experience the power of AI-driven language coaching before upgrading."
    },
    {
      q: "Does it support multiple native languages?",
      a: "We currently support translation and contextual feedback for over 16 native languages, helping you bridge the gap faster."
    }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-neutral-300 font-sans selection:bg-purple-500/30">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
        
        {/* Floating 3D Shape (CSS Simulated) */}
        <motion.div 
          animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[20%] w-64 h-64 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-[4rem] mix-blend-screen filter blur-[40px] opacity-40 pointer-events-none"
        />
        <motion.div 
          animate={{ y: [20, -20, 20], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] bottom-[20%] w-72 h-72 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-full mix-blend-screen filter blur-[50px] opacity-30 pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-neutral-300">English Coach AI 2.0 is live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter leading-[1.1] mb-8"
          >
            Master English.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Accelerate your career.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed"
          >
            The world-class AI tutor that adapts to your professional needs. Practice speaking, perfect your grammar, and roleplay real-world scenarios.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={onOpenAuth}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Start for free
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:scale-105 active:scale-95 transition-all backdrop-blur-md flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" /> See how it works
            </button>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY LOGOS */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-8">
            Trusted by professionals at top companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale">
            {/* Minimal CSS Logos */}
            <div className="text-2xl font-black font-serif tracking-tighter">Acme Corp</div>
            <div className="text-2xl font-extrabold tracking-widest flex items-center gap-1"><div className="w-6 h-6 rounded bg-white" /> NEXUS</div>
            <div className="text-2xl font-bold italic">GlobalTech</div>
            <div className="text-xl font-bold tracking-[0.3em]">INNOVATE</div>
            <div className="text-2xl font-black lowercase flex items-center gap-1"><Globe className="w-6 h-6" /> horizon</div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Designed for rapid fluency</h2>
          <p className="text-xl text-neutral-400">Everything you need to speak and write with absolute confidence in any professional setting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Mic className="w-6 h-6 text-purple-400" />,
              title: "Voice Conversations",
              desc: "Practice speaking naturally with an AI that listens, understands, and responds."
            },
            {
              icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
              title: "Scenario Roleplay",
              desc: "Nail your next interview or client pitch with hyper-realistic simulated conversations."
            },
            {
              icon: <Zap className="w-6 h-6 text-emerald-400" />,
              title: "Instant Corrections",
              desc: "Get real-time feedback on your grammar, vocabulary, and professional tone."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl hover:-translate-y-2 hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Bento 1: Large Visual */}
          <div className="md:col-span-2 md:row-span-2 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col group">
            <h3 className="text-3xl font-bold text-white mb-2">Immersive Studio</h3>
            <p className="text-neutral-400 mb-8 max-w-xs">Your personal sandbox for perfecting professional communication.</p>
            
            <div className="flex-1 w-full bg-neutral-900/80 rounded-t-2xl border-t border-x border-white/10 mt-auto relative shadow-2xl overflow-hidden group-hover:translate-y-2 transition-transform duration-500">
              <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2 bg-black/50">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 shrink-0" />
                  <div className="space-y-2 flex-1 pt-1">
                    <div className="h-3 w-1/3 bg-white/20 rounded-full" />
                    <div className="h-3 w-3/4 bg-white/10 rounded-full" />
                  </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 shrink-0" />
                  <div className="space-y-2 flex-1 pt-1 flex flex-col items-end">
                    <div className="h-3 w-1/4 bg-blue-500/40 rounded-full" />
                    <div className="h-3 w-2/3 bg-blue-500/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />
          </div>

          {/* Bento 2: Stats (Gradient) */}
          <div className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center relative overflow-hidden hover:border-white/20 transition-colors">
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2 tracking-tighter">
              98%
            </div>
            <div className="text-white font-bold text-2xl">report higher confidence</div>
            <div className="text-neutral-400 mt-2">After just 2 weeks of practice.</div>
            <Shield className="absolute -bottom-4 -right-4 w-32 h-32 text-blue-500/10 rotate-12" />
          </div>

          {/* Bento 3: Testimonial */}
          <div className="md:col-span-1 md:row-span-1 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
            <div>
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed font-medium">
                "The AI coach feels incredibly human. It corrected my email tone instantly."
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white">S</div>
              <div className="text-xs text-neutral-400 font-medium">Sarah J., Product Manager</div>
            </div>
          </div>

          {/* Bento 4: Small Feature */}
          <div className="md:col-span-1 md:row-span-1 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center hover:bg-white/[0.05] transition-colors group">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Smart Library</h3>
            <p className="text-neutral-400 text-sm">Save and review your vocabulary.</p>
          </div>

        </div>
      </section>

      {/* PRODUCT LAPTOP MOCKUP (PARALLAX) */}
      <section id="how-it-works" className="py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Experience the platform</h2>
        </div>
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="relative mx-auto w-full aspect-[16/10] bg-neutral-900 rounded-[2rem] border-t border-x border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Fake Window Chrome */}
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-[#0B0B0F] z-20 relative">
              <div className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-green-500 transition-colors" />
              <div className="mx-auto px-4 py-1 rounded-md bg-white/5 text-[10px] text-neutral-500 font-mono flex items-center gap-2">
                <Globe className="w-3 h-3" /> app.englishcoach.ai
              </div>
            </div>
            
            {/* Mockup Screen Content with Parallax */}
            <div className="flex-1 relative bg-[#0B0B0F] overflow-hidden">
              <motion.div style={{ y: parallaxY }} className="absolute inset-x-0 top-0 h-[150%] p-8">
                {/* Simulated Dashboard UI */}
                <div className="w-full h-full bg-white/[0.02] border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
                  <div className="flex justify-between items-center pb-6 border-b border-white/5">
                    <div className="h-8 w-48 bg-white/10 rounded-lg" />
                    <div className="h-10 w-32 bg-purple-500/20 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-4">
                      <div className="h-64 bg-white/5 rounded-xl border border-white/5 p-6 flex flex-col gap-4">
                        <div className="h-4 w-1/4 bg-white/10 rounded-md" />
                        <div className="h-24 w-full bg-white/5 rounded-md mt-auto" />
                      </div>
                      <div className="h-32 bg-white/5 rounded-xl border border-white/5" />
                    </div>
                    <div className="col-span-1 space-y-4">
                      <div className="h-48 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6" />
                      <div className="h-48 bg-white/5 border border-white/5 rounded-xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-neutral-400 text-lg">Start for free, upgrade when you need more power.</p>
        </div>

        <div className="flex justify-center max-w-lg mx-auto">
          {/* Subscription Plan */}
          <div className="w-full relative rounded-[2rem] p-[1px] bg-gradient-to-b from-purple-500 to-blue-500 hover:scale-[1.02] transition-transform duration-300 z-10 shadow-2xl shadow-purple-500/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-xs font-bold uppercase tracking-widest z-20 whitespace-nowrap">
              All Inclusive
            </div>
            <div className="bg-[#0B0B0F] rounded-[31px] p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 text-center">Subscription</h3>
              <div className="text-5xl font-black text-white mb-1 text-center">$20<span className="text-lg text-neutral-500 font-medium">/mo</span></div>
              <p className="text-sm text-purple-400 mb-8 font-medium text-center">Cancel anytime</p>
              <ul className="space-y-4 mb-8 flex-1">
                {['1000 AI coaching sessions per month', 'Live speech-to-text dictation', 'Advanced grammar analytics', 'Premium ultra-realistic voices', 'Custom roleplay scenarios'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                    <Check className="w-5 h-5 text-purple-400 shrink-0" /> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={onOpenAuth} className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg">Start Free Trial</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-32 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 animate-pulse-slow pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center relative z-10 bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 md:p-24 backdrop-blur-md overflow-hidden"
        >
          {/* Decorative blur inside card */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter relative z-10">
            Ready to speak with confidence?
          </h2>
          <button 
            onClick={onOpenAuth}
            className="px-10 py-5 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] relative z-10 inline-flex items-center gap-2"
          >
            Get Started Now <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-16 px-6 bg-[#0B0B0F]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">English Coach</span>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs">
              Empowering professionals worldwide to communicate with clarity and confidence using state-of-the-art AI.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Integrations', 'Changelog'].map(link => (
                <li key={link}><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {['Help Center', 'Blog', 'Community', 'Tutorials'].map(link => (
                <li key={link}><a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-neutral-500 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-sm text-neutral-500 hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/refund" className="text-sm text-neutral-500 hover:text-white transition-colors">Refunds</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <p>© {new Date().getFullYear()} ProEnglish AI Coach. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Built with precision.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
