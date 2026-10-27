import React from 'react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyCartView } from '../components/cart/EmptyCartView';
import { Trash2, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';

interface CartPageProps {
  navigate: (route: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate }) => {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-12 bg-slate-950 min-h-[70vh] flex items-center justify-center">
        <EmptyCartView
          onBrowseProducts={() => navigate('/products')}
          onBrowseGiftBoxes={() => navigate('/gift-boxes')}
        />
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
          <span className="text-amber-400 font-semibold">Shopping Cart</span>
        </nav>

        {/* Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
              Your Festive Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review your items and proceed to generate a verified order reservation.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-900"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Two-column layout: Items List & Cart Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Items List */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <CartItemRow key={item.product.code} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              onCheckout={() => navigate('/checkout')}
              onContinueShopping={() => navigate('/products')}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
