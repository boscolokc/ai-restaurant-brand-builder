"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";
import type { VideoPayload } from "@/lib/types";

export default function VideoFlowPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { contentItems } = useRestaurantBundle(restaurantId);
  const videos = contentItems
    .filter((c) => c.kind === "VIDEO_STORYBOARD")
    .sort((a, b) => (a.conceptIndex ?? 0) - (b.conceptIndex ?? 0));
  const [active, setActive] = useState(0);
  const video = videos[active];
  const payload = video?.payload as VideoPayload | undefined;

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
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${
                    i === active ? "border-ink bg-ink text-paper" : "border-line"
                  }`}
                  onClick={() => setActive(i)}
                >
                  <span className="block text-[11px] uppercase tracking-wider opacity-70">Concept {i + 1}</span>
                  {v.title}
                </button>
              </li>
            ))}
          </ol>
          {video ? (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <h2 className="font-display text-3xl">{video.title}</h2>
                <Badge>{payload?.durationSec}s</Badge>
                <Badge tone="muted">{payload?.aspect}</Badge>
              </div>
              <p className="mb-6 max-w-xl text-sm text-ink-soft">{video.body}</p>
              <div className="grid gap-3 md:grid-cols-3">
                {payload?.frames.map((frame) => (
                  <Card key={frame.id} className="p-4">
                    <p className="text-[11px] uppercase tracking-wider text-ink-soft">
                      Shot {frame.order} · {frame.durationSec}s
                    </p>
                    <p className="mt-3 font-display text-xl leading-snug">{frame.shot}</p>
                    <p className="mt-3 text-xs text-ink-soft">Audio · {frame.audio}</p>
                    {frame.onScreenText ? (
                      <p className="mt-2 rounded-lg bg-paper-2 px-2 py-1 text-xs">On screen · {frame.onScreenText}</p>
                    ) : null}
                  </Card>
                ))}
              </div>
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
