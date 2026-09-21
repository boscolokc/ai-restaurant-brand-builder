"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ONBOARDING_PATHS, type OnboardingPath } from "@/lib/utils";
import { prevPath, stepNumber, WIZARD_COPY } from "@/lib/onboarding";

const REVEAL_STEPS = new Set<OnboardingPath>(["brand-dna", "done"]);

export function OnboardingStepper({ current }: { current: string }) {
  const path = (ONBOARDING_PATHS.includes(current as OnboardingPath) ? current : "basics") as OnboardingPath;
  const n = stepNumber(path);
  const total = ONBOARDING_PATHS.length;
  const copy = WIZARD_COPY[path];
  const pct = (n / total) * 100;
  const compact = REVEAL_STEPS.has(path);

  return (
    <div className={cn(compact ? "mb-4" : "mb-6 sm:mb-8")}>
      <p className="text-sm font-medium text-ink-soft">
        Step {n} of {total}
      </p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper-2">
        <div className="h-full rounded-full bg-accent transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <ol className="mt-3 flex gap-1.5" aria-hidden>
        {ONBOARDING_PATHS.map((step, i) => (
          <li
            key={step}
            className={cn("h-1.5 flex-1 rounded-full", i < n ? "bg-accent" : "bg-paper-2")}
          />
        ))}
      </ol>
      {compact ? null : (
        <>
          <h1 className="mt-6 font-display text-3xl leading-tight text-ink sm:text-5xl">{copy.title}</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">{copy.helper}</p>
        </>
      )}
    </div>
  );
}

export function WizardActions({
  restaurantId,
  current,
  onContinue,
  continueLabel,
  continueDisabled,
  hideBack,
  extra,
}: {
  restaurantId: string;
  current: string;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  hideBack?: boolean;
  extra?: ReactNode;
}) {
  const path = (ONBOARDING_PATHS.includes(current as OnboardingPath) ? current : "basics") as OnboardingPath;
  const back = prevPath(path);
  const label = continueLabel ?? WIZARD_COPY[path].continueLabel;

  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t border-line bg-paper/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
      {extra}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {!hideBack && back ? (
          <Button asChild variant="ghost" size="lg" className="min-h-12 w-full sm:w-auto">
            <Link href={`/app/${restaurantId}/onboarding/${back}`}>Back</Link>
          </Button>
        ) : (
          <span className="hidden sm:block" />
        )}
        <Button
          size="lg"
          className="min-h-12 w-full sm:min-w-44 sm:w-auto"
          disabled={continueDisabled}
          onClick={onContinue}
          type={onContinue ? "button" : "submit"}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}

export function CoachNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-3xl bg-sand px-5 py-4 text-base leading-relaxed text-ink">{children}</p>
  );
}

export function ProgressList({ items, active }: { items: string[]; active: number }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <li key={item} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-medium",
                done && "bg-accent-2 text-white",
                current && "bg-accent text-white",
                !done && !current && "border border-line text-ink-soft",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className={cn("pt-1 text-base", current ? "text-ink" : "text-ink-soft")}>{item}</span>
          </li>
        );
      })}
    </ol>
  );
}
