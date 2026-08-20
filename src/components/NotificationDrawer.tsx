import React from 'react';
import { useMading } from '../context/MadingContext';
import {
  X,
  Bell,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Award,
  CheckCheck,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    currentUser,
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    openArticleDetail,
    requestPushNotificationPermission,
    pushPermissionStatus,
  } = useMading();

  if (!isNotificationDrawerOpen) return null;

  const userNotifs = notifications.filter((n) => n.userId === currentUser.id);

  const getIcon = (type: string) => {
    switch (type) {
      case 'article_approved':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'article_rejected':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case 'new_comment':
        return <MessageSquare className="w-4 h-4 text-sky-600" />;
      case 'featured_badge':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'article_submitted':
        return <ShieldCheck className="w-4 h-4 text-indigo-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn"
      id="notification-drawer-overlay"
      onClick={() => setIsNotificationDrawerOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative border-l border-slate-100"
        onClick={(e) => e.stopPropagation()}
        id="notification-drawer-container"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-blue-100 flex items-center justify-between bg-blue-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center border border-blue-200">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Pusat Pemberitahuan &amp; Push
              </h3>
              <p className="text-[11px] text-slate-500">
                Notifikasi otomatis persetujuan karya &amp; komentar
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            id="btn-close-notification-drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Web Push API Permission Banner */}
        <div className="p-4 bg-linear-to-r from-blue-50 to-slate-50 border-b border-blue-100">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-bold text-blue-950 block">Status Push Notifikasi Web:</span>
              <span className="text-slate-600 text-[11px]">
                {pushPermissionStatus === 'granted'
                  ? '✅ Aktif (Pemberitahuan instan akan muncul di layar peramban)'
                  : pushPermissionStatus === 'denied'
                  ? '❌ Diblokir oleh peramban'
                  : '⚠️ Belum diaktifkan'}
              </span>
            </div>
            {pushPermissionStatus !== 'granted' && (
              <button
                onClick={requestPushNotificationPermission}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors shadow-2xs cursor-pointer"
                id="btn-enable-web-push"
              >
                Aktifkan
              </button>
            )}
          </div>
        </div>

        {/* Mark all as read bar */}
        {userNotifs.length > 0 && (
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{userNotifs.filter((n) => !n.isRead).length} belum dibaca</span>
            <button
              onClick={markAllNotificationsAsRead}
              className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
              id="btn-mark-all-read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai Semua Dibaca</span>
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {userNotifs.length > 0 ? (
            userNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.articleId) {
                    openArticleDetail(notif.articleId);
                    setIsNotificationDrawerOpen(false);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  notif.isRead
                    ? 'bg-white border-blue-100 hover:bg-blue-50/40 shadow-2xs'
                    : 'bg-blue-50/70 border-blue-200 ring-1 ring-blue-100/80 hover:bg-blue-50 shadow-xs'
                }`}
                id={`notif-card-${notif.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white shadow-2xs border border-blue-100 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>
                        {new Date(notif.createdAt).toLocaleDateString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      {notif.articleId && (
                        <span className="text-blue-600 font-bold flex items-center gap-0.5">
                          <span>Buka Karya</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Bell className="w-10 h-10 mx-auto mb-2 text-blue-200" />
              <p className="text-xs font-bold text-slate-700">Belum Ada Notifikasi</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Pemberitahuan persetujuan dan komentar akan muncul di sini.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
