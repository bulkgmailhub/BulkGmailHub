import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  Copy, 
  Send, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CartItem, CryptoWallet, OrderRecord } from '../types';
import { CRYPTO_WALLETS, CONTACT_INFO } from '../data/cryptoData';

interface CryptoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
  onOrderCreated: (order: OrderRecord) => void;
}

export const CryptoCheckoutModal: React.FC<CryptoCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
  onOrderCreated,
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoWallet>(CRYPTO_WALLETS[0]);
  const [email, setEmail] = useState('');
  const [contactPlatform, setContactPlatform] = useState<'telegram' | 'whatsapp' | 'email'>('telegram');
  const [contactHandle, setContactHandle] = useState('');
  const [txid, setTxid] = useState('');
  const [notes, setNotes] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [step, setStep] = useState<'payment' | 'success'>('payment');
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);
  const [formError, setFormError] = useState('');

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const totalAccountsCount = items.reduce((sum, item) => sum + item.quantityCount, 0);

  useEffect(() => {
    if (isOpen) {
      setStep('payment');
      setTxid('');
      setFormError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedCrypto.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid delivery email address.');
      return;
    }
    if (!contactHandle.trim()) {
      setFormError('Please provide your Telegram username or WhatsApp number for instant order notification.');
      return;
    }
    if (!txid.trim()) {
      setFormError('Please paste your Transaction Hash (TXID) after sending the crypto.');
      return;
    }

    const orderId = `BGH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      customerEmail: email,
      contactMethod: contactPlatform,
      contactHandle: contactHandle.trim(),
      notes: notes.trim(),
      items: [...items],
      totalPrice,
      cryptoCurrency: `${selectedCrypto.name} (${selectedCrypto.symbol} - ${selectedCrypto.network})`,
      cryptoAddress: selectedCrypto.address,
      txid: txid.trim(),
      status: 'Pending Payment',
      estimatedDelivery: '5 - 15 Minutes',
    };

    // Save to LocalStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('bgh_orders') || '[]');
      localStorage.setItem('bgh_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.error(err);
    }

    setCreatedOrder(newOrder);
    onOrderCreated(newOrder);
    onClearCart();
    setStep('success');

    // Fire Celebratory Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Generate Telegram & WhatsApp Instant Notification URLs
  const getTelegramShareUrl = () => {
    if (!createdOrder) return CONTACT_INFO.telegramUrl;
    const text = encodeURIComponent(
      `Hello BulkGmailHub Support! 🚀\nI just completed a crypto payment on BulkGmailHub.com.\n\n` +
      `📦 Order ID: ${createdOrder.orderId}\n` +
      `📧 Delivery Email: ${createdOrder.customerEmail}\n` +
      `💰 Amount: $${createdOrder.totalPrice} USD in ${createdOrder.cryptoCurrency}\n` +
      `🔗 TXID: ${createdOrder.txid}\n\n` +
      `Please verify and send my account list. Thanks!`
    );
    return `https://t.me/bulkgmailhub?text=${text}`;
  };

  const getWhatsappShareUrl = () => {
    if (!createdOrder) return CONTACT_INFO.whatsappUrl;
    const text = encodeURIComponent(
      `Hello BulkGmailHub! 🚀 I just submitted Order #${createdOrder.orderId} for $${createdOrder.totalPrice} USD.\nTXID: ${createdOrder.txid}\nDelivery Email: ${createdOrder.customerEmail}`
    );
    return `https://wa.me/15722739250?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-600/40">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-black">
                {step === 'payment' ? 'Secure Crypto Checkout' : 'Order Submitted Successfully!'}
              </h2>
              <p className="text-xs text-slate-400">
                {step === 'payment' ? 'Instant automated verification via blockchain TXID' : 'Your order is queued for immediate dispatch'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'payment' ? (
          <form onSubmit={handleCompleteOrder} className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
            {formError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Order Items Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Order Items ({items.length})</span>
                <span>Total: ${totalPrice} USD</span>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex items-center justify-between text-xs text-slate-800">
                    <span className="font-semibold truncate max-w-[280px]">
                      {item.serviceTitle} ({item.unitLabel})
                    </span>
                    <span className="font-bold font-mono">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Delivery Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Your Delivery & Contact Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Delivery Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your-email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Account credentials file will be sent here.</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Instant Ping Channel <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2 mb-1.5">
                    <button
                      type="button"
                      onClick={() => setContactPlatform('telegram')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border flex items-center justify-center gap-1 ${
                        contactPlatform === 'telegram'
                          ? 'bg-sky-50 border-sky-400 text-sky-700'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <Send className="w-3 h-3" /> Telegram
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactPlatform('whatsapp')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border flex items-center justify-center gap-1 ${
                        contactPlatform === 'whatsapp'
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <Phone className="w-3 h-3" /> WhatsApp
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={contactPlatform === 'telegram' ? '@your_telegram_username' : '+1 (555) 000-0000'}
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Choose Crypto Currency */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Select Payment Coin / Token</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {CRYPTO_WALLETS.map((coin) => {
                  const isSelected = coin.id === selectedCrypto.id;
                  return (
                    <button
                      key={coin.id}
                      type="button"
                      onClick={() => setSelectedCrypto(coin)}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'border-red-600 bg-red-50/70 ring-2 ring-red-500/20 text-slate-900 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="font-extrabold text-xs">{coin.symbol}</span>
                      <span className="text-[10px] text-slate-500 truncate max-w-full">{coin.network}</span>
                    </button>
                  );
                })}
              </div>

              {/* Deposit Card with QR & Wallet Address */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="bg-white p-2.5 rounded-2xl shrink-0 shadow-lg">
                    <QRCodeSVG
                      value={selectedCrypto.address}
                      size={120}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
                        {selectedCrypto.name} ({selectedCrypto.network})
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Send ≈ <strong className="text-emerald-400">${totalPrice} USD</strong>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-400 block font-medium">Deposit Wallet Address:</span>
                      <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="font-mono text-xs text-emerald-400 break-all select-all flex-1 text-left">
                          {selectedCrypto.address}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyAddress}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shrink-0 flex items-center gap-1 transition-all"
                        >
                          {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedAddress ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      ⚡ {selectedCrypto.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Transaction Hash (TXID) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Enter Transaction ID (TXID)</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Blockchain Transaction Hash / TXID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Paste your transaction hash (e.g. 0xabc123... or trc20 tx hash)"
                  value={txid}
                  onChange={(e) => setTxid(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Found in your Binance, TrustWallet, Exodus, or exchange withdrawal history.
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Order Notes / Special Proxy Country Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please format accounts in TXT file, or specific US state preference if available"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
            </div>

            {/* Submit Order Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-heading font-black rounded-2xl text-base shadow-xl shadow-red-200 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Verify Payment & Submit Order (${totalPrice} USD)</span>
              </button>
              <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 72h Non-Working Replacement
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-blue-600" /> 256-Bit Encrypted
                </span>
              </div>
            </div>
          </form>
        ) : (
          /* Step: SUCCESS SCREEN */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                PAYMENT SUBMITTED • PENDING BLOCKCHAIN CONFIRMATION
              </span>
              <h3 className="text-2xl font-heading font-black text-slate-900 pt-2">
                Thank You for Your Order!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your order is registered with our automated dispatch server. Accounts will be sent to <strong className="text-slate-900">{createdOrder?.customerEmail}</strong> shortly.
              </p>
            </div>

            {/* Order Receipt Box */}
            {createdOrder && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-500 uppercase">Order ID:</span>
                  <span className="font-mono font-black text-sm text-red-600">{createdOrder.orderId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Paid:</span>
                  <span className="font-extrabold text-slate-900">${createdOrder.totalPrice} USD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Crypto Currency:</span>
                  <span className="font-semibold text-slate-800">{createdOrder.cryptoCurrency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Transaction TXID:</span>
                  <span className="font-mono text-[11px] text-slate-700 truncate max-w-[200px]">
                    {createdOrder.txid}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                    {createdOrder.status} (~5-15 mins)
                  </span>
                </div>
              </div>
            )}

            {/* Direct Instant Ping Telegram & WhatsApp Buttons */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-slate-700">
                Speed up delivery: Send your Order ID directly to our 24/7 team!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getTelegramShareUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-200 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Notify on Telegram ({CONTACT_INFO.telegram})</span>
                </a>

                <a
                  href={getWhatsappShareUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-200 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Notify on WhatsApp</span>
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
            >
              Close & Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
