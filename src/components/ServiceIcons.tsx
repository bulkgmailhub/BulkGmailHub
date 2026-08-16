import React from 'react';

export type ServiceLogoType = 
  | 'gmail' 
  | 'google-ads' 
  | 'google-reviews' 
  | 'apple-ios' 
  | 'hotmail' 
  | 'outlook'
  | 'yahoo' 
  | 'aol' 
  | 'icloud' 
  | 'edu'
  | 'edu-student'
  | 'github-pack'
  | 'google-vintage'
  | 'google-pva'
  | 'google-app-password';

interface LogoProps {
  className?: string;
  size?: number | string;
}

// 1. Official Google / Gmail Multi-Color Logo
export const GoogleGmailLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M42 12V36C42 38.2 40.2 40 38 40H34V18.1L24 25.4 14 18.1V40H10C7.8 40 6 38.2 6 36V12C6 10.3 7 8.8 8.6 8.2 10.1 7.6 11.9 8 13 8.9L24 18L35 8.9C36.1 8 37.9 7.6 39.4 8.2 41 8.8 42 10.3 42 12Z" />
    <path fill="#34A853" d="M10 40H14V18.1L6 12.2V36C6 38.2 7.8 40 10 40Z" />
    <path fill="#EA4335" d="M24 25.4L6 12.2V12C6 10.3 7 8.8 8.6 8.2 10.1 7.6 11.9 8 13 8.9L24 18L35 8.9C36.1 8 37.9 7.6 39.4 8.2 41 8.8 42 10.3 42 12V12.2L24 25.4Z" />
    <path fill="#FBBC05" d="M34 18.1V40H38C40.2 40 42 38.2 42 36V12.2L34 18.1Z" />
  </svg>
);

// 2. Official Google Ads Multi-Color Logo
export const GoogleAdsLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FBBC04" d="M4.8 33.3L17.1 12c1.7-3 5.6-4 8.6-2.3 3 1.7 4 5.6 2.3 8.6L15.7 39.6C14 42.6 10.1 43.6 7.1 41.9 4.1 40.2 3.1 36.3 4.8 33.3Z" />
    <path fill="#4285F4" d="M40.9 33.3L28.6 12c-1.7-3-5.6-4-8.6-2.3-3 1.7-4 5.6-2.3 8.6l12.3 21.3c1.7 3 5.6 4 8.6 2.3 3-1.7 4-5.6 2.3-8.6Z" />
    <circle cx="9" cy="37" r="5" fill="#34A853" />
  </svg>
);

// 3. Official Google Maps / Reviews Pin & Star Logo
export const GoogleReviewsLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 4C14.06 4 6 12.06 6 22c0 13.5 18 22 18 22s18-8.5 18-22c0-9.94-8.06-18-18-18Z" />
    <circle cx="24" cy="20" r="11" fill="#FFFFFF" />
    <path fill="#FBBC04" d="M24 12.5L26.3 17.2L31.5 17.9L27.7 21.6L28.6 26.8L24 24.3L19.4 26.8L20.3 21.6L16.5 17.9L21.7 17.2L24 12.5Z" />
  </svg>
);

// 4. Official Apple iOS / iPhone Logo
export const AppleIosLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#0F172A" />
    <path fill="#FFFFFF" d="M29.5 24.6C29.5 20.8 32.6 18.9 32.8 18.8C31 16.2 28.3 15.8 27.3 15.7C25 15.5 22.7 17.1 21.5 17.1C20.3 17.1 18.5 15.7 16.6 15.7C14.1 15.7 11.9 17.1 10.6 19.4C8 23.9 9.9 30.5 12.4 34.1C13.7 35.8 15.1 37.8 17 37.7C18.8 37.6 19.6 36.5 21.7 36.5C23.8 36.5 24.5 37.7 26.4 37.7C28.4 37.7 29.6 35.9 30.8 34.1C32.3 32 32.9 29.9 33 29.8C32.9 29.7 29.5 28.4 29.5 24.6Z" />
    <path fill="#FFFFFF" d="M26.2 13.3C27.2 12.1 27.8 10.4 27.6 8.7C26.1 8.8 24.3 9.7 23.3 10.9C22.4 12 21.7 13.7 21.9 15.4C23.6 15.5 25.3 14.5 26.2 13.3Z" />
  </svg>
);

// 5. Official Microsoft Outlook / Hotmail Logo
export const MicrosoftOutlookLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#0078D4" d="M26 10H40C41.1 10 42 10.9 42 12V36C42 37.1 41.1 38 40 38H26V10Z" />
    <path fill="#28A8EA" d="M26 14L40 24V12C40 10.9 39.1 10 38 10H26V14Z" opacity="0.6" />
    <path fill="#1490DF" d="M26 24L42 36H26V24Z" opacity="0.4" />
    <rect x="6" y="10" width="20" height="28" rx="3" fill="#0078D4" />
    <circle cx="16" cy="24" r="7" fill="#FFFFFF" />
    <circle cx="16" cy="24" r="4.5" fill="#0078D4" />
  </svg>
);

// 6. Official Yahoo! Mail Logo
export const YahooLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#6001D2" />
    <path fill="#FFFFFF" d="M12.5 13H18.2L24 25.2L29.8 13H35.5L27 28.5V36H21V28.5L12.5 13Z" />
    <circle cx="36" cy="34" r="2.5" fill="#FFFFFF" />
  </svg>
);

// 7. Official AOL Mail Logo
export const AolLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#FFC800" />
    <path fill="#111827" d="M19 13H13L7 35H12.5L14 29H18L19.5 35H25L19 13ZM15 25L16 20L17 25H15Z" />
    <circle cx="37" cy="24" r="4.5" fill="#111827" />
    <path fill="#111827" d="M27 13H32V35H27V13Z" />
  </svg>
);

// 8. Official Apple iCloud Logo
export const AppleIcloudLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="url(#icloud-grad)" />
    <path fill="#FFFFFF" d="M34.5 31.5H15.5C12.5 31.5 10 29 10 26C10 23.3 12 21 14.6 20.6C15.3 16.3 19 13 23.5 13C28.4 13 32.4 16.8 32.9 21.6C35.8 22.1 38 24.6 38 27.5C38 29.7 36.5 31.5 34.5 31.5Z" />
    <defs>
      <linearGradient id="icloud-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
    </defs>
  </svg>
);

// 9. Official EDU University Academic Cap Logo
export const EduUniversityLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#047857" />
    <path fill="#FDE047" d="M24 10L6 19L24 28L42 19L24 10Z" />
    <path fill="#FEF08A" d="M12 24.5V32C12 35.5 17.4 38 24 38C30.6 38 36 35.5 36 32V24.5L24 30.5L12 24.5Z" />
    <path stroke="#FDE047" strokeWidth="2" strokeLinecap="round" d="M39 20.5V32M39 32L37 35M39 32L41 35" />
  </svg>
);

// 10. Vintage Aged Google Logo
export const GoogleVintageLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <GoogleGmailLogo className="w-full h-full" />
    <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-mono font-black text-[9px] px-1 rounded shadow-xs border border-amber-300">
      OLD
    </span>
  </div>
);

// 11. PVA Verified Google Logo
export const GooglePvaLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <GoogleGmailLogo className="w-full h-full" />
    <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white font-mono font-black text-[9px] px-1 rounded shadow-xs border border-emerald-400">
      PVA
    </span>
  </div>
);

// 12. App Password SMTP Google Logo
export const GoogleAppPasswordLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <GoogleGmailLogo className="w-full h-full" />
    <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white font-mono font-black text-[8px] px-1 rounded shadow-xs border border-blue-400">
      2FA
    </span>
  </div>
);

// Unified Component that resolves the right official brand logo for any service
interface ServiceBrandLogoProps {
  serviceId?: string;
  category?: string;
  logoType?: ServiceLogoType | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ServiceBrandLogo: React.FC<ServiceBrandLogoProps> = ({
  serviceId = '',
  category = 'gmail',
  logoType,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const appliedClass = `${sizeClasses[size]} ${className}`;

  // Direct mapping by explicit logoType or IDs
  if (logoType === 'google-ads' || serviceId === 'aged-gmail-google-ads') {
    return <GoogleAdsLogo className={appliedClass} />;
  }
  if (logoType === 'google-reviews' || serviceId === 'aged-gmail-reviews') {
    return <GoogleReviewsLogo className={appliedClass} />;
  }
  if (logoType === 'apple-ios' || serviceId === 'iphone-created-gmail') {
    return <AppleIosLogo className={appliedClass} />;
  }
  if (logoType === 'hotmail' || logoType === 'outlook' || category === 'microsoft' || serviceId === 'aged-hotmail-outlook' || serviceId === 'fresh-hotmail-outlook' || serviceId === 'hotmail-accounts') {
    return <MicrosoftOutlookLogo className={appliedClass} />;
  }
  if (logoType === 'aol' || serviceId === 'aol-mail-accounts') {
    return <AolLogo className={appliedClass} />;
  }
  if (logoType === 'yahoo' || category === 'yahoo' || serviceId === 'aged-yahoo-mail' || serviceId === 'yahoo-accounts') {
    return <YahooLogo className={appliedClass} />;
  }
  if (logoType === 'icloud' || category === 'apple' || serviceId === 'icloud-mail-accounts' || serviceId === 'icloud-email-accounts') {
    return <AppleIcloudLogo className={appliedClass} />;
  }
  if (logoType === 'edu' || logoType === 'edu-student' || logoType === 'github-pack' || category === 'edu' || serviceId === 'edu-email-accounts' || serviceId === 'usa-edu-email-student-perks' || serviceId === 'github-student-pack-edu') {
    return <EduUniversityLogo className={appliedClass} />;
  }
  if (serviceId === 'usa-aged-gmail-2000-2016') {
    return <GoogleVintageLogo className={appliedClass} />;
  }
  if (serviceId === 'pva-gmail-accounts') {
    return <GooglePvaLogo className={appliedClass} />;
  }
  if (serviceId === 'aged-gmail-app-password') {
    return <GoogleAppPasswordLogo className={appliedClass} />;
  }

  // Default fallback based on category
  if (category === 'other_webmail') {
    return <MicrosoftOutlookLogo className={appliedClass} />;
  }
  
  return <GoogleGmailLogo className={appliedClass} />;
};
