"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRestaurant } from "@/lib/mock/store";
import { STEP_TO_PATH } from "@/lib/utils";

export default function OnboardingIndexPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const restaurant = useRestaurant(restaurantId);
  const router = useRouter();
  useEffect(() => {
    const step = STEP_TO_PATH[restaurant?.onboardingStep ?? "BASICS"] ?? "basics";
    router.replace(`/app/${restaurantId}/onboarding/${step}`);
  }, [restaurant, restaurantId, router]);
  return <p className="text-sm text-ink-soft">Opening the next onboarding step…</p>;
}
