import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Zap, 
  ShoppingBag, 
  ChevronRight, 
  ArrowLeft, 
  FileText, 
  HelpCircle, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  Send, 
  Phone, 
  Server, 
  Terminal, 
  Calendar, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { ServiceItem, PricingTier } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { CONTACT_INFO } from '../data/cryptoData';
import { ServiceBrandLogo } from './ServiceIcons';
import { SEO_PAGE_REGISTRY } from '../data/seoData';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onAddToCart: (service: ServiceItem, tier: PricingTier, quantityCount: number) => void;
  onDirectBuy: (service: ServiceItem, tier: PricingTier) => void;
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onAddToCart,
  onDirectBuy,
  onNavigate,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>(
    service.pricingTiers.find(t => t.popular)?.id || service.pricingTiers[0].id
  );
  const [multiplier, setMultiplier] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeSubTab, setActiveSubTab] = useState<'article' | 'specs' | 'login-guide' | 'warmup' | 'code'>('article');

  const selectedTier = service.pricingTiers.find(t => t.id === selectedTierId) || service.pricingTiers[0];
  const totalPrice = selectedTier.price * multiplier;
  const totalAccountsCount = selectedTier.quantity * multiplier;

  const handleAddToCart = () => {
    onAddToCart(service, selectedTier, multiplier);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const relatedServices = SERVICES_DATA.filter(s => s.id !== service.id && s.category === service.category).slice(0, 3);

  return (
    <div className="bg-slate-50/70 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigate('shop')} className="hover:text-red-600 transition-colors">
            Services
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="capitalize font-semibold text-slate-700">
            {service.category === 'gmail' ? 'Gmail Accounts' : service.category === 'edu' ? 'EDU Accounts' : service.category === 'microsoft' ? 'Outlook & Hotmail' : service.category === 'apple' ? 'Apple Mail' : 'Webmail'}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900 truncate max-w-xs">{service.title}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        {/* ======================================================== */}
        {/* TOP SECTION: SERVICES NAME, DESCRIPTION, FEATURES & PRICE */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (lg:col-span-7): Name, 100-300 Word Description, Benchmark Stats, Features 5-10 */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* 1. SERVICES NAME (Header) */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-200/80 p-3 shadow-inner flex items-center justify-center shrink-0">
                  <ServiceBrandLogo 
                    serviceId={service.id} 
                    category={service.category} 
                    logoType={service.logoType} 
                    size="lg" 
                    className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-sm" 
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                      {service.badge || 'Verified Service'}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> 72h Replacement Warranty
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Instant Crypto Dispatch
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight leading-tight">
                    {service.title}
                  </h1>
                </div>
              </div>

              {/* 2. SERVICES DESCRIPTION IN 100-300 WORDS */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Service Overview & Architecture:
                </span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {service.shortDescription}
                </p>
              </div>

              {/* Deliverability & Benchmark Metrics Radar */}
              {service.benchmarkStats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 text-white border border-slate-800 shadow-inner">
                  <div className="text-center p-2 border-r border-slate-800">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Inbox Rate</div>
                    <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">{service.benchmarkStats.inboxRate}</div>
                  </div>
                  <div className="text-center p-2 border-r border-slate-800">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Spam Score</div>
                    <div className="text-lg sm:text-xl font-black text-sky-400 mt-0.5">{service.benchmarkStats.spamScore}</div>
                  </div>
                  <div className="text-center p-2 border-r border-slate-800">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Daily Limit</div>
                    <div className="text-sm sm:text-base font-black text-amber-400 mt-1">{service.benchmarkStats.dailyLimit}</div>
                  </div>
                  <div className="text-center p-2">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Warranty</div>
                    <div className="text-sm sm:text-base font-black text-emerald-400 mt-1">72 Hours</div>
                  </div>
                </div>
              )}

              {/* 4. SERVICES FEATURES 5-10 */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-red-500" /> Key Features & Quality Inclusions ({service.features.length} Highlights):
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    100% Tested Active
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="font-medium leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Use Cases */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Target Workflows & Recommended Use Cases:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.useCases.map((uc, idx) => (
                    <span key={idx} className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100/80 text-slate-800 border border-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-red-500" /> {uc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. SERVICES PRICE IN RIGHT SIDE (lg:col-span-5 sticky) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border-2 border-red-500/80 p-6 sm:p-7 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">Select Quantity Package</span>
                  <h3 className="text-lg font-heading font-extrabold text-slate-900">Custom Order Builder</h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-heading font-black text-slate-950">${totalPrice}</span>
                  <span className="text-xs text-slate-500 block font-medium">Total USD</span>
                </div>
              </div>

              {/* Pricing Tiers Radio Cards */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Choose Tier Pack:</label>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {service.pricingTiers.map((tier) => {
                    const isSelected = tier.id === selectedTier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-red-500 bg-red-50/60 ring-2 ring-red-500/20 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-red-600 bg-red-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{tier.unitLabel}</span>
                              {tier.discountBadge && (
                                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                  {tier.discountBadge}
                                </span>
                              )}
                            </div>
                            {tier.unitPrice && (
                              <span className="text-xs text-slate-500">
                                ${(tier.unitPrice).toFixed(2)} / account
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-extrabold text-slate-950">${tier.price}</span>
                          <span className="text-[10px] text-slate-400 block font-medium">USD</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Package Multiplier */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Package Multiplier:</span>
                  <span className="text-[11px] text-slate-500 font-medium">{totalAccountsCount} total accounts to receive</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMultiplier(Math.max(1, multiplier - 1))}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-black text-sm text-slate-900">{multiplier}</span>
                  <button
                    onClick={() => setMultiplier(multiplier + 1)}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onDirectBuy(service, selectedTier)}
                  className="w-full py-4 px-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-2xl text-sm shadow-lg shadow-red-200 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Instant Crypto Checkout (${totalPrice})</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-4 border rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Added to Shopping Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-slate-600" />
                      <span>Add to Cart ({totalAccountsCount} Accounts)</span>
                    </>
                  )}
                </button>
              </div>

              {/* 72-Hour Quality Commitment & Free Replacement Guarantee Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 leading-relaxed">
                  <strong className="block text-emerald-900 font-bold">72-Hour Replacement Guarantee:</strong>
                  If any account fails on initial login or has credential issues upon delivery, we replace it 100% free via live support.
                </div>
              </div>

              {/* Fast Direct Support Assurance */}
              <div className="pt-3 border-t border-slate-100 text-center space-y-2">
                <p className="text-xs text-slate-500 font-medium">Need custom bulk volume or payment support?</p>
                <div className="flex items-center justify-center gap-4 text-xs font-bold">
                  <a href={CONTACT_INFO.telegramUrl} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                    <Send className="w-3.5 h-3.5" /> Telegram: {CONTACT_INFO.telegram}
                  </a>
                  <span className="text-slate-300">•</span>
                  <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. MAIN SERVICES FULL DESCRIPTION IN 500-1000 WORDS       */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="border-b border-slate-200 pb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
              In-Depth Operational & Technical Manual
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 mt-1">
              Comprehensive Service Guide & Operational Guide: {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Complete provenance breakdown, security protocols, deliverability setup, and outreach best practices.
            </p>
          </div>

          {/* Sub-navigation tabs for article, specs, login guide, warmup, and code snippets */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveSubTab('article')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSubTab === 'article'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" /> Full Guide Article (500–1000 Words)
            </button>
            <button
              onClick={() => setActiveSubTab('specs')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSubTab === 'specs'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Server className="w-4 h-4" /> Technical Specs & SMTP
            </button>
            <button
              onClick={() => setActiveSubTab('login-guide')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSubTab === 'login-guide'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Login & Anti-Detect Guide
            </button>
            {service.warmupPlan && (
              <button
                onClick={() => setActiveSubTab('warmup')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeSubTab === 'warmup'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" /> Warmup Schedule
              </button>
            )}
            {service.codeExamples && (
              <button
                onClick={() => setActiveSubTab('code')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeSubTab === 'code'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Terminal className="w-4 h-4" /> Code Examples
              </button>
            )}
          </div>

          {/* VIEW 1: FULL IN-DEPTH WRITTEN ARTICLE */}
          {activeSubTab === 'article' && (
            <div className="space-y-6">
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 font-normal">
                {service.longDescriptionSeo}
              </div>

              {/* Quality Comparison Benchmark Table */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  BulkGmailHub.com Quality Standards vs. Generic Scraping Sellers
                </h4>
                <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <div className="bg-slate-900 text-white p-3.5 grid grid-cols-3 font-bold">
                    <span>Quality Benchmark</span>
                    <span className="text-red-400 font-extrabold">BulkGmailHub.com</span>
                    <span className="text-slate-400">Generic Market Sellers</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    <div className="p-3 grid grid-cols-3">
                      <span className="font-semibold text-slate-700">Account Exclusivity</span>
                      <strong className="text-emerald-700 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> 100% Single Buyer / Deleted from Inventory</strong>
                      <span className="text-red-600">Often Resold to multiple buyers</span>
                    </div>
                    <div className="p-3 grid grid-cols-3 bg-slate-50/50">
                      <span className="font-semibold text-slate-700">Registration Environment</span>
                      <strong className="text-emerald-700 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Clean Residential IP / Clean Fingerprints</strong>
                      <span className="text-red-600">Datacenter proxy / Emulator bulk bots</span>
                    </div>
                    <div className="p-3 grid grid-cols-3">
                      <span className="font-semibold text-slate-700">Replacement Guarantee</span>
                      <strong className="text-emerald-700 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> 72-Hour Instant Free Replacement</strong>
                      <span className="text-red-600">No warranty or 1-hour strict window</span>
                    </div>
                    <div className="p-3 grid grid-cols-3 bg-slate-50/50">
                      <span className="font-semibold text-slate-700">Delivery Speed</span>
                      <strong className="text-emerald-700 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Instant Crypto Dispatch (&lt; 3 mins)</strong>
                      <span className="text-red-600">Manual delay (12–48 hours)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: TECHNICAL SPECS & MAIL SERVER PARAMETERS */}
          {activeSubTab === 'specs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.specs.map((spec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">{spec.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              {service.technicalDetails && (
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-slate-900 text-white p-3.5 text-xs font-bold flex items-center gap-2">
                    <Server className="w-4 h-4 text-red-400" /> Mail Server & Protocol Configuration Standards
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="p-3 bg-white grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <span className="text-slate-400 font-medium">Incoming IMAP Host:</span>
                      <strong className="text-slate-900 font-mono">{service.technicalDetails.imapServer}</strong>
                      <span className="text-slate-400 font-medium">IMAP Port:</span>
                      <strong className="text-slate-900 font-mono">{service.technicalDetails.imapPort}</strong>
                    </div>
                    <div className="p-3 bg-slate-50/60 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <span className="text-slate-400 font-medium">Outgoing SMTP Host:</span>
                      <strong className="text-slate-900 font-mono">{service.technicalDetails.smtpServer}</strong>
                      <span className="text-slate-400 font-medium">SMTP Port:</span>
                      <strong className="text-slate-900 font-mono">{service.technicalDetails.smtpPort}</strong>
                    </div>
                    <div className="p-3 bg-white grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <span className="text-slate-400 font-medium">Encryption Mode:</span>
                      <strong className="text-slate-900 font-mono">{service.technicalDetails.sslTls}</strong>
                      <span className="text-slate-400 font-medium">App Pass Required:</span>
                      <strong className="text-emerald-700 font-mono">{service.technicalDetails.appPasswordRequired ? 'Yes (Generated/Supported)' : 'Standard Authentication'}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: LOGIN & ANTI-DETECT GUIDE */}
          {activeSubTab === 'login-guide' && (
            <div className="space-y-6">
              {service.loginGuide ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 font-bold mb-1">Recommended Best Practice:</strong>
                      {service.loginGuide.overview}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Recommended Anti-Detect Browsers:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.loginGuide.recommendedTools.map((t, idx) => (
                          <span key={idx} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Recommended Proxy Setup:</span>
                      <p className="text-xs text-slate-700 font-medium">{service.loginGuide.recommendedProxies}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step-by-Step Login Procedure:</h4>
                    {service.loginGuide.steps.map((step) => (
                      <div key={step.step} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-red-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            {step.step}
                          </span>
                          <h5 className="font-heading font-extrabold text-sm sm:text-base text-slate-900">
                            {step.title}
                          </h5>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 pl-10 leading-relaxed">
                          {step.desc}
                        </p>
                        {step.tip && (
                          <div className="ml-10 p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-[11px] sm:text-xs text-blue-900 font-medium flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span><strong>Pro Tip:</strong> {step.tip}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 text-slate-600 text-sm space-y-2">
                  <p>1. Open an isolated profile inside an anti-detect browser (Dolphin Anty, AdsPower, GoLogin).</p>
                  <p>2. Attach a residential proxy matching the account geolocation.</p>
                  <p>3. Authenticate using the credentials provided in your delivery file.</p>
                </div>
              )}
            </div>
          )}

          {/* VIEW 4: WARMUP SCHEDULE */}
          {activeSubTab === 'warmup' && service.warmupPlan && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-900 text-white p-3.5 text-xs font-bold grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <span>Phase Timeline</span>
                  <span>Daily Volume</span>
                  <span className="sm:col-span-2">Action & Strategic Deliverability Rule</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {service.warmupPlan.map((phase, idx) => (
                    <div key={idx} className={`p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}>
                      <div className="font-extrabold text-red-600 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-red-500" /> {phase.dayRange}
                      </div>
                      <div className="font-bold text-slate-900">{phase.sendingVolume}</div>
                      <div className="sm:col-span-2 space-y-1 text-slate-600">
                        <p className="font-medium text-slate-800">{phase.action}</p>
                        {phase.keyRule && (
                          <p className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block font-semibold">
                            Rule: {phase.keyRule}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: DEVELOPER CODE SNIPPETS */}
          {activeSubTab === 'code' && service.codeExamples && (
            <div className="space-y-6">
              {service.codeExamples.map((snippet, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
                  <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-slate-200">{snippet.title}</span>
                      <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {snippet.language}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(snippet.code, idx)}
                      className="flex items-center gap-1 text-[11px] font-bold text-sky-400 hover:text-sky-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 transition-colors"
                    >
                      {copiedCodeIdx === idx ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedCodeIdx === idx ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 6. FAQ 5-10 (EXPANDABLE ACCORDION SECTION)                */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
              Customer Support & Technical Knowledge
            </span>
            <h3 className="text-2xl font-heading font-black text-slate-950 mt-1">
              Frequently Asked Questions ({service.faqs.length} Answers)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear answers to the most common inquiries regarding setup, warranties, warmup, and deliverability for {service.title}.
            </p>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl border transition-all ${
                    isOpen ? 'border-red-300 bg-red-50/20 shadow-2xs' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-red-600' : 'text-slate-400'}`} />
                      <span>{faq.question}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-200/60 text-xs sm:text-sm text-slate-600 pl-12 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. RELATED SERVICES                                       */}
        {/* ======================================================== */}
        {relatedServices.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                  Cross-Category Recommendations
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 mt-0.5">
                  Frequently Bought Together & Related Services
                </h3>
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                View all in catalog <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate('service-detail', rel.slug)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-300 hover:shadow-md cursor-pointer transition-all space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 p-1.5 flex items-center justify-center shrink-0">
                        <ServiceBrandLogo serviceId={rel.id} category={rel.category} logoType={rel.logoType} size="sm" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {rel.badge || 'Recommended'}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{rel.shortDescription}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-500">Starting from</span>
                    <span className="font-black text-base text-red-600">${rel.pricingTiers[0].price} USD</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. TOPICAL AUTHORITY & COMPLEMENTARY SETUP GUIDES */}
        {(() => {
          const seoConfig = SEO_PAGE_REGISTRY[service.slug];
          if (!seoConfig || !seoConfig.internalLinks || seoConfig.internalLinks.length === 0) return null;

          return (
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                    Topical Resource & Setup Cluster
                  </span>
                  <h3 className="text-lg font-heading font-black text-white mt-0.5">
                    Recommended Setup Guides & Compatible Inboxes
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  Deliverability Best Practices
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {seoConfig.internalLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (link.targetView === 'service-detail' && link.targetSlug) {
                        onNavigate('service-detail', link.targetSlug);
                      } else if (link.targetView === 'blog') {
                        onNavigate('blog');
                      } else {
                        onNavigate(link.targetView);
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                        {link.relationship}
                      </span>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2">
                        {link.text}
                      </span>
                    </div>
                    <div className="pt-2 flex items-center text-[11px] text-slate-400 group-hover:text-emerald-400 font-semibold gap-1">
                      <span>View Resource</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
