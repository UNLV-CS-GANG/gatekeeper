'use client'

import { SidebarGroup, SidebarTab, groupedTabs, isolatedTabs } from '@/data/tabs'
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
    <div className="relative h-full border-[1px]">
      {/* tabs */}
      <div className="block px-4 pb-4 pt-4 sm:hidden">
        <div
          className="flex justify-center rounded-xl border-[1px] py-2 text-sm font-medium text-gray-500 shadow-sm transition-colors duration-150 hover:bg-gray-100"
          onClick={() => router.push('/')}
        >
          Back to home
        </div>
      </div>
      <div className="px-3 pt-4 sm:px-4 sm:pt-[5.5rem]">
        <ul className="pb-4">
          <li className="space-y-4">
            {groupedTabs.map((group: SidebarGroup, i: number) => (
              <ul key={i}>
                <label className="text-xs font-bold uppercase text-gray-600">{group.title}</label>
                {group.tabs.map((tab: SidebarTab, j: number) => (
                  <li key={j} className="py-0.5" onClick={() => routeToTab(tab)}>
                    <Tab Icon={tab.icon} title={tab.title} isActive={pathname.includes(tab.route)} />
                  </li>
                ))}
              </ul>
            ))}
          </li>
        </ul>
      </div>

      <div className="absolute bottom-24 w-full bg-white px-3 sm:px-4">
        <ul>
          {isolatedTabs.map((tab: SidebarTab, index: number) => (
            <li className="py-0.5" key={index} onClick={() => routeToTab(tab)}>
              <Tab Icon={tab.icon} title={tab.title} isActive={pathname.includes(tab.route)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
