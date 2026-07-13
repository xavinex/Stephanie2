'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Mail, 
  Megaphone, 
  Share2, 
  BookOpen, 
  Award, 
  Copy, 
  Save, 
  RotateCw, 
  Minimize, 
  Maximize, 
  Sparkles, 
  Check, 
  HelpCircle,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { SavedContent, AppState } from '@/lib/demoState';

interface ContentStudioViewProps {
  state: AppState;
  onSaveContent: (content: SavedContent) => void;
  onNavigate: (view: string) => void;
}

interface ContentTemplate {
  id: string;
  type: SavedContent['type'];
  title: string;
  body: string;
  shortVersion: string;
  expandedVersion: string;
}

// Content library based on niches
const wellnessTemplates: ContentTemplate[] = [
  {
    id: 'w-t1',
    type: 'Landing Copy',
    title: '21-Day Stress Reset High-Converting Headline Stack',
    body: `🚨 ATTENTION: OVERWORKED MANAGERS & EXECUTIVES\n\n"How to Shut Off Your Brain After a 10-Hour Workday, Fall Into Deep Sleep, and Wake Up with Infinite Vitality—Without Taking Sleeping Pills or Anti-Anxiety Medication."\n\nDear Burned-Out Professional,\n\nYou log off Slack at 8:00 PM. Your body is physically exhausted, but your brain is screaming. Your mind is racing with unread emails, tomorrow's client deck, and that passive-aggressive comment from the VP.\n\nYou lie in bed for 2 hours staring at the ceiling. When you finally sleep, it’s restless. You wake up at 6:30 AM feeling like you’ve been run over by a freight train.\n\nThis isn't just "fatigue." It's chronic nervous system overload. And in 21 days, we are going to fix it.`,
    shortVersion: `🚨 ATTENTION: OVERWORKED MANAGERS\n\nHow to shut off your brain after a 10-hour workday, fall asleep instantly, and reclaim 2x energy in 21 days.\n\nNo pills. No complex routines. Just 15 minutes of guided nervous system calibration a day.`,
    expandedVersion: `🚨 ATTENTION: OVERWORKED MANAGERS & EXECUTIVES\n\n"How to Shut Off Your Brain After a 10-Hour Workday, Fall Into Deep Sleep, and Wake Up with Infinite Vitality—Without Taking Sleeping Pills or Anti-Anxiety Medication."\n\nDear Burned-Out Professional,\n\nYou log off Slack at 8:00 PM. Your body is physically exhausted, but your brain is screaming. Your mind is racing with unread emails, tomorrow's client deck, and that passive-aggressive comment from the VP.\n\nYou lie in bed for 2 hours staring at the ceiling. When you finally sleep, it’s restless. You wake up at 6:30 AM feeling like you’ve been run over by a freight train.\n\nThis isn't just "fatigue." It's chronic nervous system overload. And in 21 days, we are going to fix it.\n\nINTRODUCING THE 21-DAY STRESS RESET:\n• Module 1: Calibrating the Nervous System (vagus nerve stimulation)\n• Module 2: Overcoming Cognitive Overload (task chunking dashboards)\n• Module 3: Restorative Sleep & Circadian Recovery (circadian hygiene)\n• Module 4: Sustainable Boundary Optimization (polite workplace boundary templates)\n\n🎁 GET THESE HIGH-VALUE BONUSES FOR FREE:\n1. Calming Binaural Sleep Audio Sessions (Value $49)\n2. Daily Stress Tracker Spreadsheet Grid (Value $29)`
  },
  {
    id: 'w-t2',
    type: 'Email Follow-up',
    title: 'Email Sequence 1: The "Why You Can\'t Sleep" Epiphany',
    body: `Subject: Why counting sheep is keeping you awake, [First Name]...\n\nEver wonder why you feel absolutely exhausted all day, but the second your head hits the pillow, your brain decides to write a 10-page essay?\n\nIt’s not because you drank coffee at 2 PM.\nAnd it’s definitely not because you "just aren't tired."\n\nIt’s because of a biological state called sympathetic dominance (better known as the "Fight or Flight" response).\n\nWhen you spend 10 hours solving problems, putting out fires, and managing teams, your cortisol levels spike. Your body assumes you are running from a predator.\n\nSo when you try to sleep, your amygdala blocks it. It thinks sleeping is dangerous.\n\nTomorrow, I am going to share a simple 4-7-8 breathing sequence that triggers your vagus nerve to shut down the "Fight or Flight" circuit in 90 seconds.\n\nIn the meantime, check out our 21-Day Stress Reset Syllabus here if you're ready to fix this permanently.\n\nTalk tomorrow,\nDemo Wellness Coach`,
    shortVersion: `Subject: Why counting sheep is keeping you awake...\n\nEver wonder why you feel exhausted all day, but wide awake the second you hit the pillow?\n\nIt's called "Sympathetic Dominance." Your brain is literally locked in Fight-or-Flight because of workplace stress. Counting sheep won't fix it—vagus nerve calibration will.\n\nKeep your eyes open for my email tomorrow with a 90-second breathing hack.\n\n- Coach`,
    expandedVersion: `Subject: Why counting sheep is keeping you awake, [First Name]...\n\nEver wonder why you feel absolutely exhausted all day, but the second your head hits the pillow, your brain decides to write a 10-page essay?\n\nIt’s not because you drank coffee at 2 PM. And it’s definitely not because you "just aren't tired."\n\nIt’s because of a biological state called sympathetic dominance (better known as the "Fight or Flight" response).\n\nWhen you spend 10 hours solving problems, putting out fires, and managing teams, your cortisol levels spike. Your body assumes you are running from a predator. So when you try to sleep, your amygdala blocks it. It thinks sleeping is dangerous.\n\nTomorrow, I am going to share a simple 4-7-8 breathing sequence that triggers your vagus nerve to shut down the "Fight or Flight" response in 90 seconds.\n\nWHAT YOU WILL MASTER IN OUR PROGRAM:\n• How to lower morning cortisol peaks naturally.\n• Re-building cellular ATP energy levels without relying on caffeine.\n• Deep vagal tone techniques to recover from intense meetings in minutes.\n\nCheck out the full 21-Day Stress Reset Syllabus here to secure your enrollment.\n\nTalk tomorrow,\nDemo Wellness Coach`
  },
  {
    id: 'w-t3',
    type: 'Ad Creative',
    title: 'Meta Ads: High-Anxiety Lead Magnet Pitch',
    body: `Copy: Spend 10 hours on Slack today, [Niche Professional]? 🖥️\n\nIf you lie in bed staring at the ceiling, trying to "shut off" your brain while your heart races with team deadlines, you aren't alone.\n\nCounting sheep doesn't work. Blue-light glasses don't work. CBD gummies don't work.\n\nWhy? Because your body is trapped in Sympathetic Dominance. Your brain literally thinks a predator is chasing you.\n\nDownload our FREE 90-Second Vagus Nerve Calibrator Guide. Discover the exact breathing sequence corporate high-performers use to drop high stress, shut off cognitive loops, and fall into deep restorative sleep in under 2 minutes.\n\n👉 Click "Learn More" to claim your free guide.`,
    shortVersion: `Copy: Spend 10 hours on Slack today? 🖥️\n\nLie in bed staring at the ceiling with your brain racing over team deadlines? Blue-light glasses won't fix nervous system overload.\n\nDownload our FREE 90-Second Vagus Nerve Calibrator Guide and fall asleep instantly.\n\n👉 Click "Learn More" to grab it!`,
    expandedVersion: `Copy: Spend 10 hours on Slack today, [Niche Professional]? 🖥️\n\nIf you lie in bed staring at the ceiling, trying to "shut off" your brain while your heart races with team deadlines, you aren't alone.\n\nCounting sheep doesn't work. Blue-light glasses don't work. CBD gummies don't work. Why? Because your body is trapped in Sympathetic Dominance. Your brain literally thinks a predator is chasing you.\n\nDownload our FREE 90-Second Vagus Nerve Calibrator Guide. Discover the exact breathing sequence corporate high-performers use to drop high stress, shut off cognitive loops, and fall into deep restorative sleep in under 2 minutes.\n\nWHAT INSIDE:\n✓ The 3-step vagal tone breathing sequence.\n✓ The evening cortisol shut-down checklist.\n✓ Scientific backing on why blue-light isn't your primary sleep issue.\n\n👉 Click "Learn More" to claim your free guide and end midnight racing thoughts today.`
  },
  {
    id: 'w-t4',
    type: 'Social Post',
    title: 'LinkedIn: The Cost of Burnout Case Study',
    body: `Post: I spent 8 years climbing the corporate ladder. \n\nI thought my 60-hour weeks were "hustle."\nI thought my constant jaw-clenching was "focus."\nI thought my 4 hours of restless sleep was just the "price of success."\n\nUntil my body forced me to stop.\n\nIn 2024, I collapsed during a board presentation. Diagnostic result? Extreme sympathetic burnout, adrenal crash, and cognitive exhaustion.\n\nYour career is a marathon, not a sprint. If you are sacrifice your nervous system for a title, you will lose both.\n\nHere are 3 micro-habits that saved my health without ruining my performance:\n1. The 12 PM Slack Block: Pause all screens for 15 minutes. Step outside.\n2. Vagus Nerve Activation: Trigger deep parasympathetic calibration (breath: inhale 4s, hold 7s, exhale 8s).\n3. Hard Cortisol Shutdown: No email or screen work after 8 PM.\n\nProtect your state. It is your only real asset.`,
    shortVersion: `Post: I thought my 60-hour weeks were "hustle."\nI thought constant jaw-clenching was "focus."\nUntil I collapsed during a board meeting from chronic burnout.\n\nYour career is a marathon. Sacrifice your nervous system and you lose everything. Stop. Calibrate. Set boundaries.`,
    expandedVersion: `Post: I spent 8 years climbing the corporate ladder. \n\nI thought my 60-hour weeks were "hustle."\nI thought my constant jaw-clenching was "focus."\nI thought my 4 hours of restless sleep was just the "price of success."\n\nUntil my body forced me to stop.\n\nIn 2024, I collapsed during a board presentation. Diagnostic result? Extreme sympathetic burnout, adrenal crash, and cognitive exhaustion.\n\nYour career is a marathon, not a sprint. If you are sacrifice your nervous system for a title, you will lose both.\n\nHere are 3 micro-habits that saved my health without ruining my performance:\n1. The 12 PM Slack Block: Pause all screens for 15 minutes. Step outside.\n2. Vagus Nerve Activation: Trigger deep parasympathetic calibration (breath: inhale 4s, hold 7s, exhale 8s).\n3. Hard Cortisol Shutdown: No email or screen work after 8 PM.\n\nTo help overworked professionals avoid this exact crash, I packaged my complete recovery program into the "21-Day Stress Reset". Check my profile or click the link below to explore the exact syllabus.\n\nProtect your state. It is your only real asset.`
  },
  {
    id: 'w-t5',
    type: 'Ebook Chapter',
    title: 'Chapter 1: The Physiology of Burnout',
    body: `CHAPTER 1: THE ACCIDENT OF SYM-PATHETIC DOMINANCE\n\nYour nervous system is divided into two primary modes: the Sympathetic (Fight or Flight) and the Parasympathetic (Rest & Digest).\n\nThese modes were designed to operate on a balance scale. When you are chased by a threat, the scale swings completely to Sympathetic. Your digestion shuts down, your pupils dilate, and your blood pressure surges. Once safe, the scale swings back to Parasympathetic, allowing cellular repair and deep sleep.\n\nThe tragedy of modern corporate workspace is that we have replaced lions with Slack alerts, email pings, and demanding quarterly goals.\n\nBecause these pings are continuous, the scale is locked in Sympathetic mode indefinitely. This chapter breaks down how to actively restore equilibrium through vagal tone exercises.`,
    shortVersion: `CHAPTER 1: THE ACCIDENT OF SYM-PATHETIC DOMINANCE\n\nYour body operates on two modes: Sympathetic (Fight-or-Flight) and Parasympathetic (Rest-and-Digest).\n\nSlack alerts and email pings have replaced physical predators, locking our bodies in a continuous state of stress. This chapter teaches you how to trigger the Parasympathetic state at will.`,
    expandedVersion: `CHAPTER 1: THE ACCIDENT OF SYM-PATHETIC DOMINANCE\n\nYour nervous system is divided into two primary modes: the Sympathetic (Fight or Flight) and the Parasympathetic (Rest & Digest).\n\nThese modes were designed to operate on a balance scale. When you are chased by a threat, the scale swings completely to Sympathetic. Your digestion shuts down, your pupils dilate, and your blood pressure surges. Once safe, the scale swings back to Parasympathetic, allowing cellular repair and deep sleep.\n\nThe tragedy of modern corporate workspace is that we have replaced lions with Slack alerts, email pings, and demanding quarterly goals. Because these pings are continuous, the scale is locked in Sympathetic mode indefinitely. This chapter breaks down how to actively restore equilibrium through vagal tone exercises.\n\nKEY SCIENTIFIC BENCHMARKS:\n• Cortisol: The master stress hormone peaking at incorrect evening intervals.\n• Vagal Tone: The metric measuring how quickly your heart rate recovers after a stressful trigger.\n• Parasympathetic Rebound: The biological transition required for deep, non-REM cellular repair.`
  },
  {
    id: 'w-t6',
    type: 'Course Lesson',
    title: 'Lesson 1.2: Vagus Nerve Stimulation Mechanics',
    body: `Welcome to Lesson 1.2. Today we are unpacking the exact anatomical mechanics of the vagus nerve.\n\nThe vagus nerve is the longest cranial nerve in your body. It acts as a direct telephone wire from your brain to your heart, lungs, and digestive tract, transmitting signals that say "you are safe."\n\nWe can stimulate this nerve through breathing because of a mechanism called Respiratory Sinus Arrhythmia. When you extend your exhalation longer than your inhalation, your heart rate slows down, signaling to your brain that the danger has passed.\n\nACTION STEP FOR TODAY:\nComplete three rounds of the 4-7-8 sequence:\n1. Inhale through your nose for 4 seconds.\n2. Hold your breath for 7 seconds.\n3. Exhale slowly through your mouth making a "whoosh" sound for 8 seconds.\n\nObserve the drop in your heart rate and immediate muscle relaxation.`,
    shortVersion: `Welcome to Lesson 1.2. Today we cover the Vagus Nerve.\n\nAs the longest cranial nerve in your body, it transmits "you are safe" signals to your heart and lungs. We trigger this by making exhalations longer than inhalations.\n\nAction Step: Inhale 4s, Hold 7s, Exhale 8s. Repeat 3 times.`,
    expandedVersion: `Welcome to Lesson 1.2. Today we are unpacking the exact anatomical mechanics of the vagus nerve.\n\nThe vagus nerve is the longest cranial nerve in your body. It acts as a direct telephone wire from your brain to your heart, lungs, and digestive tract, transmitting signals that say "you are safe."\n\nWe can stimulate this nerve through breathing because of a mechanism called Respiratory Sinus Arrhythmia. When you extend your exhalation longer than your inhalation, your heart rate slows down, signaling to your brain that the danger has passed.\n\nTHE BIOLOGY OF THE 4-7-8 TECHNIQUE:\n• Inhale (4s): Enters oxygen, prepares cardiopulmonary mechanics.\n• Hold (7s): Saturates bloodstream with carbon dioxide, triggering blood vessels to dilate.\n• Exhale (8s): Maximizes vagus nerve messaging, dropping systemic heart rate.\n\nACTION STEP FOR TODAY:\nComplete three rounds of the 4-7-8 sequence:\n1. Inhale through your nose for 4 seconds.\n2. Hold your breath for 7 seconds.\n3. Exhale slowly through your mouth making a "whoosh" sound for 8 seconds.\n\nObserve the drop in your heart rate, lower shoulder tension, and immediate muscle relaxation.`
  }
];

export default function ContentStudioView({ state, onSaveContent, onNavigate }: ContentStudioViewProps) {
  const [contentType, setContentType] = useState<SavedContent['type']>('Landing Copy');
  const [activeTemplate, setActiveTemplate] = useState<ContentTemplate | null>(() => {
    return wellnessTemplates.find(t => t.type === 'Landing Copy') || null;
  });
  const [currentText, setCurrentText] = useState(() => {
    const template = wellnessTemplates.find(t => t.type === 'Landing Copy');
    return template ? template.body : '';
  });
  const [showCopied, setShowCopied] = useState(false);
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handler for synchronously updating template assets in local click state
  const handleContentTypeChange = (type: SavedContent['type']) => {
    setContentType(type);
    const template = wellnessTemplates.find(t => t.type === type);
    if (template) {
      setActiveTemplate(template);
      setCurrentText(template.body);
    }
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Save Content to local list
  const handleSaveToWorkspace = () => {
    if (activeTemplate) {
      onSaveContent({
        id: `content-${Date.now()}`,
        title: activeTemplate.title,
        type: contentType,
        body: currentText,
        createdDate: new Date().toISOString()
      });
      setShowSavedMsg(true);
      setTimeout(() => setShowSavedMsg(false), 3000);
    }
  };

  // Simulated AI modification actions
  const triggerShorten = () => {
    if (activeTemplate) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentText(activeTemplate.shortVersion);
        setIsLoading(false);
      }, 500);
    }
  };

  const triggerExpand = () => {
    if (activeTemplate) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentText(activeTemplate.expandedVersion);
        setIsLoading(false);
      }, 500);
    }
  };

  const triggerRegenerate = () => {
    if (activeTemplate) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentText(activeTemplate.body);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">Multi-Channel Content Studio</h2>
          <p className="text-slate-500 text-sm">Write copy assets across touchpoints: sales landing copy, emails, ads, and curriculum chapters.</p>
        </div>
        <button 
          onClick={() => onNavigate('funnelBuilder')}
          className="px-4 py-2 bg-white border border-slate-200 text-teal-600 font-semibold text-xs rounded-xl flex items-center gap-1 hover:bg-slate-50 transition-colors shadow-sm"
          id="btn-navigate-to-funnels"
        >
          Open Funnel Builder <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Category Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold mb-3">Copy Formats</h3>
            
            <div className="space-y-2">
              {[
                { type: 'Landing Copy', icon: <FileText className="w-4 h-4" />, label: 'Landing Page Copy' },
                { type: 'Email Follow-up', icon: <Mail className="w-4 h-4" />, label: 'Email Follow-ups' },
                { type: 'Ad Creative', icon: <Megaphone className="w-4 h-4" />, label: 'Ad Creatives (Meta)' },
                { type: 'Social Post', icon: <Share2 className="w-4 h-4" />, label: 'Social Content' },
                { type: 'Ebook Chapter', icon: <BookOpen className="w-4 h-4" />, label: 'eBook Chapters' },
                { type: 'Course Lesson', icon: <Award className="w-4 h-4" />, label: 'Course Lesson Worksheets' }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleContentTypeChange(item.type as any)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-semibold flex items-center gap-3 transition-all ${
                    contentType === item.type 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                  id={`btn-content-type-${item.type.replace(' ', '-')}`}
                >
                  <span className={contentType === item.type ? 'text-teal-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats widget */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl text-xs space-y-2 text-slate-500 shadow-sm">
            <h4 className="text-slate-900 font-semibold font-mono text-[10px] uppercase">Scribble Optimizer</h4>
            <p>Our copy templates leverage the **AIDA framework** (Attention, Interest, Desire, Action) to match core customer problems with price expectations.</p>
          </div>
        </div>

        {/* Right Side: Copywriting Workspace */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[500px] shadow-sm">
          {/* Header Controls */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-700 uppercase">
                {contentType} Workspace
              </span>
            </div>

            {/* Simulated AI Copy Modifier Buttons */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={triggerShorten}
                disabled={isLoading}
                className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold rounded-lg flex items-center gap-1 transition-colors shadow-sm"
                title="Make copy shorter and punchier"
                id="btn-ai-shorten"
              >
                <Minimize className="w-3 h-3 text-amber-500" /> Shorten
              </button>
              <button 
                onClick={triggerExpand}
                disabled={isLoading}
                className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold rounded-lg flex items-center gap-1 transition-colors shadow-sm"
                title="Expand copy and add detail"
                id="btn-ai-expand"
              >
                <Maximize className="w-3 h-3 text-purple-500" /> Expand
              </button>
              <button 
                onClick={triggerRegenerate}
                disabled={isLoading}
                className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold rounded-lg flex items-center gap-1 transition-colors shadow-sm"
                title="Reset copy to original template"
                id="btn-ai-regenerate"
              >
                <RotateCw className="w-3 h-3 text-teal-500" /> Revert
              </button>
            </div>
          </div>

          {/* Text Editor Area */}
          <div className="flex-1 p-6 relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading-editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-10"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-semibold">
                    <RotateCw className="w-4 h-4 animate-spin" /> Rewriting copy with AI templates...
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className="w-full h-[320px] bg-transparent text-slate-850 text-xs sm:text-sm font-sans focus:outline-none resize-none leading-relaxed leading-6 placeholder:text-slate-400"
              placeholder="Paste or enter copy assets..."
              id="textarea-content-editor"
            />
          </div>

          {/* Footer Save & Copy Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {showSavedMsg && (
                <span className="text-[11px] text-emerald-750 font-medium flex items-center gap-1 animate-pulse">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Saved to Copy workspace list
                </span>
              )}
              {showCopied && (
                <span className="text-[11px] text-teal-750 font-medium flex items-center gap-1 animate-pulse">
                  <Check className="w-3.5 h-3.5 text-teal-600" /> Copied to Clipboard!
                </span>
              )}
            </div>

            <div className="flex gap-2.5">
              <button 
                onClick={handleCopyToClipboard}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                id="btn-content-copy"
              >
                <Copy className="w-4 h-4 text-slate-400" /> Copy to Clipboard
              </button>
              <button 
                onClick={handleSaveToWorkspace}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                id="btn-content-save"
              >
                <Save className="w-4 h-4" /> Save Content Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
