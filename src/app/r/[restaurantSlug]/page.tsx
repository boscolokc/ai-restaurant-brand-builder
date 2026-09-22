"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MarketingHeader } from "@/components/shell";
import { PhotoTile } from "@/components/media";
import { Badge, Button } from "@/components/ui";
import { useAppStore } from "@/lib/mock/store";

export default function PublicRestaurantPage() {
  const { restaurantSlug } = useParams<{ restaurantSlug: string }>();
  const { snapshot } = useAppStore();
  const restaurant = snapshot.restaurants.find((r) => r.slug === restaurantSlug);
  const dna = snapshot.brandDnas.find((d) => d.restaurantId === restaurant?.id && d.status !== "SUPERSEDED");
  const website = snapshot.websites.find((w) => w.restaurantId === restaurant?.id);
  const assets = snapshot.assets.filter((a) => a.restaurantId === restaurant?.id).slice(0, 6);

  if (!restaurant) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="font-display text-3xl">This table isn’t set yet</h1>
        <p className="mt-2 text-sm text-ink-soft">No published restaurant with that name.</p>
        <Button className="mt-6" asChild>
          <Link href="/">Back to Hearth</Link>
        </Button>
      </div>
    );
  }

  const theme = website?.theme;
  const sections = website?.sections.filter((s) => s.enabled) ?? [];

  return (
    <div className="min-h-full" style={{ background: theme?.background ?? "#f4efe6", color: theme?.primary ?? "#1f1a16" }}>
      <MarketingHeader />
      <div className="brand-type mx-auto max-w-3xl px-4 py-12">
        <div className="flex items-center gap-2">
          <Badge>Guest view</Badge>
          {website?.status === "PUBLISHED" ? <Badge tone="green">Published</Badge> : <Badge tone="gold">Preview</Badge>}
        </div>
        {sections.length === 0 ? (
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.2em]">{restaurant.cuisine}</p>
            <h1 className="mt-2 font-display text-5xl">{dna?.tagline ?? restaurant.name}</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-80">{restaurant.description}</p>
          </div>
        ) : (
          <div className="mt-8 space-y-16">
            {sections.map((section) => (
              <section key={section.id}>
                <h2 className={section.type === "hero" ? "font-display text-5xl leading-tight" : "font-display text-3xl"}>
                  {section.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-80">{section.body}</p>
              </section>
            ))}
          </div>
        )}
        {assets.length > 0 ? (
          <div className="mt-16 grid grid-cols-2 gap-3">
            {assets.map((a) => (
              <PhotoTile key={a.id} title={a.title} kind={a.kind} expressive />
            ))}
          </div>
        ) : null}
        <p className="mt-16 text-center text-xs opacity-60">A Hearth site · {restaurant.name}</p>
      </div>
    </div>
  );
}
