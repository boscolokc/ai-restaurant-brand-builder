import type {
  Asset,
  BrandDNA,
  CalendarPayload,
  Campaign,
  ContentItem,
  ContentKind,
  ContentStatus,
  CreativeJob,
  CreativeMode,
  Restaurant,
  SocialConceptPayload,
  SocialRatio,
  VideoConceptPayload,
  Website,
} from "@/lib/types";
import approvedDna from "@/lib/mock/branddna-meetu-v2.seed.json";
import supersededDna from "@/lib/mock/branddna-meetu-v1.seed.json";

export const MEET_U_ID = "meet-u-1-face";
/** Frozen Brand Lead SoT. Approved v2. */
export const MEET_U_DNA_APPROVED = approvedDna.id;
/** v1 is SUPERSEDED. One content row still points here so NEEDS_RELOCK stays visible. */
export const MEET_U_DNA_SUPERSEDED = supersededDna.id;

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
  primary: approvedDna.colours.primary,
  secondary: approvedDna.colours.secondary,
  accent: approvedDna.colours.accent,
  neutrals: [...approvedDna.colours.neutrals],
};

const typography = {
  heading: approvedDna.typography.heading,
  body: approvedDna.typography.body,
  notes: approvedDna.typography.notes,
};

const approvedAt = new Date(approvedDna.approvedAt).toISOString();
const supersededAt = new Date(supersededDna.approvedAt).toISOString();

export const meetUDnaSuperseded: BrandDNA = {
  id: MEET_U_DNA_SUPERSEDED,
  restaurantId: MEET_U_ID,
  status: "SUPERSEDED",
  version: supersededDna.version,
  positioning: supersededDna.positioning,
  audience: supersededDna.audience,
  personality: supersededDna.personality,
  voice: supersededDna.voice,
  tagline: supersededDna.tagline,
  colours: {
    primary: supersededDna.colours.primary,
    secondary: supersededDna.colours.secondary,
    accent: supersededDna.colours.accent,
    neutrals: [...supersededDna.colours.neutrals],
  },
  typography: {
    heading: supersededDna.typography.heading,
    body: supersededDna.typography.body,
    notes: supersededDna.typography.notes,
  },
  photographyDirection: supersededDna.photographyDirection,
  videoDirection: supersededDna.videoDirection,
  graphicStyle: supersededDna.graphicStyle,
  ctaStyle: supersededDna.ctaStyle,
  rawAnalysis: {
    note: "SUPERSEDED by branddna_meetu_v2. v1 locked Mode B to panda only (chef face was talent-only).",
    supersededBy: approvedDna.id,
    nameStack: supersededDna.nameStack,
    locks: supersededDna.locks,
    colourTokens: supersededDna.colours.tokens,
    creativeModes: [
      "A — cute panda / everyday social",
      "B — 饺子哥 hero, panda mascot only (no chef face)",
    ],
    sourcePath: supersededDna.sourcePath,
  },
  approvedAt: supersededAt,
  createdAt: "2026-09-22T06:00:00.000Z",
  updatedAt: approvedAt,
};

export const meetUDna: BrandDNA = {
  id: MEET_U_DNA_APPROVED,
  restaurantId: MEET_U_ID,
  status: "APPROVED",
  version: approvedDna.version,
  positioning: approvedDna.positioning,
  audience: approvedDna.audience,
  personality: approvedDna.personality,
  voice: approvedDna.voice,
  tagline: approvedDna.tagline,
  colours,
  typography,
  photographyDirection: approvedDna.photographyDirection,
  videoDirection: approvedDna.videoDirection,
  graphicStyle: approvedDna.graphicStyle,
  ctaStyle: approvedDna.ctaStyle,
  rawAnalysis: {
    campaignTheme: "好好见面",
    hours: "Tue–Sun 6:30 AM–2:00 PM · Closed Monday · Last call 2:00 PM",
    address: "G-52 ICC Pudu, Kuala Lumpur",
    offer: ["上汤水饺", "香煎饺子"],
    restaurantSlug: approvedDna.restaurantSlug,
    nameStack: approvedDna.nameStack,
    locks: approvedDna.locks,
    colourTokens: approvedDna.colours.tokens,
    supersedes: approvedDna.supersedes,
    creativeModes: [
      "A — cute panda / everyday social",
      "B — 饺子哥 hero with owned chef caricature",
    ],
    sourcePath: approvedDna.sourcePath,
  },
  approvedAt,
  createdAt: "2026-09-22T06:00:00.000Z",
  updatedAt: approvedAt,
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
  asset("a_mu_chef", "OTHER", "饺子哥 chef caricature (owned IP)", "GENERATED"),
];

export const meetUCalendarJob: CreativeJob = {
  id: "job_mu_calendar",
  restaurantId: MEET_U_ID,
  brandDnaId: MEET_U_DNA_APPROVED,
  type: "CALENDAR",
  status: "SUCCEEDED",
  progress: 100,
  input: { brandDnaId: MEET_U_DNA_APPROVED, theme: "好好见面", days: 30 },
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
  brandDnaId: MEET_U_DNA_APPROVED,
  type: "STARTER_PACKAGE",
  status: "SUCCEEDED",
  progress: 100,
  input: { brandDnaId: MEET_U_DNA_APPROVED },
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
    creativeNote: "Mode B Reel: sizzle bottoms + soup pour · 饺子哥 chef face OK · black/gold energy",
    cta: "定位 ICC PUDU · Mode B 找饺子哥（chef face OK）",
    thumb: "a_mu_chef",
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
    brandDnaId: opts?.brandDnaId ?? MEET_U_DNA_APPROVED,
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
  brandDnaId: MEET_U_DNA_APPROVED,
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

/** Seeded stale row: still points at superseded v1 so NEEDS_RELOCK stays visible. */
const staleRelockItem = calendarItem(week1[0], {
  id: "ci_mu_needs_relock",
  brandDnaId: MEET_U_DNA_SUPERSEDED,
  status: "NEEDS_RELOCK",
});

export const meetUContent: ContentItem[] = [...week1.map((row) => calendarItem(row)), gbpItem, staleRelockItem];

const ratios: SocialRatio[] = ["4:5", "1:1", "9:16"];

type SocialRow = {
  postId: string;
  title: string;
  pillar: string;
  objective: string;
  captionZh: string;
  captionEn: string;
  visualConcept: string;
  mode: CreativeMode;
  cta: string;
  layoutNotesByRatio: SocialConceptPayload["layoutNotesByRatio"];
  thumb: string;
};

const socialRows: SocialRow[] = [
  {
    postId: "SOC-01-OPEN",
    title: "开档 · Open",
    pillar: "Open / Awareness",
    objective: "Announce presence; plant name + location in KL mindshare",
    captionZh: "见您一面开档啦！汤饺·煎饺，现包现煮。ICC Pudu G-52，早上来见饺子哥一面！",
    captionEn: "MEET U 1 FACE NOODLE is here. Soup dumplings + fried dumplings — handmade fresh. G-52 ICC Pudu.",
    visualConcept: "Mode A panda waves in front of the stall with steam; soft OPEN badge in gold on red.",
    mode: "A",
    cta: "来见您一面 → Save location / Follow",
    layoutNotesByRatio: {
      "4:5": "Mascot mid-upper third; Chinese name top band; EN + address bottom safe strip; OPEN badge top-right.",
      "1:1": "Centered mascot; name arc above; location line below feet; trim side props.",
      "9:16": "Vertical stack — name → mascot → steam food plate → hours chip → CTA at thumb zone.",
    },
    thumb: "a_mu_panda",
  },
  {
    postId: "SOC-02-TANGJIAO",
    title: "汤饺 hero",
    pillar: "Product hero (汤饺)",
    objective: "Drive craving + menu awareness for soup dumplings",
    captionZh: "汤饺来了——热汤、现包、一口满足。要饺子，找饺子哥！",
    captionEn: "Soup dumplings: hot broth, handmade, one bite hit.",
    visualConcept: "Hero blue-white bowl, rising steam, chili oil sheen, scallions. No fake price.",
    mode: "A",
    cta: "想来一碗？早上到 G-52",
    layoutNotesByRatio: {
      "4:5": "Bowl fills lower 55%; steam into upper negative; CN headline top-left plaque.",
      "1:1": "Tight crop on bowl + chopsticks lift; logo watermark bottom-right.",
      "9:16": "Extreme steam vertical; headline top; CTA bottom; keep bowl above UI chrome.",
    },
    thumb: "a_mu_soup",
  },
  {
    postId: "SOC-03-JIANJIAO",
    title: "煎饺 hero",
    pillar: "Product hero (煎饺)",
    objective: "Balance offer mix; crispy appetite cue",
    captionZh: "煎饺底要焦、里要嫩。汤饺•煎饺，简单就是好吃！",
    captionEn: "Crispy bottom, juicy inside. Simple = delicious.",
    visualConcept: "Close-up golden bottoms, bamboo steamer or plate, scallion scatter. Mascot optional corner stamp.",
    mode: "A",
    cta: "煎饺也要见您一面",
    layoutNotesByRatio: {
      "4:5": "Diagonal plate; crispy edge highlight; CN tagline strip mid-left.",
      "1:1": "Grid of 4–6 dumplings; gold accent corner only.",
      "9:16": "Stack steamer → plate → CTA; leave top 250px clear for Stories UI.",
    },
    thumb: "a_mu_fried",
  },
  {
    postId: "SOC-04-LOC-HOURS",
    title: "地点与时间",
    pillar: "Location + hours",
    objective: "Reduce friction; correct Monday closed expectation",
    captionZh: "地址：G-52 ICC Pudu, Kuala Lumpur。营业：6:30 AM – 2:00 PM（Last Call）。每周一休息。",
    captionEn: "G-52 ICC Pudu, KL. 6:30 AM–2:00 PM (Last Call). Closed Mondays.",
    visualConcept: "Map-pin graphic + panda pointer; hours as big chips; red/white. Closed Monday badge.",
    mode: "A",
    cta: "导航去见您一面 / Open Maps",
    layoutNotesByRatio: {
      "4:5": "Address block upper; hours middle chips; mascot lower-right; Maps CTA bottom.",
      "1:1": "Center hours clock graphic; address below; no dense map screenshot.",
      "9:16": "Pin → address → hours → Monday closed badge → CTA.",
    },
    thumb: "a_mu_storefront",
  },
  {
    postId: "SOC-05-JIAOZI-GE",
    title: "饺子哥 · chef face",
    pillar: "饺子哥 persona",
    objective: "Memorize character; own “要饺子，找饺子哥”",
    captionZh: "我是饺子哥。汤饺煎饺现包现煮——想吃餃子，就找餃子哥！",
    captionEn: "I’m Dumpling Brother. Handmade soup + fried dumplings. Come find me.",
    visualConcept:
      "Mode B hero: gold-black field, owned 饺子哥 chef caricature (thumbs-up OK) + optional panda stamp, speed/energy frame.",
    mode: "B",
    cta: "Follow 饺子哥 / 关注见您一面",
    layoutNotesByRatio: {
      "4:5": "Full-bleed black; gold rim; chef caricature center; CN shout line top; EN sub bottom.",
      "1:1": "Circular gold frame around the chef face; wordmark under.",
      "9:16": "Hero chef lower-center; kinetic gold particles; CTA thumb zone.",
    },
    thumb: "a_mu_chef",
  },
  {
    postId: "SOC-06-UGC-STYLE",
    title: "真实评价框",
    pillar: "UGC / review style",
    objective: "Social proof frame without inventing quotes",
    captionZh: "吃过的朋友，欢迎留言你点的是汤饺还是煎饺～（真实评价我们再精选转载）",
    captionEn: "Tried us? Tell us: soup or fried? Real reviews only — we’ll feature with permission.",
    visualConcept: "Soft Mode A frame: empty quote card + food blur + “真实评价” badge. No fabricated stars or quotes.",
    mode: "A",
    cta: "Comment 汤饺 / 煎饺",
    layoutNotesByRatio: {
      "4:5": "Quote card 60% center; panda peek corner; prompt line bottom.",
      "1:1": "Card centered; minimal chrome.",
      "9:16": "Card mid; stickers for 汤饺 / 煎饺 poll affordance.",
    },
    thumb: "a_mu_soup",
  },
  {
    postId: "SOC-07-MORNING-RUSH",
    title: "早市 6:30",
    pillar: "Morning rush",
    objective: "Own the breakfast/brunch window",
    captionZh: "早市开档！6:30 热汤已起。赶时间也要吃好——见您一面。",
    captionEn: "Doors at 6:30. Hot soup ready. Fast morning, good dumplings.",
    visualConcept: "Dawn light + steam + plate; soft clock at 6:30. Panda optional.",
    mode: "A",
    cta: "明天早上见",
    layoutNotesByRatio: {
      "4:5": "Warm light gradient top; food mid; 6:30 chip; location whisper.",
      "1:1": "Clock + bowl split.",
      "9:16": "Sunrise band → steam → CTA “6:30 AM”.",
    },
    thumb: "a_mu_soup",
  },
  {
    postId: "SOC-08-SIMPLE",
    title: "简单就是好吃",
    pillar: "Simple-is-delicious",
    objective: "Brand philosophy; cut feature clutter",
    captionZh: "汤饺•煎饺 简单就是好吃！好味道，就在这里见您一面！",
    captionEn: "Soup + fried. Simple is delicious. Meet you here.",
    visualConcept: "Minimal red/white: two icons (汤 / 煎) + panda nod.",
    mode: "A",
    cta: "选一个，来见面",
    layoutNotesByRatio: {
      "4:5": "Two equal product tiles; headline between; panda footer.",
      "1:1": "Single bold CN line + dual icons.",
      "9:16": "Vertical two-step: 汤饺 then 煎饺 then tagline.",
    },
    thumb: "a_mu_logo",
  },
  {
    postId: "SOC-09-HANDMADE",
    title: "现包现煮",
    pillar: "Handmade process",
    objective: "Trust via 现包现煮 craft",
    captionZh: "现包现煮——饺子皮、馅、汤，都是为这一面准备的。",
    captionEn: "Handmade, boiled to order. Skin, filling, broth — for this meetup.",
    visualConcept: "Hands wrapping / steamer lid lift / pour broth. Triptych stills. No faces required.",
    mode: "A",
    cta: "来吃现做的",
    layoutNotesByRatio: {
      "4:5": "Vertical triptych strips.",
      "1:1": "2×2 process grid (3 steps + logo tile).",
      "9:16": "Step 1→2→3; numbered ①②③.",
    },
    thumb: "a_mu_wrap",
  },
  {
    postId: "SOC-10-LAST-CALL",
    title: "Last Call 2:00",
    pillar: "Limited-hours urgency",
    objective: "Protect lunch last-call; no false scarcity on stock",
    captionZh: "Last Call 2:00 PM。过了就明天见（周一休息）。想吃就早来。",
    captionEn: "Last Call 2:00 PM. After that — tomorrow (closed Mondays).",
    visualConcept:
      "Mode B urgency: gold LAST CALL badge on black; red CTA; clock cue. Owned 饺子哥 chef face OK.",
    mode: "B",
    cta: "今天下午两点前见",
    layoutNotesByRatio: {
      "4:5": "Huge 2:00 PM; LAST CALL gold; address micro-line.",
      "1:1": "Badge-centered.",
      "9:16": "Countdown-style static (no fake live timer); CTA bottom.",
    },
    thumb: "a_mu_chef",
  },
  {
    postId: "SOC-11-KL-LOCAL",
    title: "Pudu / ICC",
    pillar: "Community / KL local",
    objective: "Embed in ICC Pudu / KL daily life",
    captionZh: "Pudu 的朋友、ICC 路过的人——汤饺煎饺，在 G-52 见您一面。",
    captionEn: "Pudu & ICC folks — dumplings at G-52. Meet you face to face.",
    visualConcept: "Neighborhood Mode A: generic Pudu texture + panda + bowl. No unauthorized landmark marks.",
    mode: "A",
    cta: "Tag a friend in KL",
    layoutNotesByRatio: {
      "4:5": "Local texture background + content card.",
      "1:1": "Panda + “G-52” big type.",
      "9:16": "“KL · Pudu · ICC” chip stack → food → CTA.",
    },
    thumb: "a_mu_storefront",
  },
  {
    postId: "SOC-12-RETURN",
    title: "再见面",
    pillar: "Retention / return visit",
    objective: "Second visit without inventing loyalty program details",
    captionZh: "上次汤饺，这次煎饺？还是两样都来——饺子哥在 G-52 等你再见面。",
    captionEn: "Soup last time, fried this time? Or both. Dumpling Brother’s at G-52.",
    visualConcept: "Split 汤饺 | 煎饺 return card; “再见面” stamp; Mode A panda wink.",
    mode: "A",
    cta: "下次见您一面",
    layoutNotesByRatio: {
      "4:5": "Split vertical products; stamp center.",
      "1:1": "Circular “再见面” seal over duo.",
      "9:16": "Reminder checklist: 汤饺 ☐ 煎饺 ☐ → CTA.",
    },
    thumb: "a_mu_fried",
  },
];

export const meetUSocialJob: CreativeJob = {
  id: "job_mu_social",
  restaurantId: MEET_U_ID,
  brandDnaId: MEET_U_DNA_APPROVED,
  type: "SOCIAL_CONCEPTS",
  status: "SUCCEEDED",
  progress: 100,
  input: { count: 12, brandDnaId: MEET_U_DNA_APPROVED },
  output: { concepts: 12, note: "Starter package social concepts locked to branddna_meetu_v2; Mode B chef face restored" },
  error: null,
  startedAt: approvedAt,
  finishedAt: approvedAt,
  createdAt: approvedAt,
  updatedAt: approvedAt,
};

export const meetUSocialContent: ContentItem[] = socialRows.map((row, i) => {
  const payload: SocialConceptPayload = {
    postId: row.postId,
    pillar: row.pillar,
    objective: row.objective,
    captionZh: row.captionZh,
    captionEn: row.captionEn,
    visualConcept: row.visualConcept,
    mode: row.mode,
    cta: row.cta,
    ratios,
    layoutNotesByRatio: row.layoutNotesByRatio,
  };
  return {
    id: `ci_mu_${row.postId.toLowerCase()}`,
    restaurantId: MEET_U_ID,
    brandDnaId: MEET_U_DNA_APPROVED,
    jobId: meetUSocialJob.id,
    kind: "SOCIAL_IMAGE",
    status: "APPROVED",
    title: row.title,
    body: row.captionZh,
    platform: "ig",
    conceptIndex: i + 1,
    scheduledFor: null,
    payload,
    thumbnailKey: row.thumb,
    createdAt: approvedAt,
    updatedAt: approvedAt,
  };
});

type VideoRow = {
  videoId: string;
  title: string;
  durationSec: number;
  mode: CreativeMode;
  body: string;
  scriptBeats: VideoConceptPayload["scriptBeats"];
  storyboardFrames: VideoConceptPayload["storyboardFrames"];
  shotList: string[];
  previewBrief: string;
  thumb: string;
};

const videoRows: VideoRow[] = [
  {
    videoId: "VID-01",
    title: "Now Open · G-52 ICC Pudu",
    durationSec: 40,
    mode: "A",
    body: "Friendly stall just opened. Address readable. Panda welcome. No fake crowd.",
    scriptBeats: [
      { startSec: 0, endSec: 3, line: "VO CN: 「见您一面，开档啦！」 / EN lower-third: NOW OPEN" },
      { startSec: 3, endSec: 8, line: "Panda pops; red headband flash; title MEET U 1 FACE NOODLE" },
      { startSec: 8, endSec: 15, line: "Pin → G-52 ICC Pudu → exterior approach" },
      { startSec: 15, endSec: 25, line: "汤饺 steam + 煎饺 crisp; text 现包现煮" },
      { startSec: 25, endSec: 32, line: "Hours card: 6:30 AM – 2:00 PM · Last Call · Closed Monday" },
      { startSec: 32, endSec: 40, line: "CTA: 要饺子，找饺子哥！ Come meet us at G-52." },
    ],
    storyboardFrames: [
      { order: 1, description: "Red field + gold OPEN burst" },
      { order: 2, description: "Panda wave (Mode A)" },
      { order: 3, description: "Map pin drop to Pudu" },
      { order: 4, description: "Stall / counter tease" },
      { order: 5, description: "Bowl steam hero" },
      { order: 6, description: "Hours typography card" },
      { order: 7, description: "End card lockup + CTA" },
    ],
    shotList: [
      "AI gen: panda welcome loop; steam bowl macro; crispy dumpling insert",
      "Typography motion: address + hours",
      "Optional live plate later: storefront (TBD)",
    ],
    previewBrief:
      "Upbeat, warm, 10–15% Mode B gold flashes only on OPEN/CTA. Clean address. No fake crowd cheers. Mode A panda welcome.",
    thumb: "a_mu_panda",
  },
  {
    videoId: "VID-02",
    title: "饺子哥 · Dumpling Brother",
    durationSec: 40,
    mode: "B",
    body: "Persona film. Mode B hero uses the owned 饺子哥 chef caricature. Panda stays Mode A.",
    scriptBeats: [
      { startSec: 0, endSec: 4, line: "Black/gold hit; VO: 「我是饺子哥。」 / “I’m Dumpling Brother.”" },
      { startSec: 4, endSec: 12, line: "Origin beat: loves dumplings, wants everyone to 见面" },
      { startSec: 12, endSec: 22, line: "Points to 汤饺 & 煎饺; 现包现煮 montage" },
      { startSec: 22, endSec: 30, line: "Taglines 1 & 3 on screen; Mandarin + Cantonese cadence" },
      { startSec: 30, endSec: 40, line: "Mode B chef-face hero freeze → soft Mode A panda smile → follow CTA" },
    ],
    storyboardFrames: [
      { order: 1, description: "Gold slash on black" },
      { order: 2, description: "Chef caricature, black jacket and gold accents" },
      { order: 3, description: "Thumbs-up 饺子哥 reveal" },
      { order: 4, description: "Dual product gesture" },
      { order: 5, description: "Hands wrapping dumpling" },
      { order: 6, description: "Tagline slam" },
      { order: 7, description: "Mode B chef-face hero freeze" },
      { order: 8, description: "Soft Mode A panda smile end card" },
    ],
    shotList: ["Mode B lighting pack (rim gold)", "Owned chef caricature hero", "Kinetic type CN"],
    previewBrief:
      "High-energy, food-first. Persona is a warm street-smart big brother, not an idol. Gold-black dominant. Owned 饺子哥 chef caricature is the Mode B hero; panda stays Mode A.",
    thumb: "a_mu_chef",
  },
  {
    videoId: "VID-03",
    title: "Steam & Crisp ASMR",
    durationSec: 35,
    mode: "A",
    body: "Sensory, quiet. Mode A. Logo only at the end.",
    scriptBeats: [
      { startSec: 0, endSec: 5, line: "Lid lift; steam whoosh; whisper「现包现煮」" },
      { startSec: 5, endSec: 12, line: "Broth pour / chili oil drizzle / scallion drop" },
      { startSec: 12, endSec: 20, line: "煎饺 flip / crispy bottom close-up" },
      { startSec: 20, endSec: 28, line: "Chopsticks lift" },
      { startSec: 28, endSec: 35, line: "Title card: 汤饺•煎饺 简单就是好吃！ + location" },
    ],
    storyboardFrames: [
      { order: 1, description: "Steamer lid" },
      { order: 2, description: "Steam bloom" },
      { order: 3, description: "Chili oil ribbon" },
      { order: 4, description: "Crispy underside" },
      { order: 5, description: "Bowl hero blue-white" },
      { order: 6, description: "Tagline + logo" },
    ],
    shotList: ["Macro 85–100mm feel", "Slow motion steam", "Shallow DOF", "No invented ingredients"],
    previewBrief:
      "Sensory, quiet confidence, Mode A. Warm highlights, true chili red. Logo only at end.",
    thumb: "a_mu_soup",
  },
  {
    videoId: "VID-04",
    title: "Morning Ritual · ICC Pudu",
    durationSec: 45,
    mode: "A",
    body: "Documentary-lite morning. Monday closed appears once. No invented discounts.",
    scriptBeats: [
      { startSec: 0, endSec: 5, line: "Early light; clock → 6:30" },
      { startSec: 5, endSec: 12, line: "Stall wake: steamer on, broth hot, panda stretch「开工」" },
      { startSec: 12, endSec: 22, line: "Walk-in → order → first bite (generic, no passerby logos)" },
      { startSec: 22, endSec: 32, line: "Office rush vs slow savor; both welcome" },
      { startSec: 32, endSec: 40, line: "Last Call 2:00 · Monday closed" },
      { startSec: 40, endSec: 45, line: "「好味道，就在这里见您一面！」 / Meet you at G-52" },
    ],
    storyboardFrames: [
      { order: 1, description: "Clock 6:30" },
      { order: 2, description: "Steam ignition" },
      { order: 3, description: "Panda headband ready" },
      { order: 4, description: "Bowl handoff" },
      { order: 5, description: "Walking commute bokeh" },
      { order: 6, description: "Smile bite" },
      { order: 7, description: "Hours reminder, Monday closed" },
      { order: 8, description: "End lockup" },
    ],
    shotList: ["Morning color temperature", "Subtle steam time-lapse", "Hours graphics", "Location lower-thirds"],
    previewBrief:
      "Documentary-lite plus brand warmth. Morning pace, then food. Monday closed on screen once. No promo discounts. Mode A panda.",
    thumb: "a_mu_panda",
  },
];

export const meetUVideoJob: CreativeJob = {
  id: "job_mu_video",
  restaurantId: MEET_U_ID,
  brandDnaId: MEET_U_DNA_APPROVED,
  type: "VIDEO_CONCEPTS",
  status: "SUCCEEDED",
  progress: 100,
  input: { count: 4, brandDnaId: MEET_U_DNA_APPROVED },
  output: { concepts: 4, note: "Storyboards only — no render provider" },
  error: null,
  startedAt: approvedAt,
  finishedAt: approvedAt,
  createdAt: approvedAt,
  updatedAt: approvedAt,
};

export const meetUVideoContent: ContentItem[] = videoRows.map((row, i) => {
  const payload: VideoConceptPayload = {
    videoId: row.videoId,
    title: row.title,
    durationSec: row.durationSec,
    mode: row.mode,
    scriptBeats: row.scriptBeats,
    storyboardFrames: row.storyboardFrames,
    shotList: row.shotList,
    previewBrief: row.previewBrief,
  };
  return {
    id: `ci_mu_${row.videoId.toLowerCase()}`,
    restaurantId: MEET_U_ID,
    brandDnaId: MEET_U_DNA_APPROVED,
    jobId: meetUVideoJob.id,
    kind: "VIDEO_STORYBOARD",
    status: "APPROVED",
    title: row.title,
    body: row.body,
    platform: "ig_reel",
    conceptIndex: i + 1,
    scheduledFor: null,
    payload,
    thumbnailKey: row.thumb,
    createdAt: approvedAt,
    updatedAt: approvedAt,
  };
});

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
