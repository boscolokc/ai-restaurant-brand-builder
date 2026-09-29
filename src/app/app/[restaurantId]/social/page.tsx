"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PhotoTile } from "@/components/media";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function SocialKitPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { contentItems, brandDna, restaurant } = useRestaurantBundle(restaurantId);
  const posts = contentItems.filter((c) => c.kind === "SOCIAL_IMAGE").slice(0, 6);

  return (
    <div>
      <PageHeader
        eyebrow="Social kit"
        title={`${restaurant?.name} on social`}
        description="Profile bio, covers, and a set of posts that share one voice. Publishing connections are next door, and still coming soon."
        actions={
          <Button asChild variant="outline">
            <Link href={`/app/${restaurantId}/social/publishing`}>Publishing</Link>
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <div className="mx-auto h-24 w-24 rounded-full bg-ink" />
          <h2 className="mt-4 text-center font-display text-2xl">{restaurant?.name}</h2>
          <p className="mt-2 text-center text-sm text-ink-soft">{brandDna?.tagline}</p>
          <p className="mt-4 text-center text-xs">{brandDna?.positioning}</p>
          <Badge className="mx-auto mt-4 flex w-fit">Bio ready</Badge>
        </Card>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
          {posts.map((p) => (
            <PhotoTile key={p.id} title={p.title} overlay={p.title} expressive />
          ))}
        </div>
      </div>
    </div>
  );
}
