import React, { useEffect } from 'react';
import { SEO_PAGE_REGISTRY } from '../data/seoData';
import { ServiceItem, BlogPost } from '../types';

interface SEOHeadProps {
  currentView: string;
  currentService?: ServiceItem;
  currentBlog?: BlogPost;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  currentView,
  currentService,
  currentBlog,
}) => {
  useEffect(() => {
    // Determine active SEO config
    let seoConfig = SEO_PAGE_REGISTRY[currentView] || SEO_PAGE_REGISTRY['home'];

    if (currentView === 'service-detail' && currentService) {
      seoConfig = SEO_PAGE_REGISTRY[currentService.slug] || {
        slug: currentService.slug,
        view: 'service-detail',
        primaryKeyword: currentService.title,
        secondaryKeywords: [currentService.badge, 'Bulk Email Accounts', 'Verified Inboxes'].filter(Boolean) as string[],
        searchIntent: 'Transactional',
        seoTitle: `${currentService.title} | Bulk Verified Accounts | BulkGmailHub`,
        metaDescription: currentService.shortDescription,
        h1: currentService.title,
        canonicalUrl: `https://bulkgmailhub.com/#service/${currentService.slug}`,
        semanticTerms: currentService.features,
        breadcrumbs: [
          { name: 'Home', url: 'https://bulkgmailhub.com/' },
          { name: 'Shop', url: 'https://bulkgmailhub.com/#shop' },
          { name: currentService.title, url: `https://bulkgmailhub.com/#service/${currentService.slug}` },
        ],
        schemaType: 'Service',
        clusterCategory: 'gmail',
        internalLinks: [],
        cta: { primaryText: 'Buy Now', secondaryText: 'View Tiers', targetAction: 'buy' },
      };
    } else if (currentView === 'blog' && currentBlog) {
      seoConfig = {
        slug: currentBlog.slug,
        view: 'blog',
        primaryKeyword: currentBlog.title,
        secondaryKeywords: currentBlog.tags,
        searchIntent: 'Informational',
        seoTitle: `${currentBlog.title} | BulkGmailHub Guides`,
        metaDescription: currentBlog.excerpt,
        h1: currentBlog.title,
        canonicalUrl: `https://bulkgmailhub.com/#blog/${currentBlog.slug}`,
        semanticTerms: currentBlog.tags,
        breadcrumbs: [
          { name: 'Home', url: 'https://bulkgmailhub.com/' },
          { name: 'Blog', url: 'https://bulkgmailhub.com/#blog' },
          { name: currentBlog.title, url: `https://bulkgmailhub.com/#blog/${currentBlog.slug}` },
        ],
        schemaType: 'Article',
        clusterCategory: 'blog',
        internalLinks: [],
        cta: { primaryText: 'Explore Verified Accounts', secondaryText: 'Shop Now', targetAction: 'shop' },
      };
    }

    // 1. Update Title
    document.title = seoConfig.seoTitle;

    // Helper to safely set or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper to set link tags (e.g. canonical)
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // 2. Set Core Meta Tags
    setMetaTag('description', seoConfig.metaDescription);
    setMetaTag('keywords', [seoConfig.primaryKeyword, ...seoConfig.secondaryKeywords, ...seoConfig.semanticTerms].slice(0, 10).join(', '));
    setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setLinkTag('canonical', seoConfig.canonicalUrl);

    // 3. OpenGraph Tags
    setMetaTag('og:title', seoConfig.seoTitle, true);
    setMetaTag('og:description', seoConfig.metaDescription, true);
    setMetaTag('og:url', seoConfig.canonicalUrl, true);
    setMetaTag('og:site_name', 'BulkGmailHub', true);
    setMetaTag('og:type', currentView === 'blog' && currentBlog ? 'article' : 'website', true);

    // 4. Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', seoConfig.seoTitle);
    setMetaTag('twitter:description', seoConfig.metaDescription);

    // 5. Injected JSON-LD Structured Data
    const schemas: object[] = [];

    // Organization Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://bulkgmailhub.com/#organization',
      name: 'BulkGmailHub',
      url: 'https://bulkgmailhub.com/',
      logo: 'https://bulkgmailhub.com/icon.svg',
      description: 'Global provider of authentic, residential-IP verified bulk Gmail, vintage aged accounts (2000–2024), App Passwords, Hotmail, Yahoo, and .EDU student emails with crypto checkout and 72-hour warranty.',
      email: 'bulkgmailhub@gmail.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'bulkgmailhub@gmail.com',
          availableLanguage: ['English'],
          contactOption: 'TollFree',
          areaServed: 'Worldwide',
        },
      ],
      sameAs: [
        'https://t.me/bulkgmailhub',
        'https://wa.me/message/bulkgmailhub',
      ],
    });

    // WebSite Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://bulkgmailhub.com/#website',
      name: 'BulkGmailHub',
      url: 'https://bulkgmailhub.com/',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://bulkgmailhub.com/#shop?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    });

    // BreadcrumbList Schema
    if (seoConfig.breadcrumbs && seoConfig.breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: seoConfig.breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      });
    }

    // Product / Service Schema for Service Pages
    if (currentView === 'service-detail' && currentService) {
      const minPrice = Math.min(...currentService.pricingTiers.map(t => t.price / t.quantity));
      const maxPrice = Math.max(...currentService.pricingTiers.map(t => t.price));

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: currentService.title,
        description: currentService.shortDescription,
        category: currentService.category,
        brand: {
          '@type': 'Brand',
          name: 'BulkGmailHub',
        },
        sku: `BGH-${currentService.id.toUpperCase()}`,
        offers: {
          '@type': 'AggregateOffer',
          url: `https://bulkgmailhub.com/#service/${currentService.slug}`,
          priceCurrency: 'USD',
          lowPrice: minPrice.toFixed(2),
          highPrice: maxPrice.toFixed(2),
          offerCount: currentService.pricingTiers.length.toString(),
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'BulkGmailHub',
          },
          priceValidUntil: '2027-12-31',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '348',
          bestRating: '5',
          worstRating: '1',
        },
      });

      // FAQ Schema if available on service page
      if (currentService.faqs && currentService.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: currentService.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        });
      }
    }

    // FAQ Schema for Homepage
    if (currentView === 'home') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How fast is account delivery after payment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Once your crypto payment confirms on the blockchain (typically 1 to 10 minutes), your account credentials are displayed on screen for immediate download and sent to your email address.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which cryptocurrencies can I pay with?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We accept USDT (TRC-20), Bitcoin (BTC), Litecoin (LTC), Ethereum (ETH), and Solana (SOL) with zero hidden merchant fees.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the 72-hour replacement warranty work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If any account in your order experiences a login checkpoint or invalid credential issue during the first 72 hours, we will replace it free of charge via Telegram or WhatsApp support.',
            },
          },
        ],
      });
    }

    // Article Schema for Blog
    if (currentView === 'blog' && currentBlog) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: currentBlog.title,
        description: currentBlog.excerpt,
        datePublished: '2026-08-12T00:00:00Z',
        dateModified: '2026-08-16T00:00:00Z',
        author: {
          '@type': 'Person',
          name: currentBlog.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'BulkGmailHub',
          logo: {
            '@type': 'ImageObject',
            url: 'https://bulkgmailhub.com/icon.svg',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://bulkgmailhub.com/#blog/${currentBlog.slug}`,
        },
      });
    }

    // Inject JSON-LD Script tag
    let scriptTag = document.getElementById('bgh-jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'bgh-jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemas);

  }, [currentView, currentService, currentBlog]);

  return null;
};
