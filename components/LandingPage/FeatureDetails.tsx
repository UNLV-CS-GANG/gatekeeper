export default function FeatureDetails({
  Icon,
  title,
  description,
}: {
  Icon: any
  title: string
  description: string
}) {
  return (
    <div className="flex space-x-2">
      <div>
        <Icon className="h-5 w-5 text-gray-800 sm:h-8 sm:w-8" />
      </div>
      <div className="space-y-2">
        <p className="pt-0 text-base font-semibold text-gray-700 sm:pt-0.5 sm:text-xl">
          {title}
        </p>
        <p className="text-sm font-medium text-gray-500 sm:w-full sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  )
}
