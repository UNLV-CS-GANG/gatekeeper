/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import classNames from '@/lib/classNames'

export default function GridItem({
  item,
  onClick,
  children,
}: {
  item: any
  onClick: (x: any) => void
  children: React.ReactNode
}) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <li
      className={classNames(
        'h-48 cursor-pointer bg-white text-sm transition-all duration-150',
        isHovering ? 'scale-105 drop-shadow-xl' : 'drop-shadow-md'
      )}
      onClick={() => onClick(item)}
      key={item.id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </li>
  )
}
