"use client";

import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import type { Locale } from "@/lib/i18n";
import type { NavItem, SiteContent } from "@/lib/types";

export function Header({
  nav,
  ui,
  locale,
}: {
  nav: NavItem[];
  ui: SiteContent["ui"];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo href={`/${locale}`} />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href + item.label}
              href={item.href}
              className="text-sm font-medium text-white/70 transition hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            aria-label={ui.search}
            className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-brand"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href="/admin"
            className="px-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            {ui.login}
          </a>
          <a href="#pricing" className="btn-primary text-sm">
            {ui.startCreating} →
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label={ui.menu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-bg-elevated px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-brand"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="/admin" className="rounded-lg px-3 py-2 text-sm text-white/70">
              {ui.login} / CMS
            </a>
            <a href="#pricing" className="btn-primary mt-1 text-sm">
              {ui.startCreating} →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
