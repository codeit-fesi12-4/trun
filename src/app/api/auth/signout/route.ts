import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL, TEAM_NAME } from "@/constants/env";

export async function POST() {
  const upstreamUrl = `${API_BASE_URL}${TEAM_NAME}/auths/signout`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3_000);

  try {
    await fetch(upstreamUrl, {
      method: "POST",
      signal: controller.signal,
    });
  } catch {
    // ❗ 의도적으로 무시
    // 로그아웃은 "best-effort"
  } finally {
    clearTimeout(timeoutId);
  }

  const cookieStore = await cookies();
  cookieStore.delete("api-token");

  return NextResponse.json({ ok: true }, { status: 200 });
}
