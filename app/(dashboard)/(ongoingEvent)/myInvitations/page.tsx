'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import PageWrapper from '@/components/Common/PageWrapper'
import { useAuth } from '@clerk/nextjs'
import { Event } from '@prisma/client'
import { useEffect, useState } from 'react'
import EventGrid from '@/components/Event/Preview/ManageEventsGrid'
import EventExtended from '@/types/Event/EventExtended'
import Iterator from '@/components/Common/Iterator'
import FilterBar from '@/components/Common/Filter/FilterBar'
import { eventFilterOptions } from '@/data/FilterOptions/eventFilterOptions'

export default function MyInvitations() {
  interface EventsResponse {
    events: Event[]
    allEventsCount: number
  }

  const { userId } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [skips, setSkips] = useState(0)
  const [filter, setFilter] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [rows, setRows] = useState(5)
  const eventsEndpt = `/api/event?guestId=${userId}&take=${rows}`

  // set displayed rows based on window size
  useEffect(() => {
    const handleResize = () => {
      setRows(window.innerWidth >= 640 ? 5 : 3)
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  async function loadEvents(apiEndpoint: string) {
    try {
      console.log('loading events...')
      setIsLoadingEvents(true)
      const res = await fetch(apiEndpoint, { method: 'GET' })
      const tempEvents = (await res.json()) as EventsResponse
      console.log('events:', tempEvents)

      setAllEventsCount(tempEvents.allEventsCount || 0)
      setEvents(tempEvents.events || [])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingEvents(false)
    }
  }

  useEffect(() => {
    let endpt = eventsEndpt
    if (filter) endpt += `&filter=${filter}`
    if (searchInput) endpt += `&search=${searchInput}`
    if (skips > 0) endpt += `&skip=${skips * rows}`
    console.log('table skips:', skips, skips * rows)
    loadEvents(endpt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchInput, eventsEndpt, skips])

  return (
    <PageWrapper title="My Invitations" description="View events you were invited to">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <FilterBar filterOptions={eventFilterOptions} setFilter={setFilter} />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar setSearchInput={setSearchInput} />
        </div>
      </div>

      <div className="py-4">
        <EventGrid
          displayCount={6}
          events={events as EventExtended[]}
          isLoadingEvents={isLoadingEvents}
          reload={() => loadEvents(eventsEndpt)}
        />
      </div>

      <Iterator
        allItemsCount={allEventsCount}
        itemsCount={events.length}
        displayCount={rows}
        setSkips={setSkips}
        skips={skips}
      />
    </PageWrapper>
  )
}
