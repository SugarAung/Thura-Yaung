'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/',           labelKey: 'nav_home' as const },
  { href: '/categories', labelKey: 'nav_categories' as const },
  { href: '/community',  labelKey: 'nav_community' as const },
  { href: '/news',       labelKey: 'nav_news' as const },
  { href: '/safety',     labelKey: 'nav_safety' as const },
];

const DASHBOARD_LINKS = [
  { href: '/dashboard/client',       labelKey: 'nav_client_dashboard' as const },
  { href: '/dashboard/professional', labelKey: 'nav_pro_dashboard' as const },
  { href: '/admin',                  labelKey: 'nav_admin' as const },
];

export default function NavBar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌟</span>
            <span className="font-bold text-xl text-brand-lavender-600 tracking-tight">Thura Yaung</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(href)
                    ? 'text-brand-lavender-600 bg-brand-lavender-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {t(labelKey)}
              </Link>
            ))}

            {/* Dashboard dropdown */}
            <div className="relative">
              <button
                onClick={() => setDashOpen(!dashOpen)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-1 transition-colors"
              >
                Dashboard
                <svg className={cn('w-4 h-4 transition-transform', dashOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dashOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-card-hover border border-gray-100 py-1 animate-slide-down">
                  {DASHBOARD_LINKS.map(({ href, labelKey }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setDashOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-lavender-50 hover:text-brand-lavender-600 transition-colors"
                    >
                      {t(labelKey)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/book"
              className="px-5 py-2 bg-brand-lavender-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-lavender-700 transition-colors"
            >
              {t('nav_book_now')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
              <span className={cn('block h-0.5 bg-current transition-all origin-center', mobileOpen && 'rotate-45 translate-y-2')} />
              <span className={cn('block h-0.5 bg-current transition-all', mobileOpen && 'opacity-0')} />
              <span className={cn('block h-0.5 bg-current transition-all origin-center', mobileOpen && '-rotate-45 -translate-y-2')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive(href)
                    ? 'text-brand-lavender-600 bg-brand-lavender-50'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {t(labelKey)}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Dashboards</p>
              {DASHBOARD_LINKS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t(labelKey)}
                </Link>
              ))}
            </div>
            <div className="pt-3 flex items-center justify-between">
              <LanguageToggle />
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="px-5 py-2 bg-brand-lavender-600 text-white rounded-xl text-sm font-semibold"
              >
                {t('nav_book_now')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
