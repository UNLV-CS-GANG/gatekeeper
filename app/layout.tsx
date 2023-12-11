// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '@/components/Sidebar/Sidebar'
import Header from '@/components/Header/Header'

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
          <div className="grid h-screen w-screen grid-cols-12">
            <div className="col-span-3">
              <Sidebar />
            </div>
            <div className="col-span-9 bg-gray-100">
              <Header />
              <div className="px-10">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
