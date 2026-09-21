"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { buildLimeStarterPackage, createSeedSnapshot, LIME_ID } from "@/lib/mock/seed";
import type {
  AppSnapshot,
  Asset,
  BrandDNA,
  ContentItem,
  CreativeJob,
  CreativeJobType,
  OnboardingStep,
  Restaurant,
  StarterPackage,
} from "@/lib/types";
import { slugify, uid } from "@/lib/utils";

const STORAGE_KEY = "hearth-demo-store-v1";

type StoreContextValue = {
  hydrated: boolean;
  snapshot: AppSnapshot;
  reset: () => void;
  updateRestaurant: (id: string, patch: Partial<Restaurant>) => void;
  ensureDraftBrandDna: (restaurantId: string) => void;
  addRestaurant: (input: {
    name: string;
    cuisine?: string;
    city?: string;
    country?: string;
    description?: string;
  }) => Restaurant;
  addMockAssets: (restaurantId: string, titles: string[]) => void;
  setOnboardingStep: (restaurantId: string, step: OnboardingStep, done?: boolean) => void;
  saveBrandDna: (restaurantId: string, patch: Partial<BrandDNA>) => void;
  approveBrandDna: (restaurantId: string) => void;
  unlockStarterPackage: (restaurantId: string) => void;
  startJob: (restaurantId: string, type: CreativeJobType, input?: Record<string, unknown>) => CreativeJob;
  updateJob: (jobId: string, patch: Partial<CreativeJob>) => void;
  updateWebsiteSection: (
    restaurantId: string,
    sectionId: string,
    patch: { title?: string; body?: string; enabled?: boolean },
  ) => void;
  setWebsiteStatus: (restaurantId: string, status: "DRAFT" | "READY" | "PUBLISHED") => void;
  updateContentStatus: (itemId: string, status: ContentItem["status"]) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const SERVER_SNAPSHOT = createSeedSnapshot();

function cloneSeed() {
  return structuredClone(createSeedSnapshot());
}

let memory: AppSnapshot | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readClientSnapshot(): AppSnapshot {
  if (memory) return memory;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    memory = raw ? (JSON.parse(raw) as AppSnapshot) : cloneSeed();
  } catch {
    memory = cloneSeed();
  }
  return memory;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(next: AppSnapshot) {
  memory = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // private mode / quota
  }
  emit();
}

function packageFor(s: AppSnapshot, restaurantId: string): StarterPackage {
  const items = s.contentItems.filter((c) => c.restaurantId === restaurantId);
  const website = s.websites.find((w) => w.restaurantId === restaurantId);
  const dna = s.brandDnas.find((d) => d.restaurantId === restaurantId && d.status === "APPROVED");
  return {
    brandKitReady: Boolean(dna),
    websiteReady: Boolean(website),
    socialKitReady: items.some((i) => i.kind === "SOCIAL_IMAGE"),
    socialCreatives: items.filter((i) => i.kind === "SOCIAL_IMAGE").length,
    videoConcepts: items.filter((i) => i.kind === "VIDEO_STORYBOARD").length,
    menuAssets: items.filter((i) => i.kind === "MENU_ASSET").length,
    googleBusiness: items.some((i) => i.kind === "GOOGLE_BUSINESS"),
    calendarDays: items.filter((i) => i.scheduledFor).length,
    assetCount: s.assets.filter((a) => a.restaurantId === restaurantId).length,
  };
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, readClientSnapshot, () => SERVER_SNAPSHOT);

  const mutate = useCallback((fn: (draft: AppSnapshot) => void) => {
    const next = structuredClone(memory ?? readClientSnapshot());
    fn(next);
    next.account.updatedAt = new Date().toISOString();
    commit(next);
  }, []);

  const reset = useCallback(() => {
    commit(cloneSeed());
  }, []);

  const actions = useMemo((): Omit<StoreContextValue, "hydrated" | "snapshot"> => {
    return {
      reset,
      updateRestaurant: (id, patch) =>
        mutate((d) => {
          const r = d.restaurants.find((x) => x.id === id);
          if (!r) return;
          Object.assign(r, patch, { updatedAt: new Date().toISOString() });
        }),
      ensureDraftBrandDna: (restaurantId) =>
        mutate((d) => {
          if (d.brandDnas.some((x) => x.restaurantId === restaurantId && x.status !== "SUPERSEDED")) return;
          const r = d.restaurants.find((x) => x.id === restaurantId);
          if (!r) return;
          const t = new Date().toISOString();
          d.brandDnas.push({
            id: uid("dna"),
            restaurantId,
            status: "PENDING_REVIEW",
            version: 1,
            positioning: `${r.name} is a ${r.cuisine ?? "neighborhood"} table${r.city ? ` in ${r.city}` : ""} that cooks for people who want to linger.`,
            audience: "Nearby regulars and couples looking for a considered table.",
            personality: "Warm, specific, unhurried.",
            voice: "Short sentences. Sensory, never salesy.",
            tagline: r.description?.split(".")[0] || "Come sit. Stay a while.",
            colours: {
              primary: "#3d4a3c",
              secondary: "#c4a574",
              accent: "#c24e1d",
              neutrals: ["#f6f0e6", "#e7dccb", "#1f1a16"],
            },
            typography: { heading: "Fraunces", body: "Outfit", notes: "Sentence case headlines." },
            photographyDirection: "Food in the room it is eaten. Hands, linen, window light.",
            videoDirection: "Hold on the plate. Room tone. No jump cuts on garnishes.",
            graphicStyle: "Generous margins, one accent rule.",
            ctaStyle: "Reserve a table — never Shop now.",
            rawAnalysis: { mock: true, typeName: `The ${r.city ?? "Neighborhood"} Table` },
            approvedAt: null,
            createdAt: t,
            updatedAt: t,
          });
        }),
      addRestaurant: (input) => {
        const createdAt = new Date().toISOString();
        let created!: Restaurant;
        mutate((d) => {
          const baseSlug = slugify(input.name) || "new-restaurant";
          let slug = baseSlug;
          let n = 2;
          while (d.restaurants.some((r) => r.slug === slug)) {
            slug = `${baseSlug}-${n++}`;
          }
          created = {
            id: uid("rst"),
            accountId: d.account.id,
            name: input.name,
            slug,
            cuisine: input.cuisine ?? null,
            city: input.city ?? null,
            country: input.country ?? "US",
            phone: null,
            websiteUrl: null,
            description: input.description ?? null,
            onboardingStep: "BASICS",
            onboardingDone: false,
            createdAt,
            updatedAt: createdAt,
          };
          d.restaurants.push(created);
        });
        return created;
      },
      addMockAssets: (restaurantId, titles) =>
        mutate((d) => {
          const t = new Date().toISOString();
          for (const title of titles) {
            d.assets.push({
              id: uid("ast"),
              restaurantId,
              kind: "FOOD_PHOTO",
              source: "UPLOAD",
              title,
              storageKey: `${restaurantId}/${uid("file")}`,
              mimeType: "image/jpeg",
              byteSize: 800_000,
              width: 1600,
              height: 2000,
              analysis: { vibe: "uploaded during onboarding" },
              createdAt: t,
              updatedAt: t,
            });
          }
        }),
      setOnboardingStep: (restaurantId, step, done) =>
        mutate((d) => {
          const r = d.restaurants.find((x) => x.id === restaurantId);
          if (!r) return;
          r.onboardingStep = step;
          if (typeof done === "boolean") r.onboardingDone = done;
          r.updatedAt = new Date().toISOString();
        }),
      saveBrandDna: (restaurantId, patch) =>
        mutate((d) => {
          const dna = d.brandDnas.find((x) => x.restaurantId === restaurantId && x.status !== "SUPERSEDED");
          if (!dna) return;
          Object.assign(dna, patch, { updatedAt: new Date().toISOString() });
        }),
      approveBrandDna: (restaurantId) =>
        mutate((d) => {
          const dna = d.brandDnas.find((x) => x.restaurantId === restaurantId && x.status !== "SUPERSEDED");
          const r = d.restaurants.find((x) => x.id === restaurantId);
          if (!dna || !r) return;
          dna.status = "APPROVED";
          dna.approvedAt = new Date().toISOString();
          dna.updatedAt = dna.approvedAt;
          r.onboardingStep = "GENERATING";
          r.updatedAt = dna.approvedAt;
        }),
      unlockStarterPackage: (restaurantId) =>
        mutate((d) => {
          const r = d.restaurants.find((x) => x.id === restaurantId);
          if (!r) return;
          const already = d.contentItems.some(
            (c) => c.restaurantId === restaurantId && c.kind === "SOCIAL_IMAGE",
          );
          if (!already) {
            if (restaurantId === LIME_ID) {
              const pack = buildLimeStarterPackage();
              d.contentItems.push(...pack.contentItems);
              d.jobs.push(...pack.jobs);
              d.assets.push(...pack.assets);
              if (!d.websites.some((w) => w.restaurantId === restaurantId)) {
                d.websites.push(pack.website);
              }
            } else {
              const t = new Date().toISOString();
              const dna = d.brandDnas.find((x) => x.restaurantId === restaurantId);
              d.jobs.push({
                id: uid("job"),
                restaurantId,
                type: "STARTER_PACKAGE",
                status: "SUCCEEDED",
                progress: 100,
                input: { brandDnaId: dna?.id },
                output: { package: "complete" },
                error: null,
                startedAt: t,
                finishedAt: t,
                createdAt: t,
                updatedAt: t,
              });
              for (let i = 1; i <= 12; i++) {
                d.contentItems.push({
                  id: uid("ci"),
                  restaurantId,
                  jobId: null,
                  kind: "SOCIAL_IMAGE",
                  status: "IN_REVIEW",
                  title: `Concept ${i}`,
                  body: dna?.tagline ?? "New social creative",
                  platform: "ig",
                  conceptIndex: i,
                  scheduledFor: t,
                  payload: {
                    format: "4:5",
                    overlay: `Post ${i}`,
                    caption: dna?.tagline ?? "",
                    hashtags: [],
                  },
                  thumbnailKey: null,
                  createdAt: t,
                  updatedAt: t,
                });
              }
              for (let i = 1; i <= 4; i++) {
                d.contentItems.push({
                  id: uid("ci"),
                  restaurantId,
                  jobId: null,
                  kind: "VIDEO_STORYBOARD",
                  status: "IN_REVIEW",
                  title: `Video concept ${i}`,
                  body: "Mock storyboard from starter package.",
                  platform: "tiktok",
                  conceptIndex: i,
                  scheduledFor: t,
                  payload: {
                    durationSec: 10,
                    aspect: "9:16",
                    frames: [
                      {
                        id: "f1",
                        order: 1,
                        durationSec: 3,
                        shot: "Hero dish.",
                        audio: "Room tone.",
                        onScreenText: dna?.tagline ?? "",
                      },
                      {
                        id: "f2",
                        order: 2,
                        durationSec: 4,
                        shot: "Hands plating.",
                        audio: "Kitchen.",
                        onScreenText: "",
                      },
                      {
                        id: "f3",
                        order: 3,
                        durationSec: 3,
                        shot: "Wide room.",
                        audio: "Hold.",
                        onScreenText: r.name,
                      },
                    ],
                  },
                  thumbnailKey: null,
                  createdAt: t,
                  updatedAt: t,
                });
              }
              d.contentItems.push({
                id: uid("ci"),
                restaurantId,
                jobId: null,
                kind: "MENU_ASSET",
                status: "APPROVED",
                title: "Digital menu",
                body: "Starter menu layout.",
                platform: null,
                conceptIndex: null,
                scheduledFor: null,
                payload: {},
                thumbnailKey: null,
                createdAt: t,
                updatedAt: t,
              });
              d.contentItems.push({
                id: uid("ci"),
                restaurantId,
                jobId: null,
                kind: "GOOGLE_BUSINESS",
                status: "APPROVED",
                title: "Google Business profile copy",
                body: dna?.positioning ?? `${r.name} is ready for guests.`,
                platform: "google",
                conceptIndex: null,
                scheduledFor: null,
                payload: {},
                thumbnailKey: null,
                createdAt: t,
                updatedAt: t,
              });
              if (!d.websites.some((w) => w.restaurantId === restaurantId)) {
                d.websites.push({
                  id: uid("web"),
                  restaurantId,
                  status: "READY",
                  theme: dna?.colours
                    ? {
                        primary: dna.colours.primary,
                        secondary: dna.colours.secondary,
                        background: dna.colours.neutrals[0] ?? "#f7f1e8",
                        headingFont: dna.typography?.heading ?? "Fraunces",
                        bodyFont: dna.typography?.body ?? "Outfit",
                      }
                    : null,
                  sections: [
                    {
                      id: "hero",
                      type: "hero",
                      title: dna?.tagline ?? r.name,
                      body: dna?.positioning ?? "",
                      enabled: true,
                    },
                    {
                      id: "hours",
                      type: "hours",
                      title: "Hours",
                      body: "Add your hours.",
                      enabled: true,
                    },
                    {
                      id: "footer",
                      type: "footer",
                      title: r.name,
                      body: r.city ?? "",
                      enabled: true,
                    },
                  ],
                  publishedAt: null,
                  createdAt: t,
                  updatedAt: t,
                });
              }
            }
          }
          r.onboardingStep = "DONE";
          r.onboardingDone = true;
          r.updatedAt = new Date().toISOString();
        }),
      startJob: (restaurantId, type, input) => {
        const t = new Date().toISOString();
        const job: CreativeJob = {
          id: uid("job"),
          restaurantId,
          type,
          status: "RUNNING",
          progress: 8,
          input: input ?? null,
          output: null,
          error: null,
          startedAt: t,
          finishedAt: null,
          createdAt: t,
          updatedAt: t,
        };
        mutate((d) => {
          d.jobs.unshift(job);
        });
        return job;
      },
      updateJob: (jobId, patch) =>
        mutate((d) => {
          const job = d.jobs.find((j) => j.id === jobId);
          if (!job) return;
          Object.assign(job, patch, { updatedAt: new Date().toISOString() });
        }),
      updateWebsiteSection: (restaurantId, sectionId, patch) =>
        mutate((d) => {
          const site = d.websites.find((w) => w.restaurantId === restaurantId);
          const section = site?.sections.find((s) => s.id === sectionId);
          if (!section) return;
          Object.assign(section, patch);
          if (site) site.updatedAt = new Date().toISOString();
        }),
      setWebsiteStatus: (restaurantId, status) =>
        mutate((d) => {
          const site = d.websites.find((w) => w.restaurantId === restaurantId);
          if (!site) return;
          site.status = status;
          site.publishedAt = status === "PUBLISHED" ? new Date().toISOString() : site.publishedAt;
          site.updatedAt = new Date().toISOString();
        }),
      updateContentStatus: (itemId, status) =>
        mutate((d) => {
          const item = d.contentItems.find((c) => c.id === itemId);
          if (!item) return;
          item.status = status;
          item.updatedAt = new Date().toISOString();
        }),
    };
  }, [mutate, reset]);

  const value = useMemo<StoreContextValue>(
    () => ({ hydrated: true, snapshot, ...actions }),
    [snapshot, actions],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}

export function useRestaurant(restaurantId: string) {
  const { snapshot } = useAppStore();
  return snapshot.restaurants.find((r) => r.id === restaurantId) ?? null;
}

export function useRestaurantBundle(restaurantId: string) {
  const { snapshot } = useAppStore();
  const restaurant = snapshot.restaurants.find((r) => r.id === restaurantId) ?? null;
  const brandDna =
    snapshot.brandDnas.find((d) => d.restaurantId === restaurantId && d.status !== "SUPERSEDED") ??
    null;
  const assets = snapshot.assets.filter((a) => a.restaurantId === restaurantId);
  const jobs = snapshot.jobs.filter((j) => j.restaurantId === restaurantId);
  const contentItems = snapshot.contentItems.filter((c) => c.restaurantId === restaurantId);
  const website = snapshot.websites.find((w) => w.restaurantId === restaurantId) ?? null;
  const campaigns = snapshot.campaigns.filter((c) => c.restaurantId === restaurantId);
  const starter = restaurant ? packageFor(snapshot, restaurantId) : null;
  return { restaurant, brandDna, assets, jobs, contentItems, website, campaigns, starter };
}

export function getActiveBrandDna(dnas: BrandDNA[], restaurantId: string) {
  return dnas.find((d) => d.restaurantId === restaurantId && d.status !== "SUPERSEDED") ?? null;
}

export function summarizePackage(s: AppSnapshot, restaurantId: string) {
  return packageFor(s, restaurantId);
}

export type { Asset };
