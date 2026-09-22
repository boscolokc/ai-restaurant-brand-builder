"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BrandStrip } from "@/components/brand-ui";
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

  const upcoming = contentItems
    .filter((c) => c.scheduledFor)
    .sort((a, b) => (a.scheduledFor ?? "").localeCompare(b.scheduledFor ?? ""))
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        eyebrow={restaurant.cuisine ?? "Restaurant"}
        title={restaurant.name}
        description={
          brandDna?.status === "APPROVED"
            ? "Your brand kit is ready — let’s keep growing. Nothing posts until you say so."
            : "Finish your brand profile to unlock a starter package on this home screen."
        }
        actions={
          <Button asChild size="lg">
            <Link href={`/app/${restaurantId}/create`}>
              <Plus className="h-4 w-4" />
              Create content
            </Link>
          </Button>
        }
      />

      {restaurant.onboardingDone && brandDna?.status === "APPROVED" ? (
        <>
          <div className="mb-8">
            <BrandStrip dna={brandDna} href={`/app/${restaurantId}/brand`} />
          </div>
          <div className="mb-8 grid gap-3 sm:grid-cols-4">
            <Stat label="Social concepts" value={starter.socialCreatives} />
            <Stat label="Video concepts" value={starter.videoConcepts} />
            <Stat label="Assets" value={starter.assetCount} />
            <Stat label="Plan items" value={starter.calendarDays} />
          </div>
          <h2 className="mb-4 text-base font-semibold">Starter package</h2>
          <StarterPackageGrid restaurantId={restaurantId} starter={starter} />
        </>
      ) : (
        <Card className="p-8">
          <Badge tone="gold">Waiting on Brand DNA</Badge>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">Approve your brand, then we cook the kit.</h2>
          <p className="mt-2 max-w-lg text-sm text-ink-soft">
            Home stays quiet until you review positioning, voice, and colour. That’s on purpose — we don’t generate a
            wall of posts from a guess.
          </p>
          <Button className="mt-6" asChild>
            <Link href={`/app/${restaurantId}/onboarding/brand-dna`}>Review Brand DNA</Link>
          </Button>
        </Card>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Coming up</h3>
            <Link href={`/app/${restaurantId}/content`} className="text-sm text-ink-soft hover:text-ink">
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
                  <Badge tone={item.status === "NEEDS_RELOCK" ? "accent" : "muted"}>
                    {item.status.replaceAll("_", " ")}
                  </Badge>
                </li>
              ))
            )}
          </ul>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold">Recent jobs</h3>
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
