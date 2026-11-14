import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Small amber marker for unconfirmed content. Hidden when
 *  site.showPlaceholderMarkers is false (final launch). */
export function PlaceholderTag({ children = "Placeholder", className }: { children?: string; className?: string }) {
  if (!site.showPlaceholderMarkers) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center border border-amber/50 bg-amber/10 px-2 py-0.5 font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber",
        className,
      )}
    >
      {children}
    </span>
  );
}
