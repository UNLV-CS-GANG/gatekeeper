/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from '@/lib/classNames'

export default function Row({
  item,
  children,
  onClick,
}: {
  item: any
  children: React.ReactNode
  onClick: (x: any) => void
}) {
  return (
    <tr
      className={classNames(
        'cursor-pointer text-sm drop-shadow-md transition-all duration-150 hover:scale-[102%] hover:drop-shadow-lg'
      )}
      onClick={() => onClick(item)}
      key={item.id}
    >
      {children}
    </tr>
  )
}
