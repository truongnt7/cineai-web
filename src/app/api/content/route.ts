import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/types";

function resolveLocale(request: Request): Locale {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("locale") || defaultLocale;
  return isLocale(raw) ? raw : defaultLocale;
}

export async function GET(request: Request) {
  const locale = resolveLocale(request);
  const content = await getSiteContent(locale);
  return NextResponse.json({ locale, content });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      locale?: string;
      content?: SiteContent;
    };
    const locale = body.locale && isLocale(body.locale) ? body.locale : defaultLocale;
    if (!body.content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }
    await saveSiteContent(body.content, locale);
    return NextResponse.json({ ok: true, locale });
  } catch {
    return NextResponse.json({ error: "Unable to save content" }, { status: 400 });
  }
}
