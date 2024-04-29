/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from '@/lib/classNames'
import { Dispatch, SetStateAction } from 'react'

export default function Row({
  item,
  children,
  isHovering,
  onClick,
  setIsHovering,
}: {
  item: any
  children: React.ReactNode
  isHovering: boolean
  onClick: (x: any) => void
  setIsHovering: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <tr
      className={classNames(
        'cursor-pointer text-sm transition-all duration-150',
        isHovering ? 'scale-[102%] drop-shadow-lg' : 'drop-shadow-md'
      )}
      onClick={() => onClick(item)}
      key={item.id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </tr>
  )
}
