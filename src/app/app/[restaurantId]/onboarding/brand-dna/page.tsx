"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BrandResults } from "@/components/brand-ui";
import { Card, Field, Textarea } from "@/components/ui";
import { WizardActions } from "@/components/onboarding";
import { useAppStore, useRestaurantBundle } from "@/lib/mock/store";

export default function OnboardingBrandDnaPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { brandDna, restaurant } = useRestaurantBundle(restaurantId);
  const { approveBrandDna, ensureDraftBrandDna, saveBrandDna } = useAppStore();
  const [editing, setEditing] = useState(false);

  if (!brandDna) {
    return (
      <Card className="p-8">
        <p className="font-display text-2xl">We don’t have a draft yet.</p>
        <p className="mt-2 text-ink-soft">Give us a second and we’ll write a brand profile from what you shared.</p>
        <WizardActions
          restaurantId={restaurantId}
          current="brand-dna"
          continueLabel="Draft my brand profile"
          onContinue={() => ensureDraftBrandDna(restaurantId)}
        />
      </Card>
    );
  }

  function approve() {
    approveBrandDna(restaurantId);
    router.push(`/app/${restaurantId}/onboarding/generating`);
  }

  return (
    <div>
      <BrandResults dna={brandDna} restaurant={restaurant} />
      {editing ? (
        <Card className="mt-5 space-y-4 p-5 sm:p-6">
          <Field label="Tagline">
            <Textarea
              name="tagline"
              defaultValue={brandDna.tagline ?? ""}
              className="min-h-16"
              onBlur={(e) => saveBrandDna(restaurantId, { tagline: e.target.value })}
            />
          </Field>
          <Field label="What you’re known for">
            <Textarea
              defaultValue={brandDna.positioning ?? ""}
              onBlur={(e) => saveBrandDna(restaurantId, { positioning: e.target.value })}
            />
          </Field>
          <Field label="How you sound">
            <Textarea
              defaultValue={brandDna.voice ?? ""}
              onBlur={(e) => saveBrandDna(restaurantId, { voice: e.target.value })}
            />
          </Field>
        </Card>
      ) : (
        <button
          type="button"
          className="mt-4 min-h-11 text-sm text-ink-soft underline-offset-2 hover:underline"
          onClick={() => setEditing(true)}
        >
          Change a few words
        </button>
      )}
      <WizardActions restaurantId={restaurantId} current="brand-dna" onContinue={approve} />
    </div>
  );
}
