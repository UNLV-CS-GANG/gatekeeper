export default function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="py-8 pl-2">
      {/* title */}
      <div>
        <h1 className="text-3xl font-medium text-gray-600">{title}</h1>
      </div>

      {/* description */}
      <div>
        <p className="w-1/2 font-normal text-gray-400">{description}</p>
      </div>
    </div>
  )
}
