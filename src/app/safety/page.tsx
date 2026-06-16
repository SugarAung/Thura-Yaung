'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const SECTIONS = [
  {
    icon: '🎭',
    title: 'Anonymous Client Identity',
    content: [
      'You are never required to use your real name. Choose any alias and an animal avatar.',
      'Your email and phone number are collected only for registration and emergency contact — they are never shown publicly.',
      'Your professional will only know your alias and avatar throughout the entire session.',
      'You may change your alias and avatar at any time.',
    ],
  },
  {
    icon: '🚫📹',
    title: 'No Session Recording',
    content: [
      'Sessions via Zoom or Google Meet are strictly not recorded by our platform.',
      'Professionals are required by our terms of service to never record sessions.',
      'You have the right to end a session immediately if you feel uncomfortable at any point.',
      'No session notes are stored on our platform — any personal records are the responsibility of the professional, held confidentially.',
    ],
  },
  {
    icon: '✅',
    title: 'Professional Verification',
    content: [
      'Every professional must submit their real name, professional credentials, certificates, and a self-introduction video before being approved.',
      'All applications are manually reviewed by our admin team.',
      'Professionals are re-verified periodically.',
      'Professionals are not permitted to ask clients for personal identifying information unless strictly necessary for the service.',
    ],
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Guardian Consent for Users Under 16',
    content: [
      'Users under the age of 16 may require parent or guardian consent before booking certain consultation categories.',
      'Mental wellness and peer support sessions for minors will prompt a guardian consent acknowledgement.',
      'We encourage parents and guardians to be involved in the process, while still respecting the young person\'s need for a safe space.',
      'Professionals working with minors have completed additional child-safe training.',
    ],
  },
  {
    icon: '🚨',
    title: 'This Platform Is Not for Emergencies',
    content: [
      'Thura Yaung is a consultation marketplace, not a crisis or emergency service.',
      'If you or someone you know is in immediate danger, please contact Myanmar emergency services: Police 199, Fire 191, Ambulance 192.',
      'If you are experiencing a mental health crisis, please seek immediate in-person care at your nearest hospital.',
      'Our professionals are trained to refer clients to appropriate emergency resources if needed.',
    ],
  },
  {
    icon: '🤝',
    title: 'Respectful Communication',
    content: [
      'All interactions on this platform — consultations, community posts, and messages — must be respectful and kind.',
      'Harassment, discrimination, hate speech, or inappropriate content is not tolerated.',
      'Violations may result in immediate account suspension.',
      'Professionals and clients both have the right to report inappropriate behaviour.',
    ],
  },
];

export default function SafetyPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{t('safety_title')}</h1>
        <p className="text-gray-500 leading-relaxed">
          We built this platform with your safety and dignity in mind. Please read these guidelines before your first session.
        </p>
      </div>

      {/* Quick bullets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        {[
          { icon: '🎭', label: 'Anonymous identity' },
          { icon: '🚫📹', label: 'No session recording' },
          { icon: '✅', label: 'Verified professionals' },
          { icon: '👨‍👩‍👧', label: 'Guardian consent for <16' },
          { icon: '🚨', label: 'Not for emergencies' },
          { icon: '🤝', label: 'Respectful community' },
        ].map(({ icon, label }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-soft">
            <div className="text-2xl mb-1">{icon}</div>
            <p className="text-xs text-gray-600 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Accordion sections */}
      <div className="space-y-3">
        {SECTIONS.map(({ icon, title, content }, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="font-semibold text-gray-900">{title}</span>
              </div>
              <svg
                className={cn('w-5 h-5 text-gray-400 transition-transform flex-shrink-0', openIndex === i && 'rotate-180')}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 animate-fade-in">
                <ul className="space-y-2">
                  {content.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-brand-teal-500 mt-0.5 flex-shrink-0">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Emergency contacts */}
      <div className="mt-10 bg-red-50 border border-red-100 rounded-2xl p-6">
        <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
          <span>🚨</span> Emergency Contacts (Myanmar)
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Police',    number: '199' },
            { label: 'Fire',      number: '191' },
            { label: 'Ambulance', number: '192' },
          ].map(({ label, number }) => (
            <div key={label} className="bg-white rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-red-600">{number}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-red-600 mt-3">
          If you are in immediate danger, call emergency services first. Thura Yaung is not a crisis hotline.
        </p>
      </div>

      {/* Final CTA */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400 mb-3">Have a concern or want to report something?</p>
        <a href="/community" className="text-sm text-brand-lavender-600 hover:underline font-medium">
          Contact our moderation team →
        </a>
      </div>
    </div>
  );
}
