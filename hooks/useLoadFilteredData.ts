'use client'

import { EventsPreviewResponse } from '@/types/Event/EventsPreviewResponse'
import { EventFilterQuery } from '@/types/enums/EventFilterQuery'
import { Dispatch, SetStateAction, useEffect } from 'react'

export default async function useLoadFilteredData(
  onDataLoaded: (data: EventsPreviewResponse) => void,
  apiEndpoint: string,
  skips: number,
  displayCount: number,
  filter?: EventFilterQuery,
  searchInput?: string,
  setIsLoading?: Dispatch<SetStateAction<boolean>>,
  delay?: number
) {
  useEffect(() => {
    let endpointWithFilters = apiEndpoint

    const applyFilters = () => {
      if (filter) endpointWithFilters += `&filter=${filter}`
      if (searchInput) endpointWithFilters += `&search=${searchInput}`
      if (skips > 0) endpointWithFilters += `&skip=${skips * displayCount}`
    }

    const fetchData = async () => {
      try {
        if (setIsLoading) setIsLoading(true)
        const res = await fetch(endpointWithFilters, { method: 'GET' })
        const data = await res.json()
        onDataLoaded(data)
      } catch (err) {
        console.error('Error in "useLoadFilteredData":', err)
      } finally {
        if (setIsLoading) setTimeout(() => setIsLoading(false), delay ?? 0)
      }
    }

    applyFilters()
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchInput, apiEndpoint, skips, displayCount])
}
