"use client";

import { OnboardingStepper } from "@/components/onboarding";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ONBOARDING_PATHS } from "@/lib/utils";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const current = pathname.split("/").pop() ?? "basics";
  const known = ONBOARDING_PATHS.includes(current as (typeof ONBOARDING_PATHS)[number])
    ? current
    : "basics";
  return (
    <div>
      <OnboardingStepper current={known} />
      {children}
    </div>
  );
}
