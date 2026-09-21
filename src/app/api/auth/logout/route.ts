import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/", request.url), { status: 303 });
  res.cookies.set("hearth_session", "", { path: "/", maxAge: 0 });
  return res;
}
