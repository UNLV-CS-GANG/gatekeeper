import ModalContent from '@/components/Common/Modal/ModalContent'
import EventExtended from '@/types/Event/EventExtended'
import EventModalView from '@/types/Event/EventModalView'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { useAuth } from '@clerk/nextjs'

export default function TicketView({
  event,
  setView,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
}) {
  const { userId } = useAuth()

  const [qrSrc, setQrSrc] = useState('')
  useEffect(() => {
    for (const invite of event.invites) {
      if (invite.userId == userId) {
        QRCode.toDataURL(invite.id).then(setQrSrc)
      }
    }
  }, [event, userId])

  return (
    <>
      <ModalContent>
        <div className="pb-4">
          <h1 className="text-xl font-medium sm:text-2xl">{event.title}</h1>
        </div>

        <div className="relative flex place-items-center justify-center">
          {qrSrc && <img className="h-72" src={qrSrc} alt="qr" />}
        </div>

        <button
          className="mt-8 w-full rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
          onClick={() => setView(EventModalView.INFO)}
        >
          Back
        </button>
      </ModalContent>
    </>
  )
}
