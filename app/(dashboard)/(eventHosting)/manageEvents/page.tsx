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
import { useLoadFilteredData } from '@/hooks/useLoadFilteredData'
import { EventQueryOptions } from '@/types/Event/EventQueryOptions'
import { OrganizationsPreviewResponse } from '@/types/Organization/OrganizationsPreviewResponse'

export default function ManageEvents() {
  const { userId } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [allEventsCount, setAllEventsCount] = useState(0)
  const eventsEndpoint = `/api/event`
  const [queries, setQueries] = useState<EventQueryOptions>({
    search: '',
    skip: '0',
    take: String(gridDisplayCount.default),
    filter: EventFilterQuery.ALL,
    userId: String(userId),
  })

  useWindowResize(
    widthBreakpoints.sm,
    () => {
      setQueries((prev) => ({ ...prev, take: String(gridDisplayCount.default) }))
    },
    () => {
      setQueries((prev) => ({ ...prev, take: String(gridDisplayCount.mobile) }))
    }
  )

  useLoadFilteredData({
    endpoint: eventsEndpoint,
    onDataLoaded: (data: EventsPreviewResponse | OrganizationsPreviewResponse) => {
      setAllEventsCount((data as EventsPreviewResponse).allEventsCount || 0)
      setEvents((data as EventsPreviewResponse).events || [])
    },
    queries,
    setIsLoading: setIsLoadingEvents,
    delay: 500,
  })

  return (
    <PageWrapper title="Manage Events" description="View and manage your events">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <FilterBar
            filterOptions={eventFilterOptions}
            onSelect={(eventFilterQuery) => setQueries((prev) => ({ ...prev, filter: eventFilterQuery }))}
          />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar
            onChange={(input) => setQueries((prev) => ({ ...prev, search: input }))}
            label="Search by title or location"
          />
        </div>
      </div>

      <div className="py-5">
        <ManageEventGrid
          events={events as EventExtended[]}
          isLoadingEvents={isLoadingEvents}
          reload={() => setQueries((prev) => ({ ...prev }))}
          displayCount={Number(queries.take)}
        />
      </div>

      <Iterator
        itemsCount={events.length}
        allItemsCount={allEventsCount}
        displayCount={Number(queries.take)}
        skips={Number(queries.skip)}
        onChange={(skip) => setQueries((prev) => ({ ...prev, skip: String(skip) }))}
      />
    </PageWrapper>
  )
}
