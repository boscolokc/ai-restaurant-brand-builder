"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PhotoTile } from "@/components/media";
import { Badge, Button, PageHeader } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";
import type { SocialPayload } from "@/lib/types";

export default function SocialCreativesPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { contentItems } = useRestaurantBundle(restaurantId);
  const { updateContentStatus } = useAppStore();
  const concepts = contentItems
    .filter((c) => c.kind === "SOCIAL_IMAGE")
    .sort((a, b) => (a.conceptIndex ?? 0) - (b.conceptIndex ?? 0));

  return (
    <div>
      <PageHeader
        eyebrow="Social"
        title="12 concepts to review"
        description="Each one is a direction, not a finished ad. Approve what feels like your dining room. Captions stay editable."
      />
      {concepts.length === 0 ? (
        <p className="text-sm text-ink-soft">No post ideas yet. Approve your brand profile to generate a starter set.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {concepts.map((c) => {
            const payload = c.payload as SocialPayload | null;
            return (
              <div key={c.id} className="overflow-hidden rounded-2xl border border-line bg-white/70">
                <PhotoTile title={c.title} overlay={payload?.overlay ?? c.title} large />
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-wider text-ink-soft">
                      {c.conceptIndex}/12 · {c.platform} · {payload?.format}
                    </p>
                    <Badge tone={c.status === "APPROVED" ? "green" : "gold"}>{c.status.replace("_", " ")}</Badge>
                  </div>
                  <p className="text-sm leading-relaxed">{c.body}</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => updateContentStatus(c.id, "APPROVED")}>
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateContentStatus(c.id, "ARCHIVED")}>
                      Skip
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/app/${restaurantId}/content/${c.id}`}>Open</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
