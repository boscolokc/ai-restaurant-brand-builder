"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PhotoTile } from "@/components/media";
import { Button, Card } from "@/components/ui";
import { WizardActions } from "@/components/onboarding";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";

const SUGGESTIONS = ["Best dish", "Dining room", "Storefront", "Menu", "Hands plating"];

export default function OnboardingAssetsPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { assets } = useRestaurantBundle(restaurantId);
  const { addMockAssets, setOnboardingStep } = useAppStore();
  const [queued, setQueued] = useState<string[]>([]);

  function addQueued() {
    if (queued.length) {
      addMockAssets(restaurantId, queued);
      setQueued([]);
    }
  }

  function continueNext() {
    addQueued();
    setOnboardingStep(restaurantId, "BUSINESS");
    router.push(`/app/${restaurantId}/onboarding/business`);
  }

  return (
    <div>
      <Card className="p-5 sm:p-6">
        <p className="text-sm text-ink-soft">Tap to add sample photos. In the real product you’d upload from your phone.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((title) => (
            <Button
              key={title}
              size="md"
              variant="outline"
              className="min-h-12"
              onClick={() => setQueued((q) => [...q, title])}
            >
              + {title}
            </Button>
          ))}
        </div>
        {queued.length > 0 ? (
          <Button className="mt-4 min-h-12 w-full sm:w-auto" variant="ink" onClick={addQueued}>
            Add {queued.length} photo{queued.length === 1 ? "" : "s"}
          </Button>
        ) : null}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {assets.map((a) => (
            <PhotoTile key={a.id} title={a.title} kind={a.kind} />
          ))}
          {queued.map((title) => (
            <div key={title} className="rounded-xl border border-dashed border-line p-4 text-sm text-ink-soft">
              Ready to add · {title}
            </div>
          ))}
        </div>
      </Card>
      <WizardActions restaurantId={restaurantId} current="assets" onContinue={continueNext} />
    </div>
  );
}
