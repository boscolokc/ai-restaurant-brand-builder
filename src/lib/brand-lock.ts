import type {
  AppSnapshot,
  BrandDNA,
  CalendarPayload,
  ContentPayload,
  ContentStatus,
  SocialConceptPayload,
  SocialPayload,
  VideoConceptPayload,
  VideoPayload,
} from "@/lib/types";

/**
 * Brand DNA lock helpers.
 *
 * Review rule (Product Builder + Bosco, 2026-09-21):
 * if content.brandDnaId !== restaurant's current APPROVED BrandDNA.id
 * → status NEEDS_RELOCK.
 *
 * In-place edits to the same DNA row do not change `id`, so they do not
 * trigger this rule. Spawning a new version (old → SUPERSEDED, new → APPROVED)
 * should call `applyBrandDnaRelock`.
 */

export function getApprovedBrandDna(dnas: BrandDNA[], restaurantId: string): BrandDNA | undefined {
  return dnas.find((d) => d.restaurantId === restaurantId && d.status === "APPROVED");
}

export function isBrandDnaStale(
  brandDnaId: string | null | undefined,
  approvedDnaId: string | null | undefined,
): boolean {
  if (!approvedDnaId) return false;
  return brandDnaId !== approvedDnaId;
}

export function contentStatusForBrandLock(
  currentStatus: ContentStatus,
  brandDnaId: string | null | undefined,
  approvedDnaId: string | null | undefined,
): ContentStatus {
  if (currentStatus === "ARCHIVED") return currentStatus;
  if (isBrandDnaStale(brandDnaId, approvedDnaId)) return "NEEDS_RELOCK";
  return currentStatus === "NEEDS_RELOCK" ? "IN_REVIEW" : currentStatus;
}

/** Walk a restaurant's content and stamp NEEDS_RELOCK on DNA drift. */
export function applyBrandDnaRelock(snapshot: AppSnapshot, restaurantId: string) {
  const approved = getApprovedBrandDna(snapshot.brandDnas, restaurantId);
  if (!approved) return;
  for (const item of snapshot.contentItems) {
    if (item.restaurantId !== restaurantId) continue;
    item.status = contentStatusForBrandLock(item.status, item.brandDnaId, approved.id);
  }
}

export function isCalendarPayload(payload: ContentPayload | null | undefined): payload is CalendarPayload {
  return Boolean(payload && typeof payload === "object" && "dayIndex" in payload && "dayOfWeek" in payload);
}

export function isSocialConceptPayload(payload: ContentPayload | null | undefined): payload is SocialConceptPayload {
  return Boolean(payload && typeof payload === "object" && "postId" in payload && "captionZh" in payload);
}

export function isSocialPayload(payload: ContentPayload | null | undefined): payload is SocialPayload {
  return Boolean(
    payload &&
      typeof payload === "object" &&
      "overlay" in payload &&
      "caption" in payload &&
      !("postId" in payload) &&
      !("dayIndex" in payload),
  );
}

export function isVideoConceptPayload(payload: ContentPayload | null | undefined): payload is VideoConceptPayload {
  return Boolean(payload && typeof payload === "object" && "videoId" in payload && "scriptBeats" in payload);
}

export function isVideoPayload(payload: ContentPayload | null | undefined): payload is VideoPayload {
  return Boolean(
    payload && typeof payload === "object" && "frames" in payload && Array.isArray(payload.frames) && !("videoId" in payload),
  );
}

export function contentStatusTone(status: ContentStatus): "green" | "accent" | "gold" | "muted" {
  if (status === "APPROVED" || status === "PUBLISHED") return "green";
  if (status === "NEEDS_RELOCK") return "accent";
  if (status === "SCHEDULED" || status === "IN_REVIEW") return "gold";
  return "muted";
}

export function contentStatusLabel(status: ContentStatus) {
  return status.replaceAll("_", " ");
}
