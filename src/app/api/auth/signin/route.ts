import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL, TEAM_NAME } from "@/constants/env";

type LoginBody = { email: string; password: string };
type UpstreamLoginResponse = { token?: string; [k: string]: unknown };

export async function POST(req: Request) {
  let body: LoginBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email || !body.password) {
    return NextResponse.json({ message: "email/password required" }, { status: 400 });
  }

  // 외부 백엔드 로그인 엔드포인트 (예시 경로는 프로젝트에 맞게 조정)
  const upstreamUrl = `${API_BASE_URL}${TEAM_NAME}/auths/signin`;

  const upstream = await fetch(upstreamUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data: UpstreamLoginResponse | null = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.token) {
    return NextResponse.json(
      { message: "잘못된 아이디나 비밀번호입니다." },
      { status: upstream.status || 401 },
    );
  }

  // httpOnly 쿠키 저장
  const cookieStore = await cookies();
  cookieStore.set("api-token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1일
  });

  // 필요하면 최소 정보만 내려줌(토큰은 절대 내려주지 않음)
  return NextResponse.json({ status: 200 });
}
