"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button, Card } from "@/components/ui";
import {
  milestoneHref,
  milestoneStatus,
  OWNER_MILESTONES,
  recommendedAction,
} from "@/lib/onboarding";
import type { OnboardingStep } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FirstRunHome({
  restaurantId,
  restaurantName,
  step,
  onboardingDone,
  brandApproved,
}: {
  restaurantId: string;
  restaurantName: string;
  step: OnboardingStep;
  onboardingDone: boolean;
  brandApproved: boolean;
}) {
  const rec = recommendedAction(step, restaurantId, onboardingDone, brandApproved);

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-sm font-medium text-ink-soft">{restaurantName}</p>
      <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Next up</h1>
      <p className="mt-2 text-base leading-relaxed text-ink-soft">{rec.helper}</p>

      <Button asChild size="lg" className="mt-6 min-h-12 w-full text-base">
        <Link href={rec.href}>{rec.label}</Link>
      </Button>

      <Card className="mt-8 p-5 sm:p-6">
        <p className="text-sm font-medium text-ink-soft">Your path</p>
        <ol className="mt-4 space-y-1">
          {OWNER_MILESTONES.map((m) => {
            const status = milestoneStatus(m.id, step, onboardingDone, brandApproved);
            const locked = status === "upcoming";
            const inner = (
              <div
                className={cn(
                  "flex min-h-14 items-start gap-3 rounded-2xl px-2 py-3",
                  status === "current" && "bg-paper-2",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm",
                    status === "done" && "bg-accent-2 text-white",
                    status === "current" && "bg-accent text-white",
                    status === "upcoming" && "border border-line text-ink-soft",
                  )}
                >
                  {status === "done" ? <Check className="h-4 w-4" /> : OWNER_MILESTONES.indexOf(m) + 1}
                </span>
                <span>
                  <span className="block text-base font-medium text-ink">{m.label}</span>
                  <span className="block text-sm text-ink-soft">{m.helper}</span>
                </span>
              </div>
            );
            if (locked) return <li key={m.id}>{inner}</li>;
            return (
              <li key={m.id}>
                <Link href={milestoneHref(m.id, restaurantId)} className="block rounded-2xl hover:bg-paper-2/80">
                  {inner}
                </Link>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}
