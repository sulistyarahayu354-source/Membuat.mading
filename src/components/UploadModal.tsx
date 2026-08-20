import React, { useState } from 'react';
import { useMading } from '../context/MadingContext';
import { ArticleCategory } from '../types';
import { CATEGORIES_LIST, IMAGE_PRESETS } from '../data/initialData';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Edit3,
  Tag,
  AlertCircle,
  Sparkles,
  Info,
} from 'lucide-react';

export const UploadModal: React.FC = () => {
  const {
    isUploadModalOpen,
    setIsUploadModalOpen,
    currentUser,
    submitArticle,
    openArticleDetail,
  } = useMading();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('Karya Sastra & Puisi');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(IMAGE_PRESETS[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [imageTab, setImageTab] = useState<'preset' | 'custom'>('preset');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['LiterasiSekolah', 'KaryaSiswa']);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isUploadModalOpen) return null;

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim().replace(/^#/, '')]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const finalImage = imageTab === 'custom' && customImageUrl.trim() ? customImageUrl.trim() : coverImage;

    // IPO Input Payload
    const result = submitArticle({
      title: title.trim(),
      category,
      summary: summary.trim() || content.slice(0, 120) + '...',
      content: content.trim(),
      coverImage: finalImage,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorClass: currentUser.gradeClass || (currentUser.role === 'admin' ? 'Guru Pembina' : 'Siswa SMAN 1'),
      authorAvatar: currentUser.avatar,
      tags,
      readingTimeMinutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 150)),
      status: currentUser.role === 'admin' ? 'approved' : 'pending',
    });

    if (result.success) {
      setIsUploadModalOpen(false);
      // Reset fields
      setTitle('');
      setSummary('');
      setContent('');
      if (result.article && currentUser.role === 'admin') {
        openArticleDetail(result.article.id);
      }
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn"
      id="upload-modal-overlay"
      onClick={() => setIsUploadModalOpen(false)}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto flex flex-col relative border border-slate-100"
        onClick={(e) => e.stopPropagation()}
        id="upload-modal-container"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center border border-blue-200">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Unggah Karya Mading Digital
              </h2>
              <p className="text-xs text-slate-500">
                Kirimkan karya orisinalmu untuk dikurasi oleh tim redaksi sekolah.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPreviewMode
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              id="btn-toggle-upload-preview"
            >
              {isPreviewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isPreviewMode ? 'Edit Form' : 'Pratinjau'}</span>
            </button>

            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              id="btn-close-upload-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isPreviewMode ? (
            /* Live Preview View */
            <div className="space-y-6">
              <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Ini adalah simulasi tampilan artikel Anda di mading sekolah setelah lolos moderasi.
                </span>
              </div>

              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4 shadow-xs">
                <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                  {category}
                </span>
                <h1 className="text-2xl font-bold text-slate-900">
                  {title || 'Judul Karya Anda'}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-blue-200"
                  />
                  <span className="font-semibold text-slate-800">{currentUser.name}</span>
                  <span>•</span>
                  <span>{currentUser.gradeClass || 'Siswa'}</span>
                </div>
                <img
                  src={imageTab === 'custom' && customImageUrl ? customImageUrl : coverImage}
                  alt="Cover"
                  className="w-full h-64 object-cover rounded-xl border border-slate-100"
                />
                <p className="text-sm text-slate-600 italic border-l-4 border-blue-500 pl-3">
                  {summary || 'Ringkasan artikel Anda...'}
                </p>
                <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                  {content || 'Isi artikel lengkap Anda akan tampil di sini...'}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Konfirmasi &amp; Kirim Karya</span>
              </button>
            </div>
          ) : (
            /* Upload Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Author Preview Badge */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-300"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {currentUser.gradeClass || (currentUser.role === 'admin' ? 'Guru Pembina' : 'Siswa SMAN 1')}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-800 bg-blue-100/80 border border-blue-200 px-3 py-1 rounded-lg">
                  {currentUser.role === 'admin' ? 'Terbit Otomatis (Admin)' : 'Perlu Moderasi Guru'}
                </span>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Judul Karya <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Mengarungi Samudra Aksara: Refleksi Hari Kemerdekaan..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                  id="input-article-title"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Minimal 5 karakter. Buatlah judul yang menarik dan mencerminkan esensi karya.
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kategori Karya <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      type="button"
                      key={cat.name}
                      onClick={() => setCategory(cat.name)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        category === cat.name
                          ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-100 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ringkasan / Sinopsis Singkat
                </label>
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk preview di kartu mading..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                  id="input-article-summary"
                />
              </div>

              {/* Full Content */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Isi Tulisan / Naskah Karya <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {content.split(/\s+/).filter(Boolean).length} kata
                  </span>
                </div>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan bait puisi, isi cerpen, ulasan berita, atau esai opinimu secara lengkap di sini..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all resize-y"
                  id="textarea-article-content"
                />
              </div>

              {/* Cover Image Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Gambar Sampul / Ilustrasi Karya
                </label>
                
                <div className="flex items-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageTab('preset')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      imageTab === 'preset'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Pilihan Ilustrasi Sekolah
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('custom')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      imageTab === 'custom'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    URL Gambar Kustom
                  </button>
                </div>

                {imageTab === 'preset' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {IMAGE_PRESETS.map((preset, idx) => (
                      <div
                        key={idx}
                        onClick={() => setCoverImage(preset.url)}
                        className={`relative rounded-xl overflow-hidden aspect-16/10 cursor-pointer border-2 transition-all ${
                          coverImage === preset.url
                            ? 'border-blue-600 ring-2 ring-blue-200'
                            : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 flex items-end p-1.5">
                          <span className="text-[10px] font-bold text-white leading-tight truncate">
                            {preset.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="Masukkan URL foto/ilustrasi (misal: https://images.unsplash.com/...)"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-blue-400 outline-hidden"
                      id="input-custom-image-url"
                    />
                    {customImageUrl && (
                      <img
                        src={customImageUrl}
                        alt="Custom Preview"
                        className="w-full h-32 object-cover rounded-xl mt-2 border border-slate-200"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tag Kata Kunci
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Ketik tag lalu tekan tambah (misal: PuisiBulanIni)..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                    id="input-article-tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Tambah Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-blue-600 hover:text-rose-600 ml-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-200 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  id="btn-submit-article-form"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {currentUser.role === 'admin' ? 'Terbitkan Sekarang' : 'Kirim untuk Moderasi'}
                  </span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
