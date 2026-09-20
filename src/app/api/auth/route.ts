import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  getAdminPassword,
  isAuthenticated,
  sessionCookieValue,
} from "@/lib/auth";

export async function GET() {
  return NextResponse.json({ authenticated: await isAuthenticated() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string; action?: string };

  if (body.action === "logout") {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
    return response;
  }

  if (body.password !== getAdminPassword()) {
    return NextResponse.json({ error: "Mật khẩu không đúng" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, sessionCookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
