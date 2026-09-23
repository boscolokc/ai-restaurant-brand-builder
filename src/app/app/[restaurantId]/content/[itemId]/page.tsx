"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PhotoTile } from "@/components/media";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import {
  contentStatusLabel,
  contentStatusTone,
  isBrandDnaStale,
  isCalendarPayload,
  useAppStore,
  useRestaurantBundle,
} from "@/lib/mock/store";
import { formatDateTime } from "@/lib/utils";
import type { VideoPayload } from "@/lib/types";

export default function ContentItemPage() {
  const { restaurantId, itemId } = useParams<{ restaurantId: string; itemId: string }>();
  const { contentItems, brandDna } = useRestaurantBundle(restaurantId);
  const { updateContentStatus, relockContentToCurrentDna } = useAppStore();
  const item = contentItems.find((c) => c.id === itemId);

  if (!item) {
    return (
      <div>
        <PageHeader title="Item missing" />
        <Button asChild>
          <Link href={`/app/${restaurantId}/content`}>Back</Link>
        </Button>
      </div>
    );
  }

  const video = item.kind === "VIDEO_STORYBOARD" ? (item.payload as VideoPayload) : null;
  const calendar = isCalendarPayload(item.payload) ? item.payload : null;
  const approvedId = brandDna?.status === "APPROVED" ? brandDna.id : null;
  const stale = isBrandDnaStale(item.brandDnaId, approvedId);

  return (
    <div>
      <PageHeader
        eyebrow={item.kind.replaceAll("_", " ").toLowerCase()}
        title={item.title}
        description={item.body ?? undefined}
        actions={<Badge tone={contentStatusTone(item.status)}>{contentStatusLabel(item.status)}</Badge>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <PhotoTile title={item.title} overlay={item.title} large className="min-h-80" />
        <Card className="space-y-3 p-6">
          <p className="text-sm">
            <span className="text-ink-soft">Platform · </span>
            {item.platform ?? "—"}
          </p>
          <p className="text-sm">
            <span className="text-ink-soft">Scheduled · </span>
            {formatDateTime(item.scheduledFor)}
          </p>
          {item.conceptIndex ? (
            <p className="text-sm">
              <span className="text-ink-soft">Concept · </span>
              {item.conceptIndex}
            </p>
          ) : null}
          <p className="text-sm">
            <span className="text-ink-soft">Brand DNA · </span>
            {item.brandDnaId ?? "unlocked"}
            {stale ? " · drifted from current APPROVED DNA" : approvedId ? " · locked" : ""}
          </p>
          {calendar ? (
            <div className="rounded-xl bg-paper-2 p-3 text-sm">
              <p className="text-xs uppercase tracking-wider text-ink-soft">Calendar payload</p>
              <p className="mt-2">
                Day {calendar.dayIndex} · {calendar.dayOfWeek}
                {calendar.isClosedDay ? " · closed" : ""}
              </p>
              <p>
                {calendar.format} · {calendar.pillar}
              </p>
              {calendar.hookCaptionEn ? <p className="mt-2 text-ink-soft">{calendar.hookCaptionEn}</p> : null}
              {calendar.creativeNote ? <p className="mt-1">{calendar.creativeNote}</p> : null}
              {calendar.cta ? <p className="mt-1">CTA · {calendar.cta}</p> : null}
              {calendar.campaignTheme ? <p className="mt-1">Theme · {calendar.campaignTheme}</p> : null}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2 pt-4">
            {stale || item.status === "NEEDS_RELOCK" ? (
              <Button onClick={() => relockContentToCurrentDna(item.id)}>Re-lock to current DNA</Button>
            ) : (
              <Button onClick={() => updateContentStatus(item.id, "APPROVED")}>Approve</Button>
            )}
            <Button variant="outline" onClick={() => updateContentStatus(item.id, "SCHEDULED")}>
              Schedule
            </Button>
            <Button variant="ghost" onClick={() => updateContentStatus(item.id, "ARCHIVED")}>
              Archive
            </Button>
          </div>
        </Card>
      </div>
      {video ? (
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {video.frames.map((f) => (
            <Card key={f.id} className="p-4">
              <p className="text-xs uppercase tracking-wider text-ink-soft">
                {f.order} · {f.durationSec}s
              </p>
              <p className="mt-2 font-display text-xl">{f.shot}</p>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
