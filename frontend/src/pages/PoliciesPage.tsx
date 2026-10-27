import React, { useState } from 'react';
import { ShieldCheck, FileText, ChevronRight, Scale, Truck, RotateCcw } from 'lucide-react';

interface PoliciesPageProps {
  navigate: (route: string) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'shipping' | 'refunds'>('terms');

  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">Store Policies & Legal Terms</span>
        </nav>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
            Store Policies & Statutory Terms
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            MSP Pyro Park operating terms, legal compliance statements, and customer fulfillment policies.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-slate-800 mb-8 scrollbar-thin">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'shipping'
                ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Shipping & Transport</span>
          </button>

          <button
            onClick={() => setActiveTab('refunds')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'refunds'
                ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Cancellation & Returns</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-6">
          
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="text-xl font-bold text-white">Terms of Sale & Use</h2>
              <p>
                By placing an order request or purchasing products from MSP Pyro Park, you agree to comply with all applicable central and state laws governing explosive materials in India, including the Explosives Act, 1884, and the Explosive Rules, 2008.
              </p>
              <h3 className="font-bold text-white text-base pt-2">1. Eligibility</h3>
              <p>
                Purchasers must be at least 18 years of age. MSP Pyro Park reserves the right to request proof of age prior to order fulfillment or showroom collection.
              </p>
              <h3 className="font-bold text-white text-base pt-2">2. Pricing & Catalog Data</h3>
              <p>
                All prices are stated in Indian Rupees (INR) and are based on the published MSP Retail List 2026. While every effort is made to maintain catalog accuracy, prices and availability remain subject to showroom verification at the time of order booking.
              </p>
              <h3 className="font-bold text-white text-base pt-2">3. Product Performance</h3>
              <p>
                Fireworks performance depends on environmental conditions, storage, and handling. We do not guarantee explosive visual heights or sound decibels beyond manufacturer tolerances.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="text-xl font-bold text-white">Privacy & Data Handling</h2>
              <p>
                MSP Pyro Park respects your personal privacy. We collect customer contact details (name, phone number, delivery address) exclusively for processing order reservations, confirming showroom pickup, and coordinating transport carrier bookings.
              </p>
              <h3 className="font-bold text-white text-base pt-2">Data Protection</h3>
              <p>
                We do not sell, rent, or trade customer information to third-party marketing companies. Personal data is retained solely for statutory audit compliance and order completion.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="text-xl font-bold text-white">Transport & Fulfillment Policy</h2>
              <p>
                Due to statutory regulations on hazardous materials, pyrotechnic goods cannot be sent via domestic postal couriers, passenger vehicles, or air shipping.
              </p>
              <h3 className="font-bold text-white text-base pt-2">1. Showroom Collection (Recommended)</h3>
              <p>
                Customers can collect packed orders directly from our showroom in Amathur, Sivakasi. Free of transport fees.
              </p>
              <h3 className="font-bold text-white text-base pt-2">2. Heavy Road Transport Booking</h3>
              <p>
                For orders across Tamil Nadu and permissible destinations, goods are dispatched through licensed heavy transport carriers to your district transport hub. The customer is responsible for collecting the parcel from the local transport godown.
              </p>
            </div>
          )}

          {activeTab === 'refunds' && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="text-xl font-bold text-white">Cancellation & Replacement Policy</h2>
              <p>
                Due to the sensitive and perishable chemical nature of pyrotechnic fireworks, returned products cannot be accepted back into inventory once they have left the showroom or transport hub.
              </p>
              <h3 className="font-bold text-white text-base pt-2">Order Cancellations</h3>
              <p>
                Order reservations can be freely cancelled or modified prior to showroom dispatch by contacting our coordinators on WhatsApp at +91 96989 92410.
              </p>
              <h3 className="font-bold text-white text-base pt-2">Damaged or Mismatched Items</h3>
              <p>
                In the rare event of transit damage or missing pack items, notify our team within 24 hours of collection with photographs for immediate replacement or credit adjustment.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
