import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from '@/lib/classNames'
import ModalCornerButton from './ModalCornerButton'

export default function Modal({
  isOpen,
  onClose,
  width = 'sm:max-w-3xl max-w-full mx-3 sm:mx-0',
  children,
}: {
  isOpen: boolean
  onClose: () => void
  width?: string
  children: React.ReactNode
}) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 h-screen w-screen bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex place-items-center items-end justify-center text-center sm:min-h-full sm:items-center sm:p-0">
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
                  'relative my-8 w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all',
                  width
                )}
              >
                {/* <ModalCornerButton>
									<button
										type="button"
										className="rounded-full p-1 outline-none transition-colors duration-150 hover:bg-gray-200"
										onClick={() => onClose()}
										ref={cancelButtonRef}
									>
										<XMarkIcon className="h-6 w-6" />
									</button>
								</ModalCornerButton> */}
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
