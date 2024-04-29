import EventExtended from '@/types/EventExtended'
import { useRouter } from 'next/navigation'
import Grid from '@/components/Common/Preview/Grid/Grid'
import { useState } from 'react'
import GridItem from '@/components/Common/Preview/Grid/GridItem'
import HostEventModal from '../EventModal/Host/HostEventModal'

export default function EventGrid({
  events,
  isLoadingEvents,
  displayCount,
  reload,
}: {
  events: EventExtended[]
  isLoadingEvents: boolean
  displayCount: number
  reload: () => void
}) {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventExtended | null>(null)

  function handleEventClick(ev: EventExtended) {
    setSelectedEvent(ev)
    setModalIsOpen(true)
  }

  return (
    <>
      <Grid
        displayCount={displayCount}
        isLoadingItems={isLoadingEvents}
        itemsLength={events.length}
        onAddItem={() => router.push('/createEvent')}
      >
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
        <HostEventModal
          event={selectedEvent}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          reload={reload}
        />
      )}
    </>
  )
}
