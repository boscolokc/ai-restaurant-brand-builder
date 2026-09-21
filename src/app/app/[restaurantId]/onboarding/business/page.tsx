"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Field, Input, Textarea } from "@/components/ui";
import { WizardActions } from "@/components/onboarding";
import { useAppStore, useRestaurant } from "@/lib/mock/store";

export default function OnboardingBusinessPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const restaurant = useRestaurant(restaurantId);
  const { updateRestaurant, setOnboardingStep } = useAppStore();
  const router = useRouter();
  const [phone, setPhone] = useState(restaurant?.phone ?? "");
  const [hours, setHours] = useState("Tue–Sat 5–10");

  function goNext(save: boolean) {
    if (save) updateRestaurant(restaurantId, { phone: phone || null });
    setOnboardingStep(restaurantId, "ANALYZING");
    router.push(`/app/${restaurantId}/onboarding/analyzing`);
  }

  return (
    <div>
      <Card className="space-y-4 p-5 sm:p-6">
        <Field label="Phone">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" />
        </Field>
        <Field label="Hours (as guests should read them)">
          <Textarea value={hours} onChange={(e) => setHours(e.target.value)} className="min-h-20" />
        </Field>
      </Card>
      <WizardActions
        restaurantId={restaurantId}
        current="business"
        onContinue={() => goNext(true)}
        extra={
          <button
            type="button"
            className="mb-3 w-full py-2 text-center text-sm text-ink-soft underline-offset-2 hover:underline sm:mb-0 sm:w-auto sm:text-left"
            onClick={() => goNext(false)}
          >
            Skip for now
          </button>
        }
      />
    </div>
  );
}
