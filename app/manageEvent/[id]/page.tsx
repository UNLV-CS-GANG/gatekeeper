'use client'

import { useState } from 'react'
import { Event } from '@prisma/client'
import RouteButton from '@/components/RouteButton'
import useLoadData from '@/hooks/useLoadData'
// import { useRouter } from 'next/navigation'

export default function ManageEvent({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event>()
  // const router = useRouter()
  useLoadData((data) => {
    setEvent(data.event)
  }, `/api/event?id=${params.id}`)

  return (
    <div>
      <p>temp page layout for now...</p>
      <p>id: {event?.id}</p>
      <p>title: {event?.title}</p>
      <p>location: {event?.location}</p>
      <p>
        access from {String(event?.accessStart)} to {String(event?.accessEnd)}
      </p>
      <p>
        invite link:
        {/* <button onClick={() => { router.push(event?.inviteLink) }}>{ event?.inviteLink }</button> */}
      </p>

      {/* <div>
				Accepted Invites:
				{ event?.invites.map((inv: Invite, index: number) => (
					<li key={index}>{ inv.firstName } { inv.lastName }</li>
				)) }
			</div> */}

      <RouteButton route="/">Back</RouteButton>
    </div>
  )
}
