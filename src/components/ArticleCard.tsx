import React from 'react';
import { Article } from '../types';
import { useMading } from '../context/MadingContext';
import {
  Heart,
  MessageCircle,
  Eye,
  Bookmark,
  Clock,
  Pin,
  Calendar,
  ShieldCheck,
  Tag,
} from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const {
    currentUser,
    openArticleDetail,
    toggleLikeArticle,
    toggleBookmarkArticle,
    toggleFeatureArticle,
    setIsModerationOpen,
    comments,
  } = useMading();

  const isLiked = article.likedBy?.includes(currentUser.id);
  const isBookmarked = article.bookmarkedBy?.includes(currentUser.id);

  // Article comments
  const articleComments = comments[article.id] || [];
  const commentCount =
    articleComments.length +
    articleComments.reduce((acc, c) => acc + (c.replies ? c.replies.length : 0), 0);

  const formattedDate = new Date(article.publishedAt || article.createdAt).toLocaleDateString(
    'id-ID',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col h-full overflow-hidden ${
        article.isFeatured
          ? 'border-blue-300 ring-2 ring-blue-100 shadow-md'
          : 'border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-xl hover:-translate-y-0.5'
      }`}
      id={`article-card-${article.id}`}
    >
      {/* Cover Image Container */}
      <div
        onClick={() => openArticleDetail(article.id)}
        className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Pill on top-left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-bold text-blue-800 shadow-xs border border-blue-100">
            {article.category}
          </span>
        </div>

        {/* Featured Ribbon */}
        {article.isFeatured && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold shadow-xs">
            <Pin className="w-3 h-3 fill-white" />
            <span>Pilihan</span>
          </div>
        )}

        {/* Status Badge (if not approved yet) */}
        {article.status !== 'approved' && (
          <div className="absolute bottom-3 left-3 z-10">
            <span
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold shadow-xs ${
                article.status === 'pending'
                  ? 'bg-amber-500 text-white'
                  : article.status === 'rejected'
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-500 text-white'
              }`}
            >
              {article.status === 'pending'
                ? '⏳ Menunggu Review'
                : article.status === 'rejected'
                ? '❌ Ditolak'
                : '📝 Draft'}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Date & Reading Time */}
          <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {article.readingTimeMinutes} min baca
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => openArticleDetail(article.id)}
            className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug cursor-pointer mb-2"
          >
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {article.summary}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {article.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200"
                >
                  <Tag className="w-2.5 h-2.5 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Author Info & Interactive Actions */}
        <div className="pt-3 border-t border-slate-100">
          
          {/* Author info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={article.authorAvatar}
                alt={article.authorName}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-200 shrink-0"
              />
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-800 truncate leading-tight">
                  {article.authorName}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {article.authorClass}
                </p>
              </div>
            </div>

            {/* Admin quick pin / moderate button */}
            {currentUser.role === 'admin' && (
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFeatureArticle(article.id);
                  }}
                  className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                    article.isFeatured
                      ? 'bg-amber-50 text-amber-600 border-amber-200'
                      : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-amber-600'
                  }`}
                  title={article.isFeatured ? 'Hapus dari Headline' : 'Jadikan Headline'}
                  id={`btn-feature-${article.id}`}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModerationOpen(true);
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-xs transition-colors cursor-pointer"
                  title="Buka Moderasi"
                  id={`btn-mod-${article.id}`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Metrics & Interaction Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikeArticle(article.id);
                }}
                className={`flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                  isLiked ? 'text-rose-500 font-bold' : 'text-slate-500 hover:text-rose-500'
                }`}
                title={isLiked ? 'Batal Suka' : 'Sukai Karya'}
                id={`btn-like-${article.id}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                <span>{article.likes || 0}</span>
              </button>

              {/* Comment Link */}
              <button
                onClick={() => openArticleDetail(article.id)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                title="Lihat & Tambah Komentar"
                id={`btn-comment-counter-${article.id}`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{commentCount}</span>
              </button>

              {/* Views Count */}
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Eye className="w-4 h-4" />
                <span>{article.views || 0}</span>
              </span>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmarkArticle(article.id);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'
              }`}
              title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Karya'}
              id={`btn-bookmark-${article.id}`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
