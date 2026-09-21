"use client";

import Link from "next/link";
import { AccountChrome } from "@/components/shell";
import { Badge, Button, Card } from "@/components/ui";
import { useAppStore } from "@/lib/mock/store";
import { Plus } from "lucide-react";

export default function RestaurantSwitcherPage() {
  const { snapshot } = useAppStore();
  return (
    <AccountChrome>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">{snapshot.account.name}</p>
          <h1 className="mt-2 font-display text-4xl">Your restaurants</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Three kitchens are seeded. Add another anytime — multi-restaurant is the default, not an upgrade.
          </p>
        </div>
        <Button asChild>
          <Link href="/app/restaurants/new">
            <Plus className="h-4 w-4" />
            Add restaurant
          </Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {snapshot.restaurants.map((r) => {
          const dna = snapshot.brandDnas.find((d) => d.restaurantId === r.id && d.status !== "SUPERSEDED");
          return (
            <Link key={r.id} href={`/app/${r.id}`}>
              <Card className="h-full p-6 transition hover:-translate-y-0.5 hover:border-ink/20">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-display text-2xl">{r.name}</h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      {[r.cuisine, r.city].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <Badge tone={r.onboardingDone ? "green" : "gold"}>
                    {r.onboardingDone ? "Live kit" : "Onboarding"}
                  </Badge>
                </div>
                <p className="mt-6 font-display text-xl italic">{dna?.tagline ?? "Brand DNA still cooking"}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-ink-soft">
                  {r.onboardingDone ? "Open home" : `Continue · ${r.onboardingStep.replace("_", " ")}`}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </AccountChrome>
  );
}
