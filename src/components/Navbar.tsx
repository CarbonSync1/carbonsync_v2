'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

const links = [
  {
    name: 'Solutions',
    href: '#',
    hasDropdown: true,
    items: [
      { name: 'Net Zero', description: 'Track and manage carbon footprint', href: '/solutions/net-zero' },
      { name: 'Supply Chain', description: 'Monitor value chain impact', href: '/solutions/supply-chain' },
    ],
  },
  {
    name: 'Platform',
    href: '#',
    hasDropdown: true,
    items: [
      // { name: 'Dashboard', description: 'Real-time analytics and insights', href: '/dashboard' },
      { name: 'Plans', description: 'Flexible pricing for every business size', href: '/platform/pricing' },
      { name: 'Resources', description: 'Documentation, guides, and insights', href: '/platform/resources' },
    ],
  },
  {
    name: 'Company',
    href: '#',
    hasDropdown: true,
    items: [
      { name: 'About Us', description: 'Our mission and vision', href: '/about' },
      { name: 'Careers', description: 'Join our mission', href: '/careers' },
      { name: 'Contact Us', description: 'Get in touch with our team', href: '/contact' },
    ],
  },
  { name: 'Profile', href: '/profile' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/netzero/carbonsync-logo.webp"
              alt="CarbonSync"
              width={36}
              height={36}
              priority
              unoptimized
              className="w-8 h-8 md:w-9 md:h-9 object-contain"
            />
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1a2e35]">
              Carbon<span className="text-[#10b981]">Sync</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const active = !link.hasDropdown && isActive(link.href);
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-all ${
                      active
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className="text-gray-400 group-hover:rotate-180 transition-transform duration-200"
                      />
                    )}
                  </Link>

                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="bg-white border border-gray-100 shadow-xl rounded-xl p-2 min-w-[240px]">
                        {link.items?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`block px-4 py-3 rounded-lg transition-colors group/subitem ${
                              isActive(item.href)
                                ? 'bg-green-50'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                              {item.name}
                              <ArrowRight
                                size={14}
                                className="opacity-0 -translate-x-2 group-hover/subitem:opacity-100 group-hover/subitem:translate-x-0 transition-all"
                              />
                            </div>
                            {item.description && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/book-demo"
              className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-800 transition-all hover:shadow-lg active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight size={15} />
            </Link>
          </div>

          <button
            className="lg:hidden relative z-50 p-2 text-gray-700 hover:text-gray-900"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <nav className="flex-1 overflow-y-auto space-y-1">
            {links.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.name ? null : link.name
                        )
                      }
                      className="flex items-center justify-between w-full px-3 py-3 text-base font-semibold text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        activeDropdown === link.name
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {link.items?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                              isActive(item.href)
                                ? 'text-green-600 bg-green-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <div>{item.name}</div>
                            {item.description && (
                              <div className="text-xs text-gray-400 mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-3 text-base font-semibold rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="pt-4 border-t border-gray-100">
            <Link
              href="/book-demo"
              onClick={() => setOpen(false)}
              className="bg-gray-900 text-white px-5 py-3.5 rounded-xl text-base font-semibold flex items-center justify-center gap-2 w-full hover:bg-gray-800 transition-colors"
            >
              Book a demo
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
