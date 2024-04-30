export default function GridItemLoading() {
  return (
    <li className="h-48 rounded-xl bg-white drop-shadow-md">
      <div className="grid h-full grid-cols-1 content-between p-4">
        <div className="space-y-1">
          <div className="h-5 w-1/3 animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
        </div>
        <div className="h-4 w-1/4 animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
      </div>
    </li>
  )
}
