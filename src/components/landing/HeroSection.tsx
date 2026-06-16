'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-hero-gradient py-16 sm:py-24 px-4">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-lavender-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal-100 rounded-full blur-3xl opacity-40 translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center lg:text-left">
            {/* Demo badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 border border-brand-lavender-200 rounded-full px-4 py-1.5 text-sm text-brand-lavender-600 font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-teal-500 animate-pulse inline-block" />
              Frontend Demo — Business Presentation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t('hero_headline')}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {t('hero_sub')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/book"
                className="px-8 py-4 bg-brand-lavender-600 text-white rounded-xl font-semibold text-lg hover:bg-brand-lavender-700 transition-all active:scale-95 shadow-lg shadow-brand-lavender-600/20"
              >
                {t('hero_cta_book')}
              </Link>
              <Link
                href="/register-professional"
                className="px-8 py-4 bg-white text-brand-lavender-600 border-2 border-brand-lavender-200 rounded-xl font-semibold text-lg hover:bg-brand-lavender-50 transition-all active:scale-95"
              >
                {t('hero_cta_join')}
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
              {[
                { icon: '🔒', label: 'Anonymous by default' },
                { icon: '✅', label: 'Verified professionals' },
                { icon: '🇲🇲', label: 'Myanmar language' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar display */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-4">
            <div className="relative">
              {/* Center large avatar */}
              <div className="w-32 h-32 bg-brand-lavender-100 rounded-full flex items-center justify-center text-6xl shadow-card mx-auto">
                🦉
              </div>
              {/* Floating avatars */}
              {[
                { emoji: '🦊', pos: '-top-4 -left-8', bg: 'bg-orange-100' },
                { emoji: '🐼', pos: '-top-4 -right-8', bg: 'bg-gray-100' },
                { emoji: '🐰', pos: 'bottom-0 -left-12', bg: 'bg-pink-100' },
                { emoji: '🐘', pos: 'bottom-0 -right-12', bg: 'bg-slate-100' },
              ].map(({ emoji, pos, bg }) => (
                <div key={emoji} className={`absolute ${pos} w-16 h-16 ${bg} rounded-full flex items-center justify-center text-2xl shadow-soft`}>
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-6 text-center">Your real identity stays private</p>
          </div>
        </div>
      </div>
    </section>
  );
}
