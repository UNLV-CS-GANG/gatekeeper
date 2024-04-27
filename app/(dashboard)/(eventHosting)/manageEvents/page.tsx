'use client'

import EventTable from '@/components/Event/EventTable'
import EventTableTabs from '@/components/Event/EventTableTabs'
import SearchBar from '@/components/Event/SearchBar'
import PageWrapper from '@/components/Common/PageWrapper'
import { useAuth } from '@clerk/nextjs'
import { Event } from '@prisma/client'
import { useEffect, useState } from 'react'
import Iterator from '@/components/Common/Iterator'

export default function ManageEvents() {
  interface EventsResponse {
    events: Event[]
    allEventsCount: number
  }

  const { userId } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [eventsAreLoading, setEventsAreLoading] = useState(false)
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [tableSkips, setTableSkips] = useState(0)
  const [tabQuery, setTabQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [rows, setRows] = useState(5)
  const eventsEndpt = `/api/event?userId=${userId}&take=${rows}`

  useEffect(() => {
    // Update the state based on the window size
    const handleResize = () => {
      setRows(window.innerWidth >= 640 ? 5 : 3)
    }

    // Call the function to set the initial state
    handleResize()

    // Set up the event listener
    window.addEventListener('resize', handleResize)

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  async function loadEvents(apiEndpoint: string) {
    try {
      console.log('loading events...')
      setEventsAreLoading(true)
      const res = await fetch(apiEndpoint, { method: 'GET' })
      const tempEvents = (await res.json()) as EventsResponse
      console.log('events:', tempEvents)

      setAllEventsCount(tempEvents.allEventsCount || 0)
      setEvents(tempEvents.events || [])
    } catch (err) {
      console.error(err)
    } finally {
      setEventsAreLoading(false)
    }
  }

  useEffect(() => {
    let endpt = eventsEndpt
    if (tabQuery) endpt += `&tab=${tabQuery}`
    if (searchInput) endpt += `&search=${searchInput}`
    if (tableSkips > 0) endpt += `&skip=${tableSkips * rows}`
    console.log('table skips:', tableSkips, tableSkips * rows)
    loadEvents(endpt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabQuery, searchInput, eventsEndpt, tableSkips])

  return (
    <PageWrapper title="Manage Events" description="View and manage your events">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <EventTableTabs setTabQuery={setTabQuery} />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar setSearchInput={setSearchInput} />
        </div>
      </div>
      <EventTable
        events={events}
        eventsAreLoading={eventsAreLoading}
        reload={() => loadEvents(eventsEndpt)}
        rows={rows}
        isHost={true}
      />

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
