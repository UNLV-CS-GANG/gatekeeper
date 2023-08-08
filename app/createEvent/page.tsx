import EventForm   from '@/components/EventForm'
import RouteButton from '@/components/RouteButton'
import authFetch from '@/lib/authFetch'

import { auth }  from '@clerk/nextjs'
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
    <div className='h-[calc(100vh-4rem)] flex justify-center place-items-center'>
      <div className='w-max ring-1 rounded-lg p-6 bg-gray-50 ring-gray-300 shadow-lg'>
        <EventForm postEvent={postEvent} userId={userId} />
      </div>
    </div>
  )
}
