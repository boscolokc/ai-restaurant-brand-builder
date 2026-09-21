"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge, Card, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";
import { formatDate } from "@/lib/utils";

export default function ContentCalendarPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { contentItems } = useRestaurantBundle(restaurantId);
  const scheduled = [...contentItems]
    .filter((c) => c.scheduledFor)
    .sort((a, b) => (a.scheduledFor ?? "").localeCompare(b.scheduledFor ?? ""));
  const other = contentItems.filter((c) => !c.scheduledFor);

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="30-day plan"
        description="A calendar of posts, storyboards, and copy. Scheduled does not mean published."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h2 className="font-display text-xl">Calendar</h2>
          <ul className="mt-4 divide-y divide-line">
            {scheduled.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/app/${restaurantId}/content/${item.id}`}
                  className="flex items-center justify-between gap-3 py-3 hover:bg-paper-2/50"
                >
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-xs text-ink-soft">
                      {formatDate(item.scheduledFor, { weekday: "short" })} · {item.kind.replace("_", " ").toLowerCase()} ·{" "}
                      {item.platform ?? "all"}
                    </p>
                  </div>
                  <Badge tone={item.status === "APPROVED" ? "green" : "muted"}>{item.status.replace("_", " ")}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-xl">Library</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {other.map((item) => (
              <li key={item.id}>
                <Link href={`/app/${restaurantId}/content/${item.id}`} className="hover:underline">
                  {item.title}
                </Link>
                <p className="text-xs text-ink-soft">{item.kind.replace("_", " ").toLowerCase()}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
