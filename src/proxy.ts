import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function buildRedirectToLogin(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname + search);
  return NextResponse.redirect(loginUrl);
}

function getSafeRedirectParam(request: NextRequest): string | null {
  const redirect = request.nextUrl.searchParams.get("redirect");
  if (!redirect) return null;
  if (redirect.startsWith("/") && !redirect.startsWith("//")) {
    if (redirect === "/login" || redirect === "/signup") return null;
    return redirect;
  }
  return null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("api-token")?.value;
  const isLoggedIn = Boolean(token);

  // 보호 페이지 : 로그인 필요  (로그인페이지로 이동)
  const isProtected = pathname.startsWith("/mypage") || pathname.startsWith("/moim-favorite");

  if (isProtected && !isLoggedIn) {
    return buildRedirectToLogin(request);
  }

  // 게스트 전용 페이지 : 로그인, 회원가입 (회원은 홈으로 이동)
  const isGuestOnly = pathname === "/login" || pathname === "/signup";

  if (isGuestOnly && isLoggedIn) {
    const safeRedirect = getSafeRedirectParam(request);
    const dest = safeRedirect ?? "/"; // 기본은 홈
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/moim-favorite/:path*", "/login", "/signup"],
};
