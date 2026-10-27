import React from 'react';
import { Gift, Sparkles, ArrowRight, Check, Package } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface GiftBoxShowcaseSectionProps {
  giftBoxes: Product[];
  onViewAllGiftBoxes: () => void;
  onViewDetails: (product: Product) => void;
}

export const GiftBoxShowcaseSection: React.FC<GiftBoxShowcaseSectionProps> = ({
  giftBoxes,
  onViewAllGiftBoxes,
  onViewDetails
}) => {
  const { addToCart } = useCart();

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-amber-500/20">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-red-400" />
            <span>2026 FESTIVAL FAMILY PACKS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            Find Your Festive Pack
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Explore gift packs curated by verified item counts (18 to 60 items) and compare confirmed festival net prices straight from our Sivakasi showroom.
          </p>
        </div>

        {/* Featured Gift Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {giftBoxes.slice(0, 3).map((pack, idx) => (
            <div 
              key={pack.code}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                idx === 1 
                  ? 'bg-gradient-to-b from-slate-900 via-amber-950/30 to-slate-900 border-2 border-amber-400 shadow-glow-gold -translate-y-2' 
                  : 'glass-panel bg-slate-900/80 border border-slate-800 hover:border-amber-400/30'
              }`}
            >
              {idx === 1 && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-brand-saffron text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                  Most Popular Family Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300">
                    Code #{pack.code}
                  </span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-amber-400/20">
                    {pack.pieces || `${pack.itemCount} Items`}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-black text-white mb-1">
                  {pack.name}
                </h3>
                <p className="text-xs text-amber-300/80 font-medium mb-4">
                  {pack.tamil}
                </p>

                <div className="mb-6">
                  <div className="text-xs text-slate-400 mb-1">Showroom Net Festival Rate:</div>
                  <div className="font-display text-3xl font-black text-amber-300">
                    ₹{pack.netPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Includes sparklers, chakkers, pots, bijili & novelties</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => addToCart(pack, 1)}
                  className={`w-full py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                    idx === 1 ? 'btn-gold' : 'btn-saffron'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  <span>Add {pack.name} to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={() => onViewDetails(pack)}
                  className="w-full py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  View Pack Details
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <button
            onClick={onViewAllGiftBoxes}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl glass-panel text-white font-bold hover:bg-slate-800 hover:border-amber-400/50 transition-all text-sm"
          >
            <span>Compare All 11 Gift Boxes & Special Packs (Up to 60 Items)</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
