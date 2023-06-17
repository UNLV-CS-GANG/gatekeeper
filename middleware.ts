import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/inviteLink"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};