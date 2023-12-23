'use client'

import ToggleTheme from './ToggleTheme'
import NotificationBell from './NotificationBell'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import SidebarButton from '../Sidebar/SidebarButton'

export default function DashboardHeader() {
  const router = useRouter()

  return (
    <div className="flex h-16 w-full justify-between bg-white px-5 shadow-sm sm:grid sm:grid-cols-12">
      <div className="flex place-items-center justify-center sm:col-span-3">
        <h1 className="text-xl font-medium sm:text-2xl">
          <button className="hidden sm:block" onClick={() => router.push('/')}>
            gatekeeper
          </button>
          <div className="block sm:hidden">
            <SidebarButton>gatekeeper</SidebarButton>
          </div>
        </h1>
      </div>

      <div className="flex place-items-center justify-end space-x-3 sm:col-span-9 sm:space-x-5 sm:pr-10">
        {/* dark/light mode */}
        <ToggleTheme />

        {/* notification bell */}
        <NotificationBell />

        {/* user profile */}
        <div className="pl-1.5 sm:pl-0">
          <UserButton afterSignOutUrl="/" showName={false} />
        </div>
      </div>
    </div>
  )
}
