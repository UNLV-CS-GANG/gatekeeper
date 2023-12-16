import ModalFooter from '@/components/ModalFooter'
import Loader from '@/components/State/Loader'
import getDateTime from '@/lib/getDateTime'
import EventExtended from '@/types/EventExtended'
import EventModalView from '@/types/EventModalView'
import { Invite } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

export default function InviteView({
  invite,
  setView,
  setIsLoading,
  isLoading,
  onDelete,
}: {
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
        <div className="pb-4">
          <h1 className="text-2xl font-medium">
            {invite?.firstName} {invite?.lastName}
          </h1>
          <p className="text-gray-500">
            {invite?.scannedAt
              ? `Ticket scanned at ${invite.scannedAt}`
              : 'Ticket not yet scanned'}
          </p>
        </div>
        <ul className="space-y-0.5 py-10">
          <li className="flex justify-between">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Email
            </p>
            <p className="text-gray-800">{invite?.email}</p>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Accepted
            </p>
            <p className="text-gray-800">
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
            className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
            onClick={deleteInvite}
          >
            Revoke Invite
          </button>
        </div>
      </ModalFooter>

      <Loader isLoading={isLoading} text="Revoking invite" />
    </>
  )
}
