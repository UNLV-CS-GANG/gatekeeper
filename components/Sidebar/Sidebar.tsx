/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Tab from './Tab'
import {
  RocketLaunchIcon,
  InformationCircleIcon,
  UserGroupIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar({ onRoute }: { onRoute?: () => void }) {
  interface SidebarTab {
    icon: any
    title: string
    route: string
  }

  const router = useRouter()
  const pathname = usePathname()

  const primaryTabs = [
    {
      icon: RocketLaunchIcon,
      title: 'My Events',
      route: '/myEvents',
    },
    {
      icon: PlusCircleIcon,
      title: 'New Event',
      route: '/createEvent',
    },
  ]

  const secondaryTabs = [
    {
      icon: UserGroupIcon,
      title: 'About Us',
      route: '/aboutUs',
    },
    {
      icon: InformationCircleIcon,
      title: 'Help',
      route: '/help',
    },
    {
      icon: Cog6ToothIcon,
      title: 'Settings',
      route: '/settings',
    },
  ]

  function routeToTab(tab: SidebarTab) {
    if (!pathname.includes(tab.route)) {
      router.push(tab.route)
      if (onRoute) onRoute()
    }
  }

  return (
    <div className="h-full border-[1px]">
      {/* tabs */}
      <div className="block px-4 pb-4 pt-4 sm:hidden">
        <div
          className="flex justify-center rounded-xl border-[1px] py-2 text-sm font-medium text-gray-500 shadow-sm transition-colors duration-150 hover:bg-gray-100"
          onClick={() => router.push('/')}
        >
          Back to home
        </div>
      </div>
      <div className="divide-y divide-gray-200 px-4 pt-4 sm:px-10 sm:pt-[5.5rem]">
        <ul className="pb-4">
          {primaryTabs.map((tab: SidebarTab, index: number) => (
            <li className="py-1" key={index} onClick={() => routeToTab(tab)}>
              <Tab Icon={tab.icon} title={tab.title} isActive={pathname.includes(tab.route)} />
            </li>
          ))}
        </ul>
        <ul className="pt-4">
          {secondaryTabs.map((tab: SidebarTab, index: number) => (
            <li className="py-1" key={index} onClick={() => routeToTab(tab)}>
              <Tab Icon={tab.icon} title={tab.title} isActive={pathname.includes(tab.route)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
