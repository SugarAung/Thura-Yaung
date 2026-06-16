'use client';

import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { CategorySlug } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  selected: CategorySlug | null;
  onSelect: (slug: CategorySlug) => void;
  onNext: () => void;
}

export default function Step1SelectCategory({ selected, onSelect, onNext }: Props) {
  const { lang } = useLanguage();

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 mb-2">What kind of support are you looking for?</h2>
      <p className="text-sm text-gray-500 mb-6">Choose a category. You can always change this later.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={cn(
              'text-left p-5 rounded-2xl border-2 transition-all',
              selected === cat.slug
                ? 'border-brand-lavender-600 bg-brand-lavender-50 shadow-md'
                : `${cat.color} border-transparent hover:border-${cat.borderColor}`
            )}
          >
            <div className="text-3xl mb-2">{cat.emoji}</div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {lang === 'mm' ? cat.mmName : cat.name}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {lang === 'mm' ? cat.mmDescription : cat.description}
            </p>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full py-3.5 bg-brand-lavender-600 text-white rounded-xl font-semibold hover:bg-brand-lavender-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  );
}
