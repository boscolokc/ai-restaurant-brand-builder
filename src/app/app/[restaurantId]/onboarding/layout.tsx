"use client";

import { OnboardingStepper } from "@/components/onboarding";
import { useParams, usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const pathname = usePathname();
  const current = pathname.split("/").pop() ?? "basics";
  return (
    <div>
      <OnboardingStepper restaurantId={restaurantId} current={current} />
      {children}
    </div>
  );
}
