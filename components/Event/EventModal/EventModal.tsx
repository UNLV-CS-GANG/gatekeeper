'use client'

import Modal from '../../Modal'
import { Dispatch, SetStateAction, useState } from 'react'
import InfoView from './InfoView'
import EventExtended from '@/types/EventExtended'
import DeleteView from './DeleteView'
import EditView from './EditView'
import ChatView from './ChatView'

enum View {
  INFO,
  DELETE,
  EDIT,
  CHAT,
}

export default function EventModal({
  event,
  modalIsOpen,
  setModalIsOpen,
  onDelete,
}: {
  event: EventExtended
  modalIsOpen: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  onDelete: () => void
}) {
  const [view, setView] = useState<View>(View.INFO)
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function deleteEvent() {
    try {
      setIsLoading(true)

      const { status } = await fetch(`/api/event?id=${event.id}`, {
        method: 'DELETE',
      })
      console.log('delete status:', status)

      onDelete()
      setModalIsOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          if (!isLoading) {
            setModalIsOpen(false)
            setTimeout(() => setView(View.INFO), 350)
          }
        }}
        footerContent={
          <>
            {view === View.INFO && (
              <div className="flex h-full place-items-center justify-between px-3">
                <button
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
                  onClick={() => setView(View.DELETE)}
                >
                  Delete
                </button>
                <div className="flex space-x-2.5">
                  <button
                    className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-400 hover:text-gray-800"
                    onClick={() => setView(View.EDIT)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
                    onClick={() => setView(View.CHAT)}
                  >
                    Open chat
                  </button>
                </div>
              </div>
            )}
            {view === View.DELETE && (
              <div className="flex h-full place-items-center justify-between px-3">
                <button
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
                  onClick={() => setView(View.INFO)}
                >
                  Back
                </button>
                <button
                  className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100 disabled:opacity-50 disabled:hover:bg-gray-600 disabled:hover:text-gray-200"
                  disabled={event.invites.length > 0 && reason.length === 0}
                  onClick={deleteEvent}
                >
                  Confirm Delete
                </button>
              </div>
            )}
            {view === View.EDIT && (
              <div className="flex h-full place-items-center justify-between px-3">
                <button
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
                  onClick={() => setView(View.INFO)}
                >
                  Back
                </button>
                <button className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100">
                  Confirm Changes
                </button>
              </div>
            )}
            {view === View.CHAT && (
              <div className="flex h-full place-items-center justify-start px-3">
                <button
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
                  onClick={() => setView(View.INFO)}
                >
                  Back
                </button>
              </div>
            )}
          </>
        }
      >
        {view === View.INFO && <InfoView event={event} />}
        {view === View.DELETE && (
          <DeleteView
            event={event}
            setReason={setReason}
            isLoading={isLoading}
          />
        )}
        {view === View.EDIT && <EditView event={event} />}
        {view === View.CHAT && <ChatView event={event} />}
      </Modal>
    </>
  )
}
