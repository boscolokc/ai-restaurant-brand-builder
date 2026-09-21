"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui";
import {
  milestoneHref,
  milestoneStatus,
  OWNER_MILESTONES,
  recommendedAction,
} from "@/lib/onboarding";
import { brandTypeName, firstSentence, inkOn } from "@/lib/brand-profile";
import type { BrandDNA, OnboardingStep } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FirstRunHome({
  restaurantId,
  restaurantName,
  step,
  onboardingDone,
  brandApproved,
  brandDna,
}: {
  restaurantId: string;
  restaurantName: string;
  step: OnboardingStep;
  onboardingDone: boolean;
  brandApproved: boolean;
  brandDna?: BrandDNA | null;
}) {
  const rec = recommendedAction(step, restaurantId, onboardingDone, brandApproved);
  const readyForReveal = step === "BRAND_DNA" && Boolean(brandDna);
  const typeName = brandDna ? brandTypeName(brandDna) : null;
  const primary = brandDna?.colours?.primary ?? "#2f4a32";
  const onPrimary = inkOn(primary);

  return (
    <div className="mx-auto max-w-xl">
      {readyForReveal ? (
        <section
          className="relative overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:py-14"
          style={{ background: primary, color: onPrimary }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase opacity-80">{restaurantName}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{typeName}</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed opacity-90">
            {firstSentence(brandDna?.positioning) || rec.helper}
          </p>
          <Button asChild size="lg" variant="ink" className="mt-8 min-h-12 w-full bg-white text-ink hover:bg-white/90">
            <Link href={rec.href}>See your results</Link>
          </Button>
        </section>
      ) : (
        <section className="rounded-[2rem] bg-sage px-6 py-10 text-center sm:py-12">
          <p className="text-sm font-medium tracking-[0.2em] text-ink-soft uppercase">{restaurantName}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">A short quiz, then a brand profile</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink">
            {rec.helper} Not a dashboard — more like finding your restaurant’s type.
          </p>
          <Button asChild size="lg" className="mt-8 min-h-12 w-full text-base">
            <Link href={rec.href}>{rec.label}</Link>
          </Button>
        </section>
      )}

      <ol className="mt-8 space-y-1">
        {OWNER_MILESTONES.map((m) => {
          const status = milestoneStatus(m.id, step, onboardingDone, brandApproved);
          const locked = status === "upcoming";
          const inner = (
            <div
              className={cn(
                "flex min-h-14 items-start gap-3 rounded-3xl px-3 py-3",
                status === "current" && "bg-peach",
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
              <Link href={milestoneHref(m.id, restaurantId)} className="block rounded-3xl hover:bg-sand/80">
                {inner}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
