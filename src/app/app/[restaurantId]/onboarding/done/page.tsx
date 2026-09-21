"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Card } from "@/components/ui";
import { StarterPackageGrid } from "@/components/package";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function OnboardingDonePage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, starter } = useRestaurantBundle(restaurantId);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Ready</p>
      <h1 className="mt-2 font-display text-4xl">{restaurant?.name} has a kit</h1>
      <p className="mt-2 max-w-xl text-sm text-ink-soft">
        Brand DNA is approved. Your starter package is on Home. Nothing is live until you publish or post.
      </p>
      {starter ? (
        <div className="mt-8">
          <StarterPackageGrid restaurantId={restaurantId} starter={starter} />
        </div>
      ) : null}
      <Card className="mt-8 flex flex-wrap items-center justify-between gap-4 p-6">
        <p className="font-display text-xl">Primary next step: make something new.</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/app/${restaurantId}`}>Go to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/app/${restaurantId}/create`}>Create content</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
