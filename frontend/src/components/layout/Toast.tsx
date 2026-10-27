import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, dismissToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-2xl glass-panel p-4 shadow-2xl border border-amber-400/40 bg-slate-900/95 text-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <p className="text-xs font-medium text-slate-100">{toastMessage}</p>
        </div>
        <button
          onClick={dismissToast}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
