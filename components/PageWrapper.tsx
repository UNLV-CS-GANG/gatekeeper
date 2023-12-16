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
    <>
      <div className="pb-8">
        {/* title */}
        <div>
          <h1 className="text-3xl font-medium text-gray-600">{title}</h1>
        </div>

        {/* description */}
        <div>
          <p className="w-1/2 font-normal text-gray-400">{description}</p>
        </div>
      </div>

      {/* content */}
      <div>{children}</div>
    </>
  )
}
