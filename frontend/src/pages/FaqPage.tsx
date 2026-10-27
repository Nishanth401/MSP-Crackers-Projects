import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, MessageCircle } from 'lucide-react';
import { METADATA } from '../services/catalogService';

interface FaqPageProps {
  navigate: (route: string) => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How can I browse the MSP Pyro Park 2026 product catalog?",
    answer: "You can explore all 131 products across our 18 categories on our Explore Products page. Each item displays its official code number, English name, Tamil translation, pack size, pieces count, list price, and confirmed festival net price."
  },
  {
    question: "How is the 90% discount applied to the products?",
    answer: "In the official MSP Retail List 2026, standard retail crackers have an original list price and a confirmed discount price that reflects 10% of the list price (equivalent to a 90% discount). For example, a box with a list price of ₹1,000 has a verified net price of ₹100. Special gift boxes and family packs have fixed net festival rates."
  },
  {
    question: "Why do some products have a 'Needs Verification' badge?",
    answer: "In our source PDF catalog, a few rows (such as Codes 26, 27, 28, 34, 36, 38, and 52) listed product titles but did not print confirmed price numbers. To guarantee accuracy and transparency, we do not fabricate prices. Instead, these items are flagged for showroom verification via WhatsApp."
  },
  {
    question: "What gift box sizes and combo packs are available?",
    answer: "The 2026 catalog includes 11 curated gift boxes and family packs: Dora (18 items - ₹2,500), Black Berry (21 items - ₹3,000), Dhoni (26 items - ₹4,000), 7 Hills (30 items - ₹5,000), Eagle (35 items - ₹6,000), Hulk (40 items - ₹7,500), VIP Joker (50 items - ₹9,000), VVIP Lucky 7 Horse (60 items - ₹13,000), Mega VVIP Carnival (₹25,000), Silver Family Pack (₹3,000), and Gold Family Pack (₹5,000)."
  },
  {
    question: "Is home delivery available via courier?",
    answer: "Under the Indian Explosives Act, standard postal and commercial air/surface couriers are legally barred from transporting fireworks due to safety regulations. Orders can be collected in person at our Amathur showroom, or despatched via authorized licensed road transport carriers to your nearest district transport hub."
  },
  {
    question: "Can I collect my order directly from the showroom?",
    answer: "Yes! Direct showroom collection is our primary and recommended method. Our showroom is located near AAA College on the Virudhunagar–Sivakasi Main Road in Amathur, Sivakasi. You can inspect your items on pickup."
  },
  {
    question: "What payment methods are accepted?",
    answer: "Showroom pickup orders can be settled in cash or UPI/bank transfer directly at the showroom counter. For transport bookings, official showroom bank details at Karur Vysya Bank (S.N.Puram) are verified before dispatch."
  },
  {
    question: "Who can I contact for bulk orders or showroom guidance?",
    answer: "You can reach our coordinators Sarojini at +91 96989 92410 or Kaliraja Prabhu at +91 94438 68650, or call our showroom hotline at +91 94427 75179."
  }
];

export const FaqPage: React.FC<FaqPageProps> = ({ navigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-amber-300">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">Frequently Asked Questions</span>
        </nav>

        {/* Title */}
        <div className="mb-10 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>CUSTOMER ASSISTANCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to know about our 2026 catalog pricing, gift boxes, showroom collection, and legal policies.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help */}
        <div className="mt-12 p-8 rounded-3xl glass-panel bg-slate-900 border border-amber-400/20 text-center space-y-4">
          <h3 className="font-bold text-white text-base">Still have questions?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our showroom team is available everyday from 9:00 AM to 9:00 PM to help you select the ideal crackers for your festival.
          </p>
          <a
            href={`https://wa.me/91${METADATA.whatsappNumbers[0]}?text=${encodeURIComponent("Vanakkam MSP Pyro Park! I have a question regarding your 2026 catalog.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
