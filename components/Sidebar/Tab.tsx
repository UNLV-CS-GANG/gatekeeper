/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from '@/lib/classNames'

export default function Tab({ Icon, title, isActive }: { Icon: any; title: string; isActive: boolean }) {
  return (
    <div
      className={classNames(
        'h-10 w-full cursor-pointer rounded-lg text-gray-500 transition-colors duration-200',
        isActive ? 'bg-sage-100 bg-opacity-30' : 'bg-white hover:text-gray-900'
      )}
    >
      <div className="flex h-full place-items-center">
        <div className="px-3">
          <Icon className={classNames('h-5 w-5 sm:h-6 sm:w-6', isActive ? 'text-sage-200' : '')} />
        </div>

        <p className={classNames('text-sm font-medium sm:font-semibold', isActive ? 'text-sage-200' : '')}>{title}</p>
      </div>
    </div>
  )
}
