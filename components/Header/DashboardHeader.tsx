'use client'

import NotificationBell from '@/components/Header/NotificationBell'
import SidebarButton from '@/components/Sidebar/SidebarButton'
import { paths } from '@/data/paths'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DashboardHeader() {
  const router = useRouter()
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  return (
    <div className="flex h-16 w-full justify-between bg-white shadow-sm">
      {/* left edge */}
      <div className="flex min-w-[16rem] items-center justify-center space-x-2">
        {/* desktop */}
        <div className="hidden sm:block">
          <button className="flex space-x-2" onClick={() => router.push(paths.index)}>
            <Image src={'/torii.png'} className="h-8" alt={'logo'} priority width={32} height={32} />
            <h1 className="text-xl font-medium ">Gatekeeper</h1>
          </button>
        </div>

        {/* mobile */}
        <div className="block sm:hidden">
          <SidebarButton isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen}>
            <Image src={'/torii.png'} className="h-8" alt={'logo'} priority width={32} height={32} />
          </SidebarButton>
        </div>
      </div>

      {/* right edge */}
      <div className="flex place-items-center justify-end space-x-3 sm:col-span-9 sm:space-x-5 sm:pr-10">
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
