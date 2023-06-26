import EventTable from '@/components/EventTable'
import RouteButton from '@/components/RouteButton'
import { auth } from '@clerk/nextjs'

export default function Home() {
	const { userId } = auth();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-8 mb-4">
        <RouteButton route="/createEvent">New Event</RouteButton>
      </div>

      <div className="mb-4">
        <EventTable userId={userId} />
      </div>
    </div>
  )
}
