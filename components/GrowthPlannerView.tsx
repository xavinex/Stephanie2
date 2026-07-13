"use client";

import { useState, useEffect } from "react";
import { 
  Search, Star, CheckSquare, Square, Plus, Trash2, 
  Sparkles, TrendingUp, DollarSign, Users, Award, CheckCircle2 
} from "lucide-react";

interface SavedProduct {
  id: string;
  niche: string;
  name: string;
  score: number;
  price: number;
  revenueEst: number;
  status: string;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
  day: number;
}

export default function GrowthPlannerView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"research" | "tasks">("research");
  const [researchResult, setResearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);

  // Prepopulated niches for the simulation
  const mockNiches = [
    {
      niche: "Mindfulness Meditation for Tech Leaders",
      score: 92,
      volume: 18400,
      competition: "Medium",
      price: 149,
      revenueEst: 8500,
      description: "High-income wellness demographic searching for digital courses and audio guides with focus-enhancing frameworks.",
    },
    {
      niche: "SaaS Sales Playbook for Solopreneurs",
      score: 88,
      volume: 12500,
      competition: "Low",
      price: 199,
      revenueEst: 11000,
      description: "Fast-growing niche with strong purchase intent. Looking for actionable templates, cold emails, and closing structures.",
    },
    {
      niche: "Postnatal Yoga & Wellness Plan",
      score: 84,
      volume: 24000,
      competition: "Medium",
      price: 79,
      revenueEst: 5400,
      description: "Active community with highly engaged social cohorts. Prefers downloadable checklists and weekly video programs.",
    },
    {
      niche: "Low-Code Business Automation Blueprint",
      score: 95,
      volume: 32000,
      competition: "High",
      price: 249,
      revenueEst: 18500,
      description: "Exceptional demand driven by operation scaling. High willingness to pay for structured checklists and pre-built workflows.",
    }
  ];

  const defaultTasks: Task[] = [
    { id: "1", text: "Conduct competitive analysis on wellness/business templates", completed: true, day: 2 },
    { id: "2", text: "Create structured syllabus module outlines in Syllabus Builder", completed: false, day: 5 },
    { id: "3", text: "Draft landing page headline and sales copywriting hooks", completed: false, day: 10 },
    { id: "4", text: "Set up Checkout checkout payment funnel inside Checkout simulator", completed: false, day: 15 },
    { id: "5", text: "Add mock test product and execute $0 credit card simulation", completed: false, day: 18 },
    { id: "6", text: "Review sales analytics dashboard and download growth reports", completed: false, day: 28 },
  ];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("productflow_saved_products");
    if (saved) {
      setSavedProducts(JSON.parse(saved));
    } else {
      const initial = [
        { id: "init-1", niche: "Mindfulness Meditation for Tech Leaders", name: "Peak Focus Meditation Guide", score: 92, price: 149, revenueEst: 8500, status: "Drafting" }
      ];
      setSavedProducts(initial);
      localStorage.setItem("productflow_saved_products", JSON.stringify(initial));
    }

    const savedTasks = localStorage.getItem("productflow_tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(defaultTasks);
      localStorage.setItem("productflow_tasks", JSON.stringify(defaultTasks));
    }
  }, []);

  // Search logic
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setResearchResult(null);

    setTimeout(() => {
      // Find matching niche or generate a dynamic one
      const found = mockNiches.find(
        n => n.niche.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (found) {
        setResearchResult(found);
      } else {
        // Generate a dynamic, realistic niche based on search term
        const calculatedScore = Math.floor(Math.random() * 25) + 70; // 70 to 95
        const calculatedVolume = Math.floor(Math.random() * 20000) + 3000;
        const calculatedPrice = Math.floor(Math.random() * 150) + 49;
        const compOptions = ["Low", "Medium", "High"];
        const calculatedComp = compOptions[Math.floor(Math.random() * compOptions.length)];

        setResearchResult({
          niche: searchTerm,
          score: calculatedScore,
          volume: calculatedVolume,
          competition: calculatedComp,
          price: calculatedPrice,
          revenueEst: Math.floor((calculatedVolume * 0.008) * calculatedPrice),
          description: `Custom generated profile for wellness and business creators. Shows stable search patterns with moderate commercial intent.`
        });
      }
      setIsSearching(false);
    }, 600);
  };

  // Add a product to saved
  const saveProduct = () => {
    if (!researchResult) return;

    // Check if already exists
    if (savedProducts.some(p => p.niche.toLowerCase() === researchResult.niche.toLowerCase())) {
      alert("This niche is already in your favorites list!");
      return;
    }

    const newProduct: SavedProduct = {
      id: "prod-" + Date.now(),
      niche: researchResult.niche,
      name: `${researchResult.niche} Program`,
      score: researchResult.score,
      price: researchResult.price,
      revenueEst: researchResult.revenueEst,
      status: "Researching"
    };

    const updated = [...savedProducts, newProduct];
    setSavedProducts(updated);
    localStorage.setItem("productflow_saved_products", JSON.stringify(updated));
    
    // Also add to global dashboard products if exists
    const dashboardProds = localStorage.getItem("productflow_dashboard_products");
    if (dashboardProds) {
      const parsed = JSON.parse(dashboardProds);
      parsed.push({
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        sales: 0,
        revenue: 0,
        status: "Active"
      });
      localStorage.setItem("productflow_dashboard_products", JSON.stringify(parsed));
    }

    showToast(`Added "${researchResult.niche}" to your active products!`);
  };

  // Delete product
  const deleteProduct = (id: string) => {
    const updated = savedProducts.filter(p => p.id !== id);
    setSavedProducts(updated);
    localStorage.setItem("productflow_saved_products", JSON.stringify(updated));
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setShowSuccessToast(msg);
    setTimeout(() => {
      setShowSuccessToast(null);
    }, 3000);
  };

  // Add Task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: "task-" + Date.now(),
      text: newTaskText,
      completed: false,
      day: Math.floor(Math.random() * 25) + 1
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("productflow_tasks", JSON.stringify(updated));
    setNewTaskText("");
    showToast("Task added successfully!");
  };

  // Toggle Task
  const toggleTask = (id: string) => {
    const updated = tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem("productflow_tasks", JSON.stringify(updated));
  };

  // Delete Task
  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    localStorage.setItem("productflow_tasks", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-teal-400" />
          <span className="text-sm font-semibold">{showSuccessToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-sans font-bold text-slate-900 tracking-tight">Growth Workspace</h1>
        <p className="text-sm text-slate-500 mt-1">Research product potential, discover niches, and organize your launch objectives.</p>

        {/* View Switches */}
        <div className="flex border-b border-slate-100 mt-6 gap-6">
          <button 
            onClick={() => setActiveTab("research")}
            className={`pb-3 font-semibold text-sm transition-all border-b-2 ${activeTab === "research" ? "border-teal-600 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            Niche Opportunity Research
          </button>
          <button 
            onClick={() => setActiveTab("tasks")}
            className={`pb-3 font-semibold text-sm transition-all border-b-2 ${activeTab === "tasks" ? "border-teal-600 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            Creator Launch Tasks
          </button>
        </div>
      </div>

      {activeTab === "research" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Research Search Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-sans font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-teal-600" />
                Niche Market Discovery
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Enter keyword niches like <span className="italic font-medium">Yoga, Mindfulness, Copywriting, Sales</span>, or click quick options below.
              </p>

              <form onSubmit={handleSearch} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="e.g. Health Coach Blueprint, Meditation audio series..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSearching ? "Searching..." : "Research"}
                </button>
              </form>

              {/* Prepopulated Niches Quick Clicks */}
              <div className="mt-5">
                <span className="text-xs font-semibold text-slate-400 block mb-2">HOT TRENDING SUGGESTIONS:</span>
                <div className="flex flex-wrap gap-2">
                  {mockNiches.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchTerm(m.niche);
                        setResearchResult(m);
                      }}
                      className="bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200/80 hover:border-teal-300 text-xs px-3 py-1.5 rounded-lg transition-colors font-medium text-left"
                    >
                      {m.niche}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Opportunity Results Card */}
            {researchResult && (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
                <div className="bg-teal-50/80 border-b border-teal-100 px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                    <span className="font-sans font-bold text-teal-900 text-base">Opportunity Analysis</span>
                  </div>
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    {researchResult.competition} Competition
                  </span>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-sans font-extrabold text-slate-900">{researchResult.niche}</h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{researchResult.description}</p>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-center">
                      <TrendingUp className="w-5 h-5 text-teal-600 mx-auto mb-1.5" />
                      <div className="text-2xl font-black text-slate-900 font-mono">{researchResult.score}%</div>
                      <div className="text-xs text-slate-400 mt-0.5">Opportunity Score</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-center">
                      <Users className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                      <div className="text-2xl font-black text-slate-900 font-mono">{(researchResult.volume).toLocaleString()}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Monthly Searches</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-center">
                      <DollarSign className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                      <div className="text-2xl font-black text-slate-900 font-mono">${researchResult.price}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Suggested Price</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-center">
                      <Award className="w-5 h-5 text-purple-600 mx-auto mb-1.5" />
                      <div className="text-2xl font-black text-slate-900 font-mono">${(researchResult.revenueEst).toLocaleString()}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Est. Monthly Rev</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={saveProduct}
                      className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-slate-950/10"
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      Save to My Creator Favorites
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Favorites list */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col h-full justify-between">
            <div>
              <h2 className="text-lg font-sans font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                Active Creator List
              </h2>
              <p className="text-xs text-slate-500 mb-6">These products can be simulated in checkouts and tracked on your core sales dashboard.</p>

              <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                {savedProducts.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No active product niches saved yet. Search and save above.
                  </div>
                ) : (
                  savedProducts.map((p) => (
                    <div key={p.id} className="border border-slate-200 rounded-xl p-4 flex justify-between items-start bg-slate-50/50 hover:bg-slate-50 transition-all">
                      <div>
                        <h4 className="font-sans font-bold text-slate-900 text-sm">{p.niche}</h4>
                        <div className="flex gap-3 text-xs text-slate-400 mt-1 font-medium">
                          <span>Price: <span className="text-slate-800 font-mono">${p.price}</span></span>
                          <span>Score: <span className="text-slate-800 font-mono">{p.score}%</span></span>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteProduct(p.id)}
                        className="text-slate-300 hover:text-rose-600 p-1 rounded-lg transition-colors ml-2 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Launch Quicktip */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mt-6 text-xs text-slate-500">
              <span className="font-semibold text-slate-800 block mb-1">Launch Tip:</span>
              Once you save a niche, outline its modules in the builder, then test transaction flows in the checkout playground.
            </div>
          </div>
        </div>
      ) : (
        /* Tasks Planner Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Task List */}
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-sans font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-teal-600" />
              Product Launch Checklist
            </h2>
            <p className="text-xs text-slate-500 mb-6">Manage pre-launch assignments and follow best practice steps to execute a successful digital launch.</p>

            {/* Add Task Form */}
            <form onSubmit={addTask} className="flex gap-2 mb-6">
              <input 
                type="text"
                placeholder="Add new custom launch task (e.g. Draft Instagram promo)..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="flex-1 bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
              />
              <button 
                type="submit"
                className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-4 rounded-xl text-sm transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </form>

            {/* Tasks list */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No tasks configured. Use the form above to add a task.
                </div>
              ) : (
                tasks.map((t) => (
                  <div 
                    key={t.id} 
                    className={`border rounded-xl p-4 flex items-center justify-between transition-all ${t.completed ? "bg-slate-50 border-slate-200/60" : "bg-white border-slate-200 hover:border-slate-300"}`}
                  >
                    <div className="flex items-center gap-3.5 flex-1 cursor-pointer" onClick={() => toggleTask(t.id)}>
                      {t.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded border border-slate-300 shrink-0 hover:border-teal-500" />
                      )}
                      <span className={`text-sm ${t.completed ? "line-through text-slate-400 font-medium" : "text-slate-800 font-semibold"}`}>
                        {t.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-400 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded">
                        Day {t.day}
                      </span>
                      <button 
                        onClick={() => deleteTask(t.id)}
                        className="text-slate-300 hover:text-rose-600 p-1 rounded-lg transition-colors shrink-0"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Launch Stats Card Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="font-sans font-bold text-slate-900 text-sm mb-4">Launch Launch Readiness</h3>
              
              {/* Progress Circle Visual */}
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="34" className="stroke-slate-100 fill-none" strokeWidth="6" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="34" 
                      className="stroke-teal-600 fill-none transition-all duration-500" 
                      strokeWidth="6" 
                      strokeDasharray={2 * Math.PI * 34}
                      strokeDashoffset={(2 * Math.PI * 34) * (1 - (tasks.filter(t => t.completed).length / (tasks.length || 1)))}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-black text-slate-800">
                    {Math.round((tasks.filter(t => t.completed).length / (tasks.length || 1)) * 100)}%
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">
                    {tasks.filter(t => t.completed).length} / {tasks.length} Done
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Complete your remaining launch tasks to optimize sales conversions on launch day.
                  </div>
                </div>
              </div>
            </div>

            {/* System Recommendations */}
            <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="font-sans font-bold text-white text-sm">Launch Recommendations</h4>
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex gap-2">
                  <span className="text-teal-400">●</span>
                  <span><strong>Pricing Optimization</strong>: Products priced in wellness perform 18% better at the $79-$149 sweet spot.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-indigo-400">●</span>
                  <span><strong>Landing Page Copy</strong>: Frame headers to address pain relief (wellness) or speed-to-revenue (business) directly.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
