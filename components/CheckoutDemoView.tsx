"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingCart, CreditCard, CheckCircle2, ChevronRight, 
  HelpCircle, Sparkles, Plus, Trash2, ArrowRight, RefreshCw, AlertCircle 
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

export default function CheckoutDemoView() {
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [hasOrderBump, setHasOrderBump] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"builder" | "form" | "success" | "failed">("builder");

  // Form Inputs
  const [buyerEmail, setBuyerEmail] = useState("buyer@example.com");
  const [cardName, setCardName] = useState("Jane Doe");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("424");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [lastTransactionAmount, setLastTransactionAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const orderBumpPrice = 19;

  useEffect(() => {
    const saved = localStorage.getItem("productflow_saved_products");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProducts(parsed);
      if (parsed.length > 0) {
        setSelectedProductId(parsed[0].id);
      }
    } else {
      const defaultProd = [
        { id: "init-1", niche: "Mindfulness Meditation for Tech Leaders", name: "Peak Focus Meditation Guide", score: 92, price: 149, revenueEst: 8500, status: "Drafting" }
      ];
      setProducts(defaultProd);
      setSelectedProductId(defaultProd[0].id);
    }
  }, []);

  const getSelectedProduct = () => {
    return products.find(p => p.id === selectedProductId) || { name: "Interactive Creator Guide", price: 99 };
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === "WELCOME10") {
      setDiscountPercent(10);
      alert("Coupon WELCOME10 applied! 10% off");
    } else if (normalized === "WELLNESS20") {
      setDiscountPercent(20);
      alert("Coupon WELLNESS20 applied! 20% off");
    } else {
      alert("Invalid coupon code. Try WELCOME10 or WELLNESS20");
    }
  };

  const getSubtotal = () => {
    const prod = getSelectedProduct();
    return prod.price;
  };

  const getDiscountAmount = () => {
    return (getSubtotal() * discountPercent) / 100;
  };

  const getOrderBumpAmount = () => {
    return hasOrderBump ? orderBumpPrice : 0;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + getOrderBumpAmount();
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    setTimeout(() => {
      // Simulate validation
      const cleanedCard = cardNumber.replace(/\s+/g, "");
      
      if (cleanedCard.startsWith("4242")) {
        // Successful Transaction!
        const finalAmt = getTotal();
        const genId = "TX-" + Math.floor(Math.random() * 900000 + 100000);
        setOrderId(genId);
        setLastTransactionAmount(finalAmt);
        
        // Update LocalStorage metrics so that the Sales Dashboard automatically updates!
        updateSimulationMetrics(finalAmt);

        setCheckoutStep("success");
      } else if (cleanedCard.startsWith("5105") || cleanedCard.startsWith("4111")) {
        // Decline Simulator
        setErrorMessage("Card Declined: Insufficient Funds. Try with test card 4242.");
        setCheckoutStep("failed");
      } else {
        setErrorMessage("Invalid Card Format. Please use test card card number starting with 4242.");
        setCheckoutStep("failed");
      }
      setIsProcessing(false);
    }, 1500);
  };

  const updateSimulationMetrics = (amount: number) => {
    // Increment general simulated sales stats
    const statsStr = localStorage.getItem("productflow_stats");
    if (statsStr) {
      const stats = JSON.parse(statsStr);
      stats.revenue += amount;
      stats.sales += 1;
      stats.conversion = parseFloat(((stats.sales / 3800) * 100).toFixed(2)); // recalculate conversion rate
      localStorage.setItem("productflow_stats", JSON.stringify(stats));
    }

    // Add record to weekly sales history logs
    const historyStr = localStorage.getItem("productflow_sales_history");
    if (historyStr) {
      const history = JSON.parse(historyStr);
      // Append some revenue to the current month/week
      if (history.length > 0) {
        history[history.length - 1].revenue += amount;
        history[history.length - 1].sales += 1;
        localStorage.setItem("productflow_sales_history", JSON.stringify(history));
      }
    }

    // Add to specific product sales count
    const dashboardProds = localStorage.getItem("productflow_dashboard_products");
    if (dashboardProds) {
      const parsed = JSON.parse(dashboardProds);
      const selectedProd = getSelectedProduct();
      const updated = parsed.map((p: any) => {
        if (p.name === selectedProd.name || p.id === selectedProductId) {
          return {
            ...p,
            sales: p.sales + 1,
            revenue: p.revenue + amount
          };
        }
        return p;
      });
      localStorage.setItem("productflow_dashboard_products", JSON.stringify(updated));
    }
  };

  const resetSimulator = () => {
    setCheckoutStep("builder");
    setHasOrderBump(false);
    setDiscountPercent(0);
    setCouponCode("");
  };

  return (
    <div className="space-y-6">
      {/* Top Title Bar */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-sans font-bold text-slate-900 tracking-tight">Checkout Funnel Sandbox</h1>
        <p className="text-sm text-slate-500 mt-1">Configure pricing models, set coupons, and run simulated credit card transactions.</p>
      </div>

      {checkoutStep === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Funnel Planner Config */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-lg font-sans font-semibold text-slate-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-teal-600" />
                Funnel Checkout Settings
              </h2>

              {/* Product Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  1. Select Product to Test Checkout
                </label>
                <select 
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="block w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
                >
                  {products.length === 0 ? (
                    <option value="">-- No products saved, showing default --</option>
                  ) : (
                    products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                    ))
                  )}
                </select>
              </div>

              {/* Order Bump Option */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <input 
                      type="checkbox"
                      id="orderbump"
                      checked={hasOrderBump}
                      onChange={(e) => setHasOrderBump(e.target.checked)}
                      className="mt-1 h-4 w-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                    />
                    <div>
                      <label htmlFor="orderbump" className="text-sm font-bold text-slate-900 cursor-pointer select-none">
                        Include Order Bump Addon
                      </label>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Offer an additional digital product (e.g. &quot;Simulated Audio Meditations &amp; Templates Bundle&quot;) at checkout.
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-800 shrink-0 ml-4">+${orderBumpPrice}</span>
                </div>
              </div>

              {/* Coupon Codes */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  2. Apply Mock Discount Coupon
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Enter WELCOME10 or WELLNESS20..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
                  />
                  <button 
                    type="submit"
                    className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-4 rounded-xl text-sm transition-colors"
                  >
                    Apply
                  </button>
                </form>
                <span className="text-[11px] text-slate-400 mt-1.5 block">Use test coupons: <strong className="text-slate-500">WELCOME10</strong> (10% Off) or <strong className="text-slate-500">WELLNESS20</strong> (20% Off).</span>
              </div>
            </div>

            {/* Funnel Map Visualization */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="font-sans font-bold text-slate-900 text-sm mb-4">Launch Launch Funnel Architecture</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <span className="text-xs font-bold text-teal-600 block mb-1">OPT-IN</span>
                  <span className="text-sm font-bold text-slate-800">Lead Magnet</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Simulated 45% CR</span>
                </div>
                <div className="flex items-center justify-center text-slate-300 hidden md:flex"><ChevronRight className="w-5 h-5" /></div>
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <span className="text-xs font-bold text-indigo-600 block mb-1">OFFER</span>
                  <span className="text-sm font-bold text-slate-800">Sales Page</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Simulated 8% Click-thru</span>
                </div>
                <div className="flex items-center justify-center text-slate-300 hidden md:flex"><ChevronRight className="w-5 h-5" /></div>
                <div className="border border-2 border-slate-950 rounded-xl p-4 bg-white shadow-sm">
                  <span className="text-xs font-bold text-purple-600 block mb-1">CHECKOUT</span>
                  <span className="text-sm font-bold text-slate-950">Secure Form</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Interactive Sandbox</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar / Checkout launcher */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-sans font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                Cart Summary
              </h2>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Product: {getSelectedProduct().name}</span>
                  <span className="font-mono text-slate-800 font-semibold">${getSubtotal()}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between items-center text-sm text-teal-600 font-semibold">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="font-mono">-${getDiscountAmount()}</span>
                  </div>
                )}

                {hasOrderBump && (
                  <div className="flex justify-between items-center text-sm text-indigo-600 font-semibold">
                    <span>Order Bump Addon:</span>
                    <span className="font-mono">+${orderBumpPrice}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-slate-200 text-base font-bold text-slate-900">
                  <span>Grand Total:</span>
                  <span className="font-mono text-xl">${getTotal()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCheckoutStep("form")}
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl text-sm mt-8 transition-colors flex items-center justify-center gap-2 shadow-md shadow-slate-950/10"
            >
              Launch Checkout Simulator
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Checkout form step */}
      {checkoutStep === "form" && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
          <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between">
            <span className="font-sans font-bold text-sm tracking-tight flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-teal-400" /> Secure Sandbox Checkout
            </span>
            <span className="font-mono text-lg font-extrabold text-teal-400">${getTotal()}</span>
          </div>

          <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5">
                Buyer Email Address
              </label>
              <input 
                type="email"
                required
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="block w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm transition-all"
              />
            </div>

            {/* Credit Card Inputs */}
            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
                Payment Details
              </label>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-4">
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">CARDHOLDER NAME</label>
                  <input 
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="block w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">CARD NUMBER</label>
                  <input 
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="block w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-mono text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">EXPIRY DATE</label>
                    <input 
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="block w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-mono text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">CVC CODE</label>
                    <input 
                      type="text"
                      required
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="block w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-mono text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated credit card hints */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
              <span className="font-semibold text-slate-800 block">SIMULATION CARD GUIDE:</span>
              <div className="space-y-1.5 text-slate-500">
                <p>● Type <strong className="text-slate-800 font-mono">4242 4242 4242 4242</strong> to test a <strong>SUCCESSFUL</strong> transaction.</p>
                <p>● Type <strong className="text-slate-800 font-mono">4111 1111 1111 1111</strong> or any other number to test a <strong>DECLINED</strong> card transaction.</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setCheckoutStep("builder")}
                className="w-1/3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-2/3 bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span>Submit Demo Payment</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Transaction Receipt */}
      {checkoutStep === "success" && (
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-8 text-center space-y-6 animate-scaleIn">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-sans font-bold text-slate-900 tracking-tight">Simulated Purchase Success</h2>
            <p className="text-xs text-slate-400 font-semibold font-mono">ORDER ID: {orderId}</p>
          </div>

          <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
            Congratulations! The mock transaction was successfully processed. Your Sales Dashboard metrics have been automatically incremented.
          </p>

          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl space-y-3 font-medium text-sm text-slate-700">
            <div className="flex justify-between">
              <span>Customer Email:</span>
              <span className="text-slate-900 font-mono">{buyerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span>Product:</span>
              <span className="text-slate-900">{getSelectedProduct().name}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-slate-200 text-base font-bold text-slate-900">
              <span>Amount Paid:</span>
              <span className="text-teal-600 font-mono">${lastTransactionAmount}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetSimulator}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              Simulate Again
            </button>
            <button
              onClick={() => {
                // Route to dashboard via parent callback or prompt
                alert("Awesome! Switch to the dashboard tabs to view your newly populated transaction revenue!");
                resetSimulator();
              }}
              className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              View Analytics
            </button>
          </div>
        </div>
      )}

      {/* Failed/Declined Step */}
      {checkoutStep === "failed" && (
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-8 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-rose-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-sans font-bold text-slate-900 tracking-tight">Transaction Declined</h2>
            <p className="text-xs text-rose-700 font-semibold">{errorMessage}</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            The transaction simulation was intentionally rejected based on your input card number. Please use our test success card for completing transactions.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setCheckoutStep("form")}
              className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              Retry Payment
            </button>
            <button
              onClick={resetSimulator}
              className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              Configure Funnel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
