import EventForm from '@/components/Event/EventForm'
import PageWrapper from '@/components/Common/PageWrapper'

export default function CreateEvent() {
  return (
    <PageWrapper title="New Event" description="Create a new event">
      <EventForm />
    </PageWrapper>
  )
}
