"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PhotoTile } from "@/components/media";
import { Button, Card } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";

const SUGGESTIONS = ["Hero dish", "Dining room", "Storefront", "Menu close-up", "Hands plating"];

export default function OnboardingAssetsPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { assets } = useRestaurantBundle(restaurantId);
  const { addMockAssets, setOnboardingStep } = useAppStore();
  const [queued, setQueued] = useState<string[]>([]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Step 2</p>
      <h1 className="mt-2 font-display text-4xl">Add a few photos</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Phone pictures are fine. We look at light, plates, and the room — not resolution. This demo stores files locally
        as mock tiles.
      </p>
      <Card className="mt-8 p-6">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((title) => (
            <Button key={title} size="sm" variant="outline" onClick={() => setQueued((q) => [...q, title])}>
              + {title}
            </Button>
          ))}
        </div>
        <Button
          className="mt-4"
          variant="ink"
          disabled={queued.length === 0}
          onClick={() => {
            addMockAssets(restaurantId, queued);
            setQueued([]);
          }}
        >
          Add to library
        </Button>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {assets.map((a) => (
            <PhotoTile key={a.id} title={a.title} kind={a.kind} />
          ))}
          {queued.map((title) => (
            <div key={title} className="rounded-xl border border-dashed border-line p-4 text-sm text-ink-soft">
              Queued · {title}
            </div>
          ))}
        </div>
        <Button
          className="mt-6"
          onClick={() => {
            if (queued.length) addMockAssets(restaurantId, queued);
            setOnboardingStep(restaurantId, "BUSINESS");
            router.push(`/app/${restaurantId}/onboarding/business`);
          }}
        >
          Continue
        </Button>
      </Card>
    </div>
  );
}
