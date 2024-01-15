// app/layout.tsx
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gatekeeper',
  description: 'Gatekeeper by UNLV CS GANG',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className} suppressHydrationWarning={true}>
          <NextTopLoader color="#315D8D" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
