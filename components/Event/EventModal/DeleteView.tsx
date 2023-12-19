import ModalFooter from '@/components/ModalFooter'
import Loader from '@/components/State/Loader'
import EventExtended from '@/types/EventExtended'
import EventModalView from '@/types/EventModalView'
import EmailEventCanceledProps from '@/types/email/EmailEventCanceled'
import { Invite } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'

export default function DeleteView({
  event,
  setView,
  setModalIsOpen,
  reload,
  setIsLoading,
  isLoading,
  displayInvites,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  reload: () => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  displayInvites: Invite[]
}) {
  const cancelReasonMaxLength = 200
  const [reason, setReason] = useState('')

  async function emailAllGuests() {
    for (const inv of event.invites) {
      console.log('event deleted, emailing:', inv.email)
      await fetch(`/api/email?to=${inv.email}&template=event-canceled`, {
        method: 'POST',
        body: JSON.stringify({
          reason,
          title: event.title,
          username: inv.firstName,
        } as EmailEventCanceledProps),
      })
    }
  }

  async function deleteEvent() {
    try {
      setIsLoading(true)

      const { status } = await fetch(`/api/event?id=${event.id}`, {
        method: 'DELETE',
      })
      console.log('delete status:', status)

      if (reason) {
        await emailAllGuests()
      }

      reload()
      setModalIsOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="relative px-7 py-6">
        <div className="flex justify-center space-x-1 pt-4">
          <p className="text-gray-600">Cancel</p>
          <p className="font-medium text-gray-900">{`"${event.title}"?`}</p>
        </div>
        {displayInvites.length > 0 && (
          <div className="pt-6">
            <p className="px-32 pb-1 text-center text-gray-600">
              Please provide a reason for canceling. All guests will be
              notified.
            </p>
            <div className="relative">
              <textarea
                className="h-32 w-full rounded-md border px-4 pt-2 text-gray-800"
                id="description"
                placeholder="Dog ate my homework"
                maxLength={cancelReasonMaxLength}
                value={reason}
                onChange={(ev) => setReason(ev.target.value)}
              />
              <p className="absolute bottom-3 right-3 text-sm text-gray-500">
                {cancelReasonMaxLength - reason.length} characters left
              </p>
            </div>
          </div>
        )}
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
            className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100 disabled:opacity-50 disabled:hover:bg-gray-600 disabled:hover:text-gray-200"
            disabled={
              (displayInvites.length > 0 && reason.length === 0) || isLoading
            }
            onClick={deleteEvent}
          >
            Confirm Delete
          </button>
        </div>
      </ModalFooter>

      <Loader isLoading={isLoading} text="Deleting" />
    </>
  )
}
