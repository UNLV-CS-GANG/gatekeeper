import ModalFooter from '@/components/ModalFooter'
import EventExtended from '@/types/EventExtended'
import EventModalView from '@/types/EventModalView'
import { Dispatch, SetStateAction, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import useLoadData from '@/hooks/useLoadData'
import { Message } from '@prisma/client'
import ChatMessage from './ChatMessage'
import { useAuth } from '@clerk/nextjs'

export default function ChatView({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event,
  setView,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
}) {
  const { userId } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [draft, setDraft] = useState('')
  const draftMaxLength = 500

  useLoadData(
    (msgs) => setMessages(msgs),
    `/api/message?eventId=${event.id}`,
    setIsLoadingMessages
  )

  async function sendMessage() {
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
          text: draft,
          eventId: event.id,
          hostId: userId,
        } as Message),
      })

      setDraft('')

      const msg = await res.json()

      // add to client
      setMessages([...messages, msg])

      console.log('sent msg:', msg)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="px-7 py-6">
        <div className="flex justify-center">
          <div className="mt-10 w-full">
            {/* message view */}
            <div className="h-[30rem] rounded-lg border border-gray-200 p-2">
              <ul className="space-y-0.5">
                {messages &&
                  messages.map((msg: Message, index: number) => (
                    <li key={index}>
                      <ChatMessage msg={msg} />
                    </li>
                  ))}
              </ul>
            </div>

            {/* textbox */}
            <div className="mt-1 h-fit w-full rounded-lg bg-gray-100 p-2">
              <div className="flex place-items-center space-x-2">
                <div className="relative w-full">
                  <textarea
                    className="h-[6rem] w-full resize-none rounded-lg px-2 py-2"
                    onChange={(ev) => setDraft(ev.target.value)}
                    value={draft}
                    maxLength={draftMaxLength}
                  />
                  <p className="absolute bottom-2 right-2 rounded-full text-sm text-gray-500 backdrop-blur-sm">
                    {draftMaxLength - draft.length}
                  </p>
                </div>
                <button
                  className="h-fit w-fit rounded-full bg-sage-100 p-2.5 transition-colors duration-150 hover:bg-sage-200"
                  onClick={sendMessage}
                >
                  <PaperAirplaneIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
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
