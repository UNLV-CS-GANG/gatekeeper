import EventRow from './EventRow'
import { Event } from '@prisma/client'
import NoData from '../State/NoData'
import EventExtended from '@/types/EventExtended'

export default function EventTable({
  events,
  eventsAreLoading,
  reload,
  rows,
  isHost,
}: {
  events: Event[]
  eventsAreLoading: boolean
  reload: () => void
  rows: number
  isHost: boolean
}) {
  return (
    <>
      <div className="py-4">
        <div className="min-h-[18rem] w-full overflow-auto sm:min-h-[27.5rem]">
          <table className="w-full" cellPadding={0}>
            <thead>
              <tr className="bg-gray-200">
                <th className="sticky top-0 py-5 pl-4 text-left text-xs font-semibold uppercase text-gray-500 text-opacity-80 sm:pl-10">
                  Title
                </th>
                <th className="sticky top-0 py-5 text-center text-xs font-semibold uppercase text-gray-500 text-opacity-80">
                  Location
                </th>
                <th className="sticky top-0 py-5 pr-4 text-right text-xs font-semibold uppercase text-gray-500 text-opacity-80 sm:pr-0 sm:text-center">
                  Access
                </th>
                <th className="sticky top-0 hidden py-5 pr-4 text-right text-xs font-semibold uppercase text-gray-500 text-opacity-80 sm:block sm:pr-10">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {!eventsAreLoading &&
                events.length > 0 &&
                events.map((event: Event, index: number) => (
                  <EventRow key={index} event={event as EventExtended} reload={reload} isHost={isHost} />
                ))}

              {eventsAreLoading &&
                new Array(rows).fill(1).map((_: number, index: number) => (
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
                      <div className="mt-2 hidden h-[4.2rem] bg-white sm:block">
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
