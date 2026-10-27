import React, { useState } from 'react';
import { MessageCircle, Phone, X, Send } from 'lucide-react';
import { METADATA } from '../../services/catalogService';
import { useCart } from '../../context/CartContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const { items, subtotal } = useCart();

  const primaryPhone = METADATA.whatsappNumbers[0] || '7339620387';

  const sendWhatsApp = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/91${primaryPhone}?text=${encoded}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const sendCartInquiry = () => {
    if (items.length === 0) {
      sendWhatsApp("Vanakkam MSP Pyro Park! I would like to enquire about your 2026 crackers catalog and gift boxes availability.");
      return;
    }
    const itemLines = items.map(i => `• ${i.product.name} (Code #${i.product.code}) x ${i.quantity} = ₹${((i.product.netPrice ?? 0) * i.quantity).toLocaleString('en-IN')}`).join('\n');
    const msg = `Vanakkam MSP Pyro Park! I am interested in placing an order for the following items from your 2026 Retail Catalog:\n\n${itemLines}\n\n*Estimated Total: ₹${subtotal.toLocaleString('en-IN')}*\n\nPlease confirm availability and showroom collection details.`;
    sendWhatsApp(msg);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Popover modal */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-2xl glass-panel p-5 shadow-2xl border border-emerald-500/30 text-white animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <MessageCircle className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">MSP Pyro Park WhatsApp</h4>
                <p className="text-[10px] text-emerald-400 font-medium">Showroom Desk: +91 {primaryPhone}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2 text-xs">
            <p className="text-slate-300">
              Direct connection with our Amathur showroom team for price confirmation, gift box details, and order inquiries.
            </p>

            {items.length > 0 && (
              <button
                onClick={sendCartInquiry}
                className="w-full p-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-600/40 font-bold flex items-center justify-center gap-2 transition-colors text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enquire Current Cart ({items.length} items - ₹{subtotal.toLocaleString('en-IN')})</span>
              </button>
            )}

            <div className="pt-2">
              <label className="text-[11px] text-slate-400 block mb-1">Or type your query:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Bulk discount on 40 items gift box..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customMsg.trim()) {
                      sendWhatsApp(customMsg);
                    }
                  }}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
                <button
                  onClick={() => customMsg.trim() ? sendWhatsApp(customMsg) : sendCartInquiry()}
                  className="px-3 py-2 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Showroom: 9:00 AM – 9:00 PM</span>
            <a href={`tel:${primaryPhone}`} className="text-emerald-400 font-bold flex items-center gap-1 hover:underline">
              <Phone className="w-3 h-3" /> Call Instead
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110 relative group"
        title="WhatsApp Showroom Support"
      >
        <MessageCircle className="w-7 h-7 text-slate-950" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-black text-slate-950">
          !
        </span>
      </button>

    </div>
  );
};
