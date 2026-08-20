import React from 'react';
import { useMading } from '../context/MadingContext';
import {
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Search,
  CheckCircle,
  Clock,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/initialData';

export const HeroBanner: React.FC = () => {
  const {
    articles,
    filter,
    setFilter,
    openArticleDetail,
    setIsUploadModalOpen,
    comments,
  } = useMading();

  const approvedArticles = articles.filter((a) => a.status === 'approved');
  const featuredArticles = approvedArticles.filter((a) => a.isFeatured);
  const featuredArticle = featuredArticles[0] || approvedArticles[0];

  // Calculate live statistics
  const totalComments = Object.values(comments).reduce((acc: number, curr) => {
    const list = Array.isArray(curr) ? curr : [];
    return (
      acc +
      list.length +
      list.reduce((rAcc: number, r) => rAcc + (r.replies ? r.replies.length : 0), 0)
    );
  }, 0);

  const uniqueAuthors = new Set(articles.map((a) => a.authorId)).size;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-100/60 via-slate-50 to-white pt-6 pb-8 border-b border-blue-100">
      
      {/* Background geometric ambient accents */}
      <div className="absolute top-0 right-10 -mt-12 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-12 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Ticker / Running Announcement */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-blue-200/80 shadow-xs text-xs text-blue-900">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="font-bold text-blue-700">Mading Edisi Agustus:</span>
          <span className="text-slate-600 truncate max-w-[280px] sm:max-w-md">
            Penerimaan karya tema &quot;Literasi, Sains &amp; Ekspresi Seni Nusantara&quot; dibuka hingga 30 Agustus.
          </span>
        </div>

        {/* Hero Top Grid: Left Introduction + Right Featured Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Left Column: Heading, Subheading & Action */}
          <div className="lg:col-span-7 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Pusat Literasi Digital &amp; Karya Siswa SMAN 1</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ekspresikan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Ide &amp; Karyamu</span> di Mading Sekolah.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
              Ruang publikasi digital bagi seluruh siswa SMAN 1 Nusantara. Unggah cerpen, opini kritis, karya puisi, inovasi teknologi, hingga seni visual dengan sistem kurasi redaksi yang terpercaya.
            </p>

            {/* Quick Action & Search (Mobile Friendly) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative flex-1 md:hidden">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filter.searchQuery}
                  onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Cari karya siswa..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-blue-200 rounded-xl text-sm text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-200 outline-hidden"
                  id="search-input-hero-mobile"
                />
              </div>

              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                id="btn-hero-kirim-karya"
              >
                <span>Kirim Karyamu Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              <div className="bg-white/90 backdrop-blur-sm border border-blue-100 p-3.5 rounded-2xl shadow-xs">
                <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-[11px] font-semibold text-slate-500">Terbit</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900">{approvedArticles.length} Karya</div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-blue-100 p-3.5 rounded-2xl shadow-xs">
                <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-[11px] font-semibold text-slate-500">Kontributor</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900">{uniqueAuthors} Siswa</div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-blue-100 p-3.5 rounded-2xl shadow-xs">
                <div className="flex items-center gap-1.5 text-teal-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[11px] font-semibold text-slate-500">Diskusi</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900">{totalComments} Tanggapan</div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Article Card */}
          {featuredArticle && (
            <div className="lg:col-span-5">
              <div
                onClick={() => openArticleDetail(featuredArticle.id)}
                className="group relative bg-white rounded-2xl border border-blue-100 shadow-md shadow-blue-100/50 overflow-hidden cursor-pointer hover:shadow-xl hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300"
                id="hero-featured-article-card"
              >
                {/* Badge Headline */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 text-white text-xs font-bold shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>Pilihan Redaksi Mading</span>
                </div>

                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-100">
                      {featuredArticle.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {featuredArticle.readingTimeMinutes} min baca
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={featuredArticle.authorAvatar}
                        alt={featuredArticle.authorName}
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-blue-200"
                      />
                      <span className="text-xs font-semibold text-slate-700">
                        {featuredArticle.authorName}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({featuredArticle.authorClass})
                      </span>
                    </div>

                    <div className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Baca Naskah</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Category Filter Chips Bar */}
        <div className="pt-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'Semua Kategori' }))}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filter.category === 'Semua Kategori'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-blue-100'
              }`}
              id="category-chip-all"
            >
              🌟 Semua Kategori
            </button>

            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setFilter((prev) => ({ ...prev, category: cat.name }))}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  filter.category === cat.name
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-blue-100'
                }`}
                id={`category-chip-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
