export type UserRole = 'siswa' | 'admin' | 'guru_pembina';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
  gradeClass?: string; // e.g. "XI MIPA 2"
  bio?: string;
  joinedDate: string;
  socialLink?: string;
  badges?: string[];
}

export type ArticleCategory =
  | 'Berita Sekolah'
  | 'Karya Sastra & Puisi'
  | 'Cerpen'
  | 'Opini & Esai'
  | 'Karya Seni & Desain'
  | 'Prestasi & Inspirasi'
  | 'Tips Belajar & Sains';

export type ArticleStatus = 'pending' | 'approved' | 'rejected' | 'draft';

export interface Comment {
  id: string;
  articleId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorClass?: string;
  content: string;
  createdAt: string;
  likes: number;
  likedBy: string[]; // user IDs
  replyToId?: string; // for nested comments
  replies?: Comment[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  coverImage: string;
  authorId: string;
  authorName: string;
  authorClass: string;
  authorAvatar: string;
  status: ArticleStatus;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  moderationNotes?: string;
  moderatedBy?: string;
  moderatedAt?: string;
  isFeatured?: boolean;
  views: number;
  likes: number;
  likedBy: string[];
  bookmarkedBy: string[];
  tags: string[];
  readingTimeMinutes: number;
}

export type NotificationType =
  | 'article_approved'
  | 'article_rejected'
  | 'new_comment'
  | 'article_submitted'
  | 'featured_badge'
  | 'general';

export interface PushNotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  articleId?: string;
  createdAt: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  author: string;
  sortBy: 'terbaru' | 'terpopuler' | 'pilihan_redaksi' | 'terlama';
  status?: ArticleStatus | 'all';
}

export interface IPOStepInfo {
  phase: 'Input' | 'Process' | 'Output';
  title: string;
  description: string;
  technicalDetails: string[];
  exampleData: Record<string, unknown>;
}
