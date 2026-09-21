"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Card, Field, PageHeader, Textarea } from "@/components/ui";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";

export default function BrandEditPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { brandDna } = useRestaurantBundle(restaurantId);
  const { saveBrandDna } = useAppStore();

  if (!brandDna) return <p>No Brand DNA to edit yet.</p>;

  function save(form: FormData) {
    saveBrandDna(restaurantId, {
      positioning: String(form.get("positioning")),
      audience: String(form.get("audience")),
      personality: String(form.get("personality")),
      voice: String(form.get("voice")),
      tagline: String(form.get("tagline")),
      photographyDirection: String(form.get("photographyDirection")),
      videoDirection: String(form.get("videoDirection")),
      graphicStyle: String(form.get("graphicStyle")),
      ctaStyle: String(form.get("ctaStyle")),
    });
    router.push(`/app/${restaurantId}/brand`);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Edit"
        title="Tweak Brand DNA"
        description="Edits stay in this demo. Later, saving will version the record and mark the old one superseded."
      />
      <Card className="p-6">
        <form
          className="grid gap-4"
          action={(formData) => {
            save(formData);
          }}
        >
          <Field label="Tagline">
            <Textarea name="tagline" defaultValue={brandDna.tagline ?? ""} className="min-h-16" />
          </Field>
          <Field label="Positioning">
            <Textarea name="positioning" defaultValue={brandDna.positioning ?? ""} />
          </Field>
          <Field label="Audience">
            <Textarea name="audience" defaultValue={brandDna.audience ?? ""} />
          </Field>
          <Field label="Personality">
            <Textarea name="personality" defaultValue={brandDna.personality ?? ""} />
          </Field>
          <Field label="Voice">
            <Textarea name="voice" defaultValue={brandDna.voice ?? ""} />
          </Field>
          <Field label="Photography">
            <Textarea name="photographyDirection" defaultValue={brandDna.photographyDirection ?? ""} />
          </Field>
          <Field label="Video">
            <Textarea name="videoDirection" defaultValue={brandDna.videoDirection ?? ""} />
          </Field>
          <Field label="Graphics">
            <Textarea name="graphicStyle" defaultValue={brandDna.graphicStyle ?? ""} />
          </Field>
          <Field label="Calls to action">
            <Textarea name="ctaStyle" defaultValue={brandDna.ctaStyle ?? ""} />
          </Field>
          <Button type="submit">Save board</Button>
        </form>
      </Card>
    </div>
  );
}
