import React, { useState } from 'react';
import { 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Layers, 
  ExternalLink 
} from 'lucide-react';
import { ServiceItem, PricingTier } from '../types';
import { ServiceBrandLogo } from './ServiceIcons';

interface ServiceCardProps {
  service: ServiceItem;
  onAddToCart: (service: ServiceItem, tier: PricingTier, quantityCount: number) => void;
  onDirectBuy: (service: ServiceItem, tier: PricingTier) => void;
  onViewDetails: (slug: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onAddToCart,
  onDirectBuy,
  onViewDetails,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>(
    service.pricingTiers.find(t => t.popular)?.id || service.pricingTiers[0].id
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedTier = service.pricingTiers.find(t => t.id === selectedTierId) || service.pricingTiers[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(service, selectedTier, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDirectBuy(service, selectedTier);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Card Header & Badge */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            service.category === 'gmail' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : service.category === 'edu'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {service.badge || (service.category === 'gmail' ? 'Gmail' : service.category === 'edu' ? 'EDU Email' : 'Webmail')}
          </span>

          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            72h Warranty
          </span>
        </div>

        {/* Title with Official Office Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ServiceBrandLogo 
              serviceId={service.id} 
              category={service.category} 
              logoType={service.logoType} 
              size="sm" 
            />
          </div>
          <h3 
            onClick={() => onViewDetails(service.slug)}
            className="text-base font-heading font-extrabold text-slate-900 group-hover:text-red-600 transition-colors cursor-pointer line-clamp-1 flex-1"
          >
            {service.title}
          </h3>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
          {service.shortDescription}
        </p>
      </div>

      {/* Feature Bullet Points */}
      <div className="px-5 py-2.5 bg-slate-50/60 border-y border-slate-100 text-xs text-slate-600 space-y-1.5">
        {service.features.slice(0, 3).map((feat, idx) => (
          <div key={idx} className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{feat}</span>
          </div>
        ))}
      </div>

      {/* Tier Selector Area */}
      <div className="p-5 pt-4 space-y-4">
        <div>
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Choose Package Tier:
          </label>
          <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-0.5">
            {service.pricingTiers.map((tier) => {
              const isSelected = tier.id === selectedTier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`text-left p-2 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-red-500 bg-red-50/80 ring-1 ring-red-500 text-slate-900 font-bold shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold truncate">{tier.unitLabel}</span>
                    {tier.popular && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    )}
                  </div>
                  <div className="mt-1 flex items-baseline justify-between w-full">
                    <span className="font-black text-slate-900">${tier.price}</span>
                    {tier.unitPrice && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        ${(tier.unitPrice).toFixed(1)}/ea
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tier Pricing summary and Action buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Selected Tier:</span>
            <span className="text-xl font-heading font-black text-slate-950">
              ${selectedTier.price} <span className="text-xs text-slate-400 font-normal">USD</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAdd}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                addedAnimation 
                  ? 'bg-emerald-600 border-emerald-600 text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              }`}
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              onClick={handleBuy}
              className="py-2.5 px-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

        {/* View Full Service Details Link */}
        <button
          onClick={() => onViewDetails(service.slug)}
          className="w-full text-center text-xs font-bold text-slate-600 hover:text-red-600 transition-colors flex items-center justify-center gap-1 pt-1"
        >
          <span>Full Service Specifications & Guides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
