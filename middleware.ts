import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedRoutes = ["/dashboard", "/tracks"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const accessToken =
    request.cookies.get("sb-access-token")?.value ??
    request.cookies
      .getAll()
      .find((cookie) => cookie.name.includes("-auth-token"))
      ?.value;
  const isLoggedIn = Boolean(accessToken);
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
