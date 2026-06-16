'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { threads as initialThreads } from '@/data/threads';
import { Thread, CategorySlug } from '@/types';
import AnimalAvatar from '@/components/shared/AnimalAvatar';
import Modal from '@/components/shared/Modal';
import Tag from '@/components/shared/Tag';
import { timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';

const FILTERS: { slug: CategorySlug | 'all'; label: string; emoji: string }[] = [
  { slug: 'all',            label: 'All',            emoji: '🌐' },
  { slug: 'academic',       label: 'Academic',       emoji: '📚' },
  { slug: 'career',         label: 'Career',         emoji: '💼' },
  { slug: 'mental-wellness',label: 'Mental Wellness', emoji: '🌿' },
  { slug: 'peer-support',   label: 'Peer Support',   emoji: '🤝' },
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<CategorySlug | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCat, setNewCat] = useState<CategorySlug>('mental-wellness');

  const toggleUpvote = (id: string) => {
    setUpvoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setThreads((t) => t.map((th) => th.id === id ? { ...th, upvotes: th.upvotes - 1 } : th));
      } else {
        next.add(id);
        setThreads((t) => t.map((th) => th.id === id ? { ...th, upvotes: th.upvotes + 1 } : th));
      }
      return next;
    });
  };

  const submitThread = () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    const newThread: Thread = {
      id: `th-new-${Date.now()}`,
      title: newTitle,
      body: newBody,
      categorySlug: newCat,
      avatarKey: 'panda',
      authorAlias: 'You (Demo)',
      upvotes: 0,
      commentCount: 0,
      postedAt: new Date().toISOString(),
      tags: [],
    };
    setThreads((prev) => [newThread, ...prev]);
    setShowModal(false);
    setNewTitle('');
    setNewBody('');
  };

  const filtered = filter === 'all' ? threads : threads.filter((t) => t.categorySlug === filter);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('community_title')}</h1>
          <p className="text-sm text-gray-500">Share and connect — anonymously and safely.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-brand-lavender-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-lavender-700 transition-colors"
        >
          + Post Anonymously
        </button>
      </div>

      {/* Approval note */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-6 text-sm text-amber-700">
        📋 All threads require admin approval before publishing.
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map(({ slug, label, emoji }) => (
          <button
            key={slug}
            onClick={() => setFilter(slug)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
              filter === slug
                ? 'bg-brand-lavender-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-lavender-300'
            )}
          >
            <span>{emoji}</span>{label}
          </button>
        ))}
      </div>

      {/* Thread list */}
      <div className="space-y-4">
        {filtered.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            isUpvoted={upvoted.has(thread.id)}
            onUpvote={() => toggleUpvote(thread.id)}
          />
        ))}
      </div>

      {/* Post modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Share Anonymously" size="md">
        <p className="text-xs text-gray-500 mb-4">
          You will appear as &ldquo;Demo User&rdquo; with a 🐼 Panda avatar. Your real identity is protected.
        </p>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {FILTERS.slice(1).map(({ slug, label, emoji }) => (
                <button
                  key={slug}
                  onClick={() => setNewCat(slug as CategorySlug)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm transition-all',
                    newCat === slug
                      ? 'border-brand-lavender-600 bg-brand-lavender-50 text-brand-lavender-700 font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-brand-lavender-200'
                  )}
                >
                  <span>{emoji}</span>{label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Title</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What is your post about?"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-lavender-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Your Story / Question</label>
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Share what is on your mind..."
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-brand-lavender-400"
            />
          </div>
          <p className="text-xs text-amber-600">⚠️ Do not include personal details (name, phone, location).</p>
          <button
            onClick={submitThread}
            disabled={!newTitle.trim() || !newBody.trim()}
            className="w-full py-3 bg-brand-lavender-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-lavender-700 disabled:opacity-50"
          >
            Submit for Review
          </button>
        </div>
      </Modal>
    </div>
  );
}

function ThreadCard({ thread, isUpvoted, onUpvote }: {
  thread: Thread;
  isUpvoted: boolean;
  onUpvote: () => void;
}) {
  const catEmoji = { academic: '📚', career: '💼', 'mental-wellness': '🌿', 'peer-support': '🤝' };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 hover:shadow-card transition-all">
      {/* Author row */}
      <div className="flex items-center gap-2 mb-3">
        <AnimalAvatar animal={thread.avatarKey} size="sm" />
        <div>
          <span className="text-sm font-medium text-gray-900">{thread.authorAlias}</span>
          <span className="text-xs text-gray-400 ml-2">{timeAgo(thread.postedAt)}</span>
        </div>
        <span className="ml-auto text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full flex items-center gap-1">
          {catEmoji[thread.categorySlug]} {thread.categorySlug.replace('-', ' ')}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{thread.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">{thread.body}</p>

      {/* Tags */}
      {thread.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {thread.tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
        <button
          onClick={onUpvote}
          className={cn(
            'flex items-center gap-1.5 text-sm font-medium transition-all px-3 py-1.5 rounded-lg',
            isUpvoted
              ? 'bg-brand-lavender-50 text-brand-lavender-600'
              : 'text-gray-400 hover:text-brand-lavender-600 hover:bg-brand-lavender-50'
          )}
        >
          <span>{isUpvoted ? '▲' : '△'}</span>
          <span>{thread.upvotes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all">
          <span>💬</span>
          <span>{thread.commentCount} comments</span>
        </button>
      </div>
    </div>
  );
}
