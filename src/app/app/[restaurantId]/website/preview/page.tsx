"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PhotoTile } from "@/components/media";
import { Button, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function WebsitePreviewPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { website, restaurant, assets } = useRestaurantBundle(restaurantId);
  const theme = website?.theme;
  const sections = website?.sections.filter((s) => s.enabled) ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Preview"
        title="Guest phone view"
        actions={
          <Button asChild variant="outline">
            <Link href={`/r/${restaurant?.slug ?? restaurantId}`}>Open public URL</Link>
          </Button>
        }
      />
      <div
        className="mx-auto max-w-sm overflow-hidden rounded-[2.2rem] border-8 border-ink shadow-xl"
        style={{ background: theme?.background ?? "#f4efe6", color: theme?.primary ?? "#1f1a16" }}
      >
        <div className="h-8 bg-ink/90" />
        <div className="space-y-10 px-5 py-8">
          {sections.map((s) => (
            <section key={s.id}>
              <h2 className={s.type === "hero" ? "font-display text-3xl leading-tight" : "font-display text-2xl"}>
                {s.title}
              </h2>
              <p className="mt-2 text-sm opacity-80">{s.body}</p>
            </section>
          ))}
          <div className="grid grid-cols-2 gap-2">
            {assets.slice(0, 4).map((a) => (
              <PhotoTile key={a.id} title={a.title} kind={a.kind} className="min-h-24" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
