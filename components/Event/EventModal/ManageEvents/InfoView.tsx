import getDateTime from '@/lib/getDateTime'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import EventExtended from '@/types/Event/EventExtended'
import ModalFooter from '@/components/Common/Modal/ModalFooter'
import EventModalView from '@/types/Event/EventModalView'
import InfoList from '@/components/Common/Preview/InfoList/InfoList'
import InfoListItem from '@/components/Common/Preview/InfoList/InfoListItem'
import ToggleVisibility from '@/components/Common/Preview/InfoList/ToggleVisibility'
import { UserIcon } from '@heroicons/react/20/solid'

export default function InfoView({
  event,
  setView,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
}) {
  const router = useRouter()
  const now = new Date()

  return (
    <>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-4">
          <h1 className="text-xl font-medium sm:text-2xl">{event.title}</h1>
          <p className="text-sm text-gray-500 sm:text-base">{event.description}</p>
        </div>

        <InfoList>
          <InfoListItem label="Location">{event.location}</InfoListItem>
          <InfoListItem label="Created">{getDateTime(new Date(event.createdAt))}</InfoListItem>
          <InfoListItem label="Access">
            {getDateTime(new Date(event.accessStart))} {' - '}
            {getDateTime(new Date(event.accessEnd))}
          </InfoListItem>
          <InfoListItem label="Verifier code">
            <ToggleVisibility data={event.verifierCode} />
          </InfoListItem>
          <InfoListItem label="Invite link">
            <button
              onClick={() => {
                router.push(event?.inviteLink as string)
              }}
              className="flex break-all text-blue-600 transition-colors duration-200 hover:text-blue-400"
            >
              {event.inviteLink}
            </button>
          </InfoListItem>
        </InfoList>
      </div>

      <ModalFooter>
        <div className="flex h-full place-items-center justify-between px-3">
          <div className="flex space-x-2.5">
            <button
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
              onClick={() => setView(EventModalView.DELETE)}
            >
              Delete
            </button>
            <button
              className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-400 hover:text-gray-800 disabled:pointer-events-none disabled:opacity-40"
              onClick={() => setView(EventModalView.EDIT)}
              disabled={new Date(event.accessStart) <= now && now <= new Date(event.accessEnd)}
            >
              Edit
            </button>
          </div>
          <div className="flex space-x-2.5">
            <button
              className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
              onClick={() => setView(EventModalView.GUEST_LIST)}
            >
              <div className="flex space-x-2">
                <p>Guest List</p>
                <div className="flex place-items-center space-x-0.5">
                  <UserIcon className="h-5 w-4" />
                  <p>{event.invites.length}</p>
                </div>
              </div>
            </button>
            <button
              className="rounded-lg bg-indigo-400 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-indigo-500 hover:text-gray-100"
              onClick={() => setView(EventModalView.CHAT)}
            >
              Chat
            </button>
          </div>
        </div>
      </ModalFooter>
    </>
  )
}
