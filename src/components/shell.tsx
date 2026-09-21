"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  Globe,
  Home,
  Images,
  LogOut,
  Megaphone,
  Plus,
  Settings,
  Share2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useAppStore, useRestaurant } from "@/lib/mock/store";
import { cn, NAV_ITEMS } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";

const ICONS = {
  home: Home,
  sparkles: Sparkles,
  plus: Plus,
  calendar: CalendarDays,
  globe: Globe,
  images: Images,
  megaphone: Megaphone,
  share: Share2,
};

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-display text-xl tracking-tight", className)}>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[15px] text-paper">H</span>
      Hearth
    </Link>
  );
}

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-ink-soft sm:flex">
          <Link href="/pricing" className="hover:text-ink">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-ink">
            Log in
          </Link>
          <Button asChild size="sm">
            <Link href="/signup">Start with a demo</Link>
          </Button>
        </nav>
        <Button asChild size="sm" className="sm:hidden">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="mt-auto border-t border-line py-8 text-center text-xs text-ink-soft">
      Hearth — your AI restaurant branding & marketing team.
    </footer>
  );
}

export function RestaurantSwitcher({ currentId }: { currentId?: string }) {
  const { snapshot } = useAppStore();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="restaurant-switcher">
        Restaurant
      </label>
      <select
        id="restaurant-switcher"
        className="h-11 min-h-11 max-w-[180px] rounded-full border border-line bg-white px-3 text-sm"
        value={currentId ?? "switch"}
        onChange={(e) => {
          const id = e.target.value;
          if (id === "switch") {
            router.push("/app");
            return;
          }
          router.push(`/app/${id}`);
        }}
      >
        {snapshot.restaurants.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
        <option value="switch">All restaurants…</option>
      </select>
    </div>
  );
}

export function AppShell({ restaurantId, children }: { restaurantId: string; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const restaurant = useRestaurant(restaurantId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!restaurant) return;
    const onOnboarding = pathname.includes("/onboarding");
    const onHome = pathname === `/app/${restaurantId}` || pathname === `/app/${restaurantId}/`;
    if (!restaurant.onboardingDone && !onOnboarding && !onHome) {
      router.replace(`/app/${restaurantId}`);
    }
  }, [restaurant, pathname, restaurantId, router]);

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl">Restaurant not found</h1>
        <p className="mt-2 text-sm text-ink-soft">It may have been removed from this demo account.</p>
        <Button className="mt-6" asChild>
          <Link href="/app">Back to restaurants</Link>
        </Button>
      </div>
    );
  }

  const base = `/app/${restaurantId}`;
  const onboarding = pathname.includes("/onboarding");
  const setupIncomplete = !restaurant.onboardingDone;

  if (onboarding || setupIncomplete) {
    const reveal = pathname.includes("/onboarding/brand-dna");
    return (
      <div className="flex h-dvh min-h-0 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:h-16">
          <Link href={`/app/${restaurantId}`} className="flex items-center gap-2 font-display text-lg tracking-tight sm:text-xl">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[15px] text-paper">H</span>
            Hearth
          </Link>
          <Link href="/app" className="inline-flex min-h-11 items-center px-2 text-sm text-ink-soft hover:text-ink">
            All kitchens
          </Link>
        </header>
        <main
          className={cn(
            "mx-auto min-h-0 w-full flex-1 overflow-y-auto px-4 py-6",
            reveal ? "max-w-3xl sm:max-w-4xl sm:py-8" : "max-w-xl sm:max-w-2xl sm:py-10",
          )}
        >
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full">
      <aside className="hidden w-60 shrink-0 border-r border-line bg-white/50 lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-5">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const href = `${base}${item.href}`;
            const Icon = ICONS[item.icon];
            const active = item.href === "" ? pathname === base : pathname.startsWith(href);
            return (
              <Link
                key={item.label}
                href={href}
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-xl px-3 py-2.5 text-sm",
                  active ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-2 hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-3">
          <Link
            href="/app/settings"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-paper-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-paper/90 px-4 backdrop-blur">
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Open menu">
            <span className="font-display text-lg">Hearth</span>
          </button>
          <div className="hidden text-sm text-ink-soft lg:block">
            {restaurant.city ? `${restaurant.cuisine} · ${restaurant.city}` : restaurant.cuisine}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <RestaurantSwitcher currentId={restaurantId} />
            <Button size="sm" asChild>
              <Link href={`${base}/create`}>
                <Plus className="h-4 w-4" />
                Create content
              </Link>
            </Button>
            <form action="/api/auth/logout" method="post">
              <Button variant="ghost" size="sm" type="submit" aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </header>
        {open ? (
          <nav className="flex flex-wrap gap-2 border-b border-line bg-white px-4 py-3 lg:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={`${base}${item.href}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
        <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}

export function AccountChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex h-16 items-center justify-between border-b border-line px-4">
        <Logo />
        <div className="flex items-center gap-3 text-sm">
          <Link href="/app" className="text-ink-soft hover:text-ink">
            Restaurants
          </Link>
          <Link href="/app/settings" className="text-ink-soft hover:text-ink">
            Settings
          </Link>
          <form action="/api/auth/logout" method="post">
            <Button variant="ghost" size="sm" type="submit">
              Log out
            </Button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
    </div>
  );
}
