/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { Event, Invite } from '@prisma/client'
import useLoadData from '@/hooks/useLoadData'
import Loader from '../State/Loader'
import getDateTime from '@/lib/getDateTime'
import QRCode from 'qrcode'
import QrProps from '@/types/email/QrProps'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

export default function InvitePrompt({ eventId }: { eventId: string }) {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const currPathname = usePathname()
  const [event, setEvent] = useState<Event>()
  const [isLoading, setIsLoading] = useState(false)
  const [qrSrc, setQrSrc] = useState('')

  async function email() {
    const res = await fetch(
      `/api/public/email?to=${user?.primaryEmailAddress?.emailAddress}&template=qr`,
      {
        method: 'POST',
        body: JSON.stringify({
          qrSrc,
          title: event?.title,
          description: event?.description,
          location: event?.location,
          accessStart: new Date(event?.accessStart as Date).toLocaleString(),
          accessEnd: new Date(event?.accessEnd as Date).toLocaleString(),
          username: user?.firstName,
        } as QrProps),
      }
    )

    console.log('email res:', await res.json())
  }

  async function postInvite() {
    try {
      const invRes = await fetch(`/api/public/invite`, {
        method: 'POST',
        body: JSON.stringify({
          eventId,
          userId: user?.id,
        } as Invite),
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
                You are invited! Sign in to receive your QR code. You will need
                it in order to get access into the event.
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

            {!isSignedIn ? (
              <SignInButton
                afterSignInUrl={currPathname}
                afterSignUpUrl={currPathname}
              >
                <div className="flex h-10 w-full place-items-center justify-center rounded-lg bg-gray-500 font-medium text-white transition-colors duration-200 hover:cursor-pointer hover:bg-gray-600">
                  Sign in
                </div>
              </SignInButton>
            ) : (
              <button
                className="h-10 w-full rounded-lg bg-sage-200 bg-opacity-80 font-medium text-white transition-colors duration-200 hover:bg-sage-200"
                onClick={postInvite}
              >
                Accept invitation
              </button>
            )}
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
            <p className="font-medium text-gray-700">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
