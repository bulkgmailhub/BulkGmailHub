export type ServiceCategory = 'gmail' | 'other_webmail' | 'edu' | 'microsoft' | 'yahoo' | 'apple';

export interface PricingTier {
  id: string;
  quantity: number;
  unitLabel: string;
  price: number;
  oldPrice?: number;
  popular?: boolean;
  unitPrice?: number;
  discountBadge?: string;
}

export interface AccountSpec {
  label: string;
  value: string;
  icon?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface LoginGuideStep {
  step: number;
  title: string;
  desc: string;
  tip?: string;
}

export interface WarmupPhase {
  dayRange: string;
  sendingVolume: string;
  action: string;
  keyRule?: string;
}

export interface TechnicalDetails {
  protocol: string;
  imapServer: string;
  imapPort: string;
  smtpServer: string;
  smtpPort: string;
  sslTls: string;
  pop3Server?: string;
  appPasswordRequired?: boolean;
}

export interface BenchmarkStats {
  inboxRate: string;
  spamScore: string;
  dailyLimit: string;
  accountHealth: string;
  replacementRate: string;
}

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  logoType?: string;
  badge?: string;
  popular?: boolean;
  shortDescription: string;
  longDescriptionSeo: string;
  features: string[];
  specs: AccountSpec[];
  useCases: string[];
  pricingTiers: PricingTier[];
  faqs: ServiceFAQ[];
  warrantyHours: number;
  deliveryFormat: string;
  
  // Extended In-depth Content
  benchmarkStats?: BenchmarkStats;
  technicalDetails?: TechnicalDetails;
  loginGuide?: {
    overview: string;
    recommendedTools: string[];
    recommendedProxies: string;
    steps: LoginGuideStep[];
  };
  warmupPlan?: WarmupPhase[];
  codeExamples?: CodeSnippet[];
  securityNotice?: string;
}

export interface CartItem {
  cartItemId: string;
  serviceId: string;
  serviceSlug: string;
  serviceTitle: string;
  tierId: string;
  quantityCount: number;
  unitLabel: string;
  price: number;
}

export interface CryptoWallet {
  id: 'usdt_trc20' | 'btc' | 'ltc' | 'eth' | 'sol';
  name: string;
  network: string;
  symbol: string;
  address: string;
  badgeColor: string;
  qrBgColor: string;
  confirmationsNeeded: string;
  note: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customerEmail: string;
  contactMethod: 'telegram' | 'whatsapp' | 'email';
  contactHandle: string;
  notes?: string;
  items: CartItem[];
  totalPrice: number;
  cryptoCurrency: string;
  cryptoAddress: string;
  txid?: string;
  status: 'Pending Payment' | 'Processing' | 'Completed' | 'Delivered';
  estimatedDelivery: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  tags: string[];
}
