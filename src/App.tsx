/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MadingProvider, useMading } from './context/MadingContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ArticleGrid } from './components/ArticleGrid';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { UploadModal } from './components/UploadModal';
import { ModerationPanel } from './components/ModerationPanel';
import { ProfileView } from './components/ProfileView';
import { NotificationDrawer } from './components/NotificationDrawer';
import { IPOPlannerModal } from './components/IPOPlannerModal';
import { ToastNotification } from './components/ToastNotification';
import { MobileNav } from './components/MobileNav';
import {
  BookOpen,
  Heart,
  Workflow,
  Sparkles,
  ShieldCheck,
  Mail,
  MapPin,
  Globe,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { isModerationOpen, isProfileOpen, setIsIPOPlannerOpen, setIsUploadModalOpen } = useMading();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased pb-16 md:pb-0 selection:bg-blue-200 selection:text-blue-900">
      
      {/* Top Main Navigation */}
      <Navbar />

      {/* Main Body View Switching */}
      <main className="flex-1">
        {isModerationOpen ? (
          <ModerationPanel />
        ) : isProfileOpen ? (
          <ProfileView />
        ) : (
          <>
            <HeroBanner />
            <ArticleGrid />
          </>
        )}
      </main>

      {/* School Footer */}
      <footer className="bg-white border-t border-blue-100/80 pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-100">
            
            {/* School Brand */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-slate-900 text-base">
                  Mading Digital SMAN 1 Nusantara
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Platform kurasi dan publikasi karya literasi, karya sastra, artikel opini, jurnalistik sekolah, dan galeri seni siswa yang mengedepankan kreativitas dan etika digital.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> Jl. Pendidikan No. 45, Nusantara
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Navigasi Cepat
              </h4>
              <ul className="text-xs text-slate-500 space-y-2 font-medium">
                <li>
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Formulir Kirim Karya Siswa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsIPOPlannerOpen(true)}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Workflow className="w-3 h-3 text-blue-600" />
                    <span>Perencanaan &amp; Logika IPO</span>
                  </button>
                </li>
                <li>
                  <a href="#mading-articles-grid" className="hover:text-blue-600 transition-colors">
                    Daftar Karya &amp; Cerpen Siswa
                  </a>
                </li>
                <li>
                  <span className="text-slate-400">Panduan Penulisan &amp; Hak Cipta</span>
                </li>
              </ul>
            </div>

            {/* Editorial Board */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Tim Redaksi Mading
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dikelola oleh Tim Ekstrakurikuler Jurnalistik &amp; Sastra didampingi Dewan Pembina Guru Bahasa Indonesia SMAN 1.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Terverifikasi Kurasi Sekolah</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Mading Digital SMAN 1 Nusantara. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-1">
              <span>Tema Desain: Geometric Balance (Biru &amp; Putih Minimalis).</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating & Overlay Elements */}
      <ArticleDetailModal />
      <UploadModal />
      <IPOPlannerModal />
      <NotificationDrawer />
      <ToastNotification />
      <MobileNav />

    </div>
  );
};

export default function App() {
  return (
    <MadingProvider>
      <MainContent />
    </MadingProvider>
  );
}
