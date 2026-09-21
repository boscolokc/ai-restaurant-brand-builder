import Link from "next/link";
import { Button, Card, Field, Input } from "@/components/ui";
import { Logo } from "@/components/shell";

export default function SignupPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md p-8">
        <Logo />
        <h1 className="mt-6 font-display text-3xl">Open a kitchen</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Auth is a stub. We’ll sign you into the seeded demo account so you can click through the product.
        </p>
        <form action="/api/auth/login" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="demo" value="1" />
          <Field label="Name">
            <Input name="name" defaultValue="Alex Nguyen" />
          </Field>
          <Field label="Email">
            <Input name="email" type="email" defaultValue="demo@hearth.app" />
          </Field>
          <Field label="Password">
            <Input name="password" type="password" defaultValue="demo" />
          </Field>
          <Button type="submit" className="w-full">
            Create account & enter demo
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Already have a seat?{" "}
          <Link href="/login" className="text-ink underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
