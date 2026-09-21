"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AccountChrome } from "@/components/shell";
import { Button, Card, Field, Input, Textarea } from "@/components/ui";
import { useAppStore } from "@/lib/mock/store";

export default function NewRestaurantPage() {
  const router = useRouter();
  const { addRestaurant } = useAppStore();
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  return (
    <AccountChrome>
      <h1 className="font-display text-3xl sm:text-4xl">Add a restaurant</h1>
      <p className="mt-2 max-w-xl text-base text-ink-soft">
        We’ll walk you through photos, a brand profile, and a starter kit. You can change everything later.
      </p>
      <Card className="mt-8 max-w-xl space-y-4 p-6">
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sunday Oven" />
        </Field>
        <Field label="Cuisine">
          <Input value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="e.g. Wood-fired" />
        </Field>
        <Field label="City">
          <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Oakland" />
        </Field>
        <Field label="A sentence about it">
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <Button
          className="min-h-12 w-full sm:w-auto"
          disabled={!name.trim()}
          onClick={() => {
            const r = addRestaurant({ name, cuisine, city, description });
            router.push(`/app/${r.id}/onboarding/basics`);
          }}
        >
          Continue
        </Button>
      </Card>
    </AccountChrome>
  );
}
