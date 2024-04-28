import NoData from '@/components/State/NoData'
import EventExtended from '@/types/EventExtended'
import EventGridItem from './EventGridItem'
import EventGridItemLoading from './EventGridItemLoading'

export default function EventGrid({
  events,
  isLoadingEvents,
  displayCount,
  reload,
}: {
  events: EventExtended[]
  isLoadingEvents: boolean
  displayCount: number
  reload: () => void
}) {
  return (
    <ul className="sm:gap-5 lg:grid lg:grid-cols-2 xl:grid-cols-3">
      {isLoadingEvents &&
        new Array(displayCount).fill(0).map((_: number, i: number) => <EventGridItemLoading key={i} />)}

      {!isLoadingEvents &&
        events.length > 0 &&
        events.map((event: EventExtended, i: number) => <EventGridItem key={i} event={event} reload={reload} />)}

      {!isLoadingEvents && events.length === 0 && (
        <li className="flex h-48 place-items-center justify-center bg-white drop-shadow-md">
          <NoData />
        </li>
      )}
    </ul>
  )
}
