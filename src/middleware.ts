import { NextRequest, NextResponse } from "next/server";
import { isValidAuth } from "./utils/isValidAuth";
import { removeServerCookie } from "./utils/removeServerCookie";

export async function middleware(request: NextRequest) {
  const { isAuth, newToken } = await isValidAuth(request);

  const returnAuth = NextResponse.redirect(new URL("/login", request.url));

  if (request.nextUrl.pathname.length === 1) {
    if (!isAuth) {
      removeServerCookie(returnAuth);
      return returnAuth;
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!isAuth) {
    removeServerCookie(returnAuth);
    return returnAuth;
  }

  const response = NextResponse.next();

  response.cookies.set("high.token", newToken);

  return response;
}

export const config = {
  matcher: ["/users/:path*", "/dashboard/:path*"],
};
