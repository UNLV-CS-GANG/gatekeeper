import classNames from '@/lib/classNames'

export default function HeaderIcon({
  Icon,
  moreIconStyle,
}: {
  Icon: any
  moreIconStyle?: string
}) {
  return (
    <div className="cursor-pointer rounded-full p-1 transition-colors duration-200 hover:bg-gray-200">
      <Icon className={classNames(moreIconStyle, 'h-8 w-8 text-gray-600')} />
    </div>
  )
}
