import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL, TEAM_NAME } from "@/constants/env";

async function proxy(req: Request, method: string, pathParts: string[]) {
  const incomingUrl = new URL(req.url);
  const upstreamUrl = new URL(`${API_BASE_URL}${TEAM_NAME}/${pathParts.join("/")}`);

  upstreamUrl.search = incomingUrl.search; // query 전달

  const contentType = req.headers.get("content-type") ?? "";
  const hasBody = !["GET", "HEAD"].includes(method);

  // HttpOnly 쿠키에서 토큰 읽기 (서버 사이드에서만 가능)
  const cookieStore = await cookies();
  const token = cookieStore.get("api-token")?.value;

  const upstream = await fetch(upstreamUrl.toString(), {
    method,
    headers: {
      // 쿠키에서 읽은 토큰을 Authorization 헤더에 추가
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      Accept: req.headers.get("accept") ?? "application/json",
      ...(contentType ? { "Content-Type": contentType } : {}),
    },
    body: hasBody ? await req.arrayBuffer() : undefined, // JSON/FormData 모두 전달 가능
    cache: "no-store",
  });

  const resContentType = upstream.headers.get("content-type") ?? "";
  const body = resContentType.includes("application/json")
    ? await upstream.json().catch(() => null)
    : await upstream.text().catch(() => "");

  return NextResponse.json(body, { status: upstream.status });
}

export async function GET(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return proxy(req, "GET", path);
}
export async function POST(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return proxy(req, "POST", path);
}
export async function PUT(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return proxy(req, "PUT", path);
}
export async function DELETE(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return proxy(req, "DELETE", path);
}
