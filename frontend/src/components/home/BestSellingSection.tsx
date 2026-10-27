import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface BestSellingSectionProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onViewAllProducts: () => void;
}

export const BestSellingSection: React.FC<BestSellingSectionProps> = ({
  products,
  onViewDetails,
  onViewAllProducts
}) => {
  return (
    <section className="py-16 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Festival Essentials</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
              Featured Festival Picks
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Hand-picked verified crackers, flower pots, chakkers, bombs, and sparklers with confirmed prices from our 2026 catalog.
            </p>
          </div>

          <button
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 group"
          >
            <span>Explore All 131 Crackers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map(product => (
            <ProductCard 
              key={product.code} 
              product={product} 
              onViewDetails={onViewDetails} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};
