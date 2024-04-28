'use client'

import PageWrapper from '@/components/Common/PageWrapper'
import OrganizationGrid from '@/components/Organization/OrganizationGrid'
import useLoadData from '@/hooks/useLoadData'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { useState } from 'react'

export default function CreateOrganization() {
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const items = 6
  const publicOrganizationsEndpoint = `/api/organization?isPublic=true`

  useLoadData((data) => setOrganizations(data ?? []), publicOrganizationsEndpoint, setIsLoadingOrganizations, 500)

  return (
    <PageWrapper title="Join Organization" description="Description placeholder">
      <OrganizationGrid
        organizations={organizations}
        isLoadingOrganizations={isLoadingOrganizations}
        itemsToDisplay={items}
      />
    </PageWrapper>
  )
}
