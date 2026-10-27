import React, { useState, useMemo } from 'react';
import { getCategoryBySlug, getProductsByCategory, CATEGORIES } from '../services/catalogService';
import { ProductCard } from '../components/products/ProductCard';
import { ProductDetailModal } from '../components/products/ProductDetailModal';
import { Product } from '../types';
import { ChevronRight, Sparkles, ArrowLeft, ArrowDownUp, Search } from 'lucide-react';

interface CategoryPageProps {
  slug: string;
  navigate: (route: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug, navigate }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'code' | 'price-asc' | 'price-desc'>('code');

  const category = getCategoryBySlug(slug);
  const rawProducts = useMemo(() => getProductsByCategory(slug), [slug]);

  const filtered = useMemo(() => {
    let list = [...rawProducts];
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.tamil.toLowerCase().includes(q) || String(p.code) === q);
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.netPrice ?? 999999) - (b.netPrice ?? 999999));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.netPrice ?? 0) - (a.netPrice ?? 0));
    } else {
      list.sort((a, b) => a.code - b.code);
    }
    return list;
  }, [rawProducts, search, sortBy]);

  if (!category) {
    return (
      <div className="py-20 text-center text-white bg-slate-950 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
        <button onClick={() => navigate('/products')} className="px-6 py-3 rounded-xl btn-gold text-xs font-bold">
          View All Products
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <button onClick={() => navigate('/products')} className="hover:text-amber-300">Categories</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">{category.name}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-400/20 mb-8 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              {category.tamil}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">
              {category.name}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {category.description}
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="font-mono text-amber-400 font-bold">{rawProducts.length} Items</span>
              <span>in this catalog section</span>
            </div>
          </div>
        </div>

        {/* Search & Sort inside Category */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search within ${category.name}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-md pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="code">Sort by Code Number</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(product => (
            <ProductCard
              key={product.code}
              product={product}
              onViewDetails={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>

      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
