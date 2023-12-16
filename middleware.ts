import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/invite', '/qr'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
