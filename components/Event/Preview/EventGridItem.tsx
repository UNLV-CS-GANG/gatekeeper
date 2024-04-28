import EventExtended from '@/types/EventExtended'
import { useState } from 'react'
import HostEventModal from '../EventModal/Host/HostEventModal'
import classNames from '@/lib/classNames'

export default function EventGridItem({ event, reload }: { event: EventExtended; reload: () => void }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <>
      <li
        className={classNames(
          'h-48 cursor-pointer bg-white text-sm transition-all duration-150',
          isHovering ? 'scale-105 drop-shadow-xl' : 'drop-shadow-md'
        )}
        onClick={() => setModalIsOpen(true)}
        key={event.id}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="grid h-full grid-cols-1 content-between p-4">
          <div>
            <p className="text-lg font-medium text-gray-600">{event.title}</p>
            <p className="font-medium text-gray-500">test1</p>
          </div>
          <p className="font-medium text-gray-500">test2</p>
        </div>
      </li>

      <HostEventModal reload={reload} event={event} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  )
}
