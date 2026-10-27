import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutForm, DeliveryMethod, OrderRecord } from '../types';
import { METADATA } from '../services/catalogService';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  Building2, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  CreditCard
} from 'lucide-react';

interface CheckoutPageProps {
  navigate: (route: string) => void;
  onOrderComplete: (order: OrderRecord) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  navigate, 
  onOrderComplete 
}) => {
  const { items, subtotal, listTotal, savings, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    deliveryMethod: 'SHOWROOM_PICKUP',
    notes: '',
    ageConfirmed: false,
    safetyAgreed: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!form.name.trim()) errs.name = 'Please enter your full name';
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (form.deliveryMethod === 'AUTHORIZED_TRANSPORT') {
      if (!form.address.trim()) errs.address = 'Street address is required for transport booking';
      if (!form.city.trim()) errs.city = 'City or District is required';
      if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim())) {
        errs.pincode = 'Valid 6-digit PIN code required';
      }
    }

    if (!form.ageConfirmed) {
      errs.ageConfirmed = 'You must affirm that you are at least 18 years of age to purchase fireworks';
    }

    if (!form.safetyAgreed) {
      errs.safetyAgreed = 'You must acknowledge fireworks safety and handling guidelines';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `MSP-2026-${randomSuffix}`;

    const newOrder: OrderRecord = {
      orderReference: orderRef,
      customerName: form.name.trim(),
      customerPhone: form.phone.trim(),
      customerEmail: form.email.trim() || undefined,
      address: form.address.trim() || undefined,
      city: form.city.trim() || undefined,
      pincode: form.pincode.trim() || undefined,
      deliveryMethod: form.deliveryMethod,
      items: items.map(i => ({
        code: i.product.code,
        name: i.product.name,
        tamil: i.product.tamil,
        pack: i.product.pack,
        price: i.product.netPrice ?? 0,
        quantity: i.quantity,
        lineTotal: (i.product.netPrice ?? 0) * i.quantity
      })),
      subtotal,
      discountTotal: savings,
      total: subtotal,
      status: 'RECEIVED',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      onOrderComplete(newOrder);
      clearCart();
      navigate(`/order-confirmation/${orderRef}`);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-white bg-slate-950 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="px-6 py-3 rounded-xl btn-gold text-xs font-bold">
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <button onClick={() => navigate('/cart')} className="hover:text-amber-300">Cart</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">Order Reservation</span>
        </nav>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
            Order Reservation & Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Provide your contact details and fulfillment choice. Our Sivakasi showroom team will verify product availability and generate your booking slip.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Form (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Contact Information */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-3">
                <User className="w-5 h-5 text-amber-400" />
                <span>1. Customer Contact Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Mobile Number (WhatsApp Enabled) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 2. Fulfillment Method Selection */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>2. Fulfillment & Collection Method</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Option A: Showroom Pickup */}
                <div
                  onClick={() => setForm({ ...form, deliveryMethod: 'SHOWROOM_PICKUP' })}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.deliveryMethod === 'SHOWROOM_PICKUP'
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Showroom Direct Pickup</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                      FREE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Collect directly from our showroom near AAA College, Amathur, Sivakasi. Pay on collection.
                  </p>
                </div>

                {/* Option B: Authorized Transport Booking */}
                <div
                  onClick={() => setForm({ ...form, deliveryMethod: 'AUTHORIZED_TRANSPORT' })}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.deliveryMethod === 'AUTHORIZED_TRANSPORT'
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Authorized Heavy Transport</span>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                      Transport Hub
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Despatched via licensed heavy cargo carrier to your nearest district transport hub (Tamil Nadu & permissible locations).
                  </p>
                </div>

              </div>

              {/* Address Fields if Transport selected */}
              {form.deliveryMethod === 'AUTHORIZED_TRANSPORT' && (
                <div className="pt-4 border-t border-slate-800 space-y-4 animate-in fade-in">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                    <strong>Note:</strong> Standard commercial parcel services (e.g., speed post or express air couriers) are legally barred from carrying pyrotechnic goods in India. Goods are booked via licensed road transport services for parcel hub collection.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3">
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Street Address / Landmark <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="House / Shop address and landmark"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      {errors.address && <p className="text-red-400 text-[11px] mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        City / District <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Madurai"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      {errors.city && <p className="text-red-400 text-[11px] mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        disabled
                        value="Tamil Nadu"
                        className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-400 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        PIN Code <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 626001"
                        maxLength={6}
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      {errors.pincode && <p className="text-red-400 text-[11px] mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Statutory Legal Affirmation */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>3. Legal & Safety Affirmation</span>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={form.ageConfirmed}
                    onChange={(e) => setForm({ ...form, ageConfirmed: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded accent-amber-400 bg-slate-950 border-slate-700"
                  />
                  <span>
                    I confirm that I am at least <strong className="text-amber-300">18 years of age</strong> and legally eligible to purchase fireworks under Indian Law.
                  </span>
                </label>
                {errors.ageConfirmed && <p className="text-red-400 text-[11px]">{errors.ageConfirmed}</p>}

                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={form.safetyAgreed}
                    onChange={(e) => setForm({ ...form, safetyAgreed: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded accent-amber-400 bg-slate-950 border-slate-700"
                  />
                  <span>
                    I agree to follow all safety guidelines: adult supervision, open outdoor spaces, water bucket nearby, and compliance with local municipal noise guidelines.
                  </span>
                </label>
                {errors.safetyAgreed && <p className="text-red-400 text-[11px]">{errors.safetyAgreed}</p>}
              </div>
            </div>

          </div>

          {/* Right Summary Sidebar (1 col) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-3xl glass-panel bg-slate-900 border border-amber-400/30 space-y-4 sticky top-28 shadow-xl">
              <h3 className="font-display text-lg font-black text-white border-b border-slate-800 pb-3">
                Reservation Overview
              </h3>

              {/* Items Mini List */}
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 scrollbar-thin text-xs">
                {items.map(i => (
                  <div key={i.product.code} className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <div className="truncate mr-2">
                      <span className="font-bold text-white">#{i.product.code} {i.product.name}</span>
                      <span className="block text-[10px] text-slate-400">Qty: {i.quantity} ({i.product.pack})</span>
                    </div>
                    <span className="font-mono text-amber-300 font-bold whitespace-nowrap">
                      ₹{((i.product.netPrice ?? 0) * i.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>List Price:</span>
                  <span className="line-through">₹{listTotal.toLocaleString('en-IN')}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>90% Discount Savings:</span>
                    <span>-₹{savings.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Payable at Showroom:</span>
                  <span className="text-amber-300 font-display text-xl">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl btn-gold text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-glow-gold disabled:opacity-50"
              >
                <span>{submitting ? 'Generating Booking...' : 'Submit Order Reservation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-normal">
                Submitting generates a permanent order reference and forwards your request to the showroom desk for instant verification.
              </p>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
