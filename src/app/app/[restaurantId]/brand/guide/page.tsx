"use client";

import { useParams } from "next/navigation";
import { Card, PageHeader } from "@/components/ui";
import { useRestaurantBundle } from "@/lib/mock/store";

export default function BrandGuidePage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, brandDna } = useRestaurantBundle(restaurantId);
  const rules = [
    { title: "Do", body: brandDna?.photographyDirection ?? "Shoot food in the room it is eaten." },
    { title: "Don’t", body: "No clipart chili peppers, no stock ‘chef smile’, no neon sale stickers." },
    { title: "Voice", body: brandDna?.voice ?? "Short and specific." },
    { title: "Buttons", body: brandDna?.ctaStyle ?? "Invite people in. Don’t shout." },
  ];
  return (
    <div>
      <PageHeader
        eyebrow="Brand guide"
        title={`How ${restaurant?.name ?? "we"} should look and sound`}
        description="A one-page reminder for anyone posting, printing, or filming this week."
      />
      <div className="grid gap-4 md:grid-cols-2">
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
