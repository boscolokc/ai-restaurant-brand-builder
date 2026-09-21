"use client";

import { AccountChrome } from "@/components/shell";
import { Badge, Button, Card, Field, Input } from "@/components/ui";
import { useAppStore } from "@/lib/mock/store";

export default function SettingsPage() {
  const { snapshot, reset } = useAppStore();
  return (
    <AccountChrome>
      <h1 className="font-display text-4xl">Account settings</h1>
      <p className="mt-2 text-sm text-ink-soft">Demo account. Billing is a stub for Phase 1.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="space-y-4 p-6">
          <h2 className="font-display text-2xl">Profile</h2>
          <Field label="Name">
            <Input defaultValue={snapshot.user.name ?? ""} readOnly />
          </Field>
          <Field label="Email">
            <Input defaultValue={snapshot.user.email} readOnly />
          </Field>
          <Field label="Account">
            <Input defaultValue={snapshot.account.name} readOnly />
          </Field>
        </Card>
        <Card className="p-6">
          <Badge tone="gold">Billing stub</Badge>
          <h2 className="mt-3 font-display text-2xl">Plan</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Kitchen plan · multi-restaurant. Stripe is out of scope. Nothing will be charged.
          </p>
          <div className="mt-6 rounded-xl bg-paper-2 p-4 text-sm">
            Next invoice · never · $0
          </div>
        </Card>
        <Card className="p-6 md:col-span-2">
          <h2 className="font-display text-2xl">Demo data</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Onboarding progress is saved in this browser. Reset to restore Harbor Table (complete), Little Lime
            (Brand DNA review), and 见您一面 / Meet U 1 Face (approved DNA + calendar).
          </p>
          <Button className="mt-4" variant="outline" onClick={reset}>
            Reset demo data
          </Button>
        </Card>
      </div>
    </AccountChrome>
  );
}
