import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  Mail, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceCard } from './ServiceCard';
import { ServiceItem, PricingTier, ServiceCategory } from '../types';

interface ShopCatalogPageProps {
  onAddToCart: (service: ServiceItem, tier: PricingTier, quantityCount: number) => void;
  onDirectBuy: (service: ServiceItem, tier: PricingTier) => void;
  onViewDetails: (slug: string) => void;
}

export const ShopCatalogPage: React.FC<ShopCatalogPageProps> = ({
  onAddToCart,
  onDirectBuy,
  onViewDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.pricingTiers[0].price - b.pricingTiers[0].price;
    }
    if (sortBy === 'price-high') {
      return b.pricingTiers[0].price - a.pricingTiers[0].price;
    }
    // popular
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
            <Tag className="w-3.5 h-3.5" /> 16 High-Authority Email Account Packages
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-slate-950 tracking-tight">
            Bulk Email Accounts Store
          </h1>
          <p className="text-sm text-slate-600">
            Select your preferred tier, customize quantities, and enjoy instant automated delivery with 72-hour non-working replacement warranty.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> All Services ({SERVICES_DATA.length})
            </button>

            <button
              onClick={() => setSelectedCategory('gmail')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'gmail'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              <Mail className="w-3.5 h-3.5" /> Gmail ({SERVICES_DATA.filter(s => s.category === 'gmail').length})
            </button>

            <button
              onClick={() => setSelectedCategory('microsoft')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'microsoft'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Hotmail / Outlook ({SERVICES_DATA.filter(s => s.category === 'microsoft').length})
            </button>

            <button
              onClick={() => setSelectedCategory('yahoo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'yahoo'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Yahoo & AOL ({SERVICES_DATA.filter(s => s.category === 'yahoo').length})
            </button>

            <button
              onClick={() => setSelectedCategory('apple')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'apple'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Apple iCloud ({SERVICES_DATA.filter(s => s.category === 'apple').length})
            </button>

            <button
              onClick={() => setSelectedCategory('edu')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'edu'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> .EDU Student ({SERVICES_DATA.filter(s => s.category === 'edu').length})
            </button>
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
              />
            </div>

            {/* Sort */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-700"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Cards Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onAddToCart={onAddToCart}
                onDirectBuy={onDirectBuy}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No packages matched your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with different terms like "Aged", "USA", "Hotmail", or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
