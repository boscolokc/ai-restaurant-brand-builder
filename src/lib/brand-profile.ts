import type { BrandColours, BrandDNA, Restaurant } from "@/lib/types";

function titleCase(s: string) {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function hexLuminance(hex: string) {
  const h = hex.replace("#", "");
  if (h.length < 6) return 0.5;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function inkOn(hex: string) {
  return hexLuminance(hex) > 0.55 ? "#1f1a16" : "#fffcf7";
}

export function brandTypeName(dna: BrandDNA | null | undefined, restaurant?: Restaurant | null) {
  const raw = dna?.rawAnalysis?.typeName;
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  const name = restaurant?.name ?? "";
  if (/table$/i.test(name)) {
    const host = name.replace(/table$/i, "").trim();
    if (host) return `The ${host} Host`;
  }
  const clauses = (dna?.tagline ?? "")
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const short = [...clauses].reverse().find((c) => c.split(/\s+/).length <= 3);
  if (short) return titleCase(short);
  const adj =
    (dna?.personality ?? "")
      .split(/[,.]/)
      .map((s) => s.trim())
      .find((s) => s && !/^never\b/i.test(s) && !/^a little\b/i.test(s) && s.split(/\s+/).length <= 2) ?? "Neighborhood";
  const cuisine = restaurant?.cuisine ?? "";
  const noun = /cafe/i.test(cuisine)
    ? "Cafe"
    : /bar|grill/i.test(cuisine)
      ? "Grill"
      : /kitchen|table|coastal/i.test(`${cuisine} ${restaurant?.name ?? ""}`)
        ? "Table"
        : "Kitchen";
  return `The ${titleCase(adj.replace(/-/g, " "))} ${noun}`;
}

export function personalityChips(dna: BrandDNA | null | undefined) {
  const chips: { label: string; tone: "fill" | "outline" }[] = [];
  const bits = (dna?.personality ?? "")
    .split(/[.]/)
    .flatMap((part) => part.split(","))
    .map((s) => s.trim())
    .filter(Boolean);
  for (const bit of bits) {
    if (/^never\b/i.test(bit)) chips.push({ label: titleCase(bit), tone: "outline" });
    else chips.push({ label: titleCase(bit.replace(/^a little\s+/i, "")), tone: "fill" });
  }
  return chips.slice(0, 6);
}

export type TraitMeter = { left: string; right: string; value: number };

function axis(text: string, left: string[], right: string[]) {
  const t = text.toLowerCase();
  let s = 50;
  for (const w of left) if (t.includes(w)) s -= 14;
  for (const w of right) if (t.includes(w)) s += 14;
  return clamp(s, 14, 86);
}

export function traitMeters(dna: BrandDNA | null | undefined, restaurant?: Restaurant | null): TraitMeter[] {
  const blob = [
    dna?.positioning,
    dna?.audience,
    dna?.personality,
    dna?.voice,
    dna?.tagline,
    restaurant?.cuisine,
    restaurant?.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return [
    {
      left: "Daytime",
      right: "After dark",
      value: axis(blob, ["daytime", "breakfast", "cafe", "8am", "lunch", "morning", "patio"], ["evening", "night", "dinner", "bar", "late", "weather"]),
    },
    {
      left: "Casual",
      right: "Dressed up",
      value: axis(blob, ["cafe", "bowl", "neighbors", "weekday", "remote", "casual"], ["reserve", "special", "fine", "tasting", "confident"]),
    },
    {
      left: "Quiet",
      right: "Lively",
      value: axis(blob, ["quiet", "unhurried", "linger", "gentle", "precise"], ["loud", "party", "crowd", "buzz", "lively"]),
    },
    {
      left: "Simple plates",
      right: "Layered",
      value: axis(blob, ["plain", "simple", "short"], ["seasonal", "layered", "precise", "sensory", "herbs", "pacific"]),
    },
  ];
}

function hueName(hex: string) {
  const h = hex.replace("#", "");
  if (h.length < 6) return "Tone";
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (l < 0.18) return "Ink";
  if (l > 0.88) return "Paper";
  let hue = 0;
  const d = max - min;
  if (d === 0) return "Stone";
  switch (max) {
    case r:
      hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
      break;
    case g:
      hue = ((b - r) / d + 2) * 60;
      break;
    default:
      hue = ((r - g) / d + 4) * 60;
  }
  if (hue < 20 || hue >= 345) return "Chile";
  if (hue < 45) return "Citrus";
  if (hue < 75) return "Leaf";
  if (hue < 160) return "Herb";
  if (hue < 200) return "Sea";
  if (hue < 255) return "Dusk";
  return "Spice";
}

export function lifestyleColours(colours: BrandColours) {
  const roles = ["Main colour", "Soft partner", "Spark", "Light", "Warm paper", "Ink"];
  const hexes = [colours.primary, colours.secondary, colours.accent, ...colours.neutrals];
  return hexes.map((hex, i) => ({
    hex,
    name: hueName(hex),
    role: roles[i] ?? "Tone",
  }));
}

export function firstSentence(text: string | null | undefined) {
  if (!text) return "";
  const m = text.trim().match(/^[^.!?]+[.!?]?/);
  return m ? m[0].trim() : text.trim();
}
