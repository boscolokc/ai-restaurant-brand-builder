import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import type { StarterPackage } from "@/lib/types";
import {
  CalendarDays,
  Clapperboard,
  Globe,
  Images,
  LayoutTemplate,
  MapPin,
  Palette,
  Share2,
  UtensilsCrossed,
} from "lucide-react";

const ITEMS = [
  { key: "brandKitReady", label: "Brand kit", href: "brand/kit", icon: Palette, copy: "Colours, type, and rules" },
  { key: "websiteReady", label: "Mobile website", href: "website", icon: Globe, copy: "Section-based site" },
  { key: "socialKitReady", label: "Social kit", href: "social", icon: Share2, copy: "Profile covers & posts" },
  { key: "socialCreatives", label: "12 social creatives", href: "create/social", icon: LayoutTemplate, copy: "Review concepts" },
  { key: "videoConcepts", label: "4 video concepts", href: "create/video", icon: Clapperboard, copy: "Storyboards" },
  { key: "menuAssets", label: "Digital menu", href: "content", icon: UtensilsCrossed, copy: "Print + mobile" },
  { key: "googleBusiness", label: "Google Business copy", href: "content", icon: MapPin, copy: "Ready to paste" },
  { key: "calendarDays", label: "30-day content plan", href: "content", icon: CalendarDays, copy: "On the calendar" },
  { key: "assetCount", label: "Asset library", href: "assets", icon: Images, copy: "Uploads + generated" },
] as const;

export function StarterPackageGrid({
  restaurantId,
  starter,
}: {
  restaurantId: string;
  starter: StarterPackage;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const value = starter[item.key];
        const ready = typeof value === "boolean" ? value : Number(value) > 0;
        return (
          <Link key={item.key} href={`/app/${restaurantId}/${item.href}`}>
            <Card className="h-full p-5 transition hover:-translate-y-0.5 hover:border-ink/20">
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-paper-2">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge tone={ready ? "green" : "muted"}>{ready ? "Ready" : "Waiting"}</Badge>
              </div>
              <h3 className="mt-4 font-display text-xl">{item.label}</h3>
              <p className="mt-1 text-sm text-ink-soft">
                {item.copy}
                {typeof value === "number" ? ` · ${value}` : ""}
              </p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
