import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    /^\/invite(?:\/.*)?/,
    '/qr',
    '/',
    /^\/scan\/.*/,
    /^\/api\/public\/.*/,
  ],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
