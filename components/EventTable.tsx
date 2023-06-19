import { Event } from '@prisma/client'
import EventRow from './EventRow'

export default function EventTable({ events }: { events: Event[] }) {
  return (
    <div className="container mx-auto">
      <table className="divide-y divide-gray-700">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-4 py-3.5 text-center text-xl font-bold text-black sm:px-0"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-center text-xl font-bold text-black sm:px-0"
            >
              {' '}
              Location
            </th>
          </tr>
        </thead>
        <tbody className="px-4 py-3.5 text-center text-sm text-black sm:px-0">
          {events.map((event: Event, index: number) => (
            <EventRow key={index} event={event} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
