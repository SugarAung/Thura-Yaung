'use client';

import { useLanguage } from '@/context/LanguageContext';
import { professionals } from '@/data/professionals';
import { CategorySlug } from '@/types';
import Badge from '@/components/shared/Badge';
import { cn } from '@/lib/utils';

interface Props {
  categorySlug: CategorySlug | null;
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2SelectProfessional({ categorySlug, selected, onSelect, onNext, onBack }: Props) {
  const { t } = useLanguage();
  const filtered = categorySlug
    ? professionals.filter((p) => p.categorySlug === categorySlug)
    : professionals;

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Choose a Professional</h2>
      <p className="text-sm text-gray-500 mb-6">Select someone you feel comfortable with.</p>

      <div className="space-y-4 mb-8">
        {filtered.map((pro) => (
          <button
            key={pro.id}
            onClick={() => onSelect(pro.id)}
            className={cn(
              'w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4',
              selected === pro.id
                ? 'border-brand-lavender-600 bg-brand-lavender-50'
                : 'border-gray-100 bg-white hover:border-brand-lavender-200 shadow-soft'
            )}
          >
            <div className="w-14 h-14 bg-brand-lavender-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
              {pro.photo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-semibold text-gray-900 text-sm">{pro.name}</span>
                {pro.isVerified && <Badge variant="verified">✓ {t('verified')}</Badge>}
              </div>
              <p className="text-xs text-gray-500 mb-1">{pro.title}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-0.5">
                  <span className="text-amber-400 text-xs">★</span>
                  <span className="text-xs font-medium text-gray-700">{pro.rating}</span>
                  <span className="text-xs text-gray-400">({pro.reviewCount})</span>
                </div>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">{pro.sessionDurationMinutes} min</span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">{pro.pricePerSession.toLocaleString()} MMK</span>
              </div>
              <div className="flex gap-1 mt-1.5">
                {pro.languages.map((l) => (
                  <span key={l} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">{l}</span>
                ))}
              </div>
            </div>
            {selected === pro.id && (
              <div className="w-6 h-6 bg-brand-lavender-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="flex-1 py-3 bg-brand-lavender-600 text-white rounded-xl font-semibold hover:bg-brand-lavender-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
