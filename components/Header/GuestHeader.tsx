'use client'

import ToggleTheme from './ToggleTheme'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function DashboardHeader() {
  const router = useRouter()

  return (
    <div className="relative flex h-16 w-full justify-between bg-white px-5 shadow-sm sm:grid sm:grid-cols-12 sm:px-0">
      <div className="flex h-full place-items-center justify-center sm:col-span-3">
        <h1 className="text-xl font-medium sm:text-2xl">
          <button onClick={() => router.push('/')}>gatekeeper</button>
        </h1>
      </div>

      <div className="flex place-items-center justify-end space-x-3 sm:col-span-9 sm:space-x-5 sm:pr-10">
        {/* dark/light mode */}
        <ToggleTheme />

        {/* user profile */}
        <div className="pl-1.5 sm:pl-0">
          <UserButton afterSignOutUrl="/" showName={false} />
        </div>
      </div>
    </div>
  )
}
