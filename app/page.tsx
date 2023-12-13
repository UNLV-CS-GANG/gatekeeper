import EventTable from '@/components/EventTable'
import PageHeader from '@/components/PageHeader'
import { auth } from '@clerk/nextjs'

export default function Home() {
  const { userId } = auth()

  return (
    <>
      <PageHeader title="My Events" description="View and manage your events" />
      <EventTable userId={userId} />
    </>
  )
}
