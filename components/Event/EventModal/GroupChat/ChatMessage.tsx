import classNames from '@/lib/classNames'
import { useAuth } from '@clerk/nextjs'
import { Message } from '@prisma/client'

export default function ChatMessage({ msg, prevMsg, index }: { msg: Message; prevMsg: Message; index: number }) {
  const { userId } = useAuth()
  const isUserMessage = userId === msg.userId
  const isConsecutiveMsg = index - 1 >= 0 && prevMsg.userId === msg.userId
  // const hasTimeGap = prevMsg.sentAt

  return (
    <div className={classNames(index !== 0 ? (isConsecutiveMsg ? 'pt-0.5' : 'pt-7 sm:pt-10') : 'pt-2', 'relative')}>
      {!isUserMessage && !isConsecutiveMsg && (
        <div className="absolute left-0.5 top-[2.5rem] ">
          <div className="h-7 w-7 rounded-full bg-blue-300 sm:h-9 sm:w-9" />
        </div>
      )}
      <div
        className={classNames(isUserMessage ? 'justify-end' : 'justify-start pl-9 sm:pl-12', 'relative flex w-full')}
      >
        {!isUserMessage && !isConsecutiveMsg && (
          <p className="absolute -top-[1.1rem] left-[3.1rem] text-xs text-gray-500 sm:-top-[1.5rem] sm:left-[3.5rem] sm:text-sm">
            username-placeholder
          </p>
        )}
        <div
          className={classNames(
            isUserMessage ? 'bg-blue-400 text-gray-50' : 'bg-gray-200 text-gray-900',
            'flex max-w-[85%] rounded-3xl px-5 py-3.5 sm:max-w-[60%]'
          )}
        >
          <p className="text-xs sm:text-sm">{msg.text}</p>
        </div>
      </div>
    </div>
  )
}
