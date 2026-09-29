"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { StarterPackageGrid } from "@/components/package";
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
  const { restaurant, brandDna, starter } = useRestaurantBundle(restaurantId);
  const typeName = brandDna ? brandTypeName(brandDna, restaurant) : restaurant?.name ?? "Your restaurant";

  return (
    <div>
      <div className="brand-moment -mx-4 overflow-hidden rounded-none sm:mx-0 sm:rounded-[20px]">
        <section className="bg-mint px-6 py-12 sm:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive">Ready</p>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">You’re set</h1>
          <p className="font-display mt-2 text-2xl text-moment-fg">{typeName}</p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-moment-fg">
            Here’s what Hearth put together for {restaurant?.name ?? "your restaurant"}. Your basic marketing setup is
            ready — nothing goes live until you publish or post.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-moment-fg">
            <li>Brand profile & kit</li>
            <li>Starter website hooks</li>
            <li>First social captions</li>
            <li>Ready for calendar & campaigns</li>
          </ul>
        </section>
        <div className="grid gap-3 bg-moment px-6 py-8 sm:px-10">
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
        {starter ? (
          <section className="bg-moment px-6 pb-10 sm:px-10">
            <StarterPackageGrid restaurantId={restaurantId} starter={starter} />
          </section>
        ) : null}
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
