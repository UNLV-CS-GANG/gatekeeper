'use client'

import Sidebar from '@/components/Sidebar/Sidebar'
import DashboardHeader from '@/components/Header/DashboardHeader'
import useSetupUser from '@/hooks/useSetupUser'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // check if user exists, otherwise link in db
  useSetupUser()

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute top-0 w-full">
        <DashboardHeader />
      </div>
      <div className="flex">
        <div className="hidden sm:block sm:min-w-[16rem]">
          <Sidebar />
        </div>
        <div className="w-full bg-gray-100">
          <div className="px-4 pt-24 sm:px-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
