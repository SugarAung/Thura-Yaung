'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { categories } from '@/data/categories';

export default function CategoriesPreview() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-16 sm:py-24 px-4 bg-neutral-cream">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title={t('cat_title')}
          subtitle="Choose the type of support that feels right for you."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories#${cat.slug}`}
              className={`${cat.color} border ${cat.borderColor} rounded-2xl p-6 flex flex-col gap-3 hover:shadow-card-hover transition-all group`}
            >
              <div className="text-4xl">{cat.emoji}</div>
              <div>
                <h3 className={`font-semibold text-gray-900 text-base group-hover:${cat.accentColor} transition-colors`}>
                  {lang === 'mm' ? cat.mmName : cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                  {lang === 'mm' ? cat.mmDescription : cat.description}
                </p>
              </div>
              <div className={`text-xs font-medium ${cat.accentColor} flex items-center gap-1 mt-auto`}>
                {cat.professionalCount} professionals
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-brand-lavender-600 font-medium hover:gap-3 transition-all"
          >
            Browse all professionals
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
