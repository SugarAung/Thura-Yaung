'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BookingFormState, CategorySlug, AnimalKey } from '@/types';
import StepIndicator from '@/components/shared/StepIndicator';
import Step1SelectCategory from '@/components/booking/Step1SelectCategory';
import Step2SelectProfessional from '@/components/booking/Step2SelectProfessional';
import Step3ChooseTime from '@/components/booking/Step3ChooseTime';
import Step4AnonymousSetup from '@/components/booking/Step4AnonymousSetup';
import Step5Confirmation from '@/components/booking/Step5Confirmation';

const INITIAL_FORM: BookingFormState = {
  selectedCategorySlug: null,
  selectedProfessionalId: null,
  selectedSlotId: null,
  selectedDate: null,
  selectedTime: null,
  consultationStyle: null,
  alias: '',
  avatarKey: 'owl',
  notes: '',
};

export default function BookPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingFormState>(INITIAL_FORM);

  const updateForm = (patch: Partial<BookingFormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const STEPS = [
    t('book_step1'),
    t('book_step2'),
    t('book_step3'),
    t('book_step4'),
    t('book_step5'),
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('book_title')}</h1>
        <p className="text-sm text-gray-500">Your identity is anonymous throughout this process.</p>
      </div>

      <StepIndicator steps={STEPS} currentStep={step} />

      <div className="bg-white rounded-2xl shadow-card p-6">
        {step === 1 && (
          <Step1SelectCategory
            selected={form.selectedCategorySlug}
            onSelect={(slug: CategorySlug) => updateForm({ selectedCategorySlug: slug, selectedProfessionalId: null, selectedSlotId: null })}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step2SelectProfessional
            categorySlug={form.selectedCategorySlug}
            selected={form.selectedProfessionalId}
            onSelect={(id) => updateForm({ selectedProfessionalId: id, selectedSlotId: null })}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step3ChooseTime
            professionalId={form.selectedProfessionalId}
            selectedSlotId={form.selectedSlotId}
            selectedDate={form.selectedDate}
            selectedTime={form.selectedTime}
            onSelect={(slotId, date, time) => updateForm({ selectedSlotId: slotId, selectedDate: date, selectedTime: time })}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <Step4AnonymousSetup
            alias={form.alias}
            avatarKey={form.avatarKey}
            consultationStyle={form.consultationStyle}
            notes={form.notes}
            onAliasChange={(alias) => updateForm({ alias })}
            onAvatarChange={(avatarKey: AnimalKey) => updateForm({ avatarKey })}
            onStyleChange={(consultationStyle) => updateForm({ consultationStyle })}
            onNotesChange={(notes) => updateForm({ notes })}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
          />
        )}
        {step === 5 && (
          <Step5Confirmation
            formData={form}
            onBack={() => setStep(4)}
          />
        )}
      </div>
    </div>
  );
}
