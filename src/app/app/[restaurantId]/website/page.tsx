"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";

export default function WebsiteEditorPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { website, restaurant } = useRestaurantBundle(restaurantId);
  const { updateWebsiteSection } = useAppStore();

  if (!website) {
    return (
      <div>
        <PageHeader title="No website yet" description="Approve your brand profile and we’ll draft a simple phone site." />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Website"
        title={`${restaurant?.name} site`}
        description="A section list, not a drag-and-drop builder. Toggle what’s on the public page, then preview."
        actions={
          <>
            <Badge tone={website.status === "PUBLISHED" ? "green" : "gold"}>{website.status}</Badge>
            <Button asChild variant="outline">
              <Link href={`/app/${restaurantId}/website/preview`}>Preview</Link>
            </Button>
            <Button asChild>
              <Link href={`/app/${restaurantId}/website/publish`}>Publish</Link>
            </Button>
          </>
        }
      />
      <div className="space-y-3">
        {website.sections.map((section, i) => (
          <Card key={section.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-ink-soft">
                  {i + 1} · {section.type}
                </p>
                <input
                  className="mt-1 w-full bg-transparent font-display text-2xl outline-none"
                  defaultValue={section.title}
                  onBlur={(e) => updateWebsiteSection(restaurantId, section.id, { title: e.target.value })}
                />
                <textarea
                  className="mt-2 w-full resize-none bg-transparent text-sm text-ink-soft outline-none"
                  defaultValue={section.body}
                  rows={2}
                  onBlur={(e) => updateWebsiteSection(restaurantId, section.id, { body: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={section.enabled}
                  onChange={(e) => updateWebsiteSection(restaurantId, section.id, { enabled: e.target.checked })}
                />
                On
              </label>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
