"use client";

import { useParams, useRouter } from "next/navigation";
import { BrandBoard } from "@/components/brand-ui";
import { Button, Card } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";

export default function OnboardingBrandDnaPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { brandDna, restaurant } = useRestaurantBundle(restaurantId);
  const { approveBrandDna, ensureDraftBrandDna } = useAppStore();

  if (!brandDna) {
    return (
      <Card className="p-8">
        <p>No draft yet.</p>
        <Button
          className="mt-4"
          onClick={() => {
            ensureDraftBrandDna(restaurantId);
          }}
        >
          Draft Brand DNA
        </Button>
      </Card>
    );
  }

  return (
    <div className="brand-moment -mx-4 overflow-hidden px-4 py-8 sm:mx-0 sm:rounded-[20px] sm:px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-coral">Your brand profile</p>
      <h1 className="font-display mt-2 text-4xl">Does this sound like {restaurant?.name}?</h1>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-moment-muted">
        Nothing else generates until you approve. If a line feels off, you can still continue — you can edit the profile
        later.
      </p>
      <div className="mt-8">
        <BrandBoard dna={brandDna} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          size="lg"
          onClick={() => {
            approveBrandDna(restaurantId);
            router.push(`/app/${restaurantId}/onboarding/generating`);
          }}
        >
          Approve brand profile
        </Button>
        <Button size="lg" variant="outline" onClick={() => router.push(`/app/${restaurantId}/brand/edit`)}>
          Edit first
        </Button>
      </div>
    </div>
  );
}
