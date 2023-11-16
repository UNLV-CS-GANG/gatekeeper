// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gatekeeper',
  description: 'Gatekeeper by UNLV CS GANG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
