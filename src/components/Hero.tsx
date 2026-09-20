import { Play, Star } from "lucide-react";
import type { SiteContent } from "@/lib/types";

function CharacterPortrait({
  name,
  role,
  accent,
  delay,
}: {
  name: string;
  role: string;
  accent: string;
  delay: number;
}) {
  const isEcho = name === "ECHO";

  return (
    <div
      className="animate-float relative flex w-[104px] shrink-0 flex-col items-center sm:w-[120px] lg:w-[132px]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.4rem] border border-white/10"
        style={{
          background: `linear-gradient(160deg, ${accent}33 0%, #151515 45%, #0a0a0a 100%)`,
        }}
      >
        <div
          className="absolute inset-x-3 top-4 h-20 rounded-full blur-2xl opacity-60"
          style={{ background: accent }}
        />
        {isEcho ? (
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15"
              style={{ background: `${accent}22` }}
            >
              <svg viewBox="0 0 48 48" className="h-10 w-10">
                <rect x="10" y="14" width="28" height="22" rx="8" fill={accent} opacity="0.9" />
                <circle cx="20" cy="24" r="3" fill="#050505" />
                <circle cx="28" cy="24" r="3" fill="#050505" />
                <rect x="18" y="30" width="12" height="2.5" rx="1" fill="#050505" opacity="0.7" />
                <rect x="20" y="8" width="8" height="6" rx="2" fill={accent} />
              </svg>
            </div>
          </div>
        ) : (
          <>
            <div
              className="absolute left-1/2 top-[18%] h-[38%] w-[52%] -translate-x-1/2 rounded-[45%] opacity-90"
              style={{
                background: `linear-gradient(180deg, ${accent}aa, ${accent}33)`,
              }}
            />
            <div className="absolute bottom-0 left-1/2 h-[48%] w-[78%] -translate-x-1/2 rounded-t-[2rem] bg-gradient-to-b from-white/20 to-black/40" />
            <div
              className="absolute bottom-[38%] left-1/2 h-8 w-8 -translate-x-1/2 rounded-full blur-md opacity-70"
              style={{ background: accent }}
            />
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-2 pb-2.5 pt-8 text-center">
          <p className="text-[0.7rem] font-bold tracking-wide text-white">{name}</p>
          <p className="text-[0.58rem] text-white/55">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section className="relative overflow-hidden noise-overlay">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-brand-deep/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="animate-rise relative z-10 max-w-xl">
          <p className="font-script mb-4 text-2xl text-brand sm:text-3xl">
            {content.scriptAccent}
          </p>
          <h1 className="font-display whitespace-pre-line text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            {content.headline}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
            {content.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#pricing" className="btn-primary">
              {content.primaryCta} →
            </a>
            <a href="#showcase" className="btn-secondary">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/15 text-brand">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              {content.secondaryCta}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 border-t border-line pt-6 sm:gap-10">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-1.5">
                  <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  {stat.value.includes("4.9") && (
                    <span className="flex text-brand">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] sm:min-h-[420px]">
          <div className="absolute right-2 top-2 z-20 max-w-[200px] rounded-2xl border border-brand/30 bg-bg-panel/90 px-3 py-2 text-sm text-white shadow-[0_0_30px_rgba(200,255,0,0.12)] backdrop-blur sm:right-6 sm:top-6">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-brand" />
            {content.bubble}
          </div>

          <div className="flex h-full items-end justify-center gap-2 overflow-x-auto pb-2 pt-16 sm:gap-3 lg:justify-end lg:overflow-visible">
            {content.characters.map((character, index) => (
              <CharacterPortrait
                key={character.id}
                name={character.name}
                role={character.role}
                accent={character.accent}
                delay={index * 180}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
