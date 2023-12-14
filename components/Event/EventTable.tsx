'use client'

import EventRow from './EventRow'
import useLoadData from '@/hooks/useLoadData'
import { Event, Invite } from '@prisma/client'
import { useState } from 'react'

interface EventExtended extends Event {
  invites: Invite[]
}

export default function EventTable({ userId }: { userId: string | null }) {
  const [events, setEvents] = useState<Event[]>([])
  useLoadData((data) => {
    setEvents(data)
    console.log('events:', events)
  }, `/api/event?hostId=${userId}`)

  return (
    <>
      <div className="rounded-xl bg-white py-4">
        <div className="max-h-[30rem] overflow-auto px-4">
          <table className="w-full">
            <thead>
              <tr className="bg-white">
                <th className="sticky top-0 bg-white py-4 pl-3 text-left text-sm font-semibold uppercase text-gray-400">
                  Title
                </th>
                <th className="sticky top-0 bg-white py-4 text-center text-sm font-semibold uppercase text-gray-400">
                  Location
                </th>
                <th className="sticky top-0 bg-white py-4 text-center text-sm font-semibold uppercase text-gray-400">
                  Access ends
                </th>
                <th className="sticky top-0 bg-white py-4 pr-3 text-right text-sm font-semibold uppercase text-gray-400">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {events.map((event: Event, index: number) => (
                <EventRow key={index} event={event as EventExtended} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
