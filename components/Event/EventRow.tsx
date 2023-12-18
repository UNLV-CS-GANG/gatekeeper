import getDateTime from '@/lib/getDateTime'
import { useState } from 'react'
import classNames from '@/lib/classNames'
import EventModal from './EventModal/EventModal'
import EventExtended from '@/types/EventExtended'

export default function EventRow({
  event,
  reload,
}: {
  event: EventExtended
  reload: () => void
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
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

      <EventModal
        event={event}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        reload={reload}
      />
    </>
  )
}
