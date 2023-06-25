'use client'

import EventTable from '@/components/EventTable'
import RouteButton from '@/components/RouteButton'

import { useState } from 'react'
import { Event } from '@prisma/client'
import useLoadEvent from '@/hooks/useLoadEvent'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
	useLoadEvent((data) => { setEvents(data.events) })

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-8 mb-4">
        <RouteButton route="/createEvent">Create Event</RouteButton>
      </div>

      <div className="mb-4">
        <EventTable events={events} />
      </div>
    </div>
  )
}
