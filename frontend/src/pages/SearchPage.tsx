import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';
import { ALL_PRODUCTS } from '../services/catalogService';
import { ProductCard } from '../components/products/ProductCard';
import { ProductDetailModal } from '../components/products/ProductDetailModal';
import { Product } from '../types';

interface SearchPageProps {
  navigate: (route: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ navigate }) => {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return ALL_PRODUCTS.slice(0, 16);
    const q = query.toLowerCase().trim();
    return ALL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.tamil.toLowerCase().includes(q) ||
      String(p.code) === q ||
      p.category.toLowerCase().includes(q) ||
      p.pack.toLowerCase().includes(q)
    );
  }, [query]);

  const popularSearches = ['Lakshmi', 'Paper Bomb', 'Flower Pots', 'Chakker', 'Sparklers', 'Bijili', '120 Shots', 'Dora Gift Box', 'Hydro Green'];

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">Product Search</span>
        </nav>

        {/* Search Input Bar */}
        <div className="max-w-3xl mx-auto mb-10 text-center space-y-4">
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
            Search 2026 Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Search 131 products by English name, Tamil translation, category, or code number.
          </p>

          <div className="relative">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Type product name (e.g. Lakshmi, Super Dlx) or code (#1 to #131)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl glass-panel bg-slate-900 border-2 border-slate-700 focus:border-amber-400 text-white placeholder-slate-500 text-base focus:outline-none transition-colors shadow-2xl"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick search pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-slate-400">Popular:</span>
            {popularSearches.map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-400/40 hover:text-amber-300 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <span>
            {query.trim() ? (
              <>Found <strong className="text-amber-300">{results.length}</strong> products matching "{query}"</>
            ) : (
              <>Showing popular items from catalog</>
            )}
          </span>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-amber-400 hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {results.map(product => (
              <ProductCard
                key={product.code}
                product={product}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl glass-panel p-8 max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">No products found for "{query}"</h3>
            <p className="text-xs text-slate-400">
              Check for spelling errors or try searching by category like "Flower Pots", "Bombs", or "Sparklers".
            </p>
            <button
              onClick={() => setQuery('')}
              className="px-5 py-2.5 rounded-xl btn-gold text-xs font-bold"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
