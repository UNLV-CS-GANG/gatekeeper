'use client'

import { useState, useEffect } from "react";

export default async function useLoadEvent(onDataLoaded: (data: any) => void, eventId?: string) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEndpoint = eventId? `/api/event?id=${eventId}` : '/api/event';
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
