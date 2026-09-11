import { NextResponse } from "next/server";
import { createAuthToken, verifyPasscode } from "@/lib/showroomAuth";

// Simple in-memory rate limiter for failed attempts: ip -> { count, resetTime }
const failedAttempts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = failedAttempts.get(ip);
  if (!record) return false;

  if (now > record.resetTime) {
    failedAttempts.delete(ip);
    return false;
  }

  return record.count >= 5;
}

function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = failedAttempts.get(ip) || { count: 0, resetTime: now + 60 * 1000 };
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + 60 * 1000;
  } else {
    record.count += 1;
  }
  failedAttempts.set(ip, record);
}

function clearFailedAttempts(ip) {
  failedAttempts.delete(ip);
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many failed unlock attempts. Please wait 60 seconds." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { passcode } = body;

    if (!passcode || !verifyPasscode(passcode)) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { error: "Incorrect passcode. Please check with showroom administration." },
        { status: 401 }
      );
    }

    clearFailedAttempts(ip);

    const token = createAuthToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set("jewel_showroom_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Showroom auth error:", error);
    return NextResponse.json(
      { error: "An unexpected authentication error occurred." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, loggedOut: true });

  response.cookies.set("jewel_showroom_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
