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
        'h-10 rounded-lg bg-orange-400 font-medium text-white transition-colors duration-200 hover:bg-orange-500 disabled:bg-opacity-50'
      )}
      type="submit"
      disabled={isSubmitting}
    >
      {text}
    </button>
  )
}
