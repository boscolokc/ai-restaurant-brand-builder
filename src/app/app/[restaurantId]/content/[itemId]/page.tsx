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
  isSocialConceptPayload,
  isVideoConceptPayload,
  isVideoPayload,
  useAppStore,
  useRestaurantBundle,
} from "@/lib/mock/store";
import { formatDateTime } from "@/lib/utils";

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

  const video = isVideoPayload(item.payload) ? item.payload : null;
  const videoConcept = isVideoConceptPayload(item.payload) ? item.payload : null;
  const social = isSocialConceptPayload(item.payload) ? item.payload : null;
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
      <div className="brand-surface grid gap-4 lg:grid-cols-2">
        <PhotoTile title={item.title} overlay={social?.captionZh ?? item.title} large expressive className="min-h-80" />
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
          {social ? (
            <div className="rounded-md bg-paper-2 p-3 text-sm">
              <p className="text-xs font-medium text-ink-soft">
                {social.postId} · Mode {social.mode} · {social.pillar}
              </p>
              <p className="mt-2">{social.objective}</p>
              <p className="mt-2">{social.captionZh}</p>
              <p className="mt-1 text-ink-soft">{social.captionEn}</p>
              <p className="mt-2">{social.visualConcept}</p>
              <p className="mt-2">CTA · {social.cta}</p>
              <ul className="mt-2 space-y-1 text-ink-soft">
                {social.ratios.map((ratio) => (
                  <li key={ratio}>
                    {ratio} · {social.layoutNotesByRatio[ratio]}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {videoConcept ? (
            <div className="rounded-md bg-paper-2 p-3 text-sm">
              <p className="text-xs font-medium text-ink-soft">
                {videoConcept.videoId} · {videoConcept.durationSec}s · Mode {videoConcept.mode}
              </p>
              <p className="mt-2">{videoConcept.previewBrief}</p>
              <p className="mt-2 text-xs font-medium text-ink-soft">Shot list</p>
              <ul className="mt-1 list-disc pl-4">
                {videoConcept.shotList.map((shot) => (
                  <li key={shot}>{shot}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {calendar ? (
            <div className="rounded-md bg-paper-2 p-3 text-sm">
              <p className="text-xs font-medium text-ink-soft">Calendar payload</p>
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
        <div className="brand-surface mt-6 grid gap-3 md:grid-cols-3">
          {video.frames.map((f) => (
            <Card key={f.id} className="p-4">
              <p className="text-xs font-medium text-ink-soft">
                {f.order} · {f.durationSec}s
              </p>
              <p className="mt-2 font-display text-xl">{f.shot}</p>
            </Card>
          ))}
        </div>
      ) : null}
      {videoConcept ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="brand-surface">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Script</p>
            <ol className="mt-3 space-y-3">
              {videoConcept.scriptBeats.map((beat) => (
                <li key={`${beat.startSec}-${beat.line}`}>
                  <p className="text-xs text-ink-soft">
                    {beat.startSec}–{beat.endSec}s
                  </p>
                  <p className="font-display text-lg leading-snug">{beat.line}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="brand-surface">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Storyboard</p>
            <ol className="mt-3 space-y-3">
              {videoConcept.storyboardFrames.map((frame) => (
                <li key={frame.order}>
                  <p className="text-xs text-ink-soft">Frame {frame.order}</p>
                  <p className="font-display text-lg leading-snug">{frame.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </div>
  );
}
