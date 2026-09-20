export const locales = ["vi", "en", "lo", "km", "my"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; short: string; htmlLang: string }
> = {
  vi: {
    label: "Vietnamese",
    nativeLabel: "Tiếng Việt",
    short: "VI",
    htmlLang: "vi",
  },
  en: {
    label: "English",
    nativeLabel: "English",
    short: "EN",
    htmlLang: "en",
  },
  lo: {
    label: "Lao",
    nativeLabel: "ພາສາລາວ",
    short: "LO",
    htmlLang: "lo",
  },
  km: {
    label: "Khmer",
    nativeLabel: "ភាសាខ្មែរ",
    short: "KM",
    htmlLang: "km",
  },
  my: {
    label: "Myanmar",
    nativeLabel: "မြန်မာ",
    short: "MY",
    htmlLang: "my",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(locale: Locale, path = "") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}
