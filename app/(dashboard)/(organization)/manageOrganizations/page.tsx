'use client'

import FilterBar from '@/components/Common/Filter/FilterBar'
import SearchBar from '@/components/Common/Filter/SearchBar'
import PageWrapper from '@/components/Common/PageWrapper'
import OrganizationTable from '@/components/Organization/Preview/OrganizationTable'
import { organizationFilterOptions } from '@/data/FilterOptions/organizationFilterOptions'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function ManageOrganizations() {
  const { userId } = useAuth()
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('')
  const items = 6
  const myOrganizationsEndpoint = `/api/organization?userId=${userId}&take=${items}`

  async function loadOrganizations(apiEndpoint: string) {
    try {
      setIsLoadingOrganizations(true)

      const res = await fetch(apiEndpoint, { method: 'GET' })
      const tempOrganizations = (await res.json()) as OrganizationExtended[]
      console.log('orgs:', tempOrganizations)

      setOrganizations(tempOrganizations ?? [])
    } catch (err) {
      console.error(err)
    } finally {
      setTimeout(() => {
        setIsLoadingOrganizations(false)
      }, 500)
    }
  }

  useEffect(() => {
    loadOrganizations(myOrganizationsEndpoint)
  }, [myOrganizationsEndpoint])

  return (
    <PageWrapper title="Manage Organizations" description="Description placeholder">
      <div className="sm:flex sm:space-x-6">
        <div className="w-full sm:w-1/2">
          <FilterBar filterOptions={organizationFilterOptions} setFilter={setFilter} />
        </div>
        <div className="w-full pt-4 sm:w-1/2 sm:pt-0">
          <SearchBar setSearchInput={setSearchInput} label="Search name" />
        </div>
      </div>

      <div className="py-5">
        <OrganizationTable isLoadingOrganizations={isLoadingOrganizations} organizations={organizations} />
      </div>
    </PageWrapper>
  )
}
