export type MembershipRole = "OWNER" | "ADMIN" | "MEMBER";

export type OnboardingStep =
  | "BASICS"
  | "ASSETS"
  | "BUSINESS"
  | "ANALYZING"
  | "BRAND_DNA"
  | "GENERATING"
  | "DONE";

export type BrandDnaStatus = "DRAFT" | "PENDING_REVIEW" | "APPROVED" | "SUPERSEDED";

export type AssetKind = "FOOD_PHOTO" | "INTERIOR" | "EXTERIOR" | "LOGO" | "MENU" | "OTHER";

export type AssetSource = "UPLOAD" | "GENERATED" | "IMPORTED";

export type CreativeJobType =
  | "IMAGE_ANALYSIS"
  | "BRAND_DNA"
  | "STARTER_PACKAGE"
  | "SOCIAL_CONCEPTS"
  | "VIDEO_CONCEPTS"
  | "WEBSITE"
  | "CALENDAR"
  | "SINGLE_CREATIVE";

export type CreativeJobStatus = "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";

export type ContentKind =
  | "SOCIAL_IMAGE"
  | "SOCIAL_CAROUSEL"
  | "VIDEO_STORYBOARD"
  | "MENU_ASSET"
  | "GOOGLE_BUSINESS"
  | "CAPTION"
  | "OTHER";

export type ContentStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "APPROVED"
  | "SCHEDULED"
  | "PUBLISHED"
  | "NEEDS_RELOCK"
  | "ARCHIVED";

export type WebsiteStatus = "DRAFT" | "READY" | "PUBLISHED";

export type CampaignStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "DONE";

export type BrandColours = {
  primary: string;
  secondary: string;
  accent: string;
  neutrals: string[];
};

export type BrandTypography = {
  heading: string;
  body: string;
  notes?: string;
};

export type AssetAnalysis = {
  dishes?: string[];
  vibe?: string;
  colours?: string[];
};

export type WebsiteSection = {
  id: string;
  type: string;
  title: string;
  body: string;
  enabled: boolean;
};

export type WebsiteTheme = {
  primary: string;
  secondary: string;
  background: string;
  headingFont: string;
  bodyFont: string;
};

export type SocialPayload = {
  format: "1:1" | "4:5" | "9:16";
  overlay: string;
  caption: string;
  hashtags: string[];
};

export type VideoFrame = {
  id: string;
  order: number;
  durationSec: number;
  shot: string;
  audio: string;
  onScreenText: string;
};

export type VideoPayload = {
  durationSec: number;
  aspect: "9:16" | "1:1" | "16:9";
  frames: VideoFrame[];
};

/** 30-day calendar details stored on ContentItem.payload (Marketing Lead contract). */
export type CalendarPayload = {
  dayIndex: number;
  dayOfWeek: string;
  isClosedDay: boolean;
  format: "photo" | "carousel" | "reel" | "stories" | "poll" | "static";
  pillar:
    | "product_soup"
    | "product_fried"
    | "process"
    | "interactive"
    | "people"
    | "place_icc"
    | "panda"
    | "soft_closed"
    | string;
  hookCaptionEn?: string;
  creativeNote?: string;
  cta?: string;
  hashtags?: string[];
  campaignTheme?: string;
};

export type ContentPayload = Record<string, unknown> | SocialPayload | VideoPayload | CalendarPayload;

export type Account = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Restaurant = {
  id: string;
  accountId: string;
  name: string;
  slug: string;
  cuisine: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  websiteUrl: string | null;
  description: string | null;
  onboardingStep: OnboardingStep;
  onboardingDone: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BrandDNA = {
  id: string;
  restaurantId: string;
  status: BrandDnaStatus;
  version: number;
  positioning: string | null;
  audience: string | null;
  personality: string | null;
  voice: string | null;
  tagline: string | null;
  colours: BrandColours | null;
  typography: BrandTypography | null;
  photographyDirection: string | null;
  videoDirection: string | null;
  graphicStyle: string | null;
  ctaStyle: string | null;
  rawAnalysis: Record<string, unknown> | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Asset = {
  id: string;
  restaurantId: string;
  kind: AssetKind;
  source: AssetSource;
  title: string | null;
  storageKey: string;
  mimeType: string | null;
  byteSize: number | null;
  width: number | null;
  height: number | null;
  analysis: AssetAnalysis | null;
  createdAt: string;
  updatedAt: string;
};

export type CreativeJob = {
  id: string;
  restaurantId: string;
  brandDnaId: string | null;
  type: CreativeJobType;
  status: CreativeJobStatus;
  progress: number;
  input: Record<string, unknown> | null;
  output: Record<string, unknown> | null;
  error: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContentItem = {
  id: string;
  restaurantId: string;
  brandDnaId: string | null;
  jobId: string | null;
  kind: ContentKind;
  status: ContentStatus;
  title: string;
  body: string | null;
  platform: string | null;
  conceptIndex: number | null;
  scheduledFor: string | null;
  payload: ContentPayload | null;
  thumbnailKey: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Website = {
  id: string;
  restaurantId: string;
  status: WebsiteStatus;
  theme: WebsiteTheme | null;
  sections: WebsiteSection[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Campaign = {
  id: string;
  restaurantId: string;
  name: string;
  status: CampaignStatus;
  startDate: string | null;
  endDate: string | null;
  brief: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StarterPackage = {
  brandKitReady: boolean;
  websiteReady: boolean;
  socialKitReady: boolean;
  socialCreatives: number;
  videoConcepts: number;
  menuAssets: number;
  googleBusiness: boolean;
  calendarDays: number;
  assetCount: number;
};

export type AppSnapshot = {
  account: Account;
  user: User;
  restaurants: Restaurant[];
  brandDnas: BrandDNA[];
  assets: Asset[];
  jobs: CreativeJob[];
  contentItems: ContentItem[];
  websites: Website[];
  campaigns: Campaign[];
};
