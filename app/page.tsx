import EventTable from '@/components/EventTable'
import RouteButton from '@/components/RouteButton'
import { auth } from '@clerk/nextjs'

export default function Home() {
  const { userId } = auth()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 mt-8">
        <RouteButton route="/createEvent">New Event</RouteButton>
      </div>

      <div className="mb-4">
        <EventTable userId={userId} />
      </div>
    </div>
  )
}

// trigger vercel deployment
