import { NextResponse } from "next/server";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/mock/seed";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/app");
  const demo = form.get("demo") === "1";

  if (!demo && email && password && email !== DEMO_EMAIL) {
    // Signup-or-login stub: any email is accepted in demo mode.
  } else if (!demo && password && password !== DEMO_PASSWORD && email === DEMO_EMAIL) {
    return NextResponse.redirect(new URL("/login?error=1", request.url), { status: 303 });
  }

  const url = new URL(next.startsWith("/") ? next : "/app", request.url);
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set("hearth_session", email || DEMO_EMAIL, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
