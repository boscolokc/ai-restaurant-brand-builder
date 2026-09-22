import { cn } from "@/lib/utils";
import type { Asset, AssetKind } from "@/lib/types";

const PALETTES: Record<string, [string, string]> = {
  FOOD_PHOTO: ["#8c3b22", "#d4a574"],
  INTERIOR: ["#2a2420", "#7a6550"],
  EXTERIOR: ["#1f4e5a", "#8fb4b8"],
  LOGO: ["#f4efe6", "#1f4e5a"],
  MENU: ["#efe6d8", "#5c4632"],
  OTHER: ["#3d5a45", "#c4a574"],
};

function hash(input: string) {
  return Array.from(input).reduce((n, c) => n + c.charCodeAt(0), 0);
}

export function PhotoTile({
  title,
  kind = "FOOD_PHOTO",
  className,
  overlay,
  large,
  expressive = false,
}: {
  title?: string | null;
  kind?: AssetKind | string;
  className?: string;
  overlay?: string;
  large?: boolean;
  expressive?: boolean;
}) {
  const [a, b] = expressive ? (PALETTES[kind] ?? PALETTES.OTHER) : (["#e2e8f0", "#cbd5e1"] as [string, string]);
  const angle = 24 + (hash(title ?? kind) % 50);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-line",
        large ? "min-h-64" : "min-h-36",
        className,
      )}
      style={{
        background: `linear-gradient(${angle}deg, ${a}, ${b})`,
      }}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_80%,black,transparent_40%)]" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3">
        <p className="text-[11px] uppercase tracking-wider text-white/70">{kind.replace("_", " ").toLowerCase()}</p>
        <p className={cn("text-lg leading-tight text-white", expressive && "font-display")}>{overlay ?? title ?? "Untitled"}</p>
      </div>
    </div>
  );
}

export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <div>
      <PhotoTile title={asset.title} kind={asset.kind} />
      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="truncate text-sm text-ink">{asset.title}</p>
        <span className="text-[10px] uppercase tracking-wider text-ink-soft">{asset.source}</span>
      </div>
    </div>
  );
}
