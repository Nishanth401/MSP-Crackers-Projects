import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (code: number, quantity: number) => void;
  removeFromCart: (code: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPcsCount: number;
  subtotal: number;
  listTotal: number;
  savings: number;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'msp_pyro_park_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const dismissToast = () => setToastMessage(null);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.status === 'NEEDS_VERIFICATION' && product.netPrice === null) {
      showToast(`Price confirmation required for "${product.name}". Please inquire via WhatsApp.`);
      return;
    }

    setItems(prev => {
      const existing = prev.find(i => i.product.code === product.code);
      if (existing) {
        return prev.map(i => 
          i.product.code === product.code 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  const updateQuantity = (code: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(code);
      return;
    }
    setItems(prev => prev.map(i => i.product.code === code ? { ...i, quantity } : i));
  };

  const removeFromCart = (code: number) => {
    setItems(prev => {
      const removed = prev.find(i => i.product.code === code);
      if (removed) {
        showToast(`Removed "${removed.product.name}" from cart`);
      }
      return prev.filter(i => i.product.code !== code);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPcsCount = items.length;

  const subtotal = items.reduce((sum, i) => {
    const price = i.product.netPrice ?? 0;
    return sum + price * i.quantity;
  }, 0);

  const listTotal = items.reduce((sum, i) => {
    const listP = i.product.listPrice ?? (i.product.netPrice ?? 0);
    return sum + listP * i.quantity;
  }, 0);

  const savings = Math.max(0, listTotal - subtotal);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      itemCount,
      totalPcsCount,
      subtotal,
      listTotal,
      savings,
      toastMessage,
      dismissToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
