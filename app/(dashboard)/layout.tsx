import Sidebar from '@/components/Sidebar/Sidebar'
import DashboardHeader from '@/components/Header/DashboardHeader'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative grid h-screen w-screen grid-cols-12">
      <div className="absolute top-0 w-full">
        <DashboardHeader />
      </div>
      <div className="col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-9 bg-gray-100">
        <div className="px-10 pt-24">{children}</div>
      </div>
    </div>
  )
}
