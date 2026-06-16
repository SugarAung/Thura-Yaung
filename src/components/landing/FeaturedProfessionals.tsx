'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import Badge from '@/components/shared/Badge';
import { professionals } from '@/data/professionals';

const FEATURED_IDS = ['pro-1', 'pro-3', 'pro-5'];

export default function FeaturedProfessionals() {
  const { t } = useLanguage();
  const featured = professionals.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <section className="py-16 sm:py-24 px-4 bg-neutral-cream">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title={t('featured_title')}
          subtitle="Our verified professionals bring expertise, warmth, and cultural understanding to every session."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((pro) => (
            <div
              key={pro.id}
              className="bg-white rounded-2xl shadow-card p-6 flex flex-col hover:shadow-card-hover transition-all"
            >
              {/* Avatar + name */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-brand-lavender-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                  {pro.photo}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-sm">{pro.name}</h3>
                    {pro.isVerified && (
                      <Badge variant="verified">✓ {t('verified')}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{pro.title}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < Math.round(pro.rating) ? 'text-amber-400' : 'text-gray-200'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">{pro.rating} ({pro.reviewCount} reviews)</span>
              </div>

              {/* Bio */}
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                {pro.bio}
              </p>

              {/* Languages */}
              <div className="flex flex-wrap gap-1 mb-4">
                {pro.languages.map((lang) => (
                  <span key={lang} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {lang}
                  </span>
                ))}
                <span className="px-2 py-0.5 bg-brand-lavender-50 text-brand-lavender-600 text-xs rounded-full">
                  {pro.sessionDurationMinutes} min
                </span>
              </div>

              <Link
                href="/book"
                className="mt-auto w-full py-2.5 bg-brand-lavender-600 text-white rounded-xl text-sm font-medium text-center hover:bg-brand-lavender-700 transition-colors"
              >
                Book a Session
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-brand-lavender-600 font-medium hover:gap-3 transition-all"
          >
            See all {professionals.length} professionals →
          </Link>
        </div>
      </div>
    </section>
  );
}
