'use client'

import FilterBar from '@/components/Common/Filter/FilterBar'
import SearchBar from '@/components/Common/Filter/SearchBar'
import Iterator from '@/components/Common/Iterator'
import PageWrapper from '@/components/Common/PageWrapper'
import OrganizationTable from '@/components/Organization/Preview/OrganizationTable'
import { organizationFilterOptions } from '@/data/FilterOptions/organizationFilterOptions'
import { tableDisplayCount } from '@/data/displayCount'
import { useLoadFilteredData } from '@/hooks/useLoadFilteredData'
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { OrganizationQueryOptions } from '@/types/Organization/OrganizationQueryOptions'
import { OrganizationsPreviewResponse } from '@/types/Organization/OrganizationsPreviewResponse'
import { OrganizationFilterQuery } from '@/types/enums/OrganizationFilterQuery'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'

export default function ManageOrganizations() {
  const { userId } = useAuth()
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const [allOrganizationsCount, setAllOrganizationsCount] = useState(0)
  const [skips, setSkips] = useState(0)
  const organizationsEndpoint = '/api/organization'

  const [queries, setQueries] = useState<OrganizationQueryOptions>({
    search: '',
    skip: '0',
    take: String(tableDisplayCount.default),
    filter: OrganizationFilterQuery.ALL,
    userId: String(userId),
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
    endpoint: organizationsEndpoint,
    queries,
    setIsLoading: setIsLoadingOrganizations,
    delay: 500,
  })

  return (
    <PageWrapper title="Manage Organizations" description="Description placeholder">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <FilterBar
            filterOptions={organizationFilterOptions}
            onSelect={(filter) => setQueries((prev) => ({ ...prev, filter: filter as OrganizationFilterQuery }))}
          />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar onChange={(input) => setQueries((prev) => ({ ...prev, search: input }))} label="Search name" />
        </div>
      </div>

      <div className="py-5">
        <OrganizationTable isLoadingOrganizations={isLoadingOrganizations} organizations={organizations} />
      </div>

      <Iterator allItemsCount={0} itemsCount={0} displayCount={0} skips={skips} setSkips={setSkips} />
    </PageWrapper>
  )
}
