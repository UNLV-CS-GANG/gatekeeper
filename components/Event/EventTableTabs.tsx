/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from '@/lib/classNames'
import { BoltIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction, useState } from 'react'

interface TableTab {
  icon: any
  title: string
  isActive: boolean
}

export default function EventTableTabs({ setTabQuery }: { setTabQuery: Dispatch<SetStateAction<string>> }) {
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
            'flex h-full w-24 cursor-pointer place-items-center justify-center space-x-1 pb-4 font-medium hover:font-semibold sm:pb-0',
            tab.isActive ? 'border-b-2 border-b-sage-200 text-sage-200' : 'text-gray-600',
            index === 0 ? 'sm:ml-4' : index === tableTabs.length - 1 ? 'sm:mr-4' : ''
          )}
          key={index}
          onClick={() => handleTabClick(tab, index)}
        >
          <tab.icon className="hidden h-5 w-5 sm:block" />
          <p>{tab.title}</p>
        </div>
      ))}
    </div>
  )
}
