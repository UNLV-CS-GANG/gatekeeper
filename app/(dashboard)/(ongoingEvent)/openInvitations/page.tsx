'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import Select from '@/components/Common/Filter/Select'
import Iterator from '@/components/Common/Iterator'
import PageWrapper from '@/components/Common/PageWrapper'
import OpenInvitationsGrid from '@/components/Event/Preview/OpenInvitationsGrid'
import { gridDisplayCount } from '@/data/displayCount'
import useLoadData from '@/hooks/useLoadData'
import { useLoadFilteredData } from '@/hooks/useLoadFilteredData'
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize'
import EventExtended from '@/types/Event/EventExtended'
import { EventQueryOptions } from '@/types/Event/EventQueryOptions'
import { EventsPreviewResponse } from '@/types/Event/EventsPreviewResponse'
import { useAuth } from '@clerk/nextjs'
import { Organization } from '@prisma/client'
import { useState } from 'react'

export default function OpenInvitations() {
  const { userId } = useAuth()
  const [events, setEvents] = useState<EventExtended[]>([])
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)
  const [queries, setQueries] = useState<EventQueryOptions>({
    search: '',
    skip: '0',
    take: String(gridDisplayCount.default),
    isPublic: 'true',
    organizationId: '',
    organizationMemberId: '',
  })

  const eventsEndpoint = `/api/event`
  const myOrganizationsEndpoint = `/api/organization?memberId=${userId}`

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
    onDataLoaded: (data) => {
      setAllEventsCount((data as EventsPreviewResponse).allEventsCount || 0)
      setEvents((data as EventsPreviewResponse).events || [])
    },
    queries,
    setIsLoading: setIsLoadingEvents,
    delay: 500,
  })

  useLoadData((data: Organization[]) => setOrganizations(data), myOrganizationsEndpoint, setIsLoadingOrganizations, 500)

  function handleSelectOrganization(org: Organization | null) {
    setSelectedOrganization(org)

    setQueries((prev) => {
      // create copy of prev state
      const updatedQueries = { ...prev }

      // get events for this org
      if (org) {
        updatedQueries.organizationId = String(org.id)
        updatedQueries.organizationMemberId = ''
      }
      // get events for all orgs this user is a member of
      else {
        updatedQueries.organizationId = ''
        updatedQueries.organizationMemberId = String(userId)
      }

      return updatedQueries
    })
  }

  return (
    <PageWrapper title="Open Invitations" description="Events that are public to anyone within the organization">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <Select
            items={organizations}
            displayAttribute="name"
            selectedItem={selectedOrganization}
            onSelect={(org: Organization | null) => {
              handleSelectOrganization(org)
            }}
            isLoadingItems={isLoadingOrganizations}
          />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar
            onChange={(input) => setQueries((prev) => ({ ...prev, search: input }))}
            label="Search by title or location"
          />
        </div>
      </div>

      <div className="py-4">
        <OpenInvitationsGrid
          events={events as EventExtended[]}
          isLoadingEvents={isLoadingEvents}
          displayCount={Number(queries.take)}
        />
      </div>

      <Iterator
        itemsCount={events.length}
        allItemsCount={allEventsCount}
        displayCount={Number(queries.take)}
        skips={Number(queries.skip)}
        onChange={(skip) => {
          setQueries((prev) => ({ ...prev, skip: String(skip) }))
        }}
      />
    </PageWrapper>
  )
}
