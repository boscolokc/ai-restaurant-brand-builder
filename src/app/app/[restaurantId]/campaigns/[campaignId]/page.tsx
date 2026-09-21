"use client";

import { useParams } from "next/navigation";
import { Badge, Card, ComingSoon, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";
import { formatDate } from "@/lib/utils";

export default function CampaignDetailPage() {
  const { restaurantId, campaignId } = useParams<{ restaurantId: string; campaignId: string }>();
  const { campaigns } = useRestaurantBundle(restaurantId);
  const campaign = campaigns.find((c) => c.id === campaignId);
  return (
    <div>
      <PageHeader eyebrow="Campaign" title={campaign?.name ?? "Campaign"} />
      <ComingSoon
        title="This campaign is a placeholder"
        description={campaign?.brief ?? "Live publishing and ad spend are out of scope."}
      />
      {campaign ? (
        <Card className="mt-4 p-5 text-sm">
          <Badge>{campaign.status}</Badge>
          <p className="mt-3">
            {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
          </p>
        </Card>
      ) : null}
    </div>
  );
}
