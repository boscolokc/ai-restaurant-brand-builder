"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Progress } from "@/components/ui";
import { ProgressList, WizardActions } from "@/components/onboarding";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";
import { brandIntelligence } from "@/lib/ai";

const BEATS = [
  "Looking at the light and plates",
  "Noticing the room, not just the food",
  "Drafting a brand profile for you to check",
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
      <div className="rounded-[2rem] bg-lilac px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-base leading-relaxed text-ink">
          You don’t need to do anything. Next is a results page — words and colours — and you decide if it feels like{" "}
          {assets.length ? "your photos" : "your restaurant"}.
        </p>
        <Progress className="mt-8 bg-white/70" value={progress} />
        <div className="mt-6">
          <ProgressList items={BEATS} active={beat} />
        </div>
      </div>
      <WizardActions restaurantId={restaurantId} current="analyzing" onContinue={finish} />
    </div>
  );
}
