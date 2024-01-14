export default function ModalFooter({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pt-16">
      <div className="absolute bottom-0 h-16 w-full bg-gray-100">
        {children}
      </div>
    </div>
  )
}
