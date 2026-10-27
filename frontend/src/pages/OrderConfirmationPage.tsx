import React from 'react';
import { OrderRecord } from '../types';
import { METADATA } from '../services/catalogService';
import { 
  CheckCircle2, 
  Printer, 
  MessageCircle, 
  Phone, 
  MapPin, 
  CreditCard, 
  Package, 
  ArrowLeft,
  Share2
} from 'lucide-react';

interface OrderConfirmationPageProps {
  order: OrderRecord | null;
  navigate: (route: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ 
  order, 
  navigate 
}) => {
  if (!order) {
    return (
      <div className="py-20 text-center text-white bg-slate-950 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No recent order found</h2>
        <button onClick={() => navigate('/products')} className="px-6 py-3 rounded-xl btn-gold text-xs font-bold">
          Return to Catalog
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppSend = () => {
    const lines = order.items.map(i => `• ${i.name} (Code #${i.code}) x ${i.quantity} = ₹${i.lineTotal.toLocaleString('en-IN')}`).join('\n');
    const msg = encodeURIComponent(
      `Vanakkam MSP Pyro Park! I have submitted an Order Reservation:\n\n*Order Ref: ${order.orderReference}*\n*Customer: ${order.customerName} (${order.customerPhone})*\n*Fulfillment: ${order.deliveryMethod === 'SHOWROOM_PICKUP' ? 'Showroom Pickup (Amathur)' : 'Authorized Transport Hub'}*\n\n*Items:*\n${lines}\n\n*Total Payable: ₹${order.total.toLocaleString('en-IN')}*\n\nPlease confirm stock packing and showroom pickup details.`
    );
    window.open(`https://wa.me/91${METADATA.whatsappNumbers[0]}?text=${msg}`, '_blank');
  };

  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Banner */}
        <div className="text-center space-y-4 mb-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider">
            Order Request Received
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
            Thank You, {order.customerName}!
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Your festival order reference has been registered with MSP Pyro Park. We will confirm item allocation for your reservation.
          </p>
          <div className="font-mono text-lg font-bold text-amber-300 bg-slate-900 px-4 py-2 rounded-xl inline-block border border-slate-800">
            Booking Reference: {order.orderReference}
          </div>
        </div>

        {/* Action Bar (Print / WhatsApp) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs text-white font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={handleWhatsAppSend}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send to Showroom WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Printable Order Slip Card */}
        <div className="rounded-3xl glass-panel bg-slate-900 border border-amber-400/30 p-6 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Slip Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h2 className="font-display text-xl font-black text-white">
                MSP PYRO PARK
              </h2>
              <p className="text-xs text-amber-300 font-semibold">
                Associated: Sun Star Fire Works, Sivakasi
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Near AAA College, Virudhunagar – Sivakasi Main Road, Amathur, Sivakasi.
              </p>
            </div>

            <div className="text-right text-xs text-slate-300">
              <div className="font-mono font-bold text-amber-300 text-sm">{order.orderReference}</div>
              <div className="text-[11px] text-slate-400">Date: {new Date(order.createdAt).toLocaleDateString()}</div>
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] mt-1">
                Status: {order.status}
              </span>
            </div>
          </div>

          {/* Customer & Fulfillment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Details</span>
              <div className="font-bold text-white text-sm">{order.customerName}</div>
              <div>Phone: +91 {order.customerPhone}</div>
              {order.customerEmail && <div>Email: {order.customerEmail}</div>}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fulfillment Choice</span>
              <div className="font-bold text-amber-300">
                {order.deliveryMethod === 'SHOWROOM_PICKUP' ? 'Showroom Direct Collection' : 'District Heavy Transport Hub'}
              </div>
              {order.address && (
                <div className="text-slate-400">{order.address}, {order.city} - {order.pincode}</div>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3 text-right">Net Price</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {order.items.map((item) => (
                  <tr key={item.code}>
                    <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">#{item.code}</td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-amber-300/70">{item.tamil}</div>
                    </td>
                    <td className="py-2.5 px-3">{item.pack}</td>
                    <td className="py-2.5 px-3 text-right font-mono">₹{item.price.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-white">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-300">
                      ₹{item.lineTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal:</span>
                <span className="font-mono">₹{order.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              {order.discountTotal > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount Savings:</span>
                  <span>-₹{order.discountTotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Confirmed Total:</span>
                <span className="text-amber-300 font-display text-xl">₹{order.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Bank Settlement Info for Showroom Reference */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <CreditCard className="w-4 h-4" />
              <span>Showroom Direct Payment Accounts (For Verified Reference)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-400 pt-1">
              {METADATA.bankAccounts.map((b, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                  <div className="font-bold text-white">{b.entity}</div>
                  <div>A/c: <span className="font-mono text-amber-300">{b.accountNo}</span></div>
                  <div>IFSC: <span className="font-mono">{b.ifsc}</span></div>
                  <div>{b.bank} ({b.branch})</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
