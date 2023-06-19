'use client'

import { Event } from '@prisma/client'
import { Divider } from '@mui/material'
import { UserButton } from '@clerk/nextjs'

import { useEffect, useState } from 'react'

import EventTable from '@/components/EventTable'
import RouteButton from '@/components/RouteButton'

export default function Home() {
  /**
   * Keep track of events in state
   * */
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const getEvents = async () => {
      const res = await fetch('/api/event', { method: 'GET' })
      const { events } = await res.json()
      setEvents(events)
    }
    getEvents()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-8">
        <UserButton afterSignOutUrl="/" />
      </div>

      <div>
        <RouteButton route="/createEvent">Create Event</RouteButton>
      </div>

      <div>
        <EventTable events={events} />
      </div>
    </div>
  )
}
