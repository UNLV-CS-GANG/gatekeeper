import ModalFooter from '@/components/Common/Modal/ModalFooter'
import Loader from '@/components/State/Loader'
import EventExtended from '@/types/Event/EventExtended'
import EventModalView from '@/types/Event/EventModalView'
import { useAuth } from '@clerk/nextjs'
import { Dispatch, SetStateAction } from 'react'

export default function LeaveView({
  event,
  setView,
  setModalIsOpen,
  reload,
  setIsLoading,
  isLoading,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  reload: () => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
}) {
  const { userId } = useAuth()

  async function leaveEvent() {
    try {
      setIsLoading(true)
      await fetch(`/api/invite?userId=${userId}`, { method: 'DELETE' })
      reload()
      setModalIsOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="relative p-4 sm:px-7 sm:py-6">
        <div className="flex justify-center space-x-1 pt-4">
          <p className="text-gray-600">Leave</p>
          <p className="font-medium text-gray-900">{`"${event.title}"?`}</p>
        </div>
      </div>

      <ModalFooter>
        <div className="flex h-full place-items-center justify-between px-3">
          <button
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
            onClick={() => setView(EventModalView.INFO)}
          >
            Back
          </button>
          <button
            className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100 disabled:opacity-50 disabled:hover:bg-gray-600 disabled:hover:text-gray-200"
            onClick={leaveEvent}
          >
            Confirm Leave
          </button>
        </div>
      </ModalFooter>

      <Loader isLoading={isLoading} text="Deleting" />
    </>
  )
}
