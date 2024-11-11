import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {


  const token = request.cookies.get("__session")?.value;
 

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/";

  if (!token) {
    if (!isLoginPage) {
  
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isLoginPage) {
   
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
