import getDateTime from '@/lib/getDateTime'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Invite } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from '@/lib/classNames'
import EventExtended from '@/types/EventExtended'
import ModalFooter from '@/components/ModalFooter'
import EventModalView from '@/types/EventModalView'

export default function InfoView({
  event,
  setView,
  onClickInvite,
  displayInvites,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
  onClickInvite: (inv: Invite, index: number) => void
  displayInvites: Invite[]
}) {
  const [verifierCodeIsVisible, setVerifierCodeIsVisible] = useState(false)
  const router = useRouter()

  return (
    <>
      <div className="px-7 py-6">
        <div className="pb-4">
          <h1 className="text-2xl font-medium">{event.title}</h1>
          <p className="text-gray-500">{event.description}</p>
        </div>
        <ul className="divide-y py-10">
          <li className="flex py-1.5">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">
              Location
            </p>
            <p className="w-4/5 text-gray-800">{event.location}</p>
          </li>
          <li className="flex py-1.5">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">
              Created
            </p>
            <p className="w-4/5 text-gray-800">
              {getDateTime(new Date(event.createdAt))}
            </p>
          </li>
          <li className="flex py-1.5">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">
              Access
            </p>
            <p className="w-4/5 text-gray-800">
              {getDateTime(new Date(event.accessStart))} {' - '}
              {getDateTime(new Date(event.accessEnd))}
            </p>
          </li>
          <li className="flex py-1.5">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">
              Verifier code
            </p>

            <div className="flex w-4/5 space-x-2.5">
              <button
                className="rounded-full bg-gray-200 p-0.5 transition-colors duration-150 hover:bg-gray-300"
                onClick={() => setVerifierCodeIsVisible(!verifierCodeIsVisible)}
              >
                {!verifierCodeIsVisible && <EyeSlashIcon className="h-5 w-5" />}
                {verifierCodeIsVisible && <EyeIcon className="h-5 w-5" />}
              </button>

              <div>
                <div
                  className={classNames(
                    'w-fit rounded-lg bg-gray-200 px-2',
                    verifierCodeIsVisible ? '' : 'blur-sm'
                  )}
                >
                  <p className="text-gray-800">{event.verifierCode}</p>
                </div>
              </div>
            </div>
          </li>
          <li className="flex py-1.5">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">
              Invite link
            </p>
            <div className="w-4/5 text-blue-600 transition-colors duration-200 hover:text-blue-400">
              <button
                onClick={() => {
                  router.push(event?.inviteLink)
                }}
              >
                {event.inviteLink}
              </button>
            </div>
          </li>
        </ul>

        <div className="flex place-items-center space-x-2 pb-2">
          <p className="text-sm font-semibold uppercase text-gray-500">
            Guests
          </p>
          <div
            className={classNames(
              'rounded-full px-3',
              displayInvites.length === 0
                ? 'bg-red-200 text-red-700'
                : 'bg-yellow-200 bg-opacity-70 text-yellow-700'
            )}
          >
            {displayInvites.length}
          </div>
        </div>
        {displayInvites.length > 0 && (
          <div className="max-h-48 overflow-y-auto rounded-lg bg-gray-100 px-4 py-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="sticky top-0 rounded-l-lg bg-gray-300 bg-opacity-60 pl-3 text-sm font-semibold uppercase text-gray-600 backdrop-blur-lg">
                    Name
                  </th>
                  <th className="sticky top-0 bg-gray-300 bg-opacity-60 text-sm font-semibold uppercase text-gray-600 backdrop-blur-lg">
                    Email
                  </th>
                  <th className="sticky top-0 rounded-r-lg bg-gray-300 bg-opacity-60 pr-3 text-right text-sm font-semibold uppercase text-gray-600 backdrop-blur-lg">
                    Accepted
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayInvites.map((inv: Invite, index: number) => (
                  <tr
                    key={index}
                    onClick={() => onClickInvite(inv, index)}
                    className="cursor-pointer transition-colors duration-150 hover:bg-gray-200"
                  >
                    <td className="whitespace-normal rounded-l-lg py-1.5 pl-3 text-gray-800">
                      {inv.firstName} {inv.lastName}
                    </td>
                    <td className="whitespace-nowrap py-1.5 text-gray-800">
                      {inv.email}
                    </td>
                    <td className="whitespace-nowrap rounded-r-lg py-1.5 pr-3 text-right text-gray-800">
                      {getDateTime(new Date(inv.acceptedAt))}
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
              className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-400 hover:text-gray-800"
              onClick={() => setView(EventModalView.EDIT)}
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
