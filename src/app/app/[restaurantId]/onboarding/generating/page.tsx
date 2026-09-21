"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Progress } from "@/components/ui";
import { useAppStore } from "@/lib/mock/store";

const BEATS = [
  "Locking colour and type…",
  "Drafting 12 social concepts…",
  "Boarding 4 short films…",
  "Laying out the mobile site…",
  "Writing Google copy and a 30-day plan…",
];

export default function OnboardingGeneratingPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { unlockStarterPackage } = useAppStore();
  const [progress, setProgress] = useState(6);
  const [beat, setBeat] = useState(0);

  function finish() {
    unlockStarterPackage(restaurantId);
    router.push(`/app/${restaurantId}/onboarding/done`);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 10));
      setBeat((b) => Math.min(BEATS.length - 1, b + 1));
    }, 380);
    const done = window.setTimeout(finish, 2600);
    return () => {
      clearInterval(timer);
      window.clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Step 6</p>
      <h1 className="mt-2 font-display text-4xl">Building your starter package</h1>
      <Card className="mt-8 p-8">
        <p className="font-display text-2xl">{BEATS[beat]}</p>
        <Progress className="mt-6" value={progress} />
        <p className="mt-3 text-xs text-ink-soft">Still a mock. Real providers plug in behind the same job interface.</p>
        <Button className="mt-6" variant="outline" onClick={finish}>
          Continue to kit
        </Button>
      </Card>
    </div>
  );
}
