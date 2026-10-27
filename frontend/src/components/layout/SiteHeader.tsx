import React, { useState } from 'react';
import { 
  Flame, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Gift, 
  ShieldCheck, 
  Info, 
  PhoneCall, 
  Settings,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES, METADATA } from '../../services/catalogService';

interface SiteHeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onOpenSearch?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentRoute, navigate, onOpenSearch }) => {
  const { itemCount, subtotal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 glass-nav shadow-lg transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-brand-saffron to-amber-600 flex items-center justify-center shadow-glow-gold transition-transform duration-300 group-hover:scale-105">
              <Flame className="w-6 h-6 text-slate-950 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-300 rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  MSP <span className="gold-gradient-text">PYRO PARK</span>
                </span>
              </div>
              <p className="text-[10px] text-amber-200/80 font-medium tracking-wide uppercase flex items-center gap-1.5">
                <span>Associated: Sun Star Fire Works</span>
                <span className="w-1 h-1 rounded-full bg-amber-400 inline-block" />
                <span className="text-amber-400 font-bold">Sivakasi</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentRoute === '/' 
                  ? 'text-amber-400 bg-amber-400/10 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('/products')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentRoute === '/products' 
                  ? 'text-amber-400 bg-amber-400/10 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <span>Explore Products</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                131
              </span>
            </button>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  categoryDropdownOpen 
                    ? 'text-amber-300 bg-slate-800' 
                    : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-72 rounded-2xl glass-panel p-2 shadow-2xl border border-amber-400/20 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 z-50"
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                >
                  <div className="text-[11px] font-bold text-amber-400 px-3 py-1.5 uppercase tracking-wider">
                    Source PDF Categories (18)
                  </div>
                  <div className="grid grid-cols-1 gap-0.5">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleNav(`/category/${cat.slug}`)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-amber-400/10 hover:text-amber-300 text-slate-300 transition-colors"
                      >
                        <div>
                          <div className="font-semibold">{cat.name}</div>
                          <div className="text-[10px] text-slate-400">{cat.tamil}</div>
                        </div>
                        <span className="text-[10px] text-amber-400 font-mono bg-slate-900/80 px-1.5 py-0.5 rounded">
                          {cat.itemCount}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/gift-boxes')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentRoute === '/gift-boxes' 
                  ? 'text-amber-400 bg-amber-400/10 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Gift Boxes</span>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.2 rounded border border-red-500/40">
                Combos
              </span>
            </button>

            <button
              onClick={() => handleNav('/safety')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                currentRoute === '/safety' 
                  ? 'text-amber-400 bg-amber-400/10 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safety & Law</span>
            </button>

            <button
              onClick={() => handleNav('/about')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentRoute === '/about' 
                  ? 'text-amber-400 bg-amber-400/10 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentRoute === '/contact' 
                  ? 'text-amber-400 bg-amber-400/10 font-bold' 
                  : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs: Search, Cart, Admin */}
          <div className="flex items-center gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={() => onOpenSearch ? onOpenSearch() : handleNav('/search')}
              className="p-2.5 rounded-xl text-slate-300 hover:text-amber-300 hover:bg-slate-800/60 transition-colors border border-slate-700/60 hover:border-amber-400/40"
              title="Search products (Code, Name, Category)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => handleNav('/cart')}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-400/30 text-amber-300 hover:border-amber-400/60 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <div className="hidden sm:block text-left text-xs">
                <div className="text-[10px] text-amber-300/70 font-semibold uppercase leading-none">Cart</div>
                <div className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</div>
              </div>
              {itemCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-black rounded-full bg-gradient-to-r from-brand-saffron to-amber-500 text-slate-950 shadow-glow-gold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Admin shortcut icon */}
            <button
              onClick={() => handleNav('/admin')}
              className="hidden sm:flex p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-slate-800/40 transition-colors"
              title="Admin & Verification Queue"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-amber-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-28 bottom-0 bg-slate-950/95 backdrop-blur-xl z-50 p-6 overflow-y-auto border-t border-amber-400/20 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-3 pb-8">
            <button
              onClick={() => handleNav('/')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center justify-between ${
                currentRoute === '/' ? 'bg-amber-400/20 text-amber-300' : 'text-slate-200 bg-slate-900/60'
              }`}
            >
              <span>Home</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => handleNav('/products')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center justify-between ${
                currentRoute === '/products' ? 'bg-amber-400/20 text-amber-300' : 'text-slate-200 bg-slate-900/60'
              }`}
            >
              <span>Explore All Products</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">131 Products</span>
            </button>

            <button
              onClick={() => handleNav('/gift-boxes')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center justify-between ${
                currentRoute === '/gift-boxes' ? 'bg-amber-400/20 text-amber-300' : 'text-slate-200 bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Gift Boxes & Combos</span>
              </span>
              <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">Special Net Rates</span>
            </button>

            <button
              onClick={() => handleNav('/safety')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center justify-between ${
                currentRoute === '/safety' ? 'bg-amber-400/20 text-amber-300' : 'text-slate-200 bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Safety & Legal Compliance</span>
              </span>
            </button>

            <button
              onClick={() => handleNav('/about')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold ${
                currentRoute === '/about' ? 'bg-amber-400/20 text-amber-300' : 'text-slate-200 bg-slate-900/60'
              }`}
            >
              About MSP Pyro Park & Sunstar
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold ${
                currentRoute === '/contact' ? 'bg-amber-400/20 text-amber-300' : 'text-slate-200 bg-slate-900/60'
              }`}
            >
              Contact & Showroom Location
            </button>

            <button
              onClick={() => handleNav('/admin')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-amber-300 bg-amber-950/30 border border-amber-500/30 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Admin & Verification Queue</span>
              </span>
              <span className="text-xs bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black">Portal</span>
            </button>

            {/* Categories list in mobile */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Shop by Categories
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.slice(0, 8).map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleNav(`/category/${c.slug}`)}
                    className="text-left p-2.5 rounded-lg bg-slate-900 text-xs text-slate-300 hover:text-amber-300"
                  >
                    <div className="font-semibold line-clamp-1">{c.name}</div>
                    <div className="text-[10px] text-slate-500">{c.itemCount} items</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Call Button */}
            <div className="pt-4">
              <a 
                href={`tel:${METADATA.contactNumbers[0]}`}
                className="w-full py-3 rounded-xl btn-saffron flex items-center justify-center gap-2 text-sm font-bold"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Showroom: +91 {METADATA.contactNumbers[0]}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
