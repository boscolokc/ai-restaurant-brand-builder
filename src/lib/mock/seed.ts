import type {
  AppSnapshot,
  Asset,
  BrandDNA,
  ContentItem,
  CreativeJob,
  Restaurant,
  VideoPayload,
  Website,
} from "@/lib/types";
import { addDays } from "@/lib/utils";

const now = "2026-09-14T16:00:00.000Z";
const accountId = "acct_demo";
const userId = "user_demo";
export const HARBOR_ID = "harbor-table";
export const LIME_ID = "little-lime";

const harbor: Restaurant = {
  id: HARBOR_ID,
  accountId,
  name: "Harbor Table",
  slug: "harbor-table",
  cuisine: "Pacific coastal",
  city: "Portland",
  country: "US",
  phone: "(503) 555-0148",
  websiteUrl: "https://harbortable.example",
  description:
    "A 42-seat neighborhood kitchen on the east bank, cooking whatever the boats and farms bring in.",
  onboardingStep: "DONE",
  onboardingDone: true,
  createdAt: "2026-08-02T12:00:00.000Z",
  updatedAt: now,
};

const lime: Restaurant = {
  id: LIME_ID,
  accountId,
  name: "Little Lime",
  slug: "little-lime",
  cuisine: "Vietnamese cafe",
  city: "Austin",
  country: "US",
  phone: "(512) 555-0192",
  websiteUrl: null,
  description: "Daytime bowls, iced coffee, and a quiet patio off South Congress.",
  onboardingStep: "BRAND_DNA",
  onboardingDone: false,
  createdAt: "2026-09-10T12:00:00.000Z",
  updatedAt: now,
};

const harborDna: BrandDNA = {
  id: "dna_harbor_v1",
  restaurantId: HARBOR_ID,
  status: "APPROVED",
  version: 1,
  positioning:
    "A harbor-side neighborhood kitchen where seasonal Pacific plates meet unhurried evenings.",
  audience:
    "Couples and nearby locals in Portland who want a special weeknight without downtown noise.",
  personality: "Warm, confident, a little salty — like a well-traveled host.",
  voice: "Short, sensory sentences. No hype. Speak like a handwritten chalkboard.",
  tagline: "Come in from the weather.",
  colours: {
    primary: "#1f4e5a",
    secondary: "#c4a574",
    accent: "#d45d32",
    neutrals: ["#f4efe6", "#e7dccb", "#2a2420"],
  },
  typography: {
    heading: "Fraunces",
    body: "Outfit",
    notes: "Headlines in sentence case. Never all-caps except the word MENU.",
  },
  photographyDirection:
    "Natural window light, hands in frame, steam and linen. Avoid overhead flat-lays and stock smiles.",
  videoDirection:
    "Slow pushes across the pass, 4-second food hero shots, rain on the windows. No jump cuts on plates.",
  graphicStyle: "Letterpress-inspired frames, generous margins, one thin accent rule.",
  ctaStyle: "Reserve a table / See tonight’s board — never “Shop now”.",
  rawAnalysis: {
    dominantColours: ["#1f4e5a", "#c4a574", "#d45d32"],
    dishes: ["steelhead", "sourdough", "oysters"],
  },
  approvedAt: "2026-08-04T18:20:00.000Z",
  createdAt: "2026-08-03T10:00:00.000Z",
  updatedAt: "2026-08-04T18:20:00.000Z",
};

const limeDna: BrandDNA = {
  id: "dna_lime_v1",
  restaurantId: LIME_ID,
  status: "PENDING_REVIEW",
  version: 1,
  positioning:
    "A bright Vietnamese daytime cafe for people who want real flavor without a loud night out.",
  audience: "Neighbors, remote workers, and friends meeting between 8am and 3pm.",
  personality: "Gentle, precise, citrus-sharp. Never cute.",
  voice: "Plain words, short lines. Let the herbs do the talking.",
  tagline: "Bright bowls. Quiet heat.",
  colours: {
    primary: "#2f4a32",
    secondary: "#c6d46a",
    accent: "#e4572e",
    neutrals: ["#f7f4ec", "#d9d2c3", "#1c1c1a"],
  },
  typography: {
    heading: "Fraunces",
    body: "Outfit",
    notes: "Use diacritics correctly on Vietnamese dish names.",
  },
  photographyDirection: "Daylight, herbs in the foreground, condensation on glasses, tiled counters.",
  videoDirection: "Hands tearing herbs, coffee drip, patio light. Keep shots under 3 seconds.",
  graphicStyle: "Soft grids, lime-leaf motifs used sparingly, lots of rice-white space.",
  ctaStyle: "See today’s bowls / Grab a table — never “Order now” on the patio.",
  rawAnalysis: { dishes: ["phở gà", "cà phê sữa đá", "gỏi cuốn"] },
  approvedAt: null,
  createdAt: "2026-09-12T15:00:00.000Z",
  updatedAt: now,
};

function asset(
  id: string,
  restaurantId: string,
  kind: Asset["kind"],
  title: string,
  source: Asset["source"] = "UPLOAD",
  extra?: Partial<Asset>,
): Asset {
  return {
    id,
    restaurantId,
    kind,
    source,
    title,
    storageKey: `${restaurantId}/${id}`,
    mimeType: "image/jpeg",
    byteSize: 1_200_000,
    width: 1600,
    height: 2000,
    analysis: extra?.analysis ?? null,
    createdAt: now,
    updatedAt: now,
    ...extra,
  };
}

const harborAssets: Asset[] = [
  asset("a_ht_logo", HARBOR_ID, "LOGO", "Wordmark on cream", "GENERATED", {
    analysis: { vibe: "letterpress" },
  }),
  asset("a_ht_steelhead", HARBOR_ID, "FOOD_PHOTO", "Steelhead, brown butter", "UPLOAD", {
    analysis: { dishes: ["steelhead"], vibe: "warm evening", colours: ["#d45d32", "#1f4e5a"] },
  }),
  asset("a_ht_oysters", HARBOR_ID, "FOOD_PHOTO", "Oysters, mignonette"),
  asset("a_ht_bread", HARBOR_ID, "FOOD_PHOTO", "Sourdough and cultured butter"),
  asset("a_ht_pasta", HARBOR_ID, "FOOD_PHOTO", "Hand-cut pasta, crab"),
  asset("a_ht_cake", HARBOR_ID, "FOOD_PHOTO", "Olive oil cake"),
  asset("a_ht_salad", HARBOR_ID, "FOOD_PHOTO", "Chicories, citrus"),
  asset("a_ht_wine", HARBOR_ID, "FOOD_PHOTO", "Wine pour at table"),
  asset("a_ht_pass", HARBOR_ID, "INTERIOR", "The pass at service"),
  asset("a_ht_booth", HARBOR_ID, "INTERIOR", "Window booth, linen"),
  asset("a_ht_bar", HARBOR_ID, "INTERIOR", "Bar stools, rain"),
  asset("a_ht_storefront", HARBOR_ID, "EXTERIOR", "Storefront at blue hour"),
  asset("a_ht_awning", HARBOR_ID, "EXTERIOR", "Awning and chalkboard"),
  asset("a_ht_menu", HARBOR_ID, "MENU", "Printed dinner menu"),
  asset("a_ht_wine_list", HARBOR_ID, "MENU", "Wine list snapshot"),
  asset("a_ht_kit_mark", HARBOR_ID, "OTHER", "Brand mark lockup", "GENERATED"),
  asset("a_ht_pattern", HARBOR_ID, "OTHER", "Wave rule pattern", "GENERATED"),
  asset("a_ht_ig_cover", HARBOR_ID, "OTHER", "Social kit cover", "GENERATED"),
  asset("a_ht_gbp", HARBOR_ID, "OTHER", "Google cover crop", "GENERATED"),
  asset("a_ht_hero", HARBOR_ID, "FOOD_PHOTO", "Hero plate for site", "GENERATED"),
];

const limeAssets: Asset[] = [
  asset("a_ll_pho", LIME_ID, "FOOD_PHOTO", "Phở gà, morning light"),
  asset("a_ll_coffee", LIME_ID, "FOOD_PHOTO", "Cà phê sữa đá"),
  asset("a_ll_rolls", LIME_ID, "FOOD_PHOTO", "Gỏi cuốn"),
  asset("a_ll_patio", LIME_ID, "EXTERIOR", "Patio, South Congress"),
  asset("a_ll_counter", LIME_ID, "INTERIOR", "Tile counter"),
];

const socialConcepts: { title: string; caption: string; overlay: string; platform: string }[] = [
  {
    title: "Tonight’s board",
    caption: "Steelhead came in this morning. Come in from the weather.",
    overlay: "Tonight",
    platform: "ig",
  },
  {
    title: "Rain on the windows",
    caption: "Booth by the glass. Two hours. No rush.",
    overlay: "Stay awhile",
    platform: "ig",
  },
  {
    title: "Hands, bread, butter",
    caption: "We bake once. When it’s gone, it’s gone.",
    overlay: "Sourdough",
    platform: "ig",
  },
  {
    title: "Harbor at blue hour",
    caption: "Lights on at 5. Kitchen until 10.",
    overlay: "Blue hour",
    platform: "ig",
  },
  {
    title: "Staff meal",
    caption: "What we eat before you do.",
    overlay: "Family",
    platform: "ig",
  },
  {
    title: "Seasonal hero",
    caption: "Crab, chili, and the last of the good tomatoes.",
    overlay: "In season",
    platform: "ig",
  },
  {
    title: "Wine pour",
    caption: "Ask for whatever we’re drinking behind the bar.",
    overlay: "By the glass",
    platform: "fb",
  },
  {
    title: "Table reminder",
    caption: "Friday is already spoken for. Saturday still has two.",
    overlay: "Reserve",
    platform: "ig",
  },
  {
    title: "Weekend brunch tease",
    caption: "Sundays: eggs, greens, and a slow pot of coffee.",
    overlay: "Sunday",
    platform: "ig",
  },
  {
    title: "Ingredient still life",
    caption: "From the boats before the market opened.",
    overlay: "This morning",
    platform: "ig",
  },
  {
    title: "A toast",
    caption: "We saved you the corner.",
    overlay: "For two",
    platform: "ig",
  },
  {
    title: "Hours, plainly",
    caption: "Tue–Sat, 5–10. Closed Monday. Kitchen pauses at 9:45.",
    overlay: "Hours",
    platform: "fb",
  },
];

function videoPayload(frames: VideoPayload["frames"], durationSec: number): VideoPayload {
  return { durationSec, aspect: "9:16", frames };
}

const videos: { id: string; title: string; body: string; payload: VideoPayload }[] = [
  {
    id: "ci_ht_v1",
    title: "Open the door",
    body: "8-second welcome. Awning, handle, first step into warmth.",
    payload: videoPayload(
      [
        {
          id: "f1",
          order: 1,
          durationSec: 2,
          shot: "Exterior, rain, neon-warm awning.",
          audio: "Soft rain, distant street.",
          onScreenText: "",
        },
        {
          id: "f2",
          order: 2,
          durationSec: 3,
          shot: "Hand on the brass handle, cut to booth linen.",
          audio: "Door bell, low jazz.",
          onScreenText: "Harbor Table",
        },
        {
          id: "f3",
          order: 3,
          durationSec: 3,
          shot: "Plate landing. Steam. Sit.",
          audio: "Fork on ceramic.",
          onScreenText: "Come in from the weather.",
        },
      ],
      8,
    ),
  },
  {
    id: "ci_ht_v2",
    title: "The pass",
    body: "15-second service rhythm. No faces in focus — just hands and heat.",
    payload: videoPayload(
      [
        {
          id: "f1",
          order: 1,
          durationSec: 4,
          shot: "Slow push down the pass.",
          audio: "Ticket printer.",
          onScreenText: "",
        },
        {
          id: "f2",
          order: 2,
          durationSec: 5,
          shot: "Sauce spooned, herbs dropped.",
          audio: "Sauté hiss.",
          onScreenText: "Tonight’s board",
        },
        {
          id: "f3",
          order: 3,
          durationSec: 6,
          shot: "Plate walks to a window table.",
          audio: "Room tone, quiet talk.",
          onScreenText: "Reserve a table",
        },
      ],
      15,
    ),
  },
  {
    id: "ci_ht_v3",
    title: "Table for two",
    body: "20-second date-night story. Two glasses, one candle, rain still going.",
    payload: videoPayload(
      [
        {
          id: "f1",
          order: 1,
          durationSec: 5,
          shot: "Empty table set, then two people sit (hands only).",
          audio: "Chair scrape, match strike.",
          onScreenText: "",
        },
        {
          id: "f2",
          order: 2,
          durationSec: 8,
          shot: "Shared pasta, pour of wine.",
          audio: "Low conversation, unintelligible.",
          onScreenText: "Stay for the weather",
        },
        {
          id: "f3",
          order: 3,
          durationSec: 7,
          shot: "Window condensation, city lights.",
          audio: "Rain swell.",
          onScreenText: "Harbor Table · Portland",
        },
      ],
      20,
    ),
  },
  {
    id: "ci_ht_v4",
    title: "Come in from the weather",
    body: "12-second brand film. Tagline last. No offer, no booking URL on screen.",
    payload: videoPayload(
      [
        {
          id: "f1",
          order: 1,
          durationSec: 4,
          shot: "Umbrella close, then coat on a hook.",
          audio: "Rain, then hush.",
          onScreenText: "",
        },
        {
          id: "f2",
          order: 2,
          durationSec: 4,
          shot: "Candle, bread torn.",
          audio: "Soft piano.",
          onScreenText: "",
        },
        {
          id: "f3",
          order: 3,
          durationSec: 4,
          shot: "Wide dining room, lights low.",
          audio: "Hold piano.",
          onScreenText: "Come in from the weather.",
        },
      ],
      12,
    ),
  },
];

const jobStarter: CreativeJob = {
  id: "job_ht_starter",
  restaurantId: HARBOR_ID,
  type: "STARTER_PACKAGE",
  status: "SUCCEEDED",
  progress: 100,
  input: { brandDnaId: harborDna.id },
  output: { package: "complete" },
  error: null,
  startedAt: "2026-08-04T18:21:00.000Z",
  finishedAt: "2026-08-04T18:24:00.000Z",
  createdAt: "2026-08-04T18:21:00.000Z",
  updatedAt: "2026-08-04T18:24:00.000Z",
};

const jobSocial: CreativeJob = {
  id: "job_ht_social",
  restaurantId: HARBOR_ID,
  type: "SOCIAL_CONCEPTS",
  status: "SUCCEEDED",
  progress: 100,
  input: { count: 12 },
  output: { concepts: 12 },
  error: null,
  startedAt: "2026-08-04T18:24:00.000Z",
  finishedAt: "2026-08-04T18:25:00.000Z",
  createdAt: "2026-08-04T18:24:00.000Z",
  updatedAt: "2026-08-04T18:25:00.000Z",
};

const jobVideo: CreativeJob = {
  id: "job_ht_video",
  restaurantId: HARBOR_ID,
  type: "VIDEO_CONCEPTS",
  status: "SUCCEEDED",
  progress: 100,
  input: { count: 4 },
  output: { concepts: 4 },
  error: null,
  startedAt: "2026-08-04T18:25:00.000Z",
  finishedAt: "2026-08-04T18:26:00.000Z",
  createdAt: "2026-08-04T18:25:00.000Z",
  updatedAt: "2026-08-04T18:26:00.000Z",
};

const socialItems: ContentItem[] = socialConcepts.map((c, i) => ({
  id: `ci_ht_s${i + 1}`,
  restaurantId: HARBOR_ID,
  jobId: jobSocial.id,
  kind: "SOCIAL_IMAGE",
  status: i < 8 ? "APPROVED" : "IN_REVIEW",
  title: c.title,
  body: c.caption,
  platform: c.platform,
  conceptIndex: i + 1,
  scheduledFor: addDays("2026-09-21T17:00:00.000Z", i * 2),
  payload: {
    format: i % 3 === 0 ? "9:16" : "4:5",
    overlay: c.overlay,
    caption: c.caption,
    hashtags: ["#harbortable", "#pdxeats", "#comeinfromtheweather"],
  },
  thumbnailKey: harborAssets[i % harborAssets.length].id,
  createdAt: now,
  updatedAt: now,
}));

const videoItems: ContentItem[] = videos.map((v, i) => ({
  id: v.id,
  restaurantId: HARBOR_ID,
  jobId: jobVideo.id,
  kind: "VIDEO_STORYBOARD",
  status: i === 0 ? "APPROVED" : "IN_REVIEW",
  title: v.title,
  body: v.body,
  platform: "tiktok",
  conceptIndex: i + 1,
  scheduledFor: addDays("2026-09-23T18:00:00.000Z", i * 7),
  payload: v.payload,
  thumbnailKey: "a_ht_storefront",
  createdAt: now,
  updatedAt: now,
}));

const menuItems: ContentItem[] = [
  {
    id: "ci_ht_menu_1",
    restaurantId: HARBOR_ID,
    jobId: jobStarter.id,
    kind: "MENU_ASSET",
    status: "APPROVED",
    title: "Dinner menu — print",
    body: "Letterpress-style one-pager. Seasonal board on the reverse.",
    platform: null,
    conceptIndex: null,
    scheduledFor: null,
    payload: { size: "8.5x11", pages: 2 },
    thumbnailKey: "a_ht_menu",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ci_ht_menu_2",
    restaurantId: HARBOR_ID,
    jobId: jobStarter.id,
    kind: "MENU_ASSET",
    status: "APPROVED",
    title: "Wine list — digital",
    body: "Mobile-friendly list with by-the-glass first.",
    platform: null,
    conceptIndex: null,
    scheduledFor: null,
    payload: { size: "mobile" },
    thumbnailKey: "a_ht_wine_list",
    createdAt: now,
    updatedAt: now,
  },
];

const gbpItem: ContentItem = {
  id: "ci_ht_gbp",
  restaurantId: HARBOR_ID,
  jobId: jobStarter.id,
  kind: "GOOGLE_BUSINESS",
  status: "APPROVED",
  title: "Google Business profile copy",
  body: "Harbor Table is a 42-seat coastal kitchen on Portland’s east bank. We cook what the boats and nearby farms send in, and we keep the lights low enough to talk. Come in from the weather.",
  platform: "google",
  conceptIndex: null,
  scheduledFor: null,
  payload: {
    shortDescription: "Pacific plates, unhurried evenings, east bank Portland.",
    hours: "Tue–Sat 5:00–10:00 PM",
    attributes: ["Reservations recommended", "Full bar", "Wheelchair accessible"],
  },
  thumbnailKey: "a_ht_gbp",
  createdAt: now,
  updatedAt: now,
};

const extraCalendar: ContentItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `ci_ht_cal_${i + 13}`,
  restaurantId: HARBOR_ID,
  jobId: jobStarter.id,
  kind: "CAPTION" as const,
  status: "SCHEDULED" as const,
  title: ["Market haul", "Chef note", "Closed Monday", "Oyster hour", "Ask for the off-menu"][i % 5],
  body: "A short caption from the 30-day plan.",
  platform: "ig",
  conceptIndex: null,
  scheduledFor: addDays("2026-09-22T16:00:00.000Z", i * 3 + 1),
  payload: { fromPlan: true },
  thumbnailKey: null,
  createdAt: now,
  updatedAt: now,
}));

const harborWebsite: Website = {
  id: "web_harbor",
  restaurantId: HARBOR_ID,
  status: "READY",
  theme: {
    primary: "#1f4e5a",
    secondary: "#c4a574",
    background: "#f4efe6",
    headingFont: "Fraunces",
    bodyFont: "Outfit",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      title: "Come in from the weather.",
      body: "Pacific plates · east bank · Tuesday through Saturday.",
      enabled: true,
    },
    {
      id: "board",
      type: "menu",
      title: "Tonight’s board",
      body: "Steelhead, brown butter · Oysters · Hand-cut pasta, crab · Olive oil cake",
      enabled: true,
    },
    {
      id: "story",
      type: "story",
      title: "A neighborhood kitchen",
      body: "Forty-two seats, a small bar, and a pass that faces the room. We cook what came in that morning.",
      enabled: true,
    },
    {
      id: "gallery",
      type: "gallery",
      title: "From the pass",
      body: "Hands, linen, rain on the glass.",
      enabled: true,
    },
    {
      id: "reserve",
      type: "cta",
      title: "Reserve a table",
      body: "We hold a few walk-ins at the bar after 8.",
      enabled: true,
    },
    {
      id: "hours",
      type: "hours",
      title: "Hours & place",
      body: "Tue–Sat 5–10. 148 NE Harbor Ave, Portland.",
      enabled: true,
    },
    {
      id: "footer",
      type: "footer",
      title: "Harbor Table",
      body: "© Harbor Table · (503) 555-0148",
      enabled: true,
    },
  ],
  publishedAt: null,
  createdAt: "2026-08-04T18:24:00.000Z",
  updatedAt: now,
};

export function buildLimeStarterPackage(nowIso = new Date().toISOString()): {
  contentItems: ContentItem[];
  website: Website;
  assets: Asset[];
  jobs: CreativeJob[];
} {
  const jobId = "job_ll_starter";
  const socialJob = "job_ll_social";
  const videoJob = "job_ll_video";
  const jobs: CreativeJob[] = [
    {
      id: jobId,
      restaurantId: LIME_ID,
      type: "STARTER_PACKAGE",
      status: "SUCCEEDED",
      progress: 100,
      input: { brandDnaId: limeDna.id },
      output: { package: "complete" },
      error: null,
      startedAt: nowIso,
      finishedAt: nowIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: socialJob,
      restaurantId: LIME_ID,
      type: "SOCIAL_CONCEPTS",
      status: "SUCCEEDED",
      progress: 100,
      input: { count: 12 },
      output: { concepts: 12 },
      error: null,
      startedAt: nowIso,
      finishedAt: nowIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: videoJob,
      restaurantId: LIME_ID,
      type: "VIDEO_CONCEPTS",
      status: "SUCCEEDED",
      progress: 100,
      input: { count: 4 },
      output: { concepts: 4 },
      error: null,
      startedAt: nowIso,
      finishedAt: nowIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
  ];

  const limeSocial = [
    "Morning phở",
    "Iced coffee drip",
    "Herb still life",
    "Patio light",
    "Gỏi cuốn close",
    "Quiet heat",
    "Weekday lunch",
    "Rice-white table",
    "Today’s bowls",
    "Lime leaf",
    "Take a seat",
    "Hours, plainly",
  ];

  const contentItems: ContentItem[] = [
    ...limeSocial.map((title, i) => ({
      id: `ci_ll_s${i + 1}`,
      restaurantId: LIME_ID,
      jobId: socialJob,
      kind: "SOCIAL_IMAGE" as const,
      status: (i < 6 ? "APPROVED" : "IN_REVIEW") as ContentItem["status"],
      title,
      body: `${title}. Bright bowls. Quiet heat.`,
      platform: "ig",
      conceptIndex: i + 1,
      scheduledFor: addDays(nowIso, i + 1),
      payload: {
        format: "4:5" as const,
        overlay: title,
        caption: `${title}. Bright bowls. Quiet heat.`,
        hashtags: ["#littlelime", "#atxeats"],
      },
      thumbnailKey: limeAssets[i % limeAssets.length].id,
      createdAt: nowIso,
      updatedAt: nowIso,
    })),
    ...["Herb hands", "Coffee drip", "Patio open", "Bright bowls"].map((title, i) => ({
      id: `ci_ll_v${i + 1}`,
      restaurantId: LIME_ID,
      jobId: videoJob,
      kind: "VIDEO_STORYBOARD" as const,
      status: "IN_REVIEW" as const,
      title,
      body: `A ${8 + i * 4}-second storyboard for ${title.toLowerCase()}.`,
      platform: "tiktok",
      conceptIndex: i + 1,
      scheduledFor: addDays(nowIso, 3 + i * 5),
      payload: videoPayload(
        [
          {
            id: "f1",
            order: 1,
            durationSec: 3,
            shot: "Daylight detail.",
            audio: "Cafe murmur.",
            onScreenText: "",
          },
          {
            id: "f2",
            order: 2,
            durationSec: 3,
            shot: "Hero food.",
            audio: "Spoon, ice.",
            onScreenText: title,
          },
          {
            id: "f3",
            order: 3,
            durationSec: 3,
            shot: "Patio wide.",
            audio: "Hold.",
            onScreenText: "Bright bowls. Quiet heat.",
          },
        ],
        9,
      ),
      thumbnailKey: "a_ll_pho",
      createdAt: nowIso,
      updatedAt: nowIso,
    })),
    {
      id: "ci_ll_menu",
      restaurantId: LIME_ID,
      jobId,
      kind: "MENU_ASSET",
      status: "APPROVED",
      title: "Daytime bowl menu",
      body: "One-pager, herbs illustrated as a thin rule.",
      platform: null,
      conceptIndex: null,
      scheduledFor: null,
      payload: { size: "letter" },
      thumbnailKey: "a_ll_rolls",
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: "ci_ll_gbp",
      restaurantId: LIME_ID,
      jobId,
      kind: "GOOGLE_BUSINESS",
      status: "APPROVED",
      title: "Google Business profile copy",
      body: "Little Lime is a daytime Vietnamese cafe on South Congress. Bowls, iced coffee, and a quiet patio. Bright bowls. Quiet heat.",
      platform: "google",
      conceptIndex: null,
      scheduledFor: null,
      payload: { hours: "Daily 8:00 AM–3:00 PM" },
      thumbnailKey: "a_ll_patio",
      createdAt: nowIso,
      updatedAt: nowIso,
    },
  ];

  const website: Website = {
    id: "web_lime",
    restaurantId: LIME_ID,
    status: "READY",
    theme: {
      primary: "#2f4a32",
      secondary: "#c6d46a",
      background: "#f7f4ec",
      headingFont: "Fraunces",
      bodyFont: "Outfit",
    },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Bright bowls. Quiet heat.",
        body: "Vietnamese daytime cafe · South Congress · 8am–3pm",
        enabled: true,
      },
      {
        id: "bowls",
        type: "menu",
        title: "Today’s bowls",
        body: "Phở gà · Gỏi cuốn · Broken rice · Iced coffee",
        enabled: true,
      },
      {
        id: "story",
        type: "story",
        title: "A small, precise kitchen",
        body: "We cook for the hours when the light is good and nobody needs a scene.",
        enabled: true,
      },
      {
        id: "hours",
        type: "hours",
        title: "Hours & patio",
        body: "Daily 8–3. Patio until the sun moves off the tiles.",
        enabled: true,
      },
      {
        id: "footer",
        type: "footer",
        title: "Little Lime",
        body: "Austin · (512) 555-0192",
        enabled: true,
      },
    ],
    publishedAt: null,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const generated: Asset[] = [
    asset("a_ll_logo", LIME_ID, "LOGO", "Little Lime wordmark", "GENERATED"),
    asset("a_ll_kit", LIME_ID, "OTHER", "Brand kit cover", "GENERATED"),
    asset("a_ll_social", LIME_ID, "OTHER", "Social kit cover", "GENERATED"),
  ];

  return { contentItems, website, assets: generated, jobs };
}

export function createSeedSnapshot(): AppSnapshot {
  return {
    account: {
      id: accountId,
      name: "Eastbank Hospitality",
      createdAt: "2026-08-01T12:00:00.000Z",
      updatedAt: now,
    },
    user: {
      id: userId,
      email: "demo@hearth.app",
      name: "Alex Nguyen",
      createdAt: "2026-08-01T12:00:00.000Z",
      updatedAt: now,
    },
    restaurants: [harbor, lime],
    brandDnas: [harborDna, limeDna],
    assets: [...harborAssets, ...limeAssets],
    jobs: [jobStarter, jobSocial, jobVideo],
    contentItems: [...socialItems, ...videoItems, ...menuItems, gbpItem, ...extraCalendar],
    websites: [harborWebsite],
    campaigns: [
      {
        id: "cmp_ht_fall",
        restaurantId: HARBOR_ID,
        name: "Fall evenings",
        status: "DRAFT",
        startDate: "2026-10-01T00:00:00.000Z",
        endDate: "2026-10-31T00:00:00.000Z",
        brief: "Coming soon — campaign planner is stubbed for Phase 1.",
        createdAt: now,
        updatedAt: now,
      },
    ],
  };
}

export const DEMO_EMAIL = "demo@hearth.app";
export const DEMO_PASSWORD = "demo";
