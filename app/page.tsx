"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  BarChart3, Search, BookOpen, ShoppingCart, Settings, 
  LogOut, User, Menu, X, Sparkles, TrendingUp, CheckCircle2 
} from "lucide-react";

import LandingPage from "@/components/LandingPage";
import DemoLogin from "@/components/DemoLogin";
import GrowthPlannerView from "@/components/GrowthPlannerView";
import AnalyticsView from "@/components/AnalyticsView";
import CheckoutDemoView from "@/components/CheckoutDemoView";
import WeeklyReportsView from "@/components/WeeklyReportsView";
import SettingsView from "@/components/SettingsView";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"landing" | "login" | "dashboard">("landing");
  const [currentTab, setCurrentTab] = useState<"analytics" | "research" | "syllabus" | "checkout" | "settings">("research");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Seed default values into localStorage on first load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("productflow_is_logged_in");
    const user = localStorage.getItem("productflow_user");
    
    if (isLoggedIn === "true" && user) {
      setCurrentPage("dashboard");
      const parsed = JSON.parse(user);
      setUserEmail(parsed.email || "demo@productflow.ai");
    }

    // Seed mock dashboard statistics if not exists
    if (!localStorage.getItem("productflow_stats")) {
      const defaultStats = {
        revenue: 14240,
        sales: 102,
        conversion: 2.68,
        cac: 24.50,
        roas: 4.8
      };
      localStorage.setItem("productflow_stats", JSON.stringify(defaultStats));
    }

    // Seed mock active products list if not exists
    if (!localStorage.getItem("productflow_dashboard_products")) {
      const defaultProducts = [
        { id: "p1", name: "Peak Focus Meditation Guide", price: 149, sales: 45, revenue: 6705, status: "Active" },
        { id: "p2", name: "SaaS Solopreneur Blueprint", price: 199, sales: 22, revenue: 4378, status: "Active" },
        { id: "p3", name: "Postnatal Wellness Checklists", price: 79, sales: 35, revenue: 2765, status: "Active" }
      ];
      localStorage.setItem("productflow_dashboard_products", JSON.stringify(defaultProducts));
    }

    // Seed weekly logs history if not exists
    if (!localStorage.getItem("productflow_sales_history")) {
      const defaultHistory = [
        { name: "Week 1", revenue: 2400, sales: 16, traffic: 800 },
        { name: "Week 2", revenue: 4100, sales: 28, traffic: 1100 },
        { name: "Week 3", revenue: 3500, sales: 24, traffic: 950 },
        { name: "Week 4", revenue: 5800, sales: 40, traffic: 1300 },
      ];
      localStorage.setItem("productflow_sales_history", JSON.stringify(defaultHistory));
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    localStorage.setItem("productflow_is_logged_in", "true");
    localStorage.setItem("productflow_user", JSON.stringify({ email, name: "Jane Doe" }));
    setUserEmail(email);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("productflow_is_logged_in");
    setCurrentPage("landing");
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case "analytics":
        return <AnalyticsView />;
      case "research":
        return <GrowthPlannerView />;
      case "syllabus":
        return <WeeklyReportsView />;
      case "checkout":
        return <CheckoutDemoView />;
      case "settings":
        return <SettingsView />;
      default:
        return <GrowthPlannerView />;
    }
  };

  if (currentPage === "landing") {
    return (
      <LandingPage 
        onStartDemo={() => setCurrentPage("login")} 
        onGoToLogin={() => setCurrentPage("login")} 
      />
    );
  }

  if (currentPage === "login") {
    return (
      <DemoLogin 
        onLoginSuccess={handleLoginSuccess} 
        onGoBack={() => setCurrentPage("landing")} 
      />
    );
  }

  const navItems = [
    { id: "research", label: "Growth Planner", icon: <Search className="w-4 h-4" /> },
    { id: "syllabus", label: "Syllabus & Copy", icon: <BookOpen className="w-4 h-4" /> },
    { id: "checkout", label: "Checkout Sandbox", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "analytics", label: "Live Analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 md:flex md:flex-col md:h-screen md:sticky md:top-0">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-tr from-teal-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              P
            </div>
            <span className="font-sans font-bold text-base tracking-tight text-slate-900">
              ProductFlow <span className="text-teal-600 font-medium">AI</span>
            </span>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 md:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar Links (Desktop) */}
        <nav className="hidden md:flex flex-col flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id as any)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${currentTab === item.id ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sidebar Links (Mobile Drawer) */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white p-4 space-y-1 flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${currentTab === item.id ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Sidebar Footer */}
        <div className="border-t border-slate-200 p-4 shrink-0 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
              JD
            </div>
            <div className="truncate max-w-[110px]">
              <span className="block text-xs font-bold text-slate-900">Jane Doe</span>
              <span className="block text-[10px] text-slate-400 truncate">{userEmail}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        <motion.div 
          key={currentTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveView()}
        </motion.div>
      </main>
    </div>
  );
}
