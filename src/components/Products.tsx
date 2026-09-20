import { ArrowRight, Clapperboard, Video } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function Products({
  products,
  ui,
}: {
  products: SiteContent["products"];
  ui: SiteContent["ui"];
}) {
  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-brand uppercase">
          {ui.productsEyebrow}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {ui.productsHeadline}
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {products.map((product) => {
          const Icon = product.id === "studio" ? Clapperboard : Video;
          return (
            <article
              key={product.id}
              className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-bg-panel p-6 sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-30 blur-3xl transition group-hover:opacity-50"
                style={{ background: product.accent }}
              />

              <div className="relative mb-8 flex h-40 items-end justify-between overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/5 to-transparent px-5 pb-5">
                <div>
                  <p className="text-xs font-medium tracking-wide text-brand">{product.badge}</p>
                  <h3 className="font-display mt-2 text-2xl font-bold text-white">{product.name}</h3>
                </div>
                <div
                  className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10"
                  style={{ background: `${product.accent}18` }}
                >
                  <Icon className="h-7 w-7 text-brand" />
                </div>
              </div>

              <p className="relative text-sm leading-relaxed text-text-muted sm:text-base">
                {product.description}
              </p>

              <ul className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature.title}
                    className="flex items-center gap-2 text-sm text-white/80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {feature.title}
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 flex flex-wrap gap-3">
                <a href="#pricing" className="btn-primary text-sm">
                  {product.primaryCta} <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#showcase" className="btn-secondary text-sm">
                  {product.secondaryCta}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
