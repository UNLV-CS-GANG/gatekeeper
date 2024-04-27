export default function InputBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <label className="absolute left-2 top-3 bg-opacity-50 px-2 text-xs font-bold uppercase text-gray-600 backdrop-blur-sm">
        {label}
      </label>
      {children}
    </div>
  )
}
