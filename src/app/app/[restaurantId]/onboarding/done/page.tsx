"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { WizardActions } from "@/components/onboarding";
import { useRestaurantBundle } from "@/lib/mock/store";
import { brandTypeName } from "@/lib/brand-profile";
import { Clapperboard, Globe, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  { href: "website", title: "Your website", blurb: "A simple phone site in your colours.", icon: Globe, tint: "bg-sage" },
  { href: "create/social", title: "Social posts", blurb: "Twelve ideas in your voice.", icon: Share2, tint: "bg-peach" },
  { href: "create/video", title: "Short videos", blurb: "Four shot lists to review.", icon: Clapperboard, tint: "bg-lilac" },
];

export default function OnboardingDonePage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { restaurant, brandDna } = useRestaurantBundle(restaurantId);
  const typeName = brandDna ? brandTypeName(brandDna, restaurant) : restaurant?.name ?? "Your restaurant";

  return (
    <div>
      <section className="rounded-[2rem] bg-sage px-5 py-10 text-center sm:px-8">
        <p className="text-sm font-medium tracking-[0.18em] text-ink-soft uppercase">{restaurant?.name}</p>
        <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{typeName}</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink">
          That’s the profile. Next chapters are ready. Look at one post first — you can ignore the rest.
        </p>
      </section>
      <div className="mt-5 grid gap-3">
        {CHAPTERS.map((ch) => {
          const Icon = ch.icon;
          return (
            <Link
              key={ch.href}
              href={`/app/${restaurantId}/${ch.href}`}
              className={cn("flex items-start gap-4 rounded-3xl p-5", ch.tint)}
            >
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-ink-soft" />
              <span>
                <span className="block font-display text-xl">{ch.title}</span>
                <span className="mt-1 block text-sm text-ink-soft">{ch.blurb}</span>
              </span>
            </Link>
          );
        })}
      </div>
      <WizardActions
        restaurantId={restaurantId}
        current="done"
        hideBack
        onContinue={() => router.push(`/app/${restaurantId}/create`)}
        extra={
          <button
            type="button"
            className="mb-3 inline-flex min-h-11 w-full items-center justify-center py-2 text-center text-sm text-ink-soft underline-offset-2 hover:underline sm:justify-start sm:text-left"
            onClick={() => router.push(`/app/${restaurantId}`)}
          >
            See everything on Home
          </button>
        }
      />
    </div>
  );
}
