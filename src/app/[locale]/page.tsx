import { CtaBanner, Footer } from "@/components/Footer";
import { Features } from "@/components/Features";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { Pricing } from "@/components/Pricing";
import { Products } from "@/components/Products";
import { Showcase } from "@/components/Showcase";
import { getSiteContent } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = await getSiteContent(locale);

  return (
    <>
      <Header nav={content.nav} ui={content.ui} locale={locale} />
      <main className="flex-1">
        <Hero content={content.hero} />
        <Partners content={content.partners} andMore={content.ui.andMore} />
        <Products products={content.products} ui={content.ui} />
        <Showcase content={content.showcase} emptyLabel={content.ui.emptyShowcase} />
        <Features content={content.features} />
        <Pricing content={content.pricing} ui={content.ui} />
        <CtaBanner content={content.ctaBanner} />
      </main>
      <Footer
        content={content.footer}
        brand={content.brand}
        ui={content.ui}
        locale={locale}
      />
    </>
  );
}
