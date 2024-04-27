import Modal from '../../../Common/Modal/Modal'
import { Dispatch, SetStateAction, useState } from 'react'
import InfoView from './InfoView'
import EventExtended from '@/types/EventExtended'
import DeleteView from './DeleteView'
import EditView from './EditView'
import ChatView from '../GroupChat/ChatView'
import EventModalView from '@/types/EventModalView'
import InviteView from './InviteView'
import useLoadData from '@/hooks/useLoadData'
import { Guest } from '@/types/Guest'

export default function HostEventModal({
  event,
  modalIsOpen,
  setModalIsOpen,
  reload,
}: {
  event: EventExtended
  modalIsOpen: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  reload: () => void
}) {
  const [view, setView] = useState<EventModalView>(EventModalView.INFO)
  const [isLoading, setIsLoading] = useState(false)
  const [focusGuest, setFocusGuest] = useState<{ guest: Guest; index: number }>()
  const [guests, setGuests] = useState<Guest[]>([])

  useLoadData((data) => setGuests(data), `/api/clerk/user?eventId=${event.id}`)

  function removeGuestInClient() {
    const tempGuests = [...guests]
    tempGuests.splice(focusGuest?.index as number, 1)
    setGuests(tempGuests)
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          if (!isLoading) {
            setModalIsOpen(false)
            setTimeout(() => setView(EventModalView.INFO), 350)
          }
        }}
      >
        {view === EventModalView.INFO && (
          <InfoView
            event={event}
            setView={setView}
            onClickGuest={(guest: Guest, index: number) => {
              setFocusGuest({ guest, index })
              setView(EventModalView.INVITE)
            }}
            guests={guests}
          />
        )}
        {view === EventModalView.DELETE && (
          <DeleteView
            event={event}
            reload={reload}
            setModalIsOpen={setModalIsOpen}
            setView={setView}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            giveReason={guests.length > 0}
            guests={guests}
          />
        )}
        {view === EventModalView.EDIT && (
          <EditView
            event={event}
            reload={reload}
            setModalIsOpen={setModalIsOpen}
            setView={setView}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            guests={guests}
          />
        )}
        {view === EventModalView.CHAT && <ChatView event={event} setView={setView} />}
        {view === EventModalView.INVITE && (
          <InviteView
            event={event}
            guest={focusGuest?.guest}
            setView={setView}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onDelete={removeGuestInClient}
          />
        )}
      </Modal>
    </>
  )
}
