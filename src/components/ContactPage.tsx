import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Sparkles,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('USA Gmail Accounts');
  const [quantity, setQuantity] = useState('50');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getDirectTelegramLink = () => {
    const text = encodeURIComponent(
      `Hello BulkGmailHub team! My name is ${name || 'Customer'}. Inquiring about ${serviceOfInterest} (approx ${quantity} accounts). Details: ${message || 'Please provide details.'}`
    );
    return `https://t.me/bulkgmailhub?text=${text}`;
  };

  const getDirectWhatsappLink = () => {
    const text = encodeURIComponent(
      `Hello BulkGmailHub team! Inquiring about ${serviceOfInterest} (${quantity} accounts).`
    );
    return `https://wa.me/15722739250?text=${text}`;
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Support Online Now
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-950 tracking-tight">
            Contact <span className="text-red-600">BulkGmailHub</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Need custom account batches, specific geo-proxies, or have questions about a recent crypto order? Reach out directly on Telegram or WhatsApp for quick assistance.
          </p>
        </div>

        {/* 3 Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Telegram */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-200 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">Fastest Response</span>
                <h3 className="text-xl font-heading font-bold text-slate-900">Telegram</h3>
                <p className="text-xs text-slate-500 mt-1">Our primary support channel for fast replies, replacements, and quick questions.</p>
              </div>
              <div className="font-mono text-sm font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 select-all">
                {CONTACT_INFO.telegram}
              </div>
            </div>

            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-200 transition-all"
            >
              <Send className="w-4 h-4" /> Message on Telegram
            </a>
          </div>

          {/* WhatsApp */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Direct Messaging</span>
                <h3 className="text-xl font-heading font-bold text-slate-900">WhatsApp</h3>
                <p className="text-xs text-slate-500 mt-1">Chat directly with our team for bulk orders, custom quotes, and payment verification.</p>
              </div>
              <div className="font-mono text-sm font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 select-all">
                {CONTACT_INFO.whatsapp}
              </div>
            </div>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-200 transition-all"
            >
              <Phone className="w-4 h-4" /> Message on WhatsApp
            </a>
          </div>

          {/* Email */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-200 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">Email</span>
                <h3 className="text-xl font-heading font-bold text-slate-900">Email Inquiries</h3>
                <p className="text-xs text-slate-500 mt-1">For agency invoicing, partnership discussions, and general inquiries.</p>
              </div>
              <div className="font-mono text-sm font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 select-all break-all">
                {CONTACT_INFO.email}
              </div>
            </div>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-200 transition-all"
            >
              <Mail className="w-4 h-4" /> Send Email
            </a>
          </div>
        </div>

        {/* Custom Order Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> High-Volume & Agency Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-950">
              Need 500+ Accounts or Custom Proxies?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We offer volume pricing and custom delivery formats for agencies, lead generation teams, and scrapers. Message us with your requirements.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Custom output format (TXT, CSV, JSON, Anti-Detect Cookies)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Consistent account provisioning with residential IPs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>72-hour replacement policy on non-working accounts</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-heading font-black text-slate-900">Message Received</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  We have received your message. For immediate chat, click below to open Telegram or WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={getDirectTelegramLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Continue on Telegram
                  </a>
                  <a
                    href={getDirectWhatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" /> Continue on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Name / Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex (Apex Media)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email or Telegram Handle</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. alex@company.com or @alex_tg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Service Needed</label>
                    <select
                      value={serviceOfInterest}
                      onChange={(e) => setServiceOfInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                    >
                      <option>Buy USA Gmail Accounts</option>
                      <option>Buy Aged Gmail with App Password</option>
                      <option>Buy USA Aged Gmail (2000-2016)</option>
                      <option>Buy PVA Gmail Accounts</option>
                      <option>Buy Fresh Gmail Accounts</option>
                      <option>Buy Hotmail / Outlook Accounts</option>
                      <option>Buy Yahoo / AOL Accounts</option>
                      <option>Buy iCloud Accounts</option>
                      <option>Buy EDU Email Accounts</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Estimated Quantity</label>
                    <input
                      type="text"
                      placeholder="e.g. 50, 100, 500+"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Project Details & Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your campaign setup, tools (Instantly, Smartlead, etc.), or specific proxy requirements."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-200 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
