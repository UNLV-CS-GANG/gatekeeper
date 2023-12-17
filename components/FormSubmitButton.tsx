import classNames from '@/lib/classNames'

export default function FormSubmitButton({
  text,
  width,
  isDisabled,
}: {
  text: string
  width?: string
  isDisabled: boolean
}) {
  return (
    <button
      className={classNames(
        width ? width : 'w-full',
        'h-10 rounded-lg bg-sage-200 bg-opacity-80 font-medium text-white transition-colors duration-200 hover:bg-sage-200 disabled:opacity-50 disabled:hover:bg-sage-100'
      )}
      type="submit"
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}
