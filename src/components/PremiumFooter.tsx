'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PremiumFooter() {
  const router = useRouter();


  return (
    <footer className="w-full mt-auto bg-[#f8fafc] text-text-dark font-sans">

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex flex-col items-start gap-4 mb-6">
              <div className="flex items-start">
                <img src="/logo.webp" alt="CarbonSync" className="h-16 w-auto object-contain" />
              </div>
              <p className="text-[#334155] text-[16px] font-bold leading-relaxed max-w-70">
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
              <h4 className="text-[14px] font-black tracking-widest text-text-dark uppercase mb-6">Solutions</h4>
              <ul className="space-y-4">
                <li><Link href="/solutions/net-zero" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Net Zero</Link></li>
                <li><Link href="/solutions/supply-chain" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Supply Chain</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-black tracking-widest text-text-dark uppercase mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Analytics</Link></li>
                <li><Link href="/careers" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-black tracking-widest text-text-dark uppercase mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><button type="button" onClick={() => router.push('/dashboard')} className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors cursor-pointer">Dashboard</button></li>
                <li><button type="button" onClick={() => router.push('/profile')} className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors cursor-pointer">Profile</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-black tracking-widest text-text-dark uppercase mb-6">Resources</h4>
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
          <p className="text-[16px] font-bold text-slate-500 max-w-62.5 leading-snug">
            Copyright 2026<br/>CarbonSync Pvt. Ltd.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { label: 'Refund Policy', href: '/refund-policy' },
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms-of-service' },
              { label: 'Data Processing Agreement', href: '/data-processing-agreement' },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center">
                {i > 0 && <div className="hidden md:block h-3 w-px bg-gray-200 mr-6" />}
                <Link
                  href={item.href}
                  className="text-[16px] font-bold text-slate-500 hover:text-text-dark transition-colors"
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
