'use client'

import EventTable from '@/components/EventTable'
import RouteButton from '@/components/RouteButton'

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
    <div className="flex flex-col items-center justify-center">
      {/* <div className="my-8">
        <UserButton afterSignOutUrl="/" />
      </div> */}

      <div className="mt-8 mb-4">
        <RouteButton route="/createEvent">Create Event</RouteButton>
      </div>

      <div className="mb-4">
        <EventTable events={events} />
      </div>
    </div>
  )
}
