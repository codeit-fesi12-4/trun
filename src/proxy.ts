import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);

  const redirectPath = pathname + request.nextUrl.search;
  loginUrl.searchParams.set("redirect", redirectPath);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/mypage/:path*", "/moim-favorite/:path*"],
};
