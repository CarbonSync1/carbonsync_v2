'use client';

import { useState } from "react";
import { Leaf, Mail, Phone, MapPin, Clock, ShieldCheck, User, Building, ChevronDown, ArrowRight, Globe, CheckCircle2 } from "lucide-react";

export default function ContactHero() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xojyggok', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div 
      className="relative flex items-center overflow-hidden font-sans bg-white min-h-[850px]"
      style={{
        backgroundImage: "url('/landscape-bg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 80%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dynamic Overlays for framing and readability */}
      <div className="absolute inset-0 bg-white/30 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/10 to-transparent h-[40%] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-0"></div>

      <div className="max-w-[1280px] mx-auto w-full px-6 md:px-12 lg:px-20 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start py-20">
        
        {/* Left Column: Content */}
        <div className="w-full lg:w-[45%] flex flex-col pt-4">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-[12px] font-bold w-max mb-8 border border-green-100">
            <Leaf size={14} className="fill-green-600/20" /> Let's Build a Net Zero Future Together
          </div>

          <h1 className="text-[40px] md:text-[52px] font-black text-[#0f172a] leading-[1.1] mb-6 tracking-tight">
            Start Your <br />
            <span className="text-green-600">Net Zero Journey</span> <br />
            with CarbonSynq
          </h1>

          <p className="text-[16px] text-slate-500 leading-relaxed mb-12 max-w-md font-medium">
            We help businesses measure, reduce, and offset their carbon footprint with data-driven solutions for a sustainable tomorrow.
          </p>

          <div className="space-y-8">
            {/* Email */}
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20 transition-transform group-hover:scale-110">
                <Mail size={20} className="text-white" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Email</span>
                <span className="text-[#0f172a] font-bold text-[15px] group-hover:text-green-600 transition-colors">pushkarsingh.carbonsynqearth@gmail.com</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20 transition-transform group-hover:scale-110">
                <Phone size={20} className="text-white" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Phone</span>
                <span className="text-[#0f172a] font-bold text-[15px] group-hover:text-green-600 transition-colors">+91 99118 75613</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20 transition-transform group-hover:scale-110">
                <MapPin size={20} className="text-white" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Address</span>
                <span className="text-[#0f172a] font-bold text-[15px] group-hover:text-green-600 transition-colors leading-tight">
                  1st Floor, E58, Sec 3 , Noida, Uttar Pradesh
                </span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20 transition-transform group-hover:scale-110">
                <Clock size={20} className="text-white" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Working Hours</span>
                <span className="text-[#0f172a] font-bold text-[15px] group-hover:text-green-600 transition-colors">Mon - Fri | 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="w-full lg:w-[50%] max-w-[580px]">
          <div className="bg-white rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.08)] p-10 md:p-12 border border-slate-50 relative">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#0f172a] uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input name="name" type="text" required placeholder="Enter your name" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/30 outline-none focus:ring-4 focus:ring-green-500/5 focus:border-green-600 focus:bg-white transition-all text-[14px] font-medium placeholder:text-slate-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#0f172a] uppercase tracking-wider ml-1">Work Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input name="email" type="email" required placeholder="name@company.co" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/30 outline-none focus:ring-4 focus:ring-green-500/5 focus:border-green-600 focus:bg-white transition-all text-[14px] font-medium placeholder:text-slate-300" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#0f172a] uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="relative w-24 shrink-0">
                      <select name="country_code" className="w-full pl-4 pr-8 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/30 outline-none appearance-none text-[14px] font-bold">
                        <option value="+91">IN ⌄</option>
                      </select>
                    </div>
                    <input name="phone" type="tel" required placeholder="+91 98765 4" className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/30 outline-none focus:ring-4 focus:ring-green-500/5 focus:border-green-600 focus:bg-white transition-all text-[14px] font-medium placeholder:text-slate-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#0f172a] uppercase tracking-wider ml-1">Company</label>
                  <div className="relative">
                    <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input name="company" type="text" placeholder="Enter company name" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/30 outline-none focus:ring-4 focus:ring-green-500/5 focus:border-green-600 focus:bg-white transition-all text-[14px] font-medium placeholder:text-slate-300" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#0f172a] uppercase tracking-wider ml-1">What do you need help with?</label>
                <div className="relative">
                  <select name="help_category" className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/30 outline-none focus:ring-4 focus:ring-green-500/5 focus:border-green-600 focus:bg-white transition-all text-[14px] font-medium appearance-none text-slate-500">
                    <option value="">Select an option</option>
                    <option value="Carbon Measurement">Carbon Measurement</option>
                    <option value="Reduction Strategy">Reduction Strategy</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#0f172a] uppercase tracking-wider ml-1">Message</label>
                <textarea name="message" required rows={4} placeholder="Tell us about your sustainability goals..." className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/30 outline-none focus:ring-4 focus:ring-green-500/5 focus:border-green-600 focus:bg-white transition-all text-[14px] font-medium resize-none placeholder:text-slate-300"></textarea>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input 
                  type="checkbox" 
                  required 
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-200 text-green-600 focus:ring-green-500 cursor-pointer" 
                />
                <p className="text-[12px] text-slate-400 leading-relaxed font-medium">
                  I agree to the <a href="http://localhost:5174/" className="text-green-600 font-bold hover:underline cursor-pointer">privacy policy</a> and allow CarbonSynq to contact me regarding my inquiry.
                </p>
              </div>

              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-100 text-green-800 px-8 py-6 rounded-2xl flex items-center gap-4">
                  <CheckCircle2 size={24} className="text-green-600 shrink-0" />
                  <div>
                    <h4 className="font-black text-[15px]">Message Sent</h4>
                    <p className="text-[13px] font-medium text-green-700/80">We'll get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <button 
                  type="submit" 
                  disabled={!isAgreed || formStatus === 'submitting'}
                  className={`w-full font-black py-4 rounded-2xl transition-all flex justify-center items-center gap-3 text-[15px] ${
                    isAgreed && formStatus !== 'submitting'
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/20" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {formStatus === 'submitting' ? 'Submitting...' : (
                    <>Start Net Zero Journey <ArrowRight size={18} /></>
                  )}
                </button>
              )}
              {formStatus === 'error' && (
                <p className="text-sm font-black text-red-500 mt-2 text-center">Failed to send message. Please try again.</p>
              )}
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                  <ShieldCheck size={12} className="text-green-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Data Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                  <Leaf size={12} className="text-green-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sustainability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                  <Clock size={12} className="text-green-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">24H Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
