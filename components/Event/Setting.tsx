import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function Setting({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full rounded-lg bg-white p-2">
      <button
        className="justify-begin flex w-full cursor-pointer place-items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <label className="cursor-pointer text-sm font-medium text-gray-700 sm:text-base">{title}</label>
        {!isOpen && <ChevronDownIcon className="h-5 w-5 text-gray-600" />}
        {isOpen && <ChevronUpIcon className="h-5 w-5 text-gray-600" />}
      </button>

      {isOpen && (
        <>
          <p className="pb-4 text-sm text-gray-500 sm:text-base">{description}</p>
          {children}
        </>
      )}
    </div>
  )
}
