import getDateTime from '@/lib/getDateTime'
import { Dispatch, SetStateAction } from 'react'
import EventExtended from '@/types/Event/EventExtended'
import EventModalView from '@/types/Event/EventModalView'
import { EllipsisVerticalIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import ModalContent from '@/components/Common/Modal/ModalContent'
import List from '@/components/Common/List/List'
import ListItem from '@/components/Common/List/ListItem'
import ModalCornerButton from '@/components/Common/Modal/ModalCornerButton'

export default function InfoView({
  event,
  setView,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
}) {
  return (
    <>
      <ModalContent>
        <ModalCornerButton>
          <button
            type="button"
            className="rounded-full p-1 outline-none transition-colors duration-150 hover:bg-gray-200"
            // onClick={() => {}} // add leave event popup
          >
            <EllipsisVerticalIcon className="h-6 w-6" />
          </button>
        </ModalCornerButton>

        <div className="pb-4">
          <div className="flex place-items-center space-x-1.5">
            {event.inviteLink && <LockClosedIcon className="h-5 w-5 text-gray-600" />}
            <h1 className="text-xl font-medium sm:text-2xl">{event.title}</h1>
          </div>
          <p className="text-sm text-gray-500 sm:text-base">{event.description}</p>
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

        <div className="flex space-x-2">
          <button className="w-full rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100">
            Ticket
          </button>
          <button
            className="w-full rounded-lg bg-indigo-400 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-indigo-500 hover:text-gray-100"
            onClick={() => setView(EventModalView.CHAT)}
          >
            Chat
          </button>
        </div>
      </ModalContent>
    </>
  )
}
