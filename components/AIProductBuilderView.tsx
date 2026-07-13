'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  HelpCircle, 
  Plus, 
  Trash, 
  Save, 
  ChevronRight, 
  RefreshCw, 
  CheckCircle, 
  Layers, 
  BookOpen, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { ProductOutline, AppState } from '@/lib/demoState';

interface AIProductBuilderViewProps {
  state: AppState;
  onSaveOutline: (outline: ProductOutline) => void;
  onNavigate: (view: string) => void;
}

export default function AIProductBuilderView({ state, onSaveOutline, onNavigate }: AIProductBuilderViewProps) {
  // Input fields
  const [name, setName] = useState('');
  const [niche, setNiche] = useState('Wellness');
  const [audience, setAudience] = useState('');
  const [problem, setProblem] = useState('');
  const [promise, setPromise] = useState('');
  const [price, setPrice] = useState(47);
  const [bonuses, setBonuses] = useState<string[]>(['Bonus eBook', 'Action Checklist']);
  const [newBonus, setNewBonus] = useState('');

  // AI Loading & Result state
  const [aiSteps, setAiSteps] = useState<string[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState<ProductOutline | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Quick autofill templates
  const loadWellnessTemplate = () => {
    setName('21-Day Stress Reset Program');
    setNiche('Wellness');
    setAudience('Busy Corporate Professionals & Managers');
    setProblem('Overwhelming professional burnout, high anxiety levels, and chronic sleep deprivation');
    setPromise('Reclaim calm, double your energy, and master daily stress in just 15 minutes a day');
    setPrice(47);
    setBonuses(['Calming Binaural Sleep Audio Sessions', 'Daily Stress Tracker Spreadsheet Grid']);
  };

  const loadBusinessTemplate = () => {
    setName('SaaS Founder Launch Kit');
    setNiche('Business');
    setAudience('Early-stage Solo Tech Founders & Product Enthusiasts');
    setProblem('Struggling to validate product concepts and close their first 10 paying customers');
    setPromise('Validate your software demand and sign 10 premium SaaS trials in exactly 30 days');
    setPrice(97);
    setBonuses(['10 Cold Outreach email follow-up templates', 'Perfect Product Hunt Launch checklist blueprint']);
  };

  // Add/remove bonus
  const handleAddBonus = () => {
    if (newBonus.trim()) {
      setBonuses([...bonuses, newBonus.trim()]);
      setNewBonus('');
    }
  };

  const handleRemoveBonus = (idx: number) => {
    setBonuses(bonuses.filter((_, i) => i !== idx));
  };

  // Run simulated AI Outline generation
  const handleGenerateOutline = () => {
    if (!name || !audience || !problem || !promise) {
      alert('Please fill out the name, target audience, problem, and promise first!');
      return;
    }

    setLoading(true);
    setGeneratedOutline(null);
    setCurrentStepIdx(0);

    const steps = [
      '🤖 Initializing outline engine for niche: ' + niche + '...',
      '🔍 Querying core audience pain points: "' + problem.substring(0, 40) + '..."',
      '💡 Drafting a high-ticket 5-module transformative syllabus layout...',
      '🛠️ Formulating module lesson titles and objectives...',
      '🎁 Engineering bonuses based on value-stacking frameworks...',
      '✨ Generating complete interactive workspace outline!'
    ];
    setAiSteps(steps);

    // Progressive step logging
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setCurrentStepIdx(currentStep);
      } else {
        clearInterval(interval);
        
        // Final generation output
        const outlineResult: ProductOutline = {
          id: `outline-${Date.now()}`,
          name: name,
          niche: niche,
          audience: audience,
          problem: problem,
          promise: promise,
          price: price,
          bonuses: bonuses,
          createdDate: new Date().toISOString(),
          modules: niche === 'Wellness' ? [
            {
              id: 'm1',
              title: 'Module 1: Calibrating the Nervous System',
              lessons: [
                'Lesson 1.1: The Biology of Burnout & Stress Feedback Loops',
                'Lesson 1.2: 4-7-8 Breathing Mechanics for Instant Vagus Nerve Stimulation',
                'Lesson 1.3: Setting Up Your Off-Grid Mental Sabbatical Zone'
              ]
            },
            {
              id: 'm2',
              title: 'Module 2: Overcoming Cognitive Overload',
              lessons: [
                'Lesson 2.1: Audit Your Digital Noise Footprint',
                'Lesson 2.2: Task Chunking Systems for High-Stress Deliverables',
                'Lesson 2.3: Building Your Evening Cortisol Shutdown Protocol'
              ]
            },
            {
              id: 'm3',
              title: 'Module 3: Restorative Sleep & Circadian Recovery',
              lessons: [
                'Lesson 3.1: Re-engineering Your Sleep Hygiene Environment',
                'Lesson 3.2: Defeating Mid-Night Brain Racing & Panic',
                'Lesson 3.3: Rapid Rest Recharge Protocols for Deep Fatigue Recovery'
              ]
            },
            {
              id: 'm4',
              title: 'Module 4: Sustainable Boundary Optimization',
              lessons: [
                'Lesson 4.1: The Art of the Polite Boundary (Scripts for Managers)',
                'Lesson 4.2: Designing an Energy Audit Spreadsheet Dashboard',
                'Lesson 4.3: 15-Minute Daily Resilience Maintenance Cycles'
              ]
            }
          ] : [
            {
              id: 'm1',
              title: 'Module 1: Niche Discovery & Problem Validation',
              lessons: [
                'Lesson 1.1: Deconstructing High-Ticket Niche Frustrations',
                'Lesson 1.2: Conducting the 15-Minute Audience Validation Call',
                'Lesson 1.3: Creating Your MVP Offer Framework Card'
              ]
            },
            {
              id: 'm2',
              title: 'Module 2: Building Your High-Converting Sales Funnel',
              lessons: [
                'Lesson 2.1: Designing Your Hook, Story, and Offer Landing Script',
                'Lesson 2.2: Configuring Stripe and Order Bump Checkout Banners',
                'Lesson 2.3: Creating Your Opt-in Lead Magnet Squeeze Tunnel'
              ]
            },
            {
              id: 'm3',
              title: 'Module 3: Cold Email & LinkedIn Outbound Sourcing',
              lessons: [
                'Lesson 3.1: SCRAPE: Finding Lead Targets in 5 High-Value Channels',
                'Lesson 3.2: Pitching without Pitching (The Curiosity Blueprint)',
                'Lesson 3.3: Managing Your First 100 Lead Pipeline Dashboard'
              ]
            },
            {
              id: 'm4',
              title: 'Module 4: Closing Trials & Scaling Value Delivery',
              lessons: [
                'Lesson 4.1: The 20-Minute Strategy Session Script That Closes',
                'Lesson 4.2: Onboarding Premium Clients with Stellar Initial Audits',
                'Lesson 4.3: Establishing Your Growth Flywheel & Referral Systems'
              ]
            }
          ]
        };

        setGeneratedOutline(outlineResult);
        setLoading(false);
      }
    }, 600);
  };

  // Save Syllabus
  const handleSaveWorkspaceOutline = () => {
    if (generatedOutline) {
      onSaveOutline(generatedOutline);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Add Module dynamically
  const handleAddModule = () => {
    if (generatedOutline) {
      const newModule = {
        id: `mod-${Date.now()}`,
        title: `Module ${generatedOutline.modules.length + 1}: Custom Created Module`,
        lessons: ['Lesson 1: Enter lesson name...']
      };
      setGeneratedOutline({
        ...generatedOutline,
        modules: [...generatedOutline.modules, newModule]
      });
    }
  };

  // Delete Module
  const handleDeleteModule = (modId: string) => {
    if (generatedOutline) {
      setGeneratedOutline({
        ...generatedOutline,
        modules: generatedOutline.modules.filter(m => m.id !== modId)
      });
    }
  };

  // Update Module Title
  const handleUpdateModuleTitle = (modId: string, title: string) => {
    if (generatedOutline) {
      setGeneratedOutline({
        ...generatedOutline,
        modules: generatedOutline.modules.map(m => m.id === modId ? { ...m, title } : m)
      });
    }
  };

  // Add Lesson dynamically
  const handleAddLesson = (modId: string) => {
    if (generatedOutline) {
      setGeneratedOutline({
        ...generatedOutline,
        modules: generatedOutline.modules.map(m => {
          if (m.id === modId) {
            return {
              ...m,
              lessons: [...m.lessons, `Lesson ${m.lessons.length + 1}: Custom New Lesson`]
            };
          }
          return m;
        })
      });
    }
  };

  // Update Lesson Text
  const handleUpdateLesson = (modId: string, lessonIdx: number, text: string) => {
    if (generatedOutline) {
      setGeneratedOutline({
        ...generatedOutline,
        modules: generatedOutline.modules.map(m => {
          if (m.id === modId) {
            const lessons = [...m.lessons];
            lessons[lessonIdx] = text;
            return { ...m, lessons };
          }
          return m;
        })
      });
    }
  };

  // Delete Lesson
  const handleDeleteLesson = (modId: string, lessonIdx: number) => {
    if (generatedOutline) {
      setGeneratedOutline({
        ...generatedOutline,
        modules: generatedOutline.modules.map(m => {
          if (m.id === modId) {
            return {
              ...m,
              lessons: m.lessons.filter((_, idx) => idx !== lessonIdx)
            };
          }
          return m;
        })
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">AI Product Outline Builder</h2>
          <p className="text-slate-500 text-sm">Design structured, premium courses and syllabus guides tailored to convert your visitors into clients.</p>
        </div>
        <button 
          onClick={() => onNavigate('contentStudio')}
          className="px-4 py-2 bg-white border border-slate-200 text-teal-600 font-semibold text-xs rounded-xl flex items-center gap-1 hover:bg-slate-50 transition-colors shadow-sm"
          id="btn-navigate-to-content"
        >
          Open Content Studio <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-700">Product Blueprint Input</h3>
            
            {/* Template shortcuts */}
            <div className="flex gap-2">
              <button 
                onClick={loadWellnessTemplate}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-semibold rounded-lg hover:bg-emerald-100 transition-all"
                id="btn-load-wellness-template"
              >
                + Wellness
              </button>
              <button 
                onClick={loadBusinessTemplate}
                className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-semibold rounded-lg hover:bg-purple-100 transition-all"
                id="btn-load-business-template"
              >
                + Business
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Product Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. 21-Day Stress Reset Program"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
                id="input-builder-name"
              />
            </div>

            {/* Niche & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Niche</label>
                <select 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors"
                  id="select-builder-niche"
                >
                  <option value="Wellness">Wellness</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Suggested Price ($)</label>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="47"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors"
                  id="input-builder-price"
                />
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Target Audience Persona</label>
              <input 
                type="text" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Busy Corporate Managers & Executives"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
                id="input-builder-audience"
              />
            </div>

            {/* Problem */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Core Frustration / Problem</label>
              <textarea 
                rows={2}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g. Chronic exhaustion, panic attacks, and sleep depletion due to extreme overwork."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400 resize-none"
                id="input-builder-problem"
              />
            </div>

            {/* Promise */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Core Solution / Product Promise</label>
              <textarea 
                rows={2}
                value={promise}
                onChange={(e) => setPromise(e.target.value)}
                placeholder="e.g. Recalibrate your nervous system and sleep 8 full hours with an active 15-minute daily cycle."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400 resize-none"
                id="input-builder-promise"
              />
            </div>

            {/* Bonuses */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Value-Stacking Bonuses</label>
              <div className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  value={newBonus}
                  onChange={(e) => setNewBonus(e.target.value)}
                  placeholder="Add high-value bonus (e.g. Meditation MP3)..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
                  id="input-builder-new-bonus"
                />
                <button 
                  onClick={handleAddBonus}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-750 font-semibold text-xs transition-all"
                  id="btn-builder-add-bonus"
                >
                  Add
                </button>
              </div>

              <div className="space-y-1.5">
                {bonuses.map((bonus, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px]">
                    <span className="text-slate-700 font-medium">🎁 {bonus}</span>
                    <button 
                      onClick={() => handleRemoveBonus(idx)}
                      className="p-1 rounded text-red-500 hover:bg-red-50"
                      id={`btn-builder-remove-bonus-${idx}`}
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateOutline}
            disabled={loading}
            className="w-full py-4 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-sm shadow-teal-600/10"
            id="btn-builder-trigger-generate"
          >
            <Sparkles className="w-4 h-4 fill-current text-white animate-pulse" />
            {loading ? 'Simulating Outline Model...' : 'Generate Product Outline'}
          </button>
        </div>

        {/* Right Preview/Editor Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden min-h-[500px] flex flex-col justify-between shadow-sm">
          <AnimatePresence mode="wait">
            {loading ? (
              /* Simulated AI loading stream */
              <motion.div 
                key="loading-ai"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-8 flex flex-col justify-center items-center space-y-6"
              >
                <RefreshCw className="w-10 h-10 text-teal-600 animate-spin" />
                <div className="text-center max-w-sm space-y-2">
                  <h4 className="text-slate-900 font-bold text-sm">Simulating AI Co-founder Engine</h4>
                  <p className="text-slate-500 text-xs">ProductFlow compiles premium curriculum matrices based on high-ticket educational design guidelines.</p>
                </div>

                {/* Progress list */}
                <div className="w-full max-w-xs space-y-2 text-left bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {aiSteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`text-[11px] font-mono leading-relaxed transition-all ${
                        idx === currentStepIdx ? 'text-teal-700 font-semibold' :
                        idx < currentStepIdx ? 'text-slate-400 line-through' : 'text-slate-300'
                      }`}
                    >
                      {idx < currentStepIdx ? '✓ ' : idx === currentStepIdx ? '⚡ ' : '• '} {step}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : generatedOutline ? (
              /* High-fidelity course curriculum editor */
              <motion.div 
                key="outline-editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[560px]"
              >
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-teal-600 font-semibold uppercase">SYLLABUS OUTLINE EDITOR</span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{generatedOutline.name}</h3>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={handleAddModule}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-teal-600 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                      id="btn-outline-add-module"
                    >
                      <Plus className="w-3.5 h-3.5" /> Module
                    </button>
                    <button 
                      onClick={handleSaveWorkspaceOutline}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors shadow-sm"
                      id="btn-outline-save-workspace"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Workspace
                    </button>
                  </div>
                </div>

                {/* Save Toast */}
                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Saved outline successfully! You can access this in your saved content records.</span>
                  </div>
                )}

                {/* Module Blocks */}
                <div className="space-y-6">
                  {generatedOutline.modules.map((mod) => (
                    <div key={mod.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative group shadow-sm">
                      {/* Delete module block */}
                      <button 
                        onClick={() => handleDeleteModule(mod.id)}
                        className="absolute right-3 top-3 p-1.5 rounded-lg bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        title="Delete Module"
                        id={`btn-outline-delete-module-${mod.id}`}
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>

                      {/* Module Title input */}
                      <input 
                        type="text" 
                        value={mod.title}
                        onChange={(e) => handleUpdateModuleTitle(mod.id, e.target.value)}
                        className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-teal-500 font-bold text-sm text-slate-900 focus:outline-none w-5/6 pb-1 transition-all"
                        id={`input-outline-module-title-${mod.id}`}
                      />

                      {/* Lessons Stack */}
                      <div className="space-y-2 pl-2 border-l-2 border-teal-500/20">
                        {mod.lessons.map((lesson, lessonIdx) => (
                          <div key={lessonIdx} className="flex gap-2 items-center group/lesson">
                            <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <input 
                              type="text" 
                              value={lesson}
                              onChange={(e) => handleUpdateLesson(mod.id, lessonIdx, e.target.value)}
                              className="bg-transparent text-slate-750 text-xs focus:outline-none border-b border-transparent hover:border-slate-200 focus:border-teal-500 flex-1 py-0.5 transition-all"
                              id={`input-outline-lesson-title-${mod.id}-${lessonIdx}`}
                            />
                            <button 
                              onClick={() => handleDeleteLesson(mod.id, lessonIdx)}
                              className="p-1 text-slate-400 hover:text-red-600 opacity-0 group-hover/lesson:opacity-100"
                              id={`btn-outline-delete-lesson-${mod.id}-${lessonIdx}`}
                            >
                              <Trash className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add Lesson */}
                      <button 
                        onClick={() => handleAddLesson(mod.id)}
                        className="text-[10px] text-teal-600 font-mono flex items-center gap-1 hover:text-teal-700 pl-2 mt-2"
                        id={`btn-outline-add-lesson-${mod.id}`}
                      >
                        + Add Lesson
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Empty Placeholder */
              <div className="flex-1 p-8 flex flex-col justify-center items-center text-center space-y-4">
                <ClipboardList className="w-12 h-12 text-slate-300" />
                <div className="max-w-xs space-y-1">
                  <h4 className="text-slate-800 font-semibold text-sm">Design Your Syllabus</h4>
                  <p className="text-slate-500 text-xs">Fill out the blueprint details on the left, or use a template shortcut, then click Generate to create your interactive product outline.</p>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Bottom Info Banner */}
          <div className="bg-slate-50 p-4 border-t border-slate-100 text-slate-500 text-xs flex items-center gap-2 justify-center">
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Ready to formulate content? Jump to Content Studio next.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
