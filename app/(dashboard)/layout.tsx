import Sidebar from '@/components/Sidebar/Sidebar'
import Header from '@/components/Header/Header'

export const metadata = {
  title: 'Gatekeeper',
  description: 'Gatekeeper by UNLV CS GANG',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid h-screen w-screen grid-cols-12">
      <div className="col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-9 bg-gray-100">
        <Header />
        <div className="px-10">{children}</div>
      </div>
    </div>
  )
}
