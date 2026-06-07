"use client";
import { useState, useEffect } from "react";

import "./profile-styles.css";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Camera, 
  Edit3, 
  Shield, 
  Bell, 
  Settings, 
  ExternalLink, 
  Download, 
  Trash2, 
  ChevronRight,
  Globe,
  Lock,
  CreditCard,
  ShieldCheck,
  Smartphone,
  History,
  AlertCircle,
  CheckCircle2,
  X,
  CreditCard as BillingIcon,
  Zap,
  Leaf,
  Star,
  Activity,
  LogOut,
  Fingerprint,
  MessageSquare,
  ShieldAlert,
  Users,
  BarChart3
} from "lucide-react";
import { cn } from "./lib/utils";

// --- Utils/Mini-Components ---

const Sparkline = ({ data, color = "currentColor", width = 100, height = 30 }: any) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((d: number, i: number) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((d - min) / range) * height
  }));
  
  const pathData = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p: any) => `L ${p.x} ${p.y}`).join(' ');
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const RadialProgress = ({ value, size = 120, strokeWidth = 10 }: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-slate-900 tracking-tighter">{value}%</span>
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
      </div>
    </div>
  );
};

// --- Types ---

interface ProfileData {
  name: string;
  role: string;
  email: string;
  location: string;
  timezone: string;
  language: string;
  bio: string;
  joinedDate: string;
  isPro: boolean;
  isVerified: boolean;
}

// --- Components ---




const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold font-headline text-on-surface">{title}</h2>
    <p className="text-on-surface-variant text-sm mt-1">{subtitle}</p>
  </div>
);

const Card = ({ children, className, title, subtitle, icon: Icon }: any) => (
  <div 
    className={cn(
      "premium-card",
      className
    )}
  >
    {(title || Icon) && (
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary border border-slate-100">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-headline tracking-tight">{title}</h3>
            {subtitle && <p className="text-slate-500 text-xs font-medium mt-0.5">{subtitle}</p>}
          </div>
        </div>
      </div>
    )}
    <div className="relative flex-1 flex flex-col">
      {children}
    </div>
  </div>
);



const Modal = ({ isOpen, onClose, title, children }: any) => (
  <>
    {isOpen && (
      <>
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[100]"
        />
        <div 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-[2rem] shadow-2xl z-[101] overflow-hidden border border-slate-200"
        >
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xl font-bold text-slate-900 font-headline tracking-tight">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      </>
    )}
  </>
);



const Toggle = ({ enabled, setEnabled, label, sublabel, icon }: any) => (
  <div className="flex items-center justify-between group py-4 first:pt-0 last:pb-0 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 transition-colors -mx-2">
    <div className="max-w-[80%] flex items-start gap-3">
      {icon && <div className="mt-0.5 w-6 h-6 flex items-center justify-center shrink-0">{icon}</div>}
      <div>
        <p className="font-bold text-slate-900 text-sm tracking-tight">{label}</p>
        {sublabel && <p className="text-slate-500 text-[11px] font-medium mt-1 leading-relaxed">{sublabel}</p>}
      </div>
    </div>
    <button 
      onClick={() => setEnabled(!enabled)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none",
        enabled ? "bg-primary shadow-[0_0_12px_rgba(20,184,166,0.4)]" : "bg-slate-200"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-all duration-300 ease-in-out",
          enabled ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  </div>
);



// --- Sub-Pages ---

const PersonalTab = ({ data, setData }: { data: ProfileData, setData: any }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Card title="Public Profile" subtitle="Manage how you appear to others" icon={User}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Name</label>
            <input 
              value={data.name} 
              onChange={(e) => setData({...data, name: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all duration-300 font-bold text-slate-900" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Expertise</label>
            <input 
              value={data.role} 
              onChange={(e) => setData({...data, role: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all duration-300 font-bold text-slate-900"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bio Overview</label>
          <textarea 
            rows={4}
            value={data.bio} 
            onChange={(e) => setData({...data, bio: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-6 py-5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all duration-300 resize-none font-medium leading-relaxed text-slate-600"
          />
        </div>
      </div>
    </Card>


    <Card title="Preferences" subtitle="Region and accessibility settings" icon={Globe}>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Timezone</label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-all font-medium">
            <option>San Francisco (GMT-8)</option>
            <option>Berlin (GMT+1)</option>
            <option>London (GMT)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Language</label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-all font-medium">
            <option>English (US)</option>
            <option>German</option>
            <option>French</option>
          </select>
        </div>
        <div className="pt-2">
          <p className="text-[11px] font-bold text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Automatically detect from browser
          </p>
        </div>
      </div>
    </Card>

  </div>
);

const SecurityTab = () => {
  const [fa2, setFa2] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card title="Authentication" subtitle="Keep your account secure" icon={ShieldCheck}>
        <div className="space-y-4 divide-y divide-outline-variant/10">
          <Toggle 
            enabled={fa2} 
            setEnabled={setFa2} 
            label="Two-Factor Authentication" 
            sublabel="Adds an extra layer of security to your account" 
          />
          <Toggle 
            enabled={biometric} 
            setEnabled={setBiometric} 
            label="Biometric Login" 
            sublabel="Use TouchID or FaceID on supported devices" 
          />
          <div className="pt-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-on-surface text-sm">Account Password</p>
              <p className="text-on-surface-variant text-xs mt-1">Last changed 4 months ago</p>
            </div>
            <button className="text-primary text-xs font-extrabold hover:underline">Change Password</button>
          </div>
        </div>
      </Card>

      <Card title="Recent Activity" subtitle="Login history from all devices" icon={History}>
        <div className="space-y-2">
          {[
            { device: "MacBook Pro • Chrome", loc: "San Francisco, CA", time: "Active Now", current: true, status: "Secure" },
            { device: "iPhone 15 Pro • App", loc: "San Francisco, CA", time: "2 hours ago", status: "Closed" },
            { device: "iPad Air • Safari", loc: "Los Angeles, CA", time: "Yesterday", status: "Closed" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-[1.5rem] transition-all border border-transparent hover:border-slate-100 group">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", item.current ? "bg-primary/10 text-primary border border-primary/20" : "bg-slate-100 text-slate-400 border border-slate-200")}>
                {item.device.includes("iPhone") ? <Smartphone className="w-5 h-5" /> : item.device.includes("iPad") ? <Globe className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-slate-900">{item.device}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{item.loc}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] text-slate-400 font-bold">{item.time}</span>
                </div>
              </div>
              <span className={cn(
                "badge-status",
                item.current ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-400"
              )}>
                {item.status}
              </span>
            </div>
          ))}
          <button className="w-full text-center text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-6 hover:underline">Log out of all devices</button>
        </div>
      </Card>


    </div>
  );
};

const NotificationsTab = () => {
  const [types, setTypes] = useState({ 
    email: true, sms: false, push: true, 
    security: true, compliance: true,
    threshold: true, baseline: false,
    reports: true, mentions: true,
    digest: false, digestWeekly: true 
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* 1. Notification Channels */}
      <Card title="Channels" subtitle="Delivery methods" icon={Bell}>
        <div className="space-y-2 divide-y divide-outline-variant/10">
          <Toggle 
            enabled={types.email} 
            setEnabled={(v: any) => setTypes({...types, email: v})} 
            label="Email Delivery" 
            sublabel="Receive updates to your primary inbox"
            icon={<Mail className="w-4 h-4 text-slate-400" />}
          />
          <Toggle 
            enabled={types.sms} 
            setEnabled={(v: any) => setTypes({...types, sms: v})} 
            label="SMS Alerts" 
            sublabel="Direct text messages for critical events" 
            icon={<MessageSquare className="w-4 h-4 text-slate-400" />}
          />
          <Toggle 
            enabled={types.push} 
            setEnabled={(v: any) => setTypes({...types, push: v})} 
            label="Push Notifications" 
            sublabel="Desktop and mobile app alerts"
            icon={<Smartphone className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </Card>

      {/* 2. System Alerts */}
      <Card title="System Alerts" subtitle="Priority & compliance" icon={ShieldAlert}>
        <div className="space-y-2 divide-y divide-outline-variant/10">
          <Toggle 
            enabled={types.security} 
            setEnabled={(v: any) => setTypes({...types, security: v})} 
            label="Security Anomalies" 
            sublabel="Alerts for unauthorized access attempts" 
          />
          <Toggle 
            enabled={types.compliance} 
            setEnabled={(v: any) => setTypes({...types, compliance: v})} 
            label="Compliance Breaches" 
            sublabel="Regulatory limits and node integrity" 
          />
        </div>
      </Card>

      {/* 3. Sustainability Settings */}
      <Card title="Sustainability" subtitle="Metrics & Thresholds" icon={Leaf}>
        <div className="space-y-2 divide-y divide-outline-variant/10">
          <Toggle 
            enabled={types.threshold} 
            setEnabled={(v: any) => setTypes({...types, threshold: v})} 
            label="Threshold Warnings" 
            sublabel="When carbon output approaches limit" 
          />
          <Toggle 
            enabled={types.baseline} 
            setEnabled={(v: any) => setTypes({...types, baseline: v})} 
            label="Baseline Autopilot" 
            sublabel="Auto-adjust limits based on prediction" 
          />
        </div>
      </Card>

      {/* 4. Team Collaboration */}
      <Card title="Team" subtitle="Shared workspace alerts" icon={Users}>
        <div className="space-y-2 divide-y divide-outline-variant/10">
          <Toggle 
            enabled={types.reports} 
            setEnabled={(v: any) => setTypes({...types, reports: v})} 
            label="Shared Reports" 
            sublabel="When a teammate shares an audit" 
          />
          <Toggle 
            enabled={types.mentions} 
            setEnabled={(v: any) => setTypes({...types, mentions: v})} 
            label="Mentions & Tags" 
            sublabel="When you are tagged in annotations" 
          />
        </div>
      </Card>

      {/* 5. Weekly Reports */}
      <Card title="Reports" subtitle="Automated digests" icon={BarChart3}>
        <div className="space-y-2 divide-y divide-outline-variant/10">
          <Toggle 
            enabled={types.digestWeekly} 
            setEnabled={(v: any) => setTypes({...types, digestWeekly: v})} 
            label="Weekly ESG Digest" 
            sublabel="Summary of facility environmental impact" 
          />
          <Toggle 
            enabled={types.digest} 
            setEnabled={(v: any) => setTypes({...types, digest: v})} 
            label="Monthly Deep Dive" 
            sublabel="Comprehensive analytics archive" 
          />
        </div>
      </Card>
    </div>
  );
};

const ImpactCard = () => (
  <div 
    className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-200/60 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-8">
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500">
        <Zap className="w-6 h-6" />
      </div>
    </div>

    <div className="relative z-10 space-y-10">
      <div className="flex items-center gap-6">
        <RadialProgress value={94} size={100} strokeWidth={8} />
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-headline">Sync Integrity</h2>
          <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mt-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Optimal Node Alignment
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {[
          { label: "Eco-Alignment", value: "98.2%", trend: [20, 35, 25, 45, 30, 60, 55], color: "text-primary" },
          { label: "Resource Efficiency", value: "87.4%", trend: [40, 30, 50, 45, 60, 55, 75], color: "text-blue-500" }
        ].map((stat, i) => (
          <div key={i} className="flex items-center justify-between group/stat">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</span>
              <p className={cn("text-xl font-black font-headline", stat.color)}>{stat.value}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Sparkline data={stat.trend} color={i === 0 ? "#14B8A6" : "#3B82F6"} width={80} height={24} />
              <span className="text-[9px] font-bold text-slate-400">+2.4% last 24h</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-4">
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 relative group-hover:bg-white transition-colors duration-500">
          <p className="text-xs font-semibold text-slate-500 leading-relaxed italic">
            "Your sustainability footprint is currently in the top 5% of all Enterprise nodes. Keep optimizing for maximum rewards."
          </p>
          <div className="absolute top-2 right-4 text-primary opacity-20"><Star className="w-4 h-4" /></div>
        </div>
        
        <button 
          className="btn-primary w-full justify-center group/btn"
        >
          View Full Audit <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);



const AccountTab = () => (
  <div className="space-y-8">
    <Card title="Account Administration" subtitle="High-level controls and subscription status" icon={Settings}>
      <div className="space-y-4 divide-y divide-slate-100">
        <div className="py-6 flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">System Status</p>
              <p className="text-slate-500 text-xs font-medium">Environment is fully operational</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg border border-emerald-200 uppercase tracking-widest">
            Active
          </span>
        </div>

        <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/10">
              <BillingIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 font-headline">Platform Tier</p>
              <p className="text-slate-500 text-xs font-medium">Enterprise Pro — $249/tier</p>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all uppercase tracking-widest">
            Manage Plan
          </button>
        </div>
      </div>
    </Card>

    <Card className="border-red-100 hover:border-red-200" title="Danger Zone" icon={Trash2}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="font-bold text-red-600 mb-1 flex items-center gap-2 font-headline"><AlertCircle className="w-4 h-4" /> Permanent Decoupling</p>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">Deleting your account will purge all facility logs and compliance data. This cannot be undone.</p>
        </div>
        <button className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-200 text-[10px] uppercase tracking-widest">
          Delete Account
        </button>
      </div>
    </Card>
  </div>
);

// --- Main Page Component ---


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    role: "Senior Product Designer",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    timezone: "San Francisco (GMT-8)",
    language: "English (US)",
    bio: "Passionate about creating sustainable software experiences and driving environmental impact through precision design.",
    joinedDate: "March 2023",
    isPro: true,
    isVerified: true
  });

  const [modals, setModals] = useState({
    edit: false,
    subscription: false,
    export: false,
    delete: false,
    success: false
  });

  const [exportProgress, setExportProgress] = useState(0);

  const simulateExport = () => {
    setModals({...modals, export: true});
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const notify = (msg: string) => {
    // Simplified notification logic
    setModals({...modals, success: true});
    setTimeout(() => setModals(prev => ({...prev, success: false})), 3000);
  };

  const tabs = [
    { id: "personal", label: "Personal", icon: <User /> },
    { id: "account", label: "Account", icon: <Settings /> },
    { id: "security", label: "Security", icon: <Shield /> },
    { id: "notifications", label: "Notifications", icon: <Bell /> },
  ];

  const SyncStatusBar = () => (
    <div className="flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 mb-10 shadow-sm overflow-hidden relative group">
      <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
      <div className="flex items-center gap-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping absolute inset-0 opacity-40" />
            <div className="w-2.5 h-2.5 bg-primary rounded-full relative" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">System Live</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Facility Sync Active</span>
          </div>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Stability</span>
            <span className="text-sm font-black text-slate-900">98.4%</span>
          </div>
          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" style={{ width: "98.4%" }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="hidden md:flex flex-col text-right mr-4">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Next Audit</span>
          <span className="text-[10px] font-black text-slate-500 uppercase">May 12, 2024</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-slate-200">
          <ShieldCheck className="w-4 h-4 text-primary" /> Node Verified
        </div>
      </div>
    </div>
  );




  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-primary/10 selection:text-primary overflow-x-hidden">
      {/* --- Column 1: Navigation Sidebar --- */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col z-50">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-black text-slate-900 font-headline tracking-tighter">CarbonSync</span>
          </div>
          
          <nav className="space-y-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group relative",
                  activeTab === tab.id 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className={cn(
                  "transition-colors",
                  activeTab === tab.id ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                )}>{tab.icon}</span>
                <span className="uppercase tracking-widest text-[9px] font-black">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute right-4 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 pt-0">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Network Secure</span>
            </div>
            <p className="text-[9px] text-slate-400 font-bold leading-relaxed">Infrastructure synchronized across 12 facility nodes.</p>
          </div>
          
          <div className="flex items-center gap-4 px-4 py-4 border-t border-slate-100">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name}&backgroundColor=b6e3f4`} 
              className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200"
              alt="User"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">{profileData.name}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{profileData.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 lg:pl-72 flex flex-col md:flex-row min-w-0">
        <div className="flex-1 p-6 lg:p-12 space-y-12">
          
          <SyncStatusBar />



          {/* Hero Profile Banner (Center Anchor) */}
          <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 border border-slate-200/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-60 -mt-60 pointer-events-none" />
            
            <div className="flex flex-col xl:flex-row items-center gap-12 relative z-10 w-full">
              <div className="relative shrink-0">
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl relative z-10 bg-slate-100 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name}&backgroundColor=b6e3f4`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border-4 border-white hover:bg-primary transition-all z-20"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-10 w-full text-center xl:text-left">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4">
                    <h1 className="text-5xl font-black font-headline text-slate-900 tracking-tight leading-none group-hover:text-primary transition-colors duration-500">{profileData.name}</h1>
                    <span className="badge-status bg-blue-50 text-blue-600 border border-blue-100">
                      <Zap className="w-3.5 h-3.5 fill-current" /> High Intensity
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center xl:justify-start gap-6 font-bold text-slate-500">
                    <p className="flex items-center gap-3">
                      <span className="p-1.5 bg-slate-50 rounded-lg border border-slate-100"><Shield className="w-5 h-5 text-primary" /></span>
                      {profileData.role}
                    </p>
                    <span className="hidden sm:block text-slate-200">/</span>
                    <p className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-400" /> {profileData.location}
                    </p>
                  </div>
                </div>

                {/* Horizontal Stat Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-100/80">
                  {[
                    { label: "CO2 Mitigated", v: "2,482", u: "kg", color: "text-emerald-600", icon: Leaf },
                    { label: "Sys Stability", v: "99.9", u: "%", color: "text-blue-600", icon: Activity },
                    { label: "Storage Node", v: "Enterprise", u: "", color: "text-teal-600", icon: Star },
                    { label: "Auth Layer", v: "Secure", u: "", color: "text-primary", icon: ShieldCheck }
                  ].map((stat, i) => (
                    <div key={stat.label} className="space-y-2 group/stat">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-3 h-3 text-slate-300 group-hover/stat:text-primary transition-colors" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className={cn("text-2xl font-black font-headline tracking-tighter", stat.color)}>{stat.v}</span>
                        <span className="text-[10px] font-black text-slate-300 uppercase">{stat.u}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center xl:justify-start gap-4">
                  <button className="btn-primary group/btn lg:px-12">
                     Optimization Sync <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => setModals({...modals, edit: true})} className="btn-secondary">
                    <Edit3 className="w-4 h-4" /> Edit Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div
            key={activeTab}
            className="min-h-[500px]"
          >
              {activeTab === "personal" && <PersonalTab data={profileData} setData={setProfileData} />}
              {activeTab === "account" && (
                <div className="space-y-8">
                  <Card title="Account Administration" subtitle="High-level controls and subscription status" icon={Settings}>
                    <div className="space-y-4 divide-y divide-outline-variant/10">
                      <div className="py-6 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">System Status</p>
                            <p className="text-slate-500 text-xs">Environment is fully operational</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg border border-emerald-200 uppercase tracking-widest">
                          Active
                        </span>
                      </div>

                      
                      <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <BillingIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">Platform Tier</p>
                            <p className="text-on-surface-variant text-xs">Enterprise Pro — $249/tier</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setModals({...modals, subscription: true})}
                          className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/10 hover:bg-primary-container transition-all"
                        >
                          Manage Subscription
                        </button>
                      </div>

                      <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-secondary-container/20 rounded-xl flex items-center justify-center text-on-secondary-container">
                            <Download className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">Data Archives</p>
                            <p className="text-on-surface-variant text-xs">Last archive generated 3 days ago</p>
                          </div>
                        </div>
                        <button 
                          onClick={simulateExport}
                          className="px-6 py-2.5 bg-on-surface text-white rounded-xl text-xs font-bold shadow-lg hover:bg-on-surface-variant transition-all"
                        >
                          Generate New Archive
                        </button>
                      </div>
                    </div>
                  </Card>

                  <Card className="border-red-100" title="Danger Zone" icon={Trash2}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="max-w-xl">
                        <p className="font-bold text-red-600 mb-1 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Permanent Decoupling</p>
                        <p className="text-on-surface-variant text-sm">Deleting your account will purge all facility logs, team assignments, and historical compliance data. This cannot be undone.</p>
                      </div>
                      <button 
                        onClick={() => setModals({...modals, delete: true})}
                        className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-200"
                      >
                        Delete Account
                      </button>
                    </div>
                  </Card>
                </div>
              )}
              {activeTab === "security" && <SecurityTab />}
              {activeTab === "notifications" && <NotificationsTab />}
          </div>
        </div>

        {/* --- Column 3: Insights Panel --- */}
        <aside className="w-full md:w-96 bg-white border-l border-slate-200 flex flex-col pt-12 pb-24 overflow-y-auto no-scrollbar md:sticky md:top-0 md:h-screen">
          <div className="px-8 space-y-12">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black text-slate-900 underline underline-offset-8 decoration-primary/30 uppercase tracking-[0.3em]">Facility Impact</h3>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <ImpactCard />
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.25em]">Sub-Nodes</h3>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Active (3)</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "GreenTech HQ", usage: 88, color: "bg-primary" },
                  { name: "EcoLogistics", usage: 42, color: "bg-blue-500" },
                  { name: "SolarSystems", usage: 76, color: "bg-indigo-500" }
                ].map((org, i) => (
                  <div key={i} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-slate-900">{org.name}</span>
                      <span className="text-[10px] font-black text-slate-400 group-hover:text-primary transition-colors">{org.usage}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full", org.color)}
                        style={{ width: `${org.usage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-4 border border-dashed border-slate-200 rounded-2xl text-[9px] font-black text-slate-400 hover:text-primary hover:border-primary transition-all uppercase tracking-[0.2em]">
                + Add Dynamic Node
              </button>
            </div>

            <div className="pt-8 pb-12">
               <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-200">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/40 transition-colors" />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Upgrade Pro</p>
                  <h4 className="text-xl font-bold font-headline mb-4 tracking-tight">Unlock Neural Prediction</h4>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">Access AI-driven carbon forecasting and automated compliance handling.</p>
                  <button className="w-full py-4 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    View Enterprise Tiers
                  </button>
               </div>
            </div>
          </div>
        </aside>
      </main>




      {/* --- Modals --- */}
      
      {/* Edit Profile */}
      <Modal isOpen={modals.edit} onClose={() => setModals({...modals, edit: false})} title="Update Profile">
        <div className="space-y-6">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name}&backgroundColor=b6e3f4`} className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white shadow-sm" alt="Avatar" />
              <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="text-white w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Display Name</label>
              <input value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 shadow-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Professional Title</label>
              <input value={profileData.role} onChange={(e) => setProfileData({...profileData, role: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 shadow-sm" />
            </div>
          </div>
          <button 
            onClick={() => {
              setModals({...modals, edit: false});
              notify("Success: Profile changes synchronized");
            }}
            className="btn-primary w-full justify-center py-5 mt-4"
          >
            Save Synchronized State
          </button>

        </div>
      </Modal>


      {/* Subscription */}
      <Modal isOpen={modals.subscription} onClose={() => setModals({...modals, subscription: false})} title="Subscription Plan">
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Plan</p>
            <h4 className="text-2xl font-black text-slate-900 font-headline">Enterprise Pro</h4>
            <p className="text-slate-500 text-sm mt-3 font-medium">Next billing cycle: <span className="text-slate-900 font-bold">May 12, 2024</span></p>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Available Upgrades</p>
            <div className="p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:border-primary transition-all cursor-pointer group bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-primary border border-slate-100">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Nexus Unlimited</p>
                  <p className="text-xs text-slate-500 font-medium">Infinite nodes & priority support</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          </div>
          <button className="w-full py-4 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-primary transition-all uppercase tracking-widest">Compare all plans</button>
        </div>
      </Modal>


      {/* Export Flow */}
      <Modal isOpen={modals.export} onClose={() => setModals({...modals, export: false})} title="Data Export">
        <div className="space-y-8 py-4">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Download className={cn("text-primary w-8 h-8", exportProgress < 100 && "animate-bounce")} />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {exportProgress < 100 ? "Preparing your data..." : "Archive ready for download"}
            </h4>
            <p className="text-slate-500 text-sm font-medium">Consolidating all security logs and facility metrics into a secure package.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <span>Progress</span>
              <span className="text-primary">{exportProgress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${exportProgress}%` }}
            />
            </div>
          </div>

          <button 
            disabled={exportProgress < 100}
            onClick={() => {
              setModals({...modals, export: false});
              notify("Archive downloaded successfully");
            }}
            className={cn(
              "w-full py-4 rounded-xl font-bold transition-all shadow-lg text-xs uppercase tracking-widest",
              exportProgress < 100 ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
            )}
          >
            Download Archive (.JSON)
          </button>
        </div>
      </Modal>


      {/* Delete Confirmation */}
      <Modal isOpen={modals.delete} onClose={() => setModals({...modals, delete: false})} title="Confirm Account Deletion">
        <div className="space-y-6">
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
            <AlertCircle className="text-red-600 w-6 h-6 mt-1" />
            <div className="space-y-2">
              <p className="font-bold text-red-900">This action is permanent</p>
              <p className="text-red-700/60 text-sm font-medium leading-relaxed">Deleting your account will immediately purge all facility logs and compliance data. This cannot be undone.</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Type your name to confirm</p>
            <input placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 text-center font-bold text-slate-900" />
          </div>
          <div className="flex gap-4">
            <button onClick={() => setModals({...modals, delete: false})} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
            <button 
              onClick={() => {
                setModals({...modals, delete: false});
                notify("Account purged");
              }}
              className="flex-1 py-4 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-200"
            >
              Delete Account
            </button>
          </div>
        </div>
      </Modal>


      {/* Success Notification */}
      {modals.success && (
        <div 
          className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-on-surface text-white px-8 py-4 rounded-2xl shadow-2xl z-[200] flex items-center gap-3 border border-white/10"
        >
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <p className="font-bold text-sm">Action Confirmed: System Synchronized</p>
        </div>
      )}
    </div>
  );
}
