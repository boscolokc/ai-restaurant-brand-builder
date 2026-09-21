"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, PageHeader } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";
import { Clapperboard, ImageIcon, MapPin, Sparkles, UtensilsCrossed } from "lucide-react";

const ACTIONS = [
  {
    href: "create/social",
    title: "Social posts",
    copy: "Review 12 concepts written in your voice. Approve the ones that feel like you.",
    icon: ImageIcon,
    job: "SOCIAL_CONCEPTS" as const,
  },
  {
    href: "create/video",
    title: "Video storyboards",
    copy: "Four short films. No rendering yet — you approve the shots first.",
    icon: Clapperboard,
    job: "VIDEO_CONCEPTS" as const,
  },
  {
    href: "content",
    title: "Menu asset",
    copy: "A clean one-pager from Brand DNA. Found in Content when ready.",
    icon: UtensilsCrossed,
    job: "SINGLE_CREATIVE" as const,
  },
  {
    href: "content",
    title: "Google Business copy",
    copy: "Short description, hours language, and attributes you can paste.",
    icon: MapPin,
    job: "SINGLE_CREATIVE" as const,
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
        eyebrow="Create"
        title="What should we make?"
        description="Plain language. You pick a type, we draft against Brand DNA, you review. Nothing publishes itself."
      />
      {!brandDna || brandDna.status !== "APPROVED" ? (
        <Card className="p-6">
          <p className="text-sm">Approve Brand DNA first so new work stays on-brand.</p>
          <Button className="mt-4" asChild>
            <Link href={`/app/${restaurantId}/onboarding/brand-dna`}>Review Brand DNA</Link>
          </Button>
        </Card>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <Card key={a.title} className="p-6">
              <Icon className="h-6 w-6" />
              <h2 className="mt-4 font-display text-2xl">{a.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{a.copy}</p>
              <div className="mt-5 flex gap-2">
                <Button asChild>
                  <Link href={`/app/${restaurantId}/${a.href}`}>Open</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const job = startJob(restaurantId, a.job, { source: a.title });
                    router.push(`/app/${restaurantId}/create/${job.id}`);
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  New job
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
