import classNames from '@/lib/classNames'

export default function UnderDevelopment({
  Icon,
  text,
  bgColor,
  textColor,
  moreStyle,
}: {
  Icon: any
  text: string
  bgColor: string
  textColor: string
  moreStyle?: string
}) {
  return (
    <div
      className={classNames(
        `flex w-fit place-items-center justify-center space-x-2 rounded-full px-4 py-2`,
        bgColor,
        moreStyle ? moreStyle : ''
      )}
    >
      <Icon className={classNames('h-6 w-6', textColor)} />
      <p className={classNames('font-medium', textColor)}>{text}</p>
    </div>
  )
}
