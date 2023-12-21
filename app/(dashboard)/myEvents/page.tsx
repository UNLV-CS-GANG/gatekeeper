'use client'

import EventTable from '@/components/Event/EventTable'
import EventTableTabs from '@/components/Event/EventTableTabs'
import SearchBar from '@/components/Event/SearchBar'
import PageWrapper from '@/components/PageWrapper'
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
  const eventsEndpt = `/api/event?hostId=${userId}`

  async function loadEvents(apiEndpoint: string) {
    try {
      setEventsAreLoading(true)
      const res = await fetch(apiEndpoint, { method: 'GET' })
      const tempEvents = (await res.json()) as EventsResponse
      console.log('events:', tempEvents)
      setAllEventsCount(tempEvents.allEventsCount)
      setEvents(tempEvents.events)
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
    if (tableSkips > 0) endpt += `&skip=${tableSkips * 5}`
    console.log('table skips:', tableSkips, tableSkips * 5)
    loadEvents(endpt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabQuery, searchInput, eventsEndpt, tableSkips])

  return (
    <PageWrapper title="My Events" description="View and manage your events">
      <div className="flex space-x-6">
        <div className="w-1/2">
          <EventTableTabs setTabQuery={setTabQuery} />
        </div>
        <div className="w-1/2">
          <SearchBar setSearchInput={setSearchInput} />
        </div>
      </div>
      <EventTable
        events={events}
        eventsAreLoading={eventsAreLoading}
        reload={() => loadEvents(eventsEndpt)}
      />
      <div className="flex justify-end">
        <div className="flex w-56 justify-between space-x-4 rounded-full bg-gray-200 px-4 py-2.5">
          <div className="flex place-items-center justify-center space-x-2">
            <button
              className="cursor-pointer rounded-full p-1 transition-colors duration-150 hover:bg-gray-300 disabled:cursor-default disabled:hover:bg-gray-200"
              onClick={() => setTableSkips(tableSkips - 1)}
              disabled={tableSkips === 0}
            >
              <ArrowLeftIcon
                className={classNames(
                  'h-5 w-5',
                  tableSkips === 0
                    ? 'text-gray-400 text-opacity-50'
                    : 'text-gray-600'
                )}
              />
            </button>
            <button
              className="rounded-full p-1 transition-colors duration-150 hover:bg-gray-300 disabled:cursor-default disabled:hover:bg-gray-200"
              onClick={() => setTableSkips(tableSkips + 1)}
              disabled={(tableSkips + 1) * 5 >= allEventsCount}
            >
              <ArrowRightIcon
                className={classNames(
                  'h-5 w-5',
                  (tableSkips + 1) * 5 >= allEventsCount
                    ? 'text-gray-400 text-opacity-50'
                    : 'text-gray-600'
                )}
              />
            </button>
          </div>
          <p className="font-medium text-gray-600">
            {events.length > 0
              ? `${tableSkips * 5 + 1} - ${
                  tableSkips * 5 + 5 <= allEventsCount
                    ? tableSkips * 5 + 5
                    : allEventsCount
                }`
              : '0 - 0'}
          </p>
          <p className="font-medium text-gray-600">{`/ ${allEventsCount}`}</p>
        </div>
      </div>
    </PageWrapper>
  )
}
