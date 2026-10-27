import React from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  ExternalLink,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import { METADATA, CATEGORIES } from '../../services/catalogService';

interface SiteFooterProps {
  navigate: (route: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ navigate }) => {
  const handleNav = (route: string) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-300 pt-16 pb-12 relative overflow-hidden">
      
      {/* Decorative gold shimmer glow in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-saffron/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Showroom Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-glow-gold">
                <Flame className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-white">
                  MSP <span className="gold-gradient-text">PYRO PARK</span>
                </span>
                <p className="text-xs text-amber-300/80 font-medium uppercase tracking-wider">
                  Associated: Sun Star Fire Works
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Sivakasi factory direct retail showroom offering genuine crackers, sparklers, fountains, aerial novelties, and festive family gift boxes derived directly from our verified 2026 catalog.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  Near AAA College, Virudhunagar – Sivakasi Main Road, Amathur, Sivakasi, Tamil Nadu, India.
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Hotlines: 96989 92410, 94438 68650, 94427 75179</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CreditCard className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Official Showroom Banking: Karur Vysya Bank (S.N.Puram)</span>
              </div>
            </div>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Catalog Groups</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => handleNav(`/category/${c.slug}`)}
                    className="hover:text-amber-300 transition-colors text-slate-400 text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('/products')}
                  className="text-amber-400 font-semibold hover:underline"
                >
                  View All 18 Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Shopping & Guidance
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('/products')} className="hover:text-amber-300 transition-colors">
                  Full 131-Item Catalog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/gift-boxes')} className="hover:text-amber-300 transition-colors">
                  Gift Boxes (18 to 60 Items)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/cart')} className="hover:text-amber-300 transition-colors">
                  Shopping Cart & Order Estimate
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/safety')} className="hover:text-amber-300 transition-colors">
                  Safety Instructions & Storage
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/faq')} className="hover:text-amber-300 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/admin')} className="text-amber-400 font-semibold hover:underline">
                  Admin Verification Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Statutory Policy</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="leading-normal">
                Subject to the Explosives Act and Tamil Nadu regulations. Sale restricted to adults 18+. Transport arranged via authorized booking or showroom pickup only.
              </p>
              <div className="space-y-1">
                <button onClick={() => handleNav('/policies')} className="block text-slate-400 hover:text-amber-300">
                  Terms & Conditions
                </button>
                <button onClick={() => handleNav('/policies')} className="block text-slate-400 hover:text-amber-300">
                  Privacy & Data Policy
                </button>
                <button onClick={() => handleNav('/safety')} className="block text-slate-400 hover:text-amber-300">
                  Fulfillment & Safe Handling
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Statutory Safety Banner */}
        <div className="my-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span className="text-slate-300">
              <strong className="text-amber-300">Statutory Notice:</strong> Fireworks must be handled with care under adult supervision. Keep water buckets ready. Do not light fireworks in closed areas or near flammable substances.
            </span>
          </div>
          <button
            onClick={() => handleNav('/safety')}
            className="px-3.5 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 font-bold hover:bg-amber-400/30 transition-colors flex-shrink-0"
          >
            Read Safety Rules
          </button>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MSP Pyro Park. Associated with Sun Star Fire Works, Sivakasi. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Source: MSP Retail List 2026.pdf</span>
            <span>•</span>
            <span>Amathur, Sivakasi</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
