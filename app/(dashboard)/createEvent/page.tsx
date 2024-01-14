import EventForm from '@/components/Event/EventForm'
import PageWrapper from '@/components/Common/PageWrapper'
import { auth } from '@clerk/nextjs'

export default function CreateEvent() {
  const { userId } = auth()

  return (
    <PageWrapper title="New Event" description="Create a new event">
      <EventForm userId={userId} />
    </PageWrapper>
  )
}
