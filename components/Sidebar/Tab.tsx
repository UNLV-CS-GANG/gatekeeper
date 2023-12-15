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
          ? 'bg-green-100 bg-opacity-60'
          : 'bg-white bg-opacity-80 hover:bg-gray-200'
      )}
    >
      <div className="flex h-full place-items-center">
        <div className="pl-6">
          <Icon
            className={classNames(
              'h-8 w-8',
              isActive ? 'text-green-600' : 'text-gray-500'
            )}
          />
        </div>

        <p
          className={classNames(
            'pl-3 font-semibold',
            isActive ? 'text-green-600' : 'text-gray-500'
          )}
        >
          {title}
        </p>
      </div>
    </div>
  )
}
