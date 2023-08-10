'use client'

// External Dependencies
import { useState } from 'react'
import { utcToZonedTime, format } from 'date-fns-tz'
import { Event as PrismaEvent, Invite } from '@prisma/client'
import { useRouter } from 'next/navigation'

// Internal Dependencies
import RouteButton from '@/components/RouteButton'
import useLoadData from '@/hooks/useLoadData'

// Extend Prisma Event type
interface ExtendedEvent extends PrismaEvent {
  invites?: Invite[]
}

// Date formatting utility
function formatToPacific(date?: Date): string {
  if (!date) return ''
  const pacificTime = utcToZonedTime(date, 'America/Los_Angeles')
  return format(pacificTime, 'yyyy-MM-dd', {
    timeZone: 'America/Los_Angeles',
  })
}

// Component for displaying accepted invites
function AcceptedInvites({ invites }: { invites?: Invite[] }) {
  // if (!invites?.length) return null

  return (
    <div className="mb-4">
      Accepted Invites:
      {invites?.map((inv, index) => (
        <li key={index} className="list-none">
          {inv.firstName} {inv.lastName}
        </li>
      ))}
    </div>
  )
}

export default function ManageEvent({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<ExtendedEvent>()
  const router = useRouter()

  useLoadData((data) => {
    setEvent(data.event)
  }, `/api/event?id=${params.id}`)

  const handleInviteLinkClick = () => {
    if (event?.inviteLink) {
      router.push(event.inviteLink)
    }
  }

  return (
    <div className="flex h-full w-full ">
      <div className="m-auto w-max rounded-lg bg-gray-50 p-4 ring-1 ring-gray-300 ">
        <h1 className="mb-4 text-lg font-semibold">{event?.title}</h1>
        <p>location: {event?.location}</p>
        <p>
          access from {formatToPacific(event?.accessStart)} to{' '}
          {formatToPacific(event?.accessEnd)}
        </p>
        <p>
          invite link:
          <button onClick={handleInviteLinkClick}>{event?.inviteLink}</button>
        </p>
        <AcceptedInvites invites={event?.invites} />
        <RouteButton route="/">Back</RouteButton>
      </div>
    </div>
  )
}
