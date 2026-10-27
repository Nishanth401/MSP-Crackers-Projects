import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Percent, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { METADATA } from '../../services/catalogService';

interface CartSummaryProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ 
  onCheckout, 
  onContinueShopping 
}) => {
  const { subtotal, listTotal, savings, items, itemCount } = useCart();

  const handleWhatsAppEnquiry = () => {
    const itemLines = items.map(i => `• ${i.product.name} (Code #${i.product.code}) x ${i.quantity} = ₹${((i.product.netPrice ?? 0) * i.quantity).toLocaleString('en-IN')}`).join('\n');
    const msg = encodeURIComponent(
      `Vanakkam MSP Pyro Park! Here is my 2026 festival order estimate:\n\n${itemLines}\n\n*Total Confirmed Amount: ₹${subtotal.toLocaleString('en-IN')}*\n*Calculated Savings: ₹${savings.toLocaleString('en-IN')}*\n\nPlease confirm availability for collection at your Amathur showroom.`
    );
    window.open(`https://wa.me/91${METADATA.whatsappNumbers[0]}?text=${msg}`, '_blank');
  };

  return (
    <div className="rounded-3xl glass-panel bg-slate-900/90 border border-amber-400/30 p-6 sm:p-8 space-y-6 sticky top-28 shadow-xl">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="font-display text-xl font-black text-white">
          Order Summary
        </h3>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300">
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Calculations */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-slate-400">
          <span>Printed List Price Total:</span>
          <span className="font-mono line-through">₹{listTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>

        {savings > 0 && (
          <div className="flex items-center justify-between text-emerald-400 font-bold bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20 text-xs">
            <span className="flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5" />
              <span>Catalog Discount Savings:</span>
            </span>
            <span className="font-mono text-sm">-₹{savings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span>Showroom Pickup Fee:</span>
          <span className="text-emerald-400 font-bold">FREE (Amathur Showroom)</span>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Estimated Total:</span>
            <span className="text-[10px] text-slate-500">(Net festival rates in INR)</span>
          </div>
          <span className="font-display text-3xl font-black text-amber-300">
            ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Statutory Guidance */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Statutory Fulfillment Notice</span>
        </div>
        <p>
          Fireworks transport in India is subject to explosive carrier regulations. Submitting an order creates an authorized order reservation confirmed directly by our Sivakasi showroom.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onCheckout}
          className="w-full py-4 rounded-2xl btn-gold text-slate-950 font-black text-base flex items-center justify-center gap-2.5 shadow-glow-gold transition-all"
        >
          <span>Proceed to Order Reservation</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleWhatsAppEnquiry}
          className="w-full py-3 rounded-2xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Reserve via WhatsApp Showroom Desk</span>
        </button>

        <button
          type="button"
          onClick={onContinueShopping}
          className="w-full py-2 text-center text-xs text-slate-400 hover:text-amber-300 font-medium transition-colors"
        >
          ← Continue Browsing Catalog
        </button>
      </div>

    </div>
  );
};
