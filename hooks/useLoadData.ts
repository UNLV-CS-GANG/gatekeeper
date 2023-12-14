'use client'

import { useEffect } from 'react'

export default async function useLoadData(
  onDataLoaded: (data: any) => void,
  apiEndpoint: string,
  onStart?: () => void,
  onEnd?: () => void
) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (onStart) onStart()
        const res = await fetch(apiEndpoint, { method: 'GET' })
        const data = await res.json()
        onDataLoaded(data)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        if (onEnd) onEnd()
      }
    }
    fetchData()
  }, [])
}
