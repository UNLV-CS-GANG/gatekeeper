export default function PageWrapper({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="h-screen">
      <div className="pb-8">
        {/* title */}
        <div>
          <h1 className="text-2xl font-medium text-gray-600 sm:text-3xl">
            {title}
          </h1>
        </div>

        {/* description */}
        <div>
          <p className="w-2/3 text-sm font-normal text-gray-400 sm:w-1/2 sm:text-base">
            {description}
          </p>
        </div>
      </div>

      {/* content */}
      <div>{children}</div>
    </div>
  )
}
