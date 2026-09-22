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
  Menu,
  Plus,
  Settings,
  Share2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useAppStore, useRestaurant } from "@/lib/mock/store";
import { cn, NAV_ITEMS, STEP_TO_PATH } from "@/lib/utils";
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
    <Link href="/" className={cn("flex items-center gap-2 text-sm font-semibold tracking-tight text-ink", className)}>
      <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-xs font-semibold text-white">H</span>
      Hearth
    </Link>
  );
}

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
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
      Hearth — your AI restaurant branding & marketing team. Phase 1 scaffold.
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
        className="h-9 max-w-[10.5rem] truncate rounded-md border border-line bg-white px-2 text-sm sm:max-w-[16rem]"
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
    if (!restaurant.onboardingDone && !onOnboarding) {
      const step = STEP_TO_PATH[restaurant.onboardingStep] ?? "basics";
      router.replace(`/app/${restaurantId}/onboarding/${step}`);
    }
  }, [restaurant, pathname, restaurantId, router]);

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Restaurant not found</h1>
        <p className="mt-2 text-sm text-ink-soft">It may have been removed from this demo account.</p>
        <Button className="mt-6" asChild>
          <Link href="/app">Back to restaurants</Link>
        </Button>
      </div>
    );
  }

  const base = `/app/${restaurantId}`;
  const onboarding = pathname.includes("/onboarding");

  if (onboarding) {
    return (
      <div className="flex min-h-full flex-col">
        <header className="flex h-14 items-center justify-between border-b border-line bg-white px-4">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-soft sm:inline">{restaurant.name}</span>
            <RestaurantSwitcher currentId={restaurantId} />
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full">
      <aside className="hidden w-56 shrink-0 border-r border-line bg-white lg:flex lg:flex-col">
        <div className="flex h-14 items-center border-b border-line px-4">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-2 py-3">
          {NAV_ITEMS.map((item) => {
            const href = `${base}${item.href}`;
            const Icon = ICONS[item.icon];
            const active = item.href === "" ? pathname === base : pathname.startsWith(href);
            return (
              <Link
                key={item.label}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm",
                  active ? "bg-paper-2 font-medium text-ink" : "text-ink-soft hover:bg-paper-2 hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-2">
          <Link
            href="/app/settings"
            className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-ink-soft hover:bg-paper-2 hover:text-ink"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-line bg-white px-4">
          <button className="rounded-md p-1.5 text-ink hover:bg-paper-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
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
          <nav className="flex flex-wrap gap-1.5 border-b border-line bg-white px-4 py-3 lg:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={`${base}${item.href}`}
                className="rounded-md border border-line px-2.5 py-1 text-sm text-ink"
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
      <header className="flex h-14 items-center justify-between border-b border-line bg-white px-4">
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
