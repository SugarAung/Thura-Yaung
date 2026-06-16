'use client';

import { useState } from 'react';
import { professionals } from '@/data/professionals';
import { cn } from '@/lib/utils';

interface Props {
  professionalId: string | null;
  selectedSlotId: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  onSelect: (slotId: string, date: string, time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3ChooseTime({
  professionalId, selectedSlotId, selectedDate, onSelect, onNext, onBack
}: Props) {
  const pro = professionals.find((p) => p.id === professionalId);
  const slots = pro?.availableSlots ?? [];

  // Get unique dates
  const dates = Array.from(new Set(slots.map((s) => s.date))).slice(0, 10);
  const [focusDate, setFocusDate] = useState<string>(selectedDate ?? dates[0] ?? '');

  const timesForDate = slots.filter((s) => s.date === focusDate);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Pick a Date & Time</h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose a slot that works for you. Times are in Myanmar Standard Time (MMT).
      </p>

      {/* Date picker */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Available Dates</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setFocusDate(date)}
              className={cn(
                'flex-shrink-0 px-4 py-3 rounded-xl border text-center transition-all min-w-[80px]',
                focusDate === date
                  ? 'bg-brand-lavender-600 text-white border-brand-lavender-600'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-brand-lavender-300'
              )}
            >
              <span className="text-xs block">{formatDate(date)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
          Available Times — {formatDate(focusDate)}
        </p>
        {timesForDate.length === 0 ? (
          <p className="text-sm text-gray-400 py-4">No slots available on this date.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timesForDate.map((slot) => (
              <button
                key={slot.id}
                disabled={slot.isBooked}
                onClick={() => !slot.isBooked && onSelect(slot.id, slot.date, slot.time)}
                className={cn(
                  'py-2.5 rounded-xl text-sm font-medium border transition-all',
                  slot.isBooked && 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through',
                  !slot.isBooked && selectedSlotId === slot.id && 'bg-brand-lavender-600 text-white border-brand-lavender-600',
                  !slot.isBooked && selectedSlotId !== slot.id && 'bg-white text-gray-700 border-gray-200 hover:border-brand-lavender-400 hover:text-brand-lavender-600'
                )}
              >
                {slot.time}
                {slot.isBooked && <span className="block text-xs text-gray-300">Booked</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedSlotId}
          className="flex-1 py-3 bg-brand-lavender-600 text-white rounded-xl font-semibold hover:bg-brand-lavender-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
