'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import getDateTime from '@/lib/getDateTime'
import { Event, Invite } from '@prisma/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from './Modal'
import classNames from '@/lib/classNames'

interface EventExtended extends Event {
  invites: Invite[]
}

export default function EventRow({ event }: { event: EventExtended }) {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [verifierCodeIsVisible, setVerifierCodeIsVisible] = useState(false)

  return (
    <>
      <tr
        className="w-full cursor-pointer transition-colors duration-200 hover:bg-gray-200"
        onClick={() => setModalIsOpen(true)}
        key={event.id}
      >
        <td className="whitespace-nowrap rounded-l-lg py-4 pl-3 text-left text-sm text-gray-500">
          {event.title}
        </td>
        <td className="whitespace-nowrap py-4 text-center text-sm text-gray-500">
          {event.location}
        </td>
        <td className="whitespace-nowrap py-4 text-center text-sm text-gray-500">
          {getDateTime(new Date(event.accessEnd))}
        </td>
        <td className="whitespace-nowrap rounded-r-lg py-4 pr-3 text-right text-sm text-gray-500">
          {getDateTime(new Date(event.createdAt))}
        </td>
      </tr>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h1 className="text-2xl font-medium">{event.title}</h1>
        <ul className="space-y-0.5 py-6">
          <li className="flex justify-between">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Location
            </p>
            <p className="text-gray-800">{event.location}</p>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Created
            </p>
            <p className="text-gray-800">
              {getDateTime(new Date(event.createdAt))}
            </p>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Access
            </p>
            <p className="text-gray-800">
              {getDateTime(new Date(event.accessStart))} {' - '}
              {getDateTime(new Date(event.accessEnd))}
            </p>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Invite link
            </p>
            <div className="text-blue-600 transition-colors duration-200 hover:text-blue-400">
              <button
                onClick={() => {
                  router.push(event?.inviteLink)
                }}
              >
                {event.inviteLink}
              </button>
            </div>
          </li>
          <li className="flex justify-between">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Verifier code
            </p>
            <button
              className="relative"
              onClick={() => setVerifierCodeIsVisible(!verifierCodeIsVisible)}
            >
              <div
                className={classNames(
                  'rounded-lg bg-gray-200 px-2',
                  verifierCodeIsVisible ? '' : 'blur-sm'
                )}
              >
                <p className="text-gray-800">{event.verifierCode}</p>
              </div>
              {!verifierCodeIsVisible && (
                <EyeSlashIcon className="absolute right-7 top-0.5 h-5 w-5" />
              )}
            </button>
          </li>
        </ul>

        <div className="flex place-items-center space-x-2 pb-2">
          <p className="text-sm font-semibold uppercase text-gray-500">
            Accepted invites
          </p>
          <div
            className={classNames(
              'rounded-full px-3',
              event.invites.length === 0
                ? 'bg-red-200 text-red-700'
                : 'bg-yellow-200 bg-opacity-70 text-yellow-700'
            )}
          >
            {event.invites.length}
          </div>
        </div>
        {event.invites.length > 0 && (
          <div className="max-h-32 overflow-y-auto rounded-lg bg-gray-100 px-4 py-2">
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
                {event.invites.map((inv: Invite) => (
                  <tr key={inv.id}>
                    <td className="pl-3 text-gray-800">
                      {inv.firstName} {inv.lastName}
                    </td>
                    <td className="text-gray-800">{inv.email}</td>
                    <td className="pr-3 text-right text-gray-800">
                      {getDateTime(new Date(inv.acceptedAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  )
}
