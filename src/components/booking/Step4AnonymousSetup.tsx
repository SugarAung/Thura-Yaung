'use client';

import { useLanguage } from '@/context/LanguageContext';
import { AnimalKey } from '@/types';
import AnimalAvatar, { AnimalAvatarPicker } from '@/components/shared/AnimalAvatar';
import { cn } from '@/lib/utils';

const STYLE_OPTIONS = [
  { key: 'advice',    icon: '💡', labelKey: 'book_style_advice'  as const },
  { key: 'listen',    icon: '👂', labelKey: 'book_style_listen'  as const },
  { key: 'guide',     icon: '🗺️', labelKey: 'book_style_guide'   as const },
  { key: 'unsure',    icon: '🤷', labelKey: 'book_style_unsure'  as const },
];

interface Props {
  alias: string;
  avatarKey: AnimalKey;
  consultationStyle: string | null;
  notes: string;
  onAliasChange: (v: string) => void;
  onAvatarChange: (v: AnimalKey) => void;
  onStyleChange: (v: string) => void;
  onNotesChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4AnonymousSetup({
  alias, avatarKey, consultationStyle, notes,
  onAliasChange, onAvatarChange, onStyleChange, onNotesChange,
  onNext, onBack
}: Props) {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Your Anonymous Identity</h2>
      <p className="text-sm text-gray-500 mb-6">
        This is how your professional will know you. Your real identity is never revealed.
      </p>

      {/* Avatar picker */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Choose Your Avatar</p>
        <AnimalAvatarPicker selected={avatarKey} onSelect={onAvatarChange} />
      </div>

      {/* Alias input */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
          Your Alias Name
        </label>
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 focus-within:border-brand-lavender-400 focus-within:ring-2 focus-within:ring-brand-lavender-100">
          <AnimalAvatar animal={avatarKey} size="sm" />
          <input
            type="text"
            value={alias}
            onChange={(e) => onAliasChange(e.target.value)}
            placeholder="e.g. Quiet Owl, Curious Fox..."
            maxLength={30}
            className="flex-1 text-sm bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">This name will be shown to your professional instead of your real name.</p>
      </div>

      {/* Consultation style */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">What are you looking for?</p>
        <div className="grid grid-cols-2 gap-2">
          {STYLE_OPTIONS.map(({ key, icon, labelKey }) => (
            <button
              key={key}
              onClick={() => onStyleChange(key)}
              className={cn(
                'flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all',
                consultationStyle === key
                  ? 'border-brand-lavender-600 bg-brand-lavender-50 text-brand-lavender-700 font-medium'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-brand-lavender-200'
              )}
            >
              <span className="text-lg">{icon}</span>
              <span>{t(labelKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
          Additional Notes <span className="font-normal text-gray-400 normal-case">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Share anything you want your professional to know before the session. Be as vague or specific as you like."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-brand-lavender-400 focus:ring-2 focus:ring-brand-lavender-100"
        />
        <p className="text-xs text-gray-400 mt-1">
          ⚠️ Do not include personal details like your address, workplace, or ID numbers.
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!alias.trim()}
          className="flex-1 py-3 bg-brand-lavender-600 text-white rounded-xl font-semibold hover:bg-brand-lavender-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Booking →
        </button>
      </div>
    </div>
  );
}
