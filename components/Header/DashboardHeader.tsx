'use client'

import ToggleTheme from './ToggleTheme'
import NotificationBell from './NotificationBell'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function DashboardHeader() {
  const router = useRouter()

  return (
    <div className="grid h-16 w-full grid-cols-12 justify-between bg-white shadow-sm">
      <div className="col-span-3 flex place-items-center justify-center">
        <h1 className="text-2xl font-medium">
          <button onClick={() => router.push('/')}>gatekeeper</button>
        </h1>
      </div>

      <div className="col-span-9 flex place-items-center justify-end space-x-5 pr-10">
        {/* dark/light mode */}
        <ToggleTheme />

        {/* notification bell */}
        <NotificationBell />

        {/* user profile */}
        <UserButton afterSignOutUrl="/" showName={true} />
      </div>
    </div>
  )
}
