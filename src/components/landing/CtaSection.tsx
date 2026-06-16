'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-brand-lavender-600 to-brand-teal-500 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3" />

          <div className="relative">
            <div className="text-5xl mb-6">🌟</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('cta_title')}
            </h2>
            <p className="text-brand-lavender-100 text-lg mb-8 max-w-md mx-auto">
              {t('cta_sub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="px-8 py-4 bg-white text-brand-lavender-600 rounded-xl font-bold text-lg hover:bg-brand-lavender-50 transition-all active:scale-95 shadow-lg"
              >
                {t('cta_btn')}
              </Link>
              <Link
                href="/categories"
                className="px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all"
              >
                Browse Professionals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
