'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PremiumFooter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xojyggok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        console.error("Formspree submission error");
      }
    } catch (error) {
      console.error("Formspree submission failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="w-full mt-auto bg-[#f8fafc] text-[#0f172a] font-sans">
      <div className="w-full bg-gradient-to-br from-[#f2f9f5] via-[#f8fafc] to-[#e6f4ea] border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <div className="flex flex-col gap-10 justify-center">

          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-green-700 shadow-sm shrink-0 mt-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">Our Headquarters</p>
              <h4 className="text-base font-bold text-slate-700">CarbonSync Private Limited</h4>
              <p className="text-sm font-bold text-slate-500 uppercase mt-1">UTTAR PRADESH, NOIDA</p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-green-700 shadow-sm shrink-0 mt-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">Get in touch</p>
              <h4 className="text-base font-bold text-slate-700">+91 9911875613</h4>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-green-700 shadow-sm shrink-0 mt-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">Email us</p>
              <h4 className="text-base font-bold text-slate-700">pushkarsingh.carbonsync@gmail.com</h4>
            </div>
          </div>

        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-white">
          <h3 className="text-3xl font-black tracking-tight text-[#0f172a] mb-2">Stay in the loop</h3>
          <p className="text-slate-500 font-medium text-[13px] mb-8">
            Join our community for the latest in sustainability & ESG tech.
          </p>

          {isSubmitted ? (
            <div className="flex items-center gap-4 bg-[#f2f9f5] border border-green-200 text-green-800 p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              </div>
              <div>
                <p className="font-bold text-[15px]">Message sent successfully!</p>
                <p className="text-[13px] text-green-700/80 mt-0.5">Thank you for subscribing to our newsletter.</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-white border border-gray-100 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#0f172a] hover:bg-green-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold text-[13px] px-8 py-3.5 rounded-xl transition-colors"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex flex-col items-start gap-4 mb-6">
              <div className="flex items-start">
                <img src="/logo.webp" alt="CarbonSync" className="h-16 w-auto object-contain" />
              </div>
              <p className="text-[#334155] text-[16px] font-bold leading-relaxed max-w-[280px]">
                Built on the belief in a greener, more sustainable future.
              </p>
            </div>

            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 mt-4">Connect & Scan</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://www.linkedin.com/company/carbonsync-india/" target="_blank" rel="noopener noreferrer" className="h-10 px-4 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-600 hover:text-[#0077b5] hover:border-[#0077b5] shadow-sm transition-colors font-black text-[11px] tracking-wider">
                LINKEDIN
              </a>
              <a href="https://x.com/CarbonSync11" target="_blank" rel="noopener noreferrer" className="h-10 px-4 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-600 hover:text-black hover:border-black shadow-sm transition-colors font-black text-[11px] tracking-wider">
                X
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[14px] font-black tracking-widest text-[#0f172a] uppercase mb-6">Solutions</h4>
              <ul className="space-y-4">
                <li><Link href="/solutions/net-zero" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Net Zero</Link></li>
                <li><Link href="/solutions/supply-chain" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Supply Chain</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-black tracking-widest text-[#0f172a] uppercase mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Analytics</Link></li>
                <li><Link href="/careers" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-black tracking-widest text-[#0f172a] uppercase mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><button type="button" onClick={() => router.push('/dashboard')} className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors cursor-pointer">Dashboard</button></li>
                <li><button type="button" onClick={() => router.push('/profile')} className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors cursor-pointer">Profile</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-black tracking-widest text-[#0f172a] uppercase mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><Link href="/platform/resources" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Guides</Link></li>
                <li><Link href="/platform/resources" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Articles</Link></li>
                <li><Link href="/platform/resources" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Whitepapers</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full bg-white border-t border-gray-100 mt-0">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[16px] font-bold text-slate-500 max-w-[250px] leading-snug">
            Copyright 2026<br/>CarbonSync Pvt. Ltd.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { label: 'All rights reserved', href: '#' },
              { label: 'Refund Policy', href: '/refund-policy' },
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms-of-service' },
              { label: 'Data Processing Agreement', href: '/data-processing-agreement' },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center">
                {i > 0 && <div className="hidden md:block h-3 w-[1px] bg-gray-200 mr-6" />}
                <Link
                  href={item.href}
                  className="text-[16px] font-bold text-slate-500 hover:text-[#0f172a] transition-colors"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
