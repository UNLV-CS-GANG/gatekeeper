import GuestHeader from '@/components/Header/GuestHeader'

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-screen w-screen">
      <div className="fixed top-0 w-full">
        <GuestHeader />
      </div>
      <div className="h-full px-10 pt-24">{children}</div>
    </div>
  )
}
