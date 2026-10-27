import React from 'react';
import { 
  Building2, 
  FileCheck2, 
  MessageSquare, 
  ShieldAlert, 
  MapPin, 
  Receipt,
  Scale
} from 'lucide-react';
import { METADATA } from '../../services/catalogService';

export const ShowroomTrustSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-950/80 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Verified Showroom Facts</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            Why Shop with MSP Pyro Park
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Factual business credentials and direct showroom benefits based on our official 2026 catalog and Sivakasi retail location.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl glass-panel bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Sivakasi Showroom</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Physical retail showroom located on the Virudhunagar–Sivakasi Main Road near AAA College, Amathur. Customers can inspect products and collect directly.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-saffron/10 border border-brand-saffron/20 text-brand-saffron flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Direct Catalog Pricing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% authentic prices derived from the MSP Retail List 2026, offering confirmed net rates calculated at up to 90% discount on standard crackers.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Direct WhatsApp Desk</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct assistance with showroom coordinators Sarojini (+91 96989 92410) and Kaliraja Prabhu (+91 94438 68650) for immediate order confirmations.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-400/10 border border-blue-400/20 text-blue-400 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Legal & Transport Policy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strict adherence to Indian explosives transport regulations. No hazardous courier shipment. Orders handled via authorized pickup or booking.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
