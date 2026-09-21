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
  const primary = dna.colours?.primary ?? "#2f4a32";
  const onPrimary = inkOn(primary);
  const chips = personalityChips(dna);
  const meters = traitMeters(dna, restaurant);
  const blurb = firstSentence(dna.positioning);

  return (
    <article className={cn("overflow-hidden rounded-[2rem]", className)}>
      <section
        className="relative overflow-hidden px-5 py-14 text-center sm:px-10 sm:py-20"
        style={{ background: primary, color: onPrimary }}
      >
        <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-black/10" />
        <p className="relative text-sm font-medium tracking-[0.22em] uppercase opacity-80">
          {restaurant?.name ?? "Brand profile"}
        </p>
        <h1 className="relative mt-4 font-display text-5xl leading-[1.05] sm:text-7xl">{typeName}</h1>
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
            <ColorSwatches colours={dna.colours} />
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

/** @deprecated use BrandResults — kept as an alias for older imports */
export function BrandBoard({ dna, restaurant }: { dna: BrandDNA; restaurant?: Restaurant | null }) {
  return <BrandResults dna={dna} restaurant={restaurant} />;
}
