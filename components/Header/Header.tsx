'use client'

import ToggleTheme from './ToggleTheme'
import NotificationBell from './NotificationBell'
import { UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <div className="flex h-16 w-full place-items-center justify-end space-x-5 bg-white pr-4 shadow-sm">
      {/* dark/light mode */}
      <ToggleTheme />

      {/* notification bell */}
      <NotificationBell />

      {/* user profile */}
      <div className="">
        <UserButton afterSignOutUrl="/" showName={true} />
      </div>
    </div>
  )
}
