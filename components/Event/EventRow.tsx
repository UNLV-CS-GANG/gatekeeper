'use client'

import { EyeSlashIcon } from '@heroicons/react/24/outline'
import getDateTime from '@/lib/getDateTime'
import { Event, Invite } from '@prisma/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '../Modal'
import classNames from '@/lib/classNames'

interface EventExtended extends Event {
  invites: Invite[]
}

export default function EventRow({ event }: { event: EventExtended }) {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [verifierCodeIsVisible, setVerifierCodeIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const today = new Date()

  return (
    <>
      <tr
        className={classNames(
          'cursor-pointer text-sm',
          isHovering ? 'drop-shadow-lg' : 'drop-shadow-md'
        )}
        onClick={() => setModalIsOpen(true)}
        key={event.id}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <td className="whitespace-nowrap text-gray-800">
          <div
            className={classNames(
              'mt-2 h-[4.2rem] cursor-pointer font-semibold',
              isHovering
                ? 'bg-gray-100 transition-colors duration-200'
                : 'bg-white'
            )}
          >
            <div className="relative flex h-full place-items-center justify-start pl-10">
              {new Date(event.accessStart) <= today &&
                today <= new Date(event.accessEnd) && (
                  <>
                    <div className="absolute left-5 flex place-items-center justify-center">
                      <div className="absolute h-3 w-3 animate-ping rounded-full bg-green-300" />
                      <div className="absolute h-2 w-2 rounded-full bg-green-300" />
                    </div>
                  </>
                )}
              {event.title}
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap text-center text-gray-800">
          <div
            className={classNames(
              'mt-2 h-[4.2rem]',
              isHovering
                ? 'bg-gray-100 transition-colors duration-200'
                : 'bg-white'
            )}
          >
            <p className="flex h-full place-items-center justify-center">
              {event.location}
            </p>
          </div>
        </td>
        <td className="whitespace-nowrap text-center text-gray-800">
          <div
            className={classNames(
              'mt-2 h-[4.2rem]',
              isHovering
                ? 'bg-gray-100 transition-colors duration-200'
                : 'bg-white'
            )}
          >
            <div className="flex h-full flex-col place-items-center justify-center">
              <p>{getDateTime(new Date(event.accessStart))}</p>
              <p>{getDateTime(new Date(event.accessEnd))}</p>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap text-right text-gray-800">
          <div
            className={classNames(
              'mt-2 h-[4.2rem]',
              isHovering
                ? 'bg-gray-100 transition-colors duration-200'
                : 'bg-white'
            )}
          >
            <div className="flex h-full place-items-center justify-end space-x-2 pr-10">
              {new Date(event.accessEnd) < today && (
                <>
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <p className="font-medium text-blue-400">Complete</p>
                </>
              )}
              {new Date(event.accessStart) <= today &&
                today <= new Date(event.accessEnd) && (
                  <>
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <p className="font-medium text-green-500">Active</p>
                  </>
                )}
              {today < new Date(event.accessStart) && (
                <>
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                  <p className="font-medium text-gray-400">Upcoming</p>
                </>
              )}
            </div>
          </div>
        </td>
      </tr>

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="pb-4">
          <h1 className="text-2xl font-medium">{event.title}</h1>
          <p className="text-sm text-gray-500">{event.description}</p>
        </div>
        <ul className="space-y-0.5 py-10">
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
