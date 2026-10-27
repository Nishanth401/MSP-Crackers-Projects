import React, { useState, useMemo } from 'react';
import { CatalogControls } from '../components/catalog/CatalogControls';
import { ProductCard } from '../components/products/ProductCard';
import { ProductDetailModal } from '../components/products/ProductDetailModal';
import { filterProducts, ALL_PRODUCTS } from '../services/catalogService';
import { FilterState, Product } from '../types';
import { Sparkles, ChevronRight, AlertCircle } from 'lucide-react';

interface ProductsPageProps {
  navigate: (route: string) => void;
  initialCategory?: string;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  searchQuery: '',
  minPrice: 0,
  maxPrice: 100000,
  verifiedOnly: false,
  sortBy: 'code'
};

export const ProductsPage: React.FC<ProductsPageProps> = ({ 
  navigate, 
  initialCategory 
}) => {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    category: initialCategory || 'all'
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return filterProducts(filters);
  }, [filters]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">2026 Crackers Catalog</span>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>MSP Retail List 2026</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Explore Our Crackers
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Browse our full 131-item catalog from Sivakasi. All prices are in Indian Rupees (INR) reflecting verified festival net rates up to 90% discount.
          </p>
        </div>

        {/* Catalog Search & Filter Controls */}
        <CatalogControls
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          totalMatches={filtered.length}
        />

        {/* Product Grid or Empty State */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(product => (
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
            <h3 className="text-lg font-bold text-white">No matching products found</h3>
            <p className="text-xs text-slate-400">
              No products matched your search or filters. Try adjusting your query or resetting all filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl btn-gold text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onNavigateCategory={(slug) => {
          setSelectedProduct(null);
          handleFilterChange({ category: slug });
        }}
      />
    </div>
  );
};
