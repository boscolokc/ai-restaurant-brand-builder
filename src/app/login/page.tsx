import Link from "next/link";
import { Button, Card, Field, Input } from "@/components/ui";
import { Logo } from "@/components/shell";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/mock/seed";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const q = await searchParams;
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md p-8">
        <Logo />
        <h1 className="mt-6 font-display text-3xl">Welcome back</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Demo login: {DEMO_EMAIL} / {DEMO_PASSWORD}. Or continue without typing.
        </p>
        {q.error ? <p className="mt-3 text-sm text-accent">That password didn’t match the demo account.</p> : null}
        <form action="/api/auth/login" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="next" value={q.next ?? "/app"} />
          <Field label="Email">
            <Input name="email" type="email" defaultValue={DEMO_EMAIL} required />
          </Field>
          <Field label="Password">
            <Input name="password" type="password" defaultValue={DEMO_PASSWORD} required />
          </Field>
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
        <form action="/api/auth/login" method="post" className="mt-3">
          <input type="hidden" name="demo" value="1" />
          <input type="hidden" name="next" value={q.next ?? "/app"} />
          <Button type="submit" variant="outline" className="w-full">
            Continue with demo account
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-ink-soft">
          New here?{" "}
          <Link href="/signup" className="text-ink underline">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}
