"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import type { SiteContent } from "@/lib/types";

export function Pricing({
  content,
  ui,
}: {
  content: SiteContent["pricing"];
  ui: SiteContent["ui"];
}) {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {content.headline}
        </h2>
        <p className="mt-3 text-text-muted">{content.subheadline}</p>

        <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-bg-panel p-1.5">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !yearly ? "bg-white text-black" : "text-white/70"
            }`}
          >
            {ui.monthly}
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              yearly ? "bg-brand text-black" : "text-white/70"
            }`}
          >
            {ui.yearly}
          </button>
          <span className="pr-3 text-xs font-semibold text-brand">
            {content.yearlyDiscountLabel}
          </span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {content.plans.map((plan) => {
          const price = yearly ? plan.priceYearly : plan.priceMonthly;
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-[1.75rem] border p-6 sm:p-7 ${
                plan.highlighted
                  ? "border-brand/50 bg-gradient-to-b from-brand/15 to-bg-panel shadow-[0_0_50px_rgba(200,255,0,0.08)]"
                  : "border-line bg-bg-panel"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-bold text-black">
                  {plan.badge}
                </span>
              )}

              <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-text-muted">{plan.description}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-4xl font-extrabold text-white">${price}</span>
                <span className="pb-1 text-sm text-text-muted">{ui.perMonth}</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-3 w-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/admin"
                className={`mt-8 w-full text-sm ${
                  plan.highlighted ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
