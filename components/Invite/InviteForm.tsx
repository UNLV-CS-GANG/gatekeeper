/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Event, Invite } from '@prisma/client'
import useLoadData from '@/hooks/useLoadData'
import Loader from '../State/Loader'
import FormSubmitButton from '../Common/FormSubmitButton'
import getDateTime from '@/lib/getDateTime'
import QRCode from 'qrcode'
import QrProps from '@/types/email/QrProps'

export default function InviteForm({ eventId }: { eventId: string }) {
  const { register, handleSubmit } = useForm()
  const [event, setEvent] = useState<Event>()
  const [isLoading, setIsLoading] = useState(false)
  const [tempEmail, setTempEmail] = useState('')
  const [tempFirstName, setTempFirstName] = useState('')
  const [tempLastName, setTempLastName] = useState('')
  const [qrSrc, setQrSrc] = useState('')

  async function email() {
    const res = await fetch(`/api/public/email?to=${tempEmail}&template=qr`, {
      method: 'POST',
      body: JSON.stringify({
        qrSrc,
        title: event?.title,
        description: event?.description,
        location: event?.location,
        accessStart: new Date(event?.accessStart as Date).toLocaleString(),
        accessEnd: new Date(event?.accessEnd as Date).toLocaleString(),
        username: tempFirstName,
      } as QrProps),
    })

    console.log('email res:', await res.json())
  }

  async function postInvite(data: FieldValues) {
    try {
      const invRes = await fetch(`/api/public/invite`, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          eventId,
        }),
      })

      if (!invRes.ok) throw Error('Bad request')

      const invite = (await invRes.json()) as Invite
      console.log('Successful post:', invite)

      QRCode.toDataURL(invite.id).then(setQrSrc)
    } catch (err) {
      console.error(err)
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
        <div className="relative mt-16 flex h-3/5 place-items-center justify-center sm:mt-10">
          <div className="w-full rounded-xl bg-white p-3 shadow-md sm:w-1/2 sm:p-10">
            <div className="pb-6">
              <p className="pb-4 text-center text-sm text-gray-500 sm:text-base">
                You are invited! Fill out the information to receive your QR
                code. You will need it in order to get access into the event.
              </p>
              <hr />
              <h1 className="pt-6 text-center text-xl font-medium text-gray-700 sm:text-2xl">
                {event?.title}
              </h1>
              <p className="pb-6 text-center text-sm text-gray-500 sm:text-base">
                {event?.description}
              </p>
              <p className="text-center text-sm text-gray-500 sm:text-base">
                {event?.location}
              </p>
              <p className="text-center text-sm text-gray-500 sm:text-base">
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
                  className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800 sm:text-base"
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

              <div className="space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
                <div className="relative sm:w-1/2">
                  <label
                    htmlFor="first-name"
                    className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
                  >
                    First name
                  </label>
                  <input
                    className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800 sm:text-base"
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

                <div className="relative sm:w-1/2">
                  <label
                    htmlFor="last-name"
                    className="absolute left-4 top-3 text-xs font-bold uppercase text-gray-600"
                  >
                    Last name
                  </label>
                  <input
                    className="h-16 w-full rounded-md border px-4 pt-6 text-sm text-gray-800 sm:text-base"
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
          <div className="space-x-1 pt-5 text-center sm:flex sm:justify-center">
            <p className="text-gray-600">Email with QR code sent to</p>
            <p className="font-medium text-gray-700">{tempEmail}</p>
          </div>
        </div>
      )}
    </>
  )
}
