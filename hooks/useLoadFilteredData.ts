'use client'

import { EventQueryOptions } from './../types/Event/EventQueryOptions'
import { EventsPreviewResponse } from '@/types/Event/EventsPreviewResponse'
import { EventFilterQuery } from '@/types/enums/EventFilterQuery'
import { Dispatch, SetStateAction, useEffect } from 'react'

export type LoadFilteredDataParams = {
  onDataLoaded: (data: EventsPreviewResponse) => void
  apiEndpoint: string
  skips: number
  displayCount: number
  filter?: EventFilterQuery
  searchInput?: string
  organizationId?: string
  setIsLoading?: Dispatch<SetStateAction<boolean>>
  delay?: number
}

export async function useLoadFilteredData(params: LoadFilteredDataParams, reloadTrigger?: boolean) {
  useEffect(() => {
    const endpointWithFilters = [params.apiEndpoint]

    // append to endpoints that may or may not already have queries (modifies endpt by reference)
    const addQuery = (query: keyof EventQueryOptions, value: string | number, endpoint: string[]) => {
      if (endpoint.includes('?')) {
        endpoint[0] += `&${query}=${value}`
      } else {
        endpoint[0] += `?${query}=${value}`
      }
    }

    const applyFilters = () => {
      if (params.filter) addQuery('filter', params.filter, endpointWithFilters)
      if (params.searchInput) addQuery('search', params.searchInput, endpointWithFilters)
      if (params.organizationId) addQuery('organizationId', params.organizationId, endpointWithFilters)
      if (params.skips > 0) addQuery('skip', params.skips * params.displayCount, endpointWithFilters)
    }

    const fetchData = async () => {
      try {
        if (params.setIsLoading) params.setIsLoading(true)
        const res = await fetch(endpointWithFilters[0], { method: 'GET' })
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
  }, [reloadTrigger])
}
