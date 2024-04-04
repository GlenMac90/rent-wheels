export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin",
    "/checkout",
    "/profile",
    "/search",
    "/cars/new",
    "/cars/:path*",
  ],
};
