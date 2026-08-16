import React from 'react';
import { Mail, Phone, Send, ShieldCheck, Zap, Lock, Award, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO, CRYPTO_WALLETS } from '../data/cryptoData';
import { SERVICES_DATA } from '../data/servicesData';

interface FooterProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
  onOpenOrderTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenOrderTracker }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Trust Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Download credentials right after blockchain confirmation</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">72h Replacement</h4>
              <p className="text-xs text-slate-400">Free replacement for any initial login issue</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Residential IP Setup</h4>
              <p className="text-xs text-slate-400">Real carrier SIM phone verification and clean IPs</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Human Support</h4>
              <p className="text-xs text-slate-400">Direct assistance on Telegram and WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <path fill="#EA4335" d="M24 25.4L6 11.8V36c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V11.8L24 25.4z" />
                  <path fill="#4285F4" d="M42 12V36c0 2.2-1.8 4-4 4h-4V18.1L24 25.4 14 18.1V40H10c-2.2 0-4-1.8-4-4V12c0-1.7 1-3.2 2.6-3.8 1.5-.6 3.3-.2 4.4.7L24 18l11-9.1c1.1-.9 2.9-1.3 4.4-.7 1.6.6 2.6 2.1 2.6 3.8z" />
                  <path fill="#34A853" d="M10 40h4V18.1L6 13.6V36c0 2.2 1.8 4 4 4z" />
                  <path fill="#FBBC05" d="M34 18.1V40h4c2.2 0 4-1.8 4-4V13.6l-8 4.5z" />
                </svg>
              </div>
              <span className="text-xl font-heading font-black text-white">BulkGmail<span className="text-red-500">Hub</span>.com</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              BulkGmailHub provides verified USA Gmail accounts, aged inboxes, PVA accounts, Hotmail, Yahoo, AOL, iCloud, and academic .EDU emails. Built for cold email outreach, marketing agencies, and automation workflows.
            </p>

            {/* Direct Official Contact Cards */}
            <div className="space-y-2 pt-2">
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 hover:bg-sky-950/50 border border-slate-800 hover:border-sky-700/50 text-xs text-slate-300 hover:text-sky-300 transition-all group"
              >
                <Send className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Telegram:</span>
                <span className="text-sky-400 font-mono">{CONTACT_INFO.telegram}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-slate-500 group-hover:text-sky-400" />
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950/50 border border-slate-800 hover:border-emerald-700/50 text-xs text-slate-300 hover:text-emerald-300 transition-all group"
              >
                <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">WhatsApp:</span>
                <span className="text-emerald-400 font-mono">{CONTACT_INFO.whatsapp}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-slate-500 group-hover:text-emerald-400" />
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 hover:bg-red-950/50 border border-slate-800 hover:border-red-700/50 text-xs text-slate-300 hover:text-red-300 transition-all group"
              >
                <Mail className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Email:</span>
                <span className="text-red-400 font-mono">{CONTACT_INFO.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-slate-500 group-hover:text-red-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Top Gmail Services */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Top Gmail Services</h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.filter(s => s.category === 'gmail').slice(0, 6).map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('service-detail', s.slug)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Webmail & EDU */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Webmail & EDU</h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.filter(s => s.category !== 'gmail').map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('service-detail', s.slug)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Navigation & Help */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Navigation & Help</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shop')} className="text-slate-400 hover:text-white transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={onOpenOrderTracker} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="text-slate-400 hover:text-white transition-colors">
                  Guides & Tutorials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-slate-400 hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>

            {/* Accepted Crypto Badges */}
            <div className="pt-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Accepted Cryptos</p>
              <div className="flex flex-wrap gap-1.5">
                {CRYPTO_WALLETS.map(w => (
                  <span key={w.id} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {w.symbol}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BulkGmailHub.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-400">72-Hour Warranty Policy</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-400">Live Telegram & WhatsApp Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
