import getDateTime from '@/lib/getDateTime'
import { Dispatch, SetStateAction } from 'react'
import EventExtended from '@/types/EventExtended'
import ModalFooter from '@/components/Common/Modal/ModalFooter'
import EventModalView from '@/types/EventModalView'

export default function InfoView({
  event,
  setView,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
}) {
  return (
    <>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-4">
          <h1 className="text-xl font-medium sm:text-2xl">{event.title}</h1>
          <p className="text-sm text-gray-500 sm:text-base">{event.description}</p>
        </div>

        <ul className="divide-y py-5 sm:py-10">
          <li className="py-1.5 sm:flex">
            <p className="pb-1.5 text-xs font-semibold uppercase text-gray-500 sm:w-1/5 sm:pb-0 sm:text-sm">Location</p>
            <p className="text-sm text-gray-800 sm:w-4/5 sm:text-base">{event.location}</p>
          </li>
          <li className="py-1.5 sm:flex">
            <p className="pb-1.5 text-xs font-semibold uppercase text-gray-500 sm:w-1/5 sm:pb-0 sm:text-sm">Created</p>
            <p className="text-sm text-gray-800 sm:w-4/5 sm:text-base">{getDateTime(new Date(event.createdAt))}</p>
          </li>
          <li className="py-1.5 sm:flex">
            <p className="pb-1.5 text-xs font-semibold uppercase text-gray-500 sm:w-1/5 sm:pb-0 sm:text-sm">Access</p>
            <p className="text-sm text-gray-800 sm:w-4/5 sm:text-base">
              {getDateTime(new Date(event.accessStart))} {' - '}
              {getDateTime(new Date(event.accessEnd))}
            </p>
          </li>
        </ul>
      </div>

      <ModalFooter>
        <div className="flex h-full place-items-center justify-between px-3">
          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800">
            Leave event
          </button>
          <div className="flex space-x-2.5">
            <button
              className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
              onClick={() => setView(EventModalView.CHAT)}
            >
              Open Chat
            </button>
          </div>
        </div>
      </ModalFooter>
    </>
  )
}
