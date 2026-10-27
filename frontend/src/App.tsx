import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { WhatsAppFloatingButton } from './components/layout/WhatsAppFloatingButton';
import { Toast } from './components/layout/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CategoryPage } from './pages/CategoryPage';
import { GiftBoxesPage } from './pages/GiftBoxesPage';
import { SearchPage } from './pages/SearchPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SafetyPage } from './pages/SafetyPage';
import { FaqPage } from './pages/FaqPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AdminPage } from './pages/AdminPage';

import { OrderRecord } from './types';

export const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const stored = localStorage.getItem('msp_orders_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(() => {
    try {
      const stored = localStorage.getItem('msp_last_order');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('msp_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist orders', e);
    }
  }, [orders]);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (order: OrderRecord) => {
    setOrders(prev => [order, ...prev]);
    setActiveOrder(order);
    localStorage.setItem('msp_last_order', JSON.stringify(order));
  };

  const handleUpdateOrderStatus = (orderRef: string, newStatus: any) => {
    setOrders(prev => prev.map(o => o.orderReference === orderRef ? { ...o, status: newStatus } : o));
    if (activeOrder && activeOrder.orderReference === orderRef) {
      setActiveOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Route resolver
  const renderCurrentPage = () => {
    if (currentRoute === '/') {
      return <HomePage navigate={navigate} />;
    }
    if (currentRoute === '/products') {
      return <ProductsPage navigate={navigate} />;
    }
    if (currentRoute.startsWith('/category/')) {
      const slug = currentRoute.replace('/category/', '');
      return <CategoryPage slug={slug} navigate={navigate} />;
    }
    if (currentRoute === '/gift-boxes') {
      return <GiftBoxesPage navigate={navigate} />;
    }
    if (currentRoute === '/search') {
      return <SearchPage navigate={navigate} />;
    }
    if (currentRoute === '/cart') {
      return <CartPage navigate={navigate} />;
    }
    if (currentRoute === '/checkout') {
      return <CheckoutPage navigate={navigate} onOrderComplete={handleOrderComplete} />;
    }
    if (currentRoute.startsWith('/order-confirmation')) {
      return <OrderConfirmationPage order={activeOrder} navigate={navigate} />;
    }
    if (currentRoute === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (currentRoute === '/contact') {
      return <ContactPage navigate={navigate} />;
    }
    if (currentRoute === '/safety') {
      return <SafetyPage navigate={navigate} />;
    }
    if (currentRoute === '/faq') {
      return <FaqPage navigate={navigate} />;
    }
    if (currentRoute === '/policies') {
      return <PoliciesPage navigate={navigate} />;
    }
    if (currentRoute === '/admin') {
      return (
        <AdminPage 
          navigate={navigate} 
          orders={orders} 
          onUpdateOrderStatus={handleUpdateOrderStatus} 
        />
      );
    }

    // Default fallback
    return <HomePage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <SiteHeader 
        currentRoute={currentRoute} 
        navigate={navigate}
        onOpenSearch={() => navigate('/search')}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <SiteFooter navigate={navigate} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Real-time Toast Feedback */}
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
