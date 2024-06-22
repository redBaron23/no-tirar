import {
  NextMiddlewareWithAuth,
  NextRequestWithAuth,
} from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { isProtectedRoute, isUnprotectedRoute } from "./lib/utils";
import { pages } from "./constants/pages";

const withAuthRedirect = async (req: NextRequestWithAuth) => {
  const isAuthenticated = await getToken({
    req,
  });

  const currentPath = req.nextUrl.pathname;

  //   Authenticated users default page
  if (isAuthenticated && isUnprotectedRoute(currentPath)) {
    return NextResponse.redirect(new URL(pages.discover, req.url));
  }

  return NextResponse.next();
};

const middleware: NextMiddlewareWithAuth = withAuthRedirect;

export default middleware;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
