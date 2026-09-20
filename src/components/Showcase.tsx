"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { SiteContent } from "@/lib/types";

export function Showcase({
  content,
  emptyLabel,
}: {
  content: SiteContent["showcase"];
  emptyLabel: string;
}) {
  const [active, setActive] = useState(content.categories[0] ?? "Tất cả");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    if (active === "Tất cả") return content.items;
    return content.items.filter((item) => item.category === active);
  }, [active, content.items]);

  const scrollBy = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="showcase" className="border-y border-line bg-bg-elevated/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.headline}
            </h2>
            <p className="mt-3 text-text-muted">{content.subheadline}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-white/70 transition hover:border-brand/40 hover:text-brand"
              aria-label="Trước"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-white/70 transition hover:border-brand/40 hover:text-brand"
              aria-label="Sau"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {content.categories.map((category) => {
            const selected = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? "bg-brand text-black"
                    : "border border-line bg-transparent text-white/70 hover:border-brand/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative w-[260px] shrink-0 overflow-hidden rounded-2xl border border-line bg-bg-panel sm:w-[300px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button
                  type="button"
                  className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-black opacity-0 transition group-hover:opacity-100"
                  aria-label={`Phát ${item.title}`}
                >
                  <Play className="h-5 w-5 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs font-medium tracking-wide text-brand">{item.category}</p>
                <h3 className="mt-1 text-base font-semibold text-white">{item.title}</h3>
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <p className="py-10 text-sm text-text-muted">{emptyLabel}</p>
          )}
        </div>
      </div>
    </section>
  );
}
