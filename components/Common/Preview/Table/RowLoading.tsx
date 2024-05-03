import classNames from '@/lib/classNames'

export default function RowLoading({ index, displayCount }: { index: number; displayCount: number }) {
  const isLastRowLoading = index === displayCount - 1

  return (
    <tr className="drop-shadow-md">
      <td>
        <div className={classNames('mt-2 h-[4.2rem] bg-white', isLastRowLoading ? 'rounded-bl-xl' : '')}>
          <div className="flex h-full place-items-center">
            <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
          </div>
        </div>
      </td>
      <td>
        <div className="mt-2 h-[4.2rem] bg-white">
          <div className="flex h-full place-items-center">
            <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
          </div>
        </div>
      </td>
      <td>
        <div className="mt-2 h-[4.2rem] bg-white">
          <div className="flex h-full place-items-center">
            <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
          </div>
        </div>
      </td>
      <td>
        <div
          className={classNames('mt-2 hidden h-[4.2rem] bg-white sm:block', isLastRowLoading ? 'rounded-br-xl' : '')}
        >
          <div className="flex h-full place-items-center">
            <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
          </div>
        </div>
      </td>
    </tr>
  )
}
