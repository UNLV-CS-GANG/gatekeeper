import GuestHeader from '@/components/Header/GuestHeader'

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <div className="fixed top-4 z-20 w-full">
        <GuestHeader />
      </div>
      <div className="z-0 h-full px-10 pt-24">{children}</div>
    </div>
  )
}
