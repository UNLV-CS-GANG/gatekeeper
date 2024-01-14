'use client'

import Sidebar from '@/components/Sidebar/Sidebar'
import DashboardHeader from '@/components/Header/DashboardHeader'
import useSetupUser from '@/hooks/useSetupUser'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // check if user exists, otherwise link in db
  useSetupUser()

  return (
    <div className="relative h-screen w-screen overflow-hidden sm:grid sm:grid-cols-12">
      <div className="absolute top-0 w-full">
        <DashboardHeader />
      </div>
      <div className="hidden sm:col-span-3 sm:block">
        <Sidebar />
      </div>
      <div className="bg-gray-100 sm:col-span-9">
        <div className="px-4 pt-24 sm:px-10">{children}</div>
      </div>
    </div>
  )
}
