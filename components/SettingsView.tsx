"use client";

import { useState, useEffect } from "react";
import { Shield, User, CreditCard, CheckCircle2, HelpCircle, Save } from "lucide-react";

export default function SettingsView() {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("demo@productflow.ai");
  const [payout, setPayout] = useState("Stripe");
  const [isSandboxActive, setIsSandboxActive] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("productflow_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setName(parsed.name || "Jane Doe");
      setEmail(parsed.email || "demo@productflow.ai");
    }
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { name, email };
    localStorage.setItem("productflow_user", JSON.stringify(updated));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-sans font-bold text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure profile metrics, mock checkout defaults, and payout options.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-sans font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-teal-600" />
            Profile Configuration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Creator Name
              </label>
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Contact Email
              </label>
              <input 
                type="email"
                disabled
                value={email}
                className="block w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Payments Settings */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-sans font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            Mock Payout Details
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Primary Payout Provider
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Stripe Payouts", "PayPal Business", "Direct Wire Transfer"].map((prov) => (
                <div 
                  key={prov}
                  onClick={() => setPayout(prov)}
                  className={`border rounded-xl p-4 cursor-pointer text-center font-semibold text-sm transition-all select-none ${payout === prov ? "border-slate-900 bg-slate-50 text-slate-950" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                >
                  {prov}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security / Sandbox Switch */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-sans font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Shield className="w-5 h-5 text-purple-600" />
            Simulator Security & Sandboxing
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-slate-900 block">Strict Local Storage Sandboxing</span>
              <span className="text-xs text-slate-500">Persist simulation data strictly inside the local web browser memory cache.</span>
            </div>
            <div 
              onClick={() => setIsSandboxActive(!isSandboxActive)}
              className={`w-12 h-6.5 rounded-full p-0.5 cursor-pointer transition-colors shrink-0 ml-4 ${isSandboxActive ? "bg-teal-600" : "bg-slate-200"}`}
            >
              <div className={`bg-white w-5.5 h-5.5 rounded-full shadow-sm transition-transform ${isSandboxActive ? "translate-x-5.5" : "translate-x-0"}`} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <div className="text-emerald-700 text-sm font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Settings updated successfully
            </div>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-sm flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Save className="w-4.5 h-4.5" /> Save Configurations
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
