"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { isVideoConceptPayload, isVideoPayload, useRestaurantBundle } from "@/lib/mock/store";

export default function VideoFlowPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { contentItems } = useRestaurantBundle(restaurantId);
  const videos = contentItems
    .filter((c) => c.kind === "VIDEO_STORYBOARD")
    .sort((a, b) => (a.conceptIndex ?? 0) - (b.conceptIndex ?? 0));
  const [active, setActive] = useState(0);
  const video = videos[active];
  const frames = isVideoPayload(video?.payload) ? video.payload : null;
  const concept = isVideoConceptPayload(video?.payload) ? video.payload : null;

  return (
    <div>
      <PageHeader
        eyebrow="Video"
        title="Storyboard flow"
        description="Four concepts. Step through shots, listen for the room, then decide. Rendering is out of scope for Phase 1."
      />
      {videos.length === 0 ? (
        <p className="text-sm text-ink-soft">No video concepts yet. They appear after Brand DNA is approved.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <ol className="space-y-2">
            {videos.map((v, i) => (
              <li key={v.id}>
                <button
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
                    i === active ? "border-ink bg-white font-medium text-ink" : "border-line bg-white text-ink-soft"
                  }`}
                  onClick={() => setActive(i)}
                >
                  <span className="block text-xs text-ink-soft">Concept {i + 1}</span>
                  {v.title}
                </button>
              </li>
            ))}
          </ol>
          {video ? (
            <div className="brand-surface">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <h2 className="font-display text-3xl">{concept?.title ?? video.title}</h2>
                <Badge>{concept?.durationSec ?? frames?.durationSec}s</Badge>
                {concept ? <Badge tone="gold">Mode {concept.mode}</Badge> : null}
                {frames ? <Badge tone="muted">{frames.aspect}</Badge> : null}
                {concept ? <Badge tone="muted">{concept.videoId}</Badge> : null}
              </div>
              <p className="mb-6 max-w-xl text-sm text-ink-soft">{concept?.previewBrief ?? video.body}</p>
              {concept ? (
                <ol className="mb-6 space-y-2 text-sm">
                  {concept.scriptBeats.map((beat) => (
                    <li key={`${beat.startSec}-${beat.line}`}>
                      <span className="text-ink-soft">
                        {beat.startSec}–{beat.endSec}s ·{" "}
                      </span>
                      {beat.line}
                    </li>
                  ))}
                </ol>
              ) : null}
              <div className="grid gap-3 md:grid-cols-3">
                {frames?.frames.map((frame) => (
                  <Card key={frame.id} className="p-4">
                    <p className="text-xs text-ink-soft">
                      Shot {frame.order} · {frame.durationSec}s
                    </p>
                    <p className="mt-3 font-display text-xl leading-snug">{frame.shot}</p>
                    <p className="mt-3 text-xs text-ink-soft">Audio · {frame.audio}</p>
                    {frame.onScreenText ? (
                      <p className="mt-2 rounded-md bg-paper-2 px-2 py-1 text-xs">On screen · {frame.onScreenText}</p>
                    ) : null}
                  </Card>
                ))}
                {concept?.storyboardFrames.map((frame) => (
                  <Card key={frame.order} className="p-4">
                    <p className="text-xs text-ink-soft">Frame {frame.order}</p>
                    <p className="mt-3 font-display text-xl leading-snug">{frame.description}</p>
                  </Card>
                ))}
              </div>
              {concept ? (
                <ul className="mt-4 list-disc pl-4 text-sm text-ink-soft">
                  {concept.shotList.map((shot) => (
                    <li key={shot}>{shot}</li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-6 flex gap-2">
                <Button disabled={active === 0} variant="outline" onClick={() => setActive((n) => n - 1)}>
                  Previous
                </Button>
                <Button disabled={active === videos.length - 1} onClick={() => setActive((n) => n + 1)}>
                  Next concept
                </Button>
                <Button variant="ghost" asChild>
                  <Link href={`/app/${restaurantId}/content/${video.id}`}>Open item</Link>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
