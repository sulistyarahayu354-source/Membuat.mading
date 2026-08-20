import React, { useState } from 'react';
import { useMading } from '../context/MadingContext';
import {
  X,
  Workflow,
  ArrowRight,
  CheckCircle,
  Database,
  Layers,
  Code,
  ShieldCheck,
  Smartphone,
  Play,
  Sparkles,
  FileText,
  Clock,
  Eye,
  Heart,
  Palette,
  Terminal,
} from 'lucide-react';

export const IPOPlannerModal: React.FC = () => {
  const { isIPOPlannerOpen, setIsIPOPlannerOpen, currentUser } = useMading();

  const [activeTab, setActiveTab] = useState<'blueprint' | 'ipo_diagram' | 'simulator' | 'tech_stack'>('ipo_diagram');

  // Interactive Simulator state
  const [simTitle, setSimTitle] = useState('Eksplorasi Ekosistem Bakau di Pesisir Utara');
  const [simCategory, setSimCategory] = useState('Tips Belajar & Sains');
  const [simContent, setSimContent] = useState('Hutan bakau memiliki fungsi krusial sebagai benteng abrasi alami dan penyerap karbon aktif...');
  const [simIsProfane, setSimIsProfane] = useState(false);
  const [simRole, setSimRole] = useState<'siswa' | 'admin'>('siswa');
  const [simOutputState, setSimOutputState] = useState<{
    step1Validation: boolean;
    step2EthicsCheck: boolean;
    step3ModerationQueue: 'Auto-Approved (Admin)' | 'Enqueued to Teacher (Pending)' | 'Rejected';
    step4ChronologicalRank: number;
    step5PushNotifTriggered: boolean;
    executionLog: string[];
  } | null>(null);

  if (!isIPOPlannerOpen) return null;

  const runIPOSimulator = () => {
    const logs: string[] = [];
    logs.push(`[1. INPUT] Menerima payload artikel dari: ${currentUser.name} (${simRole.toUpperCase()})`);
    logs.push(`[1. INPUT] Judul: "${simTitle}", Kategori: "${simCategory}", Panjang teks: ${simContent.length} karakter`);

    // Step 1: Input Validation
    const isLengthValid = simTitle.trim().length >= 5 && simContent.trim().length >= 20;
    logs.push(`[2. PROCESS - Validasi] Cek batas minimal panjang karakter -> ${isLengthValid ? 'VALID (Lolos)' : 'GAGAL (Kurang panjang)'}`);

    // Step 2: Ethics & Content Sanitization
    const isClean = !simIsProfane;
    logs.push(`[2. PROCESS - Filter Santun] Deteksi kata sensitif/SARA -> ${isClean ? 'BERSIH (Aman)' : 'DITEMUKAN KATA TIDAK PANTAS'}`);

    // Step 3: Moderation Logic
    let moderationStatus: 'Auto-Approved (Admin)' | 'Enqueued to Teacher (Pending)' | 'Rejected' = 'Enqueued to Teacher (Pending)';
    if (!isLengthValid || !isClean) {
      moderationStatus = 'Rejected';
      logs.push(`[2. PROCESS - Decision] Naskah ditolak oleh sistem validasi otomatis.`);
    } else if (simRole === 'admin') {
      moderationStatus = 'Auto-Approved (Admin)';
      logs.push(`[2. PROCESS - Decision] Penulis berstatus Pembina/Admin -> Langsung diterbitkan ke Mading (Status: APPROVED).`);
    } else {
      moderationStatus = 'Enqueued to Teacher (Pending)';
      logs.push(`[2. PROCESS - Decision] Penulis berstatus Siswa -> Masuk ke antrean moderasi Guru Pembina (Status: PENDING).`);
    }

    // Step 4: Chronological Indexing
    const rank = 1;
    logs.push(`[2. PROCESS - Sort] Menghitung timestamp kronologis & indeks prioritas mading -> Peringkat #${rank} Grid.`);

    // Step 5: Push notification
    const pushTriggered = isLengthValid && isClean;
    if (pushTriggered) {
      logs.push(`[3. OUTPUT - Push Notification] Menyiapkan payload Web Push Notification API ke target device.`);
    }
    logs.push(`[3. OUTPUT - Rendering] Menghasilkan tampilan Grid Kartu Mading interaktif, responsive card layout & SEO metadata.`);

    setSimOutputState({
      step1Validation: isLengthValid,
      step2EthicsCheck: isClean,
      step3ModerationQueue: moderationStatus,
      step4ChronologicalRank: rank,
      step5PushNotifTriggered: pushTriggered,
      executionLog: logs,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn"
      id="ipo-planner-modal-overlay"
      onClick={() => setIsIPOPlannerOpen(false)}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto flex flex-col relative border border-slate-100"
        onClick={(e) => e.stopPropagation()}
        id="ipo-planner-modal-container"
      >
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Perencanaan &amp; Logika Algoritma IPO Mading Digital
              </h2>
              <p className="text-xs text-slate-500">
                Blueprint arsitektur sistem, alur Input-Process-Output, dan visualisasi simulasi.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsIPOPlannerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            id="btn-close-ipo-planner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-blue-100 flex items-center gap-2 overflow-x-auto bg-slate-50/60">
          <button
            onClick={() => setActiveTab('ipo_diagram')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'ipo_diagram'
                ? 'border-blue-600 text-blue-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>1. Diagram &amp; Logika IPO</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-blue-600 text-blue-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Play className="w-4 h-4 text-emerald-600" />
            <span>2. Simulator IPO Interaktif</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </button>

          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'blueprint'
                ? 'border-blue-600 text-blue-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. Perencanaan Arsitektur &amp; Fitur</span>
          </button>

          <button
            onClick={() => setActiveTab('tech_stack')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'tech_stack'
                ? 'border-blue-600 text-blue-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>4. Desain UI &amp; Pedoman Visual</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* TAB 1: DIAGRAM & LOGIKA IPO */}
          {activeTab === 'ipo_diagram' && (
            <div className="space-y-8">
              
              <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200">
                <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Konsep Dasar IPO (Input - Process - Output) Mading Digital
                </h3>
                <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                  Algoritma IPO mentransformasi data mentah yang diunggah siswa menjadi galeri mading sekolah yang interaktif, tersortir secara kronologis, dan terverifikasi secara etis oleh tim pembina redaksi.
                </p>
              </div>

              {/* 3 Step Boxes Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                
                {/* 1. INPUT */}
                <div className="bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-sm relative space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-xs">
                    <span>TAHAP 1: INPUT</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">Masukan Data Karya &amp; Siswa</h4>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Identitas:</strong> Nama siswa, NISN/Kelas, Avatar, Bio.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Konten Karya:</strong> Judul, Kategori (Puisi/Cerpen/Opini/dll), Ringkasan, Naskah Lengkap.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Aset Visual:</strong> File Gambar Cover / Presets ilustrasi sekolah.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Interaksi:</strong> Komentar, Balasan pesan, Like, dan Catatan moderasi.</span>
                    </li>
                  </ul>
                </div>

                {/* 2. PROCESS */}
                <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm relative space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-600 text-white text-xs font-bold shadow-xs">
                    <span>TAHAP 2: PROSES</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">Logika Validasi &amp; Pengurutan</h4>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Validasi Klien:</strong> Cek panjang minimal judul (&gt;=5 char) dan isi (&gt;=20 char).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Moderasi Redaksi:</strong> Guru Pembina meninjau, menyetujui, atau meminta revisi.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Pengurutan Kronologis:</strong> Menghitung indeks <code>publishedAt DESC</code> dan prioritas <code>isFeatured</code>.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Push Dispatcher:</strong> Menembakkan Web Push Notification saat artikel disetujui.</span>
                    </li>
                  </ul>
                </div>

                {/* 3. OUTPUT */}
                <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200 shadow-sm relative space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-xs">
                    <span>TAHAP 3: OUTPUT</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">Tampilan Mading Interaktif</h4>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Grid Kartu Mading:</strong> Layout responsif kartu dengan visual cover, lencana kategori, dan waktu baca.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Modal Baca Interaktif:</strong> Tipografi optimal, ruang diskusi komentar bertingkat (nested replies).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Push Notification:</strong> Notifikasi native di perangkat seluler / peramban siswa.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Portofolio Profil:</strong> Rekap riwayat karya dan statistik lencana prestasi.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Algorithmic Flowchart Visualizer */}
              <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl space-y-4 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-blue-400" />
                    <h4 className="text-sm font-bold text-white">
                      Pseudocode Algoritma Alur IPO &amp; Moderasi
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Algorithm v1.0</span>
                </div>

                <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
{`// 1. INPUT PHASE
FUNCTION OnArticleSubmit(inputData, authorProfile):
  // 2. PROCESS PHASE - Validation
  IF LENGTH(inputData.title) < 5 OR LENGTH(inputData.content) < 20:
     RETURN { status: "ERROR", message: "Panjang karakter tidak memenuhi standar minimal" }
  
  // Create Article Document
  let newArticle = {
     id: GenerateUUID(),
     title: Sanitize(inputData.title),
     category: inputData.category,
     content: Sanitize(inputData.content),
     author: authorProfile,
     createdAt: CurrentTimestamp(),
     status: (authorProfile.role === 'ADMIN') ? 'APPROVED' : 'PENDING'
  }

  // Admin Review / Moderation Loop
  IF newArticle.status === 'PENDING':
     PushToQueue(ModerationQueue, newArticle)
     NotifyAdmin("Karya baru menunggu review", newArticle)
  ELSE:
     PublishToBoard(newArticle)

// 3. OUTPUT PHASE - Real-time Push & Rendering
FUNCTION OnModerationApprove(articleId, reviewerNote, isFeatured):
  let article = FindArticle(articleId)
  article.status = 'APPROVED'
  article.publishedAt = CurrentTimestamp()
  article.isFeatured = isFeatured

  // Trigger Native Push Web Notification API
  DispatchPushNotification({
     recipient: article.author.id,
     title: "Karya Anda Telah Diterbitkan! 🎉",
     body: "Karya '" + article.title + "' telah disetujui pembina."
  })

  // Re-sort board chronologically:
  MadingGrid.ReOrder(sortBy = 'isFeatured DESC, publishedAt DESC')
  RETURN RenderInteractiveCard(article)`}
                </pre>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE IPO SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
                <strong>Simulasi Interaktif:</strong> Uji alur algoritma IPO secara langsung dengan memasukkan data artikel uji coba di bawah, lalu klik <em>&quot;Jalankan Pipeline IPO&quot;</em> untuk melihat transformasi data dari input hingga output secara real-time.
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Simulator Inputs */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    1. Input Parameter Pengujian
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Judul Artikel
                    </label>
                    <input
                      type="text"
                      value={simTitle}
                      onChange={(e) => setSimTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Kategori Karya
                    </label>
                    <select
                      value={simCategory}
                      onChange={(e) => setSimCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-hidden"
                    >
                      <option value="Berita Sekolah">Berita Sekolah</option>
                      <option value="Karya Sastra & Puisi">Karya Sastra &amp; Puisi</option>
                      <option value="Cerpen">Cerpen</option>
                      <option value="Opini & Esai">Opini &amp; Esai</option>
                      <option value="Tips Belajar & Sains">Tips Belajar &amp; Sains</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Isi Naskah
                    </label>
                    <textarea
                      rows={3}
                      value={simContent}
                      onChange={(e) => setSimContent(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs outline-hidden resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Peran Penulis
                      </label>
                      <select
                        value={simRole}
                        onChange={(e) => setSimRole(e.target.value as 'siswa' | 'admin')}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-hidden"
                      >
                        <option value="siswa">Siswa (Perlu Moderasi)</option>
                        <option value="admin">Guru Pembina (Auto-Approve)</option>
                      </select>
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={simIsProfane}
                          onChange={(e) => setSimIsProfane(e.target.checked)}
                          className="rounded text-rose-600"
                        />
                        <span className="text-rose-600 font-semibold">Simulasikan Kata Tak Pantas</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={runIPOSimulator}
                    className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-200 transition-all cursor-pointer"
                    id="btn-run-ipo-simulator"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Jalankan Pipeline Algoritma IPO</span>
                  </button>
                </div>

                {/* Simulator Output */}
                <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4" />
                      <span>Hasil Transformasi IPO &amp; Audit Trail</span>
                    </h4>

                    {simOutputState ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                            <span className="text-slate-400 block">Validasi Panjang:</span>
                            <span className={simOutputState.step1Validation ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {simOutputState.step1Validation ? '✅ Lolos Standar' : '❌ Gagal'}
                            </span>
                          </div>

                          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                            <span className="text-slate-400 block">Filter Kesantunan:</span>
                            <span className={simOutputState.step2EthicsCheck ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {simOutputState.step2EthicsCheck ? '✅ Bersih' : '❌ Terdeteksi SARA'}
                            </span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px]">
                          <span className="text-slate-400 block">Keputusan Alur Moderasi:</span>
                          <span className="font-bold text-amber-300">
                            {simOutputState.step3ModerationQueue}
                          </span>
                        </div>

                        <div className="p-3 bg-black/50 rounded-xl max-h-48 overflow-y-auto font-mono text-[10px] text-slate-300 space-y-1">
                          {simOutputState.executionLog.map((log, idx) => (
                            <div key={idx} className="leading-relaxed">
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16 text-slate-500 text-xs">
                        Klik tombol &quot;Jalankan Pipeline Algoritma IPO&quot; untuk memulai simulasi.
                      </div>
                    )}
                  </div>

                  {simOutputState && (
                    <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Status Pipeline: SELESAI (Success)</span>
                      <span className="text-emerald-400 font-bold">Latency: &lt; 5ms</span>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: BLUEPRINT & FITUR UTAMA */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Halaman Utama &amp; Grid Mading</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tampilan feed interaktif modern minimalis dengan kartu karya responsif, headline carousel, pengelompokan rubrik (Puisi, Cerpen, Berita, Opini, Seni, Prestasi), dan indikator waktu baca.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Form Upload Karya Siswa</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formulir lengkap dengan validasi naskah real-time, pilihan ilustrasi cover tematik sekolah, tag kata kunci, pratinjau live sebelum submit, dan antrean kurasi.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Panel Moderasi Guru Pembina</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pusat kendali guru untuk meninjau kiriman naskah, menyetujui, menyematkan sebagai headline sekolah, atau memberikan catatan revisi yang langsung terkirim ke siswa.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    4
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Kolom Komentar &amp; Diskusi</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ruang apresiasi antar siswa di setiap karya, mendukung balasan pesan bertingkat (nested reply), suka komentar, dan sanitasi otomatis.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    5
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Sistem Notifikasi Push Real-Time</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Integrasi Web Push Notification API untuk memberitahu siswa saat karyanya disetujui, ditolak dengan catatan, atau mendapatkan respon dari rekan sekolah.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    6
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Manajemen Profil &amp; Riwayat Karya</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Portofolio literasi digital siswa, memantau status persetujuan, artikel yang disimpan, akumulasi jumlah pembaca, dan lencana apresiasi.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: PEDOMAN DESAIN & WARNA */}
          {activeTab === 'tech_stack' && (
            <div className="space-y-6">
              
              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-base font-bold text-slate-900">
                  Filosofi Desain Modern Minimalis (Biru Muda &amp; Putih)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pemilihan palet warna didasarkan pada psikologi warna dalam ranah edukasi dan literasi sekolah:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-sky-500 text-white space-y-1">
                    <span className="text-xs font-mono font-bold block">Sky Blue (#0284C7)</span>
                    <p className="text-[11px] text-sky-100">
                      Melambangkan inspirasi intelektual, kreativitas tanpa batas, kejernihan pikiran, dan ketenangan.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-100 text-sky-950 border border-sky-200 space-y-1">
                    <span className="text-xs font-mono font-bold block">Soft Blue (#E0F2FE)</span>
                    <p className="text-[11px] text-sky-800">
                      Memberikan nuansa kontras lembut yang nyaman di mata untuk sesi membaca artikel panjang.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white text-slate-900 border border-slate-200 space-y-1">
                    <span className="text-xs font-mono font-bold block">Clean White (#FFFFFF)</span>
                    <p className="text-[11px] text-slate-600">
                      Memberikan ruang bernapas (negative space) yang luas, bersih, dan rapi sesuai prinsip modern.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <p>
                    <strong>Tata Letak Kartu (Card Layout):</strong> Setiap karya dibingkai dalam kartu independen dengan sudut tumpul halus (radius 16px), batas garis tipis berpresisi tinggi, dan efek elevasi bayangan halus saat kursor melayang (hover elevation).
                  </p>
                  <p>
                    <strong>Navigasi Mobile-First:</strong> Menggunakan Bottom Navigation Bar khusus untuk perangkat gawai agar mudah dijangkau dengan satu tangan siswa.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
