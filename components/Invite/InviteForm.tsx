'use client'

import { Invite } from '@prisma/client'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Event } from '@prisma/client'
import { useRouter } from 'next/navigation'
import useLoadData from '@/hooks/useLoadData'

export default function InviteForm({ eventId }: { eventId: string }) {
  const { register, handleSubmit } = useForm()
  const [event, setEvent] = useState<Event>()
  const router = useRouter()

  async function postInvite(data: FieldValues) {
    try {
      const res = await fetch(`/api/invite`, {
        method: 'POST',
        body: JSON.stringify({
          qr: '',
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          eventId,
        }),
      })

      if (!res.ok) throw Error('Bad request')

      const invite = await res.json()
      console.log('Successful post:', invite)

      // open qr code
      if (invite) {
        router.push(`/accessQrCode/${invite.id}`)
      }
    } catch (err) {
      console.error('Error:', err)
      return null
    }
  }

  // async function onSubmit(data: FieldValues) {
  //   const invite: Invite = await postInvite({
  //     qr: '',
  //     isScanned: false,
  //     email: data.email,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     eventId,
  //   } as Invite)

  //   // open qr code
  //   if (invite) {
  //     router.push(`/accessQrCode/${invite.id}`)
  //   }
  // }

  useLoadData((data) => {
    setEvent(data)
  }, `/api/event?id=${eventId}`)

  return (
    <div>
      <div>
        Event: {event?.title}
        Location: {event?.location}
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          postInvite(data)
        })}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="text-black"
            type="email"
            id="email"
            {...register('email', { required: true, maxLength: 60 })}
          />
        </div>

        <div>
          <label htmlFor="firstName">First name:</label>
          <input
            className="text-black"
            type="firstName"
            id="firstName"
            {...register('firstName', { required: true, maxLength: 60 })}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last name:</label>
          <input
            className="text-black"
            type="lastName"
            id="lastName"
            {...register('lastName', { required: true, maxLength: 60 })}
          />
        </div>

        <div>
          <button type="submit">Accept</button>
        </div>
      </form>
    </div>
  )
}
