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
    <Link href="/" className={cn("flex items-center gap-2 text-sm font-semibold tracking-tight text-shell-fg", className)}>
      <span className="grid h-7 w-7 place-items-center rounded-md bg-shell-accent text-xs font-semibold text-white">H</span>
      Hearth
    </Link>
  );
}

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-shell-border bg-shell">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-shell-muted sm:flex">
          <Link href="/pricing" className="hover:text-shell-fg">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-shell-fg">
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
    <footer className="mt-auto border-t border-shell-border py-8 text-center text-xs text-shell-muted">
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
        className="h-9 w-full min-w-0 max-w-[9rem] truncate rounded-md border border-shell-border bg-shell px-2 text-sm text-shell-fg sm:max-w-[16rem]"
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
        <p className="mt-2 text-sm text-shell-muted">It may have been removed from this demo account.</p>
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
        <header className="flex h-14 items-center justify-between border-b border-shell-border bg-shell px-4">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-shell-muted sm:inline">{restaurant.name}</span>
            <RestaurantSwitcher currentId={restaurantId} />
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full">
      <aside className="hidden w-56 shrink-0 border-r border-shell-border bg-shell lg:flex lg:flex-col">
        <div className="flex h-14 items-center border-b border-shell-border px-4">
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
                  active ? "bg-shell-subtle font-medium text-shell-fg" : "text-shell-muted hover:bg-shell-subtle hover:text-shell-fg",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-shell-border p-2">
          <Link
            href="/app/settings"
            className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-shell-muted hover:bg-shell-subtle hover:text-shell-fg"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-shell-border bg-shell px-4">
          <button
            type="button"
            className="rounded-md p-1.5 text-shell-fg hover:bg-shell-subtle lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden text-sm text-shell-muted lg:block">
            {restaurant.city ? `${restaurant.cuisine} · ${restaurant.city}` : restaurant.cuisine}
          </div>
          <div className="ml-auto flex min-w-0 items-center gap-2">
            <RestaurantSwitcher currentId={restaurantId} />
            <Button size="sm" className="shrink-0" asChild>
              <Link href={`${base}/create`}>
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create content</span>
                <span className="sm:hidden">Create</span>
              </Link>
            </Button>
            <form action="/api/auth/logout" method="post" className="hidden shrink-0 sm:block">
              <Button variant="ghost" size="sm" type="submit" aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </header>
        {open ? (
          <nav className="flex flex-wrap gap-1.5 border-b border-shell-border bg-shell px-4 py-3 lg:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={`${base}${item.href}`}
                className="rounded-md border border-shell-border px-2.5 py-1 text-sm text-shell-fg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/app/settings" className="rounded-md border border-shell-border px-2.5 py-1 text-sm text-shell-fg" onClick={() => setOpen(false)}>
              Settings
            </Link>
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="rounded-md border border-shell-border px-2.5 py-1 text-sm text-shell-fg">
                Log out
              </button>
            </form>
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
      <header className="flex h-14 items-center justify-between border-b border-shell-border bg-shell px-4">
        <Logo />
        <div className="flex items-center gap-3 text-sm">
          <Link href="/app" className="text-shell-muted hover:text-shell-fg">
            Restaurants
          </Link>
          <Link href="/app/settings" className="text-shell-muted hover:text-shell-fg">
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
