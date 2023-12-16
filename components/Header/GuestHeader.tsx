'use client'

import ToggleTheme from './ToggleTheme'
import { UserButton } from '@clerk/nextjs'

export default function DashboardHeader() {
  return (
    <div className="grid h-16 w-full grid-cols-12 justify-between bg-white shadow-sm">
      <div className="col-span-3 flex place-items-center justify-center">
        <h1 className="text-2xl font-medium">gatekeeper</h1>
      </div>

      <div className="col-span-9 flex place-items-center justify-end space-x-5 pr-10">
        {/* dark/light mode */}
        <ToggleTheme />

        {/* user profile */}
        <UserButton afterSignOutUrl="/" showName={true} />
      </div>
    </div>
  )
}
