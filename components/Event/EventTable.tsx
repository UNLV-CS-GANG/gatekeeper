import EventRow from './EventRow'
import { Event } from '@prisma/client'
import NoData from '../State/NoData'
import EventExtended from '@/types/EventExtended'
import EventRowLoading from './EventRowLoading'

export default function EventTable({
  events,
  isLoadingEvents,
  reload,
  rows,
  isHost,
}: {
  events: Event[]
  isLoadingEvents: boolean
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
                <th className="sticky top-0 py-5 pl-10 text-left text-xs font-semibold uppercase text-gray-500 text-opacity-80">
                  Title
                </th>
                <th className="sticky top-0 py-5 pr-4 text-right text-xs font-semibold uppercase text-gray-500 text-opacity-80 sm:pr-0 sm:text-center">
                  Access
                </th>
                <th className="sticky top-0 hidden py-5 pr-4 text-right text-xs font-semibold uppercase text-gray-500 text-opacity-80 sm:block sm:pr-10">
                  Status
                </th>
                <th className="block sm:hidden" />
              </tr>
            </thead>

            <tbody>
              {!isLoadingEvents &&
                events.length > 0 &&
                events.map((event: Event, index: number) => (
                  <EventRow key={index} event={event as EventExtended} reload={reload} isHost={isHost} />
                ))}

              {isLoadingEvents &&
                new Array(rows).fill(1).map((_: number, index: number) => <EventRowLoading key={index} />)}
            </tbody>
          </table>

          {!isLoadingEvents && events.length === 0 && (
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
