import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Article,
  UserProfile,
  PushNotificationItem,
  Comment,
  ArticleCategory,
  ArticleStatus,
  FilterOptions,
} from '../types';
import {
  INITIAL_ARTICLES,
  INITIAL_USERS,
  INITIAL_COMMENTS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';
import confetti from 'canvas-confetti';

interface MadingContextType {
  // State
  currentUser: UserProfile;
  allUsers: UserProfile[];
  articles: Article[];
  comments: Record<string, Comment[]>;
  notifications: PushNotificationItem[];
  filter: FilterOptions;
  selectedArticle: Article | null;
  isUploadModalOpen: boolean;
  isModerationOpen: boolean;
  isProfileOpen: boolean;
  isIPOPlannerOpen: boolean;
  isNotificationDrawerOpen: boolean;
  activeProfileTab: 'all' | 'approved' | 'pending' | 'rejected' | 'bookmarked';
  pushPermissionStatus: NotificationPermission | 'default';

  // Actions
  switchUser: (userId: string) => void;
  updateCurrentUserProfile: (updated: Partial<UserProfile>) => void;
  setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
  setSelectedArticle: (article: Article | null) => void;
  openArticleDetail: (articleId: string) => void;
  setIsUploadModalOpen: (open: boolean) => void;
  setIsModerationOpen: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
  setIsIPOPlannerOpen: (open: boolean) => void;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  setActiveProfileTab: (tab: 'all' | 'approved' | 'pending' | 'rejected' | 'bookmarked') => void;

  // Article Actions
  submitArticle: (articleData: Omit<Article, 'id' | 'createdAt' | 'views' | 'likes' | 'likedBy' | 'bookmarkedBy' | 'slug'>) => { success: boolean; message: string; article?: Article };
  moderateArticle: (articleId: string, status: ArticleStatus, notes?: string, isFeatured?: boolean) => void;
  toggleLikeArticle: (articleId: string) => void;
  toggleBookmarkArticle: (articleId: string) => void;
  deleteArticle: (articleId: string) => void;
  toggleFeatureArticle: (articleId: string) => void;

  // Comment Actions
  addComment: (articleId: string, content: string, replyToId?: string) => void;
  toggleLikeComment: (articleId: string, commentId: string) => void;
  deleteComment: (articleId: string, commentId: string) => void;

  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  requestPushNotificationPermission: () => Promise<boolean>;
  sendPushNotification: (notif: Omit<PushNotificationItem, 'id' | 'createdAt' | 'isRead'>) => void;
  unreadNotificationCount: number;

  // Toast / System helper
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  activeToast: { title: string; message: string; type: 'success' | 'info' | 'warning' | 'error' } | null;
  clearToast: () => void;
}

const MadingContext = createContext<MadingContextType | undefined>(undefined);

export const MadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fallback to initial data
  const [allUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('mading_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('mading_current_user_id') || 'user-1';
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('mading_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [comments, setComments] = useState<Record<string, Comment[]>>(() => {
    const saved = localStorage.getItem('mading_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [notifications, setNotifications] = useState<PushNotificationItem[]>(() => {
    const saved = localStorage.getItem('mading_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // UI Modal / View states
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isModerationOpen, setIsModerationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isIPOPlannerOpen, setIsIPOPlannerOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'all' | 'approved' | 'pending' | 'rejected' | 'bookmarked'>('all');

  const [pushPermissionStatus, setPushPermissionStatus] = useState<NotificationPermission | 'default'>('default');

  const [activeToast, setActiveToast] = useState<{
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  } | null>(null);

  // Filters
  const [filter, setFilter] = useState<FilterOptions>({
    searchQuery: '',
    category: 'Semua Kategori',
    author: 'Semua Penulis',
    sortBy: 'terbaru',
  });

  // Current active user object
  const currentUser = allUsers.find((u) => u.id === currentUserId) || allUsers[0];

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('mading_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('mading_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('mading_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('mading_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    if ('Notification' in window) {
      setPushPermissionStatus(Notification.permission);
    }
  }, []);

  const showToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setActiveToast({ title, message, type });
    // auto clear after 5s
    setTimeout(() => {
      setActiveToast((prev) => (prev?.title === title ? null : prev));
    }, 5000);
  }, []);

  const clearToast = useCallback(() => {
    setActiveToast(null);
  }, []);

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
    const target = allUsers.find((u) => u.id === userId);
    if (target) {
      showToast('Beralih Pengguna', `Sekarang Anda masuk sebagai ${target.name} (${target.role === 'admin' ? 'Admin / Guru Pembina' : 'Siswa'})`, 'info');
    }
  };

  const updateCurrentUserProfile = (updated: Partial<UserProfile>) => {
    // update current user in allUsers
    const updatedUsers = allUsers.map((u) => (u.id === currentUser.id ? { ...u, ...updated } : u));
    localStorage.setItem('mading_users', JSON.stringify(updatedUsers));
    showToast('Profil Diperbarui', 'Data profil Anda berhasil disimpan.', 'success');
  };

  const requestPushNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      showToast('Notifikasi Web', 'Browser Anda belum mendukung Web Notification API, notifikasi akan tampil di dalam aplikasi.', 'warning');
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      setPushPermissionStatus(permission);
      if (permission === 'granted') {
        showToast('Izin Notifikasi Aktif', 'Anda akan menerima pemberitahuan langsung saat karya Anda disetujui atau dikomentari!', 'success');
        return true;
      } else {
        showToast('Izin Ditolak', 'Notifikasi push dinonaktifkan di peramban.', 'warning');
        return false;
      }
    } catch {
      return false;
    }
  };

  const sendPushNotification = useCallback((notifData: Omit<PushNotificationItem, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotif: PushNotificationItem = {
      ...notifData,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // If browser supports web push and user permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notifData.title, {
          body: notifData.message,
          icon: '/favicon.ico',
        });
      } catch (err) {
        console.warn('Native notification trigger failed:', err);
      }
    }

    // Always show in-app toast notification
    showToast(notifData.title, notifData.message, notifData.type === 'article_approved' ? 'success' : notifData.type === 'article_rejected' ? 'warning' : 'info');
  }, [showToast]);

  const submitArticle = (articleData: Omit<Article, 'id' | 'createdAt' | 'views' | 'likes' | 'likedBy' | 'bookmarkedBy' | 'slug'>) => {
    // IPO Process 1: Validation
    if (!articleData.title || articleData.title.trim().length < 5) {
      return { success: false, message: 'Judul artikel minimal 5 karakter.' };
    }
    if (!articleData.content || articleData.content.trim().length < 20) {
      return { success: false, message: 'Isi artikel minimal 20 karakter agar layak dibaca.' };
    }

    // Create unique slug & ID
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newArticle: Article = {
      ...articleData,
      id: `art-${Date.now()}`,
      slug: `${slug}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      views: 1,
      likes: 0,
      likedBy: [],
      bookmarkedBy: [],
      readingTimeMinutes: Math.max(1, Math.ceil(articleData.content.split(/\s+/).length / 150)),
      status: currentUser.role === 'admin' ? 'approved' : 'pending', // Admin posts auto-approved, students go to moderation
      publishedAt: currentUser.role === 'admin' ? new Date().toISOString() : undefined,
    };

    setArticles((prev) => [newArticle, ...prev]);

    // Send notification to admin if student submitted
    if (currentUser.role === 'siswa') {
      const adminUsers = allUsers.filter((u) => u.role === 'admin');
      adminUsers.forEach((admin) => {
        sendPushNotification({
          userId: admin.id,
          type: 'article_submitted',
          title: 'Karya Baru Masuk Moderasi 📥',
          message: `${currentUser.name} (${currentUser.gradeClass || 'Siswa'}) baru saja mengirimkan karya "${newArticle.title}" untuk ditinjau.`,
          articleId: newArticle.id,
        });
      });
      showToast('Karya Terkirim!', 'Karya Anda telah masuk antrean moderasi guru pembina. Notifikasi akan dikirim setelah disetujui.', 'success');
    } else {
      showToast('Karya Diterbitkan!', 'Artikel langsung diterbitkan ke Mading Digital.', 'success');
    }

    return { success: true, message: 'Karya berhasil disimpan.', article: newArticle };
  };

  const moderateArticle = (articleId: string, status: ArticleStatus, notes?: string, isFeatured?: boolean) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id !== articleId) return art;
        const isNowApproved = status === 'approved';
        return {
          ...art,
          status,
          moderationNotes: notes || art.moderationNotes,
          moderatedBy: currentUser.name,
          moderatedAt: new Date().toISOString(),
          publishedAt: isNowApproved ? (art.publishedAt || new Date().toISOString()) : art.publishedAt,
          isFeatured: isFeatured !== undefined ? isFeatured : art.isFeatured,
        };
      })
    );

    const targetArticle = articles.find((a) => a.id === articleId);
    if (!targetArticle) return;

    // Send push notification to the author
    if (status === 'approved') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      sendPushNotification({
        userId: targetArticle.authorId,
        type: 'article_approved',
        title: 'Karya Anda Disetujui! 🎉',
        message: `Selamat! Karya "${targetArticle.title}" telah disetujui oleh ${currentUser.name} dan kini tampil di Mading Digital.`,
        articleId: targetArticle.id,
      });
    } else if (status === 'rejected') {
      sendPushNotification({
        userId: targetArticle.authorId,
        type: 'article_rejected',
        title: 'Catatan Moderasi Karya 📝',
        message: `Karya "${targetArticle.title}" memerlukan revisi: "${notes || 'Silakan perbaiki format atau konten tulisan.'}"`,
        articleId: targetArticle.id,
      });
    }

    showToast(
      'Status Moderasi Diperbarui',
      `Karya "${targetArticle.title}" berhasil diubah menjadi: ${status.toUpperCase()}`,
      status === 'approved' ? 'success' : 'info'
    );
  };

  const toggleLikeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id !== articleId) return art;
        const alreadyLiked = art.likedBy.includes(currentUser.id);
        const updatedLikedBy = alreadyLiked
          ? art.likedBy.filter((id) => id !== currentUser.id)
          : [...art.likedBy, currentUser.id];
        return {
          ...art,
          likes: updatedLikedBy.length,
          likedBy: updatedLikedBy,
        };
      })
    );
  };

  const toggleBookmarkArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id !== articleId) return art;
        const alreadyBookmarked = art.bookmarkedBy?.includes(currentUser.id);
        const updatedBookmarkedBy = alreadyBookmarked
          ? art.bookmarkedBy.filter((id) => id !== currentUser.id)
          : [...(art.bookmarkedBy || []), currentUser.id];
        return {
          ...art,
          bookmarkedBy: updatedBookmarkedBy,
        };
      })
    );
    const target = articles.find((a) => a.id === articleId);
    const isBookmarked = target?.bookmarkedBy?.includes(currentUser.id);
    showToast(
      isBookmarked ? 'Dihapus dari Bookmark' : 'Disimpan ke Bookmark',
      isBookmarked ? 'Artikel dihapus dari koleksi tersimpan.' : 'Artikel dapat dilihat di halaman profil Anda.',
      'info'
    );
  };

  const toggleFeatureArticle = (articleId: string) => {
    if (currentUser.role !== 'admin') {
      showToast('Akses Ditolak', 'Hanya admin/pembina yang dapat menetapkan Headline Mading.', 'error');
      return;
    }
    setArticles((prev) =>
      prev.map((art) => (art.id === articleId ? { ...art, isFeatured: !art.isFeatured } : art))
    );
  };

  const deleteArticle = (articleId: string) => {
    const target = articles.find((a) => a.id === articleId);
    if (!target) return;
    if (target.authorId !== currentUser.id && currentUser.role !== 'admin') {
      showToast('Gagal Menghapus', 'Anda tidak memiliki izin menghapus karya ini.', 'error');
      return;
    }
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
    showToast('Karya Dihapus', `Artikel "${target.title}" telah dihapus.`, 'info');
    if (selectedArticleId === articleId) {
      setSelectedArticleId(null);
    }
  };

  const addComment = (articleId: string, content: string, replyToId?: string) => {
    if (!content.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      articleId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorClass: currentUser.gradeClass,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      replyToId,
      replies: [],
    };

    setComments((prev) => {
      const currentList = prev[articleId] || [];
      if (replyToId) {
        // Nest in the parent comment
        const updated = currentList.map((c) => {
          if (c.id === replyToId) {
            return {
              ...c,
              replies: [...(c.replies || []), newComment],
            };
          }
          return c;
        });
        return { ...prev, [articleId]: updated };
      } else {
        return { ...prev, [articleId]: [newComment, ...currentList] };
      }
    });

    // Notify the article author if commented by someone else
    const targetArticle = articles.find((a) => a.id === articleId);
    if (targetArticle && targetArticle.authorId !== currentUser.id) {
      sendPushNotification({
        userId: targetArticle.authorId,
        type: 'new_comment',
        title: 'Komentar Baru di Karya Anda 💬',
        message: `${currentUser.name} berkomentar: "${content.slice(0, 60)}${content.length > 60 ? '...' : ''}"`,
        articleId: targetArticle.id,
      });
    }

    showToast('Komentar Terkirim', 'Tanggapan Anda berhasil ditambahkan.', 'success');
  };

  const toggleLikeComment = (articleId: string, commentId: string) => {
    setComments((prev) => {
      const list = prev[articleId] || [];
      const updateListRecursive = (items: Comment[]): Comment[] => {
        return items.map((item) => {
          if (item.id === commentId) {
            const hasLiked = item.likedBy.includes(currentUser.id);
            const newLikedBy = hasLiked
              ? item.likedBy.filter((id) => id !== currentUser.id)
              : [...item.likedBy, currentUser.id];
            return {
              ...item,
              likes: newLikedBy.length,
              likedBy: newLikedBy,
            };
          }
          if (item.replies && item.replies.length > 0) {
            return {
              ...item,
              replies: updateListRecursive(item.replies),
            };
          }
          return item;
        });
      };

      return {
        ...prev,
        [articleId]: updateListRecursive(list),
      };
    });
  };

  const deleteComment = (articleId: string, commentId: string) => {
    setComments((prev) => {
      const list = prev[articleId] || [];
      const filterRecursive = (items: Comment[]): Comment[] => {
        return items
          .filter((item) => item.id !== commentId)
          .map((item) => {
            if (item.replies) {
              return { ...item, replies: filterRecursive(item.replies) };
            }
            return item;
          });
      };
      return {
        ...prev,
        [articleId]: filterRecursive(list),
      };
    });
    showToast('Komentar Dihapus', 'Komentar telah dihapus.', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('Notifikasi Ditandai', 'Semua notifikasi telah ditandai sebagai dibaca.', 'info');
  };

  const openArticleDetail = (articleId: string) => {
    // increment views
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, views: (a.views || 0) + 1 } : a))
    );
    setSelectedArticleId(articleId);
  };

  const selectedArticle = articles.find((a) => a.id === selectedArticleId) || null;

  // unread notification count for current user
  const unreadNotificationCount = notifications.filter(
    (n) => n.userId === currentUser.id && !n.isRead
  ).length;

  return (
    <MadingContext.Provider
      value={{
        currentUser,
        allUsers,
        articles,
        comments,
        notifications,
        filter,
        selectedArticle,
        isUploadModalOpen,
        isModerationOpen,
        isProfileOpen,
        isIPOPlannerOpen,
        isNotificationDrawerOpen,
        activeProfileTab,
        pushPermissionStatus,
        switchUser,
        updateCurrentUserProfile,
        setFilter,
        setSelectedArticle: (art) => setSelectedArticleId(art ? art.id : null),
        openArticleDetail,
        setIsUploadModalOpen,
        setIsModerationOpen,
        setIsProfileOpen,
        setIsIPOPlannerOpen,
        setIsNotificationDrawerOpen,
        setActiveProfileTab,
        submitArticle,
        moderateArticle,
        toggleLikeArticle,
        toggleBookmarkArticle,
        deleteArticle,
        toggleFeatureArticle,
        addComment,
        toggleLikeComment,
        deleteComment,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        requestPushNotificationPermission,
        sendPushNotification,
        unreadNotificationCount,
        showToast,
        activeToast,
        clearToast,
      }}
    >
      {children}
    </MadingContext.Provider>
  );
};

export const useMading = () => {
  const context = useContext(MadingContext);
  if (!context) {
    throw new Error('useMading must be used within a MadingProvider');
  }
  return context;
};
