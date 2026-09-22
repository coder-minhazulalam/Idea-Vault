import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  // Verify JWT / session token for private routes
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    return NextResponse.next();
  }

  // If not authenticated, redirect to login page with callbackUrl
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "callbackUrl",
    request.nextUrl.pathname + request.nextUrl.search
  );

  return NextResponse.redirect(loginUrl);
}

// All private routes that require authentication
export const config = {
  matcher: [
    "/ideas/:id+",
    "/add-idea/:path*",
    "/my-ideas/:path*",
    "/my-interactions/:path*",
    "/profile/:path*",
    "/Profile/:path*",
  ],
};