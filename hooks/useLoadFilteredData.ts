'use client'

import { EventQueryOptions } from './../types/Event/EventQueryOptions'
import { OrganizationQueryOptions } from '@/types/Organization/OrganizationQueryOptions'
import { EventsPreviewResponse } from '@/types/Event/EventsPreviewResponse'
import { OrganizationsPreviewResponse } from '@/types/Organization/OrganizationsPreviewResponse'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { EndpointQueryBuilder } from '@/lib/EndpointQueryBuilder'

export type LoadFilteredDataParams = {
  onDataLoaded: (data: EventsPreviewResponse | OrganizationsPreviewResponse) => void
  endpoint: string
  queries: EventQueryOptions | OrganizationQueryOptions
  setIsLoading?: Dispatch<SetStateAction<boolean>>
  delay?: number
}

export async function useLoadFilteredData(params: LoadFilteredDataParams) {
  useEffect(() => {
    let endpointWithFilters = params.endpoint

    const applyFilters = () => {
      const queryBuilder = new EndpointQueryBuilder(params.endpoint)

      for (const key in params.queries) {
        queryBuilder.addQuery(
          key as keyof (EventQueryOptions | OrganizationQueryOptions),
          params.queries[key as keyof (EventQueryOptions | OrganizationQueryOptions)]
        )
      }

      endpointWithFilters = queryBuilder.getEndpoint()
    }

    const fetchData = async () => {
      try {
        if (params.setIsLoading) params.setIsLoading(true)
        const res = await fetch(endpointWithFilters, { method: 'GET' })
        const data = await res.json()
        params.onDataLoaded(data)
      } catch (err) {
        console.error('Error in "useLoadFilteredData":', err)
      } finally {
        setTimeout(() => {
          if (params.setIsLoading) params.setIsLoading(false)
        }, params.delay ?? 0)
      }
    }

    applyFilters()
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.endpoint, JSON.stringify(params.queries)])
}
