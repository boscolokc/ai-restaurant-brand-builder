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
        title="No Brand DNA yet"
        description="Finish onboarding and we’ll draft positioning, voice, colour, and photography rules for you to approve."
        action={
          <Button asChild>
            <Link href={`/app/${restaurantId}/onboarding/basics`}>Start onboarding</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div>
      <PageHeader
        eyebrow="Brand"
        title="Brand board"
        description="The source of truth. Everything we generate should feel like this — not a template."
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
