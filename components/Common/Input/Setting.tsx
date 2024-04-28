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
    <div className="w-full rounded-lg border bg-white p-2">
      <button
        type="button"
        className="justify-begin flex w-full cursor-pointer place-items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <label className="cursor-pointer text-sm font-medium text-gray-700">{title}</label>
        {!isOpen && <ChevronDownIcon className="h-5 w-5 text-gray-600" />}
        {isOpen && <ChevronUpIcon className="h-5 w-5 text-gray-600" />}
      </button>

      {isOpen && (
        <div className="divide-y divide-gray-200">
          <p className="pb-3 text-sm text-gray-500">{description}</p>
          <div className="pt-3">{children}</div>
        </div>
      )}
    </div>
  )
}