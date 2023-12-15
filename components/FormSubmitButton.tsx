import classNames from '@/lib/classNames'

export default function FormSubmitButton({
  text,
  width,
  isSubmitting,
}: {
  text: string
  width: string
  isSubmitting: boolean
}) {
  return (
    <button
      className={classNames(
        width ? width : 'w-full',
        'h-10 rounded-lg bg-green-500 font-medium text-white transition-colors duration-200 hover:bg-green-600 disabled:bg-opacity-50'
      )}
      type="submit"
      disabled={isSubmitting}
    >
      {text}
    </button>
  )
}
