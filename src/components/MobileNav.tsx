import React from 'react';
import { useMading } from '../context/MadingContext';
import {
  Home,
  Search,
  Plus,
  ShieldCheck,
  User,
  Workflow,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const {
    currentUser,
    isModerationOpen,
    isProfileOpen,
    isIPOPlannerOpen,
    setIsModerationOpen,
    setIsProfileOpen,
    setIsUploadModalOpen,
    setIsIPOPlannerOpen,
    articles,
  } = useMading();

  const pendingCount = articles.filter((a) => a.status === 'pending').length;

  const isHomeActive = !isModerationOpen && !isProfileOpen && !isIPOPlannerOpen;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-blue-100 px-3 py-2 shadow-lg"
      id="mobile-bottom-navigation"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            setIsModerationOpen(false);
            setIsProfileOpen(false);
            setIsIPOPlannerOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium transition-colors cursor-pointer ${
            isHomeActive ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
          id="mobile-nav-home"
        >
          <Home className="w-5 h-5" />
          <span>Mading</span>
        </button>

        {/* IPO Flow */}
        <button
          onClick={() => {
            setIsIPOPlannerOpen(true);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium transition-colors cursor-pointer ${
            isIPOPlannerOpen ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
          id="mobile-nav-ipo"
        >
          <Workflow className="w-5 h-5" />
          <span>Algoritma</span>
        </button>

        {/* Upload Action */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center justify-center w-11 h-11 -mt-5 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-300 active:scale-95 transition-transform cursor-pointer"
          aria-label="Kirim Karya"
          id="mobile-nav-upload"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Admin Moderation / Search */}
        {currentUser.role === 'admin' ? (
          <button
            onClick={() => {
              setIsModerationOpen(true);
              setIsProfileOpen(false);
              setIsIPOPlannerOpen(false);
            }}
            className={`relative flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium transition-colors cursor-pointer ${
              isModerationOpen ? 'text-amber-600 font-bold' : 'text-slate-500'
            }`}
            id="mobile-nav-moderation"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Moderasi</span>
            {pendingCount > 0 && (
              <span className="absolute top-0 right-1 w-4 h-4 text-[9px] font-bold bg-amber-500 text-white rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={() => {
              setIsModerationOpen(false);
              setIsProfileOpen(false);
              setIsIPOPlannerOpen(false);
              const searchInput = document.getElementById('search-input-navbar');
              if (searchInput) {
                searchInput.focus();
              }
              window.scrollTo({ top: 180, behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium text-slate-500 cursor-pointer"
            id="mobile-nav-search"
          >
            <Search className="w-5 h-5" />
            <span>Cari</span>
          </button>
        )}

        {/* Profile */}
        <button
          onClick={() => {
            setIsProfileOpen(true);
            setIsModerationOpen(false);
            setIsIPOPlannerOpen(false);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium transition-colors cursor-pointer ${
            isProfileOpen ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
          id="mobile-nav-profile"
        >
          <User className="w-5 h-5" />
          <span>Profil</span>
        </button>
      </div>
    </div>
  );
};
