'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lang } from '@/types';
import { translations, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'en' || saved === 'mm') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    // Update html class for Burmese font
    if (l === 'mm') {
      document.documentElement.classList.add('font-myanmar');
      document.documentElement.classList.remove('font-sans');
    } else {
      document.documentElement.classList.remove('font-myanmar');
      document.documentElement.classList.add('font-sans');
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? translations['en'][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
