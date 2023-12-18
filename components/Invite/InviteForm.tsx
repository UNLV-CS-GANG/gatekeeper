/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Event, Invite } from '@prisma/client'
import useLoadData from '@/hooks/useLoadData'
import Loader from '../State/Loader'
import FormSubmitButton from '../FormSubmitButton'
import getDateTime from '@/lib/getDateTime'
import QRCode from 'qrcode'
import EmailQrProps from '@/types/email/EmailQrProps'

export default function InviteForm({ eventId }: { eventId: string }) {
  const { register, handleSubmit } = useForm()
  const [event, setEvent] = useState<Event>()
  const [isLoading, setIsLoading] = useState(false)
  const [tempEmail, setTempEmail] = useState('')
  const [tempFirstName, setTempFirstName] = useState('')
  const [tempLastName, setTempLastName] = useState('')
  const [qrSrc, setQrSrc] = useState('')

  async function email() {
    const res = await fetch(`/api/email?to=${tempEmail}&template=qr`, {
      method: 'POST',
      body: JSON.stringify({
        qrSrc,
        title: event?.title,
        description: event?.description,
        location: event?.location,
        accessStart: new Date(event?.accessStart as Date).toLocaleString(),
        accessEnd: new Date(event?.accessEnd as Date).toLocaleString(),
        username: tempFirstName,
      } as EmailQrProps),
    })

    console.log('email res:', await res.json())
  }

  async function postInvite(data: FieldValues) {
    try {
      const invRes = await fetch(`/api/invite`, {
        method: 'POST',
        body: JSON.stringify({
          qr: '',
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          eventId,
        }),
      })

      if (!invRes.ok) throw Error('Bad request')

      const invite = (await invRes.json()) as Invite
      console.log('Successful post:', invite)

      QRCode.toDataURL(invite.qr).then(setQrSrc)
    } catch (err) {
      console.error('Error:', err)
      return null
    }
  }

  useLoadData(
    (data) => {
      setEvent(data)
    },
    `/api/event?id=${eventId}`,
    setIsLoading
  )

  useEffect(() => {
    if (qrSrc) {
      console.log('email use effect triggered')
      email()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrSrc])

  return (
    <>
      {!qrSrc && (
        <div className="relative mt-10 flex h-3/5 place-items-center justify-center">
          <div className="w-1/2 rounded-xl bg-white p-10 shadow-md">
            <div className="pb-6">
              <p className="pb-4 text-center text-gray-500">
                You are invited! Fill out the information to receive your QR
                code. Keep this handy for getting access to the event.
              </p>
              <hr />
              <h1 className="pt-6 text-center text-2xl font-medium text-gray-700">
                {event?.title}
              </h1>
              <p className="pb-6 text-center text-gray-500">
                {event?.description}
              </p>
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
                isDisabled={
                  !tempEmail || !tempFirstName || !tempLastName || isLoading
                }
              />
            </form>
          </div>

          <Loader isLoading={isLoading} />
        </div>
      )}
      {qrSrc && (
        <div className="h-full w-full">
          <div className="relative flex place-items-center justify-center">
            <div className="rounded-xl bg-white p-3">
              {qrSrc && <img src={qrSrc} alt="qr" />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
