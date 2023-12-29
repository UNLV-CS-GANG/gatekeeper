/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from '@/lib/classNames'

export default function Tab({
  Icon,
  title,
  isActive,
}: {
  Icon: any
  title: string
  isActive: boolean
}) {
  return (
    <div
      className={classNames(
        'h-10 w-full cursor-pointer rounded-lg transition-colors duration-200 sm:h-14',
        isActive
          ? 'bg-sage-100 bg-opacity-40'
          : 'bg-white hover:bg-gray-200 hover:bg-opacity-70'
      )}
    >
      <div className="flex h-full place-items-center">
        <div className="pl-6">
          <Icon
            className={classNames(
              'h-7 w-7 sm:h-8 sm:w-8',
              isActive ? 'text-sage-200' : 'text-gray-500'
            )}
          />
        </div>

        <p
          className={classNames(
            'pl-3 text-lg font-medium sm:text-base sm:font-semibold',
            isActive ? 'text-sage-200' : 'text-gray-500'
          )}
        >
          {title}
        </p>
      </div>
    </div>
  )
}
