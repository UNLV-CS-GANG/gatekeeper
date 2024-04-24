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
      <div className="hidden pb-8 sm:block">
        <h1 className="text-lg font-medium text-gray-600 sm:text-3xl">{title}</h1>
        <p className="w-2/3 text-xs font-normal text-gray-400 sm:w-1/2 sm:text-base">{description}</p>
      </div>

      {/* page content */}
      <div>{children}</div>
    </div>
  )
}
