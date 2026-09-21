"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Field, Input, Textarea } from "@/components/ui";
import { useAppStore, useRestaurant } from "@/lib/mock/store";

export default function OnboardingBusinessPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const restaurant = useRestaurant(restaurantId);
  const { updateRestaurant, setOnboardingStep } = useAppStore();
  const router = useRouter();
  const [phone, setPhone] = useState(restaurant?.phone ?? "");
  const [hours, setHours] = useState("Tue–Sat 5–10");

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Step 3 · optional</p>
      <h1 className="mt-2 font-display text-4xl">Hours, phone, a little practical</h1>
      <p className="mt-2 text-sm text-ink-soft">Skip if you want. We’ll still draft Brand DNA from photos and the basics.</p>
      <Card className="mt-8 space-y-4 p-6">
        <Field label="Phone">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field label="Hours (as guests should read them)">
          <Textarea value={hours} onChange={(e) => setHours(e.target.value)} className="min-h-20" />
        </Field>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              updateRestaurant(restaurantId, { phone: phone || null });
              setOnboardingStep(restaurantId, "ANALYZING");
              router.push(`/app/${restaurantId}/onboarding/analyzing`);
            }}
          >
            Read my photos
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setOnboardingStep(restaurantId, "ANALYZING");
              router.push(`/app/${restaurantId}/onboarding/analyzing`);
            }}
          >
            Skip
          </Button>
        </div>
      </Card>
    </div>
  );
}
