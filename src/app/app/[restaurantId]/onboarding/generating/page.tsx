"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Progress } from "@/components/ui";
import { ProgressList, WizardActions } from "@/components/onboarding";
import { useAppStore } from "@/lib/mock/store";

const BEATS = [
  "Picking colours and fonts",
  "Writing 12 post ideas",
  "Sketching 4 short videos",
  "Building a simple phone website",
  "Writing Google text and a month of posts",
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
      <div className="rounded-[2rem] bg-peach px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-base leading-relaxed text-ink">
          Hang tight. These are the chapters after your profile — nothing is posted, and nothing is live on the web yet.
        </p>
        <Progress className="mt-8 bg-white/70" value={progress} />
        <div className="mt-6">
          <ProgressList items={BEATS} active={beat} />
        </div>
      </div>
      <WizardActions restaurantId={restaurantId} current="generating" onContinue={finish} />
    </div>
  );
}
