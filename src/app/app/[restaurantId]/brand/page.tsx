"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BrandBoard } from "@/components/brand-ui";
import { Badge, Button, EmptyState, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function BrandPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { brandDna } = useRestaurantBundle(restaurantId);
  if (!brandDna) {
    return (
      <EmptyState
        title="No brand profile yet"
        description="Finish setup and we’ll draft how you sound, your colours, and photo style — for you to approve."
        action={
          <Button asChild>
            <Link href={`/app/${restaurantId}`}>See what’s next</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div>
      <PageHeader
        eyebrow="Brand"
        title="Brand profile"
        description="The look and voice we follow. Everything we make should feel like this."
        actions={
          <>
            <Badge tone={brandDna.status === "APPROVED" ? "green" : "gold"}>{brandDna.status.replace("_", " ")}</Badge>
            <Button asChild variant="outline">
              <Link href={`/app/${restaurantId}/brand/kit`}>Brand kit</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/app/${restaurantId}/brand/guide`}>Guide</Link>
            </Button>
            <Button asChild>
              <Link href={`/app/${restaurantId}/brand/edit`}>Edit</Link>
            </Button>
          </>
        }
      />
      <BrandBoard dna={brandDna} />
    </div>
  );
}
