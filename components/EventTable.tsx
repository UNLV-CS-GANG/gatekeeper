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
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
            >
              Title
            </th>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
            >
              {' '}
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event: Event, index: number) => (
            <EventRow key={index} event={event} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
