'use client'

import { UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <div className="relative h-16 w-full bg-white shadow-sm">
      {/* user profile */}
      <div className="absolute right-4 top-4">
        <UserButton afterSignOutUrl="/" showName={true} />
      </div>
    </div>
  )
}
