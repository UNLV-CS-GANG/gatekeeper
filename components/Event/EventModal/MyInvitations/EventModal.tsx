import Modal from '../../../Common/Modal/Modal'
import { Dispatch, SetStateAction, useState } from 'react'
import EventExtended from '@/types/Event/EventExtended'
import ChatView from '../GroupChat/ChatView'
import EventModalView from '@/types/Event/EventModalView'
import InfoView from './InfoView'
import LeaveView from './LeaveView'

export default function EventModal({
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
        {view === EventModalView.LEAVE && (
          <LeaveView
            event={event}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            reload={reload}
            setModalIsOpen={setModalIsOpen}
            setView={setView}
          />
        )}
      </Modal>
    </>
  )
}
