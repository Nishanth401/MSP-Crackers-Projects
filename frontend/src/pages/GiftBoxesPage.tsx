import React, { useState } from 'react';
import { getGiftBoxes } from '../services/catalogService';
import { ProductCard } from '../components/products/ProductCard';
import { ProductDetailModal } from '../components/products/ProductDetailModal';
import { Product } from '../types';
import { useCart } from '../../src/context/CartContext';
import { Gift, Sparkles, Check, ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface GiftBoxesPageProps {
  navigate: (route: string) => void;
}

export const GiftBoxesPage: React.FC<GiftBoxesPageProps> = ({ navigate }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const giftBoxes = getGiftBoxes();
  const { addToCart } = useCart();

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">Festive Gift Boxes</span>
        </nav>

        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-red-400" />
            <span>2026 FESTIVAL FAMILY COMBOS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white">
            Curated Festival Gift Packs
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            All gift boxes from Page 6 of the MSP Retail List 2026. Available in 18, 21, 26, 30, 35, 40, 50, and 60-item assortments, plus executive Mega VVIP combos.
          </p>
        </div>

        {/* Verification Policy Notice */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-slate-300">
          <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Catalog Content Assurance:</strong> Each gift box is packed with a balanced assortment of sparklers, ground chakkers, flower pots, bijili sound crackers, and aerial shots corresponding to the item count. Rates reflect confirmed showroom net prices for the 2026 season.
          </div>
        </div>

        {/* Large Prominent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {giftBoxes.map((pack) => (
            <div
              key={pack.code}
              className="rounded-3xl glass-panel bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-card-dark relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Code #{pack.code}
                  </span>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-amber-400/20">
                    {pack.pieces || `${pack.itemCount} Items`}
                  </span>
                </div>

                <div 
                  onClick={() => setSelectedProduct(pack)}
                  className="cursor-pointer mb-4"
                >
                  <h3 className="font-display text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {pack.name}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-medium mt-0.5">
                    {pack.tamil}
                  </p>
                </div>

                {/* Box details list */}
                <div className="space-y-2 py-3 border-y border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Items in Box:</span>
                    <span className="font-bold text-white">{pack.itemCount ?? pack.pieces}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Suitable For:</span>
                    <span className="text-slate-200">Family & Society Celebrations</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Source:</span>
                    <span className="text-amber-400 font-medium">Page 6 (MSP Price List)</span>
                  </div>
                </div>

                <div className="my-5">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-1">
                    Festival Net Rate:
                  </span>
                  <div className="font-display text-3xl font-black text-amber-300">
                    ₹{pack.netPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => addToCart(pack, 1)}
                  className="w-full py-3.5 rounded-xl btn-gold text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-glow-gold transition-all"
                >
                  <Gift className="w-4 h-4" />
                  <span>Add {pack.name} to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(pack)}
                  className="w-full py-2 text-center text-xs text-slate-400 hover:text-white"
                >
                  View Details & Specs
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 overflow-hidden">
          <h3 className="font-display text-xl font-bold text-white mb-4">
            Gift Box Comparison Chart
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Pack Name</th>
                  <th className="py-3 px-4">Item Count</th>
                  <th className="py-3 px-4 text-right">Net Price (₹)</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {giftBoxes.map(p => (
                  <tr key={p.code} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">#{p.code}</td>
                    <td className="py-3 px-4 font-bold text-white">
                      {p.name}
                      <span className="block text-[10px] text-amber-300/70 font-normal">{p.tamil}</span>
                    </td>
                    <td className="py-3 px-4">{p.pieces || `${p.itemCount} Items`}</td>
                    <td className="py-3 px-4 text-right font-display text-sm font-bold text-amber-300">
                      ₹{p.netPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-slate-950 font-bold transition-colors"
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
