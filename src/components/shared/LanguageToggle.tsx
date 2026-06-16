'use client';

import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
      <button
        onClick={() => setLang('en')}
        className={cn(
          'px-3 py-1 rounded-md text-sm font-medium transition-all',
          lang === 'en'
            ? 'bg-white text-brand-lavender-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang('mm')}
        className={cn(
          'px-3 py-1 rounded-md text-sm font-medium transition-all',
          lang === 'mm'
            ? 'bg-white text-brand-lavender-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        မြန်မာ
      </button>
    </div>
  );
}
