import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Server, 
  Send, 
  ArrowRight
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoData';

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50/60 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
            Bulk Email Accounts for Outreach & Automation
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-950 tracking-tight">
            About <span className="text-red-600">BulkGmailHub</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We provide verified USA Gmail accounts, vintage aged mailboxes (2000–2024), App Password ready SMTP accounts, and student .EDU emails with fast crypto checkout and live human support.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-heading font-black text-slate-900 block">50,000+</span>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Delivered Batches</span>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-heading font-black text-emerald-600 block">99.8%</span>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Deliverability Target</span>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-heading font-black text-blue-600 block">72 Hours</span>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Replacement Warranty</span>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-heading font-black text-amber-500 block">&lt; 5 Mins</span>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Average Delivery Time</span>
          </div>
        </div>

        {/* How We Operate */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-heading font-extrabold text-slate-950">
            How We Manage Account Quality
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Spam filters at major email service providers closely track registration IP quality, phone verification integrity, and browser fingerprint consistency. Low-quality accounts generated on shared datacenter proxies or recycled virtual numbers often get flagged before your first campaign even launches.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            At BulkGmailHub, our accounts are created using authentic residential IP connections and physical SIM carrier numbers. Every account includes verified recovery details, giving you full access and long-term stability for your outbound email operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900">Residential Connections</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Accounts are registered through genuine residential IP networks rather than shared datacenters.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900">App Passwords & SMTP</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pre-configured 16-character passcodes ready for cold email platforms and developer code.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900">72-Hour Warranty</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                If an account fails to log in upon delivery, we replace it promptly via Telegram or WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* 72-Hour Guarantee Policy */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-extrabold">Our 72-Hour Free Replacement Policy</h3>
              <p className="text-xs text-slate-400">Clear and straightforward coverage for every order</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Prompt replacement if an account displays an invalid password on initial receipt.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Replacement if an account triggers an unexpected SMS lock upon first login.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Direct communication with human support on Telegram (@bulkgmailhub).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Clear order records and transaction receipts for easy confirmation.</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <p className="text-xs text-slate-400">
              Need custom enterprise volume (500+ accounts)?
            </p>
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" /> Message Support on Telegram
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-heading font-extrabold text-slate-900">
            Looking for specific accounts for your setup?
          </h3>
          <button
            onClick={() => onNavigate('shop')}
            className="py-3.5 px-8 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-200 hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            <span>Browse Available Account Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
