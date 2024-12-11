// Define the types for siteConfig to ensure type safety
type ThemeOptions = 'light' | 'dark' | 'system';

type NavigationLink = {
  label: string;
  href: string;
  icon?: string;
};

type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

type AdsConfig = {
  enabled: boolean;
  adClient: string;
  adSlots: {
    [key: string]: string;
  };
};

type SEOConfig = {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  openGraph: {
    type: string;
    image: string;
    url: string;
  };
  twitter: {
    handle: string;
    cardType: string;
  };
};

type FooterConfig = {
  text: string;
  links: NavigationLink[];
};

type FeatureToggle = {
  [key: string]: boolean; // e.g., { blog: true, shop: false }
};

type AnalyticsConfig = {
  enabled: boolean;
  provider: 'googleAnalytics' | 'plausible' | 'posthog' | null;
  trackingId: string | null;
};

type SiteConfig = {
  general: {
    siteName: string;
    siteUrl: string;
    logo: string;
    favicon: string;
  };
  theme: {
    defaultTheme: ThemeOptions;
    allowThemeSwitching: boolean;
  };
  navigation: {
    mainMenu: NavigationLink[];
    footerMenu: NavigationLink[];
  };
  socialLinks: SocialLink[];
  ads: AdsConfig;
  seo: SEOConfig;
  footer: FooterConfig;
  features: FeatureToggle;
  analytics: AnalyticsConfig;
};

// Export the configuration
const siteConfig: SiteConfig = {
  general: {
    siteName: "My Awesome Website",
    siteUrl: "http://localhost:8080",
    logo: "/images/logo.svg",
    favicon: "/favicon.ico",
  },
  theme: {
    defaultTheme: "light",
    allowThemeSwitching: true,
  },
  navigation: {
    mainMenu: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    footerMenu: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  socialLinks: [
    { platform: "Twitter", url: "https://twitter.com/myprofile", icon: "twitter-icon.svg" },
    { platform: "Facebook", url: "https://facebook.com/myprofile", icon: "facebook-icon.svg" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/myprofile", icon: "linkedin-icon.svg" },
  ],
  ads: {
    enabled: true,
    adClient: "ca-pub-1651955846469249",
    adSlots: {
      header: "123456",
      sidebar: "789012",
      footer: "345678",
      square: "9772612530"
    },
  },
  seo: {
    title: "Welcome to My Awesome Website",
    description: "The best website for awesome content and resources.",
    keywords: ["awesome", "website", "resources"],
    author: "John Doe",
    openGraph: {
      type: "website",
      image: "/images/og-image.jpg",
      url: "https://www.myawesomewebsite.com",
    },
    twitter: {
      handle: "@mytwitterhandle",
      cardType: "summary_large_image",
    },
  },
  footer: {
    text: "© 2024 My Awesome Website. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  features: {
    blog: true,
    shop: false,
    forum: true,
    newsletter: true,
  },
  analytics: {
    enabled: true,
    provider: "googleAnalytics",
    trackingId: "G-SJGKC6KJHJ",
  },
};

export default siteConfig;
