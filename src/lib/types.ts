export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Character = {
  id: string;
  name: string;
  role: string;
  accent: string;
  image?: string;
};

export type Partner = {
  name: string;
};

export type ProductFeature = {
  title: string;
};

export type Product = {
  id: string;
  name: string;
  badge: string;
  description: string;
  features: ProductFeature[];
  primaryCta: string;
  secondaryCta: string;
  accent: string;
};

export type ShowcaseItem = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
};

export type FeatureHighlight = {
  id: string;
  title: string;
  description: string;
  icon: "character" | "scene" | "collab" | "ideas";
};

export type PricingPlan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
  };
  ui: {
    login: string;
    startCreating: string;
    search: string;
    monthly: string;
    yearly: string;
    perMonth: string;
    andMore: string;
    productsEyebrow: string;
    productsHeadline: string;
    emptyShowcase: string;
    footerBlurb: string;
    terms: string;
    privacy: string;
    menu: string;
  };
  nav: NavItem[];
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    scriptAccent: string;
    bubble: string;
    stats: Stat[];
    characters: Character[];
  };
  partners: {
    label: string;
    items: Partner[];
  };
  products: Product[];
  showcase: {
    headline: string;
    subheadline: string;
    categories: string[];
    items: ShowcaseItem[];
  };
  features: {
    eyebrow: string;
    headline: string;
    description: string;
    items: FeatureHighlight[];
  };
  pricing: {
    headline: string;
    subheadline: string;
    yearlyDiscountLabel: string;
    plans: PricingPlan[];
  };
  ctaBanner: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    columns: { title: string; links: NavItem[] }[];
    copyright: string;
    tagline: string;
  };
};
