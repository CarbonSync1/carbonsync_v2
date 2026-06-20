import Link from 'next/link';

export default function PremiumFooter() {
  return (
    <footer className="w-full mt-auto bg-[#f8fafc] text-[#0f172a] font-sans">

      {/* Main footer content — flat 4-col grid for consistent top alignment */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-6 mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 items-start">

          {/* Col 1 — Brand block */}
          <div className="flex flex-col items-start gap-4">

            {/* Logo + brand name — items-start so brand text aligns with nav h4 headings */}
            <div className="flex items-start gap-3">
              <img
                src="/unnamed.webp"
                alt="CarbonSynqEarth"
                className="h-11 w-auto object-contain flex-shrink-0"
              />
              <span className="text-[20px] font-black text-[#0f172a] leading-tight tracking-tight pt-0.5">
                CarbonSynq<span className="text-green-600">Earth</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-[#334155] text-[15px] font-semibold leading-relaxed max-w-xs">
              Built on the belief in a greener, more sustainable future.
            </p>

            {/* Social buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/company/carbonsync-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-600 hover:text-[#0077b5] hover:border-[#0077b5] shadow-sm transition-colors font-black text-[11px] tracking-wider"
              >
                LINKEDIN
              </a>
              <a
                href="https://x.com/CarbonSynq11"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-600 hover:text-black hover:border-black shadow-sm transition-colors font-black text-[11px] tracking-wider"
              >
                X
              </a>
            </div>
          </div>

          {/* Col 2 — Solutions */}
          <div>
            <h4 className="text-[13px] font-black tracking-widest text-[#0f172a] uppercase mb-5">Solutions</h4>
            <ul className="space-y-3">
              <li><Link href="/solutions/net-zero"    className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Net Zero</Link></li>
              <li><Link href="/solutions/supply-chain" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Supply Chain</Link></li>
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="text-[13px] font-black tracking-widest text-[#0f172a] uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about"   className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4 — Resources */}
          <div>
            <h4 className="text-[13px] font-black tracking-widest text-[#0f172a] uppercase mb-5">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/platform/resources" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Guides</Link></li>
              <li><Link href="/platform/resources" className="text-[15px] font-medium text-slate-500 hover:text-green-600 transition-colors">Articles</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar — mirrors upper footer grid exactly */}
      <div className="w-full bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">

          {/* ── MOBILE: stack copyright + links row ── */}
          <div className="flex flex-col items-center gap-3 md:hidden">

            {/* Copyright */}
            <p className="text-[13px] font-semibold text-slate-400 leading-none">
              © 2026 CarbonSynq Pvt. Ltd.
            </p>

            {/* Links in one horizontal row with dot separators */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <Link href="/privacy-policy"            className="text-[12px] font-semibold text-slate-400 hover:text-[#0f172a] transition-colors whitespace-nowrap">Privacy Policy</Link>
              <span className="text-slate-300 text-[11px] select-none">·</span>
              <Link href="/terms-of-service"          className="text-[12px] font-semibold text-slate-400 hover:text-[#0f172a] transition-colors whitespace-nowrap">Terms of Service</Link>
              <span className="text-slate-300 text-[11px] select-none">·</span>
              <Link href="/data-processing-agreement" className="text-[12px] font-semibold text-slate-400 hover:text-[#0f172a] transition-colors whitespace-nowrap">Data Processing Agreement</Link>
            </div>
          </div>

          {/* ── DESKTOP (md+): 12-col grid mirroring upper footer ── */}
          <div className="hidden md:grid md:grid-cols-12 lg:gap-6 items-center">

            {/* col-span-4 → under brand/logo column */}
            <div className="md:col-span-4 flex items-center justify-start">
              <p className="text-[13px] font-semibold text-slate-400 leading-none whitespace-nowrap">
                © 2026 CarbonSynq Pvt. Ltd.
              </p>
            </div>

            {/* col-span-8 → same inner 3-col grid as nav columns */}
            <div className="md:col-span-8 grid md:grid-cols-3 gap-8">

              {/* Under Solutions */}
              <div className="flex items-center justify-start">
                <Link href="/privacy-policy" className="text-[13px] font-semibold text-slate-400 hover:text-[#0f172a] transition-colors whitespace-nowrap">
                  Privacy Policy
                </Link>
              </div>

              {/* Under Company */}
              <div className="flex items-center justify-start border-l border-gray-200 pl-4">
                <Link href="/terms-of-service" className="text-[13px] font-semibold text-slate-400 hover:text-[#0f172a] transition-colors whitespace-nowrap">
                  Terms of Service
                </Link>
              </div>

              {/* Under Resources */}
              <div className="flex items-center justify-start border-l border-gray-200 pl-4">
                <Link href="/data-processing-agreement" className="text-[13px] font-semibold text-slate-400 hover:text-[#0f172a] transition-colors whitespace-nowrap">
                  Data Processing Agreement
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>


    </footer>
  );
}
