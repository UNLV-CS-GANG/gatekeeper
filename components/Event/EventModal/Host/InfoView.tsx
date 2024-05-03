import getDateTime from '@/lib/getDateTime'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from '@/lib/classNames'
import EventExtended from '@/types/Event/EventExtended'
import ModalFooter from '@/components/Common/Modal/ModalFooter'
import EventModalView from '@/types/Event/EventModalView'
import { Guest } from '@/types/Guest'
import getName from '@/lib/getName'
import List from '@/components/Common/List/List'
import ListItem from '@/components/Common/List/ListItem'

export default function InfoView({
  event,
  setView,
  onClickGuest,
  guests,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
  onClickGuest: (guest: Guest, index: number) => void
  guests: Guest[]
}) {
  const [verifierCodeIsVisible, setVerifierCodeIsVisible] = useState(false)
  const router = useRouter()
  const now = new Date()

  return (
    <>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-4">
          <h1 className="text-xl font-medium sm:text-2xl">{event.title}</h1>
          <p className="text-sm text-gray-500 sm:text-base">{event.description}</p>
        </div>

        <List>
          <ListItem label="Location">{event.location}</ListItem>
          <ListItem label="Created">{getDateTime(new Date(event.createdAt))}</ListItem>
          <ListItem label="Access">
            {getDateTime(new Date(event.accessStart))} {' - '}
            {getDateTime(new Date(event.accessEnd))}
          </ListItem>
          <ListItem label="Verifier code">
            <div className="flex space-x-2.5">
              <button
                className="rounded-full bg-gray-200 p-0.5 transition-colors duration-150 hover:bg-gray-300"
                onClick={() => setVerifierCodeIsVisible(!verifierCodeIsVisible)}
              >
                {!verifierCodeIsVisible && <EyeSlashIcon className="h-5 w-5" />}
                {verifierCodeIsVisible && <EyeIcon className="h-5 w-5" />}
              </button>

              <div>
                <div
                  className={classNames('w-fit rounded-lg bg-gray-200 px-2', verifierCodeIsVisible ? '' : 'blur-sm')}
                >
                  <p className="text-gray-800">{event.verifierCode}</p>
                </div>
              </div>
            </div>
          </ListItem>
          <ListItem label="Invite link">
            <button
              onClick={() => {
                router.push(event?.inviteLink as string)
              }}
              className="flex break-all text-blue-600 transition-colors duration-200 hover:text-blue-400"
            >
              {event.inviteLink}
            </button>
          </ListItem>
        </List>

        <div className="flex place-items-center space-x-2 pb-2">
          <p className="text-sm font-semibold uppercase text-gray-500">Guests</p>
          <div
            className={classNames(
              'rounded-full px-3',
              guests.length === 0 ? 'bg-red-200 text-red-700' : 'bg-yellow-200 bg-opacity-70 text-yellow-700'
            )}
          >
            {guests.length}
          </div>
        </div>

        {guests.length > 0 && (
          <div className="max-h-48 overflow-y-auto rounded-lg bg-gray-100 px-1.5 py-2 sm:px-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="sticky top-0 rounded-l-lg bg-gray-300 bg-opacity-60 pl-1.5 text-xs font-semibold uppercase text-gray-600 backdrop-blur-lg sm:pl-3 sm:text-sm">
                    Name
                  </th>
                  <th className="sticky top-0 hidden bg-gray-300 bg-opacity-60 text-xs font-semibold uppercase text-gray-600 backdrop-blur-lg sm:block sm:text-sm">
                    Email
                  </th>
                  <th className="sticky top-0 rounded-r-lg bg-gray-300 bg-opacity-60 pr-1.5 text-right text-xs font-semibold uppercase text-gray-600 backdrop-blur-lg sm:pr-3 sm:text-sm">
                    Accepted
                  </th>
                </tr>
              </thead>

              {/*  */}
              <tbody>
                {guests.map((guest: Guest, index: number) => (
                  <tr
                    key={index}
                    onClick={() => onClickGuest(guest, index)}
                    className="cursor-pointer transition-colors duration-150 hover:bg-gray-200"
                  >
                    <td className="whitespace-normal rounded-l-lg py-2.5 pl-1.5 text-sm text-gray-800 sm:py-1.5 sm:pl-3 sm:text-base">
                      {getName(guest)}
                    </td>
                    <td className="hidden whitespace-normal py-2.5 text-sm text-gray-800 sm:block sm:whitespace-nowrap sm:py-1.5 sm:text-base">
                      {guest.email}
                    </td>
                    <td className="whitespace-normal rounded-r-lg py-2.5 pr-1.5 text-right text-sm text-gray-800 sm:whitespace-nowrap sm:py-1.5 sm:pr-3 sm:text-base">
                      {getDateTime(new Date(guest.acceptedAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ModalFooter>
        <div className="flex h-full place-items-center justify-between px-3">
          <button
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
            onClick={() => setView(EventModalView.DELETE)}
          >
            Delete
          </button>
          <div className="flex space-x-2.5">
            <button
              className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-400 hover:text-gray-800 disabled:pointer-events-none disabled:opacity-40"
              onClick={() => setView(EventModalView.EDIT)}
              disabled={new Date(event.accessStart) <= now && now <= new Date(event.accessEnd)}
            >
              Edit
            </button>
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
