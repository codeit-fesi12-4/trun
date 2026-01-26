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

  const upstreamUrl = `${API_BASE_URL}${TEAM_NAME}/auths/signin`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });

    const data: UpstreamLoginResponse | null = await upstream.json().catch(() => null);

    if (!upstream.ok || !data?.token) {
      return NextResponse.json(
        { message: data?.["message"] ?? "로그인 실패" },
        { status: upstream.status || 401 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("api-token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1일
    });
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") {
      return NextResponse.json({ message: "Upstream timeout" }, { status: 504 });
    }
    return NextResponse.json({ message: "Upstream request failed" }, { status: 502 });
  } finally {
    clearTimeout(timeoutId);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
