export default function ModalCornerButton({ children }: { children: React.ReactNode }) {
  return <div className="absolute right-2 top-2 z-20 sm:right-5 sm:top-5">{children}</div>
}
