import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import HeaderIcon from './HeaderIcon'
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Notification } from '@prisma/client'
import { useAuth } from '@clerk/nextjs'
import Pusher from 'pusher-js'
import getDateTime from '@/lib/getDateTime'
import useLoadData from '@/hooks/useLoadData'

export default function NotificationBell() {
  const pusher = new Pusher(String(process.env.NEXT_PUBLIC_PUSHER_KEY), {
    cluster: String(process.env.NEXT_PUBLIC_PUSHER_CLUSTER),
  })

  const { userId } = useAuth()

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useLoadData((notis) => {
    setNotifications(notis)
  }, `/api/notification?hostId=${userId}`)

  useEffect(() => {
    const channel = pusher.subscribe('notification-bell')
    console.log('channel:', channel)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.bind('invite-accepted', (noti: Notification) => {
      setNotifications([noti, ...notifications])
      console.log('noti:', noti)
    })

    return () => {
      pusher.unsubscribe('notification-bell')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen])

  async function clearAllNotifications() {
    try {
      // remove in client
      setNotifications([])

      // remove in server
      await fetch(`/api/notification?hostId=${userId}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function clearNotification(id: string, index: number) {
    try {
      // remove in client
      const tempNotifications = [...notifications]
      tempNotifications.splice(index, 1)
      setNotifications(tempNotifications)

      // remove in server
      await fetch(`/api/notification?id=${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Popover className="relative">
        <Popover.Button
          className="relative flex outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {notifications && notifications.length > 0 && (
            <div className="absolute right-0 top-0 flex h-[1.15rem] w-[1.15rem] place-items-center justify-center rounded-full bg-orange-600 text-[0.7rem] text-gray-200">
              {notifications.length}
            </div>
          )}
          <HeaderIcon Icon={BellIcon} />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            <div className="w-[16rem] max-w-xs flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 sm:w-[20rem]">
              <div className="p-2">
                {notifications && notifications.length !== 0 ? (
                  <div className="space-y-2">
                    <div className="max-h-[18.5rem] overflow-y-auto">
                      {notifications.map(
                        (noti: Notification, index: number) => (
                          <div
                            key={index}
                            className="relative space-y-1.5 rounded-lg p-4 text-sm transition-colors duration-100 hover:bg-gray-50"
                          >
                            <p className="mr-5 text-gray-800">{noti.content}</p>
                            <p className="text-gray-400">
                              {getDateTime(new Date(noti.notifiedAt))}
                            </p>
                            <button
                              className="absolute right-2 top-2 rounded-full p-0.5 text-gray-400 transition-colors duration-100 hover:bg-gray-200 hover:text-gray-600"
                              onClick={() => clearNotification(noti.id, index)}
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                    <button
                      className="flex w-full items-center justify-center gap-x-2.5 rounded-lg bg-gray-100 p-2 text-gray-500 transition-colors duration-150 hover:bg-gray-200"
                      onClick={clearAllNotifications}
                    >
                      Clear all
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  )
}
