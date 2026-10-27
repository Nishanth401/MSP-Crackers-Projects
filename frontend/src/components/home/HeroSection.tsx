import React from 'react';
import { Sparkles, ArrowRight, Gift, ShieldCheck, Flame, MapPin } from 'lucide-react';
import { METADATA } from '../../services/catalogService';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onExploreGiftBoxes: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onExploreProducts, 
  onExploreGiftBoxes 
}) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden sparkle-bg">
      
      {/* Decorative luminous bursts */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-brand-saffron/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow & Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>FESTIVE SHOPPING, MADE SIMPLE</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 text-xs font-medium">
            <MapPin className="w-3 h-3 text-brand-saffron" />
            <span>Showroom: Amathur, Sivakasi</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Make Every Celebration <br />
            <span className="gold-gradient-text drop-shadow-sm">
              Brighter & Safer.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore crackers, sparklers, fountains, and festive gift packs in one convenient digital catalog. Sivakasi direct showroom retail pricing with discounts of up to 90% against listed prices.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreProducts}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-gold text-base font-extrabold flex items-center justify-center gap-3 shadow-glow-gold transition-all"
            >
              <span>Explore 2026 Products</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            <button
              onClick={onExploreGiftBoxes}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-white font-bold hover:bg-slate-800/90 hover:border-amber-400/50 flex items-center justify-center gap-3 transition-all"
            >
              <Gift className="w-5 h-5 text-amber-400" />
              <span>View Gift Boxes & Combos</span>
            </button>
          </div>

          {/* Catalog Metadata Statement */}
          <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-brand-saffron" />
              <span>Associated: Sun Star Fire Works</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Traceable PDF Catalog Data</span>
            </span>
            <span>•</span>
            <span>Official 2026 Price List</span>
          </div>

        </div>

        {/* Feature Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 text-center">
            <div className="font-display text-2xl sm:text-3xl font-black text-amber-300">131</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Catalog Products</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 text-center">
            <div className="font-display text-2xl sm:text-3xl font-black text-brand-saffron">18</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Distinct Categories</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 text-center">
            <div className="font-display text-2xl sm:text-3xl font-black text-emerald-400">Up to 90%</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Confirmed Discount</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 text-center">
            <div className="font-display text-2xl sm:text-3xl font-black text-amber-200">18 - 60</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Gift Pack Item Sizes</div>
          </div>
        </div>

      </div>
    </section>
  );
};
