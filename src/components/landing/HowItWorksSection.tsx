'use client';

import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';

const STEPS = [
  {
    icon: '🦊',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100',
    iconBg: 'bg-orange-100',
    number: '01',
    titleKey: 'how_step1_title' as const,
    descKey: 'how_step1_desc' as const,
  },
  {
    icon: '🔍',
    bgColor: 'bg-brand-lavender-50',
    borderColor: 'border-brand-lavender-100',
    iconBg: 'bg-brand-lavender-100',
    number: '02',
    titleKey: 'how_step2_title' as const,
    descKey: 'how_step2_desc' as const,
  },
  {
    icon: '🌿',
    bgColor: 'bg-brand-teal-50',
    borderColor: 'border-brand-teal-100',
    iconBg: 'bg-brand-teal-100',
    number: '03',
    titleKey: 'how_step3_title' as const,
    descKey: 'how_step3_desc' as const,
  },
];

export default function HowItWorksSection() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title={t('how_title')}
          subtitle="Getting support should feel simple and safe. Here is how it works."
        />

        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map(({ icon, bgColor, borderColor, iconBg, number, titleKey, descKey }) => (
            <div
              key={number}
              className={`${bgColor} border ${borderColor} rounded-2xl p-6 relative overflow-hidden`}
            >
              {/* Step number watermark */}
              <span className="absolute top-3 right-4 text-5xl font-black text-black/5">
                {number}
              </span>

              <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                {icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(titleKey)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Connector note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <span>Sessions via Zoom or Google Meet</span>
            <span>·</span>
            <span>Never recorded for your privacy</span>
          </p>
        </div>
      </div>
    </section>
  );
}
