import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Caveat,
  Noto_Sans_Khmer,
  Noto_Sans_Lao,
  Noto_Sans_Myanmar,
  Sora,
  Syne,
} from "next/font/google";
import { defaultLocale, isLocale, localeMeta } from "@/lib/i18n";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const notoLao = Noto_Sans_Lao({
  variable: "--font-noto-lao",
  subsets: ["lao"],
  weight: ["400", "500", "600", "700"],
});

const notoKhmer = Noto_Sans_Khmer({
  variable: "--font-noto-khmer",
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
});

const notoMyanmar = Noto_Sans_Myanmar({
  variable: "--font-noto-myanmar",
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CineAI — AI Filmmaking Studio",
  description:
    "AI filmmaking studio: create characters, scripts, settings, and videos in one platform.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headerLocale = (await headers()).get("x-locale") || defaultLocale;
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${sora.variable} ${syne.variable} ${caveat.variable} ${notoLao.variable} ${notoKhmer.variable} ${notoMyanmar.variable} h-full antialiased`}
      data-locale={locale}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
