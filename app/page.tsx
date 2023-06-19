'use client'

import EventTable from '@/components/EventTable'
import RouteButton from '@/components/RouteButton'
import { UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Event } from '@prisma/client'

export default function Home() {
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
    <div>
      <UserButton afterSignOutUrl="/" />

      <div>
        <RouteButton route="/createEvent">Create Event</RouteButton>
      </div>

      <div>
        <EventTable events={events} />
      </div>
    </div>
  )
}
