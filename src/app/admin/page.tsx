'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { adminPendingPros, adminPendingThreads } from '@/data/bookings';
import { AdminPendingPro, AdminPendingThread, ApprovalStatus } from '@/types';
import Badge from '@/components/shared/Badge';
import Card from '@/components/shared/Card';
import { formatDate, timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';

const STATS = [
  { label: 'Total Clients',       value: '1,247', icon: '👥', color: 'bg-blue-50 text-blue-700' },
  { label: 'Total Professionals', value: '44',    icon: '🏅', color: 'bg-brand-lavender-50 text-brand-lavender-700' },
  { label: 'Pending Bookings',    value: '18',    icon: '⏳', color: 'bg-amber-50 text-amber-700' },
  { label: 'Sessions This Month', value: '312',   icon: '✅', color: 'bg-green-50 text-green-700' },
];

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [pros, setPros] = useState<AdminPendingPro[]>(adminPendingPros);
  const [threads, setThreads] = useState<AdminPendingThread[]>(adminPendingThreads);
  const [activeTab, setActiveTab] = useState<'pros' | 'threads' | 'bookings'>('pros');

  const updateProStatus = (id: string, status: ApprovalStatus) =>
    setPros((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));

  const updateThreadStatus = (id: string, status: ApprovalStatus) =>
    setThreads((prev) => prev.map((th) => th.id === id ? { ...th, status } : th));

  const pendingPros    = pros.filter((p) => p.status === 'pending');
  const pendingThreads = threads.filter((t) => t.status === 'pending');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded">DEMO ONLY</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin_title')}</h1>
          <p className="text-sm text-gray-500">Platform management — all data is mock</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, icon, color }) => (
          <Card key={label} padding="md">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-xl mb-3`}>
              {icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {[
          { key: 'pros'     as const, label: 'Pro Approvals',   count: pendingPros.length },
          { key: 'threads'  as const, label: 'Thread Moderation', count: pendingThreads.length },
          { key: 'bookings' as const, label: 'Recent Bookings', count: 0 },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
              activeTab === key ? 'bg-white text-brand-lavender-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {label}
            {count > 0 && (
              <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">{count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Professional Approvals */}
      {activeTab === 'pros' && (
        <div className="space-y-4">
          {pros.map((pro) => (
            <Card key={pro.id}>
              <div className="flex items-start gap-4 flex-wrap">
                <div className="w-12 h-12 bg-brand-lavender-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  🏅
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-gray-900">{pro.name}</h3>
                    <Badge variant={pro.status === 'approved' ? 'success' : pro.status === 'rejected' ? 'danger' : 'pending'}>
                      {pro.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{pro.title} · {pro.categorySlug}</p>
                  <p className="text-xs text-gray-400 mb-2">Submitted {timeAgo(pro.submittedAt)} · {pro.certificateCount} certificates</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{pro.bio}</p>
                </div>

                {pro.status === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateProStatus(pro.id, 'approved')}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium hover:bg-green-200 transition-colors"
                    >
                      ✓ {t('approve')}
                    </button>
                    <button
                      onClick={() => updateProStatus(pro.id, 'rejected')}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      ✕ {t('reject')}
                    </button>
                  </div>
                )}
                {pro.status !== 'pending' && (
                  <button
                    onClick={() => updateProStatus(pro.id, 'pending')}
                    className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-xs hover:bg-gray-200 flex-shrink-0"
                  >
                    Undo
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Thread Moderation */}
      {activeTab === 'threads' && (
        <div className="space-y-4">
          {threads.map((thread) => (
            <Card key={thread.id}>
              <div className="flex items-start gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{thread.title}</h3>
                    <Badge variant={thread.status === 'approved' ? 'success' : thread.status === 'rejected' ? 'danger' : 'pending'}>
                      {thread.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">
                    By {thread.authorAlias} · {thread.categorySlug} · {timeAgo(thread.submittedAt)}
                  </p>
                </div>
                {thread.status === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => updateThreadStatus(thread.id, 'approved')} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200">
                      ✓ Approve
                    </button>
                    <button onClick={() => updateThreadStatus(thread.id, 'rejected')} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200">
                      ✕ Reject
                    </button>
                  </div>
                )}
                {thread.status !== 'pending' && (
                  <button onClick={() => updateThreadStatus(thread.id, 'pending')} className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-xs hover:bg-gray-200">
                    Undo
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Bookings (static) */}
      {activeTab === 'bookings' && (
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Client', 'Professional', 'Category', 'Date', 'Status'].map((h) => (
                  <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { client: 'Quiet Owl 🦉',    pro: 'Daw Nwe Nwe Aye',  cat: 'Mental Wellness', date: '2026-06-12', status: 'upcoming' },
                { client: 'Curious Fox 🦊',  pro: 'Ma Thazin Oo',      cat: 'Career',         date: '2026-06-11', status: 'completed' },
                { client: 'Brave Bear 🐻',   pro: 'Dr. Khin Myo Thida',cat: 'Academic',       date: '2026-06-10', status: 'completed' },
                { client: 'Gentle Deer 🦌',  pro: 'U Kyaw Swar',       cat: 'Mental Wellness', date: '2026-06-09', status: 'cancelled' },
                { client: 'Happy Rabbit 🐰', pro: 'Ma Wai Phyo Thu',   cat: 'Peer Support',   date: '2026-06-08', status: 'completed' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-gray-900">{row.client}</td>
                  <td className="py-3 px-2 text-gray-600">{row.pro}</td>
                  <td className="py-3 px-2 text-gray-500">{row.cat}</td>
                  <td className="py-3 px-2 text-gray-500">{formatDate(row.date)}</td>
                  <td className="py-3 px-2">
                    <Badge variant={row.status === 'completed' ? 'success' : row.status === 'upcoming' ? 'warning' : 'danger'}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
