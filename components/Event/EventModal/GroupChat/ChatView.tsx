import ModalFooter from '@/components/Common/ModalFooter'
import EventExtended from '@/types/EventExtended'
import EventModalView from '@/types/EventModalView'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import useLoadData from '@/hooks/useLoadData'
import { Message } from '@prisma/client'
import ChatMessage from './ChatMessage'
import { useAuth } from '@clerk/nextjs'
import { pusher } from '@/lib/pusher/client/pusher'
import Loader from '@/components/State/Loader'
import { GuestMessage } from '@/types/GuestMessage'

export default function ChatView({
  event,
  setView,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
}) {
  const { userId } = useAuth()
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [draft, setDraft] = useState('')
  const draftMaxLength = 500

  useLoadData(
    (msgs) => {
      setMessages(msgs)
    },
    `/api/message?eventId=${event.id}`,
    setIsLoadingMessages
  )

  useEffect(() => {
    console.log('subscribing')
    const channel = pusher.subscribe('group-chat')

    channel.bind('message-sent', (guestMsg: GuestMessage) => {
      setMessages([...messages, guestMsg])
    })

    return () => {
      pusher.unsubscribe('group-chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  async function sendMessage() {
    try {
      if (draft.length > 0) {
        const res = await fetch('/api/message', {
          method: 'POST',
          body: JSON.stringify({
            text: draft,
            eventId: event.id,
            userId,
          } as Message),
        })

        setDraft('')

        const msg = await res.json()

        // add to client
        // setMessages([...messages, msg])

        console.log('sent msg:', msg)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="px-7 py-6">
        <div className="flex justify-center">
          <div className="mt-4 w-full sm:mt-10">
            <p className="flex justify-center pb-1 text-base font-medium sm:pb-4 sm:text-xl">{event.title}</p>

            {/* message view */}
            <div className="h-[30rem] overflow-y-auto rounded-lg border border-gray-200 p-2 px-4">
              <ul>
                {messages &&
                  messages.map((msg: GuestMessage, index: number) => (
                    <li key={index}>
                      <ChatMessage msg={msg} prevMsg={messages[index - 1]} index={index} />
                    </li>
                  ))}
              </ul>
            </div>

            {/* textbox */}
            <div className="mt-1 h-fit w-full rounded-lg bg-gray-100 p-2">
              <div className="flex place-items-center space-x-2">
                <div className="relative w-full">
                  <textarea
                    className="h-[3rem] w-full resize-none rounded-lg px-2 py-2 text-xs sm:h-[6rem] sm:text-sm"
                    onChange={(ev) => setDraft(ev.target.value)}
                    value={draft}
                    maxLength={draftMaxLength}
                  />
                  <p className="absolute bottom-2 right-2 rounded-full text-sm text-gray-500 backdrop-blur-sm">
                    {draftMaxLength - draft.length}
                  </p>
                </div>
                <button
                  className="h-fit w-fit rounded-full bg-sage-100 p-2.5 transition-colors duration-150 hover:bg-sage-200 disabled:opacity-50 disabled:hover:pointer-events-none"
                  onClick={sendMessage}
                  disabled={draft.length === 0}
                >
                  <PaperAirplaneIcon className="h-4 w-4 text-white sm:h-6 sm:w-6" />
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

      <Loader isLoading={isLoadingMessages} />
    </>
  )
}
