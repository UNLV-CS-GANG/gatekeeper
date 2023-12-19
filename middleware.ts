import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/invite', '/', /^\/api\/public\/.*/],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
