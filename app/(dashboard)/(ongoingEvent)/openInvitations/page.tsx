'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import Select from '@/components/Common/Filter/Select'
import Iterator from '@/components/Common/Iterator'
import PageWrapper from '@/components/Common/PageWrapper'
import OpenInvitationsGrid from '@/components/Event/Preview/OpenInvitationsGrid'
import { gridDisplayCount } from '@/data/displayCount'
import useLoadData from '@/hooks/useLoadData'
import { LoadFilteredDataParams, useLoadFilteredData } from '@/hooks/useLoadFilteredData'
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize'
import EventExtended from '@/types/Event/EventExtended'
import { EventsPreviewResponse } from '@/types/Event/EventsPreviewResponse'
import { useAuth } from '@clerk/nextjs'
import { Organization } from '@prisma/client'
import { useState } from 'react'

export default function OpenInvitations() {
  const { userId } = useAuth()
  const [events, setEvents] = useState<EventExtended[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [skips, setSkips] = useState(0)
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [displayCount, setDisplayCount] = useState(gridDisplayCount.default)

  const eventsEndpt = `/api/event?userId=${userId}&take=${displayCount}`
  const organizationsEndpt = `/api/organization`

  useWindowResize(
    widthBreakpoints.sm,
    () => setDisplayCount(gridDisplayCount.default),
    () => setDisplayCount(gridDisplayCount.mobile)
  )

  useLoadFilteredData({
    onDataLoaded: (data: EventsPreviewResponse) => {
      setAllEventsCount(data.allEventsCount || 0)
      setEvents(data.events || [])
    },
    apiEndpoint: eventsEndpt,
    skips,
    displayCount,
    searchInput,
    organizationId: selectedOrganization?.id,
    setIsLoading: setIsLoadingEvents,
    delay: 500,
  })

  useLoadData((data: Organization[]) => setOrganizations(data), organizationsEndpt, setIsLoadingOrganizations, 500)

  return (
    <PageWrapper title="Open Invitations" description="Events that are public to anyone within the organization">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <Select
            items={organizations}
            displayAttribute="name"
            selectedItem={selectedOrganization}
            onSelect={(data: Organization) => {
              setSelectedOrganization(data)
            }}
            isLoadingItems={isLoadingOrganizations}
          />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar setSearchInput={setSearchInput} label="Search by title or location" />
        </div>
      </div>

      <div className="py-4">
        <OpenInvitationsGrid
          events={events as EventExtended[]}
          isLoadingEvents={isLoadingEvents}
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
