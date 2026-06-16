'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { proIncomingRequests, proUpcomingSessions } from '@/data/bookings';
import { professionals } from '@/data/professionals';
import { Booking } from '@/types';
import AnimalAvatar from '@/components/shared/AnimalAvatar';
import Badge from '@/components/shared/Badge';
import Card from '@/components/shared/Card';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { TranslationKey } from '@/lib/translations';

const PRO = professionals.find((p) => p.id === 'pro-5')!;

export default function ProfessionalDashboard() {
  const { t } = useLanguage();
  const [requests, setRequests] = useState<Booking[]>(proIncomingRequests);
  const [activeTab, setActiveTab] = useState<'requests' | 'upcoming'>('requests');

  const accept  = (id: string) => setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'upcoming' as const, meetingLink: 'https://meet.google.com/demo-link-placeholder' } : r));
  const decline = (id: string) => setRequests((prev) => prev.filter((r) => r.id !== id));

  const pending   = requests.filter((r) => r.status === 'pending');
  const accepted  = requests.filter((r) => r.status === 'upcoming');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-sm text-brand-lavender-600 font-medium mb-1">Professional Dashboard — Demo View</p>
        <h1 className="text-2xl font-bold text-gray-900">{t('dash_pro_title')}</h1>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Profile */}
        <div className="space-y-4">
          <Card>
            <div className="text-center">
              <div className="w-24 h-24 bg-brand-lavender-50 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-3">
                {PRO.photo}
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 className="font-bold text-gray-900">{PRO.name}</h2>
                <Badge variant="verified">✓ {t('verified')}</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">{PRO.title}</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Rating', value: PRO.rating.toString() },
                  { label: 'Reviews', value: PRO.reviewCount.toString() },
                  { label: 'Pending', value: pending.length.toString() },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-2">
                    <p className="text-lg font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-400">{label}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 text-left leading-relaxed">{PRO.bio.slice(0, 120)}...</p>
            </div>
          </Card>

          {/* Certificates */}
          <Card padding="sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Certificates</p>
            <div className="space-y-2">
              {PRO.certificates.map((cert) => (
                <div key={cert} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="text-brand-teal-500 mt-0.5 flex-shrink-0">✓</span>
                  {cert}
                </div>
              ))}
            </div>
          </Card>

          {/* Languages */}
          <Card padding="sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Languages</p>
            <div className="flex gap-1.5">
              {PRO.languages.map((l) => (
                <span key={l} className="px-2.5 py-1 bg-brand-lavender-50 text-brand-lavender-700 text-xs rounded-full">{l}</span>
              ))}
            </div>
          </Card>
        </div>

        {/* Main content */}
        <div>
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            {[
              { key: 'requests' as const, label: 'Pending Requests', count: pending.length },
              { key: 'upcoming' as const, label: 'Upcoming Sessions', count: proUpcomingSessions.length + accepted.length },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  'flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5',
                  activeTab === key ? 'bg-white text-brand-lavender-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {label}
                {count > 0 && (
                  <span className={cn(
                    'px-1.5 py-0.5 rounded-full text-xs',
                    activeTab === key ? 'bg-brand-lavender-100 text-brand-lavender-600' : 'bg-gray-200 text-gray-500'
                  )}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === 'requests' && (
            <div className="space-y-4">
              {pending.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-3">✨</div>
                  <p>No pending requests</p>
                </div>
              ) : (
                pending.map((req) => (
                  <RequestCard key={req.id} request={req} onAccept={() => accept(req.id)} onDecline={() => decline(req.id)} t={t} />
                ))
              )}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {[...proUpcomingSessions, ...accepted].map((session) => (
                <UpcomingSessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RequestCard({ request, onAccept, onDecline, t }: {
  request: Booking;
  onAccept: () => void;
  onDecline: () => void;
  t: (k: TranslationKey) => string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-amber-100 p-5">
      <div className="flex items-start gap-3 mb-3">
        <AnimalAvatar animal={request.clientAvatar} size="md" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-gray-900 text-sm">{request.clientAlias}</p>
            <Badge variant="pending">New Request</Badge>
          </div>
          <p className="text-xs text-gray-400">Requested {formatDate(request.date)} at {request.time}</p>
        </div>
      </div>
      {request.notes && (
        <div className="bg-gray-50 rounded-xl px-3 py-2 mb-4">
          <p className="text-xs text-gray-600 italic">&ldquo;{request.notes}&rdquo;</p>
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="flex-1 py-2.5 bg-brand-teal-500 text-white rounded-xl text-sm font-medium hover:bg-brand-teal-700 transition-colors"
        >
          ✓ {t('accept')}
        </button>
        <button
          onClick={onDecline}
          className="flex-1 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
        >
          ✕ {t('decline')}
        </button>
      </div>
    </div>
  );
}

function UpcomingSessionCard({ session }: { session: Booking }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-green-100 p-5">
      <div className="flex items-start gap-3 mb-3">
        <AnimalAvatar animal={session.clientAvatar} size="md" />
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">{session.clientAlias}</p>
          <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
            <span>📅 {formatDate(session.date)}</span>
            <span>🕐 {session.time}</span>
          </div>
        </div>
        <Badge variant="success">Confirmed</Badge>
      </div>
      {session.meetingLink && (
        <a
          href={session.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2 bg-brand-lavender-50 text-brand-lavender-600 border border-brand-lavender-200 rounded-xl text-xs font-medium text-center hover:bg-brand-lavender-100 transition-colors"
        >
          📹 Open Meeting Link
        </a>
      )}
    </div>
  );
}
