'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { newsArticles } from '@/data/news';
import { NewsArticle } from '@/types';
import Modal from '@/components/shared/Modal';
import Tag from '@/components/shared/Tag';
import { formatDate } from '@/lib/utils';

export default function NewsPage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  const featured = newsArticles[0];
  const rest = newsArticles.slice(1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('news_title')}</h1>
        <p className="text-sm text-gray-500">Resources, stories, and guidance from our team and professionals.</p>
      </div>

      {/* Featured article */}
      <button
        onClick={() => setSelected(featured)}
        className="w-full text-left mb-8 group"
      >
        <div className={`${featured.coverColor} rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start hover:shadow-card-hover transition-all`}>
          <div className="text-6xl flex-shrink-0">{featured.coverEmoji}</div>
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {featured.tags.map((tag) => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-lavender-600 transition-colors">
              {featured.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{featured.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>✍️ {featured.authorName}</span>
              <span>·</span>
              <span>{featured.authorRole}</span>
              <span>·</span>
              <span>{formatDate(featured.publishedAt)}</span>
              <span>·</span>
              <span>📖 {featured.readingTimeMin} min read</span>
            </div>
          </div>
        </div>
      </button>

      {/* Article grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((article) => (
          <button
            key={article.id}
            onClick={() => setSelected(article)}
            className="text-left bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-card-hover transition-all group"
          >
            <div className={`${article.coverColor} p-6 flex items-center justify-center`}>
              <span className="text-4xl">{article.coverEmoji}</span>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-1 mb-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <Tag key={tag}>#{tag}</Tag>
                ))}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-snug group-hover:text-brand-lavender-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{article.authorName}</span>
                <span>📖 {article.readingTimeMin} min</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Article reader modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
        size="lg"
      >
        {selected && (
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-400">
              <span>✍️ {selected.authorName}</span>
              <span>·</span>
              <span>{selected.authorRole}</span>
              <span>·</span>
              <span>{formatDate(selected.publishedAt)}</span>
              <span>·</span>
              <span>📖 {selected.readingTimeMin} min read</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selected.tags.map((tag) => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </div>
            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:pl-5 [&>ul>li]:mb-2 [&>strong]:font-semibold [&>strong]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: selected.content }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
