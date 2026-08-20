import { Article, UserProfile, PushNotificationItem } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Rafi Pratama',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    email: 'rafi.pratama@siswa.sman1.sch.id',
    gradeClass: 'XI MIPA 2',
    bio: 'Pecinta sastra Indonesia, fotografi jalanan, dan jurnalisme sekolah. Senang menuangkan ide lewat tulisan cerpen dan opini kritis.',
    joinedDate: '2025-07-15',
    socialLink: '@rafipratama_',
    badges: ['Penulis Produktif 🏆', 'Pilihan Redaksi 🌟', 'Kutu Buku 📚'],
  },
  {
    id: 'user-admin',
    name: 'Ibu Rahayu, M.Pd.',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'rahayu.mpd@sman1.sch.id',
    gradeClass: 'Pembina Ekstrakurikuler Jurnalistik & Mading',
    bio: 'Guru Bahasa & Sastra Indonesia serta Pembina Mading Digital SMAN 1 Nusantara. Berkomitmen mendampingi literasi digital siswa.',
    joinedDate: '2024-01-10',
    badges: ['Pembina Utama 🛡️', 'Editor In Chief 🖋️'],
  },
  {
    id: 'user-2',
    name: 'Alya Maharani',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    email: 'alya.m@siswa.sman1.sch.id',
    gradeClass: 'X IPS 1',
    bio: 'Desainer grafis pemula, penyuka puisi melankolis & komik digital. Anggota aktif klub seni rupa sekolah.',
    joinedDate: '2025-08-01',
    socialLink: '@alya.artcraft',
    badges: ['Seniman Muda 🎨', 'Puisi Terbaik ✍️'],
  },
  {
    id: 'user-3',
    name: 'Dimas Satria',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'dimas.satria@siswa.sman1.sch.id',
    gradeClass: 'XII MIPA 1',
    bio: 'Ketua Tim Robotika SMAN 1. Antusias dalam riset kecerdasan buatan, IoT, dan teknologi ramah lingkungan.',
    joinedDate: '2024-07-20',
    badges: ['Juara Olimpiade 🥇', 'Tech Pioneer 🤖'],
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Gema Pentas Seni 2026: Merajut Harmoni Tradisi & Modernitas di Panggung Sekolah',
    slug: 'gema-pentas-seni-2026-merajut-harmoni',
    category: 'Berita Sekolah',
    summary: 'Liputan eksklusif kemeriahan perayaan Pensi tahunan SMAN 1 Nusantara yang menampilkan kolaborasi tari saman kontemporer dan orkestra siswa.',
    content: `Kemeriahan luar biasa menyelimuti aula serbaguna SMAN 1 Nusantara pada perhelatan Pentas Seni (Pensi) Tahunan 2026 bertajuk "Nusantara Bersuara". Acara yang dihelat selama dua hari penuh ini berhasil menyedot antusiasme ratusan siswa, alumni, dan para guru.

Pentas dibuka dengan penampilan kolosal Tari Saman yang dipadukan dengan iringan aransemen musik orkestra modern dari ekstrakurikuler musik. Harmonisasi ketukan rebana dengan melodi biola berhasil membuat seluruh audiens terpukau dan memberikan standing ovation berkepanjangan.

"Kami ingin menunjukkan bahwa generasi muda tidak melupakan akar budaya nusantara meski di era gempuran musik global. Kreativitas siswa adalah bukti nyata cinta tanah air," ungkap Ibu Rahayu, M.Pd. selaku pembina kegiatan.

Selain panggung musik dan seni peran, koridor sekolah disulap menjadi galeri pameran karya seni rupa, foto jurnalistik, serta instalasi ramah lingkungan dari daur ulang limbah plastik. Kegiatan ini ditutup dengan pengumuman pemenang apresiasi karya terbaik siswa.`,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    authorId: 'user-1',
    authorName: 'Rafi Pratama',
    authorClass: 'XI MIPA 2',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'approved',
    createdAt: '2026-08-18T09:30:00Z',
    publishedAt: '2026-08-18T10:15:00Z',
    moderatedBy: 'Ibu Rahayu, M.Pd.',
    moderatedAt: '2026-08-18T10:15:00Z',
    moderationNotes: 'Tulisan jurnalistik yang sangat runtut, diksi padat, dan dokumentasi visual sangat mendukung. Siap dipublikasikan sebagai headline mading.',
    isFeatured: true,
    views: 428,
    likes: 64,
    likedBy: ['user-2', 'user-3'],
    bookmarkedBy: ['user-2'],
    tags: ['Pensi2026', 'SeniBudaya', 'EventSekolah', 'LiputanJurnalistik'],
    readingTimeMinutes: 3,
  },
  {
    id: 'art-2',
    title: 'Sebuah Sajak di Sudut Perpustakaan: Menanti Hujan dan Aroma Kertas Usang',
    slug: 'sebuah-sajak-di-sudut-perpustakaan',
    category: 'Karya Sastra & Puisi',
    summary: 'Kumpulan bait puisi tentang hangatnya ruang sunyi perpustakaan di kala rintik hujan menderu jendela kelas.',
    content: `Di balik rak-rak berdebu kayu jati,
Ada ribuan semesta yang menunggu dijelajahi.
Hujan menari lembut di kaca jendela,
Menghapus riuh tawa lorong yang fana.

Kertas-kertas menguning membisikkan cerita,
Tentang masa lalu yang tak pernah menua.
Di sudut ini, waktu sejenak berhenti,
Menyisakan aku, segelas teh hangat, dan sejumput mimpi.

Bukan tentang seberapa cepat kita berlari mengejar dunia,
Melainkan seberapa dalam kita menemukan makna di setiap kata.
Perpustakaan ini bukan sekadar dinding bata,
Ia adalah rumah bagi jiwa-jiwa pengembara aksara.`,
    coverImage: 'https://images.unsplash.com/photo-1507842229456-836798038597?w=1200&auto=format&fit=crop&q=80',
    authorId: 'user-2',
    authorName: 'Alya Maharani',
    authorClass: 'X IPS 1',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'approved',
    createdAt: '2026-08-17T14:10:00Z',
    publishedAt: '2026-08-17T15:00:00Z',
    moderatedBy: 'Ibu Rahayu, M.Pd.',
    moderatedAt: '2026-08-17T15:00:00Z',
    moderationNotes: 'Rima dan pilihan kata sangat puitis dan menyentuh. Layak dipajang di rubrik sastra mading edisi Agustus!',
    isFeatured: false,
    views: 295,
    likes: 47,
    likedBy: ['user-1'],
    bookmarkedBy: ['user-1'],
    tags: ['Puisi', 'Sastra', 'Perpustakaan', 'Refleksi'],
    readingTimeMinutes: 2,
  },
  {
    id: 'art-3',
    title: 'Inovasi Robot Pemilah Sampah Cerdas: Karya Tim Robotika SMAN 1 Raih Emas Nasional',
    slug: 'inovasi-robot-pemilah-sampah-cerdas',
    category: 'Prestasi & Inspirasi',
    summary: 'Bagaimana riset berbulan-bulan di lab fisika membuahkan prototipe pemilah sampah berbasis sensor optik dan machine learning.',
    content: `Prestasi membanggakan kembali diukir oleh siswa-siswi SMAN 1 Nusantara pada ajang National Young Innovator Award 2026. Tim robotika sekolah yang dipimpin oleh Dimas Satria berhasil menyabet Medali Emas berkat karya inovatif bernama "EcoSort-V1".

Robot ini dirancang khusus untuk memecahkan masalah pemilahan sampah di kantin sekolah. Menggunakan kombinasi sensor kedekatan induktif, sensor optik warna, dan algoritma AI pengenal objek mini berbasis Raspberry Pi, EcoSort-V1 mampu mengidentifikasi apakah sampah berupa plastik, kaleng, atau sisa organik dalam waktu kurang dari 1,5 detik.

"Tantangan terbesar kami adalah melatih dataset gambar sampah makanan yang sering basah dan berubah bentuk. Namun berkat bimbingan bapak guru pembina dan kerja lembur tim, kami berhasil mencapai akurasi deteksi hingga 94,8%," terang Dimas.

Rencananya, pihak sekolah akan memproduksi 3 unit prototipe lanjutan untuk dipasang secara resmi di area kantin utama dan lobi sekolah sebagai percontohan Green School.`,
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
    authorId: 'user-3',
    authorName: 'Dimas Satria',
    authorClass: 'XII MIPA 1',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'approved',
    createdAt: '2026-08-16T11:00:00Z',
    publishedAt: '2026-08-16T12:00:00Z',
    moderatedBy: 'Ibu Rahayu, M.Pd.',
    moderatedAt: '2026-08-16T12:00:00Z',
    moderationNotes: 'Sangat inspiratif! Memberikan motivasi tinggi bagi adik-adik kelas untuk aktif berinovasi di bidang STEAM.',
    isFeatured: true,
    views: 612,
    likes: 89,
    likedBy: ['user-1', 'user-2'],
    bookmarkedBy: ['user-1', 'user-2'],
    tags: ['Robotika', 'Inovasi', 'Teknologi', 'PrestasiSiswa', 'GreenSchool'],
    readingTimeMinutes: 4,
  },
  {
    id: 'art-4',
    title: 'Manajemen Waktu Efektif: Trik Pomodoro & Teknik Feynman untuk Persiapan Ujian Akhir',
    slug: 'manajemen-waktu-efektif-trik-pomodoro',
    category: 'Tips Belajar & Sains',
    summary: 'Panduan praktis mengatasi prokrastinasi dan menjaga konsentrasi belajar tanpa merasa lelah berlebih.',
    content: `Pernahkah kalian merasa sudah duduk di depan meja belajar selama berjam-jam tetapi tidak ada satu pun materi yang benar-benar menempel di kepala? Jangan khawatir, kalian tidak sendirian. Fenomena kelelahan belajar ini sering kali disebabkan oleh strategi belajar yang kurang terstruktur.

Berikut adalah dua kombinasi metode belajar yang telah teruji secara psikologi kognitif:

1. Metode Pomodoro Terfokus (25/5):
Atur timer selama 25 menit untuk belajar materi spesifik tanpa ada gangguan gadget sama sekali. Setelah 25 menit berbunyi, ambil jeda istirahat tepat 5 menit untuk relaksasi mata. Setelah 4 siklus, ambil istirahat panjang 15-20 menit.

2. Teknik Feynman (Jelaskan pada Anak Kecil):
Setelah membaca suatu konsep yang rumit, cobalah tuliskan kembali penjelasan konsep tersebut dengan bahasa sehari-hari yang sangat sederhana seolah kalian sedang mengajar adik kelas. Jika ada bagian yang kalian jelaskan secara berbelit-belit, di situlah letak kekurangan pemahaman kalian yang perlu diulang.

Cobalah terapkan kombinasi ini mulai hari ini, dan rasakan peningkatan produktivitas kalian menjelang ujian!`,
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    authorId: 'user-1',
    authorName: 'Rafi Pratama',
    authorClass: 'XI MIPA 2',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'approved',
    createdAt: '2026-08-15T08:00:00Z',
    publishedAt: '2026-08-15T09:00:00Z',
    moderatedBy: 'Ibu Rahayu, M.Pd.',
    moderatedAt: '2026-08-15T09:00:00Z',
    moderationNotes: 'Materi tips yang sangat aplikatif dan bermanfaat untuk seluruh siswa.',
    isFeatured: false,
    views: 380,
    likes: 52,
    likedBy: ['user-3'],
    bookmarkedBy: ['user-3'],
    tags: ['TipsBelajar', 'Produktivitas', 'StudyGram', 'Edukasi'],
    readingTimeMinutes: 3,
  },
  {
    id: 'art-5',
    title: 'Surat dari Masa Depan untuk Bumi Kita yang Sedang Menghangat',
    slug: 'surat-dari-masa-depan-untuk-bumi',
    category: 'Opini & Esai',
    summary: 'Opini mendalam mengenai krisis iklim dan pentingnya aksi nyata lingkungan dimulai dari koridor dan kantin sekolah.',
    content: `Jika bumi bisa menulis sepucuk surat untuk manusia, mungkin ia tidak akan meminta gedung pencakar langit yang megah atau teknologi supercanggih. Bumi hanya akan meminta waktu untuk bernapas.

Sebagai generasi muda pelajar, kita sering menganggap perubahan iklim adalah bahasan para diplomat di forum internasional. Padahal, jejak karbon harian kita dari plastik sekali pakai, sisa makanan yang terbuang, hingga pemborosan listrik di ruang kelas adalah kontributor nyata.

Program 'Zero Waste School' yang dicanangkan OSIS adalah langkah awal yang nyata. Mari kita buktikan bahwa kepedulian lingkungan bukan sekadar slogan di spanduk, tapi kebiasaan sehari-hari yang kita banggakan.`,
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80',
    authorId: 'user-2',
    authorName: 'Alya Maharani',
    authorClass: 'X IPS 1',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'pending',
    createdAt: '2026-08-19T13:20:00Z',
    views: 45,
    likes: 0,
    likedBy: [],
    bookmarkedBy: [],
    tags: ['LingkunganHidup', 'OpiniSiswa', 'SaveEarth', 'Esai'],
    readingTimeMinutes: 3,
  },
  {
    id: 'art-6',
    title: 'Kumpulan Ilustrasi Digital Karakter Cerita Rakyat Nusantara: Sangkuriang & Roro Jonggrang',
    slug: 'kumpulan-ilustrasi-digital-karakter-cerita-rakyat',
    category: 'Karya Seni & Desain',
    summary: 'Karya visual eksperimental menggabungkan teknik modern vector pop-art dengan ornamen batik klasik pesisir.',
    content: `Melalui proyek mandiri ini, saya ingin menghidupkan kembali pesona karakter legenda nusantara dengan sentuhan visual modern ala concept art animasi kontemporer.

Setiap ilustrasi membutuhkan waktu 8-12 jam pengerjaan menggunakan software ilustrasi open-source. Palet warna didominasi oleh perpaduan biru nila, emas tembaga, dan putih salju untuk melambangkan nuansa mistis sekaligus anggun.

Karya ini diharapkan dapat menarik minat generasi gen-Z untuk lebih mengenal kekayaan dongeng dan mitologi nusantara.`,
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    authorId: 'user-2',
    authorName: 'Alya Maharani',
    authorClass: 'X IPS 1',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'approved',
    createdAt: '2026-08-14T10:00:00Z',
    publishedAt: '2026-08-14T11:00:00Z',
    moderatedBy: 'Ibu Rahayu, M.Pd.',
    moderatedAt: '2026-08-14T11:00:00Z',
    moderationNotes: 'Eksplorasi visual yang luar biasa menakjubkan! Desain karakter sangat berkarakter.',
    isFeatured: true,
    views: 520,
    likes: 78,
    likedBy: ['user-1', 'user-3'],
    bookmarkedBy: ['user-1'],
    tags: ['DigitalArt', 'DesainGrafis', 'CeritaRakyat', 'KaryaSeni'],
    readingTimeMinutes: 2,
  },
  {
    id: 'art-7',
    title: 'Langkah Awal Membangun Mindset Juara: Catatan Harian Ekstrakurikuler Debat Bahasa Inggris',
    slug: 'langkah-awal-membangun-mindset-juara-debat',
    category: 'Prestasi & Inspirasi',
    summary: 'Pengalaman jatuh bangun melewati babak penyisihan hingga meraih Juara 2 tingkat Provinsi.',
    content: `Debat bukan sekadar kemampuan berbicara lantang di hadapan juri, melainkan seni menyusun argumen logis, data empiris, dan kemampuan empati memahami perspektif lawan bicara.

Dalam esai reflektif ini, saya membagikan catatan penting tentang bagaimana menyusun motion analysis, membiasakan diri membaca jurnal berita internasional setiap pagi, dan mengendalikan rasa gugup saat berada di podium.`,
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
    authorId: 'user-1',
    authorName: 'Rafi Pratama',
    authorClass: 'XI MIPA 2',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'pending',
    createdAt: '2026-08-20T02:00:00Z',
    views: 12,
    likes: 0,
    likedBy: [],
    bookmarkedBy: [],
    tags: ['Debat', 'Inspirasi', 'PublicSpeaking', 'CatatanSiswa'],
    readingTimeMinutes: 3,
  },
];

export const INITIAL_COMMENTS: Record<string, import('../types').Comment[]> = {
  'art-1': [
    {
      id: 'c-1',
      articleId: 'art-1',
      authorId: 'user-2',
      authorName: 'Alya Maharani',
      authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      authorClass: 'X IPS 1',
      content: 'Keren banget liputannya kak Rafi! Tari Saman kemarin bener-bener bikin merinding satu aula 😍',
      createdAt: '2026-08-18T11:20:00Z',
      likes: 8,
      likedBy: ['user-1'],
      replies: [
        {
          id: 'c-1-1',
          articleId: 'art-1',
          authorId: 'user-1',
          authorName: 'Rafi Pratama',
          authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          authorClass: 'XI MIPA 2',
          content: 'Terima kasih Alya! Nanti di edisi berikutnya jangan lupa kirim foto karya instalasi senimu ya!',
          createdAt: '2026-08-18T11:45:00Z',
          likes: 3,
          likedBy: ['user-2'],
          replyToId: 'c-1',
        },
      ],
    },
    {
      id: 'c-2',
      articleId: 'art-1',
      authorId: 'user-3',
      authorName: 'Dimas Satria',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      authorClass: 'XII MIPA 1',
      content: 'Dokumentasi fotonya tajam dan estetik. Bangga jadi bagian dari SMAN 1 Nusantara!',
      createdAt: '2026-08-18T13:00:00Z',
      likes: 5,
      likedBy: [],
    },
  ],
  'art-3': [
    {
      id: 'c-3',
      articleId: 'art-3',
      authorId: 'user-1',
      authorName: 'Rafi Pratama',
      authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      authorClass: 'XI MIPA 2',
      content: 'Selamat buat bang Dimas dan tim robotika! Bangga banget bisa liat prototipe ini langsung beraksi di lab.',
      createdAt: '2026-08-16T14:30:00Z',
      likes: 12,
      likedBy: ['user-3', 'user-2'],
    },
  ],
};

export const INITIAL_NOTIFICATIONS: PushNotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'article_approved',
    title: 'Karya Anda Telah Diterbitkan! 🎉',
    message: 'Artikel "Gema Pentas Seni 2026: Merajut Harmoni Tradisi & Modernitas" telah disetujui oleh Ibu Rahayu, M.Pd. dan kini tayang sebagai Headline Mading.',
    articleId: 'art-1',
    createdAt: '2026-08-18T10:15:00Z',
    isRead: false,
  },
  {
    id: 'notif-2',
    userId: 'user-2',
    type: 'article_approved',
    title: 'Puisi Anda Disetujui ✍️',
    message: 'Karya sastra "Sebuah Sajak di Sudut Perpustakaan" telah diterbitkan di Mading Digital.',
    articleId: 'art-2',
    createdAt: '2026-08-17T15:00:00Z',
    isRead: true,
  },
  {
    id: 'notif-3',
    userId: 'user-3',
    type: 'featured_badge',
    title: 'Artikel Pilihan Redaksi 🌟',
    message: 'Artikel robotika Anda terpilih sebagai Inspirasi Terbaik Edisi Agustus!',
    articleId: 'art-3',
    createdAt: '2026-08-16T12:00:00Z',
    isRead: true,
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'new_comment',
    title: 'Komentar Baru 💬',
    message: 'Alya Maharani mengomentari artikel "Gema Pentas Seni 2026".',
    articleId: 'art-1',
    createdAt: '2026-08-18T11:20:00Z',
    isRead: false,
  },
];

export const CATEGORIES_LIST: { name: import('../types').ArticleCategory; iconName: string; description: string; color: string }[] = [
  {
    name: 'Berita Sekolah',
    iconName: 'Newspaper',
    description: 'Liputan kegiatan, pengumuman resmi, dan agenda sekolah',
    color: 'bg-sky-500 text-white',
  },
  {
    name: 'Karya Sastra & Puisi',
    iconName: 'Feather',
    description: 'Untaian sajak, bait puisi, dan renungan indah siswa',
    color: 'bg-indigo-500 text-white',
  },
  {
    name: 'Cerpen',
    iconName: 'BookOpen',
    description: 'Cerita pendek fiksi, drama, dan petualangan inspiratif',
    color: 'bg-teal-500 text-white',
  },
  {
    name: 'Opini & Esai',
    iconName: 'MessageSquareQuote',
    description: 'Gagasan kritis, analisis sosial, dan pandangan siswa',
    color: 'bg-amber-500 text-white',
  },
  {
    name: 'Karya Seni & Desain',
    iconName: 'Palette',
    description: 'Galeri ilustrasi, komik strip, fotografi, dan poster digital',
    color: 'bg-pink-500 text-white',
  },
  {
    name: 'Prestasi & Inspirasi',
    iconName: 'Award',
    description: 'Kisah sukses juara lomba, olimpiade, dan tokoh inspiratif',
    color: 'bg-emerald-500 text-white',
  },
  {
    name: 'Tips Belajar & Sains',
    iconName: 'Lightbulb',
    description: 'Trik belajar efektif, fakta sains, dan eksplorasi teknologi',
    color: 'bg-blue-600 text-white',
  },
];

export const IMAGE_PRESETS = [
  {
    label: 'Pentas Seni & Musik',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'Perpustakaan & Buku',
    url: 'https://images.unsplash.com/photo-1507842229456-836798038597?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'Robotika & Sains',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'Belajar & Catatan',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'Lingkungan & Alam',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'Karya Seni Digital',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'Olahraga & Sportivitas',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'Lab Komputer & Coding',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
  },
];
