'use client'

import classNames from '@/lib/classNames'
import {
  BoltIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction, useState } from 'react'

export default function EventTableTabs({
  setTabQuery,
}: {
  setTabQuery: Dispatch<SetStateAction<string>>
}) {
  interface TableTab {
    icon: any
    title: string
    isActive: boolean
  }

  const [tableTabs, setTableTabs] = useState([
    {
      icon: BriefcaseIcon,
      title: 'All',
      isActive: true,
    },
    {
      icon: ClockIcon,
      title: 'Upcoming',
      isActive: false,
    },
    {
      icon: BoltIcon,
      title: 'Active',
      isActive: false,
    },
    {
      icon: CheckCircleIcon,
      title: 'Complete',
      isActive: false,
    },
  ])
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  function handleTabClick(tab: TableTab, tabIndex: number) {
    if (activeTabIndex !== tabIndex) {
      const tempTabs: TableTab[] = [...tableTabs]

      tempTabs[activeTabIndex].isActive = false
      tempTabs[tabIndex].isActive = true
      setActiveTabIndex(tabIndex)

      setTableTabs(tempTabs)
      console.log(tab.title, 'selected')

      if (tab.title !== 'All') setTabQuery(tab.title.toLowerCase())
      else setTabQuery('')
    }
  }

  return (
    <div className="flex h-full justify-between border-b-2 border-b-gray-300 text-sm">
      {tableTabs.map((tab: TableTab, index: number) => (
        <div
          className={classNames(
            'flex h-full w-24 cursor-pointer place-items-center justify-center space-x-1 font-medium',
            tab.isActive
              ? 'border-b-2 border-b-green-600 text-green-700'
              : 'text-gray-600',
            index === 0 ? 'ml-4' : index === tableTabs.length - 1 ? 'mr-4' : ''
          )}
          key={index}
          onClick={() => handleTabClick(tab, index)}
        >
          <tab.icon className="h-5 w-5" />
          <p>{tab.title}</p>
        </div>
      ))}
    </div>
  )
}
