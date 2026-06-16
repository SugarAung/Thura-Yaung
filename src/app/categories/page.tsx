'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { professionals } from '@/data/professionals';
import Badge from '@/components/shared/Badge';
import SectionHeader from '@/components/shared/SectionHeader';
import { CategorySlug } from '@/types';

export default function CategoriesPage() {
  const { t, lang } = useLanguage();
  const [activeSlug, setActiveSlug] = useState<CategorySlug | 'all'>('all');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title={t('cat_title')}
        subtitle="Browse our four consultation categories and find the professional who is right for you."
      />

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setActiveSlug('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeSlug === 'all'
              ? 'bg-brand-lavender-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-lavender-300'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveSlug(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeSlug === cat.slug
                ? 'bg-brand-lavender-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-lavender-300'
            }`}
          >
            <span>{cat.emoji}</span>
            {lang === 'mm' ? cat.mmName : cat.name}
          </button>
        ))}
      </div>

      {/* Category info cards */}
      {(activeSlug === 'all' ? categories : categories.filter((c) => c.slug === activeSlug)).map((cat) => {
        const catPros = professionals.filter((p) => p.categorySlug === cat.slug);
        if (activeSlug !== 'all' && activeSlug !== cat.slug) return null;

        return (
          <div key={cat.id} id={cat.slug} className="mb-14">
            {/* Category header */}
            <div className={`${cat.color} border ${cat.borderColor} rounded-2xl p-6 mb-6`}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">{cat.emoji}</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {lang === 'mm' ? cat.mmName : cat.name}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                    {lang === 'mm' ? cat.mmDescription : cat.description}
                  </p>
                  <p className={`text-xs font-medium ${cat.accentColor} mt-2`}>
                    {cat.professionalCount} professionals available
                  </p>
                </div>
              </div>
            </div>

            {/* Professional cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {catPros.map((pro) => (
                <div key={pro.id} className="bg-white rounded-2xl shadow-card p-5 flex flex-col hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-brand-lavender-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                      {pro.photo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{pro.name}</h3>
                        {pro.isVerified && <Badge variant="verified">✓ {t('verified')}</Badge>}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{pro.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-amber-400 text-sm">★</span>
                        <span className="text-sm font-medium text-gray-700">{pro.rating}</span>
                        <span className="text-xs text-gray-400">({pro.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">{pro.bio}</p>

                  {/* Certificates */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-1.5">Certificates</p>
                    <div className="flex flex-col gap-1">
                      {pro.certificates.slice(0, 2).map((cert) => (
                        <div key={cert} className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="text-brand-teal-500">✓</span>
                          {cert}
                        </div>
                      ))}
                      {pro.certificates.length > 2 && (
                        <span className="text-xs text-gray-400">+{pro.certificates.length - 2} more</span>
                      )}
                    </div>
                  </div>

                  {/* Languages + duration */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pro.languages.map((l) => (
                      <span key={l} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{l}</span>
                    ))}
                    <span className="px-2 py-0.5 bg-brand-lavender-50 text-brand-lavender-600 text-xs rounded-full">
                      {pro.sessionDurationMinutes} min session
                    </span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400">From</span>
                      <p className="text-sm font-bold text-gray-900">
                        {pro.pricePerSession.toLocaleString()} MMK
                      </p>
                    </div>
                    <Link
                      href="/book"
                      className="px-5 py-2 bg-brand-lavender-600 text-white rounded-xl text-sm font-medium hover:bg-brand-lavender-700 transition-colors"
                    >
                      Book Session
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
