'use client'

import PageWrapper from '@/components/Common/PageWrapper'
import OrganizationGrid from '@/components/Organization/OrganizationGrid'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function ManageOrganizations() {
  const { userId } = useAuth()
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false)
  const [organizations, setOrganizations] = useState<OrganizationExtended[]>([])
  const items = 6
  const myOrganizationsEndpoint = `/api/organization?userId=${userId}&take=${items}`

  async function loadOrganizations(apiEndpoint: string) {
    try {
      setIsLoadingOrganizations(true)

      const res = await fetch(apiEndpoint, { method: 'GET' })
      const tempOrganizations = (await res.json()) as OrganizationExtended[]
      console.log('orgs:', tempOrganizations)

      setOrganizations(tempOrganizations)
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
      <OrganizationGrid
        organizations={organizations}
        isLoadingOrganizations={isLoadingOrganizations}
        itemsToDisplay={items}
      />
    </PageWrapper>
  )
}
