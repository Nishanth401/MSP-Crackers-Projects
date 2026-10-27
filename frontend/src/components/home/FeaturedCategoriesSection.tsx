import React from 'react';
import { Sparkles, ArrowRight, Layers, Flame, Package } from 'lucide-react';
import { CATEGORIES } from '../../services/catalogService';

interface FeaturedCategoriesSectionProps {
  onSelectCategory: (slug: string) => void;
  onViewAll: () => void;
}

export const FeaturedCategoriesSection: React.FC<FeaturedCategoriesSectionProps> = ({
  onSelectCategory,
  onViewAll
}) => {
  return (
    <section className="py-16 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Catalog Taxonomy</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Find products by type and explore the verified sizes and packings extracted from the MSP 2026 Price List.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 group"
          >
            <span>View All 18 Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CATEGORIES.slice(0, 12).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group p-4 rounded-2xl glass-panel bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                  <Flame className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-amber-300/80 font-medium line-clamp-1 mt-0.5">
                  {cat.tamil}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-mono text-amber-400 font-bold">{cat.itemCount} Items</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-300">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
