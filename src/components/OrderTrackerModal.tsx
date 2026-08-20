import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Phone, 
  FileText, 
  Copy, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { OrderRecord } from '../types';
import { CONTACT_INFO } from '../data/cryptoData';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  const [searchId, setSearchId] = useState('');
  const [ordersList, setOrdersList] = useState<OrderRecord[]>([]);
  const [searchedOrder, setSearchedOrder] = useState<OrderRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('bgh_orders') || '[]');
        setOrdersList(stored);
        if (stored.length > 0) {
          setSearchedOrder(stored[0]);
          setSearchId(stored[0].orderId);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = ordersList.find(
      (o) =>
        o.orderId.toLowerCase() === searchId.trim().toLowerCase() ||
        o.customerEmail.toLowerCase() === searchId.trim().toLowerCase() ||
        (o.txid && o.txid.toLowerCase().includes(searchId.trim().toLowerCase()))
    );
    setSearchedOrder(found || null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-black">Track Order & Delivery Status</h2>
              <p className="text-xs text-slate-400">Enter your Order ID (BGH-XXXXXX) or Email</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. BGH-123456) or Email"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
            >
              Lookup Order
            </button>
          </form>

          {/* Results */}
          {searchedOrder ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Order ID</span>
                    <span className="font-mono font-black text-base text-slate-900">{searchedOrder.orderId}</span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {searchedOrder.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Delivery Email:</span>
                    <span className="font-semibold text-slate-800 break-all">{searchedOrder.customerEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Paid:</span>
                    <span className="font-extrabold text-slate-900">${searchedOrder.totalPrice} USD</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Payment Method:</span>
                    <span className="font-medium text-slate-700">{searchedOrder.cryptoCurrency}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Estimated Delivery:</span>
                    <span className="font-semibold text-emerald-600">Within 5–15 Mins</span>
                  </div>
                </div>

                {/* Email Resend Trigger */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Need another copy of your receipt?</span>
                  <button
                    onClick={async (e) => {
                      const btn = e.currentTarget;
                      btn.disabled = true;
                      btn.textContent = 'Sending...';
                      try {
                        const res = await fetch('/api/order/notify', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ order: searchedOrder }),
                        });
                        const data = await res.json();
                        if (data.success) {
                          btn.textContent = 'Email Sent!';
                        } else {
                          btn.textContent = 'Error: Check Telegram';
                        }
                      } catch {
                        btn.textContent = 'Error sending';
                      }
                      setTimeout(() => {
                        btn.disabled = false;
                        btn.textContent = 'Resend Receipt Email';
                      }, 4000);
                    }}
                    className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-bold text-slate-800 transition-colors shadow-2xs"
                  >
                    Resend Receipt Email
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block text-[11px] mb-1">Purchased Packages:</span>
                  <div className="space-y-1">
                    {searchedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between font-semibold text-slate-800">
                        <span>{item.serviceTitle} ({item.unitLabel})</span>
                        <span className="font-mono">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Fulfillment Steps:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> 1. Order Placed & Blockchain TXID Recorded
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    <Clock className="w-4 h-4" /> 2. Automated Server Confirming Deposit on Chain
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-medium">
                    <Clock className="w-4 h-4" /> 3. Credentials File Dispatched to Email
                  </div>
                </div>
              </div>

              {/* Instant Help CTA */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs space-y-2">
                <p className="font-bold text-sky-950">Need instant status or replacement?</p>
                <div className="flex gap-2">
                  <a
                    href={`https://t.me/bulkgmailhub?text=Checking%20status%20for%20Order%20${searchedOrder.orderId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Telegram Support
                  </a>
                  <a
                    href={`https://wa.me/15722739250?text=Checking%20status%20for%20Order%20${searchedOrder.orderId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> WhatsApp Support
                  </a>
                </div>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-8 space-y-2 text-slate-500">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">No matching order found</p>
              <p className="text-xs">
                Check that your Order ID is typed correctly (e.g. BGH-123456) or contact our 24/7 Telegram support directly.
              </p>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-slate-400">
              Enter your order ID from your checkout receipt or check Telegram messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
