import classNames from '@/lib/classNames'

export default function FormSubmitButton({
  text,
  width,
  isDisabled,
}: {
  text: string
  width: string
  isDisabled: boolean
}) {
  return (
    <button
      className={classNames(
        width ? width : 'w-full',
        'h-10 rounded-lg bg-green-500 font-medium text-white transition-colors duration-200 hover:bg-green-600 disabled:bg-opacity-50 disabled:hover:bg-green-500'
      )}
      type="submit"
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}
