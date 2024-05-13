export default function UserListRow({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <li
      className="flex cursor-pointer justify-between rounded-lg transition-colors duration-150 hover:bg-gray-200"
      onClick={onClick}
    >
      {children}
    </li>
  )
}
