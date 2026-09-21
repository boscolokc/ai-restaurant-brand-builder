import Link from "next/link";
import type { StarterPackage } from "@/lib/types";
import { Clapperboard, Globe, Palette, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  {
    key: "websiteReady",
    title: "Your website",
    blurb: "A simple phone site in your colours. Guests can read the story and find you.",
    href: "website",
    icon: Globe,
    tint: "bg-sage",
    cta: "Start",
  },
  {
    key: "socialCreatives",
    title: "Social posts",
    blurb: "Twelve ideas written in your voice. Approve the ones that feel like you.",
    href: "create/social",
    icon: Share2,
    tint: "bg-peach",
    cta: "Start",
  },
  {
    key: "videoConcepts",
    title: "Short videos",
    blurb: "Four shot lists. No rendering yet — you pick the story first.",
    href: "create/video",
    icon: Clapperboard,
    tint: "bg-lilac",
    cta: "Start",
  },
  {
    key: "brandKitReady",
    title: "Brand kit",
    blurb: "Colours, type, and how to shoot. Hand this to anyone who makes a graphic.",
    href: "brand/kit",
    icon: Palette,
    tint: "bg-sky",
    cta: "Open kit",
  },
] as const;

export function StarterPackageGrid({
  restaurantId,
  starter,
}: {
  restaurantId: string;
  starter: StarterPackage;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CHAPTERS.map((item) => {
        const Icon = item.icon;
        const value = starter[item.key];
        const ready = typeof value === "boolean" ? value : Number(value) > 0;
        return (
          <Link
            key={item.key}
            href={`/app/${restaurantId}/${item.href}`}
            className={cn(
              "flex min-h-52 flex-col rounded-[2rem] p-7 transition hover:-translate-y-0.5",
              item.tint,
            )}
          >
            <Icon className="h-7 w-7 text-ink-soft" />
            <h3 className="mt-5 font-display text-3xl leading-tight">{item.title}</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-ink">{item.blurb}</p>
            <span className="mt-6 inline-flex min-h-11 w-fit items-center rounded-full bg-ink px-5 text-sm text-paper">
              {ready ? item.cta : "Waiting"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
