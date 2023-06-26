'use client'

import { useEffect } from "react";

export default async function useLoadData(onDataLoaded: (data: any) => void, apiEndpoint: string) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiEndpoint, { method: 'GET' });
        const data = await res.json();
        onDataLoaded(data)
      } catch (err) {
        console.error('Error:', err);
      }
    }
    fetchData();
  }, []);
}
