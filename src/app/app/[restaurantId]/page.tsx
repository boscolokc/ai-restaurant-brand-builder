"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FirstRunHome } from "@/components/first-run-home";
import { StarterPackageGrid } from "@/components/package";
import { Button } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";
import { brandTypeName, firstSentence, inkOn } from "@/lib/brand-profile";

export default function RestaurantHomePage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, brandDna, starter } = useRestaurantBundle(restaurantId);
  if (!restaurant || !starter) return null;

  const brandApproved = brandDna?.status === "APPROVED";
  const ready = restaurant.onboardingDone && brandApproved;

  if (!ready) {
    return (
      <FirstRunHome
        restaurantId={restaurantId}
        restaurantName={restaurant.name}
        step={restaurant.onboardingStep}
        onboardingDone={restaurant.onboardingDone}
        brandApproved={Boolean(brandApproved)}
        brandDna={brandDna}
      />
    );
  }

  const typeName = brandDna ? brandTypeName(brandDna, restaurant) : restaurant.name;
  const primary = brandDna?.colours?.primary ?? "#2f4a32";
  const onPrimary = inkOn(primary);

  return (
    <div className="-mx-4 -mt-8 sm:-mx-8 sm:-mt-8">
      <section
        className="relative overflow-hidden px-5 py-14 text-center sm:px-10 sm:py-20"
        style={{ background: primary, color: onPrimary }}
      >
        <div className="pointer-events-none absolute -right-16 -top-10 h-48 w-48 rounded-full bg-white/10" />
        <p className="text-sm font-medium tracking-[0.22em] uppercase opacity-80">{restaurant.name}</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">{typeName}</h1>
        {brandDna?.tagline ? (
          <p className="mx-auto mt-4 max-w-lg font-display text-xl italic sm:text-2xl">{brandDna.tagline}</p>
        ) : null}
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
          {firstSentence(brandDna?.positioning) || "Your starter kit is ready. Pick one chapter — nothing posts until you say so."}
        </p>
        <Button asChild size="lg" variant="ink" className="mt-8 min-h-12 bg-white text-ink hover:bg-white/90">
          <Link href={`/app/${restaurantId}/create`}>Create a post</Link>
        </Button>
      </section>

      <section className="px-4 py-12 sm:px-8 sm:py-16">
        <p className="text-sm font-medium tracking-[0.18em] text-ink-soft uppercase">What’s next</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Open one chapter at a time</h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          Website, posts, videos, kit. Short blurbs — not a table of jobs.
        </p>
        <div className="mt-8">
          <StarterPackageGrid restaurantId={restaurantId} starter={starter} />
        </div>
        <p className="mt-8 text-center">
          <Link href={`/app/${restaurantId}/brand`} className="text-sm text-ink-soft underline-offset-4 hover:underline">
            Re-read the full brand profile
          </Link>
        </p>
      </section>
    </div>
  );
}
