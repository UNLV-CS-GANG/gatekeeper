/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'

export default async function useLoadData(
  onDataLoaded: (data: any) => void,
  apiEndpoint: string,
  setIsLoading?: Dispatch<SetStateAction<boolean>>,
  delay?: number
) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (setIsLoading) setIsLoading(true)
        const res = await fetch(apiEndpoint, { method: 'GET' })
        const data = await res.json()
        onDataLoaded(data)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        if (setIsLoading) setTimeout(() => setIsLoading(false), delay ?? 0)
      }
    }
    fetchData()
  }, [])
}
