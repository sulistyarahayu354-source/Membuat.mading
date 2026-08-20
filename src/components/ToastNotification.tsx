import React from 'react';
import { useMading } from '../context/MadingContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { activeToast, clearToast } = useMading();

  if (!activeToast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  };

  const borderColors = {
    success: 'border-emerald-200 bg-emerald-50/95 text-emerald-950',
    info: 'border-sky-200 bg-sky-50/95 text-sky-950',
    warning: 'border-amber-200 bg-amber-50/95 text-amber-950',
    error: 'border-rose-200 bg-rose-50/95 text-rose-950',
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`pointer-events-auto p-4 rounded-xl border shadow-lg backdrop-blur-md flex items-start gap-3 ${
            borderColors[activeToast.type || 'info']
          }`}
          id="system-toast-alert"
        >
          {icons[activeToast.type || 'info']}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold leading-tight">{activeToast.title}</h4>
            <p className="text-xs mt-1 leading-relaxed opacity-90">{activeToast.message}</p>
          </div>
          <button
            onClick={clearToast}
            className="p-1 hover:bg-black/5 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
            aria-label="Tutup notifikasi"
            id="btn-close-toast"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
