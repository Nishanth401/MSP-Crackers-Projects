import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Package, 
  Layers, 
  FileText, 
  MessageCircle, 
  Plus, 
  Minus, 
  Check,
  MapPin
} from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { METADATA } from '../../services/catalogService';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateCategory?: (categorySlug: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  onClose,
  onNavigateCategory 
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isVerified = product.status === 'VERIFIED' && product.netPrice !== null;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Vanakkam MSP Pyro Park! I am enquiring about Product #${product.code} - ${product.name} (${product.tamil}) from your 2026 Price List (Page ${product.page}).`
    );
    window.open(`https://wa.me/91${METADATA.whatsappNumbers[0]}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-3xl glass-panel bg-slate-900 border border-amber-400/30 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Catalog Code #{product.code}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
            PDF Source: Page {product.page}
          </span>
          {isVerified ? (
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {product.discountPercent}% Confirmed Discount
            </span>
          ) : (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
              Needs Verification
            </span>
          )}
        </div>

        {/* Title & Tamil Translation */}
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
            {product.name}
          </h2>
          <p className="text-lg text-amber-300/90 font-medium mt-1">
            {product.tamil}
          </p>
        </div>

        {/* Grid Specs & Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Verified Price (INR)
            </span>
            {isVerified ? (
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-black text-amber-300">
                    ₹{product.netPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  {product.listPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      ₹{product.listPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                {product.listPrice && product.netPrice && (
                  <p className="text-xs text-emerald-400 font-bold mt-1">
                    You save ₹{(product.listPrice - product.netPrice).toLocaleString('en-IN')} ({product.discountPercent}% off printed list price)
                  </p>
                )}
              </div>
            ) : (
              <div>
                <div className="text-sm font-bold text-yellow-300">Showroom Inquiry Required</div>
                <p className="text-xs text-slate-400 mt-1">
                  This item was listed without price coordinates in the source PDF. Contact our showroom team to confirm current availability.
                </p>
              </div>
            )}
          </div>

          {/* Packaging Details */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Pack Specifications
            </span>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-amber-400" />
                <span>Unit Packing</span>
              </span>
              <span className="font-bold text-white">{product.pack}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Content / Pieces</span>
              </span>
              <span className="font-bold text-white">{product.pieces}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Source Document</span>
              </span>
              <span className="font-medium text-amber-300">MSP Retail List 2026</span>
            </div>
          </div>

        </div>

        {/* Safety & Instructions Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-300 mb-6 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Usage & Safety Guidelines</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300/90 text-[11px]">
            <li>Always light under adult supervision outdoors in an open area away from structures.</li>
            <li>Maintain a minimum safe distance of 5 meters after lighting the fuse.</li>
            <li>Keep a bucket of clean water or sand ready nearby for emergencies.</li>
            <li>Never attempt to re-ignite fireworks that failed to burst initially.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {isVerified ? (
            <>
              {/* Quantity selector */}
              <div className="flex items-center rounded-2xl bg-slate-950 border border-slate-800 p-1 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-white font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all w-full ${
                  added ? 'bg-emerald-500 text-slate-950 font-black' : 'btn-gold'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {quantity} to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Order Estimate (₹{((product.netPrice ?? 0) * quantity).toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full py-3 px-6 rounded-2xl text-sm font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 hover:bg-yellow-500/30 flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire Showroom Price on WhatsApp</span>
            </button>
          )}

          {/* WhatsApp Direct inquiry */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
            title="Chat with showroom"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>

      </div>

    </div>
  );
};
