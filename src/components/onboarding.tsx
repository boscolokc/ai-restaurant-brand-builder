import Link from "next/link";
import { ONBOARDING_PATHS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  basics: "Basics",
  assets: "Photos",
  business: "Business",
  analyzing: "Reading",
  "brand-dna": "Brand DNA",
  generating: "Building",
  done: "Ready",
};

export function OnboardingStepper({
  restaurantId,
  current,
}: {
  restaurantId: string;
  current: string;
}) {
  const idx = ONBOARDING_PATHS.indexOf(current as (typeof ONBOARDING_PATHS)[number]);
  return (
    <ol className="mb-10 flex flex-wrap gap-2">
      {ONBOARDING_PATHS.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <li key={step}>
            <Link
              href={`/app/${restaurantId}/onboarding/${step}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs",
                active && "border-ink bg-paper-2 font-medium text-ink",
                done && "border-line bg-white text-ink-soft",
                !active && !done && "border-transparent text-ink-soft",
              )}
            >
              <span>{i + 1}</span>
              {LABELS[step]}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
