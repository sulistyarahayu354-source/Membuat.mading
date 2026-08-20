import React, { useState } from 'react';
import { useMading } from '../context/MadingContext';
import { Article, ArticleStatus } from '../types';
import {
  ShieldCheck,
  Check,
  X,
  Pin,
  Clock,
  MessageSquare,
  AlertTriangle,
  Send,
  Eye,
  Trash2,
  Bell,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

export const ModerationPanel: React.FC = () => {
  const {
    articles,
    moderateArticle,
    deleteArticle,
    toggleFeatureArticle,
    openArticleDetail,
    currentUser,
    setIsModerationOpen,
    requestPushNotificationPermission,
    sendPushNotification,
    showToast,
  } = useMading();

  const [activeTab, setActiveTab] = useState<ArticleStatus | 'all'>('pending');
  const [selectedArticleForAction, setSelectedArticleForAction] = useState<Article | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [makeFeatured, setMakeFeatured] = useState(false);

  const pendingArticles = articles.filter((a) => a.status === 'pending');
  const approvedArticles = articles.filter((a) => a.status === 'approved');
  const rejectedArticles = articles.filter((a) => a.status === 'rejected');

  const displayedArticles =
    activeTab === 'all'
      ? articles
      : articles.filter((a) => a.status === activeTab);

  const handleOpenActionModal = (art: Article, type: 'approve' | 'reject') => {
    setSelectedArticleForAction(art);
    setActionType(type);
    setNotesInput(
      type === 'approve'
        ? 'Tulisan sangat bermakna dan memenuhi kaidah literasi sekolah. Selamat atas karyanya!'
        : 'Mohon perbaiki struktur kalimat atau lengkapi isi pembahasan sebelum dikirim ulang.'
    );
    setMakeFeatured(art.isFeatured || false);
  };

  const handleExecuteAction = () => {
    if (!selectedArticleForAction || !actionType) return;

    if (actionType === 'approve') {
      moderateArticle(selectedArticleForAction.id, 'approved', notesInput, makeFeatured);
    } else {
      moderateArticle(selectedArticleForAction.id, 'rejected', notesInput, false);
    }

    setSelectedArticleForAction(null);
    setActionType(null);
  };

  const handleSimulatePushTest = async () => {
    await requestPushNotificationPermission();
    sendPushNotification({
      userId: currentUser.id,
      type: 'article_approved',
      title: 'Uji Coba Push Notifikasi Web 🔔',
      message: 'Sistem push notifikasi mading digital berfungsi normal dan siap mengirim update persetujuan artikel!',
    });
  };

  return (
    <div className="py-8 bg-slate-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModerationOpen(false)}
              className="p-2.5 bg-white border border-blue-100 hover:bg-blue-50 rounded-xl text-slate-700 transition-colors shadow-2xs cursor-pointer"
              title="Kembali ke Beranda"
              id="btn-back-from-moderation"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold border border-blue-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Panel Moderasi Redaksi Mading
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kelola, kurasi, dan berikan evaluasi atas naskah karya yang diajukan para siswa.
              </p>
            </div>
          </div>

          {/* Test Push Web Notification Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulatePushTest}
              className="px-3.5 py-2 text-xs font-bold bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              id="btn-test-push-notif"
            >
              <Bell className="w-4 h-4 text-blue-600" />
              <span>Tes Notifikasi Push</span>
            </button>
          </div>
        </div>

        {/* Tab Badges */}
        <div className="flex items-center gap-2 pb-4 overflow-x-auto border-b border-blue-100 mb-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
                : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
            }`}
            id="tab-mod-pending"
          >
            <Clock className="w-4 h-4" />
            <span>Perlu Ditinjau</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/25 text-white font-extrabold">
              {pendingArticles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('approved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'approved'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
            }`}
            id="tab-mod-approved"
          >
            <Check className="w-4 h-4" />
            <span>Sudah Disetujui</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/25 text-white font-extrabold">
              {approvedArticles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rejected')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'rejected'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
            }`}
            id="tab-mod-rejected"
          >
            <X className="w-4 h-4" />
            <span>Ditolak / Revisi</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/25 text-white font-extrabold">
              {rejectedArticles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
            }`}
            id="tab-mod-all"
          >
            <span>Semua Naskah ({articles.length})</span>
          </button>
        </div>

        {/* Moderation Articles List */}
        {displayedArticles.length > 0 ? (
          <div className="space-y-4">
            {displayedArticles.map((article) => (
              <div
                key={article.id}
                className="p-5 rounded-2xl bg-white border border-blue-100 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between"
                id={`moderation-item-${article.id}`}
              >
                {/* Left: Article thumbnail & main content preview */}
                <div className="flex gap-4 items-start flex-1 min-w-0">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover ring-1 ring-blue-100 shrink-0"
                  />

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold border border-blue-100">
                        {article.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                          article.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : article.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {article.status === 'approved'
                          ? '✅ Disetujui'
                          : article.status === 'pending'
                          ? '⏳ Menunggu Moderasi'
                          : '❌ Ditolak'}
                      </span>
                      {article.isFeatured && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-bold text-[10px] flex items-center gap-1">
                          <Pin className="w-2.5 h-2.5 fill-white" />
                          Headline
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug truncate">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {article.content}
                    </p>

                    {/* Author & Timestamp */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 font-medium">
                      <span className="font-bold text-slate-800">
                        {article.authorName} ({article.authorClass})
                      </span>
                      <span>•</span>
                      <span>
                        Diajukan:{' '}
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    {article.moderationNotes && (
                      <p className="text-xs text-blue-900 bg-blue-50/80 px-3 py-1 rounded-lg border border-blue-200 mt-2 italic">
                        Catatan Evaluasi: &quot;{article.moderationNotes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 w-full lg:w-auto justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    onClick={() => openArticleDetail(article.id)}
                    className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl border border-slate-200 transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="Pratinjau Lengkap"
                    id={`btn-mod-preview-${article.id}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Pratinjau</span>
                  </button>

                  <button
                    onClick={() => toggleFeatureArticle(article.id)}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                      article.isFeatured
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                    title={article.isFeatured ? 'Batalkan Headline' : 'Jadikan Headline'}
                    id={`btn-mod-feature-${article.id}`}
                  >
                    <Pin className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {article.isFeatured ? 'Pin Aktif' : 'Pin'}
                    </span>
                  </button>

                  {article.status !== 'approved' && (
                    <button
                      onClick={() => handleOpenActionModal(article, 'approve')}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-emerald-200 transition-colors cursor-pointer"
                      id={`btn-mod-approve-${article.id}`}
                    >
                      <Check className="w-4 h-4" />
                      <span>Setujui &amp; Terbitkan</span>
                    </button>
                  )}

                  {article.status !== 'rejected' && (
                    <button
                      onClick={() => handleOpenActionModal(article, 'reject')}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      id={`btn-mod-reject-${article.id}`}
                    >
                      <X className="w-4 h-4" />
                      <span>Tolak / Revisi</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteArticle(article.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Hapus Karya"
                    id={`btn-mod-delete-${article.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-blue-200 p-12 text-center shadow-xs">
            <ShieldCheck className="w-12 h-12 text-blue-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Tidak Ada Karya dalam Antrean Ini
            </h3>
            <p className="text-xs text-slate-500">
              Semua pengajuan karya siswa telah ditangani dengan baik.
            </p>
          </div>
        )}

      </div>

      {/* Action Approval / Rejection Modal */}
      {selectedArticleForAction && actionType && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedArticleForAction(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-5 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
            id="moderation-decision-modal"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    actionType === 'approve'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {actionType === 'approve' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {actionType === 'approve'
                    ? 'Setujui & Publikasikan Karya'
                    : 'Tolak / Minta Revisi Karya'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticleForAction(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-800">{selectedArticleForAction.title}</p>
              <p className="text-slate-500">
                Penulis: {selectedArticleForAction.authorName} ({selectedArticleForAction.authorClass})
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Catatan Evaluasi / Pesan untuk Siswa <span className="text-slate-400">(Akan diterima via notifikasi)</span>
              </label>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Berikan feedback membangun untuk siswa..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-sky-400 outline-hidden resize-none"
                id="input-moderation-notes"
              />
            </div>

            {actionType === 'approve' && (
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-50 border border-sky-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={makeFeatured}
                  onChange={(e) => setMakeFeatured(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-400"
                />
                <div className="text-xs">
                  <span className="font-bold text-sky-900 block">Jadikan Pilihan Redaksi (Headline)</span>
                  <span className="text-sky-700 text-[11px]">
                    Karya ini akan disematkan di carousel teratas mading sekolah.
                  </span>
                </div>
              </label>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedArticleForAction(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleExecuteAction}
                className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md flex items-center gap-1.5 transition-all ${
                  actionType === 'approve'
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                }`}
                id="btn-confirm-moderation-decision"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {actionType === 'approve' ? 'Konfirmasi Terbitkan & Kirim Push' : 'Kirim Catatan Revisi'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
