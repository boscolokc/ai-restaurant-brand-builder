import Link from "next/link";
import { Button } from "@/components/ui";
import { MarketingFooter, MarketingHeader } from "@/components/shell";

const steps = [
  {
    n: "01",
    title: "Show us the restaurant",
    copy: "A few photos, the name, and how you cook. No brand questionnaire.",
  },
  {
    n: "02",
    title: "Review your Brand DNA",
    copy: "Positioning, voice, colour, type, and how photos and video should feel. You approve before anything ships.",
  },
  {
    n: "03",
    title: "Get a starter package",
    copy: "Brand kit, mobile site, social kit, 12 posts, 4 video storyboards, menu assets, Google copy, and a 30-day plan.",
  },
];

export default function MarketingHome() {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-medium text-ink-soft">For independent restaurants</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Your AI restaurant branding & marketing team.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
              Hearth turns food photos and a little context into Brand DNA — then a consistent starter package. Not a
              generic poster generator.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/signup">Open the demo kitchen</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">See what’s included</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-ink-soft">Demo account · three restaurants · no API keys required.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-white p-6 sm:row-span-2">
              <p className="text-xs font-medium text-ink-soft">Harbor Table · Portland</p>
              <p className="mt-8 text-3xl font-semibold tracking-tight">Come in from the weather.</p>
              <p className="mt-6 text-sm text-ink-soft">Approved Brand DNA · starter package ready</p>
            </div>
            <div className="rounded-lg border border-line bg-white p-6">
              <p className="text-xs font-medium text-ink-soft">Little Lime · Austin</p>
              <p className="mt-4 text-xl font-semibold tracking-tight">Bright bowls. Quiet heat.</p>
            </div>
            <div className="rounded-lg border border-line bg-white p-6">
              <p className="text-xs font-medium text-ink-soft">Starter package</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                12 socials · 4 videos · site · menu · Google copy · 30-day calendar
              </p>
            </div>
          </div>
        </section>
        <section className="border-y border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <p className="text-sm font-medium text-ink-soft">{s.n}</p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
