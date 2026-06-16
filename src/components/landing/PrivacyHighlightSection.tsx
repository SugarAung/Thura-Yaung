'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';

const PRIVACY_POINTS = [
  {
    icon: '🎭',
    title: 'Stay Anonymous',
    desc: 'You choose your own alias and animal avatar. Your real name, email, and phone are never shown publicly.',
  },
  {
    icon: '🚫📹',
    title: 'No Recordings',
    desc: 'Sessions are never recorded. What you share stays between you and your professional.',
  },
  {
    icon: '✅',
    title: 'Verified Professionals',
    desc: 'Every professional is manually reviewed and approved by our team before they can take sessions.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Guardian Consent for Under 16',
    desc: 'Users under 16 may need parent or guardian consent for certain services. We prioritize young user safety.',
  },
];

export default function PrivacyHighlightSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title={t('privacy_title')}
          subtitle="We have designed every part of this platform with your privacy and safety in mind."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRIVACY_POINTS.map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-start p-5 bg-neutral-warm50 rounded-2xl border border-neutral-warm200">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/safety"
            className="inline-flex items-center gap-2 text-sm text-brand-teal-700 font-medium hover:underline"
          >
            Read our full safety & privacy guide →
          </Link>
        </div>
      </div>
    </section>
  );
}
