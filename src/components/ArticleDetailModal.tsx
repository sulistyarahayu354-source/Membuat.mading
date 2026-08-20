import React, { useState } from 'react';
import { useMading } from '../context/MadingContext';
import {
  X,
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  Calendar,
  Clock,
  Send,
  Reply,
  Trash2,
  ThumbsUp,
  Tag,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ArticleDetailModal: React.FC = () => {
  const {
    selectedArticle,
    setSelectedArticle,
    currentUser,
    toggleLikeArticle,
    toggleBookmarkArticle,
    comments,
    addComment,
    toggleLikeComment,
    deleteComment,
    articles,
    openArticleDetail,
    showToast,
  } = useMading();

  const [commentInput, setCommentInput] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');

  if (!selectedArticle) return null;

  const isLiked = selectedArticle.likedBy?.includes(currentUser.id);
  const isBookmarked = selectedArticle.bookmarkedBy?.includes(currentUser.id);

  const articleComments = comments[selectedArticle.id] || [];

  const formattedDate = new Date(
    selectedArticle.publishedAt || selectedArticle.createdAt
  ).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(selectedArticle.id, commentInput);
    setCommentInput('');
  };

  const handleSendReply = (parentCommentId: string) => {
    if (!replyInput.trim()) return;
    addComment(selectedArticle.id, replyInput, parentCommentId);
    setReplyInput('');
    setReplyingToId(null);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan Disalin!', 'Tautan artikel berhasil disalin ke clipboard.', 'success');
    }
  };

  // Related articles from same category
  const relatedArticles = articles
    .filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category && a.status === 'approved')
    .slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn"
      id="article-detail-modal-overlay"
      onClick={() => setSelectedArticle(null)}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col relative border border-slate-100"
        onClick={(e) => e.stopPropagation()}
        id="article-detail-modal-container"
      >
        {/* Sticky Close & Action Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-100 font-bold">
              {selectedArticle.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" /> {selectedArticle.readingTimeMinutes} min baca
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
              title="Bagikan Artikel"
              id="btn-share-article"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedArticle(null)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Tutup"
              id="btn-close-article-detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Article Header & Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {selectedArticle.title}
            </h1>

            {/* Author bar & Date */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedArticle.authorAvatar}
                  alt={selectedArticle.authorName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {selectedArticle.authorName}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedArticle.authorClass} • Penulis Karya
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Moderation Notes Banner (if any) */}
          {selectedArticle.moderationNotes && (
            <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-blue-950">
                  Catatan Pembina Mading ({selectedArticle.moderatedBy || 'Ibu Rahayu, M.Pd.'}):
                </p>
                <p className="text-xs text-blue-900 mt-0.5 leading-relaxed">
                  &quot;{selectedArticle.moderationNotes}&quot;
                </p>
              </div>
            </div>
          )}

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden shadow-md bg-slate-100 border border-slate-100">
            <img
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              className="w-full max-h-[460px] object-cover"
            />
          </div>

          {/* Main Article Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line font-normal">
            {selectedArticle.content}
          </div>

          {/* Tags */}
          {selectedArticle.tags && selectedArticle.tags.length > 0 && (
            <div className="pt-4 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Topik:
              </span>
              {selectedArticle.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 shadow-2xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Article Engagement Bar (Like, Bookmark, Views) */}
          <div className="py-4 px-6 bg-slate-50 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Like */}
              <button
                onClick={() => {
                  toggleLikeArticle(selectedArticle.id);
                  if (!isLiked) {
                    confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isLiked
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-rose-600'
                }`}
                id="btn-detail-like"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                <span>{selectedArticle.likes || 0} Suka</span>
              </button>

              {/* Bookmark */}
              <button
                onClick={() => toggleBookmarkArticle(selectedArticle.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600'
                }`}
                id="btn-detail-bookmark"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
                <span>{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Dilihat {selectedArticle.views || 1} kali
            </div>
          </div>

          {/* Author Card Box */}
          <div className="p-6 rounded-2xl bg-blue-100/40 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={selectedArticle.authorAvatar}
                alt={selectedArticle.authorName}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-300 shadow-xs"
              />
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  Tentang Penulis
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {selectedArticle.authorName}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Siswa {selectedArticle.authorClass} • SMAN 1 Nusantara
                </p>
              </div>
            </div>

            <div className="text-xs text-blue-800 bg-white px-4 py-2 rounded-xl border border-blue-200 shadow-2xs font-bold">
              ✨ Kontributor Aktif Mading Digital
            </div>
          </div>

          {/* Comment Section (Diskusi Antar Siswa) */}
          <div className="pt-4 space-y-6" id="comment-section">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Kolom Diskusi ({articleComments.length})
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Mari berdiskusi secara santun &amp; konstruktif
              </span>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSendComment} className="flex gap-3 items-start">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-blue-200 shrink-0 mt-1"
              />
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    rows={2}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder={`Tulis apresiasi atau tanggapan sebagai ${currentUser.name}...`}
                    className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all resize-none"
                    id="input-comment-text"
                  />
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className="absolute right-3 bottom-3 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    id="btn-submit-comment"
                  >
                    <span>Kirim</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {articleComments.length > 0 ? (
                articleComments.map((comment) => {
                  const hasLikedComment = comment.likedBy.includes(currentUser.id);

                  return (
                    <div
                      key={comment.id}
                      className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3"
                      id={`comment-item-${comment.id}`}
                    >
                      {/* Comment Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={comment.authorAvatar}
                            alt={comment.authorName}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                {comment.authorName}
                              </span>
                              {comment.authorClass && (
                                <span className="text-[10px] text-slate-600 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                                  {comment.authorClass}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {new Date(comment.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Delete comment if author or admin */}
                        {(comment.authorId === currentUser.id || currentUser.role === 'admin') && (
                          <button
                            onClick={() => deleteComment(selectedArticle.id, comment.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors rounded cursor-pointer"
                            title="Hapus komentar"
                            id={`btn-delete-comment-${comment.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Comment Body */}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-10">
                        {comment.content}
                      </p>

                      {/* Actions: Like & Reply */}
                      <div className="pl-10 flex items-center gap-4 text-xs">
                        <button
                          onClick={() => toggleLikeComment(selectedArticle.id, comment.id)}
                          className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                            hasLikedComment ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-blue-600'
                          }`}
                          id={`btn-like-comment-${comment.id}`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${hasLikedComment ? 'fill-blue-600' : ''}`} />
                          <span>{comment.likes || 0}</span>
                        </button>

                        <button
                          onClick={() =>
                            setReplyingToId(replyingToId === comment.id ? null : comment.id)
                          }
                          className="flex items-center gap-1 text-slate-500 hover:text-blue-600 font-semibold transition-colors cursor-pointer"
                          id={`btn-reply-comment-${comment.id}`}
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span>Balas</span>
                        </button>
                      </div>

                      {/* Inline Reply Input */}
                      {replyingToId === comment.id && (
                        <div className="pl-10 pt-2 flex gap-2">
                          <input
                            type="text"
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                            placeholder={`Balas pesan ${comment.authorName}...`}
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-100 outline-hidden"
                            id={`input-reply-${comment.id}`}
                            autoFocus
                          />
                          <button
                            onClick={() => handleSendReply(comment.id)}
                            disabled={!replyInput.trim()}
                            className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors cursor-pointer"
                            id={`btn-submit-reply-${comment.id}`}
                          >
                            Kirim
                          </button>
                        </div>
                      )}

                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="pl-10 space-y-2.5 pt-2 border-t border-slate-100">
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5"
                              id={`reply-item-${reply.id}`}
                            >
                              <img
                                src={reply.authorAvatar}
                                alt={reply.authorName}
                                className="w-6 h-6 rounded-full object-cover ring-1 ring-blue-200 mt-0.5"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-slate-900">
                                      {reply.authorName}
                                    </span>
                                    {reply.authorClass && (
                                      <span className="text-[9px] text-slate-500">
                                        ({reply.authorClass})
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] text-slate-400">
                                    {new Date(reply.createdAt).toLocaleTimeString('id-ID', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-700 mt-1">
                                  {reply.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500">
                    Belum ada diskusi untuk karya ini. Jadilah yang pertama memberikan apresiasi!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Articles Carousel */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Karya Terkait di Kategori &quot;{selectedArticle.category}&quot;
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => openArticleDetail(rel.id)}
                    className="p-3 bg-white hover:bg-blue-50/50 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer group shadow-2xs"
                  >
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">
                      {rel.authorName} • {rel.readingTimeMinutes} min
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
