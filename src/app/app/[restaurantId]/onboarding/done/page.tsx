"use client";

import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui";
import { CoachNote, WizardActions } from "@/components/onboarding";
import { useRestaurantBundle } from "@/lib/mock/store";
import { Check } from "lucide-react";

const MADE = [
  "A brand kit (colours, fonts, how you sound)",
  "A simple phone website",
  "12 social post ideas",
  "4 short video sketches",
  "Menu and Google text, plus a 30-day plan",
];

export default function OnboardingDonePage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { restaurant } = useRestaurantBundle(restaurantId);

  return (
    <div>
      <CoachNote>
        {restaurant?.name ?? "Your restaurant"} now has a kit. Look at one post first. You can ignore the rest for now.
      </CoachNote>
      <Card className="mt-5 p-5 sm:p-6">
        <p className="text-sm font-medium text-ink-soft">What we made</p>
        <ul className="mt-4 space-y-3">
          {MADE.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-2 text-white">
                <Check className="h-4 w-4" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <WizardActions
        restaurantId={restaurantId}
        current="done"
        hideBack
        onContinue={() => router.push(`/app/${restaurantId}/create`)}
        extra={
          <button
            type="button"
            className="mb-3 w-full py-2 text-center text-sm text-ink-soft underline-offset-2 hover:underline sm:text-left"
            onClick={() => router.push(`/app/${restaurantId}`)}
          >
            See everything on Home
          </button>
        }
      />
    </div>
  );
}
