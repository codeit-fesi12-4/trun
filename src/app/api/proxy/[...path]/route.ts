import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL, TEAM_NAME } from "@/constants/env";

async function proxy(req: Request, method: string, pathParts: string[]) {
  const incomingUrl = new URL(req.url);
  const upstreamUrl = new URL(`${API_BASE_URL}${TEAM_NAME}/${pathParts.join("/")}`);

  upstreamUrl.search = incomingUrl.search;

  const contentType = req.headers.get("content-type") ?? "";
  const hasBody = !["GET", "HEAD"].includes(method);

  const cookieStore = await cookies();
  const token = cookieStore.get("api-token")?.value;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const upstream = await fetch(upstreamUrl.toString(), {
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: req.headers.get("accept") ?? "application/json",
        ...(contentType ? { "Content-Type": contentType } : {}),
      },
      body: hasBody ? await req.arrayBuffer() : undefined, // JSON/FormData 모두 전달 가능
      cache: "no-store",
      signal: controller.signal,
    });

    const resContentType = upstream.headers.get("content-type") ?? "";
    const body = resContentType.includes("application/json")
      ? await upstream.json().catch(() => null)
      : await upstream.text().catch(() => "");

    if (upstream.status === 401 && typeof body === "object") {
      const code = body?.errors?.[0]?.code ?? body?.code;

      if (code === "INVALID_TOKEN") {
        const res = NextResponse.json(body, { status: 401 });
        res.cookies.set("api-token", "", { path: "/", maxAge: 0 });
        return res;
      }
    }

    return NextResponse.json(body, { status: upstream.status });
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") {
      return NextResponse.json({ message: "Upstream timeout" }, { status: 504 });
    }
    return NextResponse.json({ message: "Upstream request failed" }, { status: 502 });
  } finally {
    clearTimeout(timeoutId);
  }
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
