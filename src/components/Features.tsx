import { Lightbulb, Map, Share2, Sparkles, Users } from "lucide-react";
import type { SiteContent } from "@/lib/types";

const iconMap = {
  character: Users,
  scene: Map,
  collab: Share2,
  ideas: Lightbulb,
};

export function Features({ content }: { content: SiteContent["features"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-line bg-bg-panel">
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[420px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(200,255,0,0.25),transparent_45%),linear-gradient(140deg,#1a1a1a,#050505)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-panel to-transparent" />
            <div className="absolute left-[18%] top-[22%] h-40 w-28 -rotate-6 rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-brand/40 to-black/40" />
            <div className="absolute right-[18%] top-[30%] h-48 w-56 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(200,255,0,0.15),rgba(10,10,10,0.8))]" />
            <Sparkles className="absolute right-10 top-10 h-6 w-6 text-brand" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
              {content.eyebrow}
            </p>
            <h2 className="font-display mt-3 whitespace-pre-line text-3xl font-bold leading-tight text-white sm:text-4xl">
              {content.headline}
            </h2>
            <p className="mt-4 text-text-muted">{content.description}</p>
          </div>
        </div>

        <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.id} className="bg-bg-panel p-6 transition hover:bg-bg-soft">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
