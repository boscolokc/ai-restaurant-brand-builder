"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, ComingSoon, PageHeader } from "@/components/ui";

export default function NewCampaignPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  return (
    <div>
      <PageHeader eyebrow="Campaigns" title="New campaign" />
      <ComingSoon
        title="Not in Phase 1"
        description="We won’t pretend this form launches ads. Use Create for posts and the calendar for timing."
      />
      <Button className="mt-6" asChild variant="outline">
        <Link href={`/app/${restaurantId}/campaigns`}>Back</Link>
      </Button>
    </div>
  );
}
