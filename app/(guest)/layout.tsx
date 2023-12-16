import GuestHeader from '@/components/Header/GuestHeader'

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 w-full">
        <GuestHeader />
      </div>
      <div className="h-full bg-gray-100 px-10 pt-24">{children}</div>
    </div>
  )
}
