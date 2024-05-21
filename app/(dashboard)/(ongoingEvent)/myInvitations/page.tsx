'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import PageWrapper from '@/components/Common/PageWrapper'
import { useAuth } from '@clerk/nextjs'
import { Event } from '@prisma/client'
import { useState } from 'react'
import EventExtended from '@/types/Event/EventExtended'
import Pagination from '@/components/Common/Pagination'
import FilterBar from '@/components/Common/Filter/FilterBar'
import { eventFilterOptions } from '@/data/FilterOptions/eventFilterOptions'
import { EventsPreviewResponse } from '@/types/Event/EventsPreviewResponse'
import { EventFilterQuery } from '@/types/Event/EventFilterQuery'
import { useLoadFilteredData } from '@/hooks/useLoadFilteredData'
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize'
import { gridDisplayCount } from '@/data/displayCount'
import MyInvitationsGrid from '@/components/Event/Preview/MyInvitationsGrid'
import { EventQueryOptions } from '@/types/Event/EventQueryOptions'

export default function MyInvitations() {
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
    guestId: String(userId),
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
    onDataLoaded: (data) => {
      setAllEventsCount((data as EventsPreviewResponse).allEventsCount || 0)
      setEvents((data as EventsPreviewResponse).events || [])
    },
    endpoint: eventsEndpoint,
    queries,
    setIsLoading: setIsLoadingEvents,
    delay: 500,
  })

  return (
    <PageWrapper title="My Invitations" description="View events you were invited to">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <FilterBar
            filterOptions={eventFilterOptions}
            onSelect={(filter) => setQueries((prev) => ({ ...prev, filter: filter as EventFilterQuery }))}
          />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar onChange={(input) => setQueries((prev) => ({ ...prev, search: input }))} />
        </div>
      </div>

      <div className="py-4">
        <MyInvitationsGrid
          displayCount={6}
          events={events as EventExtended[]}
          isLoadingEvents={isLoadingEvents}
          reload={() => setQueries((prev) => ({ ...prev }))}
        />
      </div>

      <Pagination
        itemsCount={events.length}
        allItemsCount={allEventsCount}
        displayCount={Number(queries.take)}
        skips={Number(queries.skip)}
        onChange={(skip) => setQueries((prev) => ({ ...prev, skip: String(skip) }))}
      />
    </PageWrapper>
  )
}
