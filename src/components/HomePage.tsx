import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Lock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Send, 
  Phone, 
  Search, 
  Check, 
  HelpCircle,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceCard } from './ServiceCard';
import { ServiceItem, PricingTier, ServiceCategory } from '../types';
import { CONTACT_INFO } from '../data/cryptoData';

interface HomePageProps {
  onAddToCart: (service: ServiceItem, tier: PricingTier, quantityCount: number) => void;
  onDirectBuy: (service: ServiceItem, tier: PricingTier) => void;
  onViewDetails: (slug: string) => void;
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onDirectBuy,
  onViewDetails,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [heroSearch, setHeroSearch] = useState('');

  const featuredServices = SERVICES_DATA.filter((s) => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = heroSearch
      ? s.title.toLowerCase().includes(heroSearch.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(heroSearch.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-10 pb-16 border-b border-slate-100">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-800">
                Bulk Verified Email Accounts
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                72h Replacement Warranty
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-slate-950 tracking-tight leading-tight">
              Aged & USA Gmail Accounts <span className="text-red-600">for Cold Outreach</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Get authentic US residential IP Gmails, physical SIM verified accounts, and pre-configured App Passwords ready for Smartlead, Instantly, Python scripts, and webmail. Instant crypto delivery with 72-hour warranty.
            </p>

            {/* Search and Action Bar */}
            <div className="max-w-xl mx-auto pt-2">
              <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-1.5 focus-within:border-red-500 transition-colors">
                <Search className="w-5 h-5 text-slate-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search accounts (e.g. USA Aged 2000-2016, App Password, Hotmail...)"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800"
                />
                <button
                  onClick={() => onNavigate('shop')}
                  className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
                >
                  View All Accounts
                </button>
              </div>
            </div>

            {/* Trust Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 pt-2 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Never Recycled or Resold
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-blue-500" /> Instant Blockchain Delivery
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Live Support via Telegram & WhatsApp
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Available Packages</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-950">
              Bulk Email Services
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Accounts ({SERVICES_DATA.length})
            </button>
            <button
              onClick={() => setActiveCategory('gmail')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'gmail'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Gmail ({SERVICES_DATA.filter(s => s.category === 'gmail').length})
            </button>
            <button
              onClick={() => setActiveCategory('microsoft')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'microsoft'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Hotmail & Outlook ({SERVICES_DATA.filter(s => s.category === 'microsoft').length})
            </button>
            <button
              onClick={() => setActiveCategory('yahoo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'yahoo'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Yahoo & AOL ({SERVICES_DATA.filter(s => s.category === 'yahoo').length})
            </button>
            <button
              onClick={() => setActiveCategory('apple')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'apple'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Apple iCloud ({SERVICES_DATA.filter(s => s.category === 'apple').length})
            </button>
            <button
              onClick={() => setActiveCategory('edu')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'edu'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              .EDU Student ({SERVICES_DATA.filter(s => s.category === 'edu').length})
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onAddToCart={onAddToCart}
              onDirectBuy={onDirectBuy}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all"
          >
            <span>View All 16 Bulk Account Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Comparison Matrix: BulkGmailHub vs Low-Quality Vendors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Quality Comparison</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-950">
              Why Account Quality Matters
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Low-cost generic sellers often use recycled virtual numbers and datacenter proxies that get flagged quickly by spam filters. Here is how our accounts differ:
            </p>
          </div>

          <div className="overflow-x-auto pt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3.5 px-4 font-bold text-slate-400 uppercase tracking-wider">Features & Protocols</th>
                  <th className="py-3.5 px-4 font-black text-red-600 bg-red-50/50 rounded-t-xl text-sm">
                    BulkGmailHub.com
                  </th>
                  <th className="py-3.5 px-4 font-bold text-slate-500">Generic Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">IP Generation Source</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700 bg-red-50/30 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" /> Clean US Residential & Mobile IPs
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">Shared datacenter proxies & public VPNs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Phone Verification (PVA)</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700 bg-red-50/30">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Real Physical SIM Carrier Numbers
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">Recycled virtual VoIP numbers (frequent re-prompts)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">App Passwords & 2FA Ready</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700 bg-red-50/30">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Pre-generated 16-Digit Passwords & Backup Codes
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">None (requires manual setup with new phone)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Replacement Guarantee</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700 bg-red-50/30">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> 72-Hour Free Replacement on Non-Working Accounts
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">No replacement policy after download</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Payment Options</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700 bg-red-50/30">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Direct Crypto (USDT, BTC, LTC, ETH, SOL)
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">Inflexible payment gateways with high fees</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Customer Feedback */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Client Reviews</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-950">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "We run cold outreach across multiple sending inboxes in Smartlead. The App Password accounts from BulkGmailHub connected immediately without any 2FA friction, and inbox delivery has stayed steady."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">Marcus T.</span>
              <span className="text-[10px] text-slate-400">Outreach Agency Lead</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The vintage accounts from 2000–2016 arrived within minutes of sending Litecoin. Used them for Google Ads campaigns and they logged in without unexpected verification checkpoints."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">David R.</span>
              <span className="text-[10px] text-slate-400">Media Buyer</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The .EDU account unlocked the GitHub Student Pack on the first try. Quick support on Telegram when I had a question about connecting my student portal."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">Elena K.</span>
              <span className="text-[10px] text-slate-400">Software Developer</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">Support & FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-950">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-500" /> How fast is account delivery after payment?
            </h4>
            <p className="text-slate-600 pl-6 leading-relaxed">
              Once your crypto payment confirms on the blockchain (typically 1 to 10 minutes depending on network traffic), your account credentials are displayed on screen for immediate download and sent to your email address.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" /> Which cryptocurrencies can I pay with?
            </h4>
            <p className="text-slate-600 pl-6 leading-relaxed">
              We accept USDT (TRC-20), Bitcoin (BTC), Litecoin (LTC), Ethereum (ETH), and Solana (SOL). We recommend USDT or Litecoin for low network fees and quick confirmations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" /> How does the 72-hour replacement warranty work?
            </h4>
            <p className="text-slate-600 pl-6 leading-relaxed">
              If an account in your order has an incorrect password or fails on initial login during the first 72 hours, we will replace it free of charge. Message our support on Telegram or WhatsApp with your Order ID.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Custom Orders & Inquiries</span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black">
              Need High-Volume Batches or Dedicated Support?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Message us directly on Telegram ({CONTACT_INFO.telegram}) or WhatsApp ({CONTACT_INFO.whatsapp}) for custom volume quotes and assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Message on Telegram
            </a>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
