import classNames from '@/lib/classNames'
import React from 'react'

export default function RowData({
  children,
  isFirst,
  isLast,

  // only pass key + itemsLength on no passed "onAddItem()"
  index,
  itemsLength,
}: {
  children: React.ReactNode
  isFirst?: boolean
  isLast?: boolean
  index?: number
  itemsLength?: number
}) {
  let roundBottom = false
  if (itemsLength && index) {
    const isLastRow = index === itemsLength - 1
    const notEmpty = itemsLength > 0
    roundBottom = isLastRow && notEmpty
  }
  return (
    <td className="h-full text-xs text-gray-800 sm:whitespace-nowrap sm:text-sm">
      <div
        className={classNames(
          isFirst
            ? 'justify-start pl-4 text-left sm:pl-10'
            : isLast
            ? 'justify-end pr-4 text-right sm:pr-10'
            : 'justify-center text-center',
          'mt-2 flex h-[4.2rem] cursor-pointer place-items-center bg-white font-medium',
          isFirst && roundBottom ? 'rounded-bl-xl' : isLast && roundBottom ? 'rounded-br-xl' : ''
        )}
      >
        {children}
      </div>
    </td>
  )
}
