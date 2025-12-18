import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { API_BASE_URL, TEAM_NAME } from "@/constants/env";

async function proxy(req: Request, method: string, pathParts: string[]) {
  const session = await getServerSession(authOptions);

  const incomingUrl = new URL(req.url);
  const upstreamUrl = new URL(`${API_BASE_URL}${TEAM_NAME}/${pathParts.join("/")}`);

  upstreamUrl.search = incomingUrl.search; // query 전달

  const contentType = req.headers.get("content-type") ?? "";
  const hasBody = !["GET", "HEAD"].includes(method);

  const upstream = await fetch(upstreamUrl.toString(), {
    method,
    headers: {
      ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
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
