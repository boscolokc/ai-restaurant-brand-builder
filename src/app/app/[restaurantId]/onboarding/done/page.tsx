"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui";
import { StarterPackageGrid } from "@/components/package";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function OnboardingDonePage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, starter } = useRestaurantBundle(restaurantId);

  return (
    <div className="brand-moment -mx-4 overflow-hidden rounded-none sm:mx-0 sm:rounded-[20px]">
      <section className="bg-mint px-6 py-12 sm:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive">Ready</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl">You’re set</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-moment-fg">
          Here’s what Hearth put together for {restaurant?.name ?? "your restaurant"}. Your basic marketing setup is
          ready — nothing goes live until you publish or post.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-moment-fg">
          <li>Brand profile & kit</li>
          <li>Starter website hooks</li>
          <li>First social captions</li>
          <li>Ready for calendar & campaigns</li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={`/app/${restaurantId}`}>Go to Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/app/${restaurantId}/create`}>Create content</Link>
          </Button>
        </div>
      </section>
      {starter ? (
        <section className="bg-moment px-6 py-10 sm:px-10">
          <StarterPackageGrid restaurantId={restaurantId} starter={starter} />
        </section>
      ) : null}
    </div>
  );
}
