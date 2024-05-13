export default function UserList({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-[8rem] overflow-y-auto rounded-lg bg-gray-100 px-1.5 py-2 sm:px-4">
      <ul className="w-full divide-y divide-gray-400 divide-opacity-40">{children}</ul>
    </div>
  )
}
