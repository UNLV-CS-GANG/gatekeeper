import Modal from '../../../Common/Modal/Modal'
import { Dispatch, SetStateAction, useState } from 'react'
import EventExtended from '@/types/EventExtended'
import ChatView from '../GroupChat/ChatView'
import EventModalView from '@/types/EventModalView'
import InfoView from './InfoView'

export default function GuestEventModal({
  event,
  modalIsOpen,
  setModalIsOpen,
}: {
  event: EventExtended
  modalIsOpen: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [view, setView] = useState<EventModalView>(EventModalView.INFO)

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false)
          setTimeout(() => setView(EventModalView.INFO), 350)
        }}
      >
        {view === EventModalView.INFO && <InfoView event={event} setView={setView} />}
        {view === EventModalView.CHAT && <ChatView event={event} setView={setView} />}
      </Modal>
    </>
  )
}
