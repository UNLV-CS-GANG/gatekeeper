/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import NoData from '@/components/State/NoData'
import GridItemLoading from './GridItemLoading'

export default function Grid({
  itemsLength,
  isLoadingItems,
  displayCount,
  onAddItem,
  children,
}: {
  itemsLength: number
  isLoadingItems: boolean
  displayCount: number
  onAddItem?: () => void
  children: React.ReactNode
}) {
  return (
    <ul className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 xl:grid-cols-3">
      {isLoadingItems && new Array(displayCount).fill(0).map((_: number, i: number) => <GridItemLoading key={i} />)}

      {!isLoadingItems && itemsLength > 0 && children}

      {onAddItem ? (
        <>
          {!isLoadingItems && itemsLength < displayCount && (
            <button
              onClick={onAddItem}
              className="flex h-48 cursor-pointer place-items-center justify-center rounded-xl text-gray-300 outline-dashed outline-4 -outline-offset-4 outline-gray-300 transition-all duration-150 hover:scale-105 hover:text-gray-400 hover:outline-gray-400"
            >
              <PlusCircleIcon className="h-12 w-12" />
            </button>
          )}
        </>
      ) : (
        <>
          {!isLoadingItems && itemsLength === 0 && (
            <li className="flex h-48 place-items-center justify-center rounded-xl bg-white drop-shadow-md">
              <NoData />
            </li>
          )}
        </>
      )}
    </ul>
  )
}
