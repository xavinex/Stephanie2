export interface Product {
  id: string;
  name: string;
  niche: 'Wellness' | 'Business' | 'Other';
  audience: string;
  problem: string;
  promise: string;
  price: number;
  demandScore: number;
  competitionScore: number;
  saved: boolean;
  status: 'Active' | 'Draft' | 'Archived';
  bonuses?: string[];
}

export interface Transaction {
  id: string;
  product: string;
  amount: number;
  date: string;
  customer: string;
  type: 'Sale' | 'Sale + Bump' | 'Sale + Upsell' | 'All-In';
  funnel: string;
}

export interface Campaign {
  id: string;
  channel: string;
  spend: number;
  clicks: number;
  leads: number;
  sales: number;
  revenue: number;
  cac: number;
  roas: number;
  active: boolean;
}

export interface FunnelStage {
  id: string;
  name: string;
  type: 'landing' | 'sales' | 'checkout' | 'bump' | 'upsell' | 'downsell' | 'thanks' | 'email';
  visitors: number;
  conversions: number;
  rate: number; // Conversion rate in %
}

export interface GrowthTask {
  id: string;
  day: number;
  title: string;
  task: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending';
  deadline: string;
}

export interface ProductOutline {
  id: string;
  name: string;
  niche: string;
  audience: string;
  problem: string;
  promise: string;
  price: number;
  bonuses: string[];
  modules: {
    id: string;
    title: string;
    lessons: string[];
  }[];
  createdDate: string;
}

export interface SavedContent {
  id: string;
  title: string;
  type: 'Landing Copy' | 'Email Follow-up' | 'Ad Creative' | 'Social Post' | 'Ebook Chapter' | 'Course Lesson';
  body: string;
  createdDate: string;
}

export interface AppSettings {
  profile: {
    name: string;
    email: string;
    avatar: string;
  };
  business: {
    companyName: string;
    niche: string;
    currency: string;
  };
  branding: {
    primaryColor: string;
    font: string;
    logoUrl: string;
  };
  notifications: {
    emailAlerts: boolean;
    weeklyReport: boolean;
  };
  integrations: {
    stripe: boolean;
    paypal: boolean;
    meta: boolean;
    googleAnalytics: boolean;
    mailchimp: boolean;
    claude: boolean;
    openai: boolean;
  };
}

export interface AppState {
  currentUser: { email: string; companyName: string } | null;
  revenue: number;
  salesCount: number;
  conversionRate: number;
  cac: number;
  roas: number;
  products: Product[];
  transactions: Transaction[];
  campaigns: Campaign[];
  funnelStages: FunnelStage[];
  growthPlanner: GrowthTask[];
  savedOutlines: ProductOutline[];
  savedContent: SavedContent[];
  settings: AppSettings;
}

export const INITIAL_STATE: AppState = {
  currentUser: null,
  revenue: 24850,
  salesCount: 528,
  conversionRate: 3.4,
  cac: 18.50,
  roas: 4.2,
  products: [
    {
      id: 'prod-1',
      name: '21-Day Stress Reset Program',
      niche: 'Wellness',
      audience: 'Busy Professionals & Managers',
      problem: 'High anxiety, poor sleep, and professional burnout',
      promise: 'Reclaim calm, focus, and energy in 15 minutes a day',
      price: 47,
      demandScore: 94,
      competitionScore: 38,
      saved: true,
      status: 'Active',
      bonuses: ['Sleep Reset Meditation Track', 'Stress Tracker Spreadsheet']
    },
    {
      id: 'prod-2',
      name: 'SaaS Founder Launch Kit',
      niche: 'Business',
      audience: 'Early-stage Tech Founders & Side Hustlers',
      problem: 'Struggling with early product validation and finding first customers',
      promise: 'Validate, build, and land 10 paying users in 30 days',
      price: 97,
      demandScore: 89,
      competitionScore: 55,
      saved: true,
      status: 'Active',
      bonuses: ['10 Cold Outreach Email Templates', 'Product Hunt Launch Checklist']
    },
    {
      id: 'prod-3',
      name: 'Sleep Mastery Toolkit',
      niche: 'Wellness',
      audience: 'Chronic Insomniacs',
      problem: 'Restless nights, overactive mind before bed',
      promise: 'Establish 8 hours of deep restorative sleep without drugs',
      price: 29,
      demandScore: 85,
      competitionScore: 28,
      saved: false,
      status: 'Draft',
      bonuses: ['Bedtime Audio Sleepcast']
    }
  ],
  transactions: [
    { id: 'TX-1001', product: '21-Day Stress Reset Program', amount: 47, date: '2026-07-13T09:30:00Z', customer: 'Sarah Jenkins', type: 'Sale', funnel: 'Stress Reset Funnel' },
    { id: 'TX-1002', product: 'SaaS Founder Launch Kit', amount: 97, date: '2026-07-12T18:15:00Z', customer: 'David Chen', type: 'Sale', funnel: 'SaaS Blueprint Funnel' },
    { id: 'TX-1003', product: '21-Day Stress Reset Program', amount: 56, date: '2026-07-12T14:22:00Z', customer: 'Emma Watson', type: 'Sale + Bump', funnel: 'Stress Reset Funnel' }, // $47 + $9 bump
    { id: 'TX-1004', product: 'Sleep Mastery Toolkit', amount: 29, date: '2026-07-11T11:05:00Z', customer: 'Michael Chang', type: 'Sale', funnel: 'Sleep Funnel' },
    { id: 'TX-1005', product: 'SaaS Founder Launch Kit', amount: 126, date: '2026-07-10T16:40:00Z', customer: 'Robert Smith', type: 'Sale + Upsell', funnel: 'SaaS Blueprint Funnel' }, // $97 + $29 upsell
    { id: 'TX-1006', product: '21-Day Stress Reset Program', amount: 85, date: '2026-07-09T08:12:00Z', customer: 'Sophia Lopez', type: 'All-In', funnel: 'Stress Reset Funnel' }, // $47 + $9 + $29
  ],
  campaigns: [
    { id: 'c1', channel: 'Meta Ads', spend: 3200, clicks: 12000, leads: 1800, sales: 240, revenue: 11280, cac: 13.33, roas: 3.52, active: true },
    { id: 'c2', channel: 'Google Ads', spend: 2100, clicks: 5400, leads: 950, sales: 115, revenue: 8200, cac: 18.26, roas: 3.90, active: true },
    { id: 'c3', channel: 'TikTok', spend: 1500, clicks: 8900, leads: 1200, sales: 85, revenue: 3995, cac: 17.64, roas: 2.66, active: true },
    { id: 'c4', channel: 'Instagram Influencers', spend: 1200, clicks: 4300, leads: 600, sales: 58, revenue: 2726, cac: 20.69, roas: 2.27, active: true },
    { id: 'c5', channel: 'Email Newsletter', spend: 200, clicks: 3100, leads: 450, sales: 30, revenue: 1410, cac: 6.67, roas: 7.05, active: true },
    { id: 'c6', channel: 'SEO Organic', spend: 400, clicks: 6500, leads: 1100, sales: 80, revenue: 3760, cac: 5.00, roas: 9.40, active: true },
  ],
  funnelStages: [
    { id: 'f1', name: 'Opt-in Landing Page', type: 'landing', visitors: 15000, conversions: 4500, rate: 30 },
    { id: 'f2', name: 'Premium Sales Page', type: 'sales', visitors: 4500, conversions: 900, rate: 20 },
    { id: 'f3', name: 'Optimized Checkout', type: 'checkout', visitors: 900, conversions: 528, rate: 58.6 },
    { id: 'f4', name: 'Stress Relief Workbook (Bump)', type: 'bump', visitors: 528, conversions: 185, rate: 35 },
    { id: 'f5', name: 'Personalized Assessment (Upsell)', type: 'upsell', visitors: 528, conversions: 92, rate: 17.4 },
    { id: 'f6', name: 'Order Thank-You Page', type: 'thanks', visitors: 528, conversions: 528, rate: 100 },
  ],
  growthPlanner: [
    { id: 'gp1', day: 1, title: 'Define Wellness/Biz Niche & Audience Persona', task: 'Research top 3 frustrations of your target demographic in online forums and subreddits.', category: 'Research', priority: 'High', status: 'Completed', deadline: 'Day 2' },
    { id: 'gp2', day: 3, title: 'Outline Core Digital Product Modules', task: 'Draft a 5-module syllabus addressing the core user pain point.', category: 'Product', priority: 'High', status: 'Completed', deadline: 'Day 5' },
    { id: 'gp3', day: 7, title: 'Design Opt-in Lead Magnet & Funnel Page', task: 'Create a high-value checklist and configure the landing page funnel step.', category: 'Funnel', priority: 'Medium', status: 'In Progress', deadline: 'Day 10' },
    { id: 'gp4', day: 12, title: 'Draft High-Converting Sales Page Copy', task: 'Write headlines, bullet points, and call-to-actions targeting professional burnout.', category: 'Copywriting', priority: 'High', status: 'Pending', deadline: 'Day 15' },
    { id: 'gp5', day: 18, title: 'Set Up Payment Gateway & Checkout Page', task: 'Configure product pricing ($47), add workbook order bump ($9), and test purchase.', category: 'Tech', priority: 'High', status: 'Pending', deadline: 'Day 20' },
    { id: 'gp6', day: 22, title: 'Launch Organic Campaign & Build Buzz', task: 'Share 5 high-value posts on social channels detailing your core methods.', category: 'Traffic', priority: 'Medium', status: 'Pending', deadline: 'Day 25' },
    { id: 'gp7', day: 27, title: 'Initiate Email Pitch Sequence', task: 'Send a 3-part automated email launch sequence to warm leads introducing the program.', category: 'Launch', priority: 'High', status: 'Pending', deadline: 'Day 30' },
  ],
  savedOutlines: [],
  savedContent: [],
  settings: {
    profile: { name: 'Demo Creator', email: 'demo@productflow.ai', avatar: 'https://picsum.photos/seed/creator/150' },
    business: { companyName: 'ProductFlow Wellness Co.', niche: 'Wellness', currency: 'USD' },
    branding: { primaryColor: '#0F172A', font: 'Inter', logoUrl: '' },
    notifications: { emailAlerts: true, weeklyReport: true },
    integrations: { stripe: true, paypal: false, meta: true, googleAnalytics: true, mailchimp: true, claude: true, openai: false }
  }
};

export const STORAGE_KEY = 'productflow_demo_state';

export function loadState(): AppState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Ensure key sections are populated
      return {
        ...INITIAL_STATE,
        ...parsed,
        currentUser: parsed.currentUser || null
      };
    }
  } catch (e) {
    console.error('Error loading localStorage state:', e);
  }
  return INITIAL_STATE;
}

export function saveState(state: AppState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving localStorage state:', e);
  }
}
