import EventExtended from '@/types/Event/EventExtended'
import Grid from '@/components/Common/Preview/Grid/Grid'
import { useState } from 'react'
import GridItem from '@/components/Common/Preview/Grid/GridItem'
import GuestEventModal from '../EventModal/Guest/GuestEventModal'

export default function OpenInvitationsGrid({
  events,
  isLoadingEvents,
  displayCount,
}: {
  events: EventExtended[]
  isLoadingEvents: boolean
  displayCount: number
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventExtended | null>(null)

  function handleEventClick(ev: EventExtended) {
    setSelectedEvent(ev)
    setModalIsOpen(true)
  }

  return (
    <>
      <Grid displayCount={displayCount} isLoadingItems={isLoadingEvents} itemsLength={events.length}>
        {events.map((ev: EventExtended, i: number) => (
          <GridItem item={ev} key={i} onClick={(ev) => handleEventClick(ev)}>
            <div className="grid h-full grid-cols-1 content-between p-4">
              <div>
                <p className="text-lg font-medium text-gray-600">{ev.title}</p>
                <p className="font-medium text-gray-500">test1</p>
              </div>
              <p className="font-medium text-gray-500">test2</p>
            </div>
          </GridItem>
        ))}
      </Grid>

      {selectedEvent && (
        <GuestEventModal event={selectedEvent} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      )}
    </>
  )
}
