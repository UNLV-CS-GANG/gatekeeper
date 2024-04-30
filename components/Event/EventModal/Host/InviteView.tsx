import ModalFooter from '@/components/Common/Modal/ModalFooter'
import Loader from '@/components/State/Loader'
import getDateTime from '@/lib/getDateTime'
import getName from '@/lib/getName'
import EventModalView from '@/types/Event/EventModalView'
import { Guest } from '@/types/Guest'
import InviteRevokedProps from '@/types/email/InviteRevokedProps'
import { Event } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

export default function InviteView({
  event,
  guest,
  setView,
  setIsLoading,
  isLoading,
  onDelete,
}: {
  event: Event
  guest: Guest | undefined
  setView: Dispatch<SetStateAction<EventModalView>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  onDelete: () => void
}) {
  async function deleteInvite() {
    try {
      setIsLoading(true)

      if (guest) {
        const { status } = await fetch(`/api/invite?id=${guest.id}`, {
          method: 'DELETE',
        })
        console.log('delete status:', status)

        const emailRes = await fetch(`/api/email?to=${guest.email}&template=invite-revoked`, {
          method: 'POST',
          body: JSON.stringify({
            title: event.title,
            username: getName(guest),
          } as InviteRevokedProps),
        })

        console.log('email res:', await emailRes.json())

        onDelete()
        setView(EventModalView.INFO)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-8">
          <h1 className="text-xl font-medium sm:text-2xl">{getName(guest as Guest)}</h1>
          <p className="text-sm text-gray-500 sm:text-base">
            {guest?.scannedAt ? `Ticket scanned ${getDateTime(new Date(guest.scannedAt))}` : 'Ticket not yet scanned'}
          </p>
        </div>
        <ul className="flex flex-col space-y-2 sm:space-y-0">
          <li className="sm:flex">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">Email</p>
            <p className="w-4/5 text-gray-800">{guest?.email}</p>
          </li>
          <li className="sm:flex">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">Accepted</p>
            <p className="w-4/5 text-gray-800">{getDateTime(new Date(guest?.acceptedAt as Date))}</p>
          </li>
        </ul>
      </div>

      <ModalFooter>
        <div className="flex h-full place-items-center justify-between px-3">
          <button
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
            onClick={() => setView(EventModalView.INFO)}
          >
            Back
          </button>
          <button
            className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100 disabled:opacity-50 hover:disabled:bg-gray-600 hover:disabled:text-gray-200"
            onClick={deleteInvite}
            disabled={guest?.scannedAt ? true : false}
          >
            Remove Guest
          </button>
        </div>
      </ModalFooter>

      <Loader isLoading={isLoading} text="Revoking invite" />
    </>
  )
}
