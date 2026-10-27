import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategoriesSection } from '../components/home/FeaturedCategoriesSection';
import { BestSellingSection } from '../components/home/BestSellingSection';
import { GiftBoxShowcaseSection } from '../components/home/GiftBoxShowcaseSection';
import { ShowroomTrustSection } from '../components/home/ShowroomTrustSection';
import { ProductDetailModal } from '../components/products/ProductDetailModal';
import { getFeaturedProducts, getGiftBoxes, METADATA } from '../services/catalogService';
import { Product } from '../types';
import { Phone, MessageCircle, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = getFeaturedProducts();
  const giftBoxes = getGiftBoxes();

  return (
    <div className="space-y-0">
      
      {/* Hero Section */}
      <HeroSection
        onExploreProducts={() => navigate('/products')}
        onExploreGiftBoxes={() => navigate('/gift-boxes')}
      />

      {/* Featured Categories */}
      <FeaturedCategoriesSection
        onSelectCategory={(slug) => navigate(`/category/${slug}`)}
        onViewAll={() => navigate('/products')}
      />

      {/* Best-Selling Verified Picks */}
      <BestSellingSection
        products={featured}
        onViewDetails={(p) => setSelectedProduct(p)}
        onViewAllProducts={() => navigate('/products')}
      />

      {/* Gift Boxes Showcase */}
      <GiftBoxShowcaseSection
        giftBoxes={giftBoxes}
        onViewAllGiftBoxes={() => navigate('/gift-boxes')}
        onViewDetails={(p) => setSelectedProduct(p)}
      />

      {/* Trust & Verified Facts */}
      <ShowroomTrustSection />

      {/* Direct Contact & Showroom CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600/20 via-slate-900 to-amber-600/20 border-t border-amber-400/20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VISIT OUR SIVAKASI SHOWROOM</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            Need Help Choosing Your Festive Crackers?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Contact our showroom team directly to confirm current stock, family pack assortments, and showroom collection times in Amathur.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${METADATA.contactNumbers[0]}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-gold text-slate-950 font-black flex items-center justify-center gap-2 shadow-glow-gold"
            >
              <Phone className="w-4 h-4" />
              <span>Call Showroom: +91 {METADATA.contactNumbers[0]}</span>
            </a>

            <a
              href={`https://wa.me/91${METADATA.whatsappNumbers[0]}?text=${encodeURIComponent("Vanakkam MSP Pyro Park! I would like to inquire about your 2026 festive crackers catalog.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>

          <p className="text-xs text-slate-400 pt-2 flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Near AAA College, Virudhunagar – Sivakasi Main Road, Amathur, Tamil Nadu</span>
          </p>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onNavigateCategory={(slug) => {
          setSelectedProduct(null);
          navigate(`/category/${slug}`);
        }}
      />

    </div>
  );
};
