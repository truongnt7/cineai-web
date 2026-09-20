import { promises as fs } from "fs";
import path from "path";
import { defaultLocale, isLocale, type Locale } from "./i18n";
import type { SiteContent } from "./types";

function contentPath(locale: Locale) {
  return path.join(process.cwd(), "content", `${locale}.json`);
}

export async function getSiteContent(locale: Locale = defaultLocale): Promise<SiteContent> {
  const file = contentPath(isLocale(locale) ? locale : defaultLocale);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveSiteContent(
  content: SiteContent,
  locale: Locale = defaultLocale,
): Promise<void> {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  await fs.writeFile(contentPath(locale), JSON.stringify(content, null, 2), "utf-8");
}
