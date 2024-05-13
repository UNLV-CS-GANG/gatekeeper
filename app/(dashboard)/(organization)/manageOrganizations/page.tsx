'use client'

import FilterBar from '@/components/Common/Filter/FilterBar'
import SearchBar from '@/components/Common/Filter/SearchBar'
import Pagination from '@/components/Common/Pagination'
import PageWrapper from '@/components/Common/PageWrapper'
import ManageOrganizationsTable from '@/components/Organization/Preview/ManageOrganizationsTable'
import { organizationFilterOptions } from '@/data/FilterOptions/organizationFilterOptions'
import { tableDisplayCount } from '@/data/displayCount'
import { useLoadFilteredData } from '@/hooks/useLoadFilteredData'
import { useWindowResize, widthBreakpoints } from '@/hooks/useWindowResize'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { OrganizationQueryOptions } from '@/types/Organization/OrganizationQueryOptions'
import { OrganizationsPreviewResponse } from '@/types/Organization/OrganizationsPreviewResponse'
import { OrganizationFilterQuery } from '@/types/Organization/OrganizationFilterQuery'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'

export default function ManageOrganizations() {
  const { userId } = useAuth()
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const [allOrganizationsCount, setAllOrganizationsCount] = useState(0)
  const organizationsEndpoint = '/api/organization'

  const [queries, setQueries] = useState<OrganizationQueryOptions>({
    search: '',
    skip: '0',
    take: String(tableDisplayCount.default),
    filter: OrganizationFilterQuery.ALL,
    userId: String(userId),
    memberId: String(userId),
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
        <ManageOrganizationsTable
          isLoadingOrganizations={isLoadingOrganizations}
          organizations={organizations}
          displayCount={Number(queries.take)}
        />
      </div>

      <Pagination
        allItemsCount={allOrganizationsCount}
        itemsCount={organizations.length}
        displayCount={Number(queries.take)}
        skips={Number(queries.skip)}
        onChange={(skip) => setQueries((prev) => ({ ...prev, skip: String(skip) }))}
      />
    </PageWrapper>
  )
}
