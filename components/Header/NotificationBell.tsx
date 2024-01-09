import { BellIcon } from '@heroicons/react/24/outline'
import HeaderIcon from './HeaderIcon'
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Invite } from '@prisma/client'
import { useAuth } from '@clerk/nextjs'
import Pusher from 'pusher-js'
import getDateTime from '@/lib/getDateTime'

export default function NotificationBell() {
  const pusher = new Pusher(String(process.env.NEXT_PUBLIC_PUSHER_KEY), {
    cluster: String(process.env.NEXT_PUBLIC_PUSHER_CLUSTER),
  })

  const { userId } = useAuth()

  const [acceptedInvites, setAcceptedInvites] = useState<Invite[]>([])

  useEffect(() => {
    const channel = pusher.subscribe('notification-bell')
    console.log('channel:', channel)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.bind('invite-accepted', (inv: Invite) => {
      setAcceptedInvites([...acceptedInvites, inv])
      console.log('inv:', inv)
    })

    return () => {
      pusher.unsubscribe('notification-bell')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedInvites])

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="flex outline-none">
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
            <div className="w-full max-w-xs flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-2">
                {acceptedInvites &&
                  acceptedInvites.map((inv: Invite, index: number) => (
                    <div
                      key={index}
                      className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div>{`${inv.firstName} ${
                        inv.lastName
                      } accepted your invitation at ${getDateTime(
                        new Date(inv.acceptedAt)
                      )}`}</div>
                    </div>
                  ))}
              </div>
              <div className="bg-gray-100">
                <button className="flex w-full items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-200">
                  clear
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  )
}
