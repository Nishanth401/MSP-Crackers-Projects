import React, { useState } from 'react';
import { METADATA } from '../services/catalogService';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  CreditCard, 
  Clock, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';

interface ContactPageProps {
  navigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    const encoded = encodeURIComponent(
      `Vanakkam MSP Pyro Park! Customer Inquiry:\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:* ${message}`
    );
    window.open(`https://wa.me/91${METADATA.whatsappNumbers[0]}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">Contact & Showroom</span>
        </nav>

        {/* Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white">
            Need Help Choosing?
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Contact the showroom to confirm current product details, prices, availability, and purchasing options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Direct Showroom Info & Contacts */}
          <div className="space-y-6">
            
            {/* Showroom Coordinates Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="font-display text-xl font-black text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Showroom Location</span>
              </h2>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-white text-sm">MSP Pyro Park (Showroom)</p>
                <p>Near AAA College, Virudhunagar – Sivakasi Main Road</p>
                <p>Amathur, Sivakasi, Tamil Nadu, India.</p>
                <p className="text-[11px] text-amber-300/80 font-medium">Associated with Sun Star Fire Works</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Showroom Hours: 9:00 AM – 9:00 PM (Monday to Sunday during season)</span>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Contacts */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="font-display text-xl font-black text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Verified Contact Details</span>
              </h2>

              <div>
                <a
                  href={`tel:7339620387`}
                  className="p-5 rounded-2xl bg-slate-950 border border-amber-400/40 hover:border-amber-400 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="font-display font-black text-white text-2xl tracking-wide group-hover:text-amber-300 transition-colors">
                      +91 7339620387
                    </div>
                    <div className="text-xs text-amber-300 font-semibold mt-1">
                      Official Showroom Hotline & WhatsApp
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                </a>
              </div>
            </div>

            {/* Banking Details Note from PDF */}
            <div className="p-6 rounded-3xl glass-panel bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs text-amber-300">
                <CreditCard className="w-4 h-4" />
                <span>Official Showroom Accounts (From 2026 Price List)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Official accounts listed at <strong>Karur Vysya Bank, S.N.Puram Branch</strong> (IFSC: <code>KVBL0001810</code>) for MSP Pyro Park (A/c: 1810283000000030), Ganapathy Traders (A/c: 1810280000000336), and Sunstar Fireworks (A/c: 1810280000000371).
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-amber-400/30 space-y-6 shadow-2xl">
            <h2 className="font-display text-2xl font-black text-white">
              Send an Online Inquiry
            </h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-white text-base">Inquiry Dispatched!</h3>
                <p className="text-xs text-slate-300">
                  Your inquiry message was formatted and directed to our showroom WhatsApp desk. Our team will respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-xs text-white font-semibold hover:bg-slate-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Your Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Your Message or Order Questions *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask about bulk prices, specific items like flower pots or gift packs, collection timings, etc."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl btn-saffron font-black text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Showroom Desk</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Inquiries are forwarded directly to our showroom WhatsApp desk at +91 7339620387.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
