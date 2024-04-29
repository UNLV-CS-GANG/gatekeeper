export default function RowLoading() {
  return (
    <tr className="drop-shadow-md">
      <td>
        <div className="mt-2 h-[4.2rem] bg-white">
          <div className="flex h-full place-items-center">
            <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
          </div>
        </div>
      </td>
      <td>
        <div className="mt-2 h-[4.2rem] bg-white">
          <div className="flex h-full place-items-center">
            <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
          </div>
        </div>
      </td>
      <td>
        <div className="mt-2 hidden h-[4.2rem] bg-white sm:block">
          <div className="flex h-full place-items-center">
            <div className="mx-2 h-1/3 w-full animate-pulse rounded-full bg-gray-300 bg-opacity-50" />
          </div>
        </div>
      </td>
    </tr>
  )
}
