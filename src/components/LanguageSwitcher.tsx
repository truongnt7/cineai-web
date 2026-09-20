"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeMeta, locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    const parts = pathname.split("/");
    parts[1] = next;
    const nextPath = parts.join("/") || `/${next}`;
    router.push(nextPath);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-sm font-medium text-white/80 transition hover:border-brand/40 hover:text-brand"
        aria-label="Language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{localeMeta[locale].short}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-line bg-bg-panel shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          {locales.map((item) => {
            const active = item === locale;
            return (
              <button
                key={item}
                type="button"
                onClick={() => switchTo(item)}
                className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition ${
                  active ? "bg-brand/15 text-brand" : "text-white/80 hover:bg-white/5"
                }`}
              >
                <span>
                  <span className="block font-medium">{localeMeta[item].nativeLabel}</span>
                  <span className="block text-xs text-white/45">{localeMeta[item].label}</span>
                </span>
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
