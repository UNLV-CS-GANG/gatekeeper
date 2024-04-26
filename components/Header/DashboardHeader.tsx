'use client'

import NotificationBell from '@/components/Header/NotificationBell'
import SidebarButton from '@/components/Sidebar/SidebarButton'
import { paths } from '@/data/paths'
import { UserButton } from '@clerk/nextjs'
import { ArrowLeftStartOnRectangleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DashboardHeader() {
  const router = useRouter()
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  return (
    <div className="flex h-16 w-full justify-between shadow-sm">
      <div className="flex min-w-[16rem] items-center justify-center space-x-2">
        <Image src={'/torii.png'} className="h-8 dark:invert" alt={'logo'} priority width={32} height={32} />
        <h1 className="flex items-center text-lg font-medium sm:text-xl">
          <button className="hidden sm:block" onClick={() => router.push(paths.index)}>
            gatekeeper
          </button>
          <div className="block sm:hidden">
            <SidebarButton isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen}>
              <div className="flex place-items-center space-x-1">
                <p>gatekeeper</p>
                {!sidebarIsOpen && <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-600" />}
                {sidebarIsOpen && <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-gray-600" />}
              </div>
            </SidebarButton>
          </div>
        </h1>
      </div>

      <div className="flex place-items-center justify-end space-x-3 sm:space-x-5 sm:pr-10">
        {/* notification bell */}
        <NotificationBell />

        {/*<ThemeToggle />*/}

        {/* user profile */}
        <div className="pl-1.5 sm:pl-0">
          <UserButton afterSignOutUrl="/" showName={false} />
        </div>
      </div>
    </div>
  )
}
