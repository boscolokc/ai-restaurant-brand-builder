import type {
  Asset,
  BrandDNA,
  CalendarPayload,
  Campaign,
  ContentItem,
  ContentKind,
  ContentStatus,
  CreativeJob,
  Restaurant,
  Website,
} from "@/lib/types";

export const MEET_U_ID = "meet-u-1-face";
export const MEET_U_DNA_V1 = "dna_meetu_v1";
export const MEET_U_DNA_V2 = "dna_meetu_v2";

const now = "2026-09-21T08:00:00.000Z";
const accountId = "acct_demo";

const HASHTAGS = [
  "#见您一面",
  "#MeetU1Face",
  "#ICCPUDU",
  "#吉隆坡美食",
  "#手工饺子",
  "#上汤水饺",
  "#香煎饺子",
  "#好好见面",
];

/** 6:30 AM MYT (UTC+8) on the calendar date. */
function mytBreakfast(isoDate: string) {
  return new Date(`${isoDate}T06:30:00+08:00`).toISOString();
}

export const meetU: Restaurant = {
  id: MEET_U_ID,
  accountId,
  name: "见您一面 / Meet U 1 Face Noodle",
  slug: "meet-u-1-face",
  cuisine: "Handmade dumplings",
  city: "Kuala Lumpur",
  country: "MY",
  phone: null,
  websiteUrl: null,
  description:
    "G-52 ICC Pudu dumpling stall (饺子哥). 上汤水饺 + 香煎饺子, 现包现煮. Open Tue–Sun 6:30 AM–2:00 PM, closed Monday.",
  onboardingStep: "DONE",
  onboardingDone: true,
  createdAt: "2026-09-18T02:00:00.000Z",
  updatedAt: now,
};

const colours = {
  primary: "#E31C23",
  secondary: "#F5F0E8",
  accent: "#D4A017",
  neutrals: ["#FFFFFF", "#0D0D0D", "#1A1A1A"],
};

const typography = {
  heading: "Noto Sans SC",
  body: "Inter",
  notes: "Bold CN for mall distance. No thin type on red. Gold type only on black or deep red.",
};

export const meetUDnaSuperseded: BrandDNA = {
  id: MEET_U_DNA_V1,
  restaurantId: MEET_U_ID,
  status: "SUPERSEDED",
  version: 1,
  positioning: "A Pudu dumpling stall with a panda and two plates.",
  audience: "ICC Pudu breakfast crowd.",
  personality: "Cute, still finding its voice.",
  voice: "Short lines. Mix CN/EN.",
  tagline: "见您一面，吃一口好饺子。",
  colours,
  typography,
  photographyDirection: "Food first, panda as connector.",
  videoDirection: "Pour, bite, steam. Vertical.",
  graphicStyle: "Red + cream Mode A.",
  ctaStyle: "Come meet us at G-52.",
  rawAnalysis: { version: 1, note: "Pre-lock draft" },
  approvedAt: "2026-09-19T04:00:00.000Z",
  createdAt: "2026-09-18T04:00:00.000Z",
  updatedAt: "2026-09-20T04:00:00.000Z",
};

export const meetUDna: BrandDNA = {
  id: MEET_U_DNA_V2,
  restaurantId: MEET_U_ID,
  status: "APPROVED",
  version: 2,
  positioning:
    "KL food-court dumpling stall for breakfast through lunch: appetite-first, simple comfort, approachable cute (panda) with street-prestige energy (饺子哥). Not fine dining — a neighbourhood counter people remember by the panda and a filling bowl before 2PM.",
  audience:
    "ICC Pudu office workers, local breakfast/lunch diners, dumpling families, mall tourists, and young guests who shoot food. Weekday breakfast–lunch only — never promise Monday or late night.",
  personality: "亲切温暖 · 真诚朴实 · 轻松有趣 · 年轻有活力 · 传统中带现代感. Street-smart and proud of craft without being precious.",
  voice:
    "Simple, direct, warm, lightly funny. Warm Mandarin + Cantonese street tone. Mix CN/EN the way KL does. Rotate owner lines; do not mash personas.",
  tagline: "见您一面，吃一口好饺子。",
  colours,
  typography,
  photographyDirection:
    "明亮、真实、有烟火气. Food is the hero (skins, filling, broth, golden fried bottoms, steam, scallion, blue-white bowls, bamboo steamer). ICC Pudu stall, front tables, tea-shop feel. Panda mascot connects — never replaces — the food.",
  videoDirection:
    "Vertical clips: pour, bite, steam rise, first-bite reactions. Real stall light. Hold on the crust crack and the ladle.",
  graphicStyle:
    "Panda-led Mode A (red / white / steam-mist). Mode B 饺子哥: black + gold with red punch. Clean panels, red paint-stroke energy. Modern food-court brand, not luxury chain.",
  ctaStyle:
    "Always pair place + time. Prefer meet-you language over “Order now.” Dine-in only. Always state Closed Monday on hours creatives. Never promise delivery, Monday service, or late night.",
  rawAnalysis: {
    campaignTheme: "好好见面",
    hours: "Tue–Sun 6:30 AM–2:00 PM · Closed Monday · Last call 2:00 PM",
    address: "G-52 ICC Pudu, Kuala Lumpur",
    offer: ["上汤水饺", "香煎饺子"],
    creativeModes: ["A — cute panda / everyday social", "B — high-energy 饺子哥 hero"],
    pendingLocks: ["CN master name 见您一面 vs 见你一面", "饺子哥 face owned IP vs talent-only"],
  },
  approvedAt: "2026-09-20T06:00:00.000Z",
  createdAt: "2026-09-20T04:00:00.000Z",
  updatedAt: "2026-09-20T06:00:00.000Z",
};

function asset(
  id: string,
  kind: Asset["kind"],
  title: string,
  source: Asset["source"] = "UPLOAD",
): Asset {
  return {
    id,
    restaurantId: MEET_U_ID,
    kind,
    source,
    title,
    storageKey: `${MEET_U_ID}/${id}`,
    mimeType: "image/jpeg",
    byteSize: 1_100_000,
    width: 1600,
    height: 2000,
    analysis: { dishes: ["上汤水饺", "香煎饺子"], vibe: "ICC Pudu stall, steam and wok heat" },
    createdAt: now,
    updatedAt: now,
  };
}

export const meetUAssets: Asset[] = [
  asset("a_mu_logo", "LOGO", "见您一面 wordmark + panda", "GENERATED"),
  asset("a_mu_soup", "FOOD_PHOTO", "上汤水饺 steam pour"),
  asset("a_mu_fried", "FOOD_PHOTO", "香煎饺子 golden bottoms"),
  asset("a_mu_wrap", "FOOD_PHOTO", "Hands wrapping dumplings"),
  asset("a_mu_storefront", "EXTERIOR", "G-52 ICC Pudu storefront"),
  asset("a_mu_panda", "OTHER", "Panda mascot with plate", "GENERATED"),
];

export const meetUCalendarJob: CreativeJob = {
  id: "job_mu_calendar",
  restaurantId: MEET_U_ID,
  brandDnaId: MEET_U_DNA_V2,
  type: "CALENDAR",
  status: "SUCCEEDED",
  progress: 100,
  input: { brandDnaId: MEET_U_DNA_V2, theme: "好好见面", days: 30 },
  output: { seededDays: 8, note: "Week 1 + GBP sample from Marketing Lead calendar" },
  error: null,
  startedAt: "2026-09-20T06:01:00.000Z",
  finishedAt: "2026-09-20T06:02:00.000Z",
  createdAt: "2026-09-20T06:01:00.000Z",
  updatedAt: "2026-09-20T06:02:00.000Z",
};

export const meetUStarterJob: CreativeJob = {
  id: "job_mu_starter",
  restaurantId: MEET_U_ID,
  brandDnaId: MEET_U_DNA_V2,
  type: "STARTER_PACKAGE",
  status: "SUCCEEDED",
  progress: 100,
  input: { brandDnaId: MEET_U_DNA_V2 },
  output: { package: "calendar-first seed" },
  error: null,
  startedAt: "2026-09-20T06:00:00.000Z",
  finishedAt: "2026-09-20T06:02:00.000Z",
  createdAt: "2026-09-20T06:00:00.000Z",
  updatedAt: "2026-09-20T06:02:00.000Z",
};

type DayRow = {
  dayIndex: number;
  date: string;
  dayOfWeek: string;
  isClosedDay: boolean;
  platform: string;
  format: CalendarPayload["format"];
  pillar: string;
  kind: ContentKind;
  status: ContentStatus;
  title: string;
  body: string;
  hookCaptionEn: string;
  creativeNote: string;
  cta: string;
  thumb: string;
};

const week1: DayRow[] = [
  {
    dayIndex: 1,
    date: "2026-09-22",
    dayOfWeek: "Tue",
    isClosedDay: false,
    platform: "ig_feed",
    format: "photo",
    pillar: "product_soup",
    kind: "SOCIAL_IMAGE",
    status: "SCHEDULED",
    title: "今天，来见您一面。",
    body: "今天，来见您一面。上汤水饺热汤上桌，见面第一口就暖。",
    hookCaptionEn: "Today, come meet us. Hot soup dumplings on the table — first bite warms you.",
    creativeNote: "Bowl steam close-up, warm red napkin or tray edge",
    cta: "早上 6:30，ICC PUDU G-52",
    thumb: "a_mu_soup",
  },
  {
    dayIndex: 2,
    date: "2026-09-23",
    dayOfWeek: "Wed",
    isClosedDay: false,
    platform: "ig_reel",
    format: "reel",
    pillar: "process",
    kind: "SOCIAL_IMAGE",
    status: "SCHEDULED",
    title: "一见面，就请您吃饺子。",
    body: "一见面，就请您吃饺子。从包到煮，新鲜才见面。",
    hookCaptionEn: "The moment we meet, we feed you dumplings. From wrap to boil, fresh is the meeting.",
    creativeNote: "Hands wrapping → pot → ladle; real stall light",
    cta: "想吃就来见您一面",
    thumb: "a_mu_wrap",
  },
  {
    dayIndex: 3,
    date: "2026-09-24",
    dayOfWeek: "Thu",
    isClosedDay: false,
    platform: "ig_stories",
    format: "poll",
    pillar: "interactive",
    kind: "SOCIAL_CAROUSEL",
    status: "IN_REVIEW",
    title: "今天想吃汤的，还是煎的？",
    body: "今天想吃汤的，还是煎的？",
    hookCaptionEn: "Soup today, or pan-fried?",
    creativeNote: "Split: soup bowl vs golden bottoms",
    cta: "评论「汤」或「煎」",
    thumb: "a_mu_fried",
  },
  {
    dayIndex: 4,
    date: "2026-09-25",
    dayOfWeek: "Fri",
    isClosedDay: false,
    platform: "ig_feed",
    format: "photo",
    pillar: "people",
    kind: "SOCIAL_IMAGE",
    status: "SCHEDULED",
    title: "一口饺子，一份人情味。",
    body: "一口饺子，一份人情味。下班前，先见您一面。",
    hookCaptionEn: "One dumpling, a little human warmth. Meet us before the last call.",
    creativeNote: "Office crowd soft bokeh + dumpling plate",
    cta: "午餐 Last call 2:00 PM",
    thumb: "a_mu_soup",
  },
  {
    dayIndex: 5,
    date: "2026-09-26",
    dayOfWeek: "Sat",
    isClosedDay: false,
    platform: "ig_reel",
    format: "reel",
    pillar: "product_fried",
    kind: "SOCIAL_IMAGE",
    status: "APPROVED",
    title: "汤的暖心，煎的香脆。",
    body: "汤的暖心，煎的香脆。周末打卡，见您一面。",
    hookCaptionEn: "Soup that warms, fry that crackles. Weekend check-in at Meet U 1 Face.",
    creativeNote: "Sizzle pan-fried bottoms + pour soup cut",
    cta: "定位 ICC PUDU，找熊猫",
    thumb: "a_mu_fried",
  },
  {
    dayIndex: 6,
    date: "2026-09-27",
    dayOfWeek: "Sun",
    isClosedDay: false,
    platform: "ig_feed",
    format: "photo",
    pillar: "people",
    kind: "SOCIAL_IMAGE",
    status: "SCHEDULED",
    title: "每一颗饺子，都是一次好好见面。",
    body: "每一颗饺子，都是一次好好见面。和家人一起，慢慢吃。",
    hookCaptionEn: "Every dumpling is a proper meeting. Slow Sunday with family.",
    creativeNote: "Family/friends at front tables, tea-shop feel",
    cta: "周日早鸟 6:30 开档",
    thumb: "a_mu_storefront",
  },
  {
    dayIndex: 7,
    date: "2026-09-28",
    dayOfWeek: "Mon",
    isClosedDay: true,
    platform: "ig_stories",
    format: "static",
    pillar: "soft_closed",
    kind: "SOCIAL_IMAGE",
    status: "SCHEDULED",
    title: "星期一休息中。",
    body: "星期一休息中。明天继续：见您一面，吃一口好饺子。",
    hookCaptionEn: "Closed Monday. Tomorrow we meet again: a good dumpling, face to face.",
    creativeNote: "Panda wave + closed sign aesthetic",
    cta: "星期二 6:30 见",
    thumb: "a_mu_panda",
  },
];

function calendarItem(row: DayRow, opts?: { id?: string; brandDnaId?: string; status?: ContentStatus }): ContentItem {
  const payload: CalendarPayload = {
    dayIndex: row.dayIndex,
    dayOfWeek: row.dayOfWeek,
    isClosedDay: row.isClosedDay,
    format: row.format,
    pillar: row.pillar,
    hookCaptionEn: row.hookCaptionEn,
    creativeNote: row.creativeNote,
    cta: row.cta,
    hashtags: HASHTAGS,
    campaignTheme: "好好见面",
  };
  return {
    id: opts?.id ?? `ci_mu_d${row.dayIndex}`,
    restaurantId: MEET_U_ID,
    brandDnaId: opts?.brandDnaId ?? MEET_U_DNA_V2,
    jobId: meetUCalendarJob.id,
    kind: row.kind,
    status: opts?.status ?? row.status,
    title: row.title,
    body: row.body,
    platform: row.platform,
    conceptIndex: null,
    scheduledFor: mytBreakfast(row.date),
    payload,
    thumbnailKey: row.thumb,
    createdAt: now,
    updatedAt: now,
  };
}

const gbpItem: ContentItem = {
  id: "ci_mu_gbp",
  restaurantId: MEET_U_ID,
  brandDnaId: MEET_U_DNA_V2,
  jobId: meetUStarterJob.id,
  kind: "GOOGLE_BUSINESS",
  status: "APPROVED",
  title: "GBP — 见您一面 / ICC PUDU G-52",
  body: "见您一面，吃一口好饺子。上汤水饺 & 香煎饺子 · ICC PUDU G-52 · 6:30 AM–2:00 PM · 星期一休息。",
  platform: "gbp",
  conceptIndex: null,
  scheduledFor: mytBreakfast("2026-09-22"),
  payload: {
    dayIndex: 1,
    dayOfWeek: "Tue",
    isClosedDay: false,
    format: "photo",
    pillar: "place_icc",
    hookCaptionEn: "Meet U 1 Face at ICC Pudu G-52. Soup dumplings and pan-fried. Closed Monday.",
    creativeNote: "GBP photo order: soup bowl, fried bottoms, storefront, wrapping, panda + plate",
    cta: "Google 搜「见您一面」打卡",
    hashtags: HASHTAGS,
    campaignTheme: "好好见面",
    hours: "Tue–Sun 6:30 AM–2:00 PM · Closed Monday",
    address: "G-52 ICC Pudu, Kuala Lumpur",
  },
  thumbnailKey: "a_mu_storefront",
  createdAt: now,
  updatedAt: now,
};

/** Seeded stale row: locked to superseded v1 so the NEEDS_RELOCK rule is visible. */
const staleRelockItem = calendarItem(week1[0], {
  id: "ci_mu_stale_v1",
  brandDnaId: MEET_U_DNA_V1,
  status: "NEEDS_RELOCK",
});

export const meetUContent: ContentItem[] = [...week1.map((row) => calendarItem(row)), gbpItem, staleRelockItem];

export const meetUWebsite: Website = {
  id: "web_meetu",
  restaurantId: MEET_U_ID,
  status: "READY",
  theme: {
    primary: "#E31C23",
    secondary: "#D4A017",
    background: "#F5F0E8",
    headingFont: "Noto Sans SC",
    bodyFont: "Inter",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      title: "见您一面，吃一口好饺子。",
      body: "上汤水饺 · 香煎饺子 · G-52 ICC Pudu · Tue–Sun 6:30–2:00 · Closed Monday",
      enabled: true,
    },
    {
      id: "offer",
      type: "menu",
      title: "汤的暖心，煎的香脆。",
      body: "上汤水饺 · 香煎饺子 · 现包现煮 · 堂食",
      enabled: true,
    },
    {
      id: "hours",
      type: "hours",
      title: "Hours & place",
      body: "Tue–Sun 6:30 AM–2:00 PM. Last call 2:00 PM. Closed Monday. G-52 ICC Pudu.",
      enabled: true,
    },
    {
      id: "footer",
      type: "footer",
      title: "见您一面 / Meet U 1 Face",
      body: "饺子哥 · Kuala Lumpur",
      enabled: true,
    },
  ],
  publishedAt: null,
  createdAt: "2026-09-20T06:02:00.000Z",
  updatedAt: now,
};

export const meetUCampaign: Campaign = {
  id: "cmp_mu_meet",
  restaurantId: MEET_U_ID,
  name: "好好见面",
  status: "DRAFT",
  startDate: "2026-09-22T00:00:00.000+08:00",
  endDate: "2026-10-21T00:00:00.000+08:00",
  brief: "30-day calendar theme. Campaign planner is stubbed for Phase 1 — rows live on Content with brandDnaId.",
  createdAt: now,
  updatedAt: now,
};
