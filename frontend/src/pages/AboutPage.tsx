import React from 'react';
import { METADATA } from '../services/catalogService';
import { Building2, Flame, MapPin, Phone, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">About Us</span>
        </nav>

        {/* Header */}
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>SIVAKASI FACTORY DIRECT SHOWROOM</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white">
            Your Festival Shopping Destination
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            MSP Pyro Park presents a catalog of festive fireworks, sparklers, fountains, and gift packs. Explore our listed products and contact our showroom to confirm current availability, pricing, and purchasing options.
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl glass-panel bg-slate-900 border border-slate-800 p-8 sm:p-10 space-y-8 text-sm text-slate-300 leading-relaxed shadow-xl">
          
          <div className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Showroom & Manufacturer Association</span>
            </h2>
            <p>
              MSP Pyro Park is an established retail showroom located in Amathur, Sivakasi, along the primary Virudhunagar–Sivakasi highway directly adjacent to AAA College. Our retail catalog is published in direct association with <strong>Sun Star Fire Works</strong>, offering factory-direct fireworks varieties across 18 specialized categories.
            </p>
            <p>
              Every year, we release our official Retail Price List featuring single sound crackers, ground chakkers, flower pots, bombs, laris, sky rockets, novelties, repeating multi-shots, electric and colour sparklers, and festival gift packs designed for family celebrations.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-saffron" />
              <span>Catalog Transparency & Pricing Policy</span>
            </h2>
            <p>
              Our 2026 digital catalog is a direct, verified representation of the printed <strong>MSP Retail List 2026</strong>. Standard crackers in the catalog reflect discounts of up to 90% against printed list prices. Where product rows in the source document were unpriced or unconfirmed, we explicitly flag them as requiring showroom verification rather than displaying guessed prices to customers.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Statutory Safety & Responsible Retail</span>
            </h2>
            <p>
              Fireworks retail in India is governed by the Explosives Act and Tamil Nadu safety guidelines. MSP Pyro Park strictly enforces legal sale conditions: sales are restricted to adults aged 18 and above, and customer orders are fulfilled through authorized showroom collection or licensed transport carrier hubs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-bold text-white text-base">Showroom Location & Hotlines</div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>MSP Pyro Park (Showroom), Near AAA College, Virudhunagar – Sivakasi Main Road, Amathur, Sivakasi, Tamil Nadu, India.</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Showroom Hotline & WhatsApp: +91 7339620387</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
