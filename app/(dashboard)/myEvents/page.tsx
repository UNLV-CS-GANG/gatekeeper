import EventTable from '@/components/Event/EventTable'
import PageWrapper from '@/components/PageWrapper'
import { auth } from '@clerk/nextjs'

export default function MyEvents() {
  const { userId } = auth()

  return (
    <PageWrapper title="My Events" description="View and manage your events">
      <EventTable userId={userId} />
    </PageWrapper>
  )
}
