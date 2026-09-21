"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AssetCard } from "@/components/media";
import { PageHeader, Stat } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function AssetsPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { assets } = useRestaurantBundle(restaurantId);
  const generated = assets.filter((a) => a.source === "GENERATED").length;
  const uploads = assets.filter((a) => a.source === "UPLOAD").length;

  return (
    <div>
      <PageHeader
        eyebrow="Assets"
        title="Library"
        description="Uploads and generated files live together. Click anything for details."
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Total" value={assets.length} />
        <Stat label="Uploads" value={uploads} />
        <Stat label="Generated" value={generated} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {assets.map((asset) => (
          <Link key={asset.id} href={`/app/${restaurantId}/assets/${asset.id}`}>
            <AssetCard asset={asset} />
          </Link>
        ))}
      </div>
    </div>
  );
}
