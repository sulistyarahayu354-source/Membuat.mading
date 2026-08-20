import React, { useState } from 'react';
import { useMading } from '../context/MadingContext';
import { ArticleCard } from './ArticleCard';
import {
  User,
  Edit2,
  CheckCircle,
  Clock,
  XCircle,
  Bookmark,
  Award,
  Heart,
  Eye,
  BookOpen,
  ArrowLeft,
  Camera,
  Save,
  Sparkles,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    updateCurrentUserProfile,
    articles,
    setIsProfileOpen,
    activeProfileTab,
    setActiveProfileTab,
    setIsUploadModalOpen,
  } = useMading();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [gradeClass, setGradeClass] = useState(currentUser.gradeClass || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [socialLink, setSocialLink] = useState(currentUser.socialLink || '');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  // User's articles
  const userArticles = articles.filter((a) => a.authorId === currentUser.id);
  const approvedArticles = userArticles.filter((a) => a.status === 'approved');
  const pendingArticles = userArticles.filter((a) => a.status === 'pending');
  const rejectedArticles = userArticles.filter((a) => a.status === 'rejected');
  const bookmarkedArticles = articles.filter((a) => a.bookmarkedBy?.includes(currentUser.id));

  // Compute metrics
  const totalLikesReceived = userArticles.reduce((acc, a) => acc + (a.likes || 0), 0);
  const totalViewsReceived = userArticles.reduce((acc, a) => acc + (a.views || 0), 0);

  const getFilteredList = () => {
    switch (activeProfileTab) {
      case 'approved':
        return approvedArticles;
      case 'pending':
        return pendingArticles;
      case 'rejected':
        return rejectedArticles;
      case 'bookmarked':
        return bookmarkedArticles;
      default:
        return userArticles;
    }
  };

  const currentList = getFilteredList();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name: name.trim(),
      gradeClass: gradeClass.trim(),
      bio: bio.trim(),
      socialLink: socialLink.trim(),
      avatar: avatar.trim(),
    });
    setIsEditing(false);
  };

  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2.5 bg-white border border-blue-100 hover:bg-blue-50 rounded-xl text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold shadow-2xs cursor-pointer"
            id="btn-back-from-profile"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>Kembali ke Mading</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white hover:bg-blue-50 border border-blue-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            id="btn-toggle-edit-profile"
          >
            <Edit2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{isEditing ? 'Tutup Form Edit' : 'Edit Profil'}</span>
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm">
          {isEditing ? (
            /* Edit Mode */
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 pb-2 border-b border-blue-100">
                Ubah Informasi Profil
              </h3>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Pilih Avatar Profil
                </label>
                <div className="flex items-center gap-3">
                  {AVATAR_PRESETS.map((pUrl, idx) => (
                    <img
                      key={idx}
                      src={pUrl}
                      alt="Preset"
                      onClick={() => setAvatar(pUrl)}
                      className={`w-12 h-12 rounded-2xl object-cover cursor-pointer transition-all ${
                        avatar === pUrl
                          ? 'ring-4 ring-blue-500 scale-105 shadow-xs'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-hidden focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kelas / Jabatan
                  </label>
                  <input
                    type="text"
                    value={gradeClass}
                    onChange={(e) => setGradeClass(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-hidden focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Bio Singkat
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Username Media Sosial (Instagram/Twitter)
                </label>
                <input
                  type="text"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="@username"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-start sm:items-center gap-5">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-blue-100 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 text-white rounded-xl shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {currentUser.name}
                    </h2>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      {currentUser.role === 'admin' ? 'Guru Pembina (Admin)' : 'Siswa Penulis'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    {currentUser.gradeClass || 'Siswa SMAN 1 Nusantara'} • {currentUser.email}
                  </p>

                  <p className="text-xs text-slate-500 max-w-xl leading-relaxed pt-1">
                    {currentUser.bio || 'Belum ada bio singkat. Klik Edit Profil untuk menambahkan deskripsi diri.'}
                  </p>

                  {/* Badges / Lencana */}
                  {currentUser.badges && currentUser.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {currentUser.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Upload CTA */}
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-200 transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>Tulis Karya Baru</span>
              </button>

            </div>
          )}

          {/* User Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-100">
            <div className="p-3.5 bg-blue-50/40 rounded-2xl border border-blue-100/70">
              <div className="flex items-center gap-2 text-slate-600 text-xs mb-1 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Total Karya</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900">{userArticles.length}</div>
            </div>

            <div className="p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-100/70">
              <div className="flex items-center gap-2 text-slate-600 text-xs mb-1 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Karya Terbit</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-700">{approvedArticles.length}</div>
            </div>

            <div className="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100/70">
              <div className="flex items-center gap-2 text-slate-600 text-xs mb-1 font-medium">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Total Suka</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900">{totalLikesReceived}</div>
            </div>

            <div className="p-3.5 bg-blue-50/40 rounded-2xl border border-blue-100/70">
              <div className="flex items-center gap-2 text-slate-600 text-xs mb-1 font-medium">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Total Pembaca</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900">{totalViewsReceived}</div>
            </div>
          </div>

        </div>

        {/* Work History Filter Tabs */}
        <div>
          <div className="flex items-center gap-2 pb-3 overflow-x-auto border-b border-blue-100 mb-6">
            <button
              onClick={() => setActiveProfileTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeProfileTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
              }`}
              id="tab-profile-all"
            >
              Semua Karya ({userArticles.length})
            </button>

            <button
              onClick={() => setActiveProfileTab('approved')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeProfileTab === 'approved'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
              }`}
              id="tab-profile-approved"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Sudah Terbit ({approvedArticles.length})</span>
            </button>

            <button
              onClick={() => setActiveProfileTab('pending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeProfileTab === 'pending'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
                  : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
              }`}
              id="tab-profile-pending"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Menunggu Review ({pendingArticles.length})</span>
            </button>

            <button
              onClick={() => setActiveProfileTab('rejected')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeProfileTab === 'rejected'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                  : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
              }`}
              id="tab-profile-rejected"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Ditolak / Revisi ({rejectedArticles.length})</span>
            </button>

            <button
              onClick={() => setActiveProfileTab('bookmarked')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeProfileTab === 'bookmarked'
                  ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                  : 'bg-white text-slate-700 border border-blue-100 hover:bg-slate-50'
              }`}
              id="tab-profile-bookmarked"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Disimpan ({bookmarkedArticles.length})</span>
            </button>
          </div>

          {/* Cards List */}
          {currentList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentList.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-blue-200 p-12 text-center shadow-xs">
              <BookOpen className="w-10 h-10 text-blue-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">Belum ada karya pada kategori ini</h4>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Mulai kirimkan ide, puisi, atau tulisanmu untuk ditampilkan di mading digital!
              </p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 cursor-pointer"
              >
                Kirim Karya Sekarang
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
