"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Card, Field, Input, Textarea } from "@/components/ui";
import { useAppStore, useRestaurant } from "@/lib/mock/store";
import { useState } from "react";

export default function OnboardingBasicsPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const restaurant = useRestaurant(restaurantId);
  const { updateRestaurant, setOnboardingStep } = useAppStore();
  const router = useRouter();
  const [name, setName] = useState(restaurant?.name ?? "");
  const [cuisine, setCuisine] = useState(restaurant?.cuisine ?? "");
  const [city, setCity] = useState(restaurant?.city ?? "");
  const [description, setDescription] = useState(restaurant?.description ?? "");

  if (!restaurant) return null;

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Step 1</p>
      <h1 className="mt-2 font-display text-4xl">Tell us about the restaurant</h1>
      <p className="mt-2 text-sm text-ink-soft">Plain facts. We’ll write the brand language — you just check that it’s true.</p>
      <Card className="mt-8 space-y-4 p-6">
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="What kind of food">
          <Input value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
        </Field>
        <Field label="City">
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
        <Field label="In one or two sentences">
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <Button
          onClick={() => {
            updateRestaurant(restaurantId, { name, cuisine, city, description });
            setOnboardingStep(restaurantId, "ASSETS");
            router.push(`/app/${restaurantId}/onboarding/assets`);
          }}
        >
          Continue to photos
        </Button>
      </Card>
    </div>
  );
}
