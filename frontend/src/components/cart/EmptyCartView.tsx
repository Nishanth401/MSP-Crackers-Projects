import React from 'react';
import { ShoppingBag, Sparkles, ArrowRight, Gift } from 'lucide-react';

interface EmptyCartViewProps {
  onBrowseProducts: () => void;
  onBrowseGiftBoxes: () => void;
}

export const EmptyCartView: React.FC<EmptyCartViewProps> = ({
  onBrowseProducts,
  onBrowseGiftBoxes
}) => {
  return (
    <div className="py-20 text-center max-w-lg mx-auto">
      
      <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-500/10 border border-amber-400/20 text-amber-300 flex items-center justify-center mb-6 shadow-glow-gold">
        <ShoppingBag className="w-12 h-12 text-amber-400" />
      </div>

      <h2 className="font-display text-2xl sm:text-3xl font-black text-white mb-2">
        Your cart is waiting for something festive.
      </h2>

      <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">
        Explore our 131-product catalog from Sivakasi, featuring traditional sound crackers, twinkling fountains, aerial novelties, and curated gift boxes.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onBrowseProducts}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl btn-gold text-xs font-black flex items-center justify-center gap-2"
        >
          <span>Browse 2026 Products</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>

        <button
          onClick={onBrowseGiftBoxes}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel text-white hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-2"
        >
          <Gift className="w-4 h-4 text-amber-400" />
          <span>Explore Gift Boxes</span>
        </button>
      </div>

    </div>
  );
};
