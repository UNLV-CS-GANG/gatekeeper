import ModalFooter from '@/components/ModalFooter'
import Loader from '@/components/State/Loader'
import getDateTime from '@/lib/getDateTime'
import EventModalView from '@/types/EventModalView'
import InviteRevokedProps from '@/types/email/InviteRevokedProps'
import { Event, Invite } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

export default function InviteView({
  event,
  invite,
  setView,
  setIsLoading,
  isLoading,
  onDelete,
}: {
  event: Event
  invite: Invite | undefined
  setView: Dispatch<SetStateAction<EventModalView>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  onDelete: () => void
}) {
  async function deleteInvite() {
    try {
      setIsLoading(true)

      const { status } = await fetch(`/api/invite?id=${invite?.id}`, {
        method: 'DELETE',
      })
      console.log('delete status:', status)

      const emailRes = await fetch(
        `/api/email?to=${invite?.email}&template=invite-revoked`,
        {
          method: 'POST',
          body: JSON.stringify({
            title: event.title,
            username: invite?.firstName,
          } as InviteRevokedProps),
        }
      )

      console.log('email res:', await emailRes.json())

      onDelete()
      setView(EventModalView.INFO)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="px-7 py-6">
        <div className="pb-8">
          <h1 className="text-2xl font-medium">
            {invite?.firstName} {invite?.lastName}
          </h1>
          <p className="text-gray-500">
            {invite?.scannedAt
              ? `Ticket scanned ${getDateTime(new Date(invite.scannedAt))}`
              : 'Ticket not yet scanned'}
          </p>
        </div>
        <ul>
          <li className="flex">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">
              Email
            </p>
            <p className="w-4/5 text-gray-800">{invite?.email}</p>
          </li>
          <li className="flex">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">
              Accepted
            </p>
            <p className="w-4/5 text-gray-800">
              {getDateTime(new Date(invite?.acceptedAt as Date))}
            </p>
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
            disabled={invite?.scannedAt ? true : false}
          >
            Revoke Invite
          </button>
        </div>
      </ModalFooter>

      <Loader isLoading={isLoading} text="Revoking invite" />
    </>
  )
}
