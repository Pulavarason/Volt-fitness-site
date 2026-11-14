import { Zap } from "lucide-react";

const words = ["Strength", "Discipline", "Confidence", "Performance", "Community"];

export function Marquee() {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-line bg-graphite py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="display px-8 text-[clamp(1.6rem,3.2vw,2.5rem)] text-white/90">{w}</span>
                <Zap className="size-5 fill-amber text-amber" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
