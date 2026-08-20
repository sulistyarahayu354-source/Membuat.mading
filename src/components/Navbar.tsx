import React, { useState } from 'react';
import { useMading } from '../context/MadingContext';
import {
  BookOpen,
  Search,
  Bell,
  PlusCircle,
  ShieldCheck,
  User,
  Workflow,
  ChevronDown,
  Sparkles,
  Check,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    allUsers,
    switchUser,
    filter,
    setFilter,
    unreadNotificationCount,
    setIsUploadModalOpen,
    setIsModerationOpen,
    setIsProfileOpen,
    setIsIPOPlannerOpen,
    setIsNotificationDrawerOpen,
    articles,
  } = useMading();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const pendingCount = articles.filter((a) => a.status === 'pending').length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & School Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setIsProfileOpen(false);
                setIsModerationOpen(false);
                setFilter((prev) => ({ ...prev, searchQuery: '', category: 'Semua Kategori' }));
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              id="nav-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight tracking-tight">
                    Mading<span className="text-blue-600">Digital</span>
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                    SMAN 1
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Wadah Literasi &amp; Kreativitas Pelajar
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar - Desktop & Tablet */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={filter.searchQuery}
                onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Cari karya, topik sastra, atau nama siswa..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all outline-hidden"
                id="search-input-navbar"
              />
              {filter.searchQuery && (
                <button
                  onClick={() => setFilter((prev) => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
                  id="btn-clear-search"
                >
                  Batal
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Perencanaan & Algoritma IPO Button */}
            <button
              onClick={() => setIsIPOPlannerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors shadow-2xs cursor-pointer"
              title="Lihat Perencanaan & Algoritma IPO Sistem Mading"
              id="btn-ipo-planner"
            >
              <Workflow className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Perencanaan &amp; Algoritma IPO</span>
              <span className="sm:hidden">IPO</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
            </button>

            {/* Moderation Button (Only for Admin / or show with badge) */}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => {
                  setIsModerationOpen(true);
                  setIsProfileOpen(false);
                }}
                className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors cursor-pointer"
                id="btn-admin-moderation-nav"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Moderasi</span>
                {pendingCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-white bg-amber-600 rounded-full animate-bounce">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}

            {/* Upload Button */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-200 transition-all cursor-pointer"
              id="btn-upload-karya-nav"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>Unggah Karya</span>
            </button>

            {/* Notification Drawer Toggle with Push Bell */}
            <button
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl border border-transparent hover:border-blue-100 transition-colors cursor-pointer"
              aria-label="Buka notifikasi"
              id="btn-open-notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-extrabold bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xs">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Role Switcher & User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-left cursor-pointer"
                id="btn-role-switcher"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-blue-300"
                />
                <div className="hidden lg:block text-left pr-1">
                  <div className="text-xs font-semibold text-slate-800 leading-none truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-blue-600 font-medium capitalize mt-0.5">
                    {currentUser.role === 'admin' ? 'Guru Pembina' : currentUser.gradeClass || 'Siswa'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Dropdown Menu for Role Switching & Profile */}
              {isRoleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-blue-100 py-2 z-50 divide-y divide-slate-100"
                  id="role-dropdown-menu"
                >
                  <div className="px-4 py-3">
                    <p className="text-xs text-slate-400 font-medium">Pengguna Saat Ini</p>
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      Peran: {currentUser.role === 'admin' ? 'Guru Pembina / Admin Mading' : 'Siswa Penulis'}
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsModerationOpen(false);
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer"
                      id="btn-view-profile-menu"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Lihat Profil &amp; Riwayat Karya</span>
                    </button>
                  </div>

                  {/* Switch to other users / roles for easy testing */}
                  <div className="p-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                      Ganti Akun (Simulasi Peran)
                    </p>
                    <div className="space-y-1">
                      {allUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => {
                            switchUser(user.id);
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors cursor-pointer ${
                            user.id === currentUser.id
                              ? 'bg-blue-50 text-blue-800 font-semibold'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                          id={`btn-switch-user-${user.id}`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-6 h-6 rounded-md object-cover"
                            />
                            <div className="truncate">
                              <p className="truncate text-xs font-medium">{user.name}</p>
                              <p className="text-[10px] text-slate-400">
                                {user.role === 'admin' ? 'Guru Pembina (Admin)' : user.gradeClass}
                              </p>
                            </div>
                          </div>
                          {user.id === currentUser.id && (
                            <Check className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
