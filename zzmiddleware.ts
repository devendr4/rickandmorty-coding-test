import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //redirect if cookie isn't found
  if (!request.cookies.get("logged"))
    return NextResponse.redirect(new URL("/login", request.url));
}
export const config = {
  matcher: ["/queries/:path*", "/create/:path*"],
};
