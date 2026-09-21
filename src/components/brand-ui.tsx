import type { BrandDNA } from "@/lib/types";
import { Card } from "@/components/ui";

export function ColorSwatches({ colours }: { colours: NonNullable<BrandDNA["colours"]> }) {
  const all = [colours.primary, colours.secondary, colours.accent, ...colours.neutrals];
  return (
    <div className="flex flex-wrap gap-3">
      {all.map((hex) => (
        <div key={hex} className="text-center">
          <div className="h-14 w-14 rounded-2xl border border-line shadow-inner" style={{ background: hex }} />
          <p className="mt-1 font-mono text-[10px] text-ink-soft">{hex}</p>
        </div>
      ))}
    </div>
  );
}

export function BrandBoard({ dna }: { dna: BrandDNA }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="p-5 sm:p-6 lg:col-span-2">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">What you’re known for</p>
        <p className="mt-3 font-display text-3xl leading-snug">{dna.positioning}</p>
        <p className="mt-4 text-sm text-ink-soft">{dna.audience}</p>
        {dna.tagline ? (
          <p className="mt-6 inline-block border-t border-line pt-4 font-display text-xl italic">{dna.tagline}</p>
        ) : null}
      </Card>
      <Card className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">How you sound</p>
        <p className="mt-3 text-sm leading-relaxed">{dna.personality}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{dna.voice}</p>
      </Card>
      <Card className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Colours</p>
        {dna.colours ? <div className="mt-4"><ColorSwatches colours={dna.colours} /></div> : <p className="mt-3 text-sm text-ink-soft">No colours yet.</p>}
      </Card>
      <Card className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Fonts</p>
        <p className="mt-3 font-display text-3xl">{dna.typography?.heading ?? "Fraunces"}</p>
        <p className="mt-1 text-sm">{dna.typography?.body ?? "Outfit"}</p>
        <p className="mt-3 text-xs text-ink-soft">{dna.typography?.notes}</p>
      </Card>
      <Card className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">How to show up</p>
        <dl className="mt-3 space-y-3 text-sm">
          <div>
            <dt className="text-ink-soft">Photos</dt>
            <dd>{dna.photographyDirection}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Video</dt>
            <dd>{dna.videoDirection}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Graphics</dt>
            <dd>{dna.graphicStyle}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Buttons</dt>
            <dd>{dna.ctaStyle}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
