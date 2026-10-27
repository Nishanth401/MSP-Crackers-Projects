import React from 'react';
import { ShieldCheck, AlertTriangle, Flame, Droplets, CheckCircle2, ChevronRight, Scale, Volume2 } from 'lucide-react';

interface SafetyPageProps {
  navigate: (route: string) => void;
}

export const SafetyPage: React.FC<SafetyPageProps> = ({ navigate }) => {
  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">Safety & Legal Information</span>
        </nav>

        {/* Title */}
        <div className="mb-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RESPONSIBLE CELEBRATION</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white">
            Safety & Legal Compliance
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Fireworks are regulated products. Celebrate responsibly by adhering to manufacturer guidelines, Indian explosive statutes, and Tamil Nadu state rules.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6 text-sm text-slate-300">
          
          {/* 1. Legal Requirements & Purchase Conditions */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>1. Statutory Purchase & Transport Regulations</span>
            </h2>
            <div className="space-y-2 text-xs leading-relaxed text-slate-300">
              <p>
                Under the Indian Explosives Act and Tamil Nadu fireworks trade guidelines:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
                <li><strong className="text-white">Age Requirement:</strong> Sale and possession of fireworks is strictly prohibited to individuals under 18 years of age without direct adult supervision.</li>
                <li><strong className="text-white">Transport Restrictions:</strong> Ordinary courier services, passenger buses, express trains, and air freight are legally prohibited from conveying pyrotechnic products. Fulfilled orders are handled exclusively via direct showroom pickup at Amathur or licensed heavy transport carrier booking.</li>
                <li><strong className="text-white">Permitted Zones:</strong> Sales are subject to local municipal permissions and temporal festive exemptions granted by local authorities.</li>
              </ul>
            </div>
          </div>

          {/* 2. DOs & DON'Ts Checklist */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>2. Handling Guidelines — DOs and DON'Ts</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* DOs */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <span className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> ALWAYS DO:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• Light fireworks outdoors in a clear, open space.</li>
                  <li>• Use an extended incense stick or long sparkler to ignite the fuse.</li>
                  <li>• Keep two buckets of water and sand nearby for emergency readiness.</li>
                  <li>• Wear protective cotton clothes and footwear while lighting.</li>
                  <li>• Dispose of spent sparklers and cones by plunging into water.</li>
                </ul>
              </div>

              {/* DON'Ts */}
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-2">
                <span className="font-bold text-red-300 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> NEVER DO:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• Never carry fireworks loose inside pockets.</li>
                  <li>• Never attempt to re-ignite a firework that did not burst.</li>
                  <li>• Never light crackers inside glass bottles or metal containers.</li>
                  <li>• Never throw crackers at people, animals, or vehicles.</li>
                  <li>• Never ignite fireworks under balconies or near power lines.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* 3. Noise & Environmental Consideration */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-amber-400" />
              <span>3. Decibel & Neighborhood Courtesy</span>
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Respect neighborhood guidelines and Supreme Court/State regulations governing permitted bursting hours during festive days (typically 6:00 AM – 7:00 AM and 7:00 PM – 8:00 PM). Avoid bursting high-decibel sound crackers near hospitals, schools, and animal shelters.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
