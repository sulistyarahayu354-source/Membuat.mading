import React, { useMemo } from 'react';
import { useMading } from '../context/MadingContext';
import { FilterOptions } from '../types';
import { ArticleCard } from './ArticleCard';
import {
  SlidersHorizontal,
  Search,
  BookX,
  PlusCircle,
  User,
  Filter,
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/initialData';

export const ArticleGrid: React.FC = () => {
  const {
    articles,
    filter,
    setFilter,
    allUsers,
    setIsUploadModalOpen,
  } = useMading();

  // Filter & Sorting Logic (Algoritma Pengurutan & Filter IPO)
  const filteredAndSortedArticles = useMemo(() => {
    // 1. Filter only approved articles for the public grid (or show pending if user is the author)
    return articles
      .filter((article) => {
        // Only show approved articles on public board
        if (article.status !== 'approved') return false;

        // Search query filter (search by title, content, authorName, tags)
        if (filter.searchQuery.trim()) {
          const q = filter.searchQuery.toLowerCase();
          const matchTitle = article.title.toLowerCase().includes(q);
          const matchContent = article.content.toLowerCase().includes(q);
          const matchAuthor = article.authorName.toLowerCase().includes(q);
          const matchCategory = article.category.toLowerCase().includes(q);
          const matchTags = article.tags?.some((t) => t.toLowerCase().includes(q));

          if (!matchTitle && !matchContent && !matchAuthor && !matchCategory && !matchTags) {
            return false;
          }
        }

        // Category filter
        if (filter.category && filter.category !== 'Semua Kategori') {
          if (article.category !== filter.category) return false;
        }

        // Author filter
        if (filter.author && filter.author !== 'Semua Penulis') {
          if (article.authorName !== filter.author) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // 2. Sorting Algorithm (Algoritma Kronologis & Popularitas)
        if (filter.sortBy === 'terbaru') {
          // Priority to featured articles first, then chronologically by publishedAt / createdAt
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          const timeA = new Date(a.publishedAt || a.createdAt).getTime();
          const timeB = new Date(b.publishedAt || b.createdAt).getTime();
          return timeB - timeA;
        }

        if (filter.sortBy === 'terpopuler') {
          const scoreA = (a.likes || 0) * 3 + (a.views || 0);
          const scoreB = (b.likes || 0) * 3 + (b.views || 0);
          return scoreB - scoreA;
        }

        if (filter.sortBy === 'pilihan_redaksi') {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return (b.likes || 0) - (a.likes || 0);
        }

        if (filter.sortBy === 'terlama') {
          const timeA = new Date(a.publishedAt || a.createdAt).getTime();
          const timeB = new Date(b.publishedAt || b.createdAt).getTime();
          return timeA - timeB;
        }

        return 0;
      });
  }, [articles, filter]);

  // Extract list of unique authors for the filter
  const authorNames = useMemo(() => {
    const names = new Set<string>();
    articles.forEach((a) => {
      if (a.authorName) names.add(a.authorName);
    });
    return Array.from(names);
  }, [articles]);

  const hasActiveFilters =
    filter.searchQuery.trim() !== '' ||
    filter.category !== 'Semua Kategori' ||
    filter.author !== 'Semua Penulis';

  return (
    <section className="py-8 bg-slate-50/50 min-h-[500px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Control & Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-blue-100">
          
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Galeri Karya Siswa
              </h2>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {filteredAndSortedArticles.length} Karya
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Disortir secara kronologis &amp; interaktif untuk seluruh warga sekolah.
            </p>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={filter.category}
                onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))}
                className="pl-8 pr-8 py-2 bg-white border border-blue-100 shadow-2xs rounded-xl text-xs font-semibold text-slate-700 hover:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-hidden appearance-none cursor-pointer"
                id="select-filter-category"
              >
                <option value="Semua Kategori">📁 Semua Kategori</option>
                {CATEGORIES_LIST.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 text-blue-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Author Dropdown */}
            <div className="relative">
              <select
                value={filter.author}
                onChange={(e) => setFilter((prev) => ({ ...prev, author: e.target.value }))}
                className="pl-8 pr-8 py-2 bg-white border border-blue-100 shadow-2xs rounded-xl text-xs font-semibold text-slate-700 hover:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-hidden appearance-none cursor-pointer"
                id="select-filter-author"
              >
                <option value="Semua Penulis">✍️ Semua Penulis</option>
                {authorNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <User className="w-3.5 h-3.5 text-blue-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sorting Dropdown */}
            <div className="relative">
              <select
                value={filter.sortBy}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    sortBy: e.target.value as FilterOptions['sortBy'],
                  }))
                }
                className="pl-8 pr-8 py-2 bg-white border border-blue-100 shadow-2xs rounded-xl text-xs font-semibold text-slate-700 hover:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-hidden appearance-none cursor-pointer"
                id="select-sort-by"
              >
                <option value="terbaru">⏱️ Terbaru (Kronologis)</option>
                <option value="terpopuler">🔥 Terpopuler (Suka &amp; Baca)</option>
                <option value="pilihan_redaksi">🌟 Pilihan Redaksi</option>
                <option value="terlama">⏳ Terlama</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={() =>
                  setFilter({
                    searchQuery: '',
                    category: 'Semua Kategori',
                    author: 'Semua Penulis',
                    sortBy: 'terbaru',
                  })
                }
                className="px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                id="btn-reset-filters"
              >
                Reset Filter
              </button>
            )}

          </div>

        </div>

        {/* Active Search & Filter Banner */}
        {hasActiveFilters && (
          <div className="mb-6 p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2 flex-wrap">
              <Search className="w-4 h-4 text-blue-600" />
              <span>Menampilkan hasil untuk:</span>
              {filter.searchQuery && (
                <span className="px-2 py-0.5 rounded-md bg-white font-semibold text-slate-800 border border-blue-200 shadow-2xs">
                  Kata Kunci: &quot;{filter.searchQuery}&quot;
                </span>
              )}
              {filter.category !== 'Semua Kategori' && (
                <span className="px-2 py-0.5 rounded-md bg-white font-semibold text-slate-800 border border-blue-200 shadow-2xs">
                  Kategori: {filter.category}
                </span>
              )}
              {filter.author !== 'Semua Penulis' && (
                <span className="px-2 py-0.5 rounded-md bg-white font-semibold text-slate-800 border border-blue-200 shadow-2xs">
                  Penulis: {filter.author}
                </span>
              )}
            </div>
            <span className="text-slate-500 font-medium">
              Ditemukan {filteredAndSortedArticles.length} artikel
            </span>
          </div>
        )}

        {/* Article Cards Grid */}
        {filteredAndSortedArticles.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            id="mading-articles-grid"
          >
            {filteredAndSortedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-dashed border-blue-200 p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <BookX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Tidak Ada Karya Ditemukan
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Coba sesuaikan kata kunci pencarian, ubah kategori, atau jadilah yang pertama mengunggah karya dengan tema ini!
            </p>
            <div className="flex justify-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={() =>
                    setFilter({
                      searchQuery: '',
                      category: 'Semua Kategori',
                      author: 'Semua Penulis',
                      sortBy: 'terbaru',
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Bersihkan Filter
                </button>
              )}
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-200 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Unggah Karya Baru</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
