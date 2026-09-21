import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 48);
}

export function formatDate(iso?: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...options,
  });
}

export function formatDateTime(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function addDays(iso: string, days: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const ONBOARDING_PATHS = [
  "basics",
  "assets",
  "business",
  "analyzing",
  "brand-dna",
  "generating",
  "done",
] as const;

export type OnboardingPath = (typeof ONBOARDING_PATHS)[number];

export const STEP_TO_PATH: Record<string, OnboardingPath> = {
  BASICS: "basics",
  ASSETS: "assets",
  BUSINESS: "business",
  ANALYZING: "analyzing",
  BRAND_DNA: "brand-dna",
  GENERATING: "generating",
  DONE: "done",
};

export const PATH_TO_STEP: Record<OnboardingPath, string> = {
  basics: "BASICS",
  assets: "ASSETS",
  business: "BUSINESS",
  analyzing: "ANALYZING",
  "brand-dna": "BRAND_DNA",
  generating: "GENERATING",
  done: "DONE",
};

export const NAV_ITEMS = [
  { href: "", label: "Home", icon: "home" },
  { href: "/brand", label: "Brand", icon: "sparkles" },
  { href: "/create", label: "Create", icon: "plus" },
  { href: "/content", label: "Content", icon: "calendar" },
  { href: "/website", label: "Website", icon: "globe" },
  { href: "/assets", label: "Assets", icon: "images" },
  { href: "/campaigns", label: "Campaigns", icon: "megaphone" },
  { href: "/social", label: "Social", icon: "share" },
] as const;
