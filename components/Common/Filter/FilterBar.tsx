import classNames from '@/lib/classNames'
import { FilterOption } from '@/types/FilterOption'
import { EventFilterQuery } from '@/types/Event/EventFilterQuery'
import { OrganizationFilterQuery } from '@/types/Organization/OrganizationFilterQuery'
import { Dispatch, SetStateAction, useState } from 'react'

export default function FilterBar({
  setFilter,
  onSelect,
  filterOptions,
}: {
  setFilter?: Dispatch<SetStateAction<EventFilterQuery | OrganizationFilterQuery>>
  onSelect?: (x: EventFilterQuery | OrganizationFilterQuery) => void
  filterOptions: FilterOption[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  function handleTabClick(filterOption: FilterOption, index: number) {
    if (activeIndex !== index) {
      setActiveIndex(index)
      if (setFilter) setFilter(filterOption.query)
      if (onSelect) onSelect(filterOption.query)
    }
  }

  return (
    <div className="flex h-full justify-between border-b-2 border-b-gray-300 text-sm">
      {filterOptions.map((filterOption: FilterOption, i: number) => (
        <div
          className={classNames(
            'flex h-full w-fit cursor-pointer place-items-center justify-center space-x-1 pb-4 font-medium transition-colors duration-150 sm:pb-0',
            i === activeIndex ? 'border-b-2 border-b-sage-200 text-sage-200' : 'text-gray-400 hover:text-gray-600',
            i === 0 ? 'sm:ml-4' : i === filterOptions.length - 1 ? 'sm:mr-4' : ''
          )}
          key={i}
          onClick={() => handleTabClick(filterOption, i)}
        >
          <filterOption.icon className="hidden h-5 w-5 sm:block" />
          <p>{filterOption.title}</p>
        </div>
      ))}
    </div>
  )
}
