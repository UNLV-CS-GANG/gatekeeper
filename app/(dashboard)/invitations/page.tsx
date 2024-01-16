'use client'

import EventTable from '@/components/Event/EventTable'
import EventTableTabs from '@/components/Event/EventTableTabs'
import SearchBar from '@/components/Event/SearchBar'
import PageWrapper from '@/components/Common/PageWrapper'
import classNames from '@/lib/classNames'
import { useAuth } from '@clerk/nextjs'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Event } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function MyEvents() {
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
  const eventsEndpt = `/api/event?guestId=${userId}`

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
    let endpt = eventsEndpt + `&take=${rows}`
    if (tabQuery) endpt += `&tab=${tabQuery}`
    if (searchInput) endpt += `&search=${searchInput}`
    if (tableSkips > 0) endpt += `&skip=${tableSkips * rows}`
    console.log('table skips:', tableSkips, tableSkips * rows)
    loadEvents(endpt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabQuery, searchInput, eventsEndpt, tableSkips])

  return (
    <PageWrapper title="Invitations" description="View events you were invited to">
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
        isHost={false}
      />

      {/* table skip button */}
      <div className="flex justify-center sm:justify-end">
        <div className="relative flex w-full space-x-4 rounded-full bg-gray-200 px-4 py-2.5 sm:w-56 sm:justify-between">
          <div className="flex place-items-center justify-center space-x-2">
            <button
              className="absolute left-3 cursor-pointer rounded-full p-1 transition-colors duration-150 hover:bg-gray-300 disabled:cursor-default disabled:hover:bg-gray-200 sm:static"
              onClick={() => setTableSkips(tableSkips - 1)}
              disabled={tableSkips === 0}
            >
              <ArrowLeftIcon
                className={classNames('h-5 w-5', tableSkips === 0 ? 'text-gray-400 text-opacity-50' : 'text-gray-600')}
              />
            </button>
            <button
              className="absolute right-3 rounded-full p-1 transition-colors duration-150 hover:bg-gray-300 disabled:cursor-default disabled:hover:bg-gray-200 sm:static"
              onClick={() => setTableSkips(tableSkips + 1)}
              disabled={(tableSkips + 1) * rows >= allEventsCount}
            >
              <ArrowRightIcon
                className={classNames(
                  'h-5 w-5',
                  (tableSkips + 1) * rows >= allEventsCount ? 'text-gray-400 text-opacity-50' : 'text-gray-600'
                )}
              />
            </button>
          </div>
          <div className="flex w-full justify-center space-x-2 sm:justify-end">
            <p className="font-medium text-gray-600">
              {events.length > 0
                ? `${tableSkips * rows + 1} - ${
                    tableSkips * rows + rows <= allEventsCount ? tableSkips * rows + rows : allEventsCount
                  }`
                : '0 - 0'}
            </p>
            <p className="font-medium text-gray-600">{`/ ${allEventsCount}`}</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
