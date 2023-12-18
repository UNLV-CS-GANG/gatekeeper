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
        'h-14 w-full cursor-pointer rounded-lg transition-colors duration-200',
        isActive
          ? 'bg-sage-100 bg-opacity-40'
          : 'bg-white hover:bg-gray-200 hover:bg-opacity-70'
      )}
    >
      <div className="flex h-full place-items-center">
        <div className="pl-6">
          <Icon
            className={classNames(
              'h-8 w-8',
              isActive ? 'text-sage-200' : 'text-gray-500'
            )}
          />
        </div>

        <p
          className={classNames(
            'pl-3 font-semibold',
            isActive ? 'text-sage-200' : 'text-gray-500'
          )}
        >
          {title}
        </p>
      </div>
    </div>
  )
}
