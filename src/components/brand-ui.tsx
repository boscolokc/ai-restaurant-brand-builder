import type { BrandDNA } from "@/lib/types";
import { Badge, Card } from "@/components/ui";

export function ColorSwatches({ colours }: { colours: NonNullable<BrandDNA["colours"]> }) {
  const all = [colours.primary, colours.secondary, colours.accent, ...colours.neutrals];
  return (
    <div className="flex flex-wrap gap-3">
      {all.map((hex) => (
        <div key={hex} className="text-center">
          <div className="h-14 w-14 rounded-md border border-line" style={{ background: hex }} />
          <p className="mt-1 font-mono text-[10px] text-ink-soft">{hex}</p>
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
  if (!cn && !enLong) return null;
  return { cn, enLong, persona };
}

function pandaOnly(dna: BrandDNA) {
  const locks = dna.rawAnalysis?.locks;
  if (!locks || typeof locks !== "object") return false;
  return (locks as { chefFaceIp?: string }).chefFaceIp === "talent-only";
}

export function BrandBoard({ dna }: { dna: BrandDNA }) {
  const names = readNameStack(dna);
  return (
    <div className="brand-surface">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Brand profile</p>
        {names?.cn ? <Badge tone="gold">{names.cn}</Badge> : null}
        {pandaOnly(dna) ? <Badge>Mode B · panda only</Badge> : null}
      </div>
      {names?.cn ? (
        <p className="font-display text-4xl leading-tight">{names.cn}</p>
      ) : null}
      {names?.enLong ? <p className="mt-1 text-sm text-ink-soft">{names.enLong}</p> : null}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Positioning</p>
          <p className="mt-3 font-display text-3xl leading-snug">{dna.positioning}</p>
          <p className="mt-4 text-sm text-ink-soft">{dna.audience}</p>
          {dna.tagline ? (
            <p className="mt-6 inline-block border-t border-line pt-4 font-display text-xl italic">{dna.tagline}</p>
          ) : null}
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Voice & personality</p>
          <p className="mt-3 text-sm leading-relaxed">{dna.personality}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{dna.voice}</p>
          {names?.persona ? <p className="mt-3 text-sm">Persona · {names.persona}</p> : null}
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Colour</p>
          {dna.colours ? (
            <div className="mt-4">
              <ColorSwatches colours={dna.colours} />
            </div>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">No colours yet.</p>
          )}
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Typography</p>
          <p className="mt-3 font-display text-3xl">{dna.typography?.heading ?? "Display"}</p>
          <p className="mt-1 text-sm">{dna.typography?.body ?? "Body"}</p>
          <p className="mt-3 text-xs text-ink-soft">{dna.typography?.notes}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">How to show up</p>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-ink-soft">Photography</dt>
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
              <dt className="text-ink-soft">Calls to action</dt>
              <dd>{dna.ctaStyle}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
