import React from 'react';
import { Minus, Plus, Trash2, Package, Sparkles } from 'lucide-react';
import { CartItem } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const unitPrice = product.netPrice ?? 0;
  const lineTotal = unitPrice * quantity;
  const listPrice = product.listPrice ?? unitPrice;
  const listLineTotal = listPrice * quantity;

  return (
    <div className="py-4 px-4 sm:px-6 rounded-2xl glass-panel bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
      
      {/* Product Information */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 font-mono text-xs font-black flex-shrink-0">
          #{product.code}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-sm text-white truncate">
            {product.name}
          </h4>
          <p className="text-xs text-amber-300/80 font-medium truncate">
            {product.tamil}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
            <span>{product.pack}</span>
            <span>•</span>
            <span>{product.pieces}</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">₹{unitPrice.toLocaleString('en-IN')} / unit</span>
          </div>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        
        {/* Quantity Controls */}
        <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-0.5">
          <button
            type="button"
            onClick={() => updateQuantity(product.code, quantity - 1)}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Decrease"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-white font-mono">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(product.code, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Increase"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[90px]">
          <div className="font-display text-base font-black text-amber-300">
            ₹{lineTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          {listLineTotal > lineTotal && (
            <div className="text-[10px] text-slate-500 line-through">
              ₹{listLineTotal.toLocaleString('en-IN')}
            </div>
          )}
        </div>

        {/* Delete button */}
        <button
          type="button"
          onClick={() => removeFromCart(product.code)}
          className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
          title="Remove from cart"
        >
          <Trash2 className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
