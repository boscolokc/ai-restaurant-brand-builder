import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { MarketingFooter, MarketingHeader } from "@/components/shell";

const plans = [
  {
    name: "Kitchen",
    price: "$179",
    note: "/month, one restaurant",
    points: ["Brand DNA + kit", "Mobile website", "12 social creatives", "4 video storyboards", "30-day plan"],
  },
  {
    name: "Group",
    price: "$129",
    note: "/restaurant after the first",
    points: ["Multi-restaurant account", "Shared team login", "Asset library per site", "Campaigns (soon)", "Social publishing (soon)"],
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Pricing</p>
        <h1 className="mt-2 font-display text-5xl">Simple on purpose.</h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Billing is stubbed in Phase 1. These numbers are placeholders so the page feels real.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <Card key={p.name} className="p-8">
              <h2 className="font-display text-3xl">{p.name}</h2>
              <p className="mt-4 font-display text-4xl">{p.price}</p>
              <p className="text-sm text-ink-soft">{p.note}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {p.points.map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link href="/signup">Try the demo</Link>
              </Button>
            </Card>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
