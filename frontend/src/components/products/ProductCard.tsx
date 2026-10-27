import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Minus, 
  Check, 
  AlertCircle, 
  Eye, 
  MessageSquare,
  Package,
  Layers
} from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { METADATA } from '../../services/catalogService';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = items.find(i => i.product.code === product.code);
  const isInCart = Boolean(cartItem);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const isVerified = product.status === 'VERIFIED' && product.netPrice !== null;

  const handleInquiry = () => {
    const text = encodeURIComponent(
      `Vanakkam MSP Pyro Park! I would like to know the current showroom price and availability for: ${product.name} (Code #${product.code}, Page ${product.page}).`
    );
    window.open(`https://wa.me/91${METADATA.whatsappNumbers[0]}?text=${text}`, '_blank');
  };

  return (
    <div className="group relative rounded-2xl glass-panel bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-card-dark">
      
      {/* Top Header: Code badge, Category, Traceability */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              #{product.code}
            </span>
            <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded-md bg-slate-800">
              Pg {product.page}
            </span>
          </div>

          {/* Discount or Verification Badge */}
          {isVerified ? (
            product.discountPercent ? (
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {product.discountPercent}% OFF
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300">
                Net Rate
              </span>
            )
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>Inquiry Required</span>
            </span>
          )}
        </div>

        {/* Product Visual Area / Category Icon */}
        <div 
          onClick={() => onViewDetails && onViewDetails(product)}
          className="relative w-full h-32 rounded-xl bg-gradient-to-br from-slate-950 to-slate-800 border border-slate-800/80 p-3 flex flex-col items-center justify-center cursor-pointer overflow-hidden group-hover:border-amber-500/30 transition-colors mb-3"
        >
          {/* Subtle festive particle background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60" />

          {product.isGiftPack ? (
            <div className="relative text-center z-10">
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 mb-1">
                {product.pieces || `${product.itemCount} Items`}
              </span>
              <p className="text-[11px] text-amber-200 font-semibold uppercase tracking-wider">Festival Gift Combo</p>
            </div>
          ) : (
            <div className="relative text-center z-10">
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-[11px] text-slate-300 font-medium">
                {product.pack} • {product.pieces}
              </span>
            </div>
          )}

          {/* Quick View Button overlay */}
          <button 
            type="button"
            className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-amber-300 hover:bg-slate-800 transition-opacity opacity-0 group-hover:opacity-100"
            title="View Specifications"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Titles */}
        <div 
          onClick={() => onViewDetails && onViewDetails(product)}
          className="cursor-pointer mb-2"
        >
          <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-amber-300/80 font-medium line-clamp-1 mt-0.5">
            {product.tamil}
          </p>
        </div>

        {/* Specifications row */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Package className="w-3 h-3 text-amber-400/80" />
            <span>{product.pack}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-amber-400/80" />
            <span>{product.pieces}</span>
          </span>
        </div>
      </div>

      {/* Bottom Area: Pricing & Actions */}
      <div className="pt-2 border-t border-slate-800/80">
        
        {/* Price display */}
        {isVerified ? (
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg font-black text-amber-300">
                  ₹{product.netPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                {product.listPrice && product.listPrice > product.netPrice! && (
                  <span className="text-xs text-slate-500 line-through">
                    ₹{product.listPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400">Festival Net Rate</span>
            </div>
            {isInCart && (
              <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">
                {cartItem?.quantity} in cart
              </span>
            )}
          </div>
        ) : (
          <div className="mb-3">
            <div className="text-xs font-bold text-yellow-300">Price on Inquiry</div>
            <p className="text-[10px] text-slate-400">Confirm directly with Amathur showroom</p>
          </div>
        )}

        {/* Action Controls */}
        {isVerified ? (
          <div className="flex items-center gap-2">
            {/* Quantity Controls */}
            <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-0.5">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-white font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                justAdded 
                  ? 'bg-emerald-500 text-slate-950' 
                  : 'btn-gold'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Unverified product inquiry button */
          <button
            type="button"
            onClick={handleInquiry}
            className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/25 flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquire Price on WhatsApp</span>
          </button>
        )}

      </div>

    </div>
  );
};
