"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Check,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Server,
  Lock,
  Leaf,
  BarChart3,
  Zap,
  Globe2,
  Building2,
  Mail,
  Activity,
  Award,
  Cpu,
  Layers,
  Sparkles,
  Minus
} from "lucide-react";

// --- DATA ---

const plans = [
  {
    name: "Growth",
    desc: "Essential carbon tracking for emerging teams.",
    priceMonthly: "₹50,000",
    onboarding: "₹25,000",
    savingsBadge: "Up to 50 employees",
    features: [
      "AI-powered emission baselining",
      "Scope 1 & 2 dashboard",
      "Monthly carbon reports",
      "Community support access",
    ],
    icon: Leaf,
    highlighted: false,
  },
  {
    name: "Professional",
    desc: "Advanced intelligence for scaling organizations.",
    priceMonthly: "₹1,00,000",
    onboarding: "₹75,000",
    savingsBadge: "Up to 250 employees",
    features: [
      "Everything in Growth",
      "Full Scope 1, 2 & 3 tracking",
      "Automated supplier data collection",
      "Predictive reduction insights",
      "Priority email & chat support",
    ],
    icon: BarChart3,
    highlighted: true,
  },
  {
    name: "Enterprise",
    desc: "Uncapped scaling with dedicated architecture.",
    priceMonthly: "Custom",
    onboarding: "Custom",
    savingsBadge: "Above 250 employees",
    features: [
      "Everything in Professional",
      "Unlimited business units & users",
      "Dedicated sustainability architect",
      "Custom compliance workflows",
      "24/7 White-glove support",
    ],
    icon: ShieldCheck,
    highlighted: false,
  },
];

const compareFeatures = [
  { category: "Core Intelligence", features: [
    { name: "Scope 1 & 2 Tracking", tiers: [true, true, true] },
    { name: "Scope 3 Supply Chain", tiers: [false, true, true] },
    { name: "AI Reduction Pathways", tiers: [false, true, true] },
  ]},
  { category: "Enterprise Integrations", features: [
    { name: "Custom Emission Factors", tiers: [false, true, true] },
    { name: "Real-time API Access", tiers: [false, true, true] },
    { name: "ERP Integrations (SAP, Oracle)", tiers: [false, false, true] },
  ]},
  { category: "Security & Support", features: [
    { name: "SOC 2 Type II Compliant", tiers: [true, true, true] },
    { name: "Dedicated Account Manager", tiers: [false, false, true] },
    { name: "SLA Guarantee (99.99%)", tiers: [false, false, true] },
  ]}
];

const faqs = [
  {
    question: "How does the AI-powered carbon accounting work?",
    answer: "Our neural engines ingest your utility data, travel logs, and procurement pipelines to automatically map and calculate emissions against GHG Protocol standards with 99.8% accuracy, saving thousands of manual hours."
  },
  {
    question: "Is CarbonSynqEarth compliant with new SEC and CSRD regulations?",
    answer: "Yes. CarbonSynqEarth is engineered for global compliance. Our platform generates audit-ready reports instantly formatted for SEC, CSRD, SFDR, and CDP requirements."
  },
  {
    question: "How long does implementation take?",
    answer: "For Starter and Growth plans, onboarding takes less than 24 hours. Enterprise integrations vary based on ERP complexity but typically go live within 14-21 days thanks to our pre-built connectors."
  }
];

// --- COMPONENTS ---

const MagneticButton = ({ children, className, onClick, type = "button", disabled = false }: { children: React.ReactNode, className?: string, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    setPosition({ x, y });
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden ${className} ${disabled ? 'opacity-75 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default function CarbonSynqEarthPricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [calcValue, setCalcValue] = useState(1000);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xojyggok", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setFormStatus("success");
        form.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };
  
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden relative pt-16 pb-16">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb33_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb33_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />


      {/* --- HERO SECTION --- */}
      <section className="relative pt-8 pb-24 px-6 max-w-[1400px] mx-auto z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text Content */}
        <div className="flex flex-col items-start text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm mb-8 group"
          >
            <Sparkles className="w-4 h-4 text-emerald-500 group-hover:animate-spin" />
            <span className="text-sm font-semibold text-slate-800">CarbonSynqEarth Engine 3.0 Released</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[72px] font-black tracking-tighter leading-[1.05] mb-8 text-slate-900"
          >
            Pricing Built for the Future of <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-600">
              Carbon Intelligence.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-xl mb-12 font-medium"
          >
            Deploy military-grade ESG automation. Track, reduce, and report your global emissions footprint with unprecedented AI precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 z-20 w-full sm:w-auto"
          >
            <MagneticButton 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:bg-emerald-500 transition-colors whitespace-nowrap"
            >
              Start Carbon Intelligence
            </MagneticButton>
            <MagneticButton 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-lg hover:bg-slate-50 shadow-sm transition-colors whitespace-nowrap"
            >
              Schedule Enterprise Demo
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: 3D Dashboard Visualization */}
        <motion.div 
          style={{ y: yParallax }}
          className="relative w-full rounded-[32px] p-2 bg-gradient-to-b from-slate-100 to-white border border-slate-200 shadow-2xl mt-12 lg:mt-0"
        >
          <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-[32px]" />
          <div className="relative rounded-[24px] overflow-hidden bg-white border border-slate-200 aspect-[4/3] lg:aspect-[16/10] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            {/* Browser chrome bar */}
            <div className="absolute top-0 left-0 w-full h-10 lg:h-12 bg-slate-50/80 backdrop-blur border-b border-slate-200 flex items-center px-4 lg:px-6 gap-2 z-20">
              <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-300" />
            </div>
            {/* Dashboard image */}
            <Image src="/hero-image-final.jpg" alt="CarbonSynqEarth Dashboard" width={1200} height={750} className="w-full h-full object-cover object-center" unoptimized />
          </div>
        </motion.div>

      </section>



      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-16 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter text-center">
              Uncompromising Power.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Transparent Tiers.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-end max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  key={plan.name}
                  className={`group relative h-full flex flex-col p-8 rounded-[32px] transition-all duration-500 ${
                    plan.highlighted 
                      ? "bg-slate-950 text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] xl:-translate-y-8" 
                      : "bg-white border border-slate-200 text-slate-900 hover:shadow-xl hover:border-slate-300"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -inset-[1px] bg-gradient-to-b from-emerald-500/50 to-transparent rounded-[33px] -z-10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}

                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-black tracking-widest uppercase shadow-lg">
                      Recommended
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-3 rounded-2xl ${plan.highlighted ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${plan.highlighted ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-100 text-emerald-700"}`}>
                      {plan.savingsBadge}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-black mb-2 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                  <p className={`text-sm h-10 mb-6 ${plan.highlighted ? "text-slate-400" : "text-slate-500"}`}>{plan.desc}</p>

                  <div className="mb-8">
                    <div className="flex items-end gap-2 mb-2">
                      <span className={`text-4xl font-black tracking-tight ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
                        {plan.priceMonthly}{plan.priceMonthly !== "Custom" && "*"}
                      </span>
                      {plan.priceMonthly !== "Custom" && <span className={`text-sm font-semibold pb-1 ${plan.highlighted ? "text-slate-400" : "text-slate-500"}`}>/ month</span>}
                    </div>
                    {plan.priceMonthly !== "Custom" ? (
                      <p className={`text-sm font-medium ${plan.highlighted ? "text-emerald-300" : "text-emerald-600"}`}>
                        + {plan.onboarding} onboarding fee
                      </p>
                    ) : (
                      <p className={`text-sm font-medium ${plan.highlighted ? "text-emerald-300" : "text-emerald-600"}`}>
                        Tailored to your enterprise needs
                      </p>
                    )}
                  </div>

                  <button 
                    onClick={() => {
                      window.location.href = "/book-demo";
                    }}
                    className={`w-full py-4 rounded-xl text-sm font-bold transition-all duration-300 mb-10 ${
                      plan.highlighted 
                        ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg" 
                        : "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm"
                    }`}
                  >
                    {plan.priceMonthly === "Custom" ? "Contact Enterprise" : "Start Free Trial"}
                  </button>

                  <div className={`pt-8 border-t flex-1 ${plan.highlighted ? "border-white/10" : "border-slate-100"}`}>
                    <ul className="space-y-5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 group/item">
                          <Check className={`w-5 h-5 shrink-0 transition-transform group-hover/item:scale-110 ${plan.highlighted ? "text-emerald-400" : "text-emerald-600"}`} strokeWidth={3} />
                          <span className={`text-sm font-medium ${plan.highlighted ? "text-slate-300" : "text-slate-600"}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* India Pricing Disclaimer at the bottom of the grid */}
          <div className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-slate-600 bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200">
              <span className="text-emerald-600 text-lg leading-none">*</span> 
              This pricing is for India only
            </p>
          </div>
        </div>
      </section>

      {/* --- COMPARISON TABLE --- */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Feature <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Comparison</span> Matrix</h2>
          
          <div className="overflow-x-auto pb-8 custom-scrollbar">
            <div className="min-w-[900px] bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-6 border-b border-slate-200 bg-slate-50">
                <div className="col-span-1"></div>
                {plans.map(plan => (
                  <div key={plan.name} className="text-center font-bold text-slate-900 text-lg">{plan.name}</div>
                ))}
              </div>

              {compareFeatures.map((section, sIdx) => (
                <div key={sIdx}>
                  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200">
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">{section.category}</span>
                  </div>
                  {section.features.map((feat, fIdx) => (
                    <div key={fIdx} className="grid grid-cols-4 gap-4 px-6 py-5 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="col-span-1 text-sm text-slate-700 font-medium">{feat.name}</div>
                      {feat.tiers.map((has, i) => (
                        <div key={i} className="flex items-center justify-center">
                          {has ? <Check className="w-5 h-5 text-emerald-500" /> : <Minus className="w-5 h-5 text-slate-300" />}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- LUXURY TESTIMONIALS --- */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter text-center">
              Meet the Visionaries Behind<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">CarbonSynqEarth.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">The engineering leadership powering the future of ESG compliance.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { text: "CarbonSynqEarth reduced our reporting cycle from 6 weeks to 3 days. The AI insights are astonishingly accurate.", author: "Ayush Chaudhary", role: "COO, CARBONSYNEARTH", image: "/about-assets/team-2.jpg" },
              { text: "The most beautiful piece of enterprise software we use. But more importantly, it actually drives our emissions down.", author: "Pushkar Singh", role: "CEO, CARBONSYNEARTH", image: "/about-assets/team-1-new.jpg" },
              { text: "Unmatched compliance readiness. When the auditors arrived, we just handed them a CarbonSynqEarth report. Perfect.", author: "Priyanshu Barai", role: "BACKEND DEVELOPER, CARBONSYNEARTH", image: "/about-assets/team-4.jpg" },
              { text: "Building the UI for CarbonSynqEarth has been an incredible experience. The architecture is as seamless as its data engine.", author: "Sarwang Agarwal", role: "FULL STACK DEVELOPER, CARBONSYNEARTH", image: "/about-assets/team-3.jpg" }
            ].map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all group"
              >
                <Award className="w-8 h-8 text-emerald-500/50 mb-6 group-hover:text-emerald-500 transition-colors" />
                <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
                  <div>
                    <p className="font-bold text-slate-900">{t.author}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 relative z-10 border-t border-slate-200 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-slate-900 mb-12 text-center">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Questions</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:border-slate-300 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                >
                  <span className="font-bold text-lg text-slate-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-600 transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                      <div className="px-8 pb-8 text-slate-600 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SPLIT CONTACT SECTION --- */}
      <section id="contact" className="py-32 relative z-10 border-t border-slate-200 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Left: Visualization */}
            <div className="relative flex flex-col justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 relative z-10">Systematize <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Sustainability.</span></h2>
              <p className="text-xl text-slate-600 mb-12 relative z-10 max-w-md">Connect with our enterprise architecture team to map your path to Net-Zero compliance.</p>
              
              <div className="relative z-10 flex flex-col gap-6">
                {[
                  { title: "Custom Integration Mapping", desc: "SAP, Oracle, NetSuite architecture" },
                  { title: "Compliance Gap Analysis", desc: "SEC, CSRD, SFDR readiness" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-200">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Floating Form */}
            <div className="bg-slate-50 border border-slate-200 p-10 md:p-14 rounded-[40px] shadow-xl relative">
              <form onSubmit={handleFormSubmit} action="https://formspree.io/f/xojyggok" method="POST" className="space-y-8 relative z-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="text" name="firstName" id="fname2" required className="block w-full px-0 py-3 text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer transition-colors font-medium text-lg" placeholder=" " />
                    <label htmlFor="fname2" className="absolute text-lg text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600 font-bold">First Name</label>
                  </div>
                  <div className="relative group">
                    <input type="text" name="lastName" id="lname2" required className="block w-full px-0 py-3 text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer transition-colors font-medium text-lg" placeholder=" " />
                    <label htmlFor="lname2" className="absolute text-lg text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600 font-bold">Last Name</label>
                  </div>
                </div>
                
                <div className="relative group">
                  <input type="email" name="email" id="email2" required className="block w-full px-0 py-3 text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer transition-colors font-medium text-lg" placeholder=" " />
                  <label htmlFor="email2" className="absolute text-lg text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600 font-bold">Work Email</label>
                </div>

                <div className="relative group">
                  <textarea id="message2" name="message" rows={1} required className="block w-full px-0 py-3 text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer transition-colors font-medium text-lg resize-none" placeholder=" "></textarea>
                  <label htmlFor="message2" className="absolute text-lg text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600 font-bold">Initiative Details</label>
                </div>

                <MagneticButton 
                  type="submit" 
                  className={`w-full py-5 rounded-2xl font-black text-lg shadow-md transition-colors mt-12 flex items-center justify-center gap-2 ${
                    formStatus === "success" 
                      ? "bg-emerald-500 text-white" 
                      : formStatus === "error"
                      ? "bg-red-500 text-white"
                      : "bg-emerald-600 text-white hover:bg-emerald-500"
                  }`}
                  disabled={formStatus === "submitting" || formStatus === "success"}
                >
                  {formStatus === "submitting" ? (
                    "Sending Request..."
                  ) : formStatus === "success" ? (
                    <>Request Received <Check className="w-5 h-5" /></>
                  ) : formStatus === "error" ? (
                    "Error. Try Again"
                  ) : (
                    <>Request Architecture Review <ArrowRight className="w-5 h-5" /></>
                  )}
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.8); }
      `}} />
    </div>
  );
}
