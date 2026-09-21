import Link from "next/link";
import { Button } from "@/components/ui";
import { MarketingFooter, MarketingHeader } from "@/components/shell";

const steps = [
  {
    n: "01",
    title: "A short quiz",
    copy: "Name, a few photos, optional hours. No brand questionnaire.",
    tint: "bg-sage",
  },
  {
    n: "02",
    title: "A results page",
    copy: "Your restaurant’s type, colours, and how you sound. You approve before we make posts.",
    tint: "bg-peach",
  },
  {
    n: "03",
    title: "Chapters to open",
    copy: "Website, social, videos, kit. One at a time — nothing posts itself.",
    tint: "bg-lilac",
  },
];

export default function MarketingHome() {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main>
        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <p className="text-sm font-medium tracking-[0.22em] text-accent uppercase">For independent restaurants</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-7xl">Find the restaurant’s type. Then make the work.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Hearth is a short quiz, then a brand profile — like personality results, not a marketing dashboard. You
            approve the page. We draft the kit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/signup">Try the demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See what’s included</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-ink-soft">Demo account · two restaurants · no API keys required.</p>
        </section>
        <section className="px-4 pb-16">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] bg-[#1f4e5a] p-8 text-[#f4efe6] md:min-h-80">
              <p className="text-sm tracking-[0.2em] uppercase text-[#c4a574]">Harbor Table</p>
              <p className="mt-6 font-display text-4xl sm:text-5xl">The Harbor Host</p>
              <p className="mt-4 font-display text-2xl italic">Come in from the weather.</p>
            </div>
            <div className="rounded-[2rem] bg-[#2f4a32] p-8 text-[#f7f4ec] md:min-h-80">
              <p className="text-sm tracking-[0.2em] uppercase text-[#c6d46a]">Little Lime</p>
              <p className="mt-6 font-display text-4xl sm:text-5xl">The Quiet Heat</p>
              <p className="mt-4 font-display text-2xl italic">Bright bowls. Quiet heat.</p>
            </div>
          </div>
        </section>
        <section className="px-4 pb-20">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className={`rounded-[2rem] p-7 ${s.tint}`}>
                <p className="font-display text-3xl text-ink-soft">{s.n}</p>
                <h2 className="mt-3 font-display text-2xl">{s.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-ink">{s.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
