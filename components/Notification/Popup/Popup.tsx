import React, { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classNames from '@/lib/classNames'

export default function Popup({
  isOpen,
  setIsOpen,
  Icon,
  bgStyle,
  textStyle,
  iconStyle,
  children,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any
  bgStyle: string
  textStyle: string
  iconStyle: string
  children: React.ReactNode
}) {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false)
      }, 1500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex h-1/2 place-items-center items-center justify-center text-center sm:h-full sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'relative h-60 w-60 transform overflow-hidden rounded-3xl opacity-90 shadow-xl backdrop-blur-lg transition-all',
                  bgStyle
                )}
              >
                <div className="flex h-full w-full place-items-center justify-center p-6">
                  <Icon className={classNames('h-full w-full p-12', iconStyle)} />
                </div>
                <div className={classNames('absolute bottom-4 w-full text-center font-semibold', textStyle)}>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
