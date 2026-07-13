"use client";

import { useState } from "react";
import { 
  Sparkles, BookOpen, Mail, Megaphone, Check, Copy, 
  HelpCircle, RefreshCw, FileText, Globe 
} from "lucide-react";

export default function WeeklyReportsView() {
  const [productName, setProductName] = useState("Peak Focus Meditation Guide");
  const [category, setCategory] = useState("Wellness");
  const [isGenerating, setIsGenerating] = useState(false);
  const [syllabus, setSyllabus] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerateOutline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    setIsGenerating(true);
    setSyllabus(null);

    setTimeout(() => {
      // Create detailed curriculum and copywriting assets
      if (category === "Wellness") {
        setSyllabus({
          headline: `Master Your Mind: The Definitive ${productName} Program`,
          subhead: "A step-by-step practical guide to reducing stress, building daily focus habits, and maximizing flow state.",
          modules: [
            {
              title: "Module 1: The Physiology of Flow State",
              lessons: [
                "Lesson 1.1: Understanding neural focus vectors and brainwave modulation",
                "Lesson 1.2: Structuring high-performance daily breathing protocols",
                "Lesson 1.3: Creating a personalized ambient workspace configuration"
              ]
            },
            {
              title: "Module 2: Overcoming Digital distractions",
              lessons: [
                "Lesson 2.1: Managing notification fatigue and calendar audits",
                "Lesson 2.2: The 90-minute deep work scheduling methodology",
                "Lesson 2.3: Active reset meditations for rapid neural recovery"
              ]
            }
          ],
          email: {
            subject: "🚀 Exclusive: Achieve deep focus in just 10 minutes a day",
            body: `Hi [Subscriber Name],\n\nDo you find yourself constantly distracted by notifications, tabs, and alerts?\n\nI’m thrilled to introduce the ${productName}.\n\nThis system is specifically structured for wellness practitioners and busy professionals who want to reclaim their calendar and focus on high-impact work.\n\nInside, you'll unlock immediate access to breathing protocols, workbook templates, and guided tracks.\n\nClick here to secure the early bird offer and launch your journey!\n\nBest,\n[Your Name]`
          },
          ad: "Tired of feeling scattered at your desk? 🧘‍♂️ Discover the focus protocols used by wellness experts and SaaS leaders to lock in deep flow state in under 10 minutes. Grab the early bird handbook today."
        });
      } else {
        // Business category
        setSyllabus({
          headline: `The ${productName}: Scalable Strategy Roadmap`,
          subhead: "Create, position, and launch premium low-code platforms and consulting frameworks with high-fidelity analytics.",
          modules: [
            {
              title: "Module 1: Defining Your Pricing & Offers",
              lessons: [
                "Lesson 1.1: Core high-ticket packages and consulting tier structures",
                "Lesson 1.2: Mapping checkout funnels and micro-conversion goals",
                "Lesson 1.3: Integrating test coupon discount mechanisms"
              ]
            },
            {
              title: "Module 2: Cold Lead & Pipeline Acquisition",
              lessons: [
                "Lesson 2.1: Writing high-converting sales scripts and email hooks",
                "Lesson 2.2: Launching ad campaign budgets and scaling ROAS target models",
                "Lesson 2.3: Reclaiming abandoned checkouts via SMS outreach sequences"
              ]
            }
          ],
          email: {
            subject: "💼 Step-by-step: Launching your premium consulting blueprint",
            body: `Hi [Name],\n\nAre you ready to scale your agency operations without working double hours?\n\nI just launched the ${productName}.\n\nIt is packed with low-code blueprints, email sales scripts, and funnel templates that will save you over 40 hours of preparation.\n\nSecure your sandbox license today at 20% off using coupon WELCOME10!\n\nTalk soon,\n[Your Name]`
          },
          ad: "Stop selling hours. 🚀 Scale your software strategy with the low-code business automation templates. Save weeks of planning and launch your custom funnel tonight. Tap to download."
        });
      }
      setIsGenerating(false);
    }, 700);
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-sans font-bold text-slate-900 tracking-tight">Syllabus & Copywriting Engine</h1>
        <p className="text-sm text-slate-500 mt-1">Generate comprehensive course curriculums, landing page copy, and email marketing announcements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Configuration */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm h-fit space-y-6">
          <h2 className="text-lg font-sans font-semibold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            Syllabus Blueprint Generator
          </h2>

          <form onSubmit={handleGenerateOutline} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Product / Course Name
              </label>
              <input 
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="block w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
                placeholder="e.g. Zen Meditation Mastery"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Product Category
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
              >
                <option value="Wellness">Wellness & Health coaching</option>
                <option value="Business">Business Strategy & SaaS Coaching</option>
              </select>
            </div>

            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating copy...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-teal-400 fill-teal-400" />
                  Generate Product Outline
                </>
              )}
            </button>
          </form>

          {/* Guidelines info */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-800 block mb-1">Interactive Simulation:</strong>
            Generate structural assets instantly. All copy configurations and lesson outlines are persistent. Use copy buttons to export content.
          </div>
        </div>

        {/* Generated output workspace */}
        <div className="lg:col-span-2 space-y-6">
          {syllabus ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Headline block */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-widest flex items-center gap-1">
                    <Globe className="w-4 h-4" /> Landing Page Assets
                  </span>
                  <button 
                    onClick={() => handleCopyText("landing", `${syllabus.headline}\n${syllabus.subhead}`)}
                    className="text-slate-400 hover:text-slate-900 flex items-center gap-1 text-xs font-medium"
                  >
                    {copiedKey === "landing" ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
                    {copiedKey === "landing" ? "Copied" : "Copy All"}
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-sans font-extrabold text-slate-900">{syllabus.headline}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{syllabus.subhead}</p>
                </div>
              </div>

              {/* Syllabus curriculum block */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1">
                    <BookOpen className="w-4 h-4" /> Course Syllabus Curriculum
                  </span>
                </div>
                
                <div className="space-y-5">
                  {syllabus.modules.map((m: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-sans font-bold text-slate-900 text-sm">{m.title}</h4>
                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-600">
                        {m.lessons.map((l: string, lIdx: number) => (
                          <li key={lIdx} className="leading-relaxed">{l}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketing announcement emails */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-1">
                    <Mail className="w-4 h-4" /> Announcement Sequence Email
                  </span>
                  <button 
                    onClick={() => handleCopyText("email", `Subject: ${syllabus.email.subject}\n\n${syllabus.email.body}`)}
                    className="text-slate-400 hover:text-slate-900 flex items-center gap-1 text-xs font-medium"
                  >
                    {copiedKey === "email" ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
                    {copiedKey === "email" ? "Copied" : "Copy Email"}
                  </button>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 font-mono text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                  <strong>Subject:</strong> {syllabus.email.subject}
                  <br /><br />
                  {syllabus.email.body}
                </div>
              </div>

              {/* Facebook Ads hooks */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                    <Megaphone className="w-4 h-4" /> Paid Campaign Ad Copy
                  </span>
                  <button 
                    onClick={() => handleCopyText("ad", syllabus.ad)}
                    className="text-slate-400 hover:text-slate-900 flex items-center gap-1 text-xs font-medium"
                  >
                    {copiedKey === "ad" ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
                    {copiedKey === "ad" ? "Copied" : "Copy Ad"}
                  </button>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/60 rounded-xl p-4 italic">
                  &quot;{syllabus.ad}&quot;
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center h-[500px] flex flex-col justify-center items-center">
              <Sparkles className="w-12 h-12 text-slate-300 animate-pulse mb-4" />
              <h3 className="font-sans font-bold text-slate-900 text-base">Workspace Blank</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1 leading-relaxed">
                Configure your product details on the left, then click generate to create structured curriculum syllabuses and copy drafts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
