import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware executed");

  const token = request.cookies.get("_session")?.value;

  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === "/";

  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/CheckInOut", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/CheckInOut/:path*",
    "/AddNumber/:path*",
    "/Promotion-Offer/:path*",
    "/Feedback/:path*",
  ],
};
