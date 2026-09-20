import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { localeMeta, type Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/types";

const socialIcons = [
  {
    label: "TikTok",
    path: "M14 4v3.2a5.4 5.4 0 0 0 3.8 1.5V12a8.2 8.2 0 0 1-3.8-1v6.4A5.4 5.4 0 1 1 8.6 12v3.1a2.3 2.3 0 1 0 1.6 2.2V4H14z",
  },
  {
    label: "Facebook",
    path: "M14 8h-2a1.5 1.5 0 0 0-1.5 1.5V12H14l-.5 3h-2v7H8v-7H6v-3h2V9.2A4.2 4.2 0 0 1 12.3 5H14v3z",
  },
  {
    label: "Instagram",
    path: "M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zm5.1-8.5a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1zM12 4.5c-2.2 0-2.5 0-3.4.1a4 4 0 0 0-2.5 1 4 4 0 0 0-1 2.5c-.1.9-.1 1.2-.1 3.4s0 2.5.1 3.4a4 4 0 0 0 1 2.5 4 4 0 0 0 2.5 1c.9.1 1.2.1 3.4.1s2.5 0 3.4-.1a4 4 0 0 0 2.5-1 4 4 0 0 0 1-2.5c.1-.9.1-1.2.1-3.4s0-2.5-.1-3.4a4 4 0 0 0-1-2.5 4 4 0 0 0-2.5-1c-.9-.1-1.2-.1-3.4-.1z",
  },
  {
    label: "LinkedIn",
    path: "M6.5 9.5H9v9H6.5zm1.2-4a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zM11 9.5h2.4v1.2h.1A2.6 2.6 0 0 1 16 9.3c2.1 0 2.5 1.4 2.5 3.2v5h-2.5v-4.4c0-1.1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3v4.5H11z",
  },
];

export function CtaBanner({ content }: { content: SiteContent["ctaBanner"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-bg-panel px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(200,255,0,0.18),transparent_40%)]" />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-2 text-text-muted">{content.subtitle}</p>
          </div>
          <a href="#pricing" className="btn-primary">
            {content.button} →
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({
  content,
  brand,
  ui,
  locale,
}: {
  content: SiteContent["footer"];
  brand: SiteContent["brand"];
  ui: SiteContent["ui"];
  locale: Locale;
}) {
  return (
    <footer id="company" className="border-t border-line bg-bg-elevated/70 pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo href={`/${locale}`} />
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              {brand.tagline} — {ui.footerBlurb}
            </p>
            <div className="mt-5 flex gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-white/60 transition hover:border-brand/40 hover:text-brand"
                  aria-label={social.label}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {content.columns.map((column) => (
              <div key={column.title}>
                <p className="mb-3 text-sm font-semibold text-white">{column.title}</p>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-text-muted transition hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">{content.copyright}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <a href="#" className="hover:text-brand">
              {ui.terms}
            </a>
            <a href="#" className="hover:text-brand">
              {ui.privacy}
            </a>
            <LanguageSwitcher locale={locale} />
            <span className="rounded-full border border-line px-3 py-1">
              {localeMeta[locale].nativeLabel}
            </span>
          </div>
          <p className="font-script text-xl text-brand">{content.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
