import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    /^\/invite(?:\/.*)?/,
    '/',
    /^\/scan\/.*/,
    /^\/api\/public\/.*/,
    '/contact',
    '/privacy',
  ],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
