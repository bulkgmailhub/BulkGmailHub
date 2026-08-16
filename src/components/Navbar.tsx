import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Clock, 
  Send, 
  Phone, 
  ShieldCheck, 
  Layers, 
  GraduationCap, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { CONTACT_INFO } from '../data/cryptoData';
import { ServiceBrandLogo } from './ServiceIcons';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, serviceSlug?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenOrderTracker,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGmailOpen, setIsGmailOpen] = useState(false);
  const [isOtherMailsOpen, setIsOtherMailsOpen] = useState(false);
  const [mobileGmailExpanded, setMobileGmailExpanded] = useState(false);
  const [mobileOtherExpanded, setMobileOtherExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const gmailDropdownRef = useRef<HTMLDivElement>(null);
  const otherDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gmailDropdownRef.current && !gmailDropdownRef.current.contains(event.target as Node)) {
        setIsGmailOpen(false);
      }
      if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target as Node)) {
        setIsOtherMailsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredServices = searchQuery.trim() === '' 
    ? [] 
    : SERVICES_DATA.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  const gmailServices = SERVICES_DATA.filter(s => s.category === 'gmail');
  const otherMailsServices = SERVICES_DATA.filter(s => s.category !== 'gmail');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Notification / Contact Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Instant Automated Crypto Delivery
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              72-Hour Free Replacement Guarantee
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <a 
              href={CONTACT_INFO.telegramUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-semibold group"
            >
              <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              Telegram: <span className="font-mono text-sky-300">{CONTACT_INFO.telegram}</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a 
              href={CONTACT_INFO.whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold group"
            >
              <Phone className="w-3 h-3 group-hover:scale-110 transition-transform" />
              WhatsApp: <span className="font-mono text-emerald-300">{CONTACT_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer select-none py-1 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center p-1.5 group-hover:scale-105 group-hover:border-red-200 group-hover:shadow-md transition-all">
              <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-2xs">
                <path fill="#EA4335" d="M24 25.4L6 11.8V36c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V11.8L24 25.4z" />
                <path fill="#4285F4" d="M42 12V36c0 2.2-1.8 4-4 4h-4V18.1L24 25.4 14 18.1V40H10c-2.2 0-4-1.8-4-4V12c0-1.7 1-3.2 2.6-3.8 1.5-.6 3.3-.2 4.4.7L24 18l11-9.1c1.1-.9 2.9-1.3 4.4-.7 1.6.6 2.6 2.1 2.6 3.8z" />
                <path fill="#34A853" d="M10 40h4V18.1L6 13.6V36c0 2.2 1.8 4 4 4z" />
                <path fill="#FBBC05" d="M34 18.1V40h4c2.2 0 4-1.8 4-4V13.6l-8 4.5z" />
                <path fill="#EA4335" d="M35 8.9L24 18 13 8.9C11.9 8 10.1 8.4 8.6 9c-.5.2-1 .5-1.4.9l16.8 12.7 16.8-12.7c-.4-.4-.9-.7-1.4-.9-1.5-.6-3.3-.2-4.4.7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-heading font-black text-xl text-slate-950 tracking-tight">BulkGmail</span>
                <span className="font-heading font-black text-xl text-red-600 tracking-tight">Hub</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-200 uppercase tracking-wide">.com</span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Authentic Bulk Email Provider</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {/* 1. Home */}
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentView === 'home' 
                  ? 'text-red-600 bg-red-50/90 shadow-2xs font-extrabold' 
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              Home
            </button>

            {/* 2. Gmail (with Mega Dropdown & Office Logos) */}
            <div 
              className="relative" 
              ref={gmailDropdownRef}
              onMouseEnter={() => setIsGmailOpen(true)}
              onMouseLeave={() => setIsGmailOpen(false)}
            >
              <button
                onClick={() => setIsGmailOpen(!isGmailOpen)}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isGmailOpen || (currentView === 'service-detail' && gmailServices.some(s => s.slug === window.location.hash.replace('#service/', '')))
                    ? 'text-red-600 bg-red-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
              >
                <Mail className="w-4 h-4 text-red-500" />
                <span>Gmail</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isGmailOpen ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
              </button>

              {/* Gmail Sub-Menu Mega Dropdown */}
              {isGmailOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-[800px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 animate-in fade-in zoom-in-95 duration-150 z-50">
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center p-1.5 shrink-0">
                        <ServiceBrandLogo category="gmail" size="sm" />
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-sm text-slate-900">Verified Gmail Account Services</h4>
                        <p className="text-[11px] text-slate-500">100% US Residential IPs, 2FA App Passwords, Vintage 2000-2016 & PVA Verified</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsGmailOpen(false);
                        onNavigate('shop');
                      }}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 bg-red-50/60 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>View All Gmails</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 2-Column Grid of All Gmail Services with Official Logos */}
                  <div className="grid grid-cols-2 gap-2.5 max-h-[390px] overflow-y-auto pr-1">
                    {gmailServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => {
                          setIsGmailOpen(false);
                          onNavigate('service-detail', service.slug);
                        }}
                        className="p-2.5 rounded-2xl border border-transparent hover:border-red-100 hover:bg-red-50/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <ServiceBrandLogo serviceId={service.id} category={service.category} logoType={service.logoType} size="sm" />
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-heading font-bold text-xs text-slate-900 group-hover:text-red-600 transition-colors truncate">
                                {service.title.replace('Buy ', '')}
                              </span>
                              {service.popular && (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                                  HOT
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {service.shortDescription}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 block font-medium">Starts</span>
                          <span className="font-mono font-black text-xs text-red-600">${service.pricingTiers[0].price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sub-menu Footer Banner */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium">Every Gmail package comes with 72-Hour Free Replacement Guarantee</span>
                    </div>
                    <a
                      href={CONTACT_INFO.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" /> Live Custom Quote
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Other Mails (with Mega Dropdown & Office Logos) */}
            <div 
              className="relative" 
              ref={otherDropdownRef}
              onMouseEnter={() => setIsOtherMailsOpen(true)}
              onMouseLeave={() => setIsOtherMailsOpen(false)}
            >
              <button
                onClick={() => setIsOtherMailsOpen(!isOtherMailsOpen)}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isOtherMailsOpen || (currentView === 'service-detail' && otherMailsServices.some(s => s.slug === window.location.hash.replace('#service/', '')))
                    ? 'text-blue-600 bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
              >
                <Layers className="w-4 h-4 text-blue-500" />
                <span>Other Mails</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOtherMailsOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {/* Other Mails Sub-Menu Mega Dropdown */}
              {isOtherMailsOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-[800px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 animate-in fade-in zoom-in-95 duration-150 z-50">
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center p-1.5 shrink-0 text-blue-600">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-sm text-slate-900">Alternative Webmail & Academic Mailboxes</h4>
                        <p className="text-[11px] text-slate-500">Hotmail, Outlook, Yahoo, AOL, Apple iCloud & .EDU Student Perks</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsOtherMailsOpen(false);
                        onNavigate('shop');
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50/60 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>View All Accounts</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 2-Column Grid of Other Mail Services with Official Brand Logos */}
                  <div className="grid grid-cols-2 gap-2.5 max-h-[390px] overflow-y-auto pr-1">
                    {otherMailsServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => {
                          setIsOtherMailsOpen(false);
                          onNavigate('service-detail', service.slug);
                        }}
                        className="p-2.5 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <ServiceBrandLogo serviceId={service.id} category={service.category} logoType={service.logoType} size="sm" />
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-heading font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                {service.title.replace('Buy ', '')}
                              </span>
                              {service.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 shrink-0">
                                  {service.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {service.shortDescription}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 block font-medium">Starts</span>
                          <span className="font-mono font-black text-xs text-blue-600">${service.pricingTiers[0].price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sub-menu Footer Banner */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium">POP3 / IMAP / SMTP & Webmail Enabled with 72-Hour Warranty</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsOtherMailsOpen(false);
                        onNavigate('shop');
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. About Us */}
            <button
              onClick={() => onNavigate('about')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentView === 'about' 
                  ? 'text-red-600 bg-red-50/90 shadow-2xs font-extrabold' 
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              About Us
            </button>

            {/* 5. Blog */}
            <button
              onClick={() => onNavigate('blog')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentView === 'blog' 
                  ? 'text-red-600 bg-red-50/90 shadow-2xs font-extrabold' 
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              Blog
            </button>

            {/* 6. Contact Us */}
            <button
              onClick={() => onNavigate('contact')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentView === 'contact' 
                  ? 'text-red-600 bg-red-50/90 shadow-2xs font-extrabold' 
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Tools: Search, Track Order, Cart */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Search Packages"
              >
                <Search className="w-5 h-5" />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search USA Gmail, Aged 2000, PVA, Hotmail..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {searchQuery && (
                    <div className="mt-2 max-h-60 overflow-y-auto space-y-1">
                      {filteredServices.length > 0 ? (
                        filteredServices.map(s => (
                          <div
                            key={s.id}
                            onClick={() => {
                              onNavigate('service-detail', s.slug);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer text-xs flex items-center justify-between transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <ServiceBrandLogo serviceId={s.id} category={s.category} logoType={s.logoType} size="sm" className="w-5 h-5" />
                              <span className="font-semibold text-slate-800 truncate pr-2">{s.title}</span>
                            </div>
                            <span className="text-red-600 font-bold font-mono">${s.pricingTiers[0].price}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-3">No matching services found</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Track Order Button */}
            <button
              onClick={onOpenOrderTracker}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Track Order</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-extrabold text-sm shadow-md shadow-red-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-red-600 text-xs font-black px-2 py-0.5 rounded-full shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Sub-menus and Official Office Logos */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 max-h-[85vh] overflow-y-auto">
          {/* Main Direct Navigation Items */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                currentView === 'home' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Mobile Gmail Accordion */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setMobileGmailExpanded(!mobileGmailExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 text-slate-900 font-bold text-sm cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-600" />
                  <span>Gmail ({gmailServices.length} Services)</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileGmailExpanded ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
              </button>

              {mobileGmailExpanded && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                  {gmailServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        onNavigate('service-detail', service.slug);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <ServiceBrandLogo serviceId={service.id} category={service.category} logoType={service.logoType} size="sm" className="w-4 h-4 shrink-0" />
                        <span className="truncate">{service.title.replace('Buy ', '')}</span>
                      </div>
                      <span className="font-mono text-red-600 font-bold shrink-0">${service.pricingTiers[0].price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Other Mails Accordion */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setMobileOtherExpanded(!mobileOtherExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 text-slate-900 font-bold text-sm cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Other Mails ({otherMailsServices.length} Services)</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOtherExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {mobileOtherExpanded && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                  {otherMailsServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        onNavigate('service-detail', service.slug);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <ServiceBrandLogo serviceId={service.id} category={service.category} logoType={service.logoType} size="sm" className="w-4 h-4 shrink-0" />
                        <span className="truncate">{service.title.replace('Buy ', '')}</span>
                      </div>
                      <span className="font-mono text-blue-600 font-bold shrink-0">${service.pricingTiers[0].price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Us */}
            <button
              onClick={() => {
                onNavigate('about');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                currentView === 'about' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            {/* Blog */}
            <button
              onClick={() => {
                onNavigate('blog');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                currentView === 'blog' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Blog & Guides
            </button>

            {/* Contact Us */}
            <button
              onClick={() => {
                onNavigate('contact');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                currentView === 'contact' ? 'bg-red-50 text-red-600' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>

            {/* Track Order */}
            <button
              onClick={() => {
                onOpenOrderTracker();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm text-blue-600 bg-blue-50 flex items-center justify-between cursor-pointer"
            >
              <span>Track Your Order</span>
              <Clock className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
