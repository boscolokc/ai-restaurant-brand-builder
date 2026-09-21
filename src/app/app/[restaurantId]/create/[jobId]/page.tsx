"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge, Button, Card, PageHeader, Progress } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";

export default function CreateJobPage() {
  const { restaurantId, jobId } = useParams<{ restaurantId: string; jobId: string }>();
  const { jobs } = useRestaurantBundle(restaurantId);
  const { updateJob } = useAppStore();
  const job = jobs.find((j) => j.id === jobId);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!job || job.status === "SUCCEEDED") return;
    const t = setInterval(() => {
      setTick((n) => n + 1);
      updateJob(job.id, {
        progress: Math.min(100, job.progress + 18),
        status: job.progress + 18 >= 100 ? "SUCCEEDED" : "RUNNING",
        finishedAt: job.progress + 18 >= 100 ? new Date().toISOString() : null,
        output: { mock: true, note: "Provider-independent mock job." },
      });
    }, 500);
    return () => clearInterval(t);
  }, [job, updateJob, tick]);

  if (!job) {
    return (
      <div>
        <PageHeader title="Job not found" />
        <Button asChild>
          <Link href={`/app/${restaurantId}/create`}>Back to create</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Job"
        title={job.type.replaceAll("_", " ").toLowerCase()}
        description="Async generation unit. In production this talks to the AI adapter. Here it is a mock with a progress bar."
      />
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <Badge tone={job.status === "SUCCEEDED" ? "green" : "gold"}>{job.status}</Badge>
          <span className="text-sm text-ink-soft">{job.progress}%</span>
        </div>
        <Progress className="mt-4" value={job.progress} />
        <pre className="mt-6 overflow-auto rounded-xl bg-ink p-4 text-xs text-paper">
          {JSON.stringify({ input: job.input, output: job.output }, null, 2)}
        </pre>
        <div className="mt-6 flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/app/${restaurantId}/jobs/${job.id}`}>Full job view</Link>
          </Button>
          <Button asChild>
            <Link href={`/app/${restaurantId}/create`}>Create hub</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
