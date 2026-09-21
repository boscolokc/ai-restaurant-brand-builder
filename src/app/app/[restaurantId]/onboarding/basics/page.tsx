"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, Field, Input, Textarea } from "@/components/ui";
import { WizardActions } from "@/components/onboarding";
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

  function continueNext() {
    updateRestaurant(restaurantId, { name, cuisine, city, description });
    setOnboardingStep(restaurantId, "ASSETS");
    router.push(`/app/${restaurantId}/onboarding/assets`);
  }

  return (
    <div>
      <Card className="space-y-4 rounded-[2rem] border-0 bg-sand p-6 sm:p-8">
        <Field label="Restaurant name">
          <Input value={name} onChange={(e) => setName(e.target.value)} autoComplete="organization" />
        </Field>
        <Field label="What kind of food">
          <Input value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="e.g. noodles, grill, cafe" />
        </Field>
        <Field label="City">
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
        <Field label="In one or two sentences">
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
      </Card>
      <WizardActions
        restaurantId={restaurantId}
        current="basics"
        continueDisabled={!name.trim()}
        onContinue={continueNext}
      />
    </div>
  );
}
