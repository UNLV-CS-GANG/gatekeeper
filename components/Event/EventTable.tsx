'use client'

import EventRow from './EventRow'
import useLoadData from '@/hooks/useLoadData'
import { Event, Invite } from '@prisma/client'
import { useState } from 'react'
import NoData from '../State/NoData'

interface EventExtended extends Event {
  invites: Invite[]
}

export default function EventTable({ userId }: { userId: string | null }) {
  const [events, setEvents] = useState<Event[]>([])
  const [eventsAreLoading, setEventsAreLoading] = useState(false)

  useLoadData(
    (data) => {
      setEvents(data)
      console.log('events:', events)
    },
    `/api/event?hostId=${userId}`,
    () => {
      setEventsAreLoading(true)
    },
    () => {
      setEventsAreLoading(false)
    }
  )

  return (
    <>
      <div className="rounded-xl bg-white py-4">
        <div className="max-h-[31.5rem] min-h-[31.5rem] w-full overflow-auto px-4">
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
              {!eventsAreLoading ? (
                events.length > 0 ? (
                  events.map((event: Event, index: number) => (
                    <EventRow key={index} event={event as EventExtended} />
                  ))
                ) : (
                  <div className="absolute flex justify-center pt-10 sm:w-3/5 lg:w-2/3">
                    <NoData />
                  </div>
                )
              ) : (
                [1, 2, 3, 4, 5, 6, 7, 8].map((row: number, index: number) => (
                  <tr key={index} className="w-full">
                    <td className="h-16 whitespace-nowrap rounded-l-lg pl-3 text-left">
                      <div className="mx-1.5 h-1/2 animate-pulse rounded-full bg-gray-300 bg-opacity-60" />
                    </td>
                    <td className="h-16 whitespace-nowrap text-center">
                      <div className="mx-1.5 h-1/2 animate-pulse rounded-full bg-gray-300 bg-opacity-60" />
                    </td>
                    <td className="h-16 whitespace-nowrap text-center">
                      <div className="mx-1.5 h-1/2 animate-pulse rounded-full bg-gray-300 bg-opacity-60" />
                    </td>
                    <td className="h-16 whitespace-nowrap rounded-r-lg pr-3 text-right">
                      <div className="mx-1.5 h-1/2 animate-pulse rounded-full bg-gray-300 bg-opacity-60" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
