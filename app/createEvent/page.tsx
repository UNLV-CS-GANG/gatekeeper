import EventForm from '@/components/Event/EventForm'
import PageWrapper from '@/components/PageWrapper'
import authFetch from '@/lib/authFetch'

import { auth } from '@clerk/nextjs'
import { Event } from '@prisma/client'

export default function CreateEvent() {
  const { userId } = auth()

  async function postEvent(event: Event) {
    'use server'

    try {
      const res = await authFetch(`${process.env.BASE_URL}/api/event`, {
        method: 'POST',
        body: JSON.stringify(event),
      })

      if (!res.ok) throw Error('Bad request')

      console.log('Successful post:', await res.json())
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <PageWrapper title="New Event" description="Create a new event">
      <EventForm postEvent={postEvent} userId={userId} />
    </PageWrapper>
  )
}
