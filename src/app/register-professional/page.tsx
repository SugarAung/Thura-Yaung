'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { CategorySlug } from '@/types';
import { cn } from '@/lib/utils';

export default function RegisterProfessionalPage() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedCats, setSelectedCats] = useState<CategorySlug[]>([]);
  const [form, setForm] = useState({
    name: '', title: '', email: '', phone: '', bio: '', intro: '', price: '',
  });

  const toggleCat = (slug: CategorySlug) =>
    setSelectedCats((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const canSubmit = form.name && form.title && form.email && form.bio && selectedCats.length > 0 && agreed;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Thank you for applying to be a professional on Thura Yaung. Our team will review your application and certificates within 3–5 business days.
        </p>
        <div className="bg-brand-lavender-50 border border-brand-lavender-100 rounded-2xl p-5 mb-6 text-left">
          <p className="text-xs text-brand-lavender-600 font-semibold uppercase tracking-wide mb-2">What happens next?</p>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              'Our admin team will review your profile and certificates',
              'You may be contacted for a brief verification call',
              'Once approved, your profile goes live and clients can book you',
              'You will receive a confirmation email at the address you provided',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-lavender-400 mt-0.5">→</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
        <a href="/" className="inline-block px-6 py-3 bg-brand-lavender-600 text-white rounded-xl font-semibold hover:bg-brand-lavender-700 transition-colors">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-3 py-1 text-xs text-amber-700 font-medium mb-4">
          ⏳ Applications reviewed manually — 3 to 5 business days
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Join as a Professional</h1>
        <p className="text-sm text-gray-500">Fill in your details below. All fields marked * are required.</p>
      </div>

      <div className="space-y-8">
        {/* Personal Info */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>👤</span> Personal Information
          </h2>
          <div className="space-y-4">
            <Field label="Full Name *" placeholder="Your real name (as on your certificates)" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Professional Title *" placeholder="e.g. Clinical Psychologist, Career Coach" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Email Address *" type="email" placeholder="your@email.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field label="Phone Number" placeholder="+95 9 xxx xxx xxx" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          </div>
        </section>

        {/* Profile photo upload (placeholder) */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📸</span> Profile Photo
          </h2>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-brand-lavender-300 transition-colors cursor-pointer">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-sm text-gray-500 mb-1">Click to upload your professional photo</p>
            <p className="text-xs text-gray-400">JPG or PNG · Max 5MB · Clear face photo required</p>
            {/* In a real app: <input type="file" accept="image/*" className="hidden" /> */}
          </div>
        </section>

        {/* Bio & Intro */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📝</span> Bio & Introduction
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">
                Professional Bio * <span className="normal-case font-normal text-gray-400">(shown on your profile)</span>
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Describe your background, expertise, and approach. Be warm and approachable — clients will read this to decide if you are the right fit."
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-brand-lavender-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">
                Self-Introduction Message <span className="normal-case font-normal text-gray-400">(shown to clients before booking)</span>
              </label>
              <textarea
                value={form.intro}
                onChange={(e) => setForm({ ...form, intro: e.target.value })}
                placeholder="A brief personal message to potential clients. What can they expect from a session with you?"
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-brand-lavender-400"
              />
            </div>
          </div>
        </section>

        {/* Certificates upload (placeholder) */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📜</span> Certificates & Credentials
          </h2>
          <p className="text-sm text-gray-500 mb-4">Upload copies of your professional certificates. All uploads are reviewed confidentially.</p>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-brand-lavender-300 transition-colors cursor-pointer">
                <p className="text-sm text-gray-400">Certificate {i} — Click to upload (PDF or Image)</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🗂️</span> Service Categories *
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => toggleCat(cat.slug)}
                className={cn(
                  'flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all',
                  selectedCats.includes(cat.slug)
                    ? 'border-brand-lavender-600 bg-brand-lavender-50'
                    : 'border-gray-200 hover:border-brand-lavender-200'
                )}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className="text-sm font-medium text-gray-700">
                  {lang === 'mm' ? cat.mmName : cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>💰</span> Session Pricing
          </h2>
          <p className="text-sm text-gray-500 mb-4">Set your price per session in Myanmar Kyat (MMK). Clients will see this before booking.</p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Field label="Price per Session (MMK)" type="number" placeholder="e.g. 25000" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
            </div>
            <div className="flex-shrink-0 text-sm text-gray-400 mt-6">per session</div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Platform fee information will be shared during onboarding.</p>
        </section>

        {/* Agreement */}
        <section className="bg-neutral-warm50 rounded-2xl border border-neutral-warm200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📋</span> Professional Agreement
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 mb-5">
            {[
              'I will maintain client anonymity and never ask for unnecessary personal information.',
              'I will not record sessions without explicit written consent.',
              'I will maintain professional ethical standards at all times.',
              'I understand that Thura Yaung can suspend my account for verified violations.',
              'My credentials are genuine and I consent to verification.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-teal-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-brand-lavender-600"
            />
            <span className="text-sm text-gray-700">
              I agree to the professional terms of service and code of conduct.
            </span>
          </label>
        </section>

        {/* Submit */}
        <button
          onClick={() => canSubmit && setSubmitted(true)}
          disabled={!canSubmit}
          className="w-full py-4 bg-brand-lavender-600 text-white rounded-xl font-bold text-lg hover:bg-brand-lavender-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Application for Admin Review
        </button>
        <p className="text-center text-xs text-gray-400">
          Your application will be reviewed within 3–5 business days. You will be notified by email.
        </p>
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = 'text' }: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-lavender-400 focus:ring-2 focus:ring-brand-lavender-100"
      />
    </div>
  );
}
