"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FirstRunHome } from "@/components/first-run-home";
import { StarterPackageGrid } from "@/components/package";
import { Badge, Button, Card, PageHeader, Stat } from "@/components/ui";
import { PhotoTile } from "@/components/media";
import { useRestaurantBundle } from "@/lib/mock/store";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function RestaurantHomePage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, brandDna, assets, jobs, contentItems, starter } = useRestaurantBundle(restaurantId);
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
      />
    );
  }

  const upcoming = contentItems
    .filter((c) => c.scheduledFor)
    .sort((a, b) => (a.scheduledFor ?? "").localeCompare(b.scheduledFor ?? ""))
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        eyebrow={restaurant.cuisine ?? "Restaurant"}
        title={`Welcome back, ${restaurant.name}`}
        description={
          brandDna?.tagline
            ? `${brandDna.tagline} Your starter kit is ready to look at — nothing posts until you say so.`
            : "Your starter kit is ready. Pick one post to review."
        }
        actions={
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={`/app/${restaurantId}/create`}>
              <Plus className="h-4 w-4" />
              Create content
            </Link>
          </Button>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Post ideas" value={starter.socialCreatives} />
        <Stat label="Video ideas" value={starter.videoConcepts} />
        <Stat label="Photos" value={starter.assetCount} />
        <Stat label="Plan items" value={starter.calendarDays} />
      </div>
      <h2 className="mb-4 font-display text-2xl">Your starter kit</h2>
      <StarterPackageGrid restaurantId={restaurantId} starter={starter} />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl">Coming up</h3>
            <Link href={`/app/${restaurantId}/content`} className="min-h-11 text-sm text-ink-soft hover:text-ink">
              Calendar
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {upcoming.length === 0 ? (
              <li className="py-6 text-sm text-ink-soft">No scheduled pieces yet.</li>
            ) : (
              upcoming.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-xs text-ink-soft">
                      {item.platform ?? item.kind} · {formatDate(item.scheduledFor)}
                    </p>
                  </div>
                  <Badge tone="muted">{item.status.replace("_", " ")}</Badge>
                </li>
              ))
            )}
          </ul>
        </Card>
        <Card className="p-5">
          <h3 className="font-display text-xl">Recent work</h3>
          <ul className="mt-3 space-y-3">
            {jobs.slice(0, 4).map((job) => (
              <li key={job.id}>
                <Link href={`/app/${restaurantId}/jobs/${job.id}`} className="text-sm hover:underline">
                  {job.type.replaceAll("_", " ").toLowerCase()}
                </Link>
                <p className="text-xs text-ink-soft">
                  {job.status.toLowerCase()} · {job.progress}%
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {assets.slice(0, 4).map((a) => (
              <PhotoTile key={a.id} title={a.title} kind={a.kind} className="min-h-24" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
