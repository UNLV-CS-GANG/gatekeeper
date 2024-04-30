'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import PageWrapper from '@/components/Common/PageWrapper'
import { useAuth } from '@clerk/nextjs'
import { Event } from '@prisma/client'
import { useEffect, useState } from 'react'
import Iterator from '@/components/Common/Iterator'
import EventGrid from '@/components/Event/Preview/EventGrid'
import EventExtended from '@/types/EventExtended'
import FilterBar from '@/components/Common/Filter/FilterBar'
import { eventFilterOptions } from '@/data/FilterOptions/eventFilterOptions'

export default function ManageEvents() {
  interface EventsResponse {
    events: Event[]
    allEventsCount: number
  }

  const { userId } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [tableSkips, setTableSkips] = useState(0)
  const [filter, setFilter] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [rows, setRows] = useState(6)
  const eventsEndpt = `/api/event?userId=${userId}&take=${rows}`

  useEffect(() => {
    // set rows based on width size
    const handleResize = () => {
      setRows(window.innerWidth >= 640 ? 6 : 3)
    }
    handleResize()

    // setup + clean listener
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
      setTimeout(() => {
        setIsLoadingEvents(false)
      }, 500)
    }
  }

  useEffect(() => {
    let endpt = eventsEndpt
    if (filter) endpt += `&filter=${filter}`
    if (searchInput) endpt += `&search=${searchInput}`
    if (tableSkips > 0) endpt += `&skip=${tableSkips * rows}`
    console.log('table skips:', tableSkips, tableSkips * rows)
    loadEvents(endpt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchInput, eventsEndpt, tableSkips])

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
        <EventGrid
          events={events as EventExtended[]}
          isLoadingEvents={isLoadingEvents}
          reload={() => loadEvents(eventsEndpt)}
          displayCount={rows}
        />
      </div>

      <Iterator
        itemsCount={events.length}
        allItemsCount={allEventsCount}
        itemsToDisplay={rows}
        skips={tableSkips}
        setSkips={setTableSkips}
      />
    </PageWrapper>
  )
}
