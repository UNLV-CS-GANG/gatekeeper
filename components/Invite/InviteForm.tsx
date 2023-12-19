'use client'

import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Event } from '@prisma/client'
import { useRouter } from 'next/navigation'
import useLoadData from '@/hooks/useLoadData'
import Loader from '../State/Loader'
import FormSubmitButton from '../FormSubmitButton'
import getDateTime from '@/lib/getDateTime'

export default function InviteForm({ eventId }: { eventId: string }) {
  const { register, handleSubmit } = useForm()
  const [event, setEvent] = useState<Event>()
  const [isLoading, setIsLoading] = useState(false)
  const [tempEmail, setTempEmail] = useState('')
  const [tempFirstName, setTempFirstName] = useState('')
  const [tempLastName, setTempLastName] = useState('')
  const router = useRouter()

  async function postInvite(data: FieldValues) {
    try {
      const res = await fetch(`/api/public/invite`, {
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
      router.push(`/qr/${invite.id}`)
    } catch (err) {
      console.error('Error:', err)
      return null
    }
  }

  useLoadData(
    (data) => {
      setEvent(data)
    },
    `/api/public/event?id=${eventId}`,
    setIsLoading
  )

  return (
    <div className="relative mt-10 flex h-3/5 place-items-center justify-center">
      <div className="w-1/2 rounded-xl bg-white p-10 shadow-md">
        <div className="pb-6">
          <p className="pb-4 text-center text-gray-500">
            You are invited! Fill out the information to receive your QR code.
            Keep this handy for getting access to the event.
          </p>
          <hr />
          <h1 className="pt-6 text-center text-2xl font-medium text-gray-700">
            {event?.title}
          </h1>
          <p className="pb-6 text-center text-gray-500">{event?.description}</p>
          <p className="text-center text-gray-500">{event?.location}</p>
          <p className="text-center text-gray-500">
            {`${getDateTime(
              new Date(event?.accessStart as Date)
            )} - ${getDateTime(new Date(event?.accessEnd as Date))}`}
          </p>
        </div>

        <form
          onSubmit={handleSubmit((data) => {
            postInvite(data)
          })}
          className="flex flex-col space-y-2"
        >
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
            >
              Email
            </label>
            <input
              className="h-16 w-full rounded-md border px-4 pt-6 text-gray-800"
              type="text"
              id="email"
              placeholder="janedoe@gmail.com"
              maxLength={60}
              value={tempEmail}
              {...register('email', {
                required: true,
                maxLength: 60,
              })}
              onChange={(ev) => setTempEmail(ev.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <div className="relative w-1/2">
              <label
                htmlFor="first-name"
                className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
              >
                First name
              </label>
              <input
                className="h-16 w-full rounded-md border px-4 pt-6 text-gray-800"
                type="text"
                id="first-name"
                placeholder="Jane"
                maxLength={60}
                value={tempFirstName}
                {...register('firstName', {
                  required: true,
                  maxLength: 60,
                })}
                onChange={(ev) => setTempFirstName(ev.target.value)}
              />
            </div>

            <div className="relative w-1/2">
              <label
                htmlFor="last-name"
                className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
              >
                Last name
              </label>
              <input
                className="h-16 w-full rounded-md border px-4 pt-6 text-gray-800"
                type="text"
                id="last-name"
                placeholder="Doe"
                maxLength={60}
                value={tempLastName}
                {...register('lastName', {
                  required: true,
                  maxLength: 60,
                })}
                onChange={(ev) => setTempLastName(ev.target.value)}
              />
            </div>
          </div>

          <FormSubmitButton
            text="Accept Invitation"
            isDisabled={!tempEmail || !tempFirstName || !tempLastName}
          />
        </form>
      </div>

      <Loader isLoading={isLoading} />
    </div>
  )
}
