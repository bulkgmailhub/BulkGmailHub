import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ShopCatalogPage } from './components/ShopCatalogPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { SEOHead } from './components/SEOHead';
import { CartDrawer } from './components/CartDrawer';
import { CryptoCheckoutModal } from './components/CryptoCheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { SERVICES_DATA } from './data/servicesData';
import { ServiceItem, PricingTier, CartItem, OrderRecord } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentServiceSlug, setCurrentServiceSlug] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('bgh_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState<boolean>(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bgh_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Handle URL hash changes for easy direct linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('service/')) {
        const slug = hash.replace('service/', '');
        const exists = SERVICES_DATA.some(s => s.slug === slug);
        if (exists) {
          setCurrentView('service-detail');
          setCurrentServiceSlug(slug);
          return;
        }
      }
      if (['home', 'shop', 'about', 'blog', 'contact'].includes(hash)) {
        setCurrentView(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: string, serviceSlug?: string) => {
    if (view === 'service-detail' && serviceSlug) {
      setCurrentView('service-detail');
      setCurrentServiceSlug(serviceSlug);
      window.location.hash = `service/${serviceSlug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (service: ServiceItem, tier: PricingTier, quantityCount: number) => {
    const existingIndex = cartItems.findIndex(
      item => item.serviceId === service.id && item.tierId === tier.id
    );

    const price = tier.price * quantityCount;
    const totalCount = tier.quantity * quantityCount;

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantityCount += totalCount;
      updated[existingIndex].price += price;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${service.id}-${tier.id}-${Date.now()}`,
        serviceId: service.id,
        serviceSlug: service.slug,
        serviceTitle: service.title,
        tierId: tier.id,
        quantityCount: totalCount,
        unitLabel: tier.unitLabel,
        price,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleDirectBuy = (service: ServiceItem, tier: PricingTier) => {
    const tempItem: CartItem = {
      cartItemId: `${service.id}-${tier.id}-${Date.now()}`,
      serviceId: service.id,
      serviceSlug: service.slug,
      serviceTitle: service.title,
      tierId: tier.id,
      quantityCount: tier.quantity,
      unitLabel: tier.unitLabel,
      price: tier.price,
    };
    setCheckoutItems([tempItem]);
    setIsCheckoutOpen(true);
  };

  const handleProceedCartToCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutItems([...cartItems]);
    setIsCheckoutOpen(true);
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
  };

  const handleUpdateCartQuantity = (cartItemId: string, newCount: number) => {
    // simplified update
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('bgh_cart');
    } catch {}
  };

  const currentService = SERVICES_DATA.find(s => s.slug === currentServiceSlug) || SERVICES_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Dynamic SEO Head & JSON-LD Structured Data */}
      <SEOHead
        currentView={currentView}
        currentService={currentView === 'service-detail' ? currentService : undefined}
      />

      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onAddToCart={handleAddToCart}
            onDirectBuy={handleDirectBuy}
            onViewDetails={(slug) => handleNavigate('service-detail', slug)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'shop' && (
          <ShopCatalogPage
            onAddToCart={handleAddToCart}
            onDirectBuy={handleDirectBuy}
            onViewDetails={(slug) => handleNavigate('service-detail', slug)}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailPage
            service={currentService}
            onAddToCart={handleAddToCart}
            onDirectBuy={handleDirectBuy}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentView === 'blog' && (
          <BlogPage onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
        onProceedToCheckout={handleProceedCartToCheckout}
        onNavigate={handleNavigate}
      />

      {/* Crypto Checkout Modal */}
      <CryptoCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        onClearCart={handleClearCart}
        onOrderCreated={(order) => {
          // order recorded
        }}
      />

      {/* Order Status Tracker Modal */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />

      {/* Floating 24/7 Live Contact Widget */}
      <FloatingContactWidget
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
      />
    </div>
  );
}
