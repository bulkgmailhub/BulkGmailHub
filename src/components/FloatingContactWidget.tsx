import React, { useState } from 'react';
import { MessageCircle, Send, Phone, X, ShieldCheck, Zap } from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoData';

interface FloatingContactWidgetProps {
  onOpenCart: () => void;
  cartCount: number;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({
  onOpenCart,
  cartCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Quick Contact Popup */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 w-72 space-y-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-heading font-bold text-xs text-slate-900">24/7 Live Support Active</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Need an instant custom quote, order verification, or 72-hour replacement? Chat directly with us:
          </p>

          <div className="space-y-2">
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition-colors"
            >
              <Send className="w-4 h-4 text-sky-600" />
              <span>Telegram: {CONTACT_INFO.telegram}</span>
            </a>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: {CONTACT_INFO.whatsapp}</span>
            </a>
          </div>

          <div className="pt-1 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            72h Non-Working Replacement Guarantee
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl flex items-center gap-2 text-xs font-extrabold hover:scale-105 transition-all group"
          title="24/7 Live Chat Support"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <span className="hidden sm:inline">24/7 Live Support</span>
        </button>
      </div>
    </div>
  );
};
