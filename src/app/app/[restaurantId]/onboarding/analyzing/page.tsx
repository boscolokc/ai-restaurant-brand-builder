"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Progress } from "@/components/ui";
import { CoachNote, ProgressList, WizardActions } from "@/components/onboarding";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";
import { brandIntelligence } from "@/lib/ai";

const BEATS = [
  "Looking at the light and plates",
  "Noticing the room, not just the food",
  "Drafting words and colours for you to check",
];

export default function OnboardingAnalyzingPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { assets } = useRestaurantBundle(restaurantId);
  const { ensureDraftBrandDna, setOnboardingStep } = useAppStore();
  const [progress, setProgress] = useState(8);
  const [beat, setBeat] = useState(0);

  function finish() {
    ensureDraftBrandDna(restaurantId);
    setOnboardingStep(restaurantId, "BRAND_DNA");
    router.push(`/app/${restaurantId}/onboarding/brand-dna`);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 12));
      setBeat((b) => Math.min(BEATS.length - 1, b + 1));
    }, 420);
    const work = window.setTimeout(() => {
      void brandIntelligence.analyzeAssets([]);
      finish();
    }, 2200);
    return () => {
      clearInterval(timer);
      window.clearTimeout(work);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  return (
    <div>
      <CoachNote>
        You don’t need to do anything. Next we’ll show a brand profile — words and colours — and you decide if it feels
        like {assets.length ? "your photos" : "your restaurant"}.
      </CoachNote>
      <Card className="mt-5 p-5 sm:p-6">
        <Progress className="mb-6" value={progress} />
        <ProgressList items={BEATS} active={beat} />
      </Card>
      <WizardActions restaurantId={restaurantId} current="analyzing" onContinue={finish} />
    </div>
  );
}
