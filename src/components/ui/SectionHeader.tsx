import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";
import { cn } from "@/lib/utils";

export function SectionHeader({
  index, eyebrow, lines, lineClass, text, className, align = "left", id,
}: {
  index?: string;
  eyebrow: string;
  lines: string[];
  lineClass?: Record<number, string>;
  text?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <span className="eyebrow">{index ? `${index} — ` : ""}{eyebrow}</span>
      </Reveal>
      <SplitHeading
        lines={lines}
        lineClass={lineClass}
        className={cn("mt-5 text-[clamp(2.6rem,8.2vw,6rem)]", id && "scroll-mt-28")}
      />
      {text && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-xl text-base leading-relaxed text-silver md:text-lg", align === "center" && "mx-auto")}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
