import React from 'react';
import { Search, SlidersHorizontal, X, ArrowDownUp, ShieldCheck } from 'lucide-react';
import { FilterState, Category } from '../../types';
import { CATEGORIES } from '../../services/catalogService';

interface CatalogControlsProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalMatches: number;
}

export const CatalogControls: React.FC<CatalogControlsProps> = ({
  filters,
  onChange,
  onReset,
  totalMatches
}) => {
  return (
    <div className="space-y-4 mb-8">
      
      {/* Top Bar: Search Input & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name, Tamil name, or code number (e.g. 10, Flower Pots, Lakshmi)..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ searchQuery: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <div className="relative flex-shrink-0">
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ sortBy: e.target.value as any })}
              className="appearance-none pl-9 pr-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white text-xs font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="code">Sort by: Catalog Code (1 - 131)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
              <option value="discount-desc">Highest Discount</option>
            </select>
            <ArrowDownUp className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Verified Only Toggle */}
          <button
            onClick={() => onChange({ verifiedOnly: !filters.verifiedOnly })}
            className={`px-3 py-3 rounded-2xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              filters.verifiedOnly 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-900/90 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Filter only products with confirmed prices"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Verified Prices Only</span>
          </button>
        </div>

      </div>

      {/* Category Pills (Horizontally scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => onChange({ category: 'all' })}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            filters.category === 'all'
              ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
              : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-amber-400/40 hover:text-white'
          }`}
        >
          All Categories (131)
        </button>

        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onChange({ category: cat.slug })}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filters.category === cat.slug
                ? 'bg-amber-400 text-slate-950 font-bold shadow-glow-gold'
                : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-amber-400/40 hover:text-white'
            }`}
          >
            <span>{cat.name}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              filters.category === cat.slug ? 'bg-slate-950 text-amber-300 font-bold' : 'bg-slate-800 text-slate-400'
            }`}>
              {cat.itemCount}
            </span>
          </button>
        ))}
      </div>

      {/* Status Bar: Results count & Active filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-400">
        <div>
          Showing <span className="font-bold text-amber-300">{totalMatches}</span> verified products matching your filters
        </div>

        {(filters.category !== 'all' || filters.searchQuery || filters.verifiedOnly) && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-amber-400 hover:underline font-semibold"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

    </div>
  );
};
