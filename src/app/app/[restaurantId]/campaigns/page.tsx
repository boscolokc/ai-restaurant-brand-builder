"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge, Button, Card, ComingSoon, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";
import { formatDate } from "@/lib/utils";

export default function CampaignsPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { campaigns } = useRestaurantBundle(restaurantId);
  return (
    <div>
      <PageHeader
        eyebrow="Campaigns"
        title="Campaigns"
        description="A place for seasonal pushes later. Phase 1 keeps a stub so the nav isn’t a dead end."
        actions={
          <Button asChild>
            <Link href={`/app/${restaurantId}/campaigns/new`}>New campaign</Link>
          </Button>
        }
      />
      <ComingSoon
        title="Planner, budget, and ads come later"
        description="You’ll be able to group posts, stories, and Google copy around a date range. For now, use Content and Create."
      />
      <div className="mt-6 space-y-3">
        {campaigns.map((c) => (
          <Link key={c.id} href={`/app/${restaurantId}/campaigns/${c.id}`}>
            <Card className="flex items-center justify-between p-5">
              <div>
                <h2 className="font-display text-xl">{c.name}</h2>
                <p className="text-sm text-ink-soft">
                  {formatDate(c.startDate)} – {formatDate(c.endDate)}
                </p>
              </div>
              <Badge tone="muted">{c.status}</Badge>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
