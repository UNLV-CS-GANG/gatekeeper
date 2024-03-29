import { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function CornerNotification({
  isOpen,
  type,
  label,
  onClose,
  children,
}: {
  isOpen: boolean
  type: string // 'success' | 'error' | 'warning'
  label: string
  onClose: () => void
  children: React.ReactNode
}) {
  const [show, setShow] = useState(isOpen)

  function close() {
    setShow(false)
    onClose()
  }

  useEffect(() => {
    setShow(isOpen)
  }, [isOpen])

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {type === 'success' && <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />}
                    {type === 'error' && (
                      <ExclamationCircleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                    )}
                    {type === 'warning' && (
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="mt-1 text-sm text-gray-500">{children}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-full bg-white p-0.5 transition-colors duration-150 hover:bg-gray-200 hover:text-gray-800"
                      onClick={close}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
