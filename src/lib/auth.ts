import { cookies } from "next/headers";

export const ADMIN_COOKIE = "cineai_admin_session";
const SESSION_VALUE = "authenticated";

export function getAdminPassword() {
  return process.env.CMS_ADMIN_PASSWORD || "cineai2026";
}

export async function isAuthenticated() {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === SESSION_VALUE;
}

export function sessionCookieValue() {
  return SESSION_VALUE;
}
