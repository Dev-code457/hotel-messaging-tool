import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware executed");

  const token = request.cookies.get("__session")?.value;
  console.log(`Token: ${token}, Pathname: ${request.nextUrl.pathname}`);

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/";

  if (!token) {
    if (!isLoginPage) {
      console.log("Redirecting to login page");
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isLoginPage) {
      console.log("Redirecting to AddNumber page");
      return NextResponse.redirect(new URL("/AddNumber", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/CheckInOut/:path*",
    "/AddNumber/:path*",
    "/Promotion-Offer/:path*",
    "/Feedback/:path*",
  ],
};
