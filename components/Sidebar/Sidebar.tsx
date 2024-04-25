'use client'

import { SidebarTab, primaryTabs, secondaryTabs } from '@/data/tabs'
import Tab from './Tab'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar({ onRoute }: { onRoute?: () => void }) {
  const router = useRouter()
  const pathname = usePathname()

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
