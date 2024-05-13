export default function InfoListItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="py-1.5 sm:flex">
      <p className="pb-1.5 text-xs font-semibold uppercase text-gray-500 sm:w-1/5 sm:pb-0 sm:text-sm">{label}</p>
      <div className="text-sm text-gray-800 sm:w-4/5 sm:text-base">{children}</div>
    </li>
  )
}
