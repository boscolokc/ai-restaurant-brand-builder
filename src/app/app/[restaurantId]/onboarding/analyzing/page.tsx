"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Progress } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";
import { brandIntelligence } from "@/lib/ai";

const BEATS = [
  "Looking at light and plates…",
  "Noting the room, not just the food…",
  "Drafting voice and colour…",
  "Laying out Brand DNA for your review…",
];

export default function OnboardingAnalyzingPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { assets } = useRestaurantBundle(restaurantId);
  const { ensureDraftBrandDna, setOnboardingStep } = useAppStore();
  const [progress, setProgress] = useState(8);
  const [beat, setBeat] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 12));
      setBeat((b) => Math.min(BEATS.length - 1, b + 1));
    }, 420);
    let alive = true;
    (async () => {
      await brandIntelligence.analyzeAssets([]);
      await new Promise((r) => setTimeout(r, 2200));
      if (!alive) return;
      ensureDraftBrandDna(restaurantId);
      setOnboardingStep(restaurantId, "BRAND_DNA");
      router.push(`/app/${restaurantId}/onboarding/brand-dna`);
    })();
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [ensureDraftBrandDna, restaurantId, router, setOnboardingStep]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Step 4</p>
      <h1 className="mt-2 font-display text-4xl">Reading the room</h1>
      <Card className="mt-8 p-8">
        <p className="font-display text-2xl">{BEATS[beat]}</p>
        <Progress className="mt-6" value={progress} />
        <p className="mt-3 text-xs text-ink-soft">Mock AI adapter · no API keys · {assets.length} files</p>
      </Card>
    </div>
  );
}
