'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import Iterator from '@/components/Common/Iterator'
import PageWrapper from '@/components/Common/PageWrapper'
import JoinOrganizationTable from '@/components/Organization/Preview/JoinOrganizationTable'
import { tableDisplayCount } from '@/data/displayCount'
import { useLoadFilteredData } from '@/hooks/useLoadFilteredData'
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { OrganizationQueryOptions } from '@/types/Organization/OrganizationQueryOptions'
import { OrganizationsPreviewResponse } from '@/types/Organization/OrganizationsPreviewResponse'
import { LockOpenIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function JoinOrganization() {
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const [allOrganizationsCount, setAllOrganizationsCount] = useState(0)
  const endpoint = `/api/organization`

  const [queries, setQueries] = useState<OrganizationQueryOptions>({
    search: '',
    skip: '0',
    take: String(tableDisplayCount.default),
    isPublic: 'true',
  })

  useWindowResize(
    widthBreakpoints.sm,
    () => {
      setQueries((prev) => ({ ...prev, take: String(tableDisplayCount.default) }))
    },
    () => {
      setQueries((prev) => ({ ...prev, take: String(tableDisplayCount.mobile) }))
    }
  )

  useLoadFilteredData({
    onDataLoaded: (data) => {
      setAllOrganizationsCount((data as OrganizationsPreviewResponse).allOrganizationsCount || 0)
      setOrganizations((data as OrganizationsPreviewResponse).organizations || [])
    },
    endpoint,
    queries,
    setIsLoading: setIsLoadingOrganizations,
    delay: 500,
  })

  return (
    <PageWrapper title="Join Organization" description="Description placeholder">
      <div className="sm:flex sm:space-x-6">
        <button className="flex w-full place-items-center justify-center rounded-lg bg-gray-600 text-sm text-gray-200 transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100 sm:w-1/2">
          <div className="relative flex">
            <LockOpenIcon className="absolute -left-8 h-5 w-5" />
            <p className="font-semibold">Enter private organization code</p>
          </div>
        </button>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar
            onChange={(input) => setQueries((prev) => ({ ...prev, search: input }))}
            label="Search by title or location"
          />
        </div>
      </div>

      <div className="py-4">
        <JoinOrganizationTable
          isLoadingOrganizations={isLoadingOrganizations}
          organizations={organizations}
          displayCount={Number(queries.take)}
        />
      </div>

      <Iterator
        itemsCount={organizations.length}
        allItemsCount={allOrganizationsCount}
        displayCount={Number(queries.take)}
        skips={Number(queries.skip)}
        onChange={(skip) => setQueries((prev) => ({ ...prev, skip: String(skip) }))}
      />
    </PageWrapper>
  )
}
