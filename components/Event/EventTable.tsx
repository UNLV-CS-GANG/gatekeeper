'use client'

import EventRow from './EventRow'
import { Event, Invite } from '@prisma/client'
import NoData from '../State/NoData'

interface EventExtended extends Event {
  invites: Invite[]
}

export default function EventTable({
  events,
  eventsAreLoading,
}: {
  events: Event[]
  eventsAreLoading: boolean
}) {
  return (
    <>
      <div className="py-4">
        <div className="min-h-[28.5rem] w-full overflow-auto">
          <table className="w-full" cellPadding={0}>
            <thead>
              <tr className="bg-gray-200">
                <th className="sticky top-0 py-5 pl-10 text-left text-xs font-semibold uppercase text-gray-500 text-opacity-80">
                  Title
                </th>
                <th className="sticky top-0 py-5 text-center text-xs font-semibold uppercase text-gray-500 text-opacity-80">
                  Location
                </th>
                <th className="sticky top-0 py-5 text-center text-xs font-semibold uppercase text-gray-500 text-opacity-80">
                  Access
                </th>
                <th className="sticky top-0 py-5 pr-10 text-right text-xs font-semibold uppercase text-gray-500 text-opacity-80">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {!eventsAreLoading &&
                events.length > 0 &&
                events.map((event: Event, index: number) => (
                  <EventRow key={index} event={event as EventExtended} />
                ))}
              {eventsAreLoading &&
                [1, 2, 3, 4, 5].map((row: number, index: number) => (
                  <tr key={index} className="drop-shadow-md">
                    <td>
                      <div className="mt-2 h-[4.2rem] bg-white">
                        <div className="flex h-full place-items-center">
                          <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mt-2 h-[4.2rem] bg-white">
                        <div className="flex h-full place-items-center">
                          <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mt-2 h-[4.2rem] bg-white">
                        <div className="flex h-full place-items-center">
                          <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mt-2 h-[4.2rem] bg-white">
                        <div className="flex h-full place-items-center">
                          <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!eventsAreLoading && events.length === 0 && (
            <div className="mt-2 h-[4.2rem] bg-white drop-shadow-md">
              <div className="flex h-full place-items-center justify-center">
                <NoData />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
