import Footer from '@/components/Footer/Footer'
import GuestHeader from '@/components/Header/GuestHeader'

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen overflow-x-hidden">
      <div className="z-0 h-full pt-24">
        <GuestHeader />
        {children}
        <Footer />
      </div>
    </div>
  )
}
