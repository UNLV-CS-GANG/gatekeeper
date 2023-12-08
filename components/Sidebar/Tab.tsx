export default function Tab({
  Icon,
  title,
  isActive,
}: {
  Icon: any
  title: string
  isActive: boolean
}) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div
      className={classNames(
        'h-14 w-full cursor-pointer rounded-lg transition-colors duration-200',
        isActive ? 'bg-red-100' : 'bg-white hover:bg-gray-100'
      )}
    >
      <div className="flex h-full place-items-center">
        <div className="pl-6">
          <Icon
            className={classNames(
              'h-8 w-8',
              isActive ? 'text-orange-500' : 'text-gray-500'
            )}
          />
        </div>

        <p
          className={classNames(
            'pl-3 font-semibold',
            isActive ? 'text-orange-500' : 'text-gray-500'
          )}
        >
          {title}
        </p>
      </div>
    </div>
  )
}
