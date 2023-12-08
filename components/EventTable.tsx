'use client'

import EventRow from './EventRow'
import useLoadData from '@/hooks/useLoadData'
import { Event } from '@prisma/client'
import { useState } from 'react'

export default function EventTable({ userId }: { userId: string | null }) {
  const [events, setEvents] = useState<Event[]>([])
  useLoadData((data) => {
    setEvents(data.events)
  }, `/api/event?hostId=${userId}`)

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table>
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {' '}
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {events.map((event: Event, index: number) => (
                    <EventRow key={index} event={event} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
