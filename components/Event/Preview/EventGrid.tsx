import NoData from '@/components/State/NoData'
import EventExtended from '@/types/EventExtended'
import EventGridItem from './EventGridItem'
import EventGridItemLoading from './EventGridItemLoading'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  return (
    <ul className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 xl:grid-cols-3">
      {isLoadingEvents &&
        new Array(displayCount).fill(0).map((_: number, i: number) => <EventGridItemLoading key={i} />)}

      {!isLoadingEvents &&
        events.length > 0 &&
        events.map((event: EventExtended, i: number) => <EventGridItem key={i} event={event} reload={reload} />)}

      {!isLoadingEvents && events.length < displayCount && (
        <button
          onClick={() => router.push('/createEvent')}
          className="flex h-48 cursor-pointer place-items-center justify-center text-gray-300 outline-dashed outline-4 -outline-offset-4 outline-gray-300 transition-all duration-150 hover:scale-105 hover:text-gray-400 hover:outline-gray-400"
        >
          <PlusCircleIcon className="h-12 w-12" />
        </button>
      )}
    </ul>
  )
}
