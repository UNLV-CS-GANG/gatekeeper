import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/invite', '/'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
