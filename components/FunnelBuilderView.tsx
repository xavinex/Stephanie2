'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, 
  ArrowDown, 
  Trash, 
  Copy, 
  Plus, 
  Edit2, 
  Zap, 
  FileText, 
  ShoppingBag, 
  CreditCard, 
  Sparkles, 
  Mail, 
  Check, 
  Gift,
  HelpCircle,
  X
} from 'lucide-react';
import { FunnelStage, AppState } from '@/lib/demoState';

interface FunnelBuilderViewProps {
  state: AppState;
  onUpdateFunnelStages: (stages: FunnelStage[]) => void;
  onNavigate: (view: string) => void;
}

export default function FunnelBuilderView({ state, onUpdateFunnelStages, onNavigate }: FunnelBuilderViewProps) {
  const [editingStage, setEditingStage] = useState<FunnelStage | null>(null);
  const [editName, setEditName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form for adding stage
  const [addName, setAddName] = useState('');
  const [addType, setAddType] = useState<FunnelStage['type']>('landing');

  const getStageIcon = (type: FunnelStage['type']) => {
    switch (type) {
      case 'landing': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'sales': return <ShoppingBag className="w-5 h-5 text-violet-600" />;
      case 'checkout': return <CreditCard className="w-5 h-5 text-teal-600" />;
      case 'bump': return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'upsell': return <ArrowUp className="w-5 h-5 text-emerald-600" />;
      case 'downsell': return <ArrowDown className="w-5 h-5 text-orange-600" />;
      case 'thanks': return <Gift className="w-5 h-5 text-pink-600" />;
      case 'email': return <Mail className="w-5 h-5 text-sky-600" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  // Reorder: Move Up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const stages = [...state.funnelStages];
    const temp = stages[index];
    stages[index] = stages[index - 1];
    stages[index - 1] = temp;
    onUpdateFunnelStages(stages);
  };

  // Reorder: Move Down
  const handleMoveDown = (index: number) => {
    if (index === state.funnelStages.length - 1) return;
    const stages = [...state.funnelStages];
    const temp = stages[index];
    stages[index] = stages[index + 1];
    stages[index + 1] = temp;
    onUpdateFunnelStages(stages);
  };

  // Duplicate Stage
  const handleDuplicate = (index: number) => {
    const stageToCopy = state.funnelStages[index];
    const newStage: FunnelStage = {
      ...stageToCopy,
      id: `stage-${Date.now()}`,
      name: `${stageToCopy.name} (Copy)`,
      visitors: Math.floor(stageToCopy.visitors * 0.9),
      conversions: Math.floor(stageToCopy.conversions * 0.9),
    };
    
    const stages = [...state.funnelStages];
    stages.splice(index + 1, 0, newStage);
    onUpdateFunnelStages(stages);
  };

  // Delete Stage
  const handleDelete = (id: string) => {
    if (state.funnelStages.length <= 2) {
      alert('Your funnel must contain at least a Landing step and a Thank-You step!');
      return;
    }
    const stages = state.funnelStages.filter(s => s.id !== id);
    onUpdateFunnelStages(stages);
  };

  // Trigger inline name edit
  const triggerEdit = (stage: FunnelStage) => {
    setEditingStage(stage);
    setEditName(stage.name);
  };

  // Save Name Edit
  const handleSaveEdit = () => {
    if (editingStage) {
      const stages = state.funnelStages.map(s => 
        s.id === editingStage.id ? { ...s, name: editName } : s
      );
      onUpdateFunnelStages(stages);
      setEditingStage(null);
    }
  };

  // Add Stage Modal submit
  const handleAddStageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) return;

    // Estimate mock visitors based on last step
    const lastStage = state.funnelStages[state.funnelStages.length - 1];
    const baseVisitors = lastStage ? lastStage.visitors : 1000;
    
    const newStage: FunnelStage = {
      id: `stage-${Date.now()}`,
      name: addName.trim(),
      type: addType,
      visitors: baseVisitors,
      conversions: Math.floor(baseVisitors * 0.25), // 25% conversions by default
      rate: 25
    };

    onUpdateFunnelStages([...state.funnelStages, newStage]);
    setAddName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 relative">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">Visual Funnel Studio</h2>
          <p className="text-slate-500 text-sm">Organize customer progression stages. Reorder, duplicate steps, and launch a test transaction sandbox.</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm"
            id="btn-add-funnel-step"
          >
            <Plus className="w-4 h-4 text-teal-600" /> Add Funnel Step
          </button>
          <button 
            onClick={() => onNavigate('checkout')}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/10 transition-all flex items-center gap-1.5 hover:scale-[1.01]"
            id="btn-launch-checkout-sandbox"
          >
            <Zap className="w-4 h-4 fill-current text-white animate-pulse" /> Test Checkout Sandbox
          </button>
        </div>
      </div>

      {/* Visual Funnel Stage Grid */}
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence initial={false}>
          {state.funnelStages.map((stage, idx) => (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 group/card relative hover:border-slate-300 transition-all shadow-sm shadow-slate-100/50"
            >
              {/* Left Side: Drag/Icon/Titles */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* UP / DOWN Controls */}
                <div className="flex flex-col gap-1 shrink-0">
                  <button 
                    disabled={idx === 0}
                    onClick={() => handleMoveUp(idx)}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 disabled:opacity-20 disabled:hover:bg-transparent"
                    id={`btn-funnel-up-${idx}`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    disabled={idx === state.funnelStages.length - 1}
                    onClick={() => handleMoveDown(idx)}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 disabled:opacity-20 disabled:hover:bg-transparent"
                    id={`btn-funnel-down-${idx}`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Type Icon */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  {getStageIcon(stage.type)}
                </div>

                {/* Stage Info (and editable name) */}
                <div className="flex-1 min-w-[140px]">
                  {editingStage?.id === stage.id ? (
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                        id="input-edit-stage-name"
                      />
                      <button 
                        onClick={handleSaveEdit}
                        className="p-1 rounded bg-teal-50 text-teal-700 border border-teal-200"
                        id="btn-save-stage-name"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">{stage.name}</h4>
                      <button 
                        onClick={() => triggerEdit(stage)}
                        className="p-1 text-slate-400 hover:text-slate-700 opacity-0 group-hover/card:opacity-100 transition-opacity"
                        id={`btn-edit-stage-trigger-${idx}`}
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{stage.type} page</span>
                </div>
              </div>

              {/* Middle Section: Math metrics */}
              <div className="flex gap-8 text-center text-xs w-full sm:w-auto justify-around border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase">Traffic</span>
                  <span className="font-semibold text-slate-900 font-mono">{stage.visitors.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase">Conversions</span>
                  <span className="font-semibold text-emerald-600 font-mono">{stage.conversions.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase">Conv. Rate</span>
                  <span className="font-semibold text-teal-600 font-mono">{stage.rate || ((stage.conversions / stage.visitors) * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* Right Side: Copy/Trash Operations */}
              <div className="flex gap-2 shrink-0 self-end sm:self-center">
                <button 
                  onClick={() => handleDuplicate(idx)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                  title="Duplicate Step"
                  id={`btn-funnel-duplicate-${idx}`}
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(stage.id)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 text-slate-400 hover:text-red-600 transition-colors"
                  title="Delete Step"
                  id={`btn-funnel-delete-${idx}`}
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Stage Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-900">Create Funnel Stage</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                id="btn-close-add-modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStageSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Stage Title</label>
                <input 
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="e.g. Stress Relief Workbook Offer (Bump)"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500 placeholder:text-slate-400"
                  id="input-add-stage-name"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-500 mb-1.5">Stage Target Type</label>
                <select
                  value={addType}
                  onChange={(e) => setAddType(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-teal-500"
                  id="select-add-stage-type"
                >
                  <option value="landing">Opt-In Landing Page</option>
                  <option value="sales">Premium Sales Page</option>
                  <option value="checkout">Optimized Checkout</option>
                  <option value="bump">Order Bump offer</option>
                  <option value="upsell">Upsell offer</option>
                  <option value="downsell">Downsell offer</option>
                  <option value="thanks">Thank-You receipt page</option>
                  <option value="email">Follow-up email sequence</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors"
                id="btn-add-stage-submit"
              >
                Insert Stage in Funnel List
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
