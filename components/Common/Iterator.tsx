import classNames from '@/lib/classNames'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction } from 'react'

export default function Iterator({
  itemsCount,
  allItemsCount,
  displayCount,
  skips,
  setSkips,
  onChange,
}: {
  itemsCount: number
  allItemsCount: number
  displayCount: number
  skips: number
  setSkips?: Dispatch<SetStateAction<number>>
  onChange?: (x: number) => void
}) {
  const skipMultiplier = skips / displayCount

  return (
    <div className="flex justify-center sm:justify-end">
      <div className="relative flex w-full space-x-4 rounded-full bg-gray-200 px-4 py-2.5 sm:w-56 sm:justify-between">
        <div className="flex place-items-center justify-center space-x-2">
          <button
            className="absolute left-3 cursor-pointer rounded-full p-1 transition-colors duration-150 hover:bg-gray-300 disabled:cursor-default disabled:hover:bg-gray-200 sm:static"
            onClick={() => {
              const skipBy = (skipMultiplier - 1) * displayCount
              if (setSkips) setSkips(skipBy)
              if (onChange) onChange(skipBy)
            }}
            disabled={skipMultiplier === 0}
          >
            <ArrowLeftIcon
              className={classNames(
                'h-5 w-5',
                skipMultiplier === 0 ? 'text-gray-400 text-opacity-50' : 'text-gray-600'
              )}
            />
          </button>
          <button
            className="absolute right-3 rounded-full p-1 transition-colors duration-150 hover:bg-gray-300 disabled:cursor-default disabled:hover:bg-gray-200 sm:static"
            onClick={() => {
              const skipBy = (skipMultiplier + 1) * displayCount
              if (setSkips) setSkips(skipBy)
              if (onChange) onChange(skipBy)
            }}
            disabled={(skipMultiplier + 1) * displayCount >= allItemsCount}
          >
            <ArrowRightIcon
              className={classNames(
                'h-5 w-5',
                (skipMultiplier + 1) * displayCount >= allItemsCount ? 'text-gray-400 text-opacity-50' : 'text-gray-600'
              )}
            />
          </button>
        </div>
        <div className="flex w-full justify-center space-x-2 sm:justify-end">
          <p className="font-medium text-gray-600">
            {itemsCount > 0
              ? `${skipMultiplier * displayCount + 1} - ${
                  skipMultiplier * displayCount + displayCount <= allItemsCount
                    ? skipMultiplier * displayCount + displayCount
                    : allItemsCount
                }`
              : '0 - 0'}
          </p>
          <p className="font-medium text-gray-600">{`/ ${allItemsCount}`}</p>
        </div>
      </div>
    </div>
  )
}
