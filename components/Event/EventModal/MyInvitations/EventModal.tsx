import Modal from '../../../Common/Modal/Modal'
import { Dispatch, SetStateAction, useState } from 'react'
import EventExtended from '@/types/Event/EventExtended'
import ChatView from '../GroupChat/ChatView'
import EventModalView from '@/types/Event/EventModalView'
import InfoView from './InfoView'

export default function EventModal({
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
        {/* {view === EventModalView.TICKET && <TicketView event={event} setView={setView} />} */}
      </Modal>
    </>
  )
}
