'use client'

import PageWrapper from '@/components/Common/PageWrapper'
import OrganizationTable from '@/components/Organization/Preview/OrganizationTable'
import useLoadData from '@/hooks/useLoadData'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { useState } from 'react'

export default function CreateOrganization() {
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const publicOrganizationsEndpoint = `/api/organization?isPublic=true`

  useLoadData((data) => setOrganizations(data ?? []), publicOrganizationsEndpoint, setIsLoadingOrganizations, 500)

  return (
    <PageWrapper title="Join Organization" description="Description placeholder">
      <OrganizationTable isLoadingOrganizations={isLoadingOrganizations} organizations={organizations} />
    </PageWrapper>
  )
}
