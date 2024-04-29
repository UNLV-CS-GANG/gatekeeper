import classNames from '@/lib/classNames'
import React from 'react'

export default function RowData({
  children,
  isFirst,
  isLast,
}: {
  children: React.ReactNode
  isFirst?: boolean
  isLast?: boolean
}) {
  return (
    <td className="h-full text-xs text-gray-800 sm:whitespace-nowrap sm:text-sm">
      <div
        className={classNames(
          isFirst
            ? 'justify-start pl-4 text-left sm:pl-10'
            : isLast
            ? 'justify-end pr-4 text-right sm:pr-10'
            : 'justify-center text-center',
          'mt-2 flex h-[4.2rem] cursor-pointer place-items-center bg-white font-medium'
        )}
      >
        {children}
      </div>
    </td>
  )
}
