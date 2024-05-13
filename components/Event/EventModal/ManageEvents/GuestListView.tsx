import UserList from '@/components/Common/Preview/UserList/UserList'
import UserListData from '@/components/Common/Preview/UserList/UserListData'
import UserListRow from '@/components/Common/Preview/UserList/UserListRow'
import getDateTime from '@/lib/getDateTime'
import getName from '@/lib/getName'
import EventExtended from '@/types/Event/EventExtended'
import EventModalView from '@/types/Event/EventModalView'
import { Guest } from '@/types/Guest'
import { Dispatch, SetStateAction } from 'react'

export default function GuestListView({
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
  return (
    <>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-4">
          <h1 className="text-xl font-medium sm:text-2xl">{event.title}</h1>
        </div>

        <UserList>
          {guests.length > 0 &&
            guests.map((guest, i) => (
              <UserListRow
                onClick={() => {
                  onClickGuest(guest, i)
                }}
                key={i}
              >
                <UserListData isFront={true}>
                  <p className="font-medium text-gray-800">{getName(guest)}</p>
                  <p className="text-gray-700">{guest.email}</p>
                </UserListData>
                <UserListData>{getDateTime(new Date(guest.acceptedAt))}</UserListData>
              </UserListRow>
            ))}
        </UserList>

        <button
          className="mt-8 w-full rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
          onClick={() => setView(EventModalView.INFO)}
        >
          Back
        </button>
      </div>
    </>
  )
}
