import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";

import { jwtUtils } from "@/utils/jwt";
import { getNewAccessToken } from "@/service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = ["/", "/services"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  //  console.log("Proxy Running...", pathname);

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const response = NextResponse.next();

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  /**
   * --------------------------------------
   * Refresh Access Token
   * --------------------------------------
   */
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success && result.data.accessToken) {
      accessToken = result.data.accessToken;

      response.cookies.set("accessToken", accessToken!, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }
    if (accessToken) {
      decodedAccessToken = jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET!,
      );
    }
  }

  /**
   * --------------------------------------
   * Invalid Token
   * --------------------------------------
   */
  if (!decodedAccessToken?.success) {
    response.cookies.delete("accessToken");
  }

  /**
   * --------------------------------------
   * User Role
   * --------------------------------------
   */

  let userRole: string | null = null;

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  console.log(decodedAccessToken);
console.log(userRole);

  /**
   * --------------------------------------
   * Public Route Check
   * --------------------------------------
   */

  const isPublicRoute =
    pathname === "/" ||
    PUBLIC_ROUTES.some(
      (route) =>
        route !== "/" &&
        (pathname === route || pathname.startsWith(route + "/")),
    );

  /**
   * --------------------------------------
   * Auth Route Check
   * --------------------------------------
   */

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  /**
   * --------------------------------------
   * Logged In User -> Login/Register
   * --------------------------------------
   */

  if (accessToken && isAuthRoute) {
    switch (userRole) {
      case "CUSTOMER":
        return NextResponse.redirect(new URL("/dashboard", request.url));

      case "TECHNICIAN":
        return NextResponse.redirect(
          new URL("/technician-dashboard", request.url),
        );

      case "ADMIN":
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));

      default:
        return NextResponse.redirect(new URL("/", request.url));
    }
  }

  /**
   * --------------------------------------
   * Private Route Protection
   * --------------------------------------
   */

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(loginUrl);
  }

  /**
   * --------------------------------------
   * Role Based Authorization
   * --------------------------------------
   */

  if (pathname.startsWith("/dashboard") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  if (
    pathname.startsWith("/technician-dashboard") &&
    userRole !== "TECHNICIAN"
  ) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
