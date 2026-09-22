"use client";

import { useParams } from "next/navigation";
import { Card, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function BrandGuidePage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, brandDna } = useRestaurantBundle(restaurantId);
  const locks = brandDna?.rawAnalysis?.locks;
  const pandaOnly =
    locks && typeof locks === "object" && (locks as { chefFaceIp?: string }).chefFaceIp === "talent-only";
  const rules = [
    { title: "Do", body: brandDna?.photographyDirection ?? "Shoot food in the room it is eaten." },
    {
      title: "Don’t",
      body: pandaOnly
        ? "No chef face or 饺子哥 caricature. Mode B is panda only. No delivery, Monday service, or late-night hours."
        : "No clipart chili peppers, no stock chef smile, no neon sale stickers.",
    },
    { title: "Voice", body: brandDna?.voice ?? "Short and specific." },
    { title: "CTA", body: brandDna?.ctaStyle ?? "Invite people in. Don’t shout." },
  ];
  return (
    <div>
      <PageHeader
        eyebrow="Brand guide"
        title={`How ${restaurant?.name ?? "we"} should look and sound`}
        description="A one-page reminder for anyone posting, printing, or filming this week."
      />
      <div className="brand-surface grid gap-4 md:grid-cols-2">
        {rules.map((r) => (
          <Card key={r.title} className="p-6">
            <h2 className="text-xs uppercase tracking-[0.18em] text-ink-soft">{r.title}</h2>
            <p className="mt-3 font-display text-2xl leading-snug">{r.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
