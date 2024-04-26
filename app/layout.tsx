// app/layout.tsx
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { cn } from '@/lib/cn'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gatekeeper',
  description: 'Gatekeeper by UNLV CS GANG',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={cn('antialiased', inter.className)} suppressHydrationWarning={true}>
          <NextTopLoader color="#315D8D" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
