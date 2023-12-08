'use client'

import { useState } from 'react'
import Tab from './Tab'
import { TableCellsIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  interface SidebarTab {
    icon: any
    title: string
    route: string
    isActive: boolean
  }

  const router = useRouter()

  const [tabs, setTabs] = useState([
    {
      icon: TableCellsIcon,
      title: 'My Events',
      route: '/',
      isActive: true,
    },
    {
      icon: RocketLaunchIcon,
      title: 'New Event',
      route: '/createEvent',
      isActive: false,
    },
  ])

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  function routeToTab(tab: SidebarTab, clickedTabIndex: number) {
    if (clickedTabIndex != activeTabIndex) {
      const tempTabs: SidebarTab[] = [...tabs]

      tempTabs[activeTabIndex].isActive = false
      tempTabs[clickedTabIndex].isActive = true

      setActiveTabIndex(clickedTabIndex)
      setTabs(tempTabs)

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
      <div className="pt-6">
        <ul>
          {tabs.map((tab: SidebarTab, index: number) => (
            <li
              className="px-4 py-1"
              key={index}
              onClick={() => routeToTab(tab, index)}
            >
              <Tab Icon={tab.icon} title={tab.title} isActive={tab.isActive} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
