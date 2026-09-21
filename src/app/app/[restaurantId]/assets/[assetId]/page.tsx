"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PhotoTile } from "@/components/media";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function AssetDetailPage() {
  const { restaurantId, assetId } = useParams<{ restaurantId: string; assetId: string }>();
  const { assets } = useRestaurantBundle(restaurantId);
  const asset = assets.find((a) => a.id === assetId);

  if (!asset) {
    return (
      <div>
        <PageHeader title="Asset missing" />
        <Button asChild>
          <Link href={`/app/${restaurantId}/assets`}>Library</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={asset.title ?? "Untitled"}
        description={`${asset.kind.replace("_", " ").toLowerCase()} · ${asset.source.toLowerCase()}`}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <PhotoTile title={asset.title} kind={asset.kind} large className="min-h-96" />
        <Card className="space-y-3 p-6 text-sm">
          <p>
            <span className="text-ink-soft">Storage · </span>
            {asset.storageKey}
          </p>
          <p>
            <span className="text-ink-soft">Size · </span>
            {asset.width}×{asset.height} · {asset.mimeType}
          </p>
          <p>
            <span className="text-ink-soft">Analysis · </span>
            {asset.analysis ? JSON.stringify(asset.analysis) : "Not analysed"}
          </p>
          <Badge>{asset.kind}</Badge>
        </Card>
      </div>
    </div>
  );
}
