import Link from "next/link";
import type { BrandDNA, Restaurant } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  brandTypeName,
  firstSentence,
  inkOn,
  lifestyleColours,
  personalityChips,
  traitMeters,
} from "@/lib/brand-profile";
import { Camera, Clapperboard, PencilLine } from "lucide-react";

export function ColorSwatches({ colours }: { colours: NonNullable<BrandDNA["colours"]> }) {
  const all = [colours.primary, colours.secondary, colours.accent, ...colours.neutrals];
  return (
    <div className="flex flex-wrap gap-3">
      {all.map((hex) => (
        <div key={hex} className="text-center">
          <div className="h-14 w-14 rounded-md border border-moment-border" style={{ background: hex }} />
          <p className="mt-1 font-mono text-[10px] text-moment-muted">{hex}</p>
        </div>
      ))}
    </div>
  );
}

function readNameStack(dna: BrandDNA) {
  const raw = dna.rawAnalysis?.nameStack;
  if (!raw || typeof raw !== "object") return null;
  const stack = raw as Record<string, unknown>;
  const cn = typeof stack.cn === "string" ? stack.cn : null;
  const enLong = typeof stack.enLong === "string" ? stack.enLong : null;
  const persona = typeof stack.persona === "string" ? stack.persona : null;
  if (!cn && !enLong && !persona) return null;
  return { cn, enLong, persona };
}

function chefFaceIp(dna: BrandDNA) {
  const locks = dna.rawAnalysis?.locks;
  if (!locks || typeof locks !== "object") return null;
  const value = (locks as { chefFaceIp?: string }).chefFaceIp;
  return value ?? null;
}

function traitChips(personality: string | null) {
  if (!personality) return [];
  const head = personality.split(";")[0] ?? personality;
  return head
    .split(/[·,]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export function BrandStrip({ dna, href }: { dna: BrandDNA; href?: string }) {
  const names = readNameStack(dna);
  const chips = traitChips(dna.personality);
  return (
    <div className="brand-moment flex flex-col gap-4 rounded-2xl border border-moment-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-coral">Your brand profile</p>
        <p className="font-display mt-1 text-2xl leading-tight">{names?.cn ?? dna.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-moment-border bg-moment-card px-3 py-1 text-sm text-moment-fg"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-[14px] bg-terracotta px-4 text-sm font-medium text-white hover:opacity-90"
        >
          View brand profile
        </Link>
      ) : null}
    </div>
  );
}

function TraitMeterRow({ left, right, value }: { left: string; right: string; value: number }) {
  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between gap-3 text-sm font-medium">
        <span>{left}</span>
        <span className="text-ink-soft">{right}</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/70">
        <div className="h-full rounded-full bg-ink/80 transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function LifestyleBlocks({ colours }: { colours: NonNullable<BrandDNA["colours"]> }) {
  const entries = lifestyleColours(colours);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {entries.map((c) => (
        <div
          key={`${c.hex}-${c.role}`}
          className="flex min-h-36 flex-col justify-end rounded-3xl p-4 sm:min-h-44"
          style={{ background: c.hex, color: inkOn(c.hex) }}
        >
          <p className="font-display text-2xl leading-none">{c.name}</p>
          <p className="mt-2 text-sm opacity-80">{c.role}</p>
        </div>
      ))}
    </div>
  );
}

export function BrandResults({
  dna,
  restaurant,
  className,
}: {
  dna: BrandDNA;
  restaurant?: Restaurant | null;
  className?: string;
}) {
  const typeName = brandTypeName(dna, restaurant);
  const names = readNameStack(dna);
  const face = chefFaceIp(dna);
  const primary = dna.colours?.primary ?? "#2f4a32";
  const onPrimary = inkOn(primary);
  const chips = personalityChips(dna);
  const meters = traitMeters(dna, restaurant);
  const blurb = firstSentence(dna.positioning);

  return (
    <article className={cn("brand-type overflow-hidden rounded-[2rem]", className)}>
      <section
        className="relative overflow-hidden px-5 py-14 text-center sm:px-10 sm:py-20"
        style={{ background: primary, color: onPrimary }}
      >
        <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-black/10" />
        <p className="relative text-sm font-medium tracking-[0.22em] uppercase opacity-80">
          {restaurant?.name ?? names?.cn ?? "Brand profile"}
        </p>
        <h1 className="relative mt-4 font-display text-5xl leading-[1.05] sm:text-7xl">{typeName}</h1>
        {names?.enLong ? (
          <p className="relative mt-3 text-sm tracking-[0.14em] uppercase opacity-80">{names.enLong}</p>
        ) : null}
        {dna.tagline ? (
          <p className="relative mx-auto mt-5 max-w-lg font-display text-xl italic sm:text-2xl">{dna.tagline}</p>
        ) : null}
        {blurb ? <p className="relative mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">{blurb}</p> : null}
        {chips.length ? (
          <ul className="relative mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2">
            {chips.map((chip) => (
              <li
                key={chip.label}
                className={cn(
                  "rounded-full px-4 py-2 text-sm",
                  chip.tone === "fill" ? "bg-white/15" : "border border-white/40",
                )}
              >
                {chip.label}
              </li>
            ))}
          </ul>
        ) : null}
        {face ? (
          <ul className="relative mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-2">
            <li className="rounded-full border border-white/40 px-4 py-2 text-sm">Mode A · panda</li>
            {face === "talent-only" ? (
              <li className="rounded-full border border-white/40 px-4 py-2 text-sm">Mode B · panda only</li>
            ) : null}
            {face === "owned-brand-ip" ? (
              <li className="rounded-full bg-white/15 px-4 py-2 text-sm">
                Mode B · {names?.persona ?? "chef"} face
              </li>
            ) : null}
          </ul>
        ) : null}
      </section>

      <section className="bg-sage px-5 py-12 sm:px-10 sm:py-16">
        <p className="text-sm font-medium tracking-[0.18em] text-ink-soft uppercase">How you show up</p>
        <h3 className="mt-2 font-display text-3xl sm:text-4xl">A few traits, not a spreadsheet</h3>
        <div className="mt-8 max-w-xl">
          {meters.map((m) => (
            <TraitMeterRow key={m.left} {...m} />
          ))}
        </div>
      </section>

      {dna.audience ? (
        <section className="bg-sand px-5 py-12 sm:px-10 sm:py-16">
          <p className="text-sm font-medium tracking-[0.18em] text-ink-soft uppercase">Who it’s for</p>
          <p className="mt-4 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">{dna.audience}</p>
          {dna.positioning && dna.positioning !== blurb ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">{dna.positioning}</p>
          ) : null}
        </section>
      ) : null}

      {dna.colours ? (
        <section className="bg-paper px-5 py-12 sm:px-10 sm:py-16">
          <p className="text-sm font-medium tracking-[0.18em] text-ink-soft uppercase">Colours as a feeling</p>
          <h3 className="mt-2 font-display text-3xl sm:text-4xl">Blocks you can live in</h3>
          <div className="mt-8">
            <LifestyleBlocks colours={dna.colours} />
          </div>
          {dna.typography ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-ink-soft">Headlines</p>
                <p className="mt-1 font-display text-4xl">{dna.typography.heading}</p>
              </div>
              <div>
                <p className="text-sm text-ink-soft">Everyday words</p>
                <p className="mt-1 text-2xl">{dna.typography.body}</p>
                {dna.typography.notes ? <p className="mt-2 text-sm text-ink-soft">{dna.typography.notes}</p> : null}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="bg-peach px-5 py-12 text-center sm:px-10 sm:py-16">
        <p className="text-sm font-medium tracking-[0.18em] text-ink-soft uppercase">How you sound</p>
        <blockquote className="mx-auto mt-5 max-w-2xl font-display text-2xl leading-snug sm:text-4xl">
          {dna.voice ?? "Short sentences. Warm, never salesy."}
        </blockquote>
        {dna.ctaStyle ? <p className="mx-auto mt-6 max-w-md text-base text-ink-soft">{dna.ctaStyle}</p> : null}
      </section>

      <section className="bg-lilac px-5 py-12 sm:px-10 sm:py-16">
        <p className="text-sm font-medium tracking-[0.18em] text-ink-soft uppercase">How to show up</p>
        <h3 className="mt-2 font-display text-3xl sm:text-4xl">A few notes for photos and film</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <GuidanceCard icon={Camera} title="Photos" body={dna.photographyDirection} tint="bg-white/70" />
          <GuidanceCard icon={Clapperboard} title="Video" body={dna.videoDirection} tint="bg-sky" />
          <GuidanceCard icon={PencilLine} title="Graphics" body={dna.graphicStyle} tint="bg-sage" />
        </div>
      </section>
    </article>
  );
}

function GuidanceCard({
  icon: Icon,
  title,
  body,
  tint,
}: {
  icon: typeof Camera;
  title: string;
  body: string | null;
  tint: string;
}) {
  return (
    <div className={cn("rounded-3xl p-6", tint)}>
      <Icon className="h-6 w-6 text-ink-soft" />
      <h4 className="mt-4 font-display text-2xl">{title}</h4>
      <p className="mt-3 text-base leading-relaxed text-ink">{body ?? "We’ll fill this in from your photos."}</p>
    </div>
  );
}
