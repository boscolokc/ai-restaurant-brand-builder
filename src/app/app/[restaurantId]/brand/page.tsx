"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BrandResults } from "@/components/brand-ui";
import { Button, EmptyState } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function BrandPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, brandDna } = useRestaurantBundle(restaurantId);
  if (!brandDna) {
    return (
      <EmptyState
        title="No brand profile yet"
        description="Finish the short quiz and we’ll write a results page — how you sound, colours, and photo style."
        action={
          <Button asChild>
            <Link href={`/app/${restaurantId}`}>See what’s next</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div className="-mx-4 -mt-8 sm:-mx-8 sm:-mt-8">
      <BrandResults dna={brandDna} restaurant={restaurant} className="rounded-none" />
      <div className="flex flex-wrap justify-center gap-3 px-4 py-10">
        <Button asChild variant="outline">
          <Link href={`/app/${restaurantId}/brand/kit`}>Brand kit</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/app/${restaurantId}/brand/guide`}>Guide</Link>
        </Button>
        <Button asChild>
          <Link href={`/app/${restaurantId}/brand/edit`}>Change a few words</Link>
        </Button>
      </div>
    </div>
  );
}
