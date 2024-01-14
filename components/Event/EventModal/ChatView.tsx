import ModalFooter from '@/components/Common/ModalFooter'
import UnderDevelopment from '@/components/State/UnderDevelopment'
import EventExtended from '@/types/EventExtended'
import EventModalView from '@/types/EventModalView'
import { Dispatch, SetStateAction } from 'react'

export default function ChatView({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event,
  setView,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
}) {
  return (
    <>
      <div className="px-7 py-6">
        <div className="flex justify-center">
          <UnderDevelopment />
        </div>
      </div>

      <ModalFooter>
        <div className="flex h-full place-items-center justify-start px-3">
          <button
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
            onClick={() => setView(EventModalView.INFO)}
          >
            Back
          </button>
        </div>
      </ModalFooter>
    </>
  )
}
