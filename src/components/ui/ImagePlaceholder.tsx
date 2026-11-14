import { Image as ImageIcon } from "lucide-react";

export function ImagePlaceholder({ label = "Image coming soon", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-panel text-mist ${className}`}>
      <ImageIcon aria-hidden="true" className="size-8 text-amber/70" strokeWidth={1.3} />
      <span className="font-display text-xs font-semibold uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
