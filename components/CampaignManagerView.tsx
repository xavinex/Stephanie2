'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  DollarSign, 
  MousePointerClick, 
  Users, 
  Percent, 
  SlidersHorizontal, 
  Check, 
  ToggleLeft, 
  ToggleRight,
  RefreshCw,
  Megaphone,
  Sparkles
} from 'lucide-react';
import { Campaign, AppState } from '@/lib/demoState';

interface CampaignManagerViewProps {
  state: AppState;
  onUpdateCampaigns: (campaigns: Campaign[]) => void;
}

export default function CampaignManagerView({ state, onUpdateCampaigns }: CampaignManagerViewProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempBudget, setTempBudget] = useState(0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  // Toggle active/inactive status
  const handleToggleActive = (id: string) => {
    const campaigns = state.campaigns.map(c => {
      if (c.id === id) {
        const nextActive = !c.active;
        // If inactive, spend is zeroed. If active, we restore default mock spend.
        let spend = c.spend;
        if (!nextActive) {
          spend = 0;
        } else {
          // Restore default spend value
          if (c.channel === 'Meta Ads') spend = 3200;
          else if (c.channel === 'Google Ads') spend = 2100;
          else if (c.channel === 'TikTok') spend = 1500;
          else if (c.channel === 'Instagram Influencers') spend = 1200;
          else if (c.channel === 'Email Newsletter') spend = 200;
          else spend = 400;
        }
        
        // Recalculate leads, sales, revenue based on spend changes
        const clicks = Math.floor(spend * (c.clicks / (c.spend || 1)));
        const leads = Math.floor(clicks * 0.15);
        const sales = Math.floor(leads * 0.13);
        const revenue = sales * 47; // Default $47 wellness program value
        const cac = sales > 0 ? Number((spend / sales).toFixed(2)) : 0;
        const roas = spend > 0 ? Number((revenue / spend).toFixed(2)) : 0;

        return {
          ...c,
          active: nextActive,
          spend,
          clicks,
          leads,
          sales,
          revenue,
          cac,
          roas
        };
      }
      return c;
    });
    onUpdateCampaigns(campaigns);
  };

  // Adjust budget & recalculate mock stats dynamically
  const startEditBudget = (c: Campaign) => {
    setEditingId(c.id);
    setTempBudget(c.spend);
  };

  const saveBudgetEdit = (id: string) => {
    const campaigns = state.campaigns.map(c => {
      if (c.id === id) {
        const spend = Number(tempBudget);
        
        // Dynamic simulations (Clicks scale with spend; conversions follow constant funnel math)
        const clicks = Math.floor(spend * 3.75); // 3.75 clicks per dollar spent
        const leads = Math.floor(clicks * 0.15); // 15% opt-in
        const sales = Math.floor(leads * 0.13); // 13% buy
        const revenue = sales * 47; // $47 course sale
        const cac = sales > 0 ? Number((spend / sales).toFixed(2)) : 0;
        const roas = spend > 0 ? Number((revenue / spend).toFixed(2)) : 0;

        return {
          ...c,
          spend,
          clicks,
          leads,
          sales,
          revenue,
          cac,
          roas
        };
      }
      return c;
    });
    onUpdateCampaigns(campaigns);
    setEditingId(null);
  };

  // Blended values
  const activeCampaigns = state.campaigns.filter(c => c.active);
  const totalSpend = activeCampaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalClicks = activeCampaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalLeads = activeCampaigns.reduce((acc, c) => acc + c.leads, 0);
  const totalSales = activeCampaigns.reduce((acc, c) => acc + c.sales, 0);
  const totalRevenue = activeCampaigns.reduce((acc, c) => acc + c.revenue, 0);
  
  const blendedCac = totalSales > 0 ? (totalSpend / totalSales) : 0;
  const blendedRoas = totalSpend > 0 ? (totalRevenue / totalSpend) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900">Campaign Manager</h2>
        <p className="text-slate-500 text-sm">Review, pause, and simulate marketing performance indicators across organic and paid channels.</p>
      </div>

      {/* Blended Metrics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ad Spend */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Total Spent</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1.5 block">{formatCurrency(totalSpend)}</span>
          <span className="text-[10px] text-slate-500 mt-1 block">Active marketing budgets</span>
        </div>

        {/* Lead Acquisitions */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Leads Captured</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 mt-1.5 block">{totalLeads.toLocaleString()}</span>
          <span className="text-[10px] text-slate-500 mt-1 block">Avg conversion: 15%</span>
        </div>

        {/* Blended CAC */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Blended CAC</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-teal-600 mt-1.5 block">{formatCurrency(blendedCac)}</span>
          <span className="text-[10px] text-slate-500 mt-1 block">Acquisition cost index</span>
        </div>

        {/* Blended ROAS */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Blended ROAS</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-purple-600 mt-1.5 block">{blendedRoas.toFixed(2)}x</span>
          <span className="text-[10px] text-slate-500 mt-1 block">Total Ad Return ratio</span>
        </div>
      </div>

      {/* Campaign List Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">Acquisition Channels</h3>
          
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span>Interactive sandbox recalculations active</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                <th className="py-4 px-6">Channel</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Spend</th>
                <th className="py-4 px-4">Clicks</th>
                <th className="py-4 px-4">Leads</th>
                <th className="py-4 px-4">Sales</th>
                <th className="py-4 px-4">ROAS</th>
                <th className="py-4 px-4 text-right pr-6">Budget Slider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-650">
              {state.campaigns.map((c) => (
                <tr key={c.id} className={`hover:bg-slate-50/50 transition-colors ${!c.active ? 'opacity-50' : ''}`}>
                  {/* Channel Name */}
                  <td className="py-4 px-6 font-semibold text-slate-900 flex items-center gap-2.5">
                    <Megaphone className="w-4 h-4 text-slate-400" />
                    {c.channel}
                  </td>

                  {/* Active Toggle */}
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => handleToggleActive(c.id)}
                      className="text-slate-300 hover:text-slate-600 transition-colors"
                      id={`btn-toggle-campaign-${c.id}`}
                    >
                      {c.active ? (
                        <ToggleRight className="w-9 h-9 text-teal-600 fill-current" />
                      ) : (
                        <ToggleLeft className="w-9 h-9 text-slate-300 fill-current" />
                      )}
                    </button>
                  </td>

                  {/* Spend */}
                  <td className="py-4 px-4 font-mono font-medium">
                    {editingId === c.id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">$</span>
                        <input 
                          type="number"
                          value={tempBudget}
                          onChange={(e) => setTempBudget(Number(e.target.value))}
                          className="w-20 bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-900 focus:outline-none focus:border-teal-500"
                          id={`input-campaign-budget-${c.id}`}
                        />
                        <button 
                          onClick={() => saveBudgetEdit(c.id)}
                          className="p-1.5 bg-teal-50 border border-teal-200 text-teal-700 rounded"
                          id={`btn-save-campaign-budget-${c.id}`}
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 group/edit">
                        <span className="text-slate-900">{formatCurrency(c.spend)}</span>
                        {c.active && (
                          <button 
                            onClick={() => startEditBudget(c)}
                            className="p-1 rounded bg-slate-100 text-slate-500 hover:text-slate-900 opacity-0 group-hover/edit:opacity-100 transition-opacity"
                            id={`btn-edit-campaign-budget-${c.id}`}
                          >
                            <SlidersHorizontal className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Clicks */}
                  <td className="py-4 px-4 font-mono">{c.clicks.toLocaleString()}</td>

                  {/* Leads */}
                  <td className="py-4 px-4 font-mono text-teal-600 font-semibold">{c.leads.toLocaleString()}</td>

                  {/* Sales */}
                  <td className="py-4 px-4 font-mono text-emerald-600 font-semibold">{c.sales.toLocaleString()}</td>

                  {/* ROAS */}
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      c.roas >= 3 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      c.roas >= 2 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}>
                      {c.roas}x ROAS
                    </span>
                  </td>

                  {/* Slider Control */}
                  <td className="py-4 px-4 text-right pr-6 max-w-[140px]">
                    {c.active && (
                      <input 
                        type="range"
                        min="0"
                        max="8000"
                        step="100"
                        value={editingId === c.id ? tempBudget : c.spend}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (editingId === c.id) {
                            setTempBudget(val);
                          } else {
                            // Instant slide update
                            const campaigns = state.campaigns.map(camp => {
                              if (camp.id === c.id) {
                                const clicks = Math.floor(val * 3.75);
                                const leads = Math.floor(clicks * 0.15);
                                const sales = Math.floor(leads * 0.13);
                                const revenue = sales * 47;
                                const cac = sales > 0 ? Number((val / sales).toFixed(2)) : 0;
                                const roas = val > 0 ? Number((revenue / val).toFixed(2)) : 0;
                                return {
                                  ...camp,
                                  spend: val,
                                  clicks,
                                  leads,
                                  sales,
                                  revenue,
                                  cac,
                                  roas
                                };
                              }
                              return camp;
                            });
                            onUpdateCampaigns(campaigns);
                          }
                        }}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        id={`slider-campaign-${c.id}`}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
