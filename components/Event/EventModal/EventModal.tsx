import Modal from '../../Modal'
import { Dispatch, SetStateAction, useState } from 'react'
import InfoView from './InfoView'
import EventExtended from '@/types/EventExtended'
import DeleteView from './DeleteView'
import EditView from './EditView'
import ChatView from './ChatView'
import EventModalView from '@/types/EventModalView'
import { Invite } from '@prisma/client'
import InviteView from './InviteView'

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
  const [inviteObj, setInviteObj] = useState<{
    invite: Invite
    index: number
  }>()
  const [displayInvites, setDisplayInvites] = useState<Invite[]>(event.invites) // client

  function removeInviteInClient() {
    const tempDisplayInvites = [...displayInvites]
    tempDisplayInvites.splice(inviteObj?.index as number, 1)
    setDisplayInvites(tempDisplayInvites)
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
            onClickInvite={(inv: Invite, index: number) => {
              setInviteObj({ invite: inv, index })
              setView(EventModalView.INVITE)
            }}
            displayInvites={displayInvites}
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
            displayInvites={displayInvites}
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
          />
        )}
        {view === EventModalView.CHAT && (
          <ChatView event={event} setView={setView} />
        )}
        {view === EventModalView.INVITE && (
          <InviteView
            event={event}
            invite={inviteObj?.invite}
            setView={setView}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onDelete={removeInviteInClient}
          />
        )}
      </Modal>
    </>
  )
}
