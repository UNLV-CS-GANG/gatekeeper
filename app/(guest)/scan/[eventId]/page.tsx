'use client'

import { QrReader } from 'react-qr-reader'
import useLoadData from '@/hooks/useLoadData'
import Loader from '@/components/State/Loader'
import { useRef, useState } from 'react'
import EventExtended from '@/types/EventExtended'
import QrAccepted from '@/components/Notification/Popup/QrAccepted'
import QrRejected from '@/components/Notification/Popup/QrRejected'
import getDateTime from '@/lib/getDateTime'
import QrReused from '@/components/Notification/Popup/QrReused'
import playAudio from '@/lib/playAudio'
import { User } from '@clerk/nextjs/dist/types/server'
import getName from '@/lib/getName'

export default function Scan({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = useState<EventExtended>()
  const [eventIsLoading, setEventIsLoading] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [rejectedPopupIsOpen, setRejectedPopupIsOpen] = useState(false)
  const [acceptedPopupIsOpen, setAcceptedPopupIsOpen] = useState(false)
  const [reusedPopupIsOpen, setReusedPopupIsOpen] = useState(false)
  const [acceptedUser, setAcceptedUser] = useState<User | null>(null)
  const [reusedScannedAt, setReusedScannedAt] = useState('')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const verifiedSoundPath = '/audio/verified_sound.wav'
  const invalidSoundPath = '/audio/invalid_sound.wav'
  let verifyingInvite = false

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onResult(result: any) {
    if (!!result && !verifyingInvite && !acceptedPopupIsOpen && !rejectedPopupIsOpen) {
      console.log('result:', result.getText())
      await verifyInvite(result.getText())
    }
  }

  async function verifyInvite(inviteId: string) {
    try {
      setIsScanning(true)
      verifyingInvite = true

      const getInviteRes = await fetch(`/api/public/invite?id=${inviteId}&eventId=${params.eventId}`, { method: 'GET' })
      const getInvite = await getInviteRes.json()

      if (!getInvite) {
        playAudio(invalidSoundPath, audioRef)
        setRejectedPopupIsOpen(true)
      } else if (getInvite.scannedAt) {
        playAudio(invalidSoundPath, audioRef)
        setReusedScannedAt(getDateTime(new Date(getInvite.scannedAt)))
        setReusedPopupIsOpen(true)
      } else {
        // on successful validation, update invite
        const updateInviteRes = await fetch(`/api/public/invite?id=${inviteId}`, {
          method: 'PUT',
          body: JSON.stringify({
            scannedAt: new Date(),
          }),
        })
        const data = await updateInviteRes.json()

        console.log('accepted invite:', data)
        playAudio(verifiedSoundPath, audioRef)
        setAcceptedUser(data.user)
        setAcceptedPopupIsOpen(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsScanning(false)
      setTimeout(() => {
        verifyingInvite = false
      }, 1500)
    }
  }

  useLoadData(
    (ev) => {
      setEvent(ev)
    },
    `/api/public/event?id=${params.eventId}`,
    setEventIsLoading
  )

  return (
    <>
      <div className="relative">
        <p className="mb-4 hidden rounded-full bg-yellow-100 text-center text-sm text-yellow-700 sm:mt-5 sm:block sm:px-4 sm:py-3">
          Disclaimer: Scanner feature is intended for mobile devices and may be unstable on a laptop/desktop
        </p>

        {event && (
          <>
            <div>
              <p className="text-center text-xl font-medium">{event.title}</p>
              <p className="py-2 text-center">Hold the camera up to the QR code to scan</p>
            </div>

            {/* Bugs: it's from the package itself, nothign we can do beside supress it */}
            <QrReader
              onResult={async (result) => await onResult(result)}
              constraints={{ facingMode: 'environment' }}
              scanDelay={1500}
            />

            <p className="pt-3 text-center font-medium text-gray-500">Invites remaining: n/a</p>
          </>
        )}

        <Loader isLoading={eventIsLoading} />
        <Loader isLoading={isScanning} text="Verifying" />

        <QrRejected isOpen={rejectedPopupIsOpen} setIsOpen={setRejectedPopupIsOpen} />
        <QrAccepted
          isOpen={acceptedPopupIsOpen}
          setIsOpen={setAcceptedPopupIsOpen}
          username={getName(acceptedUser as User)}
        />
        <QrReused isOpen={reusedPopupIsOpen} setIsOpen={setReusedPopupIsOpen} scannedAt={reusedScannedAt} />
      </div>

      <audio ref={audioRef} />
    </>
  )
}
