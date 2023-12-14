'use client'

import { useState } from 'react'
import Tab from './Tab'
import {
  TableCellsIcon,
  RocketLaunchIcon,
  InformationCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar() {
  interface SidebarTab {
    icon: any
    title: string
    route: string
  }

  const router = useRouter()
  const pathname = usePathname()

  const [primaryTabs, setPrimaryTabs] = useState([
    {
      icon: TableCellsIcon,
      title: 'My Events',
      route: '/myEvents',
    },
    {
      icon: RocketLaunchIcon,
      title: 'New Event',
      route: '/createEvent',
    },
  ])

  const [secondaryTabs, setSecondaryTabs] = useState([
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
  ])

  function routeToTab(tab: SidebarTab, isPrimary: boolean) {
    if (!pathname.includes(tab.route)) {
      const tempTabs: SidebarTab[] = isPrimary
        ? [...primaryTabs]
        : [...secondaryTabs]
      isPrimary ? setPrimaryTabs(tempTabs) : setSecondaryTabs(tempTabs)
      router.push(tab.route)
    }
  }

  return (
    <div className="h-full border-[1px]">
      {/* app title */}
      <div className="h-16">
        <h1 className="flex h-full place-items-center pl-6 text-3xl font-semibold">
          Gatekeeper
        </h1>
      </div>

      {/* tabs */}
      <div className="divide-y divide-gray-200 px-6 pt-6">
        <ul className="pb-4">
          {primaryTabs.map((tab: SidebarTab, index: number) => (
            <li
              className="py-1"
              key={index}
              onClick={() => routeToTab(tab, true)}
            >
              <Tab
                Icon={tab.icon}
                title={tab.title}
                isActive={pathname.includes(tab.route)}
              />
            </li>
          ))}
        </ul>
        <ul className="pt-4">
          {secondaryTabs.map((tab: SidebarTab, index: number) => (
            <li
              className="py-1"
              key={index}
              onClick={() => routeToTab(tab, false)}
            >
              <Tab
                Icon={tab.icon}
                title={tab.title}
                isActive={pathname.includes(tab.route)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
