import Link from "next/link";
import type { BrandDNA } from "@/lib/types";
import { Badge, Card } from "@/components/ui";

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
  if (!cn && !enLong) return null;
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

function SteamMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className="h-14 w-14 text-coral">
      <path
        d="M18 40c0-8 6-14 14-14s14 6 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M16 44h32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M24 28c1-4 2-6 2-8M32 26c1-5 2-8 2-11M40 28c1-4 2-6 2-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M28 46c2 3 6 3 8 0"
        fill="none"
        stroke="#c45c26"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
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

export function BrandBoard({ dna }: { dna: BrandDNA }) {
  const names = readNameStack(dna);
  const chips = traitChips(dna.personality);
  const face = chefFaceIp(dna);
  return (
    <div className="brand-moment overflow-hidden rounded-[20px] border border-moment-border">
      <section className="bg-hero px-6 py-10 sm:px-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-coral">Your brand profile</p>
            <SteamMark />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {face === "talent-only" ? <Badge>Mode B · panda only</Badge> : null}
            {face === "owned-brand-ip" ? <Badge tone="gold">Mode B · chef face</Badge> : null}
          </div>
        </div>
        <h2 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">{names?.cn ?? dna.tagline}</h2>
        {names?.enLong ? <p className="mt-2 text-sm text-moment-muted">{names.enLong}</p> : null}
        {dna.tagline ? <p className="font-display mt-6 max-w-xl text-2xl italic leading-snug">{dna.tagline}</p> : null}
        <div className="mt-6 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-moment-border bg-white/80 px-3 py-1.5 text-sm text-moment-fg"
            >
              {chip}
            </span>
          ))}
          {names?.persona ? (
            <span className="rounded-full bg-soft px-3 py-1.5 text-sm text-moment-fg">{names.persona}</span>
          ) : null}
        </div>
      </section>

      <section className="bg-mint px-6 py-10 sm:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-olive">How you show up</p>
        <p className="font-display mt-3 max-w-2xl text-3xl leading-snug">{dna.positioning}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-moment-fg">{dna.audience}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-moment-muted">{dna.personality}</p>
      </section>

      <section className="bg-lavender px-6 py-10 sm:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-moment-muted">Voice</p>
        <Card className="mt-4 max-w-2xl border-moment-border bg-moment-card p-6">
          <p className="text-xs font-medium text-moment-muted">Sample guest-facing line</p>
          <p className="font-display mt-3 text-2xl leading-snug">{dna.tagline}</p>
          <p className="mt-4 text-base leading-relaxed">{dna.voice}</p>
        </Card>
      </section>

      <section className="bg-peach px-6 py-10 sm:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-terracotta">Look & feel</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Card className="border-moment-border bg-moment-card p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-moment-muted">Colour</p>
            {dna.colours ? (
              <div className="mt-4">
                <ColorSwatches colours={dna.colours} />
              </div>
            ) : (
              <p className="mt-3 text-sm text-moment-muted">No colours yet.</p>
            )}
          </Card>
          <Card className="border-moment-border bg-moment-card p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-moment-muted">Typography</p>
            <p className="font-display mt-3 text-3xl">{dna.typography?.heading ?? "Display"}</p>
            <p className="mt-1 text-sm">{dna.typography?.body ?? "Body"}</p>
            <p className="mt-3 text-xs text-moment-muted">{dna.typography?.notes}</p>
          </Card>
          <Card className="border-moment-border bg-moment-card p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-moment-muted">Photos, video, graphics</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-moment-muted">Photography</dt>
                <dd>{dna.photographyDirection}</dd>
              </div>
              <div>
                <dt className="text-moment-muted">Video</dt>
                <dd>{dna.videoDirection}</dd>
              </div>
              <div>
                <dt className="text-moment-muted">Graphics</dt>
                <dd>{dna.graphicStyle}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </section>
    </div>
  );
}
