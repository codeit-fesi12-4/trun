import { PROTECTED_PREFIXES } from "@/constants/routeGuard";

export function isProtectedRoute(pathname: string) {
  return PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
}
