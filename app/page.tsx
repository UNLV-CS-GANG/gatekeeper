import EventTable from '@/components/EventTable'
import { auth } from '@clerk/nextjs'

export default function Home() {
  const { userId } = auth()

  return (
    <div>
      <EventTable userId={userId} />
    </div>
  )
}
