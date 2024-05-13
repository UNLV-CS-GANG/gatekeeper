import Modal from '../../../Common/Modal/Modal'
import { Dispatch, SetStateAction } from 'react'
import EventExtended from '@/types/Event/EventExtended'
import ListItem from '@/components/Common/Preview/InfoList/ListItem'
import List from '@/components/Common/Preview/InfoList/List'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import getDateTime from '@/lib/getDateTime'

export default function EventModal({
  event,
  modalIsOpen,
  setModalIsOpen,
}: {
  event: EventExtended
  modalIsOpen: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="p-4 sm:px-7 sm:py-6">
          <div className="pb-4">
            <div className="flex place-items-center space-x-1.5">
              {event.inviteLink && <LockClosedIcon className="h-5 w-5 text-gray-600" />}
              <h1 className="text-xl font-medium sm:text-2xl">{event.title}</h1>
            </div>
          </div>

          <List>
            <ListItem label="Location">{event.location}</ListItem>
            <ListItem label="Created">{getDateTime(new Date(event.createdAt))}</ListItem>
            <ListItem label="Access">
              {getDateTime(new Date(event.accessStart))} {' - '}
              {getDateTime(new Date(event.accessEnd))}
            </ListItem>
            <ListItem label="Organization">{event.organizationId ? event.organization.name : 'N/A'}</ListItem>
            <ListItem label="Guests">
              {event.capacity ? `${event.invites.length}/${event.capacity}` : event.invites.length}
            </ListItem>
          </List>

          <button className="w-full rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100">
            Save Event
          </button>
        </div>
      </Modal>
    </>
  )
}
