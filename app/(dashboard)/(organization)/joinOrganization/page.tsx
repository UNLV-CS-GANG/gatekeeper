'use client'

import SearchBar from '@/components/Common/Filter/SearchBar'
import Iterator from '@/components/Common/Iterator'
import PageWrapper from '@/components/Common/PageWrapper'
import OrganizationTable from '@/components/Organization/Preview/OrganizationTable'
import useLoadData from '@/hooks/useLoadData'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { LockOpenIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function CreateOrganization() {
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [skips, setSkips] = useState(0)
  const publicOrganizationsEndpoint = `/api/organization?isPublic=true`

  useLoadData((data) => setOrganizations(data ?? []), publicOrganizationsEndpoint, setIsLoadingOrganizations, 500)

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
          <SearchBar setSearchInput={setSearchInput} label="Search by name" />
        </div>
      </div>

      <div className="py-5">
        <OrganizationTable isLoadingOrganizations={isLoadingOrganizations} organizations={organizations} />
      </div>

      <Iterator allItemsCount={0} itemsCount={0} displayCount={0} skips={skips} setSkips={setSkips} />
    </PageWrapper>
  )
}
