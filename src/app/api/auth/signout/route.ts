import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL, TEAM_NAME } from "@/constants/env";

export async function POST() {
  const upstreamUrl = `${API_BASE_URL}${TEAM_NAME}/auths/signout`;

  await fetch(upstreamUrl, {
    method: "POST",
  });

  const cookieStore = await cookies();
  cookieStore.delete("api-token");

  return NextResponse.json({ ok: true }, { status: 200 });
}
