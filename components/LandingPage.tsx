"use client";

import { motion } from "motion/react";
import { 
  ArrowRight, Search, Sparkles, ShoppingCart, BarChart3, 
  Check, Star, HelpCircle, ArrowUpRight, Shield, Play 
} from "lucide-react";

interface LandingPageProps {
  onStartDemo: () => void;
  onGoToLogin: () => void;
}

export default function LandingPage({ onStartDemo, onGoToLogin }: LandingPageProps) {
  const features = [
    {
      icon: <Search className="w-5 h-5 text-teal-600" />,
      title: "Research & Ideate",
      description: "Analyze market potential in the wellness and business niches. Score opportunities and save high-demand product ideas.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      title: "Structure & Copywrite",
      description: "Auto-generate course syllabuses, marketing copy, and launch sequences tailored to your target student profile.",
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-indigo-600" />,
      title: "Funnel & Checkout",
      description: "Map out visitor paths and simulate transactions in an interactive checkout environment with real-time feedback.",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-emerald-600" />,
      title: "Track & Optimize",
      description: "Analyze simulated sales conversion, customer acquisition costs (CAC), and return on ad spend (ROAS) trends.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Pick Your Niche",
      description: "Explore structured wellness, health, and business categories with simulated demand metrics.",
    },
    {
      number: "02",
      title: "Generate Content",
      description: "Create sales letters, module outlines, and email campaigns using our template builders.",
    },
    {
      number: "03",
      title: "Simulate Funnel",
      description: "Preview how your product checkout flows and process mock credit card test transactions.",
    },
    {
      number: "04",
      title: "Review Financials",
      description: "Track performance on our interactive dashboard with automatic mock data generation.",
    },
  ];

  const faqs = [
    {
      q: "What is ProductFlow AI?",
      a: "ProductFlow AI is an interactive digital product simulator. It allows wellness mentors, business coaches, and creators to plan, build, and test their product ideas and funnels in a risk-free demo dashboard.",
    },
    {
      q: "Does this require real payment details?",
      a: "No! All credit card transactions, processing fees, and payments are entirely simulated. You can test the checkout flow using mock card numbers provided in the simulator.",
    },
    {
      q: "Can I save my product draft designs?",
      a: "Yes. All products, funnel maps, generated copy, and simulated sale results are persisted locally on your device via browser localStorage.",
    },
    {
      q: "Is there a real backend database?",
      a: "This is a full-featured client-side front-end simulation. It provides realistic high-fidelity dashboard metrics, interactive charts, and tools without needing any external subscription.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <header id="header-nav" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              P
            </div>
            <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
              ProductFlow <span className="text-teal-600 font-medium">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              id="login-btn"
              onClick={onGoToLogin} 
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors px-3 py-2"
            >
              Sign In
            </button>
            <button 
              id="cta-start-nav"
              onClick={onStartDemo}
              className="bg-slate-950 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm shadow-slate-950/10 flex items-center gap-1.5"
            >
              Start Building <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero-section" className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60 text-xs font-semibold mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Interactive Creator & Funnel Simulator
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]"
          >
            Turn Your Expertise Into <br />
            <span className="bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              High-Margin Digital Products
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The ultimate visual workspace for wellness practitioners and business mentors. 
            Research niche potential, design structured syllabuses, draft copy, map checkout funnels, and test growth metrics.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              id="hero-cta-primary"
              onClick={onStartDemo}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 text-white text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-md shadow-slate-950/10 flex items-center justify-center gap-2 group"
            >
              Launch Dashboard Simulator 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              id="hero-cta-secondary"
              onClick={onGoToLogin}
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 text-base font-semibold px-8 py-4 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-slate-600 fill-slate-600" />
              Demo Log In
            </button>
          </motion.div>
        </div>

        {/* Subtle decorative background gradients */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2 w-80 h-80 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />
      </section>

      {/* Grid Dashboard Mockup */}
      <section id="mockup-section" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/80 overflow-hidden"
          >
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs text-slate-400 font-mono bg-white px-8 py-1 rounded border border-slate-200/60 shadow-inner">
                app.productflow.ai/dashboard
              </div>
              <div className="w-12" />
            </div>
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
              <div className="h-2 w-32 bg-slate-200 rounded" />
              <div className="h-2 w-16 bg-slate-200 rounded" />
              <div className="h-2 w-24 bg-slate-200 rounded ml-auto" />
            </div>
            <div className="aspect-[16/9] w-full relative bg-slate-100 flex items-center justify-center p-8">
              <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="col-span-2 bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                    <div className="h-3 w-16 bg-slate-100 rounded" />
                  </div>
                  <div className="h-40 w-full flex items-end justify-between gap-2 pt-6">
                    {[40, 65, 50, 85, 70, 95, 80, 110, 90, 120, 105, 140].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-teal-500/80 to-teal-400 rounded-t-sm" style={{ height: `${h / 1.6}%` }} />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
                    <div className="h-8 w-20 bg-slate-900 rounded mb-2" />
                    <div className="h-3.5 w-16 bg-teal-100 text-teal-800 rounded px-1.5 py-0.5 inline-block text-center text-xs font-semibold" />
                  </div>
                  <div className="space-y-3 pt-6 border-t border-slate-100">
                    <div className="flex justify-between"><div className="h-3 w-16 bg-slate-200 rounded" /><div className="h-3 w-8 bg-slate-300 rounded" /></div>
                    <div className="flex justify-between"><div className="h-3 w-20 bg-slate-200 rounded" /><div className="h-3 w-10 bg-slate-300 rounded" /></div>
                    <div className="flex justify-between"><div className="h-3 w-12 bg-slate-200 rounded" /><div className="h-3 w-6 bg-slate-300 rounded" /></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features-section" className="bg-white py-24 px-6 border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-teal-600 mb-3">Capabilities</h2>
            <p className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">
              Four Core Simulators in One Unified Space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shadow-sm mb-4">
                  {f.icon}
                </div>
                <h3 className="font-sans font-semibold text-lg text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works-section" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-600 mb-3">The Blueprint</h2>
            <p className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">
              Interactive Dashboard Walkthrough
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col relative z-10 bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm">
                <div className="font-mono text-3xl font-bold text-slate-200 mb-4">{s.number}</div>
                <h3 className="font-sans font-semibold text-base text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials-section" className="bg-white py-24 px-6 border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-purple-600 mb-3">Feedback</h2>
            <p className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">
              Loved by Practitioners and Mentors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl border border-slate-200 bg-slate-50/40 relative">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-700 text-sm italic mb-6 leading-relaxed">
                &quot;As a health coach, designing the sales copy and course syllabus used to take weeks. ProductFlow allowed me to simulate the whole launching sequence and checkout process in a single evening. The mock metric forecasts helped me set the right pricing structure.&quot;
              </p>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Elena Rostova</h4>
                <p className="text-slate-500 text-xs">Wellness &amp; Mindfulness Mentor</p>
              </div>
            </div>

            <div className="p-8 rounded-xl border border-slate-200 bg-slate-50/40 relative">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-700 text-sm italic mb-6 leading-relaxed">
                &quot;This visual sandbox is incredible! I map out my funnel paths, simulate a series of mock purchases, and see exactly how my revenue curves react. The mock analytics metrics are beautifully styled and perfectly responsive.&quot;
              </p>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Marcus Vance</h4>
                <p className="text-slate-500 text-xs">Business Operations Coach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing-section" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-3">Simplicity</h2>
            <p className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">
              Full Sandbox Access
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-teal-500 text-white font-semibold text-xs px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              Free Access
            </div>
            <h3 className="font-sans font-bold text-2xl text-slate-900 mb-2">Creator Simulator</h3>
            <p className="text-slate-600 text-sm mb-6">Test and build digital product funnels with zero subscriptions or card details required.</p>
            <div className="text-5xl font-extrabold text-slate-900 mb-6 font-mono">
              $0<span className="text-lg text-slate-500 font-normal font-sans">/always free</span>
            </div>

            <ul className="text-left space-y-4 max-w-xs mx-auto mb-8 border-t border-slate-100 pt-8">
              <li className="flex items-center gap-3 text-slate-700 text-sm"><Check className="w-5 h-5 text-teal-600 shrink-0" /> Unlimited saved products</li>
              <li className="flex items-center gap-3 text-slate-700 text-sm"><Check className="w-5 h-5 text-teal-600 shrink-0" /> Interactive niche research</li>
              <li className="flex items-center gap-3 text-slate-700 text-sm"><Check className="w-5 h-5 text-teal-600 shrink-0" /> Simulated AI copy generators</li>
              <li className="flex items-center gap-3 text-slate-700 text-sm"><Check className="w-5 h-5 text-teal-600 shrink-0" /> Interactive checkout simulator</li>
              <li className="flex items-center gap-3 text-slate-700 text-sm"><Check className="w-5 h-5 text-teal-600 shrink-0" /> Real-time dashboard charting</li>
            </ul>

            <button 
              id="pricing-cta"
              onClick={onStartDemo}
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-md shadow-slate-950/10 flex items-center justify-center gap-2 group"
            >
              Launch Dashboard Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq-section" className="bg-white py-24 px-6 border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-3">FAQ</h2>
            <p className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/10">
                <h4 className="font-sans font-semibold text-slate-900 text-base mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  {f.q}
                </h4>
                <p className="text-slate-600 text-sm pl-7.5 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer-section" className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-teal-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              P
            </div>
            <span className="font-bold text-white text-base">ProductFlow AI</span>
          </div>

          <p className="text-xs text-slate-500">
            &copy; 2026 ProductFlow AI Simulator. All rights reserved. Built as a high-fidelity client-side design demo.
          </p>

          <div className="flex gap-4 text-xs text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
