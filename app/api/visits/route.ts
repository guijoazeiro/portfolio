import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const VISITS_KEY = "portfolio:visits";
const VISIT_COOKIE = "portfolio_visit_counted";
const VISIT_COOKIE_MAX_AGE = 60 * 60 * 24;

let missingRedisWarningLogged = false;

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getRedisCredentials() {
  const redisUrl =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const redisToken =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();

  if (!redisUrl || !redisToken) return null;

  return { redisUrl, redisToken };
}

// In Vercel, add both UPSTASH_REDIS_REST_* values to the project environment.
function getRedisClient() {
  const credentials = getRedisCredentials();
  if (credentials) {
    return new Redis({
      url: credentials.redisUrl,
      token: credentials.redisToken,
    });
  }

  if (process.env.NODE_ENV === "development" && !missingRedisWarningLogged) {
    console.warn("[visits] Redis is not configured; the visit counter is hidden.");
    missingRedisWarningLogged = true;
  }

  return null;
}

function hasVisitCookie(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return cookieHeader
    .split(";")
    .some((cookie) => cookie.trim().startsWith(`${VISIT_COOKIE}=`));
}

function normalizeTotal(value: number | string | null) {
  const total = typeof value === "string" ? Number(value) : value;
  return typeof total === "number" && Number.isFinite(total) && total > 0
    ? total
    : null;
}

function jsonResponse(total: number | null) {
  return NextResponse.json(
    { total },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}

export async function GET(request: Request) {
  const redis = getRedisClient();
  if (!redis) return jsonResponse(null);

  const counted = hasVisitCookie(request);
  const shouldIncrement = process.env.NODE_ENV === "production" && !counted;

  try {
    const rawTotal = shouldIncrement
      ? await redis.incr(VISITS_KEY)
      : await redis.get<number | string>(VISITS_KEY);
    const total = normalizeTotal(rawTotal);
    const response = jsonResponse(total);

    if (total !== null && shouldIncrement) {
      response.cookies.set({
        name: VISIT_COOKIE,
        value: "1",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: VISIT_COOKIE_MAX_AGE,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[visits] Redis request failed; the visit counter is hidden.", error);
    }
    return jsonResponse(null);
  }
}
