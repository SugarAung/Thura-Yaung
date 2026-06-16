'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { clientBookings } from '@/data/bookings';
import { Booking, BookingStatus } from '@/types';
import AnimalAvatar from '@/components/shared/AnimalAvatar';
import Badge from '@/components/shared/Badge';
import Card from '@/components/shared/Card';
import { formatDate, cn } from '@/lib/utils';
import { TranslationKey } from '@/lib/translations';

type Tab = 'upcoming' | 'completed' | 'cancelled';

export default function ClientDashboard() {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>(clientBookings);
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b))
    );
  };

  const filtered = bookings.filter((b) => b.status === activeTab);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'upcoming',  label: t('upcoming'),  count: bookings.filter((b) => b.status === 'upcoming').length },
    { key: 'completed', label: t('completed'), count: bookings.filter((b) => b.status === 'completed').length },
    { key: 'cancelled', label: t('cancelled'), count: bookings.filter((b) => b.status === 'cancelled').length },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-brand-teal-600 font-medium mb-1">{t('anonymous_note')}</p>
        <h1 className="text-2xl font-bold text-gray-900">{t('dash_client_title')}</h1>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Profile card */}
        <div className="space-y-4">
          <Card>
            <div className="text-center">
              <AnimalAvatar animal="owl" size="xl" className="mx-auto mb-3" />
              <h2 className="font-bold text-gray-900 text-lg">Quiet Owl</h2>
              <p className="text-xs text-gray-400 mb-3">Anonymous Client</p>
              <div className="inline-flex items-center gap-1 bg-brand-teal-50 text-brand-teal-600 text-xs px-3 py-1 rounded-full mb-4">
                🔒 Identity protected
              </div>
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Member since</span>
                  <span className="font-medium text-gray-700">Jan 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Sessions</span>
                  <span className="font-medium text-gray-700">{bookings.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Completed</span>
                  <span className="font-medium text-gray-700">{bookings.filter((b) => b.status === 'completed').length}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick actions */}
          <Card padding="sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</p>
            <div className="space-y-2">
              <a href="/book" className="flex items-center gap-2 p-2 rounded-xl hover:bg-brand-lavender-50 text-sm text-gray-700 hover:text-brand-lavender-600 transition-colors">
                <span>📅</span> Book New Session
              </a>
              <a href="/community" className="flex items-center gap-2 p-2 rounded-xl hover:bg-brand-lavender-50 text-sm text-gray-700 hover:text-brand-lavender-600 transition-colors">
                <span>💬</span> Community
              </a>
              <a href="/safety" className="flex items-center gap-2 p-2 rounded-xl hover:bg-brand-lavender-50 text-sm text-gray-700 hover:text-brand-lavender-600 transition-colors">
                <span>🔒</span> Privacy Guide
              </a>
            </div>
          </Card>
        </div>

        {/* Sessions */}
        <div>
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            {tabs.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  'flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5',
                  activeTab === key
                    ? 'bg-white text-brand-lavender-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {label}
                <span className={cn(
                  'px-1.5 py-0.5 rounded-full text-xs',
                  activeTab === key ? 'bg-brand-lavender-100 text-brand-lavender-600' : 'bg-gray-200 text-gray-500'
                )}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">📭</div>
              <p>No {activeTab} sessions</p>
              {activeTab === 'upcoming' && (
                <a href="/book" className="mt-3 inline-block text-sm text-brand-lavender-600 hover:underline">
                  Book your first session →
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((booking) => (
                <SessionCard
                  key={booking.id}
                  booking={booking}
                  onCancel={() => cancelBooking(booking.id)}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionCard({ booking, onCancel, t }: {
  booking: Booking;
  onCancel: () => void;
  t: (k: TranslationKey) => string;
}) {
  const { status } = booking;
  const statusConfig = {
    upcoming:  { badge: 'warning' as const,  color: 'border-amber-100' },
    completed: { badge: 'success' as const,  color: 'border-green-100' },
    cancelled: { badge: 'danger' as const,   color: 'border-red-100' },
    pending:   { badge: 'pending' as const,  color: 'border-gray-100' },
  };
  const { badge, color } = statusConfig[status];

  return (
    <div className={`bg-white rounded-2xl shadow-soft border ${color} p-5`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-lavender-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            {booking.categorySlug === 'mental-wellness' ? '🌿' :
             booking.categorySlug === 'career' ? '💼' :
             booking.categorySlug === 'academic' ? '📚' : '🤝'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{booking.professionalName}</h3>
            <p className="text-xs text-gray-400">{booking.professionalTitle}</p>
          </div>
        </div>
        <Badge variant={badge}>{t(status as TranslationKey)}</Badge>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
        <span className="flex items-center gap-1">📅 {formatDate(booking.date)}</span>
        <span className="flex items-center gap-1">🕐 {booking.time}</span>
        <span className="flex items-center gap-1">⏱ {booking.sessionDurationMinutes} min</span>
      </div>

      {booking.notes && (
        <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 mb-4 italic">
          &ldquo;{booking.notes}&rdquo;
        </p>
      )}

      <div className="flex gap-2">
        {status === 'upcoming' && (
          <>
            <a
              href={booking.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 bg-brand-lavender-600 text-white rounded-xl text-xs font-medium text-center hover:bg-brand-lavender-700 transition-colors"
            >
              📹 {t('join_meeting')}
            </a>
            <button
              onClick={onCancel}
              className="px-3 py-2 border border-red-200 text-red-600 rounded-xl text-xs font-medium hover:bg-red-50 transition-colors"
            >
              {t('cancel')}
            </button>
          </>
        )}
        {status === 'completed' && (
          <a
            href="/community"
            className="flex-1 py-2 bg-green-50 text-green-700 border border-green-200 rounded-xl text-xs font-medium text-center hover:bg-green-100 transition-colors"
          >
            ✍️ Leave Feedback
          </a>
        )}
      </div>
    </div>
  );
}
