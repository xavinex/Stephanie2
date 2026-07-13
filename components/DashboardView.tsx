'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  UserCheck, 
  Percent, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  CircleAlert, 
  Zap, 
  Users 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';
import { AppState } from '@/lib/demoState';

interface DashboardViewProps {
  state: AppState;
  onNavigate: (view: string) => void;
}

export default function DashboardView({ state, onNavigate }: DashboardViewProps) {
  // Format currencies helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  // Prepare chart data based on history
  const revenueChartData = [
    { date: 'Jul 07', Revenue: 18200, Conversions: 380 },
    { date: 'Jul 08', Revenue: 19400, Conversions: 410 },
    { date: 'Jul 09', Revenue: 20100, Conversions: 430 },
    { date: 'Jul 10', Revenue: 21600, Conversions: 460 },
    { date: 'Jul 11', Revenue: 22800, Conversions: 490 },
    { date: 'Jul 12', Revenue: 23900, Conversions: 510 },
    { date: 'Jul 13', Revenue: state.revenue, Conversions: state.salesCount },
  ];

  const campaignSummaryData = state.campaigns.slice(0, 3).map(c => ({
    name: c.channel,
    roas: c.roas,
    revenue: c.revenue
  }));

  // Dynamic products count
  const activeProducts = state.products.filter(p => p.status === 'Active').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Alert Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-teal-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-teal-50 border border-teal-100 text-teal-700 text-[10px] font-semibold uppercase font-mono">LIVE SIMULATION</span>
            <span className="text-slate-500 text-xs font-mono">• Active Creator Profile</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">Welcome back, Demo Creator</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Manage your wellness and business niche digital assets in one unified console.</p>
        </div>
        <button 
          onClick={() => onNavigate('checkout')}
          className="relative z-10 px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 shadow-md shadow-slate-950/10 transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] shrink-0 self-start sm:self-center"
          id="dashboard-btn-test-checkout"
        >
          <Zap className="w-4 h-4 fill-current text-white" /> Test Checkout Flow
        </button>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Revenue */}
        <div className="col-span-2 bg-white border border-slate-200 shadow-sm p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium font-mono uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              {formatCurrency(state.revenue)}
            </span>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this week</span>
            </div>
          </div>
        </div>

        {/* Sales */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium font-mono uppercase tracking-wider">Sales</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
              {state.salesCount}
            </span>
            <p className="text-slate-500 text-[10px] font-mono mt-1">Orders processed</p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium font-mono uppercase tracking-wider">CR</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
              {state.conversionRate}%
            </span>
            <p className="text-slate-500 text-[10px] font-mono mt-1">Opt-in to Sale</p>
          </div>
        </div>

        {/* CAC */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium font-mono uppercase tracking-wider">CAC</span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
              {formatCurrency(state.cac)}
            </span>
            <p className="text-slate-500 text-[10px] font-mono mt-1">Acquisition cost</p>
          </div>
        </div>

        {/* ROAS */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium font-mono uppercase tracking-wider">ROAS</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
              {state.roas}x
            </span>
            <p className="text-slate-500 text-[10px] font-mono mt-1">Return on Ads</p>
          </div>
        </div>
      </div>

      {/* Main Charts & Actionables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Revenue Growth Overview</h3>
              <p className="text-slate-500 text-xs">Simulated live trend showing 7-day conversion values</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-teal-50 border border-teal-100 text-[11px] text-teal-700 font-mono">
              Live Updates
            </span>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', color: '#0F172A', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                  labelStyle={{ color: '#64748B' }}
                />
                <Area type="monotone" dataKey="Revenue" stroke="#0D9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: AI Insights */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-violet-50 text-violet-600">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">AI Copilot Recommendations</h3>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[280px] pr-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-500/40 transition-all text-xs space-y-1.5">
                <div className="flex items-center justify-between text-teal-700 font-semibold font-mono">
                  <span>HIGH CONVERSION OPPORTUNITY</span>
                  <span>94% Niche Match</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Wellness products</strong> are showing massive spike in demand. Plug in the <em>Stress Reset Program</em> and add the workbook bump ($9) to immediately raise AOV.
                </p>
                <button 
                  onClick={() => onNavigate('productBuilder')}
                  className="text-teal-600 hover:text-teal-700 font-mono text-[10px] flex items-center gap-1 transition-colors"
                >
                  Configure Product Syllabus <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-violet-500/40 transition-all text-xs space-y-1.5">
                <div className="flex items-center justify-between text-violet-700 font-semibold font-mono">
                  <span>MARKETING REALLOCATION</span>
                  <span>Spend Optimizer</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Meta Ads <strong>ROAS is at {state.campaigns[0].roas}x</strong>, which outperforms other channels by 20%. Scale Meta budget while pausing underperforming organic networks.
                </p>
                <button 
                  onClick={() => onNavigate('campaigns')}
                  className="text-violet-600 hover:text-violet-700 font-mono text-[10px] flex items-center gap-1 transition-colors"
                >
                  Adjust Campaign Budgets <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500/40 transition-all text-xs space-y-1.5">
                <div className="flex items-center justify-between text-blue-700 font-semibold font-mono">
                  <span>FUNNEL SLIPPAGE DETECTED</span>
                  <span>Stage 3 Checkout</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Checkout page conversion is 58.6%. Increase confidence metrics by adding a refund seal inside the <strong>Funnel Builder</strong>.
                </p>
                <button 
                  onClick={() => onNavigate('funnelBuilder')}
                  className="text-blue-600 hover:text-blue-700 font-mono text-[10px] flex items-center gap-1 transition-colors"
                >
                  Optimize Sales Funnels <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Active Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Recent Sales & Purchases</h3>
              <p className="text-slate-500 text-xs">Simulated payments logged in real-time</p>
            </div>
            <button 
              onClick={() => onNavigate('analytics')}
              className="text-teal-600 hover:text-teal-700 font-semibold text-xs flex items-center gap-1"
            >
              See All Logs <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  <th className="py-3">Customer</th>
                  <th className="py-3">Digital Product</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                {state.transactions.slice(0, 5).map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 font-medium text-slate-900">{tx.customer}</td>
                    <td className="py-3">{tx.product}</td>
                    <td className="py-3 text-emerald-600 font-semibold">{formatCurrency(tx.amount)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        tx.type.includes('All-In') ? 'bg-purple-50 border border-purple-100 text-purple-700' :
                        tx.type.includes('Upsell') ? 'bg-violet-50 border border-violet-100 text-violet-700' :
                        tx.type.includes('Bump') ? 'bg-teal-50 border border-teal-100 text-teal-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Metrics */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Active Marketing Streams</h3>
              <p className="text-slate-500 text-xs">ROAS and clicks across major target channels</p>
            </div>
            <button 
              onClick={() => onNavigate('campaigns')}
              className="text-teal-600 hover:text-teal-700 font-semibold text-xs flex items-center gap-1"
            >
              Campaign Manager <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {state.campaigns.slice(0, 4).map((c) => (
              <div key={c.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{c.channel}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                    <span>Clicks: {c.clicks.toLocaleString()}</span>
                    <span>•</span>
                    <span>Spend: {formatCurrency(c.spend)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold block ${c.roas >= 3 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {c.roas}x ROAS
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Revenue: {formatCurrency(c.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
