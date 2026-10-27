import React, { useState } from 'react';
import { ALL_PRODUCTS, CATEGORIES, METADATA } from '../services/catalogService';
import { Product, OrderRecord } from '../types';
import { 
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  Edit, 
  Search, 
  Download, 
  Layers, 
  ShoppingBag, 
  Activity, 
  ChevronRight,
  Sparkles,
  Save,
  RotateCcw
} from 'lucide-react';

interface AdminPageProps {
  navigate: (route: string) => void;
  orders: OrderRecord[];
  onUpdateOrderStatus?: (orderRef: string, newStatus: any) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ 
  navigate, 
  orders,
  onUpdateOrderStatus 
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'queue' | 'products' | 'orders' | 'audit'>('overview');
  const [productsState, setProductsState] = useState<Product[]>(ALL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [auditLogs, setAuditLogs] = useState<{ id: number; timestamp: string; action: string; details: string }[]>([
    { id: 1, timestamp: new Date().toLocaleTimeString(), action: 'PDF Import', details: 'Imported 131 records from MSP Retail List 2026.pdf' },
    { id: 2, timestamp: new Date().toLocaleTimeString(), action: 'Audit Scan', details: 'Identified 9 unpriced rows flagged as NEEDS_VERIFICATION' }
  ]);

  // Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editListPrice, setEditListPrice] = useState<string>('');
  const [editNetPrice, setEditNetPrice] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'msp2026admin' || password === 'admin') {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect admin password. (Hint: msp2026admin)');
    }
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setEditListPrice(p.listPrice ? String(p.listPrice) : '');
    setEditNetPrice(p.netPrice ? String(p.netPrice) : '');
  };

  const saveProduct = () => {
    if (!editingProduct) return;
    const listP = editListPrice ? parseFloat(editListPrice) : null;
    const netP = editNetPrice ? parseFloat(editNetPrice) : null;
    let disc: number | null = null;
    if (listP && netP) {
      disc = Math.round(((listP - netP) / listP) * 100);
    }

    setProductsState(prev => prev.map(item => {
      if (item.code === editingProduct.code) {
        return {
          ...item,
          listPrice: listP,
          netPrice: netP,
          discountPercent: disc,
          status: netP !== null ? 'VERIFIED' : 'NEEDS_VERIFICATION'
        };
      }
      return item;
    }));

    setAuditLogs(prev => [
      {
        id: prev.length + 1,
        timestamp: new Date().toLocaleTimeString(),
        action: 'Price Update',
        details: `Updated Product #${editingProduct.code} (${editingProduct.name}) — List: ₹${listP}, Net: ₹${netP}`
      },
      ...prev
    ]);

    setEditingProduct(null);
  };

  const exportCSV = () => {
    const headers = ['Code', 'Name', 'Tamil', 'Category', 'Pack', 'Pieces', 'ListPrice', 'NetPrice', 'Discount', 'Status', 'Page'];
    const rows = productsState.map(p => [
      p.code,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.tamil.replace(/"/g, '""')}"`,
      p.category,
      p.pack,
      p.pieces,
      p.listPrice ?? '',
      p.netPrice ?? '',
      p.discountPercent ?? '',
      p.status,
      p.page
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `msp_pyro_park_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!authenticated) {
    return (
      <div className="py-20 bg-slate-950 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl glass-panel bg-slate-900 border border-amber-400/30 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center mx-auto shadow-glow-gold">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <div>
            <h1 className="font-display text-2xl font-black text-white">
              MSP Pyro Park Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Showroom Catalog Management & Verification Queue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-center text-sm focus:outline-none focus:border-amber-400"
              />
              {authError && <p className="text-red-400 text-xs mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl btn-gold text-slate-950 font-black text-xs shadow-glow-gold"
            >
              Authenticate & Enter Portal
            </button>
          </form>

          <p className="text-[11px] text-slate-500">
            For demonstration: password is <code className="text-amber-400">msp2026admin</code>
          </p>
        </div>
      </div>
    );
  }

  const unverifiedCount = productsState.filter(p => p.status === 'NEEDS_VERIFICATION').length;
  const verifiedCount = productsState.filter(p => p.status === 'VERIFIED').length;

  const filteredProducts = productsState.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tamil.toLowerCase().includes(search.toLowerCase()) ||
    String(p.code) === search
  );

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                ADMIN CONSOLE
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Live Session
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
              MSP Pyro Park Showroom Administration
            </h1>
            <p className="text-xs text-slate-400">
              Verified 2026 Catalog Management • Order Processing • Audit Logs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400/40 text-xs text-amber-300 font-bold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="px-4 py-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold hover:bg-red-500/30 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'overview' ? 'bg-amber-400 text-slate-950 shadow-glow-gold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'queue' ? 'bg-amber-400 text-slate-950 shadow-glow-gold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <span>Verification Queue</span>
            {unverifiedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500 text-white font-black">
                {unverifiedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'products' ? 'bg-amber-400 text-slate-950 shadow-glow-gold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Catalog Inventory (131)
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-amber-400 text-slate-950 shadow-glow-gold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <span>Order Reservations</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-bold">
              {orders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'audit' ? 'bg-amber-400 text-slate-950 shadow-glow-gold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Audit Log ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl glass-panel bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400 font-semibold mb-1">Total Catalog Items</div>
                <div className="font-display text-3xl font-black text-white">{productsState.length}</div>
                <div className="text-[11px] text-amber-400 mt-1">Source: MSP Retail List 2026.pdf</div>
              </div>
              <div className="p-5 rounded-2xl glass-panel bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400 font-semibold mb-1">Confirmed Verified Prices</div>
                <div className="font-display text-3xl font-black text-emerald-400">{verifiedCount}</div>
                <div className="text-[11px] text-emerald-400/80 mt-1">93.1% row alignment</div>
              </div>
              <div className="p-5 rounded-2xl glass-panel bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400 font-semibold mb-1">Needs Showroom Review</div>
                <div className="font-display text-3xl font-black text-yellow-400">{unverifiedCount}</div>
                <div className="text-[11px] text-yellow-300/80 mt-1">Blank cells in source PDF</div>
              </div>
              <div className="p-5 rounded-2xl glass-panel bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400 font-semibold mb-1">Order Reservations</div>
                <div className="font-display text-3xl font-black text-brand-saffron">{orders.length}</div>
                <div className="text-[11px] text-slate-400 mt-1">Live customer requests</div>
              </div>
            </div>

            {/* Quick Summary of Showroom Details */}
            <div className="p-6 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-3 text-xs text-slate-300">
              <h3 className="font-bold text-white text-sm">Showroom Operating Credentials</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-400">
                <div>
                  <strong className="text-white block">Location:</strong>
                  Near AAA College, Sivakasi–Virudhunagar Main Road, Amathur
                </div>
                <div>
                  <strong className="text-white block">Coordinators:</strong>
                  Sarojini (96989 92410) • Kaliraja Prabhu (94438 68650)
                </div>
                <div>
                  <strong className="text-white block">Bank Accounts:</strong>
                  Ganapathy Traders, MSP Pyro Park, Sunstar Fireworks (Karur Vysya Bank)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Verification Queue */}
        {activeTab === 'queue' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-xs text-yellow-300">
              <strong>Audit Notice:</strong> These {unverifiedCount} items were identified during the PDF coordinate audit as having blank prices or omitted data in the original printed sheet. The storefront marks these items as "Price on Inquiry" until verified here.
            </div>

            <div className="overflow-x-auto rounded-3xl glass-panel bg-slate-900 border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Unit</th>
                    <th className="py-3 px-4">Issue Identified</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {productsState.filter(p => p.status === 'NEEDS_VERIFICATION').map(p => (
                    <tr key={p.code} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-amber-400">#{p.code}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{p.name}</div>
                        <div className="text-[10px] text-amber-300/70">{p.tamil}</div>
                      </td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4">{p.pack}</td>
                      <td className="py-3 px-4 text-yellow-300 font-medium">
                        {p.notes || 'Price blank in source PDF page ' + p.page}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => openEdit(p)}
                          className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-slate-950 font-bold transition-colors flex items-center gap-1 mx-auto"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Set Price & Verify</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Catalog Inventory */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by name, tamil, or code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <span className="text-xs text-slate-400">Showing {filteredProducts.length} items</span>
            </div>

            <div className="overflow-x-auto rounded-3xl glass-panel bg-slate-900 border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Code</th>
                    <th className="py-3 px-3">Product Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Unit</th>
                    <th className="py-3 px-3 text-right">List Price</th>
                    <th className="py-3 px-3 text-right">Net Price</th>
                    <th className="py-3 px-3 text-center">Discount</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-center">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredProducts.map(p => (
                    <tr key={p.code} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-400">#{p.code}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{p.name}</div>
                        <div className="text-[10px] text-amber-300/70">{p.tamil}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{p.category}</td>
                      <td className="py-2.5 px-3 text-slate-400">{p.pack}</td>
                      <td className="py-2.5 px-3 text-right font-mono">
                        {p.listPrice ? `₹${p.listPrice.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-300">
                        {p.netPrice ? `₹${p.netPrice.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-emerald-400">
                        {p.discountPercent ? `${p.discountPercent}%` : 'Net Rate'}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1 text-slate-400 hover:text-amber-300 rounded"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Order Reservations */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in">
            {orders.length === 0 ? (
              <div className="p-12 text-center rounded-3xl glass-panel bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                No customer order reservations submitted yet in this session. Orders submitted through the checkout flow appear here instantly.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(o => (
                  <div key={o.orderReference} className="p-6 rounded-3xl glass-panel bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <span className="font-mono text-sm font-bold text-amber-300">{o.orderReference}</span>
                        <div className="text-xs text-white font-bold">{o.customerName} (+91 {o.customerPhone})</div>
                      </div>
                      <div className="text-right">
                        <span className="font-display text-lg font-black text-amber-300">
                          ₹{o.total.toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-semibold">{o.deliveryMethod}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300">
                      <div className="font-semibold text-slate-400 mb-1">Items in Reservation:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between py-0.5 border-b border-slate-800/40">
                            <span>#{it.code} {it.name} x {it.quantity}</span>
                            <span className="font-mono text-amber-400">₹{it.lineTotal.toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-[10px] text-slate-500">Date: {new Date(o.createdAt).toLocaleString()}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Status:</span>
                        <select
                          value={o.status}
                          onChange={(e) => onUpdateOrderStatus && onUpdateOrderStatus(o.orderReference, e.target.value)}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-amber-300 text-xs"
                        >
                          <option value="RECEIVED">RECEIVED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="READY_FOR_PICKUP">READY FOR PICKUP</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Audit Log */}
        {activeTab === 'audit' && (
          <div className="space-y-3 animate-in fade-in">
            {auditLogs.map(log => (
              <div key={log.id} className="p-4 rounded-2xl glass-panel bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-amber-400/20 text-amber-300 font-bold">
                    {log.action}
                  </span>
                  <span className="text-slate-200">{log.details}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md p-6 rounded-3xl glass-panel bg-slate-900 border border-amber-400/40 space-y-4">
            <h3 className="font-bold text-lg text-white">
              Edit #{editingProduct.code} - {editingProduct.name}
            </h3>
            <p className="text-xs text-amber-300">{editingProduct.tamil}</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">List Price (₹)</label>
                <input
                  type="number"
                  value={editListPrice}
                  onChange={(e) => setEditListPrice(e.target.value)}
                  placeholder="e.g. 500.00"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Selling / Net Price (₹)</label>
                <input
                  type="number"
                  value={editNetPrice}
                  onChange={(e) => setEditNetPrice(e.target.value)}
                  placeholder="e.g. 50.00"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveProduct}
                className="px-5 py-2 rounded-xl btn-gold text-slate-950 font-bold text-xs"
              >
                Save & Verify
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
