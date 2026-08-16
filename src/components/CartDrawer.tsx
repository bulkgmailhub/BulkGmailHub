import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Zap, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, newCount: number) => void;
  onProceedToCheckout: () => void;
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToCheckout,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const totalAccounts = items.reduce((sum, item) => sum + item.quantityCount, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">Your Shopping Cart</h3>
                <p className="text-xs text-slate-500">{items.length} Packages ({totalAccounts} Total Accounts)</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-800">Your cart is currently empty</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Browse our high-reputation USA Gmail, Aged, PVA, and Webmail packages to get started.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop');
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-1.5"
                >
                  Explore All Services <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between gap-3 relative shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2 pr-6">
                    <div>
                      <h4 
                        onClick={() => {
                          onClose();
                          onNavigate('service-detail', item.serviceSlug);
                        }}
                        className="font-heading font-bold text-sm text-slate-900 hover:text-red-600 cursor-pointer transition-colors"
                      >
                        {item.serviceTitle}
                      </h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 mt-1 inline-block">
                        {item.unitLabel}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-500">Subtotal:</span>
                    <span className="font-extrabold text-sm text-slate-950 font-mono">${item.price} USD</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-slate-900">${totalPrice} USD</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Instant Delivery Fee</span>
                  <span className="text-emerald-600 font-bold">FREE (0.00)</span>
                </div>
                <div className="flex items-center justify-between text-base font-heading font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total Due:</span>
                  <span className="text-red-600">${totalPrice} USD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-red-200 hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Checkout with Crypto (${totalPrice})</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>72-Hour Free Replacement Warranty Included</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
