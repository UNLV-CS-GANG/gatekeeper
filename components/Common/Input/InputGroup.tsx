export default function InputGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <label className="text-xs font-bold uppercase text-gray-600">{label}</label>
      <div className="space-y-0.5 rounded-lg p-3 ring-2 ring-gray-200">{children}</div>
    </>
  )
}
