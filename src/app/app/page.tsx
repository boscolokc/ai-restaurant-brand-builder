"use client";

import Link from "next/link";
import { AccountChrome } from "@/components/shell";
import { Button } from "@/components/ui";
import { useAppStore } from "@/lib/mock/store";
import { brandTypeName, inkOn } from "@/lib/brand-profile";
import { Plus } from "lucide-react";

export default function RestaurantSwitcherPage() {
  const { snapshot } = useAppStore();
  return (
    <AccountChrome>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-ink-soft uppercase">{snapshot.account.name}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Whose brand is this?</h1>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-ink-soft">
          Pick a kitchen. New ones start with a short quiz, then a results page.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
        {snapshot.restaurants.map((r) => {
          const dna = snapshot.brandDnas.find((d) => d.restaurantId === r.id && d.status !== "SUPERSEDED");
          const primary = dna?.colours?.primary ?? "#2f4a32";
          const typeName = dna ? brandTypeName(dna, r) : r.name;
          return (
            <Link
              key={r.id}
              href={`/app/${r.id}`}
              className="flex min-h-56 flex-col justify-end rounded-[2rem] p-7 transition hover:-translate-y-0.5"
              style={{ background: primary, color: inkOn(primary) }}
            >
              <p className="text-sm tracking-[0.18em] uppercase opacity-80">{r.name}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">{typeName}</h2>
              <p className="mt-3 font-display text-lg italic opacity-90">{dna?.tagline ?? "Quiz still in progress"}</p>
              <p className="mt-6 text-sm opacity-80">{r.onboardingDone ? "Open home" : "See your results"}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline" className="min-h-12">
          <Link href="/app/restaurants/new">
            <Plus className="h-4 w-4" />
            Add another restaurant
          </Link>
        </Button>
      </div>
    </AccountChrome>
  );
}
