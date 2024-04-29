/* eslint-disable @typescript-eslint/no-explicit-any */
import NoData from '@/components/State/NoData'
import classNames from '@/lib/classNames'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export default function Table({
  headers,
  onAddItem,
  isLoadingItems,
  itemsLength,
  displayCount,
  children,
}: {
  headers: string[]
  onAddItem?: () => void
  isLoadingItems: boolean
  itemsLength: number
  displayCount: number
  children: React.ReactNode
}) {
  return (
    <>
      <table className="w-full" cellPadding={0}>
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header: string, i: number) => (
              <th
                key={i}
                className={classNames(
                  i == 0
                    ? 'pl-4 text-left sm:pl-10'
                    : i == headers.length - 1
                    ? 'pr-4 text-right sm:pr-10'
                    : 'text-center',
                  'sticky top-0 py-5 text-xs font-semibold uppercase text-gray-500'
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {children}
      </table>

      {onAddItem ? (
        <>
          {!isLoadingItems && itemsLength < displayCount && (
            <button
              className="mt-2 h-[4.2rem] w-full cursor-pointer text-gray-300 outline-dashed outline-4 -outline-offset-4 outline-gray-300 transition-all duration-150 hover:scale-[102%] hover:text-gray-400 hover:outline-gray-400"
              onClick={onAddItem}
            >
              <div className="flex h-full place-items-center justify-center">
                <PlusCircleIcon className="h-12 w-12" />
              </div>
            </button>
          )}
        </>
      ) : (
        <>
          {!isLoadingItems && itemsLength === 0 && (
            <div className="mt-2 h-[4.2rem] w-full bg-white drop-shadow-md">
              <div className="flex h-full place-items-center justify-center">
                <NoData />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
