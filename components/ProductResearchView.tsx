'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  HelpCircle, 
  Check, 
  Plus, 
  ArrowRight, 
  Bookmark, 
  ArrowUpDown, 
  Maximize2, 
  X, 
  SlidersHorizontal 
} from 'lucide-react';
import { Product, AppState } from '@/lib/demoState';

interface ProductResearchViewProps {
  state: AppState;
  onSaveProduct: (product: Partial<Product>) => void;
  onNavigate: (view: string) => void;
}

interface ResearchIdea {
  id: string;
  name: string;
  niche: 'Wellness' | 'Business';
  audience: string;
  problem: string;
  promise: string;
  price: number;
  demandScore: number;
  competitionScore: number;
  monetizationEase: 'High' | 'Medium' | 'Low';
  bonuses: string[];
}

export default function ProductResearchView({ state, onSaveProduct, onNavigate }: ProductResearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<'All' | 'Wellness' | 'Business'>('All');
  const [selectedSort, setSelectedSort] = useState<'demand' | 'price' | 'competition'>('demand');
  const [compareList, setCompareList] = useState<ResearchIdea[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  const marketIdeas: ResearchIdea[] = [
    {
      id: 'idea-1',
      name: '21-Day Stress Reset Program',
      niche: 'Wellness',
      audience: 'Busy Professionals & Managers',
      problem: 'High anxiety, poor sleep, and professional burnout',
      promise: 'Reclaim calm, focus, and energy in 15 minutes a day',
      price: 47,
      demandScore: 94,
      competitionScore: 38,
      monetizationEase: 'High',
      bonuses: ['Sleep Reset Meditation Track', 'Stress Tracker Spreadsheet']
    },
    {
      id: 'idea-2',
      name: 'SaaS Founder Launch Kit',
      niche: 'Business',
      audience: 'Early-stage Tech Founders & Side Hustlers',
      problem: 'Struggling with early product validation and finding first customers',
      promise: 'Validate, build, and land 10 paying users in 30 days',
      price: 97,
      demandScore: 89,
      competitionScore: 55,
      monetizationEase: 'High',
      bonuses: ['10 Cold Outreach Email Templates', 'Product Hunt Launch Checklist']
    },
    {
      id: 'idea-3',
      name: 'Sleep Mastery Toolkit',
      niche: 'Wellness',
      audience: 'Chronic Insomniacs',
      problem: 'Restless nights, overactive mind before bed',
      promise: 'Establish 8 hours of deep restorative sleep without drugs',
      price: 29,
      demandScore: 85,
      competitionScore: 28,
      monetizationEase: 'High',
      bonuses: ['Bedtime Audio Sleepcast']
    },
    {
      id: 'idea-4',
      name: 'AI Agency Automation Blueprint',
      niche: 'Business',
      audience: 'Agency Owners & Freelancers',
      problem: 'Inefficient client operations and repetitive onboarding manual work',
      promise: 'Automate 80% of client delivery using low-code AI systems',
      price: 149,
      demandScore: 96,
      competitionScore: 72,
      monetizationEase: 'Medium',
      bonuses: ['Pre-built Make.com Blueprint Files', 'Client Intake Form Templates']
    },
    {
      id: 'idea-5',
      name: 'Emotional Resilience Playbook',
      niche: 'Wellness',
      audience: 'Remote Workers & Creatives',
      problem: 'Isolation, creative blocks, and self-doubt',
      promise: 'Develop daily mental hygiene systems to maintain peak state',
      price: 19,
      demandScore: 91,
      competitionScore: 20,
      monetizationEase: 'High',
      bonuses: ['Interactive Digital Guided Journal']
    },
    {
      id: 'idea-6',
      name: 'Newsletter Sponsor Vault',
      niche: 'Business',
      audience: 'Newsletter Writers & Bloggers',
      problem: 'Struggling to source, negotiate, and close high-paying ads',
      promise: 'Access 200+ sponsor contacts and copy-paste outreach scripts',
      price: 79,
      demandScore: 88,
      competitionScore: 45,
      monetizationEase: 'High',
      bonuses: ['Sponsorship Outreach Template', 'Pricing Calculator Sheet']
    }
  ];

  // Filtering & Sorting
  const filteredIdeas = marketIdeas
    .filter(idea => {
      const matchSearch = idea.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          idea.audience.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          idea.problem.toLowerCase().includes(searchQuery.toLowerCase());
      const matchNiche = selectedNiche === 'All' || idea.niche === selectedNiche;
      return matchSearch && matchNiche;
    })
    .sort((a, b) => {
      if (selectedSort === 'demand') return b.demandScore - a.demandScore;
      if (selectedSort === 'price') return b.price - a.price;
      if (selectedSort === 'competition') return a.competitionScore - b.competitionScore; // Lower is better
      return 0;
    });

  // Handle Save
  const handleSaveIdea = (idea: ResearchIdea) => {
    onSaveProduct({
      id: `saved-${idea.id}-${Date.now()}`,
      name: idea.name,
      niche: idea.niche,
      audience: idea.audience,
      problem: idea.problem,
      promise: idea.promise,
      price: idea.price,
      demandScore: idea.demandScore,
      competitionScore: idea.competitionScore,
      saved: true,
      status: 'Active',
      bonuses: idea.bonuses
    });

    setSavedSuccessMsg(`Added "${idea.name}" to your active product workspace!`);
    setTimeout(() => setSavedSuccessMsg(null), 4000);
  };

  // Toggle Comparison list
  const toggleCompare = (idea: ResearchIdea) => {
    if (compareList.some(item => item.id === idea.id)) {
      setCompareList(compareList.filter(item => item.id !== idea.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 product ideas at a time.');
        return;
      }
      setCompareList([...compareList, idea]);
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Page Title & Intro */}
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900">Digital Product Opportunity Research</h2>
        <p className="text-slate-500 text-sm">Query and audit hot market opportunities across high-converting Wellness and Business sectors.</p>
      </div>

      {/* Floating alert for saved success */}
      <AnimatePresence>
        {savedSuccessMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 p-4 rounded-xl bg-white border border-emerald-500 text-emerald-800 text-xs shadow-xl flex items-center gap-2.5"
          >
            <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
            <span>{savedSuccessMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-4 justify-between shadow-sm">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords (stress, SaaS, cold email, sleeping)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
            id="input-research-search"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Niche Tabs */}
          <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200/50 flex items-center">
            {['All', 'Wellness', 'Business'].map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedNiche === niche 
                    ? 'bg-white text-slate-900 shadow-sm font-semibold' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                id={`tab-niche-filter-${niche}`}
              >
                {niche}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex items-center gap-2 text-xs text-slate-500 px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="bg-transparent border-none text-slate-700 focus:outline-none cursor-pointer pr-1"
              id="select-sort-options"
            >
              <option value="demand">Sort: Demand Score</option>
              <option value="price">Sort: Suggested Price</option>
              <option value="competition">Sort: Lowest Competition</option>
            </select>
          </div>

          {/* Compare Button */}
          {compareList.length > 0 && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-600/10"
              id="btn-trigger-compare"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Compare ({compareList.length})
            </button>
          )}
        </div>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => {
          const isSavedInWork = state.products.some(p => p.name.toLowerCase() === idea.name.toLowerCase());
          const isInCompare = compareList.some(item => item.id === idea.id);

          return (
            <div 
              key={idea.id} 
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-sm shadow-slate-100/50 group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold ${
                    idea.niche === 'Wellness' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-purple-50 text-purple-700 border border-purple-100'
                  }`}>
                    {idea.niche} Niche
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {/* Compare Checkbox */}
                    <button
                      onClick={() => toggleCompare(idea)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isInCompare 
                          ? 'bg-teal-50 text-teal-700 border-teal-500' 
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
                      }`}
                      title="Add to comparison panel"
                      id={`btn-toggle-compare-${idea.id}`}
                    >
                      <Plus className={`w-3.5 h-3.5 ${isInCompare ? 'rotate-45' : ''} transition-transform`} />
                    </button>
                    
                    {/* Save Button */}
                    <button
                      disabled={isSavedInWork}
                      onClick={() => handleSaveIdea(idea)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isSavedInWork 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800 hover:border-slate-300'
                      }`}
                      id={`btn-save-idea-${idea.id}`}
                    >
                      {isSavedInWork ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">{idea.name}</h3>

                {/* Demand & Competition Circle Gauges */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200 text-center">
                  <div>
                    <div className="relative inline-flex items-center justify-center">
                      {/* Circle path */}
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="#F1F5F9" strokeWidth="3" fill="transparent" />
                        <circle cx="24" cy="24" r="20" stroke="#10B981" strokeWidth="3" fill="transparent" 
                                strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * idea.demandScore) / 100} />
                      </svg>
                      <span className="absolute text-xs font-mono font-bold text-slate-900">{idea.demandScore}</span>
                    </div>
                    <span className="block text-[10px] font-mono text-slate-500 mt-1 uppercase">Demand Score</span>
                  </div>

                  <div>
                    <div className="relative inline-flex items-center justify-center">
                      {/* Circle path */}
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="#F1F5F9" strokeWidth="3" fill="transparent" />
                        <circle cx="24" cy="24" r="20" stroke={idea.competitionScore > 50 ? '#EF4444' : '#F59E0B'} strokeWidth="3" fill="transparent" 
                                strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * idea.competitionScore) / 100} />
                      </svg>
                      <span className="absolute text-xs font-mono font-bold text-slate-900">{idea.competitionScore}</span>
                    </div>
                    <span className="block text-[10px] font-mono text-slate-500 mt-1 uppercase">Competition</span>
                  </div>
                </div>

                {/* Meta details */}
                <div className="space-y-2.5 text-xs text-slate-600">
                  <p><strong className="text-slate-700">Ideal Audience:</strong> {idea.audience}</p>
                  <p><strong className="text-slate-700">Core Solution:</strong> {idea.promise}</p>
                </div>
              </div>

              {/* Pricing & Call to Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">Suggested Retail</span>
                  <span className="text-lg font-bold text-slate-900">${idea.price}</span>
                </div>
                
                <button
                  onClick={() => onNavigate('productBuilder')}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all text-xs font-semibold flex items-center gap-1"
                  id={`btn-build-outline-for-${idea.id}`}
                >
                  Outline Syllabus <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Niche Product Opportunity Comparison</h3>
                <p className="text-slate-500 text-xs">Analyze monetization ease and product potential side-by-side</p>
              </div>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                id="btn-close-compare-modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Table */}
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-mono text-slate-400 uppercase">
                    <th className="pb-4 w-1/4">Metric</th>
                    {compareList.map(item => (
                      <th key={item.id} className="pb-4 px-4 font-semibold text-slate-900">{item.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                  <tr>
                    <td className="py-4 font-semibold text-slate-500">Niche Sector</td>
                    {compareList.map(item => (
                      <td key={item.id} className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          item.niche === 'Wellness' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-purple-50 text-purple-700 border border-purple-100'
                        }`}>
                          {item.niche}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-slate-500">Demand Index</td>
                    {compareList.map(item => (
                      <td key={item.id} className="py-4 px-4 font-bold text-emerald-600">{item.demandScore}/100</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-slate-500">Competition Index</td>
                    {compareList.map(item => (
                      <td key={item.id} className="py-4 px-4 font-bold text-amber-600">{item.competitionScore}/100</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-slate-500">Target Value Price</td>
                    {compareList.map(item => (
                      <td key={item.id} className="py-4 px-4 font-semibold text-slate-900">${item.price}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-slate-500">Target Audience</td>
                    {compareList.map(item => (
                      <td key={item.id} className="py-4 px-4 max-w-[200px] leading-relaxed text-slate-600">{item.audience}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-slate-500">Monetization Ease</td>
                    {compareList.map(item => (
                      <td key={item.id} className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          item.monetizationEase === 'High' ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.monetizationEase}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-right flex justify-between items-center">
              <button
                onClick={() => setCompareList([])}
                className="text-red-500 hover:text-red-600 text-xs font-mono"
                id="btn-clear-compare-list"
              >
                Clear comparison list
              </button>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
                id="btn-close-compare-modal-footer"
              >
                Close Comparison
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
