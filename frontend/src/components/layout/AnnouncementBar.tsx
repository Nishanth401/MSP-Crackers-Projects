import React from 'react';
import { Phone, Sparkles, MapPin } from 'lucide-react';
import { METADATA } from '../../services/catalogService';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-600 via-brand-saffron to-amber-700 text-slate-950 text-xs font-semibold py-2 px-4 shadow-sm border-b border-amber-400/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Sparkles className="w-4 h-4 text-slate-950 animate-pulse flex-shrink-0" />
          <span>
            <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold mr-1.5 uppercase tracking-wider">
              2026 Catalog
            </span>
            MSP Pyro Park — Sivakasi Factory Direct Retail Showroom • Up to 90% Discount
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-950">
          <a 
            href={`tel:${METADATA.contactNumbers[0]}`}
            className="flex items-center gap-1 hover:underline text-[11px] font-bold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 {METADATA.contactNumbers[0]}</span>
          </a>
          <span className="hidden md:inline-block opacity-60">•</span>
          <span className="hidden md:flex items-center gap-1 text-[11px]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Near AAA College, Amathur, Sivakasi</span>
          </span>
        </div>
      </div>
    </div>
  );
};
