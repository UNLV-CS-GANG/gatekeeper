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

export default function Sidebar() {
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
    }
  }

  return (
    <div className="h-full border-[1px]">
      {/* app title */}
      <div className="h-16">
        <h1 className="flex h-full place-items-center justify-center text-3xl font-semibold">
          gatekeeper
        </h1>
      </div>

      {/* tabs */}
      <div className="divide-y divide-gray-200 px-10 pt-6">
        <ul className="pb-4">
          {primaryTabs.map((tab: SidebarTab, index: number) => (
            <li className="py-1" key={index} onClick={() => routeToTab(tab)}>
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
            <li className="py-1" key={index} onClick={() => routeToTab(tab)}>
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
