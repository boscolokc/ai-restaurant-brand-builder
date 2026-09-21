import type { OnboardingStep } from "@/lib/types";
import { ONBOARDING_PATHS, STEP_TO_PATH, type OnboardingPath } from "@/lib/utils";

export const WIZARD_COPY: Record<
  OnboardingPath,
  { title: string; helper: string; continueLabel: string }
> = {
  basics: {
    title: "What’s the restaurant called?",
    helper: "A few facts, like the start of a quiz. We’ll write the personality next.",
    continueLabel: "Continue",
  },
  assets: {
    title: "Add a few photos",
    helper: "Phone pictures of food and the room are enough. That’s the rest of the quiz.",
    continueLabel: "Continue",
  },
  business: {
    title: "Hours and phone (optional)",
    helper: "Guests need this on Google and your site. Skip if you’re not sure yet.",
    continueLabel: "Continue",
  },
  analyzing: {
    title: "Reading your answers",
    helper: "This is the pause before results — like scoring a quiz.",
    continueLabel: "Continue",
  },
  "brand-dna": {
    title: "Your brand profile",
    helper: "A results page from your photos and answers. If it feels like you, keep going.",
    continueLabel: "Looks right — continue",
  },
  generating: {
    title: "Writing the next chapters",
    helper: "Website, posts, and videos — you open them one at a time. Nothing goes live.",
    continueLabel: "Continue",
  },
  done: {
    title: "That’s your profile",
    helper: "Pick one chapter to start. You can ignore the rest for now.",
    continueLabel: "Create a post",
  },
};

export function stepNumber(path: string) {
  const idx = ONBOARDING_PATHS.indexOf(path as OnboardingPath);
  return idx >= 0 ? idx + 1 : 1;
}

export function prevPath(path: string): OnboardingPath | null {
  const idx = ONBOARDING_PATHS.indexOf(path as OnboardingPath);
  if (idx <= 0) return null;
  return ONBOARDING_PATHS[idx - 1];
}

export function nextPath(path: string): OnboardingPath | null {
  const idx = ONBOARDING_PATHS.indexOf(path as OnboardingPath);
  if (idx < 0 || idx >= ONBOARDING_PATHS.length - 1) return null;
  return ONBOARDING_PATHS[idx + 1];
}

export type OwnerMilestoneId = "basics" | "photos" | "profile" | "package" | "create";

export type OwnerMilestone = {
  id: OwnerMilestoneId;
  label: string;
  helper: string;
};

export const OWNER_MILESTONES: OwnerMilestone[] = [
  { id: "basics", label: "Basics", helper: "Name, food, and city" },
  { id: "photos", label: "Photos", helper: "A few pictures of food and the room" },
  { id: "profile", label: "Brand profile", helper: "Your results page" },
  { id: "package", label: "Next chapters", helper: "Website, posts, and a simple plan" },
  { id: "create", label: "Create content", helper: "Pick one post. Nothing goes live yet." },
];

const STEP_INDEX: Record<OnboardingStep, number> = {
  BASICS: 0,
  ASSETS: 1,
  BUSINESS: 2,
  ANALYZING: 3,
  BRAND_DNA: 4,
  GENERATING: 5,
  DONE: 6,
};

export function milestoneStatus(
  id: OwnerMilestoneId,
  step: OnboardingStep,
  onboardingDone: boolean,
  brandApproved: boolean,
): "done" | "current" | "upcoming" {
  const idx = STEP_INDEX[step] ?? 0;
  if (id === "basics") return idx > 0 || onboardingDone ? "done" : "current";
  if (id === "photos") {
    if (idx > 1 || onboardingDone) return "done";
    if (idx === 1) return "current";
    return "upcoming";
  }
  if (id === "profile") {
    if (brandApproved || idx > 4 || onboardingDone) return "done";
    if (idx >= 2 && idx <= 4) return "current";
    return "upcoming";
  }
  if (id === "package") {
    if (onboardingDone) return "done";
    if (idx >= 5) return "current";
    return "upcoming";
  }
  return onboardingDone ? "current" : "upcoming";
}

export function recommendedAction(
  step: OnboardingStep,
  restaurantId: string,
  onboardingDone: boolean,
  brandApproved: boolean,
): { label: string; href: string; helper: string } {
  if (onboardingDone && brandApproved) {
    return {
      label: "Create a post",
      href: `/app/${restaurantId}/create`,
      helper: "Your kit is ready. Pick one thing to look at — nothing posts itself.",
    };
  }
  const path = STEP_TO_PATH[step] ?? "basics";
  const copy = WIZARD_COPY[path];
  const labels: Partial<Record<OnboardingStep, string>> = {
    BASICS: "Start the quiz",
    ASSETS: "Add a few photos",
    BUSINESS: "Add hours (or skip)",
    ANALYZING: "See how it’s going",
    BRAND_DNA: "See your results",
    GENERATING: "See what’s next",
    DONE: "Create a post",
  };
  return {
    label: labels[step] ?? copy.continueLabel,
    href: `/app/${restaurantId}/onboarding/${path}`,
    helper: copy.helper,
  };
}

export function milestoneHref(id: OwnerMilestoneId, restaurantId: string) {
  const map: Record<OwnerMilestoneId, string> = {
    basics: `/app/${restaurantId}/onboarding/basics`,
    photos: `/app/${restaurantId}/onboarding/assets`,
    profile: `/app/${restaurantId}/onboarding/brand-dna`,
    package: `/app/${restaurantId}/onboarding/generating`,
    create: `/app/${restaurantId}/create`,
  };
  return map[id];
}
