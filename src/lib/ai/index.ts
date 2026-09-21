import type { Asset, BrandDNA, Restaurant } from "@/lib/types";

export type ImageAnalysis = {
  dishes: string[];
  vibe: string;
  colours: string[];
  notes: string;
};

export type SocialConceptDraft = {
  title: string;
  caption: string;
  overlay: string;
  platform: "ig" | "fb" | "tiktok";
};

export type VideoConceptDraft = {
  title: string;
  durationSec: number;
  logline: string;
};

export type StarterPackageDraft = {
  social: SocialConceptDraft[];
  videos: VideoConceptDraft[];
  googleCopy: string;
  menuNote: string;
};

/**
 * Provider-independent AI layer. Swap `mockBrandIntelligence` for a real
 * adapter (OpenAI, Anthropic, Gemini, etc.) without touching UI code.
 */
export interface BrandIntelligence {
  analyzeAssets(assets: Asset[]): Promise<ImageAnalysis>;
  proposeBrandDna(input: {
    restaurant: Pick<Restaurant, "name" | "cuisine" | "city" | "description">;
    analysis: ImageAnalysis;
  }): Promise<Partial<BrandDNA>>;
  generateStarterPackage(dna: BrandDNA): Promise<StarterPackageDraft>;
  generateSocialConcepts(dna: BrandDNA, count: number): Promise<SocialConceptDraft[]>;
  generateVideoConcepts(dna: BrandDNA, count: number): Promise<VideoConceptDraft[]>;
}

function wait(ms = 280) {
  return new Promise((r) => setTimeout(r, ms));
}

export const mockBrandIntelligence: BrandIntelligence = {
  async analyzeAssets(assets) {
    await wait();
    const dishes = assets
      .map((a) => a.title)
      .filter((t): t is string => Boolean(t))
      .slice(0, 6);
    return {
      dishes,
      vibe: "Warm service lighting, handmade plates, unhurried room.",
      colours: ["#1f4e5a", "#c4a574", "#d45d32"],
      notes: `Read ${assets.length} files. Dominant story is food in context, not isolated product shots.`,
    };
  },

  async proposeBrandDna({ restaurant, analysis }) {
    await wait();
    return {
      positioning: `${restaurant.name} is a ${restaurant.cuisine ?? "neighborhood"} kitchen${
        restaurant.city ? ` in ${restaurant.city}` : ""
      } that cooks for people who want to linger.`,
      audience: "Nearby regulars and couples looking for a table that feels considered, not loud.",
      personality: "Warm, specific, unhurried.",
      voice: "Short sentences. Sensory, never salesy.",
      tagline: restaurant.description?.split(".")[0] || "Come sit. Stay a while.",
      photographyDirection: analysis.notes,
      videoDirection: "Hands, steam, room tone. Hold on the plate.",
      graphicStyle: "Generous margins, one accent rule, paper textures.",
      ctaStyle: "Reserve a table — never Shop now.",
    };
  },

  async generateStarterPackage(dna) {
    await wait();
    const social = await this.generateSocialConcepts(dna, 12);
    const videos = await this.generateVideoConcepts(dna, 4);
    return {
      social,
      videos,
      googleCopy: dna.positioning ?? "A neighborhood restaurant worth the walk.",
      menuNote: "One-page seasonal board plus a wine or drinks list.",
    };
  },

  async generateSocialConcepts(dna, count) {
    await wait();
    const bases = [
      "Tonight’s board",
      "Hands in frame",
      "Window light",
      "Room before service",
      "Hero plate",
      "A toast",
      "Hours, plainly",
      "Ingredient still life",
      "Staff meal",
      "Rain or sun",
      "Come sit",
      "The regulars know",
    ];
    return bases.slice(0, count).map((title) => ({
      title,
      caption: `${title}. ${dna.tagline ?? ""}`.trim(),
      overlay: title,
      platform: "ig" as const,
    }));
  },

  async generateVideoConcepts(dna, count) {
    await wait();
    const bases = [
      { title: "Open the door", durationSec: 8, logline: "Arrival, warmth, first plate." },
      { title: "The pass", durationSec: 15, logline: "Service rhythm without talking heads." },
      { title: "Table for two", durationSec: 20, logline: "A short date-night film." },
      { title: "Brand hold", durationSec: 12, logline: dna.tagline ?? "Hold on the room." },
    ];
    return bases.slice(0, count);
  },
};

export const brandIntelligence: BrandIntelligence = mockBrandIntelligence;
