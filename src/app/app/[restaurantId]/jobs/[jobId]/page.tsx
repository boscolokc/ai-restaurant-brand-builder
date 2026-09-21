"use client";

import { useParams } from "next/navigation";
import { Badge, Card, PageHeader, Progress } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";
import { formatDateTime } from "@/lib/utils";

export default function JobDetailPage() {
  const { restaurantId, jobId } = useParams<{ restaurantId: string; jobId: string }>();
  const { jobs } = useRestaurantBundle(restaurantId);
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return <PageHeader title="Job not found" />;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Creative job"
        title={job.type.replaceAll("_", " ").toLowerCase()}
        description="The async unit behind analyzing, starter packages, social, and video. Provider-independent."
      />
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <Badge tone={job.status === "SUCCEEDED" ? "green" : "gold"}>{job.status}</Badge>
          <span className="text-sm text-ink-soft">{job.progress}%</span>
        </div>
        <Progress className="mt-4" value={job.progress} />
        <dl className="mt-6 grid gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Brand DNA</dt>
            <dd className="truncate">{job.brandDnaId ?? "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Started</dt>
            <dd>{formatDateTime(job.startedAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Finished</dt>
            <dd>{formatDateTime(job.finishedAt)}</dd>
          </div>
        </dl>
        <pre className="mt-6 overflow-auto rounded-xl bg-ink p-4 text-xs text-paper">
          {JSON.stringify({ input: job.input, output: job.output, error: job.error }, null, 2)}
        </pre>
      </Card>
    </div>
  );
}
