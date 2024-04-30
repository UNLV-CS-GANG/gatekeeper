'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import Select from '@/components/Common/Filter/Select'
import Iterator from '@/components/Common/Iterator'
import PageWrapper from '@/components/Common/PageWrapper'
import OpenInvitationsGrid from '@/components/Event/Preview/OpenInvitationsGrid'
import EventExtended from '@/types/Event/EventExtended'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

interface EventsResponse {
  events: EventExtended[]
  allEventsCount: number
}

const tempOrgs: { id: number; name: string }[] = [
  {
    id: 0,
    name: 'nba',
  },
  {
    id: 1,
    name: 'unlv',
  },
  {
    id: 2,
    name: 'nfl',
  },
]

export default function OpenInvitations() {
  const { userId } = useAuth()
  const [events, setEvents] = useState<EventExtended[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [skips, setSkips] = useState(0)
  const [filter, setFilter] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [rows, setRows] = useState(6)
  const eventsEndpt = `/api/event?userId=${userId}&take=${rows}`

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
    <PageWrapper title="Open Invitations" description="Events that are public to anyone within the organization">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          {/* <FilterBar filterOptions={eventFilterOptions} setFilter={setFilter} /> */}
          <Select stringItems={tempOrgs.map((org) => org.name)} defaultValue={'All'} />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar setSearchInput={setSearchInput} label="Search by title or location" />
        </div>
      </div>

      <div className="py-5">
        <OpenInvitationsGrid events={events as EventExtended[]} isLoadingEvents={isLoadingEvents} displayCount={rows} />
      </div>

      <Iterator
        itemsCount={events.length}
        allItemsCount={allEventsCount}
        displayCount={rows}
        skips={skips}
        setSkips={setSkips}
      />
    </PageWrapper>
  )
}
