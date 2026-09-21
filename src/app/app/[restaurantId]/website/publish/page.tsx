"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";

export default function WebsitePublishPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { website, restaurant } = useRestaurantBundle(restaurantId);
  const { setWebsiteStatus } = useAppStore();

  return (
    <div>
      <PageHeader
        eyebrow="Publish"
        title="Put the site on a public URL"
        description="Phase 1 publish is a stub. We flip a status and show the guest route. No custom domains yet."
      />
      <Card className="p-6">
        <Badge tone={website?.status === "PUBLISHED" ? "green" : "gold"}>{website?.status ?? "missing"}</Badge>
        <p className="mt-4 font-display text-2xl">/r/{restaurant?.slug}</p>
        <p className="mt-2 text-sm text-ink-soft">
          Guests can already view a read-only mock at that path. “Publish” marks it ready in the UI.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={() => setWebsiteStatus(restaurantId, "PUBLISHED")}>Mark published</Button>
          <Button variant="outline" onClick={() => setWebsiteStatus(restaurantId, "READY")}>
            Unpublish
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/r/${restaurant?.slug}`}>View as guest</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
