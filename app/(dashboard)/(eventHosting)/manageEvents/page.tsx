'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import PageWrapper from '@/components/Common/PageWrapper'
import { useAuth } from '@clerk/nextjs'
import { Event } from '@prisma/client'
import { useState } from 'react'
import Iterator from '@/components/Common/Iterator'
import ManageEventGrid from '@/components/Event/Preview/ManageEventsGrid'
import EventExtended from '@/types/Event/EventExtended'
import FilterBar from '@/components/Common/Filter/FilterBar'
import { eventFilterOptions } from '@/data/FilterOptions/eventFilterOptions'
import { EventsPreviewResponse } from '@/types/Event/EventsPreviewResponse'
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize'
import { gridDisplayCount } from '@/data/displayCount'
import { EventFilterQuery } from '@/types/enums/EventFilterQuery'
import useLoadFilteredData from '@/hooks/useLoadFilteredData'

export default function ManageEvents() {
  const { userId } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [skips, setSkips] = useState(0)
  const [filter, setFilter] = useState<EventFilterQuery>(EventFilterQuery.ALL)
  const [searchInput, setSearchInput] = useState('')
  const [displayCount, setDisplayCount] = useState(gridDisplayCount.default)
  const myEventsEndpoint = `/api/event?userId=${userId}&take=${displayCount}`

  useWindowResize(
    widthBreakpoints.sm,
    () => setDisplayCount(gridDisplayCount.default),
    () => setDisplayCount(gridDisplayCount.mobile)
  )

  useLoadFilteredData(
    (data: EventsPreviewResponse) => {
      setAllEventsCount(data.allEventsCount || 0)
      setEvents(data.events || [])
    },
    myEventsEndpoint,
    skips,
    displayCount,
    filter,
    searchInput,
    setIsLoadingEvents,
    500
  )

  return (
    <PageWrapper title="Manage Events" description="View and manage your events">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <FilterBar filterOptions={eventFilterOptions} setFilter={setFilter} />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar setSearchInput={setSearchInput} label="Search by title or location" />
        </div>
      </div>

      <div className="py-5">
        <ManageEventGrid
          events={events as EventExtended[]}
          isLoadingEvents={isLoadingEvents}
          reload={() => setFilter(filter)}
          displayCount={displayCount}
        />
      </div>

      <Iterator
        itemsCount={events.length}
        allItemsCount={allEventsCount}
        displayCount={displayCount}
        skips={skips}
        setSkips={setSkips}
      />
    </PageWrapper>
  )
}
