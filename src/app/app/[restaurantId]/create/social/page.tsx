"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PhotoTile } from "@/components/media";
import { Badge, Button, PageHeader } from "@/components/ui";
import {
  contentStatusLabel,
  contentStatusTone,
  isCalendarPayload,
  isSocialConceptPayload,
  isSocialPayload,
  useAppStore,
  useRestaurantBundle,
} from "@/lib/mock/store";

export default function SocialCreativesPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { contentItems } = useRestaurantBundle(restaurantId);
  const { updateContentStatus } = useAppStore();
  const concepts = contentItems
    .filter((c) => c.kind === "SOCIAL_IMAGE" && c.conceptIndex != null && !isCalendarPayload(c.payload))
    .sort((a, b) => (a.conceptIndex ?? 0) - (b.conceptIndex ?? 0));

  return (
    <div>
      <PageHeader
        eyebrow="Social"
        title="12 concepts to review"
        description="Each one is a direction, not a finished ad. Approve what feels like your dining room. Captions stay editable."
      />
      {concepts.length === 0 ? (
        <p className="text-sm text-ink-soft">No social concepts yet. Approve Brand DNA to generate the starter set.</p>
      ) : (
        <div className="brand-surface grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {concepts.map((c) => {
            const concept = isSocialConceptPayload(c.payload) ? c.payload : null;
            const legacy = isSocialPayload(c.payload) ? c.payload : null;
            return (
              <div key={c.id} className="overflow-hidden rounded-md border border-line bg-white">
                <PhotoTile
                  title={c.title}
                  overlay={concept?.captionZh ?? legacy?.overlay ?? c.title}
                  large
                  expressive
                />
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-ink-soft">
                      {concept?.postId ?? `${c.conceptIndex}/12`} · {c.platform}
                      {concept ? ` · Mode ${concept.mode}` : legacy ? ` · ${legacy.format}` : ""}
                    </p>
                    <Badge tone={contentStatusTone(c.status)}>{contentStatusLabel(c.status)}</Badge>
                  </div>
                  <p className="font-display text-lg leading-snug">{concept?.captionZh ?? c.body}</p>
                  {concept ? <p className="text-sm text-ink-soft">{concept.visualConcept}</p> : null}
                  {concept ? <p className="text-sm">CTA · {concept.cta}</p> : null}
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
