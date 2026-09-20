import type { SiteContent } from "@/lib/types";

export function Partners({
  content,
  andMore,
}: {
  content: SiteContent["partners"];
  andMore: string;
}) {
  const loop = [...content.items, ...content.items];

  return (
    <section className="border-y border-line bg-bg-elevated/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-5 text-center text-xs font-medium tracking-[0.22em] text-text-muted uppercase">
          {content.label}
        </p>
        <div className="overflow-hidden mask-[linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track items-center">
            {loop.map((partner, index) => (
              <span
                key={`${partner.name}-${index}`}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-white/35 transition hover:text-white/70"
              >
                {partner.name}
              </span>
            ))}
            <span className="whitespace-nowrap text-sm text-white/30">{andMore}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
