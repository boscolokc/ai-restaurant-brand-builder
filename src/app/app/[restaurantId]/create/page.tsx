"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, PageHeader } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";
import { Clapperboard, ImageIcon, MapPin, Sparkles, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTIONS = [
  {
    href: "create/social",
    title: "Social posts",
    copy: "Review 12 concepts written in your voice. Approve the ones that feel like you.",
    icon: ImageIcon,
    job: "SOCIAL_CONCEPTS" as const,
    tint: "bg-peach",
  },
  {
    href: "create/video",
    title: "Video storyboards",
    copy: "Four short films. No rendering yet — you approve the shots first.",
    icon: Clapperboard,
    job: "VIDEO_CONCEPTS" as const,
    tint: "bg-lilac",
  },
  {
    href: "content",
    title: "Menu asset",
    copy: "A clean one-pager from your brand kit. You’ll find it under Content.",
    icon: UtensilsCrossed,
    job: "SINGLE_CREATIVE" as const,
    tint: "bg-sage",
  },
  {
    href: "content",
    title: "Google Business copy",
    copy: "Short description, hours language, and attributes you can paste.",
    icon: MapPin,
    job: "SINGLE_CREATIVE" as const,
    tint: "bg-sky",
  },
];

export default function CreateHubPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { startJob } = useAppStore();
  const { brandDna } = useRestaurantBundle(restaurantId);

  return (
    <div>
      <PageHeader
        title="What should we make?"
        description="Pick a chapter. We draft in your voice. You review. Nothing posts itself."
      />
      {!brandDna || brandDna.status !== "APPROVED" ? (
        <div className="mb-6 rounded-[2rem] bg-peach p-6">
          <p className="font-display text-2xl">See your brand profile first</p>
          <p className="mt-2 text-ink-soft">So new work stays on-brand — like staying true to a quiz result.</p>
          <Button className="mt-4 min-h-12 w-full sm:w-auto" asChild>
            <Link href={`/app/${restaurantId}/onboarding/brand-dna`}>See your results</Link>
          </Button>
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.title} className={cn("rounded-[2rem] p-7", a.tint)}>
              <Icon className="h-6 w-6 text-ink-soft" />
              <h2 className="mt-4 font-display text-3xl">{a.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-ink">{a.copy}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild>
                  <Link href={`/app/${restaurantId}/${a.href}`}>Start</Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/50"
                  onClick={() => {
                    const job = startJob(restaurantId, a.job, { source: a.title });
                    router.push(`/app/${restaurantId}/create/${job.id}`);
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  New job
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
