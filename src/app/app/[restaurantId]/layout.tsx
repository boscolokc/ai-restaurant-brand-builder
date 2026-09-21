"use client";

import { useParams } from "next/navigation";
import { AppShell } from "@/components/shell";
import type { ReactNode } from "react";

export default function RestaurantLayout({ children }: { children: ReactNode }) {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  return <AppShell restaurantId={restaurantId}>{children}</AppShell>;
}
