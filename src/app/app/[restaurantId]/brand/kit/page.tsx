"use client";

import { useParams } from "next/navigation";
import { ColorSwatches } from "@/components/brand-ui";
import { PhotoTile } from "@/components/media";
import { Card, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function BrandKitPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, brandDna, assets } = useRestaurantBundle(restaurantId);
  const generated = assets.filter((a) => a.source === "GENERATED");
  return (
    <div>
      <PageHeader
        eyebrow="Brand kit"
        title={`${restaurant?.name ?? "Restaurant"} kit`}
        description="Files and rules you can hand to a printer, a photographer, or a new cook who runs Instagram."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-2xl">Colour</h2>
          {brandDna?.colours ? (
            <div className="mt-4">
              <ColorSwatches colours={brandDna.colours} />
            </div>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">Approve Brand DNA to lock colour.</p>
          )}
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-2xl">Type</h2>
          <p className="mt-4 font-display text-4xl">{brandDna?.typography?.heading ?? "Fraunces"}</p>
          <p className="mt-2 text-lg">{brandDna?.typography?.body ?? "Outfit"}</p>
          <p className="mt-3 text-sm text-ink-soft">{brandDna?.typography?.notes}</p>
        </Card>
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-display text-2xl">Marks & generated files</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(generated.length ? generated : assets.slice(0, 3)).map((a) => (
              <PhotoTile key={a.id} title={a.title} kind={a.kind} expressive />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
