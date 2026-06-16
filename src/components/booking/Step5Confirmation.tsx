'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BookingFormState } from '@/types';
import { professionals } from '@/data/professionals';
import { categories } from '@/data/categories';
import AnimalAvatar from '@/components/shared/AnimalAvatar';
import Badge from '@/components/shared/Badge';
import { formatDate } from '@/lib/utils';

interface Props {
  formData: BookingFormState;
  onBack: () => void;
}

const STYLE_LABELS: Record<string, string> = {
  advice: 'I want advice',
  listen: 'I want someone to listen',
  guide:  'I want step-by-step guidance',
  unsure: 'I am not sure yet',
};

export default function Step5Confirmation({ formData, onBack }: Props) {
  const { t } = useLanguage();
  const [confirmed, setConfirmed] = useState(false);

  const pro = professionals.find((p) => p.id === formData.selectedProfessionalId);
  const cat = categories.find((c) => c.slug === formData.selectedCategorySlug);

  if (confirmed) {
    return (
      <div className="animate-fade-in text-center py-8">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Request Submitted!</h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
          {t('book_success')}
        </p>

        <div className="bg-brand-lavender-50 border border-brand-lavender-100 rounded-2xl p-5 text-left mb-6 max-w-sm mx-auto">
          <p className="text-xs text-gray-500 mb-1">Your booking reference</p>
          <p className="font-mono text-sm font-bold text-brand-lavender-600 mb-3">TY-{Date.now().toString().slice(-6)}</p>
          <div className="flex items-center gap-3">
            <AnimalAvatar animal={formData.avatarKey} size="md" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">{formData.alias}</p>
              <p className="text-xs text-gray-400">with {pro?.name}</p>
              <p className="text-xs text-gray-400">{formData.selectedDate && formatDate(formData.selectedDate)} at {formData.selectedTime}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-sm mx-auto">
          <a
            href="/dashboard/client"
            className="w-full py-3 bg-brand-lavender-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-lavender-700 transition-colors"
          >
            Go to My Dashboard
          </a>
          <a
            href="/"
            className="w-full py-3 border border-gray-200 text-gray-600 rounded-xl font-medium text-sm hover:bg-gray-50"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Review Your Booking</h2>
      <p className="text-sm text-gray-500 mb-6">Check everything looks right before confirming.</p>

      <div className="space-y-4 mb-8">
        {/* Professional */}
        {pro && (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-soft">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Professional</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-lavender-50 rounded-xl flex items-center justify-center text-2xl">
                {pro.photo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 text-sm">{pro.name}</p>
                  <Badge variant="verified">✓ Verified</Badge>
                </div>
                <p className="text-xs text-gray-500">{pro.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* Category */}
        {cat && (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-soft flex items-center gap-3">
            <span className="text-2xl">{cat.emoji}</span>
            <div>
              <p className="text-xs text-gray-400">Category</p>
              <p className="font-medium text-gray-900 text-sm">{cat.name}</p>
            </div>
          </div>
        )}

        {/* Date & Time */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-soft flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <div>
            <p className="text-xs text-gray-400">Date & Time</p>
            <p className="font-medium text-gray-900 text-sm">
              {formData.selectedDate && formatDate(formData.selectedDate)} at {formData.selectedTime}
            </p>
            <p className="text-xs text-gray-400">{pro?.sessionDurationMinutes} minute session · Myanmar Standard Time</p>
          </div>
        </div>

        {/* Your identity */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-soft flex items-center gap-3">
          <AnimalAvatar animal={formData.avatarKey} size="md" />
          <div>
            <p className="text-xs text-gray-400">Your Anonymous Identity</p>
            <p className="font-medium text-gray-900 text-sm">{formData.alias}</p>
            {formData.consultationStyle && (
              <p className="text-xs text-gray-400">{STYLE_LABELS[formData.consultationStyle]}</p>
            )}
          </div>
        </div>

        {/* Notes */}
        {formData.notes && (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-soft">
            <p className="text-xs text-gray-400 mb-1">Your Notes</p>
            <p className="text-sm text-gray-700 leading-relaxed">{formData.notes}</p>
          </div>
        )}

        {/* Meeting link placeholder */}
        <div className="bg-brand-teal-50 border border-brand-teal-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-brand-teal-700 mb-1">Session Link (provided after confirmation)</p>
          <div className="flex items-center gap-2">
            <span className="text-brand-teal-500 text-sm">📹</span>
            <p className="text-xs text-brand-teal-600">A Google Meet / Zoom link will be shared once your professional confirms.</p>
          </div>
        </div>
      </div>

      {/* Privacy reminder */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-6 text-xs text-amber-700">
        🔒 Your real name and contact details will never be shared with your professional.
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
          ← Edit
        </button>
        <button
          onClick={() => setConfirmed(true)}
          className="flex-1 py-3 bg-brand-lavender-600 text-white rounded-xl font-bold hover:bg-brand-lavender-700 transition-colors"
        >
          ✓ Confirm Booking
        </button>
      </div>
    </div>
  );
}
