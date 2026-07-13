"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, AreaChart, Area 
} from "recharts";
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Percent, 
  Target, BarChart3, HelpCircle, Download, FileText, ArrowUpRight 
} from "lucide-react";

interface StatMetrics {
  revenue: number;
  sales: number;
  conversion: number;
  cac: number;
  roas: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  price: number;
  sales: number;
  revenue: number;
  status: string;
}

export default function AnalyticsView() {
  const [stats, setStats] = useState<StatMetrics>({
    revenue: 14240,
    sales: 102,
    conversion: 2.68,
    cac: 24.50,
    roas: 4.8
  });

  const [products, setProducts] = useState<ProductPerformance[]>([]);
  const [historyData, setHistoryData] = useState<any[]>([]);

  // Default charts history data
  const defaultHistory = [
    { name: "Week 1", revenue: 2400, sales: 16, traffic: 800 },
    { name: "Week 2", revenue: 4100, sales: 28, traffic: 1100 },
    { name: "Week 3", revenue: 3500, sales: 24, traffic: 950 },
    { name: "Week 4", revenue: 5800, sales: 40, traffic: 1300 },
  ];

  // Default dashboard products
  const defaultProducts: ProductPerformance[] = [
    { id: "p1", name: "Peak Focus Meditation Guide", price: 149, sales: 45, revenue: 6705, status: "Active" },
    { id: "p2", name: "SaaS Solopreneur Blueprint", price: 199, sales: 22, revenue: 4378, status: "Active" },
    { id: "p3", name: "Postnatal Wellness Checklists", price: 79, sales: 35, revenue: 2765, status: "Active" }
  ];

  useEffect(() => {
    // Load stats
    const savedStats = localStorage.getItem("productflow_stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      localStorage.setItem("productflow_stats", JSON.stringify(stats));
    }

    // Load products
    const savedProds = localStorage.getItem("productflow_dashboard_products");
    if (savedProds) {
      setProducts(JSON.parse(savedProds));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem("productflow_dashboard_products", JSON.stringify(defaultProducts));
    }

    // Load history
    const savedHistory = localStorage.getItem("productflow_sales_history");
    if (savedHistory) {
      setHistoryData(JSON.parse(savedHistory));
    } else {
      setHistoryData(defaultHistory);
      localStorage.setItem("productflow_sales_history", JSON.stringify(defaultHistory));
    }
  }, []);

  const handleExportReport = () => {
    alert("Simulating Report Generation: Your performance audit has been compiled into a local dataset (simulated CSV log). Successful download initiated.");
  };

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-sans font-bold text-slate-900 tracking-tight">Performance Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Review live simulated revenues, ad metrics, and product distributions in real-time.</p>
        </div>
        <button 
          onClick={handleExportReport}
          className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl border border-transparent shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-4 h-4" /> Export Report Log
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative">
          <div className="text-slate-400 font-semibold text-xs tracking-wider uppercase mb-2 flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" /> Revenue
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">${(stats.revenue).toLocaleString()}</div>
          <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-1.5 py-0.5 rounded-md mt-2 inline-block flex items-center gap-0.5 w-fit">
            <TrendingUp className="w-3 h-3" /> +14.2%
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative">
          <div className="text-slate-400 font-semibold text-xs tracking-wider uppercase mb-2 flex items-center gap-1">
            <ShoppingCart className="w-4 h-4 text-blue-600 shrink-0" /> Sales
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{stats.sales}</div>
          <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-1.5 py-0.5 rounded-md mt-2 inline-block flex items-center gap-0.5 w-fit">
            <TrendingUp className="w-3 h-3" /> +8.5%
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative">
          <div className="text-slate-400 font-semibold text-xs tracking-wider uppercase mb-2 flex items-center gap-1">
            <Percent className="w-4 h-4 text-indigo-600 shrink-0" /> Conv. Rate
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{stats.conversion}%</div>
          <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-1.5 py-0.5 rounded-md mt-2 inline-block flex items-center gap-0.5 w-fit">
            <TrendingUp className="w-3 h-3" /> +0.4%
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative">
          <div className="text-slate-400 font-semibold text-xs tracking-wider uppercase mb-2 flex items-center gap-1">
            <Target className="w-4 h-4 text-purple-600 shrink-0" /> CAC (Target)
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">${stats.cac.toFixed(2)}</div>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md mt-2 inline-block flex items-center gap-0.5 w-fit">
            <TrendingDown className="w-3 h-3" /> -12% Lower
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative col-span-2 md:col-span-1">
          <div className="text-slate-400 font-semibold text-xs tracking-wider uppercase mb-2 flex items-center gap-1">
            <BarChart3 className="w-4 h-4 text-purple-600 shrink-0" /> ROAS
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{stats.roas}x</div>
          <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-1.5 py-0.5 rounded-md mt-2 inline-block flex items-center gap-0.5 w-fit">
            <TrendingUp className="w-3 h-3" /> +1.2x
          </span>
        </div>
      </div>

      {/* Chart Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Revenue Trend */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-sans font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            Revenue Growth Curve
          </h2>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "12px", color: "#fff" }}
                  labelStyle={{ fontWeight: "bold", color: "#fff" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Conversion vs Traffic */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-sans font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Simulated Traffic Volume
          </h2>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "12px", color: "#fff" }}
                />
                <Bar dataKey="traffic" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Products breakdown list table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-sans font-bold text-slate-900 text-sm">Product Performance Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/30 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-left">
              <tr>
                <th className="px-6 py-3.5">Product Name</th>
                <th className="px-6 py-3.5">Base Price</th>
                <th className="px-6 py-3.5">Total Sales</th>
                <th className="px-6 py-3.5">Total Revenue</th>
                <th className="px-6 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 font-medium">
                    No products active. Use the Growth planner to research and activate.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{p.name}</td>
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">${p.price}</td>
                    <td className="px-6 py-4 font-mono text-slate-800">{p.sales}</td>
                    <td className="px-6 py-4 font-mono text-emerald-600 font-bold">${(p.revenue).toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-100">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
