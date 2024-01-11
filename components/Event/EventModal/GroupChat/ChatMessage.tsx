import classNames from '@/lib/classNames'
import { useAuth } from '@clerk/nextjs'
import { Message } from '@prisma/client'

export default function ChatMessage({ msg }: { msg: Message }) {
  const { userId } = useAuth()
  const isUserMessage = userId === msg.hostId

  return (
    <>
      <div
        className={classNames(
          isUserMessage ? 'justify-end' : 'justify-start',
          'flex w-full'
        )}
      >
        <div
          className={classNames(
            isUserMessage
              ? 'bg-blue-400 text-gray-50'
              : 'bg-gray-300 text-gray-900',
            'flex max-w-[60%] rounded-full px-5 py-3.5'
          )}
        >
          <p className="text-sm">{msg.text}</p>
        </div>
      </div>
    </>
  )
}
